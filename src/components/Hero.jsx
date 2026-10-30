import { site } from '../config.js';

export default function Hero({ onEstimate, rating }) {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden pt-24">
      <img
        src="/images/hero-storefront.webp"
        alt="MasterCraft Auto Repair & Collision storefront in Long Island City"
        width="1600"
        height="1600"
        fetchpriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/30" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-charcoal to-transparent" />
      {/* Brand slash */}
      <div className="absolute -right-24 top-0 -z-10 hidden h-full w-72 -skew-x-12 bg-brand/90 md:block" />

      <div className="mx-auto w-full max-w-6xl px-5 pb-12 md:pb-20">
        <p className="eyebrow mb-6">Long Island City, NY</p>
        <h1 className="max-w-3xl text-6xl sm:text-7xl md:text-8xl">
          Auto Repair &amp; Collision <br className="hidden sm:block" />
          <span className="text-brand">In Long Island City</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/80">
          Full-frame collision restoration, direct insurance claim handling, and expert auto repair under one roof.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button onClick={onEstimate} className="btn-primary">Get Instant Estimate</button>
          <a href={site.phoneHref} className="btn-ghost">Call {site.phoneDisplay}</a>
        </div>

        <dl className="mt-14 grid max-w-md grid-cols-2 gap-6 border-t border-white/15 pt-6">
          <div>
            <dt className="text-xs uppercase tracking-[0.15em] text-white/60">Google rating</dt>
            <dd className="font-display text-4xl font-extrabold">{rating}<span className="text-brand">★</span></dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.15em] text-white/60">Hours</dt>
            <dd className="font-display text-4xl font-extrabold">6AM–12AM</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
