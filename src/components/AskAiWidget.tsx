import { useEffect, useId, useRef, useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { ASK_AI_PROMPT, buildAskAiLinks } from "@/lib/ask-ai";
import { floatingCtaPillClass } from "@/lib/floating-cta";

function trackAskAiOpen() {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", "ask_ai_open", {
      event_category: "engagement",
      event_label: "floating_widget",
    });
  }
}

function trackAskAiProvider(providerId: string) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", "ask_ai_provider_click", {
      event_category: "engagement",
      event_label: providerId,
    });
  }
}

export default function AskAiWidget() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const links = buildAskAiLinks(ASK_AI_PROMPT);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Ask AI assistants about RelyBricks"
          className="absolute bottom-full right-0 mb-3 w-[min(18rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl shadow-stone-900/10"
        >
          <div className="border-b border-stone-100 px-4 py-3">
            <p className="text-sm font-semibold text-stone-900">Ask AI about RelyBricks</p>
            <p className="mt-1 text-xs leading-relaxed text-stone-500">
              Opens your assistant with a starter question about Chennai property management for
              overseas owners.
            </p>
          </div>
          <ul className="py-1">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  role="menuitem"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackAskAiProvider(link.id);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <span
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-semibold text-stone-700"
                    aria-hidden
                  >
                    {link.badge}
                  </span>
                  <span className="font-medium">{link.name}</span>
                  <span className="ml-auto text-xs text-stone-400" aria-hidden>
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="menu"
        onClick={() => {
          setOpen((current) => {
            const next = !current;
            if (next) trackAskAiOpen();
            return next;
          });
        }}
        className={floatingCtaPillClass}
      >
        <SparklesIcon className="h-4 w-4" aria-hidden />
        <span>Ask AI</span>
      </button>
    </div>
  );
}
