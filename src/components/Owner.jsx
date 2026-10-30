import { site } from '../config.js';

export default function Owner() {
  return (
    <section id="owner" aria-labelledby="owner-heading" className="scroll-mt-24 bg-charcoal-light py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
        <figure className="min-w-0">
          <img src={site.owner.photo} alt={site.owner.photoAlt} loading="lazy" width="800" height="1000" className="aspect-[4/5] max-h-[34rem] w-full border border-white/20 object-cover" />
        </figure>
        <div className="min-w-0">
          <p className="eyebrow">Meet The Owner</p>
          <h2 id="owner-heading" className="mt-4 text-5xl md:text-6xl">{site.owner.name}</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            Over 30 years in collision and mechanical repair. Every car that comes through our doors gets a personal look from me, from the first estimate to the final inspection.
          </p>
          <blockquote className="mt-7 border-l-4 border-brand pl-5 text-xl leading-relaxed text-white md:text-2xl">
            &ldquo;I want every customer to drive away knowing the job was done right.&rdquo;
          </blockquote>
          <ul className="mt-8 flex flex-wrap gap-3 text-base text-white/85">
            <li className="border border-white/20 px-4 py-2">30+ years experience</li>
            <li className="border border-white/20 px-4 py-2">Certified technicians</li>
          </ul>
        </div>
      </div>
    </section>
  );
}