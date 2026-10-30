import { useEffect, useRef } from 'react';

export default function ScrollDrive() {
  const trackRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      const car = carRef.current;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      const distance = Math.max(0, track.clientHeight - car.offsetHeight);
      car.style.transform = `translate3d(-50%, ${progress * distance}px, 0)`;
      track.dataset.finished = String(scrollable > 0 && progress >= 0.999);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.documentElement);
    observer.observe(trackRef.current);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <aside className="race-sidebar" aria-hidden="true">
      <div ref={trackRef} className="race-track">
        <div className="race-finish" />
        <div ref={carRef} className="race-car">
          <svg viewBox="0 0 32 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="10" width="6" height="12" rx="2" fill="#080808" />
            <rect x="25" y="10" width="6" height="12" rx="2" fill="#080808" />
            <rect x="1" y="40" width="6" height="12" rx="2" fill="#080808" />
            <rect x="25" y="40" width="6" height="12" rx="2" fill="#080808" />
            <path d="M9 2H23L27 10V49L23 58H9L5 49V10L9 2Z" fill="#c71920" stroke="#ff666b" strokeWidth="1.5" />
            <path d="M12 3H15V57H12ZM17 3H20V57H17Z" fill="#f5f5f5" />
            <path d="M9 16L11 11H21L23 16V35L20 42H12L9 35V16Z" fill="#171717" stroke="#555" />
            <path d="M10 34H22L20 41H12L10 34Z" fill="#a9d8df" />
            <path d="M11 17H21L20 12H12L11 17Z" fill="#7a9ea3" />
            <rect x="7" y="5" width="5" height="3" rx="1" fill="#ff4141" />
            <rect x="20" y="5" width="5" height="3" rx="1" fill="#ff4141" />
            <path d="M7 49H12V53H8ZM20 49H25L24 53H20Z" fill="#fff7d1" />
            <path d="M8 3H24" stroke="#111" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </aside>
  );
}