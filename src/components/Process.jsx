const steps = [
  { t: 'Send photos & details', d: 'Upload damage photos and tell us your car. Takes a few minutes.' },
  { t: 'We call you back', d: 'We review your request and call at the time you chose.' },
  { t: 'We handle the insurance', d: 'We talk to your adjuster and handle supplements and paperwork.' },
  { t: 'Pick up, ready to drive', d: 'You get progress photos along the way and a finished car.' },
];

export default function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-brand/[0.07] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow">How It Works</p>
        <h2 className="mt-4 max-w-xl text-5xl md:text-6xl">Four Steps. No Guesswork.</h2>

        <ol className="mt-14 grid gap-px bg-white/10 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.t} className="group relative bg-charcoal p-7 transition duration-300 hover:bg-charcoal-light">
              <span className="font-display text-7xl font-extrabold leading-none text-white/10 transition group-hover:text-brand/40">0{i + 1}</span>
              <h3 className="mt-6 text-2xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
