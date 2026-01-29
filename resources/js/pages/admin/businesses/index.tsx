import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import type { SharedData } from '@/types';
import { Store, CheckCircle, XCircle, Search, Plus, Filter } from 'lucide-react';

type Business = {
  id: number;
  name: string;
  category: string;
  address: string;
  status: 'open' | 'closed';
  created_at: string;
};

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

export default function Index({ businesses }: { businesses: Business[] }) {
  const { flash } = usePage<SharedData & { flash?: any }>().props;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    if (flash?.success) setSnackbar({ message: flash.success, type: 'success' });
    if (flash?.error) setSnackbar({ message: flash.error, type: 'error' });
  }, [flash]);

  const sorted = useMemo(
    () => [...(businesses ?? [])].sort((a, b) => b.id - a.id),
    [businesses]
  );

  const total = sorted.length;
  const openCount = useMemo(() => sorted.filter((b) => b.status === 'open').length, [sorted]);
  const closedCount = useMemo(() => sorted.filter((b) => b.status === 'closed').length, [sorted]);

  const filteredBusinesses = useMemo(() => {
    const q = search.trim().toLowerCase();
    return sorted.filter((b) => {
      const matchQ =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q);

      const matchStatus = statusFilter === 'all' || b.status === statusFilter;
      return matchQ && matchStatus;
    });
  }, [sorted, search, statusFilter]);

  const handleDelete = (id: number, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setBusyId(id);
    router.delete(`/admin/businesses/${id}`, {
      preserveScroll: true,
      onFinish: () => {
        setBusyId(null);
        setSnackbar({ message: 'Business deleted successfully.', type: 'success' });
      },
    });
  };

  const statusBadge = (status: string) => {
    const base = 'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset';
    if (status === 'open') return `${base} bg-blue-600 text-white ring-blue-600`;
    return `${base} bg-blue-100 text-blue-700 ring-blue-200`;
  };

  return (
    <AppLayout>
      <Head title="Manage Businesses" />

      {snackbar && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />
      )}

      {/* ✅ Wide + consistent admin canvas */}
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 rounded-2xl bg-blue-50/40 p-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">
                Business Management
              </h1>
              <p className="text-sm text-slate-600">
                Manage local businesses, shops, and services.
              </p>
            </div>

            <Link
              href="/admin/businesses/create"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/40"
            >
              <Plus className="h-4 w-4" />
              Add Business
            </Link>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Store className="h-4 w-4 text-blue-700" />
                Total Businesses
              </div>
              <div className="mt-2 text-4xl font-extrabold text-blue-900">{total}</div>
              <div className="mt-1 text-xs text-slate-500">All business listings</div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle className="h-4 w-4 text-blue-700" />
                Open
              </div>
              <div className="mt-2 text-4xl font-extrabold text-blue-900">{openCount}</div>
              <div className="mt-1 text-xs text-slate-500">Currently operating</div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <XCircle className="h-4 w-4 text-blue-700" />
                Closed
              </div>
              <div className="mt-2 text-4xl font-extrabold text-blue-900">{closedCount}</div>
              <div className="mt-1 text-xs text-slate-500">Temporarily unavailable</div>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-xl">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-700/70" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, category, address…"
                  className="w-full rounded-lg border border-blue-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800">
                  <Filter className="h-4 w-4" />
                  Filter
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="all">All status</option>
                  <option value="open">open</option>
                  <option value="closed">closed</option>
                </select>
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-500">
              Showing <span className="font-semibold">{filteredBusinesses.length}</span> of{' '}
              <span className="font-semibold">{total}</span> businesses
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-blue-50 text-blue-900">
                  <tr className="text-left">
                    {/* ✅ ID column */}
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide">
                      ID
                    </th>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Address</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold w-[220px]">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredBusinesses.map((b) => {
                    const isBusy = busyId === b.id;

                    return (
                      <tr key={b.id} className="hover:bg-blue-50/40 transition-colors">
                        {/* ✅ ID cell */}
                        <td className="p-4 text-sm font-semibold text-slate-500">
                          {b.id}
                        </td>

                        <td className="p-4">
                          <div className="font-semibold text-slate-900">{b.name}</div>
                        </td>

                        <td className="p-4 text-slate-700">{b.category}</td>
                        <td className="p-4 text-slate-600">{b.address}</td>

                        <td className="p-4">
                          <span className={statusBadge(b.status)}>{b.status}</span>
                        </td>

                        <td className="p-4">
                          <div className="flex gap-2">
                            <Link
                              href={`/admin/businesses/${b.id}/edit`}
                              className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() => handleDelete(b.id, b.name)}
                              disabled={isBusy}
                              className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-60"
                            >
                              {isBusy ? 'Deleting…' : 'Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {!filteredBusinesses.length && (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-slate-500">
                        No businesses found for your current search/filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-blue-100 bg-blue-50/40 px-6 py-3 text-xs text-slate-600">
              Tip: Keep categories consistent (Hotel, Restaurant, Souvenir) for better filtering.
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
