import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import type { SharedData } from '@/types';
import {
  CheckCircle2,
  AlertTriangle,
  X,
  Search,
  Plus,
  Star,
  Filter,
  MapPin,
  Tags,
} from 'lucide-react';

interface Attraction {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
}

type FlashProps = {
  flash?: {
    success?: string | null;
    error?: string | null;
  };
};

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

export default function Index({ attractions }: { attractions: Attraction[] }) {
  const { flash } = usePage<SharedData & FlashProps>().props;

  const [busyId, setBusyId] = useState<number | null>(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackType, setSnackType] = useState<'success' | 'error'>('success');
  const [snackMsg, setSnackMsg] = useState('');

  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');

  const openSnack = (type: 'success' | 'error', msg: string) => {
    setSnackType(type);
    setSnackMsg(msg);
    setSnackOpen(true);
    window.setTimeout(() => setSnackOpen(false), 3500);
  };

  // Flash (redirects)
  useEffect(() => {
    if (flash?.success) openSnack('success', flash.success);
    if (flash?.error) openSnack('error', flash.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flash?.success, flash?.error]);

  const sorted = useMemo(
    () => [...(attractions ?? [])].sort((a, b) => b.id - a.id),
    [attractions]
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    sorted.forEach((a) => set.add(a.category));
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [sorted]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return sorted.filter((a) => {
      const matchQ =
        !needle ||
        a.name.toLowerCase().includes(needle) ||
        a.location.toLowerCase().includes(needle) ||
        a.category.toLowerCase().includes(needle);

      const matchCat = cat === 'all' || a.category === cat;
      return matchQ && matchCat;
    });
  }, [sorted, q, cat]);

  // KPIs
  const total = sorted.length;
  const avgRating = useMemo(() => {
    if (!sorted.length) return 0;
    const sum = sorted.reduce((acc, a) => acc + (Number(a.rating) || 0), 0);
    return sum / sorted.length;
  }, [sorted]);

  const topCategory = useMemo(() => {
    if (!sorted.length) return '—';
    const counts = new Map<string, number>();
    sorted.forEach((a) => counts.set(a.category, (counts.get(a.category) ?? 0) + 1));
    let best = '';
    let bestCount = -1;
    counts.forEach((v, k) => {
      if (v > bestCount) {
        best = k;
        bestCount = v;
      }
    });
    return best || '—';
  }, [sorted]);

  const badgeClass = () =>
    'inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800 ring-1 ring-inset ring-blue-200';

  const ratingBadge = (r: number) =>
    'inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white';

  const handleDelete = (id: number, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setBusyId(id);
    router.delete(`/admin/attractions/${id}`, {
      preserveScroll: true,
      onSuccess: () => openSnack('success', 'Attraction deleted successfully.'),
      onError: () => openSnack('error', 'Failed to delete attraction.'),
      onFinish: () => setBusyId(null),
    });
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Attractions', href: '/admin/attractions' }]}>
      <Head title="Admin - Attractions" />

      <Snackbar
        open={snackOpen}
        type={snackType}
        message={snackMsg}
        onClose={() => setSnackOpen(false)}
      />

      <div className="mx-auto max-w-7xl space-y-6 rounded-2xl bg-blue-50/40 p-6">
        {/* Top bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-900">
              Manage Attractions
            </h1>
            <p className="text-sm text-slate-600">
              Add, edit, and maintain tourist destinations.
            </p>
          </div>

          <Link
            href="/admin/attractions/create"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/40"
          >
            <Plus className="h-4 w-4" />
            Add New
          </Link>
        </div>

        {/* KPI cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <MapPin className="h-4 w-4 text-blue-700" />
              Total Attractions
            </div>
            <div className="mt-2 text-3xl font-extrabold text-blue-900">{total}</div>
            <div className="mt-1 text-xs text-slate-500">All destinations currently listed</div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Star className="h-4 w-4 text-blue-700" />
              Average Rating
            </div>
            <div className="mt-2 text-3xl font-extrabold text-blue-900">
              {avgRating ? avgRating.toFixed(1) : '—'}
            </div>
            <div className="mt-1 text-xs text-slate-500">Based on saved ratings</div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Tags className="h-4 w-4 text-blue-700" />
              Top Category
            </div>
            <div className="mt-2 text-3xl font-extrabold text-blue-900">{topCategory}</div>
            <div className="mt-1 text-xs text-slate-500">Most frequently used category</div>
          </div>
        </div>

        {/* Search + filter */}
        <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-700/70" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, location, category…"
                className="w-full rounded-lg border border-blue-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800">
                <Filter className="h-4 w-4" />
                Filter
              </div>

              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'all' ? 'All categories' : c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-500">
            Showing <span className="font-semibold">{filtered.length}</span> of{' '}
            <span className="font-semibold">{total}</span> attractions
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-blue-50 text-blue-900">
                <tr>
                  <th className="px-6 py-3 font-semibold">ID</th>
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Category</th>
                  <th className="px-6 py-3 font-semibold">Location</th>
                  <th className="px-6 py-3 font-semibold">Rating</th>
                  <th className="px-6 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filtered.map((item) => {
                  const isBusy = busyId === item.id;

                  return (
                    <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="px-6 py-4 text-slate-600">{item.id}</td>

                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="mt-1 text-xs text-slate-500">{item.location}</div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={badgeClass()}>{item.category}</span>
                      </td>

                      <td className="px-6 py-4 text-slate-600">{item.location}</td>

                      <td className="px-6 py-4">
                        <span className={ratingBadge(item.rating)}>
                          <Star className="h-3.5 w-3.5" />
                          {Number(item.rating).toFixed(1)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/attractions/${item.id}/edit`}
                          className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.name)}
                          disabled={isBusy}
                          className="ml-2 inline-flex items-center rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-60"
                        >
                          {isBusy ? 'Deleting…' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {!filtered.length && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                      No attractions found for your current search/filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-blue-100 bg-blue-50/40 px-6 py-3 text-xs text-slate-600">
            Tip: Keep category names consistent (e.g., Beach, Falls, Heritage) for cleaner filtering.
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
