import type { ReactNode } from "react";
import Link from "next/link";

type SectionProps = {
  children: ReactNode;
  eyebrow?: string;
  title?: string;
  intro?: string;
  id?: string;
  tone?: "white" | "muted";
  width?: "wide" | "prose";
};

export default function Section({
  children,
  eyebrow,
  title,
  intro,
  id,
  tone = "white",
  width = "wide",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 lg:py-24 ${tone === "muted" ? "bg-stone-50" : "bg-white"}`}
    >
      <div
        className={`mx-auto px-4 sm:px-6 lg:px-8 ${
          width === "prose" ? "max-w-3xl" : "max-w-7xl"
        }`}
      >
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-stone-950 tracking-tight">
            {title}
          </h2>
        ) : null}
        {intro ? (
          <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
            {intro}
          </p>
        ) : null}
        <div className={title || eyebrow || intro ? "mt-10" : undefined}>
          {children}
        </div>
      </div>
    </section>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "onDark" | "onDarkSecondary";
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  const className =
    variant === "primary"
      ? "inline-flex items-center justify-center gap-2 rounded-xl bg-accent-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 hover:bg-accent-700 transition-colors"
      : variant === "secondary"
        ? "inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-7 py-3 text-sm font-semibold text-stone-900 hover:border-accent-300 hover:bg-accent-50 transition-colors"
        : variant === "onDark"
          ? "inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-accent-600 hover:bg-accent-50 transition-colors"
          : "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/50 bg-transparent px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors";

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
