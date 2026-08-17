import Link from "next/link";
import type { CaseStudyCardData } from "@/components/content/types";

type CaseStudyCardProps = {
  study: CaseStudyCardData;
};

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500">{label}</p>
      <p className="mt-1 text-sm text-stone-700 leading-relaxed">{value}</p>
    </div>
  );
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <article className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <h3 className="font-display text-xl font-semibold text-stone-950 tracking-tight">
        {study.title}
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Situation" value={study.situation} />
        <Field label="Property type" value={study.propertyType} />
        <Field label="Area" value={study.area} />
        <Field label="Challenge" value={study.challenge} />
        <Field label="Action" value={study.action} />
        <Field label="Result" value={study.result} />
      </div>
      {study.quote ? (
        <blockquote className="mt-5 text-sm text-stone-700 leading-relaxed">
          “{study.quote}”
        </blockquote>
      ) : null}
      {study.href ? (
        <Link
          href={study.href}
          className="mt-5 inline-flex text-sm font-medium text-accent-700 hover:text-accent-600"
        >
          {study.hrefLabel ?? "Read the full case study"}
        </Link>
      ) : null}
    </article>
  );
}
