type DirectAnswerProps = {
  question?: string;
  answer: string;
};

export default function DirectAnswer({ question, answer }: DirectAnswerProps) {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {question ? (
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-stone-950 tracking-tight">
            {question}
          </h2>
        ) : null}
        <p
          className={`${question ? "mt-4" : ""} text-sm sm:text-base text-stone-700 leading-relaxed`}
        >
          {answer}
        </p>
      </div>
    </section>
  );
}
