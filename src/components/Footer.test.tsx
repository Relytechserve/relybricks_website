/** @vitest-environment jsdom */

import type { ReactNode } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("./Logo", () => ({
  default: () => <span>Logo</span>,
}));

import Footer from "./Footer";

afterEach(() => {
  cleanup();
});

describe("Footer", () => {
  it("links major services to the live AEO pages", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Property Management" }).getAttribute("href")).toBe(
      "/property-management-chennai",
    );
    expect(screen.getByRole("link", { name: "NRI Property Management" }).getAttribute("href")).toBe(
      "/nri-property-management-chennai",
    );
    expect(screen.getByRole("link", { name: "Tenant Management" }).getAttribute("href")).toBe(
      "/tenant-management-chennai",
    );
    expect(screen.getByRole("link", { name: "Maintenance & Repair" }).getAttribute("href")).toBe(
      "/services",
    );
    expect(screen.getByRole("link", { name: "Buying & Selling" }).getAttribute("href")).toBe(
      "/services",
    );
    expect(screen.getByRole("link", { name: "Land / Plot Care" }).getAttribute("href")).toBe(
      "/services",
    );
  });
});
