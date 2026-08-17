type ArticleHeaderProps = {
  title: string;
  description?: string;
  author?: string;
  datePublished?: string;
  dateReviewed?: string;
  readingTime?: string;
};

function displayDate(iso: string) {
  const date = iso.includes("T") ? new Date(iso) : new Date(`${iso}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
}

export default function ArticleHeader({
  title,
  description,
  author,
  datePublished,
  dateReviewed,
  readingTime,
}: ArticleHeaderProps) {
  return (
    <header className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 text-lg text-stone-600 leading-relaxed">{description}</p>
        ) : null}
        <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-500">
          {author ? (
            <div>
              <dt className="inline">Author: </dt>
              <dd className="inline text-stone-800">{author}</dd>
            </div>
          ) : null}
          {datePublished ? (
            <div>
              <dt className="inline">Published: </dt>
              <dd className="inline">
                <time dateTime={datePublished}>{displayDate(datePublished)}</time>
              </dd>
            </div>
          ) : null}
          {dateReviewed ? (
            <div>
              <dt className="inline">Last reviewed: </dt>
              <dd className="inline">
                <time dateTime={dateReviewed}>{displayDate(dateReviewed)}</time>
              </dd>
            </div>
          ) : null}
          {readingTime ? (
            <div>
              <dt className="inline">Reading time: </dt>
              <dd className="inline">{readingTime}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </header>
  );
}
