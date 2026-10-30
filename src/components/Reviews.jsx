import { site } from '../config.js';

const Stars = ({ n }) => (
  <span className="text-brand" aria-label={`${n} out of 5 stars`}>
    {'★'.repeat(n)}
    <span className="text-white/25">{'★'.repeat(5 - n)}</span>
  </span>
);

function ReviewInvitation() {
  return (
    <a href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost self-start md:self-auto">Leave a Google Review</a>
  );
}

export default function Reviews({ reviews }) {
  if (reviews.length === 0) {
    return (
      <section id="reviews" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
        <p className="eyebrow">Reviews</p>
        <h2 className="mt-4 text-5xl">Customer Reviews</h2>
        <p className="mt-6 text-white/60">Reviews are coming soon.</p>
        <div className="mt-8"><ReviewInvitation /></div>
      </section>
    );
  }

  const average = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section id="reviews" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Verified Local Reviews</p>
          <h2 className="mt-4 text-5xl md:text-6xl">What Drivers Say</h2>
          <p className="mt-4 text-white/70">
            <span className="font-display text-2xl font-bold text-white">{average}</span> average across {reviews.length} reviews.
          </p>
        </div>
        <ReviewInvitation />
      </div>

      <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.id}>
            <figure className="card flex h-full flex-col p-7">
              <Stars n={r.rating} />
              <blockquote className="mt-4 flex-1 text-white/90 leading-relaxed">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center gap-x-3 border-t border-white/10 pt-4 text-sm text-white/60">
                <span className="font-bold text-white">{r.name}</span>
                {r.dateText && <span>&middot; {r.dateText}</span>}
                {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Read on Google &rarr;</a>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
