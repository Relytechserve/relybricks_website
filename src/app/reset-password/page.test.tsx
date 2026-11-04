/** @vitest-environment jsdom */

import type { ReactNode } from "react";
import { StrictMode } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  RECOVERY_CAPTURE_SCRIPT,
  RECOVERY_LINK_EXPIRED,
  RECOVERY_LINK_MISSING,
  RECOVERY_LINK_UNUSABLE,
  RECOVERY_STASH_KEY,
  recoverySessionPoll,
  resetRecoveryAdoptionForTests,
} from "@/lib/recovery-link";

const replace = vi.fn();
const routerReplace = vi.fn();
const setSession = vi.fn();
const verifyOtp = vi.fn();
const getUser = vi.fn();
const updateUser = vi.fn();
const signOut = vi.fn();

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: routerReplace, push: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/lib/recovery-link", async () => {
  const actual = await vi.importActual<typeof import("@/lib/recovery-link")>("@/lib/recovery-link");
  return {
    ...actual,
    followRecoveryCode: (origin: string, code: string) => {
      replace(actual.recoveryCallbackUrl(origin, code));
    },
  };
});

vi.mock("@/lib/supabase", () => ({
  createClient: () => ({
    auth: {
      setSession,
      verifyOtp,
      getUser,
      updateUser,
      signOut,
    },
  }),
}));

import ResetPasswordPage from "./page";

