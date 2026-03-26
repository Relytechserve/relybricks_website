"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/aboutus", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authReady, setAuthReady] = useState(false);
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
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 lg:h-20">
          <Link href="/" className="flex items-center">
            <Logo variant="full" />
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone-600 hover:text-accent-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {authReady &&
              (isLoggedIn ? (
                <div className="flex items-center gap-4">
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
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-6 py-3 bg-accent-600 text-white font-semibold rounded-xl hover:bg-accent-700 transition-colors shadow-lg shadow-accent-500/25"
                >
                  Customer Login
                </Link>
              ))}
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-stone-600 hover:text-stone-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
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
          <div className="lg:hidden py-4 border-t border-stone-200 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 text-stone-600 hover:text-accent-600 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {authReady &&
                (isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="mt-2 py-3 px-4 bg-accent-600 text-white font-semibold rounded-xl text-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Customer Portal
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        void handleSignOut();
                        setMobileOpen(false);
                      }}
                      className="py-3 text-sm text-stone-600 hover:text-stone-900 font-medium text-center"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="mt-2 py-3 px-4 bg-accent-600 text-white font-semibold rounded-xl text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Customer Login
                  </Link>
                ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
