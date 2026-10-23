const Item = ({ text }) => (
  <span className="flex shrink-0 items-center gap-6 px-6 font-display text-2xl font-bold uppercase tracking-wide text-white/90">
    {text}
    <span className="text-brand">&#9733;</span>
  </span>
);

const WORDS = ['Collision & frame', 'All insurance welcome', 'Color-match paint', 'Engine & transmission', 'Brakes & suspension', 'Daily progress photos'];

export default function Marquee() {
  // Duplicated track so the -50% loop is seamless. Pauses for users who prefer reduced motion.
  const track = [...WORDS, ...WORDS];
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-brand bg-brand py-4">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {track.map((w, i) => <Item key={i} text={w} />)}
      </div>
    </div>
  );
}
