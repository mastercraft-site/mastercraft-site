import { pages } from '../data/pages.js';
import { site } from '../config.js';
import reviews from '../data/reviews.json';
import Owner from './Owner.jsx';
import Reviews from './Reviews.jsx';
import EstimateSection from './EstimateSection.jsx';

export default function ContentPage({ page, onEstimate }) {
  return (
    <>
      <article className="pt-28 md:pt-36">
        <div className="mx-auto max-w-6xl px-5">
          <nav aria-label="Breadcrumb" className="mb-8 text-base text-white/80">
            <ol className="flex flex-wrap gap-3">
              <li><a href="/" className="underline underline-offset-4 hover:text-white">Home</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{page.label}</li>
            </ol>
          </nav>
          <p className="eyebrow">MasterCraft &middot; Long Island City, Queens</p>
          <h1 className="mt-5 max-w-4xl text-4xl sm:text-5xl lg:text-6xl">{page.heading}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/85">{page.intro}</p>
          {page.kind !== 'privacy' && <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onEstimate} className="btn-primary">Request A Free Estimate</button>
            <a href={site.phoneHref} className="btn-ghost">Call {site.phoneDisplay}</a>
          </div>}
        </div>

        {page.image && (
          <figure className="mx-auto mt-12 max-w-6xl px-5">
            <img src={page.image} alt={page.imageAlt} width={page.imageWidth || 1920} height={page.imageHeight || 720} className="max-h-[32rem] w-full bg-charcoal-light object-contain" />
            <figcaption className="mt-3 text-base text-white/80">{page.imageAlt}</figcaption>
          </figure>
        )}

        {page.sections && (
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            {page.points && <ul className="mb-12 grid gap-3 border-y border-white/20 py-6 text-lg text-white/90 sm:grid-cols-2">{page.points.map((point) => <li key={point} className="border-l-2 border-brand pl-4">{point}</li>)}</ul>}
            <div className="max-w-3xl space-y-10">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-3xl">{section.heading}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-white/85">{section.text}</p>
                </section>
              ))}
            </div>
          </div>
        )}

        {page.questions && (
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <div className="max-w-3xl divide-y divide-white/20 border-y border-white/20">
              {page.questions.map((item) => (
                <section key={item.question} className="py-8">
                  <h2 className="text-2xl normal-case leading-snug md:text-3xl">{item.question}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-white/90">{item.answer}</p>
                </section>
              ))}
            </div>
          </div>
        )}
        {page.kind === 'about' && <Owner />}
        {page.kind === 'reviews' && <Reviews reviews={reviews} />}

        <nav aria-label="Related pages" className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="text-2xl">Explore More</h2>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-4 text-lg">
            {page.related.map((path) => <li key={path}><a href={path} className="text-white/90 underline decoration-brand underline-offset-4 hover:text-red-400">{pages.find((item) => item.path === path).label}</a></li>)}
          </ul>
        </nav>
      </article>
      {page.kind !== 'privacy' && <EstimateSection />}
    </>
  );
}