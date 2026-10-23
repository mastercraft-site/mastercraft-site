import { useEffect, useState } from 'react';

const api = async (path, body) => {
  const res = await fetch(`/api/admin${path}`, {
    method: body ? 'POST' : 'GET',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || `Request failed (${res.status})`);
  return json;
};

const readFile = (file) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

const blank = { name: '', rating: 5, text: '', dateText: '', url: '' };

export default function Admin() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [review, setReview] = useState(blank);
  const [photo, setPhoto] = useState({ kind: 'gallery', alt: '', caption: '', file: null, before: null, after: null });
  const [busy, setBusy] = useState(false);

  const load = () =>
    api('/data')
      .then(setData)
      .catch(() => setError('Admin only works on your local dev server. Run `npm run dev` in the app folder, then open /admin.'));

  useEffect(() => { load(); }, []);

  const run = async (fn, okText) => {
    setBusy(true);
    setMessage('');
    try {
      await fn();
      setMessage(okText);
      await load();
    } catch (e) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  };

  const addReview = () =>
    run(async () => {
      await api('/review', review);
      setReview(blank);
    }, 'Review added to the site.');

  const addPhoto = () =>
    run(async () => {
      const meta = { alt: photo.alt, caption: photo.caption };
      if (photo.kind === 'before-after') {
        if (!photo.before || !photo.after) throw new Error('Choose both a before and an after image.');
        await api('/pair', { ...meta, beforeDataUrl: await readFile(photo.before), afterDataUrl: await readFile(photo.after) });
      } else {
        if (!photo.file) throw new Error('Choose an image first.');
        await api('/photo', { ...meta, kind: 'gallery', dataUrl: await readFile(photo.file) });
      }
      setPhoto({ kind: photo.kind, alt: '', caption: '', file: null, before: null, after: null });
    }, 'Photo uploaded.');

  const remove = (collection, id) => {
    if (!window.confirm('Delete this item from the site?')) return;
    run(() => api('/delete', { collection, id }), 'Deleted.');
  };

  if (error) {
    return <Shell><p className="text-brand">{error}</p></Shell>;
  }
  if (!data) return <Shell><p className="text-white/60">Loading...</p></Shell>;

  return (
    <Shell>
      {message && <p role="status" className="mb-6 rounded-lg bg-white/10 px-4 py-3 text-sm">{message}</p>}

      <section className="card p-6">
        <h2 className="text-2xl">Add a Google review</h2>
        <p className="mt-1 text-sm text-white/60">Paste the text exactly as posted. Do not edit it.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Reviewer name"><input className="field" value={review.name} onChange={(e) => setReview({ ...review, name: e.target.value })} /></Field>
          <Field label="Stars">
            <select className="field" value={review.rating} onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}>
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </Field>
          <Field label="When (e.g. 2 months ago)"><input className="field" value={review.dateText} onChange={(e) => setReview({ ...review, dateText: e.target.value })} /></Field>
          <Field label="Link to the review on Google (optional)"><input className="field" value={review.url} onChange={(e) => setReview({ ...review, url: e.target.value })} /></Field>
          <div className="sm:col-span-2">
            <Field label="Review text"><textarea rows={4} className="field" value={review.text} onChange={(e) => setReview({ ...review, text: e.target.value })} /></Field>
          </div>
        </div>
        <button onClick={addReview} disabled={busy} className="btn-primary mt-5">Add review</button>
      </section>

      <section className="card mt-8 p-6">
        <h2 className="text-2xl">Upload a photo</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Shows up in">
            <select className="field" value={photo.kind} onChange={(e) => setPhoto({ ...photo, kind: e.target.value })}>
              <option value="gallery">Work in progress gallery</option>
              <option value="before-after">Before / after slider (needs two photos)</option>
            </select>
          </Field>
          {photo.kind === 'before-after' ? (
            <>
              <Field label="Before photo"><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setPhoto({ ...photo, before: e.target.files[0] })} className="text-sm" /></Field>
              <Field label="After photo"><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setPhoto({ ...photo, after: e.target.files[0] })} className="text-sm" /></Field>
            </>
          ) : (
            <Field label="Image file"><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setPhoto({ ...photo, file: e.target.files[0] })} className="text-sm" /></Field>
          )}
          <Field label="Description (for search and screen readers)"><input className="field" value={photo.alt} onChange={(e) => setPhoto({ ...photo, alt: e.target.value })} placeholder="2019 Honda Accord, rear bumper repaint" /></Field>
          <Field label="Caption (optional)"><input className="field" value={photo.caption} onChange={(e) => setPhoto({ ...photo, caption: e.target.value })} /></Field>
        </div>
        <button onClick={addPhoto} disabled={busy} className="btn-primary mt-5">Upload photo</button>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl">Reviews on the site ({data.reviews.length})</h2>
        <ul className="mt-4 space-y-3">
          {data.reviews.map((r) => (
            <li key={r.id} className="card flex items-start justify-between gap-4 p-4 text-sm">
              <span><strong>{r.name}</strong> &middot; {r.rating} stars &middot; {r.text.slice(0, 120)}{r.text.length > 120 ? '...' : ''}</span>
              <button onClick={() => remove('reviews', r.id)} className="shrink-0 text-brand hover:underline">Delete</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl">Photos on the site ({data.gallery.length})</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {data.gallery.map((g) => (
            <li key={g.id} className="card overflow-hidden text-xs">
              <img src={g.src} alt={g.alt} className="aspect-square w-full object-cover" />
              <div className="flex items-center justify-between p-2">
                <span className="uppercase text-white/60">{g.kind}</span>
                <button onClick={() => remove('gallery', g.id)} className="text-brand hover:underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-charcoal px-5 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl">Site Manager</h1>
          <a href="/" className="text-sm text-white/70 hover:text-brand">View site &rarr;</a>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <span className="label">{label}</span>
      {children}
    </div>
  );
}
