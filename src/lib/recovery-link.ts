/**
 * Customer recovery and invite links arrive in more than one shape.
 * Admin generateLink redirects with implicit hash tokens. Forgot-password
 * from this site uses PKCE and lands with `?code=`. Some templates send
 * `token_hash`. Expired links redirect with an error and no tokens.
 *
 * The email link itself is Supabase's one-time GET /verify URL. Some in-app
 * browsers request that URL again after the redirect. A later failure comes
 * back as /reset-password#error=otp_expired and must not hide tokens captured
 * from the successful redirect, or a session already stored for this tab.
 */

export const RECOVERY_LINK_EXPIRED =
  "This link has expired or was already used. Open the latest email and use that link again, or request a new one from the sign-in page.";

export const RECOVERY_LINK_MISSING =
  "Open the link in your email to set a password. If it expired, request a new one from the sign-in page.";

export const RECOVERY_LINK_UNUSABLE =
  "We couldn't use this link. It may have expired or already been used. Open the latest email and try again.";

export const RECOVERY_LINK_OFFLINE =
  "We couldn't reach the sign-in service. Check your connection and try again.";

export const RECOVERY_LINK_UNAVAILABLE =
  "Password reset is temporarily unavailable. Please try again shortly.";

export const EMAIL_OTP_TYPES = [
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
] as const;

export type RecoveryOtpType = (typeof EMAIL_OTP_TYPES)[number];

export type RecoveryLink =
  | { kind: "error"; message: string }
  | { kind: "session"; accessToken: string; refreshToken: string }
  | { kind: "code"; code: string }
  | { kind: "otp"; tokenHash: string; type: RecoveryOtpType }
  | { kind: "none" };

export function isRecoveryOtpType(value: string | null): value is RecoveryOtpType {
  return !!value && (EMAIL_OTP_TYPES as readonly string[]).includes(value);
}

function paramsFromHref(href: string): URLSearchParams {
  const url = new URL(href);
  const merged = new URLSearchParams();
  if (url.hash.startsWith("#")) {
    new URLSearchParams(url.hash.slice(1)).forEach((value, key) => {
      merged.set(key, value);
    });
  }
  // Search params win over the hash, matching Supabase's URL parser.
  url.searchParams.forEach((value, key) => {
    merged.set(key, value);
  });
  return merged;
}

export function interpretRecoveryLink(href: string): RecoveryLink {
  let params: URLSearchParams;
  try {
    params = paramsFromHref(href);
  } catch {
    return { kind: "none" };
  }

  const error = params.get("error");
  const errorCode = params.get("error_code");
  const errorDescription = params.get("error_description");
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  const code = params.get("code");
  const tokenHash = params.get("token_hash");
  const type = params.get("type");

  if (accessToken && refreshToken) {
    return { kind: "session", accessToken, refreshToken };
  }

  if (error || errorCode || errorDescription || accessToken || refreshToken) {
    return { kind: "error", message: RECOVERY_LINK_EXPIRED };
  }

  if (code) {
    return { kind: "code", code };
  }

  if (tokenHash && isRecoveryOtpType(type)) {
    return { kind: "otp", tokenHash, type };
  }

  return { kind: "none" };
}

export function recoveryCallbackUrl(origin: string, code: string): string {
  const target = new URL("/auth/callback", origin);
  target.searchParams.set("code", code);
  target.searchParams.set("next", "/reset-password");
  return target.toString();
}

export function followRecoveryCode(origin: string, code: string): void {
  window.location.replace(recoveryCallbackUrl(origin, code));
}

export const RECOVERY_STASH_KEY = "relybricks.recovery.session";
export const RECOVERY_CLAIM_KEY = "relybricks.recovery.claim";

export type StashedRecoverySession = {
  accessToken: string;
  refreshToken: string;
};

export type RecoveryAttemptResult = {
  ok: boolean;
  error: { message?: string } | null;
};

export const recoverySessionPoll = { attempts: 5, delayMs: 200 };

const succeededAttempts = new Map<string, RecoveryAttemptResult>();
const inflightAttempts = new Map<string, Promise<RecoveryAttemptResult>>();

export function resetRecoveryAdoptionForTests(): void {
  succeededAttempts.clear();
  inflightAttempts.clear();
}

/**
 * Runs at parse time, before the app bundle, so a follow-up navigation cannot
 * discard the implicit session. It only rewrites this page's URL; it never
 * requests the one-time verify link again.
 */
export const RECOVERY_CAPTURE_SCRIPT = `(function(){try{var path=location.pathname;if(path!=="/reset-password"&&path!=="/reset-password/")return;var params=new URLSearchParams(location.hash.charAt(0)==="#" ? location.hash.slice(1) : "");new URLSearchParams(location.search).forEach(function(value,key){params.set(key,value);});var access=params.get("access_token");var refresh=params.get("refresh_token");if(!access||!refresh)return;sessionStorage.setItem(${JSON.stringify(RECOVERY_STASH_KEY)},JSON.stringify({accessToken:access,refreshToken:refresh}));history.replaceState(history.state,"","/reset-password");}catch(e){}})();`;

export function stashRecoverySession(session: StashedRecoverySession): void {
  try {
    sessionStorage.setItem(RECOVERY_STASH_KEY, JSON.stringify(session));
  } catch {
    // Private mode can reject storage. The in-memory attempt still runs.
  }
}

