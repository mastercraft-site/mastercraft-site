import { site } from '../config.js';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/images/logo-badge.webp" alt="" width="56" height="56" loading="lazy" className="h-14 w-14 rounded-full" />
          <p className="mt-4 font-display uppercase">{site.name}</p>
          <p className="mt-2 text-base leading-relaxed text-white/85">{site.street}<br />{site.cityStateZip}</p>
        </div>
        <div>
          <h3 className="text-lg">Contact</h3>
          <ul className="mt-4 space-y-2 break-words text-base leading-relaxed text-white/85">
            <li><a href={site.phoneHref} className="hover:text-brand">{site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-brand">{site.email}</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg">Hours</h3>
          <p className="mt-4 text-base leading-relaxed text-white/85">{site.hoursRange}</p>
        </div>
        <div>
          <h3 className="text-lg">Follow</h3>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-white/85">
            <li><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand">Facebook</a></li>
            <li><a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-brand">YouTube</a></li>
            <li><a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-brand">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-center text-sm leading-relaxed text-white/80">
        &copy; {new Date().getFullYear()} {site.name}. All rights reserved. &nbsp;|&nbsp; <a href="/privacy.html" className="underline hover:text-white">Privacy Policy</a>
        <p className="mx-auto mt-3 max-w-3xl leading-relaxed">No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.</p>
      </div>
    </footer>
  );
}
