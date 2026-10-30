import { useRef, useState } from 'react';
import { site } from '../config.js';
import { ESTIMATE_SERVICES, MAX_ESTIMATE_FILES, MAX_ESTIMATE_FILE_BYTES, submitEstimateRequest } from '../utils/submitEstimate.js';

const EMPTY = { name: '', phone: '', vehicle: '', insurer: '', email: '', callTime: '', service: ESTIMATE_SERVICES[0], details: '', honey: '' };
const FIELD = 'field min-w-0 border-white/30 placeholder:text-white/60';

export default function EstimateSection() {
  const [form, setForm] = useState(EMPTY);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [invalidField, setInvalidField] = useState('');
  const formRef = useRef(null);

  const change = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setError('');
    setInvalidField('');
    if (status !== 'sending') setStatus('idle');
  };

  const choosePhotos = (event) => {
    const selected = Array.from(event.target.files);
    const invalid = selected.length > MAX_ESTIMATE_FILES || selected.some((file) => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > MAX_ESTIMATE_FILE_BYTES);
    setStatus('idle');
    if (invalid) {
      setFiles([]);
      event.target.value = '';
      setError(`Photos were not attached. Choose up to ${MAX_ESTIMATE_FILES} JPG, PNG or WebP photos, no larger than 10 MB each.`);
      setInvalidField('photos');
      return;
    }
    setFiles(selected);
    setError('');
    setInvalidField('');
  };

  const submit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;
    const invalid = !form.name.trim() ? 'name' : form.phone.replace(/\D/g, '').length < 10 ? 'phone' : !form.vehicle.trim() ? 'vehicle' : '';
    if (invalid) {
      const messages = { name: 'Enter your full name.', phone: 'Enter a phone number with at least 10 digits.', vehicle: 'Enter your vehicle make and model.' };
      setInvalidField(invalid);
      setError(messages[invalid]);
      formRef.current.elements.namedItem(invalid)?.focus();
      return;
    }
    setError('');
    setInvalidField('');
    setStatus('sending');
    try {
      await submitEstimateRequest({ ...form, name: form.name.trim(), vehicle: form.vehicle.trim(), files });
      setForm(EMPTY);
      setFiles([]);
      formRef.current.reset();
      setStatus('done');
    } catch {
      setStatus('error');
      setError('Your request could not be sent. Please try again or call us directly.');
    }
  };

  return (
    <section id="estimate" aria-labelledby="inline-estimate-heading" className="scroll-mt-24 bg-[#221a18] py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="min-w-0">
          <p className="eyebrow">Free Estimate</p>
          <h2 id="inline-estimate-heading" className="mt-4 max-w-lg text-4xl leading-tight md:text-5xl">Send Us Your Photos. We&apos;ll Call You Back.</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85">Tell us about your car and what happened. We&apos;ll review it and call at the time you choose.</p>
          <ul className="mt-8 flex flex-wrap gap-3 text-base text-white/85">
            <li className="border border-white/20 px-4 py-2">No obligation</li>
            <li className="border border-white/20 px-4 py-2">We talk to your insurer</li>
            <li className="border border-white/20 px-4 py-2">Progress photos during repair</li>
          </ul>
        </div>
        <form ref={formRef} onSubmit={submit} aria-label="Request a free estimate" aria-busy={status === 'sending'} className="min-w-0 border border-white/15 bg-charcoal p-5 sm:p-8">
          <fieldset disabled={status === 'sending'} className="grid min-w-0 gap-5">
            <legend className="sr-only">Estimate request details</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid min-w-0 gap-2 text-base font-bold text-white/85" htmlFor="estimate-name">Full name
                <input id="estimate-name" name="name" autoComplete="name" required value={form.name} onChange={change} aria-invalid={invalidField === 'name'} aria-describedby={invalidField === 'name' ? 'estimate-error' : undefined} className={FIELD} />
              </label>
              <label className="grid min-w-0 gap-2 text-base font-bold text-white/85" htmlFor="estimate-phone">Phone
                <input id="estimate-phone" name="phone" type="tel" autoComplete="tel" required value={form.phone} onChange={change} aria-invalid={invalidField === 'phone'} aria-describedby={invalidField === 'phone' ? 'estimate-error' : undefined} className={FIELD} />
              </label>
              <label className="grid min-w-0 gap-2 text-base font-bold text-white/85" htmlFor="estimate-vehicle">Vehicle make &amp; model
                <input id="estimate-vehicle" name="vehicle" placeholder="e.g. 2019 Audi A4" required value={form.vehicle} onChange={change} aria-invalid={invalidField === 'vehicle'} aria-describedby={invalidField === 'vehicle' ? 'estimate-error' : undefined} className={FIELD} />
              </label>
              <label className="grid min-w-0 gap-2 text-base font-bold text-white/85" htmlFor="estimate-insurer">Insurance company
                <input id="estimate-insurer" name="insurer" placeholder="Optional" value={form.insurer} onChange={change} className={FIELD} />
              </label>
              <label className="grid min-w-0 gap-2 text-base font-bold text-white/85" htmlFor="estimate-email">Email (optional)
                <input id="estimate-email" name="email" type="email" autoComplete="email" value={form.email} onChange={change} className={FIELD} />
              </label>
              <div className="grid min-w-0 gap-2 text-base font-bold text-white/85">
                <label htmlFor="estimate-call-time">Best time to call</label>
                <select id="estimate-call-time" name="callTime" value={form.callTime} onChange={change} className={FIELD}>
                  <option value="">Any time</option>
                  <option value="Morning (6AM to 12PM)">Morning</option>
                  <option value="Afternoon (12PM to 5PM)">Afternoon</option>
                  <option value="Evening (5PM to Midnight)">Evening</option>
                </select>
              </div>
            </div>
            <div className="grid min-w-0 gap-2 text-base font-bold text-white/85">
              <label htmlFor="estimate-service">Service needed</label>
              <select id="estimate-service" name="service" value={form.service} onChange={change} className={FIELD}>
                {ESTIMATE_SERVICES.map((service) => <option key={service}>{service}</option>)}
              </select>
            </div>
            <label className="grid min-w-0 gap-2 text-base font-bold text-white/85" htmlFor="estimate-details">What happened?
              <textarea id="estimate-details" name="details" rows={3} placeholder="Briefly describe the damage or problem" value={form.details} onChange={change} className={FIELD} />
            </label>
            <label className="grid min-w-0 gap-2 text-base font-bold text-white/85" htmlFor="estimate-photos">Damage photos
              <input id="estimate-photos" name="photos" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={choosePhotos} aria-invalid={invalidField === 'photos'} aria-describedby={invalidField === 'photos' ? 'estimate-photo-limits estimate-error' : 'estimate-photo-limits'} className={`${FIELD} block overflow-hidden text-sm file:mr-3 file:border-0 file:bg-white file:px-3 file:py-2 file:text-sm file:font-semibold file:text-charcoal`} />
            </label>
            <p id="estimate-photo-limits" className="-mt-3 text-sm text-white/80">Up to {MAX_ESTIMATE_FILES} photos, 10 MB each. JPG, PNG or WebP.</p>
            <label className="hidden" aria-hidden="true">Leave blank<input name="honey" tabIndex={-1} autoComplete="off" value={form.honey} onChange={change} /></label>
            <button type="submit" className="btn-primary w-full">{status === 'sending' ? 'Sending...' : 'Send My Request'}</button>
            <p className="text-sm leading-relaxed text-white/80">By submitting, you agree to be contacted by phone or email about your request. We don&apos;t share your information with third parties for marketing.</p>
          </fieldset>
          {error && <p id="estimate-error" role="alert" className="mt-5 text-base text-red-400">{error} {status === 'error' && <a href={site.phoneHref} className="underline">{site.phoneDisplay}</a>}</p>}
          {status === 'done' && <p role="status" className="mt-5 border-l-2 border-green-400 pl-4 text-base text-white">Request received. We will call you back. For urgent help, call <a href={site.phoneHref} className="underline">{site.phoneDisplay}</a>.</p>}
        </form>
      </div>
    </section>
  );
}