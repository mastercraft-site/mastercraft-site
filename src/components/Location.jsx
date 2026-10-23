import { site } from '../config.js';

export default function Location() {
  return (
    <section id="location" className="scroll-mt-24 border-t border-white/10 bg-charcoal-light py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow">Visit Us</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Come By Long Island City</h2>
          <address className="mt-6 not-italic text-lg text-white/85">
            {site.street}
            <br />
            {site.cityStateZip}
          </address>
          <p className="mt-3 text-white/70">{site.hoursRange}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Get Directions</a>
            <a href={site.phoneHref} className="btn-ghost">Call {site.phoneDisplay}</a>
          </div>
        </div>

        <div className="card overflow-hidden">
          <iframe
            title="Map of MasterCraft Auto Repair & Collision"
            src={site.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full border-0 grayscale-[30%] md:h-96"
          />
        </div>
      </div>
    </section>
  );
}
