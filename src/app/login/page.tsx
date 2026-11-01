"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { recoveryTransportMessage } from "@/lib/recovery-link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("password") === "updated") {
      setNotice("Password updated. Sign in with your new password.");
    } else if (params.get("error") === "auth") {
      setError("That sign-in link could not be completed. Request a new one or try again.");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      setError(
        "Login is temporarily unavailable while we update our systems. Please try again shortly.",
      );
      return;
    }

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    const signedInUser = signInData.user;
    if (!signedInUser) {
      setError("Unable to verify your account. Please try again.");
      await supabase.auth.signOut();
      return;
    }

    const [profileRes, customerRes] = await Promise.all([
      supabase
        .from("profiles")
        .select("role, customer_id")
        .eq("user_id", signedInUser.id)
        .maybeSingle(),
      supabase.from("customers").select("id").eq("auth_user_id", signedInUser.id).maybeSingle(),
    ]);

    const isCustomerRole = profileRes.data?.role === "customer";
    const hasCustomerRecord = Boolean(customerRes.data?.id);
    const profileLinked =
      !profileRes.data?.customer_id || profileRes.data.customer_id === customerRes.data?.id;

    if (!isCustomerRole || !hasCustomerRecord || !profileLinked) {
      await supabase.auth.signOut();
      setError("This account is not authorized for the customer portal. Please contact support.");
      return;
    }

    router.push("/dashboard");
  }

  async function handleForgotPassword() {
    setError(null);
    setNotice(null);

    const email = (document.getElementById("email") as HTMLInputElement | null)?.value.trim() ?? "";
    if (!email) {
      setError("Enter your email address and we'll send a reset link.");
      return;
    }

    setSendingReset(true);
    try {
      const supabase = createClient();
      if (!supabase) {
        setError(
          "Login is temporarily unavailable while we update our systems. Please try again shortly.",
        );
        return;
      }

      const redirectTo = `${window.location.origin}/reset-password`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });
      if (resetError) {
        setError(recoveryTransportMessage(resetError) ?? resetError.message);
        return;
      }

      setNotice("If an account exists for that email, we sent a link to set a new password.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      setError(recoveryTransportMessage({ message }) ?? "Could not send a reset link.");
    } finally {
      setSendingReset(false);
    }
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-stone-900">Sign in</h1>
        <p className="mt-2 text-stone-600">
          Enter your email and password to access your account.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {notice && (
            <div
              className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm"
              role="status"
            >
              {notice}
            </div>
          )}
          {error && (
            <div
              className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
              role="alert"
            >
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-accent-500 outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between gap-3">
              <label htmlFor="password" className="block text-sm font-medium text-stone-700">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading || sendingReset}
                className="text-sm font-medium text-accent-600 hover:underline disabled:opacity-70"
              >
                {sendingReset ? "Sending..." : "Forgot password?"}
              </button>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-accent-500 outline-none"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading || sendingReset}
            className="w-full py-3 bg-accent-600 text-white font-semibold rounded-xl hover:bg-accent-500 disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-stone-600">
          Need access?{" "}
          <Link href="/contact" className="text-accent-600 hover:underline font-medium">
            Contact RelyBricks team
          </Link>
        </p>
      </div>
    </div>
  );
}
