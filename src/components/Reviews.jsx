import { site } from '../config.js';

const Stars = ({ n }) => (
  <span className="text-lg tracking-[0.12em] text-[#ffb020]" aria-label={`${n} out of 5 stars`}>
    {'★'.repeat(n)}
    <span className="text-white/25">{'★'.repeat(5 - n)}</span>
  </span>
);

export default function Reviews({ reviews }) {
  if (reviews.length === 0) {
    return (
      <section id="reviews" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
        <p className="eyebrow">Reviews</p>
        <h2 className="mt-4 text-5xl">Customer Reviews</h2>
        <p className="mt-6 text-white/60">Reviews are coming soon.</p>
        <a href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-8">Leave a review</a>
      </section>
    );
  }

  const average = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section id="reviews" className="scroll-mt-24 bg-charcoal py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
          <p className="eyebrow">Verified Local Reviews</p>
          <h2 className="mt-4 text-5xl md:text-6xl">What Drivers Say</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/85">
            <span className="font-bold text-white">{average}</span> average.{' '}
            <a href={site.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 underline-offset-4 hover:text-white">Read all reviews on Google</a>
            {' '}&middot;{' '}
            <a href={site.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 underline-offset-4 hover:text-white">Leave a review</a>
          </p>

      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.id}>
            <article className="card flex h-full flex-col gap-4 bg-charcoal-light p-7">
              <Stars n={r.rating} />
              <blockquote className="flex-1 text-lg leading-relaxed text-white/90">&ldquo;{r.text}&rdquo;</blockquote>
              {/\.{3}\s*$|\u2026\s*$/.test(r.text) && <p className="text-sm leading-relaxed text-white/80">Review excerpt. <a href={r.url || site.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Read the full review on Google</a>.</p>}
              <cite className="mt-auto flex flex-wrap items-center gap-x-2 pt-2 text-base not-italic text-white/80">
                <span className="font-bold text-white">{r.name}</span>
                {r.dateText && <span>&middot; {r.dateText}</span>}
                {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">Read on Google &rarr;</a>}
              </cite>
            </article>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
