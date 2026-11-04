"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import {
  adoptRecoverySession,
  attemptOnce,
  clearStashedRecoverySession,
  followRecoveryCode,
  hasRecoveryClaim,
  interpretRecoveryLink,
  readStashedRecoverySession,
  recoveryTransportMessage,
  RECOVERY_LINK_MISSING,
  RECOVERY_LINK_UNAVAILABLE,
  RECOVERY_LINK_UNUSABLE,
  stashRecoverySession,
  type StashedRecoverySession,
} from "@/lib/recovery-link";

type Phase = "checking" | "ready" | "blocked";

function replaceRecoveryUrl(next: string) {
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (current === next) return;
  window.history.replaceState(window.history.state, "", next);
}

type UserLookup = { found: boolean; error: { message?: string } | null };

async function lookupUser(
  supabase: NonNullable<ReturnType<typeof createClient>>,
): Promise<UserLookup> {
  try {
    const result = await supabase.auth.getUser();
    return { found: Boolean(result?.data?.user), error: result?.error ?? null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "";
    return { found: false, error: { message } };
  }
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("checking");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const passwordError = useMemo(() => {
    if (!password && !confirmPassword) return null;
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  }, [password, confirmPassword]);

  useEffect(() => {
    let requestId = 0;

    async function establishSession() {
      const id = ++requestId;
      const current = () => id === requestId;
      setPhase("checking");
      setError(null);
      setSuccess(null);

      try {
        const link = interpretRecoveryLink(window.location.href);
        // Copy implicit tokens out of the URL before any await. A later failed
        // GET /verify redirects to this same path with only an error fragment,
        // and a refresh must not submit the refresh token a second time.
        if (link.kind === "session") {
          stashRecoverySession({
            accessToken: link.accessToken,
            refreshToken: link.refreshToken,
          });
          replaceRecoveryUrl("/reset-password");
        }

        const session: StashedRecoverySession | null =
          link.kind === "session"
            ? { accessToken: link.accessToken, refreshToken: link.refreshToken }
            : readStashedRecoverySession();

        if (link.kind === "code" && !session) {
          followRecoveryCode(window.location.origin, link.code);
          return;
        }

        const supabase = createClient();
        if (!supabase) {
          if (current()) {
            setError(RECOVERY_LINK_UNAVAILABLE);
            setPhase("blocked");
          }
          return;
        }

        if (session) {
          // The SSR browser client is locked to PKCE and will not adopt implicit
          // `#access_token` / `#refresh_token` redirects from generateLink.
          const adopted = await adoptRecoverySession(
            session,
            async () => {
              const { error } = await supabase.auth.setSession({
                access_token: session.accessToken,
                refresh_token: session.refreshToken,
              });
              return { ok: !error, error };
            },
            async () => (await lookupUser(supabase)).found,
          );
          if (!current()) return;
          if (!adopted.ok) {
            const recovered = await lookupUser(supabase);
            if (!current()) return;
            if (recovered.found) {
              clearStashedRecoverySession();
              replaceRecoveryUrl("/reset-password");
              setPhase("ready");
              return;
            }
            if (!recoveryTransportMessage(adopted.error)) clearStashedRecoverySession();
            setError(recoveryTransportMessage(adopted.error) ?? RECOVERY_LINK_UNUSABLE);
            setPhase("blocked");
            return;
          }
          clearStashedRecoverySession();
          replaceRecoveryUrl("/reset-password");
          setPhase("ready");
          return;
        }

        if (link.kind === "error") {
          // The fragment is not a credential. Keep a stable error query so a
          // refresh still explains the failure, without contacting /verify.
          replaceRecoveryUrl("/reset-password?error=access_denied&error_code=otp_expired");
          const recovered = await lookupUser(supabase);
          if (!current()) return;
          if (recovered.found) {
            replaceRecoveryUrl("/reset-password");
            setPhase("ready");
            return;
          }
          setError(recoveryTransportMessage(recovered.error) ?? link.message);
          setPhase("blocked");
          return;
        }

        if (link.kind === "otp") {
          const adopted = await attemptOnce(`otp:${link.type}:${link.tokenHash}`, async () => {
            const { error } = await supabase.auth.verifyOtp({
              token_hash: link.tokenHash,
              type: link.type,
            });
            return { ok: !error, error };
          });
          if (!current()) return;
          if (!adopted.ok) {
            setError(recoveryTransportMessage(adopted.error) ?? RECOVERY_LINK_UNUSABLE);
            setPhase("blocked");
            return;
          }
          replaceRecoveryUrl("/reset-password");
          setPhase("ready");
          return;
        }

        const recovered = await lookupUser(supabase);
        if (!current()) return;
        if (!recovered.found) {
          setError(recoveryTransportMessage(recovered.error) ?? RECOVERY_LINK_MISSING);
          setPhase("blocked");
          return;
        }
        setPhase("ready");
      } catch (err: unknown) {
        if (!current()) return;
        const message = err instanceof Error ? err.message : "";
        setError(recoveryTransportMessage({ message }) ?? RECOVERY_LINK_UNUSABLE);
        setPhase("blocked");
      }
    }

    function onHashChange() {
      const next = interpretRecoveryLink(window.location.href);
      // A failed repeat of the email link redirects here with an error fragment.
      // That must not cancel a recovery session already taken from the hash.
      if (next.kind === "error" && (readStashedRecoverySession() || hasRecoveryClaim())) {
        replaceRecoveryUrl("/reset-password");
        return;
      }
      if (next.kind === "session") void establishSession();
    }

    void establishSession();
    window.addEventListener("hashchange", onHashChange);
    return () => {
      requestId += 1;
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (phase !== "ready") return;

    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      if (!supabase) {
        setError(RECOVERY_LINK_UNAVAILABLE);
        setPhase("blocked");
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        const offline = recoveryTransportMessage(updateError);
        if (offline) {
          setError(offline);
          return;
        }
        if (/auth session missing/i.test(updateError.message)) {
          setError(RECOVERY_LINK_UNUSABLE);
          setPhase("blocked");
          return;
        }
        setError(updateError.message);
        return;
      }

      setSuccess("Password updated. Taking you to sign in...");
      try {
        await supabase.auth.signOut();
      } catch {
        // The password is already saved. Sign-in replaces any leftover session.
      }
      router.replace("/login?password=updated");
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      setError(recoveryTransportMessage({ message }) ?? "Could not update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-stone-900">Set a new password</h1>
        <p className="mt-2 text-stone-600">
          {phase === "ready"
            ? "Choose a password for your RelyBricks customer account."
            : "Use the link from your email to choose a password."}
        </p>

        {phase === "checking" && (
          <p className="mt-8 text-sm text-stone-600" role="status">
            Confirming your link...
          </p>
        )}

        {phase === "blocked" && error && (
          <div className="mt-8 space-y-4">
            <div
              className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
              role="alert"
            >
              {error}
            </div>
            <p className="text-center text-sm text-stone-600">
              <Link href="/login" className="text-accent-600 hover:underline font-medium">
                Back to sign in
              </Link>
            </p>
          </div>
        )}

        {phase === "ready" && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {error && (
              <div
                className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
                role="alert"
              >
                {error}
              </div>
            )}
            {success && (
              <div
                className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm"
                role="status"
              >
                {success}
              </div>
            )}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1">
                New password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-accent-500 outline-none"
                placeholder="At least 8 characters"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-stone-700 mb-1"
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-accent-500 outline-none"
                placeholder="Repeat the new password"
              />
            </div>
            {passwordError && <p className="text-sm text-red-700">{passwordError}</p>}
            <button
              type="submit"
              disabled={loading || !!passwordError}
              className="w-full py-3 bg-accent-600 text-white font-semibold rounded-xl hover:bg-accent-500 disabled:opacity-70"
            >
              {loading ? "Updating password..." : "Update password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
