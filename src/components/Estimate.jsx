import { useEffect, useMemo, useRef, useState } from 'react';
import { site } from '../config.js';

const SERVICES = ['Collision & Frame Repair', 'Custom Body & Paint', 'Mechanical & Diagnostics', 'Insurance Claim Help', 'Not Sure Yet'];
const MAX_FILES = 10;
const MAX_BYTES = 10 * 1024 * 1024;
const EMPTY = { service: '', year: '', make: '', model: '', name: '', phone: '', email: '', callTime: '', details: '', sms: false, honey: '' };
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${site.email}`;

const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);
const phoneOk = (v) => v.replace(/\D/g, '').length >= 10;

function stepErrors(step, f) {
  const e = {};
  if (step === 1 && !f.service) e.service = 'Choose a service to continue.';
  if (step === 2) {
    if (!/^\d{4}$/.test(f.year) || Number(f.year) < 1950 || Number(f.year) > 2028) e.year = 'Enter a 4-digit year.';
    if (!f.make.trim()) e.make = 'Enter the make.';
    if (!f.model.trim()) e.model = 'Enter the model.';
  }
  if (step === 3) {
    if (!f.name.trim()) e.name = 'Enter your name.';
    if (!phoneOk(f.phone)) e.phone = 'Enter a valid phone number.';
    if (!emailOk(f.email)) e.email = 'Enter a valid email.';
  }
  return e;
}

export default function Estimate({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(EMPTY);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [drag, setDrag] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const panelRef = useRef(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target?.type === 'checkbox' ? e.target.checked : e.target.value }));

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const preview = useMemo(() => files.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })), [files]);
  useEffect(() => () => preview.forEach((p) => URL.revokeObjectURL(p.url)), [preview]);

  if (!open) return null;

  const addFiles = (list) => {
    const picked = Array.from(list).filter((f) => f.type.startsWith('image/') && f.size <= MAX_BYTES);
    setFiles((prev) => [...prev, ...picked].slice(0, MAX_FILES));
  };

  const next = () => {
    const e = stepErrors(step, form);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => Math.min(s + 1, 4));
  };

  const submit = async () => {
    const e = stepErrors(3, form);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus('sending');

    const data = new FormData();
    data.append('_subject', 'New Estimate Request: MasterCraft Website');
    data.append('_captcha', 'false');
    data.append('_template', 'table');
    data.append('_honey', form.honey);
    data.append('Service Needed', form.service);
    data.append('Vehicle', `${form.year} ${form.make} ${form.model}`);
    data.append('Customer Name', form.name);
    data.append('Cell Phone', form.phone);
    data.append('Email', form.email);
    data.append('Best Time to Call', form.callTime || 'Any time');
    data.append('Details', form.details);
    data.append('SMS Consent', form.sms ? 'Yes, customer opted in to SMS' : 'No');
    files.forEach((f) => data.append('Attachment', f));

    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('Request failed');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const close = () => {
    onClose();
    setTimeout(() => { setStep(1); setForm(EMPTY); setFiles([]); setErrors({}); setStatus('idle'); }, 300);
  };

  const Err = ({ k }) => (errors[k] ? <p className="mt-1.5 text-sm text-brand">{errors[k]}</p> : null);

  return (
    <div className="fixed inset-0 z-[70] grid place-items-end bg-black/75 p-0 backdrop-blur-sm sm:place-items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="estimate-title"
        tabIndex={-1}
        className="card max-h-[92svh] w-full overflow-y-auto rounded-b-none p-6 outline-none sm:max-w-xl sm:rounded-2xl md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Free Estimate</p>
            <h2 id="estimate-title" className="mt-2 text-3xl">Tell Us What Happened</h2>
          </div>
          <button onClick={close} aria-label="Close" className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/20 hover:border-brand">&times;</button>
        </div>

        {status === 'done' ? (
          <div className="py-12 text-center">
            <p className="text-5xl">&#10003;</p>
            <h3 className="mt-4 text-2xl">Request received</h3>
            <p className="mx-auto mt-3 max-w-sm text-white/70">We will call you at the best time you chose. For urgent help, call {site.phoneDisplay} now.</p>
            <button onClick={close} className="btn-primary mt-8">Done</button>
          </div>
        ) : (
          <>
            <ol className="mt-6 flex gap-2" aria-label="Progress">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className={`h-1.5 flex-1 rounded-full ${n <= step ? 'bg-brand' : 'bg-white/15'}`} />
              ))}
            </ol>

            {step === 1 && (
              <fieldset className="mt-8">
                <legend className="label">Step 1: What do you need?</legend>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <label key={s} className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-semibold transition ${form.service === s ? 'border-brand bg-brand text-white' : 'border-white/20 hover:border-white/50'}`}>
                      <input type="radio" name="service" value={s} checked={form.service === s} onChange={set('service')} className="sr-only" />
                      {s}
                    </label>
                  ))}
                </div>
                <Err k="service" />
              </fieldset>
            )}

            {step === 2 && (
              <div className="mt-8 space-y-5">
                <p className="label">Step 2: Your vehicle</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="year" className="label">Year</label>
                    <input id="year" inputMode="numeric" maxLength={4} className="field" placeholder="2019" value={form.year} onChange={set('year')} />
                    <Err k="year" />
                  </div>
                  <div>
                    <label htmlFor="make" className="label">Make</label>
                    <input id="make" className="field" placeholder="Honda" value={form.make} onChange={set('make')} />
                    <Err k="make" />
                  </div>
                  <div>
                    <label htmlFor="model" className="label">Model</label>
                    <input id="model" className="field" placeholder="Accord" value={form.model} onChange={set('model')} />
                    <Err k="model" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-8 space-y-5">
                <p className="label">Step 3: Photos and contact</p>

                <label
                  onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
                  className={`grid cursor-pointer place-items-center rounded-xl border-2 border-dashed p-6 text-center transition ${drag ? 'border-brand bg-brand/10' : 'border-white/20 hover:border-white/40'}`}
                >
                  <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} />
                  <span className="font-bold">Drop damage photos here, or click to pick</span>
                  <span className="mt-1 text-sm text-white/60">JPG, PNG or WebP. Up to {MAX_FILES} photos, 10 MB each.</span>
                </label>

                {preview.length > 0 && (
                  <ul className="grid grid-cols-4 gap-2">
                    {preview.map((p, i) => (
                      <li key={p.url} className="relative aspect-square overflow-hidden rounded-lg">
                        <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
                        <button type="button" aria-label={`Remove ${p.name}`} onClick={() => setFiles((f) => f.filter((_, j) => j !== i))} className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/80 text-xs">&times;</button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label">Full name</label>
                    <input id="name" autoComplete="name" className="field" value={form.name} onChange={set('name')} />
                    <Err k="name" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">Cell phone</label>
                    <input id="phone" type="tel" autoComplete="tel" className="field" value={form.phone} onChange={set('phone')} />
                    <Err k="phone" />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">Email</label>
                    <input id="email" type="email" autoComplete="email" className="field" value={form.email} onChange={set('email')} />
                    <Err k="email" />
                  </div>
                  <div>
                    <label htmlFor="callTime" className="label">Best time to call</label>
                    <select id="callTime" className="field" value={form.callTime} onChange={set('callTime')}>
                      <option value="">Any time</option>
                      <option>Morning (6AM to 12PM)</option>
                      <option>Afternoon (12PM to 5PM)</option>
                      <option>Evening (5PM to Midnight)</option>
                    </select>
                  </div>
                </div>

                <div aria-hidden="true" className="absolute -left-[9999px]">
                  <label>Leave blank <input tabIndex={-1} autoComplete="off" value={form.honey} onChange={set('honey')} /></label>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="mt-8 space-y-5">
                <p className="label">Step 4: Review and send</p>
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-xl bg-charcoal p-5 text-sm">
                  <dt className="text-white/60">Service</dt><dd>{form.service}</dd>
                  <dt className="text-white/60">Vehicle</dt><dd>{form.year} {form.make} {form.model}</dd>
                  <dt className="text-white/60">Name</dt><dd>{form.name}</dd>
                  <dt className="text-white/60">Phone</dt><dd>{form.phone}</dd>
                  <dt className="text-white/60">Email</dt><dd>{form.email}</dd>
                  <dt className="text-white/60">Photos</dt><dd>{files.length} attached</dd>
                </dl>
                <div>
                  <label htmlFor="details" className="label">Anything else? (symptoms, what happened)</label>
                  <textarea id="details" rows={3} className="field" value={form.details} onChange={set('details')} />
                </div>
                <label className="flex gap-3 text-sm text-white/75">
                  <input type="checkbox" checked={form.sms} onChange={set('sms')} className="mt-1 h-4 w-4 accent-brand" />
                  <span>I agree to receive SMS text messages from MasterCraft about this request (optional). Message and data rates may apply. Reply STOP to opt out, HELP for help. See our <a href="/privacy.html" className="text-brand underline">Privacy Policy</a>.</span>
                </label>
                {status === 'error' && <p className="text-sm text-brand">Something went wrong. Please call {site.phoneDisplay} instead.</p>}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between gap-3">
              <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1} className="btn-ghost !px-5">Back</button>
              {step < 4 ? (
                <button type="button" onClick={next} className="btn-primary">Continue</button>
              ) : (
                <button type="button" onClick={submit} disabled={status === 'sending'} className="btn-primary">
                  {status === 'sending' ? 'Sending...' : 'Send Request'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
