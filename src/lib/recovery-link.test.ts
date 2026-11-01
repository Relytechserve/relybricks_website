import { describe, expect, it } from "vitest";
import {
  interpretRecoveryLink,
  recoveryCallbackUrl,
  RECOVERY_LINK_EXPIRED,
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

describe("safeNextPath", () => {
  it("stays on this site", () => {
    expect(safeNextPath("/reset-password")).toBe("/reset-password");
    expect(safeNextPath(null)).toBe("/dashboard");
    expect(safeNextPath("//evil.example")).toBe("/dashboard");
    expect(safeNextPath("https://evil.example")).toBe("/dashboard");
    expect(safeNextPath("/\\evil.example")).toBe("/dashboard");
  });
});