function setLocation(href: string) {
  const url = new URL(href);
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

beforeEach(() => {
  replace.mockReset();
  routerReplace.mockReset();
  setSession.mockReset();
  verifyOtp.mockReset();
  getUser.mockReset();
  updateUser.mockReset();
  signOut.mockReset();
  signOut.mockResolvedValue({ error: null });
  sessionStorage.clear();
  resetRecoveryAdoptionForTests();
  recoverySessionPoll.attempts = 3;
  recoverySessionPoll.delayMs = 0;
});

afterEach(() => {
  cleanup();
});

describe("ResetPasswordPage", () => {
  it("shows a missing-link message when there is no recovery session", async () => {
    setLocation("https://relybricks.com/reset-password");
    getUser.mockResolvedValue({ data: { user: null }, error: null });

    render(<ResetPasswordPage />);

    expect((await screen.findByRole("alert")).textContent).toBe(RECOVERY_LINK_MISSING);
    expect(screen.getByRole("link", { name: "Back to sign in" }).getAttribute("href")).toBe("/login");
    expect(screen.queryByLabelText("New password")).toBeNull();
    expect(setSession).not.toHaveBeenCalled();
  });

  it("shows an expired-link message and hides the form", async () => {
    setLocation(
      "https://relybricks.com/reset-password#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired",
    );

    render(<ResetPasswordPage />);

    expect((await screen.findByRole("alert")).textContent).toBe(RECOVERY_LINK_EXPIRED);
    expect(screen.queryByLabelText("New password")).toBeNull();
    expect(setSession).not.toHaveBeenCalled();
    expect(verifyOtp).not.toHaveBeenCalled();
    expect(getUser).toHaveBeenCalled();
    expect(window.location.pathname).toBe("/reset-password");
    expect(window.location.href).not.toContain("/verify");
  });

  it("establishes a session from a recovery hash before showing the form", async () => {
    setLocation(
      "https://relybricks.com/reset-password#access_token=access-token&refresh_token=refresh-token&type=recovery",
    );
    setSession.mockResolvedValue({ error: null });

    render(<ResetPasswordPage />);

    expect(await screen.findByLabelText("New password")).toBeTruthy();
    expect(setSession).toHaveBeenCalledWith({
      access_token: "access-token",
      refresh_token: "refresh-token",
    });
    expect(window.location.hash).toBe("");
    expect(getUser).not.toHaveBeenCalled();
  });

  it("establishes a session from an invite token hash", async () => {
    setLocation("https://relybricks.com/reset-password?token_hash=hashed&type=invite");
    verifyOtp.mockResolvedValue({ error: null });

    render(<ResetPasswordPage />);

    expect(await screen.findByLabelText("New password")).toBeTruthy();
    expect(verifyOtp).toHaveBeenCalledWith({ token_hash: "hashed", type: "invite" });
  });

  it("verifies an invite token only once when the effect is replayed", async () => {
    setLocation("https://relybricks.com/reset-password?token_hash=once&type=invite");
    verifyOtp.mockResolvedValue({ error: null });

    render(
      <StrictMode>
        <ResetPasswordPage />
      </StrictMode>,
    );

    expect(await screen.findByLabelText("New password")).toBeTruthy();
    await waitFor(() => {
      expect(verifyOtp).toHaveBeenCalledTimes(1);
    });
  });

  it("sends a PKCE code to the callback before showing a form", async () => {
    setLocation("https://relybricks.com/reset-password?code=auth-code");

    render(<ResetPasswordPage />);

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith(
        `${window.location.origin}/auth/callback?code=auth-code&next=%2Freset-password`,
      );
    });
    expect(screen.queryByLabelText("New password")).toBeNull();
  });

  it("blocks the form when the hash session cannot be saved", async () => {
    setLocation(
      "https://relybricks.com/reset-password#access_token=access-token&refresh_token=refresh-token&type=recovery",
    );
    setSession.mockResolvedValue({ error: { message: "Invalid Refresh Token" } });

    render(<ResetPasswordPage />);

    expect((await screen.findByRole("alert")).textContent).toBe(RECOVERY_LINK_UNUSABLE);
    expect(screen.queryByLabelText("New password")).toBeNull();
  });

  it("saves a new password and returns to customer sign-in", async () => {
    setLocation(
      "https://relybricks.com/reset-password#access_token=access-token&refresh_token=refresh-token&type=invite",
    );
    setSession.mockResolvedValue({ error: null });
    updateUser.mockResolvedValue({ error: null });

    render(<ResetPasswordPage />);

    fireEvent.change(await screen.findByLabelText("New password"), {
      target: { value: "new-password-1" },
    });
    fireEvent.change(screen.getByLabelText("Confirm password"), {
      target: { value: "new-password-1" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Update password" }).closest("form")!);

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith({ password: "new-password-1" });
    });
    expect(signOut).toHaveBeenCalled();
    expect(routerReplace).toHaveBeenCalledWith("/login?password=updated");
  });

  it("replaces an auth-session-missing error with the unusable-link message", async () => {
    setLocation("https://relybricks.com/reset-password");
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } }, error: null });
    updateUser.mockResolvedValue({ error: { message: "Auth session missing!" } });

    render(<ResetPasswordPage />);

    fireEvent.change(await screen.findByLabelText("New password"), {
      target: { value: "new-password-1" },
    });
    fireEvent.change(screen.getByLabelText("Confirm password"), {
      target: { value: "new-password-1" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Update password" }).closest("form")!);

    expect((await screen.findByRole("alert")).textContent).toBe(RECOVERY_LINK_UNUSABLE);
    expect(routerReplace).not.toHaveBeenCalled();
  });

  it("adopts a recovery hash once, even when the effect is replayed", async () => {
    setLocation(
      "https://relybricks.com/reset-password#access_token=access-token&refresh_token=refresh-token&type=recovery",
    );
    setSession.mockResolvedValue({ error: null });

    render(
      <StrictMode>
        <ResetPasswordPage />
      </StrictMode>,
    );

    expect(await screen.findByLabelText("New password")).toBeTruthy();
    expect(setSession).toHaveBeenCalledTimes(1);
    expect(verifyOtp).not.toHaveBeenCalled();
  });

  it("keeps the set-password form when a later verify redirect only has an error", async () => {
    setLocation(
      "https://relybricks.com/reset-password#access_token=saved-access&refresh_token=saved-refresh&type=recovery",
    );
    window.eval(RECOVERY_CAPTURE_SCRIPT);
    setLocation(
      "https://relybricks.com/reset-password#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired",
    );
    setSession.mockResolvedValue({ error: null });

    render(<ResetPasswordPage />);

    expect(await screen.findByLabelText("New password")).toBeTruthy();
    expect(setSession).toHaveBeenCalledTimes(1);
    expect(setSession).toHaveBeenCalledWith({
      access_token: "saved-access",
      refresh_token: "saved-refresh",
    });
    expect(verifyOtp).not.toHaveBeenCalled();
    expect(sessionStorage.getItem(RECOVERY_STASH_KEY)).toBeNull();
    expect(window.location.hash).toBe("");
    expect(window.location.search).toBe("");
    expect(screen.queryByText(RECOVERY_LINK_EXPIRED)).toBeNull();
  });

  it("shows the form for an error redirect when a recovery session already exists", async () => {
    setLocation(
      "https://relybricks.com/reset-password#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired",
    );
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } }, error: null });

    render(<ResetPasswordPage />);

    expect(await screen.findByLabelText("New password")).toBeTruthy();
    expect(setSession).not.toHaveBeenCalled();
    expect(verifyOtp).not.toHaveBeenCalled();
    expect(window.location.hash).toBe("");
    expect(window.location.search).toBe("");
  });

  it("ignores an error hashchange after the recovery session is saved", async () => {
    setLocation(
      "https://relybricks.com/reset-password#access_token=access-token&refresh_token=refresh-token&type=recovery",
    );
    setSession.mockResolvedValue({ error: null });

    render(<ResetPasswordPage />);

    expect(await screen.findByLabelText("New password")).toBeTruthy();
    setLocation(
      "https://relybricks.com/reset-password#error=access_denied&error_code=otp_expired",
    );
    window.dispatchEvent(new Event("hashchange"));

    expect(screen.getByLabelText("New password")).toBeTruthy();
    expect(setSession).toHaveBeenCalledTimes(1);
    expect(window.location.hash).toBe("");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("does not call verify or setSession again when the cleaned URL is opened", async () => {
    setLocation(
      "https://relybricks.com/reset-password#access_token=access-token&refresh_token=refresh-token&type=recovery",
    );
    setSession.mockResolvedValue({ error: null });
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } }, error: null });

    const first = render(<ResetPasswordPage />);
    expect(await screen.findByLabelText("New password")).toBeTruthy();
    expect(setSession).toHaveBeenCalledTimes(1);
    first.unmount();

    setLocation("https://relybricks.com/reset-password");
    render(<ResetPasswordPage />);

    expect(await screen.findByLabelText("New password")).toBeTruthy();
    expect(setSession).toHaveBeenCalledTimes(1);
    expect(verifyOtp).not.toHaveBeenCalled();
  });
});
