import { useState } from 'react';

function Slider({ item, index }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="card overflow-hidden">
      <div className="relative aspect-[4/3] select-none overflow-hidden bg-charcoal">
        <img src={item.after} alt={`${item.alt || 'Collision repair'}: after restoration`} loading={index ? 'lazy' : 'eager'} draggable="false" className="absolute inset-0 h-full w-full object-cover" />
        <img
          src={item.before}
          alt={`${item.alt || 'Collision repair'}: before damage`}
          loading="lazy"
          draggable="false"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }} />
        <span className="absolute left-3 top-3 rounded bg-black/70 px-2.5 py-1 text-xs font-bold uppercase">Before</span>
        <span className="absolute right-3 top-3 rounded bg-brand px-2.5 py-1 text-xs font-bold uppercase">After</span>
        <input
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Drag to compare before and after"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      {item.caption && <figcaption className="p-4 text-sm text-white/75">{item.caption}</figcaption>}
    </figure>
  );
}

export default function BeforeAfter({ items }) {
  return (
    <section id="before-after" className="scroll-mt-24 border-y border-white/10 bg-charcoal-light py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow">Real Results</p>
        <h2 className="mt-3 max-w-2xl text-4xl md:text-5xl">Drag To See The Transformation</h2>

        {items.length === 0 ? (
          <div className="card mt-12 grid place-items-center p-12 text-center text-white/60">
            <p>Before and after collision photos are coming soon.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {items.map((item, i) => (
              <Slider key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
