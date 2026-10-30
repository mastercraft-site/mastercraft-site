export default function Gallery({ items }) {
  if (items.length === 0) return null;

  return (
    <section id="gallery" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
      <p className="eyebrow">Our Shop</p>
      <h2 className="mt-3 text-4xl md:text-5xl">Work In Progress</h2>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item) => (
          <figure key={item.id} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-charcoal-light">
            <img src={item.src} alt={item.alt || item.caption || 'Vehicle repair work at MasterCraft in Long Island City'} loading="lazy" decoding="async" className="w-full transition duration-500 hover:scale-[1.03]" />
            {item.caption && <figcaption className="p-4 text-sm text-white/70">{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
