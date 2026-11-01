/** @vitest-environment jsdom */

import type { ReactNode } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const push = vi.fn();
const signInWithPassword = vi.fn();
const resetPasswordForEmail = vi.fn();
const signOut = vi.fn();
const from = vi.fn();

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: vi.fn() }),
}));

vi.mock("@/lib/supabase", () => ({
  createClient: () => ({
    auth: {
      signInWithPassword,
      resetPasswordForEmail,
      signOut,
    },
    from,
  }),
}));

import LoginPage from "./page";

function mockCustomerQuery(role: string, customerId: string | null) {
  from.mockImplementation((table: string) => ({
    select: () => ({
      eq: () => ({
        maybeSingle: async () =>
          table === "profiles"
            ? { data: { role, customer_id: customerId }, error: null }
            : { data: customerId ? { id: customerId } : null, error: null },
      }),
    }),
  }));
}

beforeEach(() => {
  push.mockReset();
  signInWithPassword.mockReset();
  resetPasswordForEmail.mockReset();
  signOut.mockReset();
  from.mockReset();
  window.history.replaceState(null, "", "/login");
});

afterEach(() => {
  cleanup();
});

describe("LoginPage", () => {
  it("keeps non-customer accounts out of the portal", async () => {
    signInWithPassword.mockResolvedValue({
      data: { user: { id: "staff-1" } },
      error: null,
    });
    signOut.mockResolvedValue({ error: null });
    mockCustomerQuery("admin", null);

    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "staff@relybricks.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "secret-pass" } });
    fireEvent.submit(screen.getByRole("button", { name: "Sign in" }).closest("form")!);

    expect(
      await screen.findByText(
        "This account is not authorized for the customer portal. Please contact support.",
      ),
    ).toBeTruthy();
    expect(signOut).toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });

  it("sends a reset email to this site's reset page", async () => {
    resetPasswordForEmail.mockResolvedValue({ error: null });

    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "owner@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Forgot password?" }));

    await waitFor(() => {
      expect(resetPasswordForEmail).toHaveBeenCalledWith("owner@example.com", {
        redirectTo: `${window.location.origin}/reset-password`,
      });
    });
    expect(
      await screen.findByText(
        "If an account exists for that email, we sent a link to set a new password.",
      ),
    ).toBeTruthy();
    expect(signInWithPassword).not.toHaveBeenCalled();
  });

  it("asks for an email before sending a reset link", async () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByRole("button", { name: "Forgot password?" }));

    expect(
      await screen.findByText("Enter your email address and we'll send a reset link."),
    ).toBeTruthy();
    expect(resetPasswordForEmail).not.toHaveBeenCalled();
  });

  it("confirms a password that was just updated", async () => {
    window.history.replaceState(null, "", "/login?password=updated");
    render(<LoginPage />);

    expect(await screen.findByText("Password updated. Sign in with your new password.")).toBeTruthy();
  });
});
