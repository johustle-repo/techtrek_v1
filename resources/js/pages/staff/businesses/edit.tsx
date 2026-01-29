import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { SharedData } from '@/types';
import { ArrowLeft, Save, Store } from 'lucide-react';

/* ---------------- Types ---------------- */
type Business = {
  id: number;
  name: string;
  category: string;
  description: string;
  address: string;
  contact_number?: string;
  image_url?: string;
  status: 'open' | 'closed';
};

/* ---------------- Snackbar ---------------- */
function Snackbar({
  message,
  type = 'success',
  onClose,
}: {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles =
    type === 'success'
      ? 'border-blue-200 bg-blue-50 text-blue-900'
      : 'border-blue-300 bg-blue-100 text-blue-900';

  return (
    <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4">
      <div className={`rounded-xl border px-5 py-3 text-sm font-semibold shadow-lg ${styles}`}>
        {message}
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */
export default function Edit({ business }: { business: Business }) {
  const { flash } = usePage<SharedData & { flash?: any }>().props;

  const [form, setForm] = useState<Business>({ ...business });
  const [processing, setProcessing] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  useEffect(() => {
    if (flash?.success) setSnackbar({ message: flash.success, type: 'success' });
    if (flash?.error) setSnackbar({ message: flash.error, type: 'error' });
  }, [flash]);

  const categories = ['Hotel', 'Restaurant', 'Souvenir', 'Cafe', 'Resort', 'Other'];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    router.put(`/admin/businesses/${business.id}`, form, {
      preserveScroll: true,
      onFinish: () => setProcessing(false),
    });
  };

  return (
    <AppLayout>
      <Head title="Edit Business" />

      {snackbar && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />
      )}

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 rounded-2xl bg-blue-50/40 p-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-blue-700">
                <Store className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Business ID: {business.id}
                </span>
              </div>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-blue-900">
                Edit Business
              </h1>
              <p className="text-sm text-slate-600">
                Update business information and status.
              </p>
            </div>

            <Link
              href="/admin/businesses"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to list
            </Link>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm space-y-6"
          >
            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-slate-700">Business Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-blue-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-semibold text-slate-700">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-blue-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-blue-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="text-sm font-semibold text-slate-700">Contact Number</label>
                <input
                  name="contact_number"
                  value={form.contact_number ?? ''}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-blue-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              {/* Image */}
              <div>
                <label className="text-sm font-semibold text-slate-700">Image URL</label>
                <input
                  name="image_url"
                  value={form.image_url ?? ''}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-blue-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-semibold text-slate-700">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t pt-4">
              <Link
                href="/admin/businesses"
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {processing ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
