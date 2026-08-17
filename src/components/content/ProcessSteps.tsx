import type { ProcessStep } from "@/components/content/types";

type ProcessStepsProps = {
  steps: ProcessStep[];
};

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <li
          key={`${index}-${step.title}`}
          className="relative rounded-3xl border border-stone-200 bg-stone-50 px-4 py-5 shadow-sm"
        >
          <p className="text-[11px] font-semibold text-stone-700">
            {`${String(index + 1).padStart(2, "0")} · ${step.title}`}
          </p>
          <p className="mt-2 text-[11px] sm:text-xs text-stone-600 leading-relaxed">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
