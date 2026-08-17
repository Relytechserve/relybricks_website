/** @vitest-environment jsdom */

import type { ReactNode } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/supabase", () => ({
  createClient: () => null,
}));

vi.mock("./Logo", () => ({
  default: () => <span>Logo</span>,
}));

import Navigation from "./Navigation";

afterEach(() => {
  cleanup();
});

const SERVICE_LINKS = [
  { href: "/property-management-chennai", name: "Property Management in Chennai" },
  { href: "/nri-property-management-chennai", name: "NRI Property Management" },
  { href: "/tenant-management-chennai", name: "Tenant Management" },
  { href: "/services", name: "All Services" },
];

describe("Navigation", () => {
  it("exposes the Services submenu as ordinary links, not an ARIA menu", () => {
    render(<Navigation />);
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/");
    expect(screen.getByRole("link", { name: "About" }).getAttribute("href")).toBe("/aboutus");
    expect(screen.getByRole("link", { name: "Contact" }).getAttribute("href")).toBe("/contact");
    expect(screen.getByRole("link", { name: "Services" }).getAttribute("href")).toBe("/services");

    expect(screen.queryByRole("menu")).toBeNull();
    expect(screen.queryByRole("menuitem")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Services submenu" }));
    expect(
      screen.getByRole("button", { name: "Services submenu" }).getAttribute("aria-expanded"),
    ).toBe("true");

    for (const link of SERVICE_LINKS) {
      expect(screen.getByRole("link", { name: link.name }).getAttribute("href")).toBe(link.href);
    }
  });

  it("shows the same service links in the mobile menu", () => {
    render(<Navigation />);
    fireEvent.click(screen.getByRole("button", { name: "Toggle menu" }));
    expect(screen.getByRole("button", { name: "Toggle menu" }).getAttribute("aria-expanded")).toBe(
      "true",
    );
    expect(screen.getAllByRole("link", { name: "Services" }).some((el) => el.getAttribute("href") === "/services")).toBe(
      true,
    );
    expect(
      screen.getAllByRole("link", { name: "NRI Property Management" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: "Tenant Management" }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "All Services" }).length).toBeGreaterThan(0);
  });

  it("closes the desktop submenu on Escape and returns focus to the toggle", () => {
    render(<Navigation />);
    const toggle = screen.getByRole("button", { name: "Services submenu" });
    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    fireEvent.keyDown(toggle, { key: "Escape" });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
  });

  it("lets keyboard users tab through ordinary submenu links when open", () => {
    render(<Navigation />);
    expect(screen.queryByRole("link", { name: "Tenant Management" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Services submenu" }));
    const tenant = screen.getByRole("link", { name: "Tenant Management" });
    tenant.focus();
    expect(document.activeElement).toBe(tenant);
    expect(tenant.getAttribute("tabindex")).not.toBe("-1");
  });
});
