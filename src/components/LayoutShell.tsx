"use client";

import type { ReactNode } from "react";
import { PhoneIcon } from "@heroicons/react/24/outline";
import AskAiWidget from "@/components/AskAiWidget";
import { CONTACT_PHONE_TEL, CONTACT_WHATSAPP_HREF } from "@/lib/contact";
import { floatingCtaCircleClass, floatingCtaPillClass } from "@/lib/floating-cta";
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

        <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
          <AskAiWidget />

          <a
            href={CONTACT_PHONE_TEL}
            onClick={() => trackFloatingCallClick("floating_desktop")}
            className={`hidden sm:inline-flex ${floatingCtaPillClass}`}
          >
            <PhoneIcon className="h-4 w-4" aria-hidden />
            <span>Call now</span>
          </a>

          <a
            href={CONTACT_WHATSAPP_HREF}
            onClick={() => trackFloatingCallClick("floating_mobile")}
            className={`sm:hidden ${floatingCtaCircleClass}`}
            aria-label="WhatsApp call RelyBricks now"
          >
            <PhoneIcon className="h-5 w-5" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
