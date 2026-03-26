import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Refer a Friend | RelyBricks Property Management Chennai",
  description:
    "Know someone who needs trusted property management in Chennai? Share RelyBricks—transparent care, digital reporting, and peace of mind for NRIs and remote owners.",
  alternates: { canonical: "/referral" },
  openGraph: {
    title: "Refer a Friend — RelyBricks",
    description:
      "Help someone you trust find professional property management in Chennai.",
    url: "/referral",
  },
};

const steps = [
  {
    step: "01",
    title: "You share",
    body: "Tell a friend, colleague, or family member who owns property in Chennai and could use a reliable partner.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    step: "02",
    title: "We connect",
    body: "They reach out—we walk them through how subscription plans, visits, and reporting work.",
    icon: SparklesIcon,
  },
  {
    step: "03",
    title: "They relax",
    body: "They get the same transparent, tech-enabled care you value—without the guesswork.",
    icon: ShieldCheckIcon,
  },
];

export default function ReferralPage() {
  return (
    <div>
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-brick-800 via-stone-900 to-stone-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&w=1920"
            alt=""
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brick-900/85 via-stone-900/92 to-stone-950" />
        </div>

        {/* Ripple / referral spread — pure SVG, no extra deps */}
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[min(520px,90vw)] aspect-square pointer-events-none opacity-40">
          <svg viewBox="0 0 200 200" className="w-full h-full text-accent-400/30" aria-hidden>
            <circle cx="100" cy="100" r="8" fill="currentColor" className="text-accent-400" />
            <circle cx="100" cy="100" r="32" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="56" fill="none" stroke="currentColor" strokeWidth="0.35" />
            <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="0.25" />
            <line x1="100" y1="100" x2="168" y2="52" stroke="currentColor" strokeWidth="0.4" />
            <line x1="100" y1="100" x2="40" y2="48" stroke="currentColor" strokeWidth="0.4" />
            <line x1="100" y1="100" x2="52" y2="158" stroke="currentColor" strokeWidth="0.4" />
            <circle cx="168" cy="52" r="5" fill="currentColor" className="text-white/80" />
            <circle cx="40" cy="48" r="5" fill="currentColor" className="text-white/80" />
            <circle cx="52" cy="158" r="5" fill="currentColor" className="text-white/80" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-200/90">
            Word travels
          </p>
          <h1 className="mt-4 font-display text-4xl lg:text-5xl font-bold text-white max-w-2xl">
            Refer someone who deserves peace of mind
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-stone-300 max-w-xl leading-relaxed">
            The best introductions come from people who already trust us. If you know a homeowner
            in Chennai—especially NRIs or out-of-station owners—point them here. We&apos;ll take it
            from there.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-accent-500 text-stone-950 font-semibold hover:bg-accent-400 transition-colors shadow-lg shadow-accent-900/30"
            >
              Start a referral
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <a
              href="mailto:info@relybricks.com?subject=Referral%20%E2%80%94%20RelyBricks"
              className="inline-flex items-center px-7 py-3.5 rounded-2xl border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
            >
              Email us instead
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-stone-50 border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-stone-900 text-center max-w-2xl mx-auto">
            Three simple beats
          </h2>
          <p className="mt-3 text-center text-stone-600 max-w-xl mx-auto">
            No forms to decode—just a clear path from your introduction to their onboarding.
          </p>

          <div className="mt-14 grid md:grid-cols-3 gap-8 lg:gap-10">
            {steps.map(({ step, title, body, icon: Icon }, i) => (
              <div
                key={step}
                className="group relative rounded-3xl border border-stone-200 bg-white p-8 shadow-sm hover:shadow-md hover:border-accent-200/80 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold tracking-widest text-accent-700">{step}</span>
                  <div className="rounded-2xl bg-accent-50 p-3 text-accent-700 ring-1 ring-accent-100 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-stone-900">{title}</h3>
                <p className="mt-3 text-stone-600 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border border-dashed border-stone-300 bg-stone-100/80 px-6 py-10 text-center max-w-2xl mx-auto">
            <p className="text-sm text-stone-600 leading-relaxed">
              Running a formal partner or incentive program? Mention it when you{" "}
              <Link href="/contact" className="font-semibold text-accent-700 hover:text-accent-800 underline-offset-2 hover:underline">
                contact us
              </Link>{" "}
              — we&apos;re happy to align with how you like to refer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