export function readStashedRecoverySession(): StashedRecoverySession | null {
  try {
    const raw = sessionStorage.getItem(RECOVERY_STASH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StashedRecoverySession>;
    if (!parsed.accessToken || !parsed.refreshToken) return null;
    return { accessToken: parsed.accessToken, refreshToken: parsed.refreshToken };
  } catch {
    return null;
  }
}

export function clearStashedRecoverySession(): void {
  try {
    sessionStorage.removeItem(RECOVERY_STASH_KEY);
  } catch {
    // Ignore storage failures; the URL is already cleared.
  }
}

export function hasRecoveryClaim(): boolean {
  try {
    return Boolean(sessionStorage.getItem(RECOVERY_CLAIM_KEY));
  } catch {
    return false;
  }
}

export function attemptOnce(
  key: string,
  run: () => Promise<RecoveryAttemptResult>,
): Promise<RecoveryAttemptResult> {
  const done = succeededAttempts.get(key);
  if (done) return Promise.resolve(done);
  const existing = inflightAttempts.get(key);
  if (existing) return existing;
  const pending = run()
    .then((result) => {
      if (result.ok) succeededAttempts.set(key, result);
      return result;
    })
    .finally(() => {
      if (inflightAttempts.get(key) === pending) inflightAttempts.delete(key);
    });
  inflightAttempts.set(key, pending);
  return pending;
}

function claimFingerprint(refreshToken: string): string {
  let hash = 5381;
  for (let index = 0; index < refreshToken.length; index += 1) {
    hash = (hash * 33) ^ refreshToken.charCodeAt(index);
  }
  return (hash >>> 0).toString(16);
}

export function recoveryClaimMarker(refreshToken: string, state: "pending" | "done"): string {
  return `${state}:${claimFingerprint(refreshToken)}`;
}

function claimRecoveryRefresh(refreshToken: string): "owner" | "done" | "pending" {
  try {
    const marker = sessionStorage.getItem(RECOVERY_CLAIM_KEY);
    if (marker === recoveryClaimMarker(refreshToken, "done")) return "done";
    if (marker === recoveryClaimMarker(refreshToken, "pending")) return "pending";
    sessionStorage.setItem(RECOVERY_CLAIM_KEY, recoveryClaimMarker(refreshToken, "pending"));
    return "owner";
  } catch {
    return "owner";
  }
}

function finishRecoveryClaim(refreshToken: string): void {
  try {
    sessionStorage.setItem(RECOVERY_CLAIM_KEY, recoveryClaimMarker(refreshToken, "done"));
  } catch {
    // The in-memory success map still suppresses a second setSession.
  }
}

function releaseRecoveryClaim(refreshToken: string): void {
  try {
    if (sessionStorage.getItem(RECOVERY_CLAIM_KEY) === recoveryClaimMarker(refreshToken, "pending")) {
      sessionStorage.removeItem(RECOVERY_CLAIM_KEY);
    }
  } catch {
    // Nothing else can be released.
  }
}

export function isConsumedRefreshError(error: { message?: string } | null | undefined): boolean {
  const message = error?.message ?? "";
  return /invalid refresh token|refresh token not found|already used/i.test(message);
}

export async function waitForRecoveryUser(hasUser: () => Promise<boolean>): Promise<boolean> {
  for (let attempt = 0; attempt < recoverySessionPoll.attempts; attempt += 1) {
    if (await hasUser()) return true;
    if (attempt < recoverySessionPoll.attempts - 1 && recoverySessionPoll.delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, recoverySessionPoll.delayMs));
    }
  }
  return false;
}

/**
 * Adopts an implicit recovery session once per refresh token. A second
 * setSession with a rotated refresh token revokes the whole session.
 */
export function adoptRecoverySession(
  session: StashedRecoverySession,
  adopt: () => Promise<RecoveryAttemptResult>,
  hasUser: () => Promise<boolean>,
): Promise<RecoveryAttemptResult> {
  return attemptOnce(`session:${session.refreshToken}`, async () => {
    const role = claimRecoveryRefresh(session.refreshToken);
    if (role !== "owner") {
      const found = await waitForRecoveryUser(hasUser);
      if (found) {
        finishRecoveryClaim(session.refreshToken);
        return { ok: true, error: null };
      }
      if (role === "done") {
        return { ok: false, error: { message: "Auth session missing!" } };
      }
      releaseRecoveryClaim(session.refreshToken);
      try {
        sessionStorage.setItem(RECOVERY_CLAIM_KEY, recoveryClaimMarker(session.refreshToken, "pending"));
      } catch {
        // Continue with the single in-memory attempt.
      }
    }

    try {
      const result = await adopt();
      if (result.ok || isConsumedRefreshError(result.error)) finishRecoveryClaim(session.refreshToken);
      else releaseRecoveryClaim(session.refreshToken);
      return result;
    } catch (error) {
      releaseRecoveryClaim(session.refreshToken);
      throw error;
    }
  });
}

export function recoveryTransportMessage(error: { message?: string } | null | undefined): string | null {
  const message = error?.message ?? "";
  if (/network|failed to fetch|fetch failed|timeout/i.test(message)) {
    return RECOVERY_LINK_OFFLINE;
  }
  return null;
}

/** Keeps the post-login redirect on this site. */
export function safeNextPath(value: string | null): string {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    value.includes("://") ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return "/dashboard";
  }
  return value;
}
