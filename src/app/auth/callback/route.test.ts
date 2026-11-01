import { beforeEach, describe, expect, it, vi } from "vitest";

const cookieSet = vi.fn();
const getAll = vi.fn(() => [{ name: "sb-existing", value: "1" }]);
const exchangeCodeForSession = vi.fn();
const verifyOtp = vi.fn();

vi.mock("next/headers", () => ({
  cookies: async () => ({
    getAll,
    set: cookieSet,
  }),
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: (
    _url: string,
    _key: string,
    options: {
      cookies: {
        setAll: (
          cookies: { name: string; value: string; options?: { path?: string; httpOnly?: boolean } }[],
        ) => void;
      };
    },
  ) => ({
    auth: {
      exchangeCodeForSession: async (code: string) => {
        const result = await exchangeCodeForSession(code);
        if (!result.error) {
          options.cookies.setAll([
            { name: "sb-access-token", value: "session-cookie", options: { path: "/", httpOnly: true } },
          ]);
        }
        return result;
      },
      verifyOtp: async (args: { token_hash: string; type: string }) => {
        const result = await verifyOtp(args);
        if (!result.error) {
          options.cookies.setAll([
            { name: "sb-access-token", value: "otp-cookie", options: { path: "/", httpOnly: true } },
          ]);
        }
        return result;
      },
    },
  }),
}));

import { GET } from "./route";

beforeEach(() => {
  cookieSet.mockReset();
  exchangeCodeForSession.mockReset();
  verifyOtp.mockReset();
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://ofkhtpnsagtcemuycmpp.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";
});

describe("auth callback", () => {
  it("keeps the session cookie when redirecting to reset-password", async () => {
    exchangeCodeForSession.mockResolvedValue({ error: null });

    const response = await GET(
      new Request(
        "https://relybricks.com/auth/callback?code=auth-code&next=/reset-password",
      ),
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://relybricks.com/reset-password");
    expect(response.headers.get("set-cookie")).toContain("sb-access-token=session-cookie");
    expect(exchangeCodeForSession).toHaveBeenCalledWith("auth-code");
  });

  it("sends a failed reset exchange back to the reset page", async () => {
    exchangeCodeForSession.mockResolvedValue({ error: { message: "code expired" } });

    const response = await GET(
      new Request("https://relybricks.com/auth/callback?code=stale&next=/reset-password"),
    );

    expect(response.headers.get("location")).toBe(
      "https://relybricks.com/reset-password?error=access_denied&error_code=otp_expired",
    );
    expect(response.headers.get("set-cookie")).toBeNull();
  });

  it("verifies a token hash and keeps the default dashboard redirect", async () => {
    verifyOtp.mockResolvedValue({ error: null });

    const response = await GET(
      new Request("https://relybricks.com/auth/callback?token_hash=hashed&type=recovery"),
    );

    expect(response.headers.get("location")).toBe("https://relybricks.com/dashboard");
    expect(response.headers.get("set-cookie")).toContain("sb-access-token=otp-cookie");
    expect(verifyOtp).toHaveBeenCalledWith({ token_hash: "hashed", type: "recovery" });
  });

  it("rejects an off-site next path", async () => {
    exchangeCodeForSession.mockResolvedValue({ error: null });

    const response = await GET(
      new Request("https://relybricks.com/auth/callback?code=auth-code&next=https://evil.example"),
    );

    expect(response.headers.get("location")).toBe("https://relybricks.com/dashboard");
  });

  it("sends a callback with no token to login", async () => {
    const response = await GET(new Request("https://relybricks.com/auth/callback"));

    expect(response.headers.get("location")).toBe("https://relybricks.com/login?error=auth");
    expect(exchangeCodeForSession).not.toHaveBeenCalled();
  });
});
