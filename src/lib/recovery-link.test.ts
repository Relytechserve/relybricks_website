/** @vitest-environment jsdom */

import { beforeEach, describe, expect, it } from "vitest";
import {
  adoptRecoverySession,
  interpretRecoveryLink,
  readStashedRecoverySession,
  RECOVERY_CAPTURE_SCRIPT,
  RECOVERY_LINK_EXPIRED,
  RECOVERY_CLAIM_KEY,
  RECOVERY_STASH_KEY,
  recoveryCallbackUrl,
  recoveryClaimMarker,
  recoverySessionPoll,
  resetRecoveryAdoptionForTests,
  safeNextPath,
} from "./recovery-link";

const origin = "https://relybricks.com/reset-password";

describe("interpretRecoveryLink", () => {
  it("reads implicit recovery tokens from the hash", () => {
    const link = interpretRecoveryLink(
      `${origin}#access_token=access&refresh_token=refresh&expires_in=3600&token_type=bearer&type=recovery`,
    );
    expect(link).toEqual({
      kind: "session",
      accessToken: "access",
      refreshToken: "refresh",
    });
  });

  it("reads invite hash tokens the same way", () => {
    const link = interpretRecoveryLink(
      `${origin}#access_token=access&refresh_token=refresh&type=invite`,
    );
    expect(link.kind).toBe("session");
  });

  it("treats an expired or used link as a failure, not a form", () => {
    const link = interpretRecoveryLink(
      `${origin}#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired`,
    );
    expect(link).toEqual({ kind: "error", message: RECOVERY_LINK_EXPIRED });
  });

  it("reads an expired link from the query string", () => {
    const link = interpretRecoveryLink(`${origin}?error=access_denied&error_code=otp_expired`);
    expect(link).toEqual({ kind: "error", message: RECOVERY_LINK_EXPIRED });
  });

  it("treats a partial token hash as a failure", () => {
    const link = interpretRecoveryLink(`${origin}#access_token=only-access&type=recovery`);
    expect(link.kind).toBe("error");
  });

  it("reads a PKCE code from the query string", () => {
    const link = interpretRecoveryLink(`${origin}?code=auth-code&next=/reset-password`);
    expect(link).toEqual({ kind: "code", code: "auth-code" });
  });

  it("reads a token hash for server-side verify", () => {
    const link = interpretRecoveryLink(`${origin}?token_hash=hashed&type=recovery`);
    expect(link).toEqual({ kind: "otp", tokenHash: "hashed", type: "recovery" });
  });

  it("reads an invite token hash", () => {
    const link = interpretRecoveryLink(`${origin}?token_hash=hashed&type=invite`);
    expect(link).toEqual({ kind: "otp", tokenHash: "hashed", type: "invite" });
  });

  it("ignores an unknown otp type", () => {
    const link = interpretRecoveryLink(`${origin}?token_hash=hashed&type=not-a-type`);
    expect(link).toEqual({ kind: "none" });
  });

  it("a bare reset page has no link", () => {
    expect(interpretRecoveryLink(origin)).toEqual({ kind: "none" });
  });

  it("search params override the same hash keys", () => {
    const link = interpretRecoveryLink(
      `${origin}?access_token=from-search&refresh_token=from-search#access_token=from-hash&refresh_token=from-hash`,
    );
    expect(link).toEqual({
      kind: "session",
      accessToken: "from-search",
      refreshToken: "from-search",
    });
  });
});

describe("recoveryCallbackUrl", () => {
  it("sends a PKCE code to the callback with a reset-password return path", () => {
    expect(recoveryCallbackUrl("https://relybricks.com", "auth-code")).toBe(
      "https://relybricks.com/auth/callback?code=auth-code&next=%2Freset-password",
    );
  });
});

describe("recovery capture script", () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.history.replaceState(null, "", "/reset-password");
  });

  it("stores implicit tokens and clears them from the URL without leaving the page", () => {
    window.history.replaceState(
      null,
      "",
      "/reset-password#access_token=access&refresh_token=refresh&type=recovery",
    );

    window.eval(RECOVERY_CAPTURE_SCRIPT);

    expect(readStashedRecoverySession()).toEqual({
      accessToken: "access",
      refreshToken: "refresh",
    });
    expect(window.location.pathname).toBe("/reset-password");
    expect(window.location.hash).toBe("");
    expect(window.location.search).toBe("");
    expect(RECOVERY_CAPTURE_SCRIPT).not.toContain("/verify");
    expect(RECOVERY_CAPTURE_SCRIPT).not.toContain("location.replace");
    expect(RECOVERY_CAPTURE_SCRIPT).not.toContain("location.assign");
  });

  it("leaves a stashed session in place when a later redirect only has an error", () => {
    sessionStorage.setItem(
      RECOVERY_STASH_KEY,
      JSON.stringify({ accessToken: "access", refreshToken: "refresh" }),
    );
    window.history.replaceState(
      null,
      "",
      "/reset-password#error=access_denied&error_code=otp_expired",
    );

    window.eval(RECOVERY_CAPTURE_SCRIPT);

    expect(readStashedRecoverySession()).toEqual({
      accessToken: "access",
      refreshToken: "refresh",
    });
    expect(window.location.hash).toContain("error_code=otp_expired");
  });
});

describe("adoptRecoverySession", () => {
  const session = { accessToken: "access", refreshToken: "refresh" };

  beforeEach(() => {
    sessionStorage.clear();
    resetRecoveryAdoptionForTests();
    recoverySessionPoll.attempts = 2;
    recoverySessionPoll.delayMs = 0;
  });

  it("calls setSession once for the same refresh token", async () => {
    let calls = 0;
    let resolveAdopt: (result: { ok: boolean; error: null }) => void = () => {};
    const pending = new Promise<{ ok: boolean; error: null }>((resolve) => {
      resolveAdopt = resolve;
    });
    const adopt = () => {
      calls += 1;
      return pending;
    };

    const first = adoptRecoverySession(session, adopt, async () => false);
    const second = adoptRecoverySession(session, adopt, async () => false);
    expect(calls).toBe(1);
    resolveAdopt({ ok: true, error: null });
    await expect(Promise.all([first, second])).resolves.toEqual([
      { ok: true, error: null },
      { ok: true, error: null },
    ]);

    await adoptRecoverySession(session, adopt, async () => true);
    expect(calls).toBe(1);
    expect(sessionStorage.getItem(RECOVERY_CLAIM_KEY) ?? "").not.toContain(session.refreshToken);
  });

  it("does not call setSession again while an earlier attempt is still pending", async () => {
    sessionStorage.setItem(RECOVERY_CLAIM_KEY, recoveryClaimMarker(session.refreshToken, "pending"));
    let calls = 0;
    let lookups = 0;

    const result = await adoptRecoverySession(
      session,
      () => {
        calls += 1;
        return Promise.resolve({ ok: true, error: null });
      },
      async () => {
        lookups += 1;
        return lookups > 1;
      },
    );

    expect(result).toEqual({ ok: true, error: null });
    expect(calls).toBe(0);
    expect(lookups).toBe(2);
  });
});

describe("safeNextPath", () => {
  it("stays on this site", () => {
    expect(safeNextPath("/reset-password")).toBe("/reset-password");
    expect(safeNextPath(null)).toBe("/dashboard");
    expect(safeNextPath("//evil.example")).toBe("/dashboard");
    expect(safeNextPath("https://evil.example")).toBe("/dashboard");
    expect(safeNextPath("/\\evil.example")).toBe("/dashboard");
  });
});
