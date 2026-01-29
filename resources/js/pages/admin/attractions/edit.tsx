import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler, useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, X, Image as ImageIcon, Save } from 'lucide-react';

interface Attraction {
  id: number;
  name: string;
  category: string;
  description: string;
  location: string;
  image_url: string;
  rating: string;
}

/* =========================
   Snackbar (Blue Theme)
========================= */
function Snackbar({
  open,
  type,
  message,
  onClose,
}: {
  open: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}) {
  if (!open) return null;

  const styles =
    type === 'success'
      ? 'border-blue-200 bg-blue-50 text-blue-900'
      : 'border-blue-300 bg-blue-100 text-blue-900';

  return (
    <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4">
      <div
        className={`flex w-[min(92vw,460px)] items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${styles}`}
      >
        {type === 'success' ? (
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-blue-600" />
        ) : (
          <AlertTriangle className="mt-0.5 h-5 w-5 text-blue-700" />
        )}

        <div className="flex-1">
          <div className="text-sm font-semibold">
            {type === 'success' ? 'Success' : 'Action failed'}
          </div>
          <div className="text-sm opacity-90">{message}</div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1 opacity-60 hover:opacity-100"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function Edit({ attraction }: { attraction: Attraction }) {
  const { data, setData, put, processing, errors } = useForm({
    name: attraction.name,
    category: attraction.category,
    description: attraction.description,
    location: attraction.location,
    image_url: attraction.image_url,
    rating: attraction.rating,
  });

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackType, setSnackType] = useState<'success' | 'error'>('success');
  const [snackMsg, setSnackMsg] = useState('');

  const openSnack = (type: 'success' | 'error', msg: string) => {
    setSnackType(type);
    setSnackMsg(msg);
    setSnackOpen(true);
    window.setTimeout(() => setSnackOpen(false), 3500);
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(`/admin/attractions/${attraction.id}`, {
      preserveScroll: true,
      onSuccess: () => openSnack('success', 'Attraction updated successfully.'),
      onError: () => openSnack('error', 'Please check the form and try again.'),
    });
  };

  const inputBase =
    'mt-1 block w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30';
  const labelBase = 'block text-sm font-medium text-slate-700';
  const errorText = 'mt-1 text-xs text-red-600';

  const showPreview = useMemo(() => {
    return data.image_url && data.image_url.startsWith('http');
  }, [data.image_url]);

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Manage Attractions', href: '/admin/attractions' },
        { title: 'Edit Attraction', href: '#' },
      ]}
    >
      <Head title="Edit Attraction" />

      {/* Snackbar */}
      <Snackbar
        open={snackOpen}
        type={snackType}
        message={snackMsg}
        onClose={() => setSnackOpen(false)}
      />

      <div className="mx-auto max-w-5xl space-y-6 rounded-2xl bg-blue-50/40 p-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-900">
              Edit Destination
            </h1>
            <p className="text-sm text-slate-600">
              Update destination information and save changes.
            </p>
          </div>

          <Link
            href="/admin/attractions"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* FORM */}
          <form
            onSubmit={submit}
            className="lg:col-span-2 space-y-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
          >
            {/* Name */}
            <div>
              <label className={labelBase}>Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className={inputBase}
                required
              />
              {errors.name && <p className={errorText}>{errors.name}</p>}
            </div>

            {/* Category + Rating */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelBase}>Category</label>
                <select
                  value={data.category}
                  onChange={(e) => setData('category', e.target.value)}
                  className={inputBase}
                >
                  <option>Beach</option>
                  <option>Mountain</option>
                  <option>Cave</option>
                  <option>Historical</option>
                  <option>Falls</option>
                  <option>Heritage</option>
                  <option>Adventure</option>
                </select>
                {errors.category && <p className={errorText}>{errors.category}</p>}
              </div>

              <div>
                <label className={labelBase}>Rating (1–5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  step="0.1"
                  value={data.rating}
                  onChange={(e) => setData('rating', e.target.value)}
                  className={inputBase}
                />
                {errors.rating && <p className={errorText}>{errors.rating}</p>}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className={labelBase}>Location</label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => setData('location', e.target.value)}
                className={inputBase}
              />
              {errors.location && <p className={errorText}>{errors.location}</p>}
            </div>

            {/* Image URL */}
            <div>
              <label className={labelBase}>Image URL</label>
              <input
                type="url"
                value={data.image_url}
                onChange={(e) => setData('image_url', e.target.value)}
                className={inputBase}
                placeholder="https://..."
              />
              <p className="mt-1 text-xs text-slate-500">
                Paste a direct image link (JPG/PNG/WebP).
              </p>
              {errors.image_url && <p className={errorText}>{errors.image_url}</p>}
            </div>

            {/* Description */}
            <div>
              <label className={labelBase}>Description</label>
              <textarea
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className={`${inputBase} min-h-[120px]`}
                rows={5}
              />
              {errors.description && <p className={errorText}>{errors.description}</p>}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                href="/admin/attractions"
                className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {processing ? 'Updating…' : 'Update Attraction'}
              </button>
            </div>
          </form>

          {/* PREVIEW */}
          <aside className="space-y-4 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
              <ImageIcon className="h-4 w-4 text-blue-700" />
              Image Preview
            </div>

            <div className="overflow-hidden rounded-xl border border-blue-200 bg-white">
              <div className="h-[140px] w-full bg-blue-50">
                {showPreview ? (
                  <img
                    src={data.image_url}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={() => openSnack('error', 'Invalid image URL preview.')}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-500">
                    Paste an image URL to preview
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-white p-4 space-y-2">
              <div className="text-xs text-slate-500">Name</div>
              <div className="text-sm font-semibold text-slate-900">{data.name || '—'}</div>

              <div className="mt-3 text-xs text-slate-500">Category</div>
              <div className="inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                {data.category}
              </div>

              <div className="mt-3 text-xs text-slate-500">Rating</div>
              <div className="text-sm font-semibold text-slate-900">
                ★ {Number(data.rating || 0).toFixed(1)}
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Tip: Keep category names consistent for better filtering.
            </p>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
