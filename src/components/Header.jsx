import { useEffect, useState } from 'react';
import { site } from '../config.js';

const links = [
  ['/#services', 'Services'],
  ['/#process', 'Process'],
  ['/#before-after', 'Results'],
  ['/reviews/', 'Reviews'],
  ['/faq/', 'FAQ'],
  ['/#location', 'Visit'],
];

export default function Header({ onEstimate }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${scrolled ? 'border-b border-white/10 bg-charcoal/95 backdrop-blur' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <a href="/" className="flex items-center gap-3">
          <img src="/images/logo-badge.webp" alt={`${site.name} logo`} width="44" height="44" className="h-11 w-11 rounded-full object-cover" />
          <span className="font-display text-xl font-extrabold uppercase leading-none tracking-wide">
            {site.shortName}
            <small className="mt-0.5 block font-body text-[0.6rem] font-semibold tracking-[0.2em] text-white/60">Auto Repair &amp; Collision</small>
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="relative text-xs font-bold uppercase tracking-[0.15em] text-white/85 transition after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:text-white hover:after:w-full">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="btn-primary hidden !px-5 !py-3 sm:inline-flex">{site.phoneDisplay}</a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center border-2 border-white/20 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block w-5 space-y-1.5">
              <span className="block h-0.5 bg-white" />
              <span className="block h-0.5 bg-white" />
              <span className="block h-0.5 bg-white" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-white/10 bg-charcoal px-5 py-2 lg:hidden">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block py-3 font-bold uppercase tracking-[0.15em]">
              {label}
            </a>
          ))}
          <button onClick={() => { setOpen(false); onEstimate(); }} className="btn-primary my-3 w-full">Free Estimate</button>
        </nav>
      )}
    </header>
  );
}
