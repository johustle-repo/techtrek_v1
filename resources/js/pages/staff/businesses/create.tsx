import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, X, Plus, Image as ImageIcon, Save } from 'lucide-react';

const BUSINESS_CATEGORIES = [
  'Restaurant',
  'Hotel',
  'Resort',
  'Souvenir Shop',
  'Café',
  'Tour Operator',
  'Transportation',
  'Retail',
  'Other',
];

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
      <div className={`flex w-[min(92vw,460px)] items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${styles}`}>
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

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    category: '',
    description: '',
    address: '',
    contact_number: '',
    image_url: '',
    status: 'open',
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

    post('/admin/businesses', {
      preserveScroll: true,
      onSuccess: () => {
        openSnack('success', 'Business created successfully.');
        reset();
      },
      onError: () => {
        openSnack('error', 'Please check the form and try again.');
      },
    });
  };

  const inputBase =
    'mt-1 block w-full rounded-lg border border-blue-200 bg-white px-2 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30';
  const labelBase = 'block text-sm font-medium text-slate-700';
  const errorText = 'mt-1 text-xs text-red-600';

  const showPreview = useMemo(() => data.image_url?.startsWith('http'), [data.image_url]);

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Businesses', href: '/admin/businesses' },
        { title: 'Create', href: '#' },
      ]}
    >
      <Head title="Create Business" />

      <Snackbar
        open={snackOpen}
        type={snackType}
        message={snackMsg}
        onClose={() => setSnackOpen(false)}
      />

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 rounded-2xl bg-blue-50/40 p-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">
                Add Business
              </h1>
              <p className="text-sm text-slate-600">
                Create a new local business listing.
              </p>
            </div>

            <Link
              href="/admin/businesses"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              ← Back
            </Link>
          </div>

          {/* Content */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* FORM */}
            <form
              onSubmit={submit}
              className="lg:col-span-2 space-y-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-blue-900">
                    Business Details
                  </div>
                  <div className="text-xs text-slate-500">
                    Basic info, contact, status, and optional image.
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className={labelBase}>Business Name</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className={inputBase}
                  placeholder="e.g. Labrador Seaside Eatery"
                  required
                />
                {errors.name && <p className={errorText}>{errors.name}</p>}
              </div>

              {/* Category + Status */}
              <div className="grid gap-4 m-2 sm:grid-cols-2">
                <div>
                  <label className={labelBase}>Category</label>
                  <select
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    className={inputBase}
                    required
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {BUSINESS_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className={errorText}>{errors.category}</p>}
                </div>

                <div>
                  <label className={labelBase}>Status</label>
                  <select
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    className={inputBase}
                  >
                    <option value="open">open</option>
                    <option value="closed">closed</option>
                  </select>
                  {errors.status && <p className={errorText}>{errors.status}</p>}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className={labelBase}>Address</label>
                <input
                  type="text"
                  value={data.address}
                  onChange={(e) => setData('address', e.target.value)}
                  className={inputBase}
                  placeholder="e.g. Poblacion, Labrador, Pangasinan"
                  required
                />
                {errors.address && <p className={errorText}>{errors.address}</p>}
              </div>

              {/* Contact */}
              <div>
                <label className={labelBase}>Contact Number (optional)</label>
                <input
                  type="text"
                  value={data.contact_number}
                  onChange={(e) => setData('contact_number', e.target.value)}
                  className={inputBase}
                  placeholder="+63 9xx xxx xxxx"
                />
                {errors.contact_number && <p className={errorText}>{errors.contact_number}</p>}
              </div>

              {/* Image URL */}
              <div>
                <label className={labelBase}>Image URL (optional)</label>
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
                  placeholder="Describe the business, products, and services..."
                  required
                />
                {errors.description && <p className={errorText}>{errors.description}</p>}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Link
                  href="/admin/businesses"
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
                  {processing ? 'Saving…' : 'Save Business'}
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
                  {data.category || '—'}
                </div>

                <div className="mt-3 text-xs text-slate-500">Status</div>
                <div className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                  {data.status}
                </div>
              </div>

              <p className="text-xs text-slate-600">
                Tip: Keep categories consistent for better filtering.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
