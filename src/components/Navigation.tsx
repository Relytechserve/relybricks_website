"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/aboutus", label: "About" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/property-management-chennai", label: "Property Management in Chennai" },
  { href: "/nri-property-management-chennai", label: "NRI Property Management" },
  { href: "/tenant-management-chennai", label: "Tenant Management" },
  { href: "/services", label: "All Services" },
];

const SERVICES_SUBMENU_ID = "desktop-services-submenu";

const linkClass =
  "text-stone-600 hover:text-accent-600 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 rounded-sm";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const servicesToggleRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setAuthReady(true);
      return;
    }

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(Boolean(data.session));
      setAuthReady(true);
    }

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setIsLoggedIn(Boolean(session));
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex justify-between items-center h-18 lg:h-20">
          <Link href="/" className="flex items-center">
            <Logo variant="full" />
          </Link>

          <ul className="hidden lg:flex items-center gap-10 list-none">
            <li>
              <Link href="/" className={linkClass}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/aboutus" className={linkClass}>
                About
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setServicesOpen(false);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setServicesOpen(false);
                  servicesToggleRef.current?.focus();
                }
              }}
            >
              <div className="inline-flex items-center">
                <Link href="/services" className={linkClass}>
                  Services
                </Link>
                <button
                  ref={servicesToggleRef}
                  type="button"
                  className={`${linkClass} ml-0.5 p-1`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  aria-controls={SERVICES_SUBMENU_ID}
                  aria-label="Services submenu"
                  onClick={() => setServicesOpen((open) => !open)}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              <div hidden={!servicesOpen} className="absolute left-0 top-full z-50 pt-3">
                <ul
                  id={SERVICES_SUBMENU_ID}
                  className="min-w-[17.5rem] rounded-2xl border border-stone-200 bg-white py-2 shadow-lg list-none"
                >
                  {serviceLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block px-4 py-2.5 text-sm text-stone-600 hover:bg-accent-50 hover:text-accent-700 focus-visible:bg-accent-50 focus-visible:text-accent-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
                        onClick={() => setServicesOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link href="/contact" className={linkClass}>
                Contact
              </Link>
            </li>
            {authReady &&
              (isLoggedIn ? (
                <li className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => void handleSignOut()}
                    className="text-sm text-stone-500 hover:text-stone-900"
                  >
                    Sign out
                  </button>
                  <Link
                    href="/dashboard"
                    className="px-6 py-3 bg-accent-600 text-white font-semibold rounded-xl hover:bg-accent-700 transition-colors shadow-lg shadow-accent-500/25"
                  >
                    Customer Portal
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="px-6 py-3 bg-accent-600 text-white font-semibold rounded-xl hover:bg-accent-700 transition-colors shadow-lg shadow-accent-500/25"
                  >
                    Customer Login
                  </Link>
                </li>
              ))}
          </ul>

          <button
            type="button"
            className="lg:hidden p-2 text-stone-600 hover:text-stone-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 rounded-sm"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <ul className="lg:hidden py-4 border-t border-stone-200 animate-fade-in flex flex-col gap-2 list-none">
            {navLinks.slice(0, 2).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-stone-600 hover:text-accent-600 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 rounded-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="py-1">
              <Link
                href="/services"
                className="block py-2 text-stone-900 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 rounded-sm"
                onClick={() => setMobileOpen(false)}
              >
                Services
              </Link>
              <ul className="flex flex-col border-l border-stone-200 pl-4 list-none">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-2.5 text-sm text-stone-600 hover:text-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 rounded-sm"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {navLinks.slice(2).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-stone-600 hover:text-accent-600 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 rounded-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {authReady &&
              (isLoggedIn ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="mt-2 block py-3 px-4 bg-accent-600 text-white font-semibold rounded-xl text-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Customer Portal
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        void handleSignOut();
                        setMobileOpen(false);
                      }}
                      className="w-full py-3 text-sm text-stone-600 hover:text-stone-900 font-medium text-center"
                    >
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="mt-2 block py-3 px-4 bg-accent-600 text-white font-semibold rounded-xl text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Customer Login
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
