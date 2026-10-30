import { useEffect, useRef, useState } from 'react';

function Slider({ item, index }) {
  const [pos, setPos] = useState(50);
  return (
    <figure className="card min-w-0 snap-start overflow-hidden">
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
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!selectedPhoto) return;
    const viewer = viewerRef.current;
    const previousOverflow = document.body.style.overflow;
    viewer.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      viewer.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPhoto]);

  return (
    <section id="before-after" className="scroll-mt-24 border-y border-white/10 bg-charcoal-light py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow">Real Results</p>
        <h2 id="before-after-heading" className="mt-3 max-w-2xl text-4xl md:text-5xl">Collision Repair Before &amp; After</h2>

        {items.length === 0 ? (
          <div className="card mt-12 grid place-items-center p-12 text-center text-white/60">
            <p>Before and after collision photos are coming soon.</p>
          </div>
        ) : (
          <div
            role="region"
            aria-labelledby="before-after-heading"
            tabIndex={0}
            className="photo-album mt-12 grid auto-cols-[88%] grid-flow-col items-start gap-6 overflow-x-scroll overscroll-x-contain snap-x snap-proximity pb-5 sm:auto-cols-[70%] md:auto-cols-[46%]"
          >
            {items.map((item, i) => (
              item.before && item.after ? (
                <Slider key={item.id} item={item} index={i} />
              ) : (
                <figure key={item.id} className="card min-w-0 snap-start overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(item)}
                    aria-label={`Enlarge photo: ${item.caption || item.alt || 'Collision repair'}`}
                    aria-haspopup="dialog"
                    title="View enlarged photo"
                    className="block w-full cursor-zoom-in focus-visible:outline focus-visible:-outline-offset-2"
                  >
                    <img src={item.src} alt={item.alt} loading={i ? 'lazy' : 'eager'} decoding="async" className="block aspect-[4/3] w-full bg-charcoal object-contain" />
                  </button>
                  {item.caption && <figcaption className="p-4 text-sm text-white/75">{item.caption}</figcaption>}
                </figure>
              )
            ))}
          </div>
        )}
      </div>
      <dialog
        ref={viewerRef}
        aria-labelledby="photo-viewer-title"
        onCancel={(event) => {
          event.preventDefault();
          setSelectedPhoto(null);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            setSelectedPhoto(null);
          }
        }}
        onClick={(event) => event.target === event.currentTarget && setSelectedPhoto(null)}
        className="m-auto max-h-[94svh] w-[96vw] max-w-6xl overflow-y-auto border border-white/20 bg-charcoal p-4 text-white backdrop:bg-black/90 md:p-6"
      >
        {selectedPhoto && (
          <>
            <div className="mb-4 flex items-center justify-between gap-4">
              <p id="photo-viewer-title" className="min-w-0 text-sm font-bold">{selectedPhoto.caption || 'Collision Repair Before & After'}</p>
              <button
                type="button"
                autoFocus
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close enlarged photo"
                title="Close enlarged photo"
                className="grid h-11 w-11 shrink-0 place-items-center border border-white/30 text-2xl transition hover:border-brand hover:bg-brand"
              >
                &times;
              </button>
            </div>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} className="block h-[74svh] w-full object-contain" />
          </>
        )}
      </dialog>
    </section>
  );
}
