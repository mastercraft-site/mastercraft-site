import { useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Services from './components/Services.jsx';
import Process from './components/Process.jsx';
import BeforeAfter from './components/BeforeAfter.jsx';
import Reviews from './components/Reviews.jsx';
import Gallery from './components/Gallery.jsx';
import Location from './components/Location.jsx';
import Estimate from './components/Estimate.jsx';
import StickyCta from './components/StickyCta.jsx';
import Footer from './components/Footer.jsx';
import ScrollDrive from './components/ScrollDrive.jsx';
import Admin from './admin/Admin.jsx';
import gallery from './data/gallery.json';
import reviews from './data/reviews.json';

export default function App() {
  const [estimateOpen, setEstimateOpen] = useState(false);

  if (window.location.pathname === '/admin') return <Admin />;

  const beforeAfter = gallery.filter((g) => g.kind === 'before-after');
  const photos = gallery.filter((g) => g.kind !== 'before-after');
  const rating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '–';
  const openEstimate = () => setEstimateOpen(true);

  return (
    <div className="racing-site">
      <ScrollDrive />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-brand focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header onEstimate={openEstimate} />
      <main id="main">
        <Hero onEstimate={openEstimate} rating={rating} reviewCount={reviews.length} />
        <Marquee />
        <Services onEstimate={openEstimate} />
        <Process />
        <BeforeAfter items={beforeAfter} />
        <Reviews reviews={reviews} />
        <Gallery items={photos} />
        <Location />
      </main>
      <Footer />
      <StickyCta onEstimate={openEstimate} />
      <Estimate open={estimateOpen} onClose={() => setEstimateOpen(false)} />
    </div>
  );
}
