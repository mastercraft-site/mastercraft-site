import { site } from '../config.js';

export default function StickyCta({ onEstimate }) {
  return (
    <div className="site-sticky-cta fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-white/10 bg-charcoal/95 p-3 backdrop-blur md:hidden">
      <a href={site.phoneHref} className="btn-ghost !py-3">Call Now</a>
      <button onClick={onEstimate} className="btn-primary !py-3">Free Estimate</button>
    </div>
  );
}
