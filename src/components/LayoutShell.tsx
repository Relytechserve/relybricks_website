"use client";

import type { ReactNode } from "react";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { Tiles } from "@/components/ui/tiles";

type LayoutShellProps = {
  children: ReactNode;
};

function trackFloatingCallClick(source: string) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", "call_now_click", {
      event_category: "engagement",
      event_label: source,
    });
  }
}

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <div className="relative w-full min-w-0">
      <Tiles rows={28} cols={10} tileSize="md" className="opacity-40" />
      <div className="relative z-10 w-full min-w-0">
        {children}

        {/* Global floating call / WhatsApp CTA */}
        {/* Desktop / tablet: pill in bottom-right */}
        <a
          href="tel:+919952004948"
          onClick={() => trackFloatingCallClick("floating_desktop")}
          className="hidden sm:inline-flex fixed bottom-5 right-5 z-40 items-center justify-center gap-2 rounded-full bg-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/30 hover:bg-accent-700 transition-colors"
        >
          <PhoneIcon className="h-4 w-4" />
          <span>Call now</span>
        </a>
        {/* Mobile: circular WhatsApp-style button */}
        <a
          href="https://wa.me/919952004948"
          onClick={() => trackFloatingCallClick("floating_mobile")}
          className="sm:hidden fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent-600 text-white shadow-lg shadow-accent-500/30 hover:bg-accent-700 transition-colors"
          aria-label="WhatsApp call RelyBricks now"
        >
          <PhoneIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

