import { useState } from 'react';

const services = [
  {
    title: 'Collision & Frame Repair',
    summary: 'Factory-spec structural realignment with computerized measuring.',
    details: ['Computerized frame measuring', 'Factory-spec structural realignment', 'Full-frame collision repair'],
  },
  {
    title: 'Insurance Claim Concierge',
    summary: 'We deal with your adjuster, supplements and paperwork.',
    details: ['Direct handling of insurance adjusters', 'Supplements handled for you', 'Paperwork taken off your plate'],
  },
  {
    title: 'Mechanical & Diagnostics',
    summary: 'Engine, transmission, brakes and factory maintenance.',
    details: ['Advanced engine diagnostics', 'Brake service', 'Factory maintenance'],
  },
  {
    title: 'Custom Body & Paint',
    summary: 'Color-matched precision paint with a flawless clear coat.',
    details: ['Color-matched precision painting', 'Precision body work', 'Flawless clear coat finish'],
  },
];

export default function Services({ onEstimate }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">What We Do</p>
          <h2 className="mt-4 text-5xl md:text-6xl">Repair. Restore. <br />Get Back On The Road.</h2>
        </div>
        <button onClick={onEstimate} className="btn-primary self-start md:self-auto">Start My Estimate</button>
      </div>

      <ol className="mt-14 border-t border-white/15">
        {services.map((s, i) => {
          const isOpen = open === i;
          return (
            <li key={s.title} className="border-b border-white/15">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 text-left md:grid-cols-[5rem_1fr_1fr_auto] md:gap-8"
              >
                <span className="font-display text-2xl font-bold text-brand">0{i + 1}</span>
                <span className="font-display text-3xl font-extrabold uppercase transition group-hover:text-brand md:text-4xl">{s.title}</span>
                <span className="hidden text-lg leading-relaxed text-white/85 md:block">{s.summary}</span>
                <span aria-hidden="true" className={`grid h-10 w-10 place-items-center border-2 border-white/50 text-xl transition ${isOpen ? 'border-brand bg-brand' : ''}`}>+</span>
              </button>
              {isOpen && (
                <div className="grid gap-6 pb-8 pl-[4rem] md:pl-[7rem]">
                  <p className="text-lg leading-relaxed text-white/85 md:hidden">{s.summary}</p>
                  <ul className="grid gap-3 text-lg leading-relaxed text-white/90 sm:grid-cols-3 sm:gap-6">
                    {s.details.map((d) => <li key={d} className="border-l-2 border-brand pl-3">{d}</li>)}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
