import { PhoneIcon } from "@heroicons/react/24/outline";
import { ButtonLink } from "@/components/content/Section";
import type { CtaLink } from "@/components/content/types";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  answer: string;
  supporting?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
};

export default function PageHero({
  eyebrow,
  title,
  answer,
  supporting,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 to-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {eyebrow ? (
          <p className="inline-flex items-center rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium text-stone-600 shadow-sm">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-6 font-display text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.05] text-stone-900 tracking-tight max-w-3xl">
          {title}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-stone-600 max-w-2xl leading-relaxed">
          {answer}
        </p>
        {supporting ? (
          <p className="mt-4 text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
            {supporting}
          </p>
        ) : null}
        {primaryCta || secondaryCta ? (
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryCta ? (
              <ButtonLink href={primaryCta.href}>
                {primaryCta.href.startsWith("tel:") ? (
                  <PhoneIcon className="h-4 w-4" />
                ) : null}
                {primaryCta.label}
              </ButtonLink>
            ) : null}
            {secondaryCta ? (
              <ButtonLink href={secondaryCta.href} variant="secondary">
                {secondaryCta.label}
              </ButtonLink>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
