"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "relybricks-cookie-consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setShow(true);
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setShow(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-white border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 id="cookie-consent-title" className="font-semibold text-stone-900">
            We use cookies
          </h2>
          <p id="cookie-consent-desc" className="mt-1 text-sm text-stone-600">
            We use cookies to improve your experience and analyse site traffic. By clicking
            &quot;Accept&quot;, you consent to our use of cookies.{" "}
            <Link href="/cookies" className="text-accent-600 hover:underline">
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2.5 border border-stone-300 text-stone-700 rounded-xl hover:bg-stone-50 font-medium text-sm transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2.5 bg-accent-600 text-white rounded-xl hover:bg-accent-500 font-medium text-sm transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
