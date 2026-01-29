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
  Calendar,
  Filter,
  MapPin,
  Clock,
  History, // Added for the new KPI card
} from 'lucide-react';

interface Event {
  id: number;
  title: string;
  location: string;
  start_date: string;
  end_date?: string | null;
  status: 'upcoming' | 'ongoing' | 'completed';
  created_at: string; // ✅ Added created_at to interface
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
function Snackbar({ open, type, message, onClose }: {
  open: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}) {
  if (!open) return null;
  const styles = type === 'success' 
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
          <div className="text-sm font-semibold">{type === 'success' ? 'Success' : 'Action failed'}</div>
          <div className="text-sm opacity-90">{message}</div>
        </div>
        <button onClick={onClose} className="rounded-md p-1 opacity-60 hover:opacity-100"><X className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

export default function Index({ events }: { events: Event[] }) {
  const { flash } = usePage<SharedData & FlashProps>().props;

  const [busyId, setBusyId] = useState<number | null>(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackType, setSnackType] = useState<'success' | 'error'>('success');
  const [snackMsg, setSnackMsg] = useState('');

  const [q, setQ] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const openSnack = (type: 'success' | 'error', msg: string) => {
    setSnackType(type);
    setSnackMsg(msg);
    setSnackOpen(true);
    window.setTimeout(() => setSnackOpen(false), 3500);
  };

  useEffect(() => {
    if (flash?.success) openSnack('success', flash.success);
    if (flash?.error) openSnack('error', flash.error);
  }, [flash?.success, flash?.error]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return events.filter((e) => {
      const matchQ = !needle || 
        e.title.toLowerCase().includes(needle) || 
        e.location.toLowerCase().includes(needle);
      const matchStatus = filterStatus === 'all' || e.status === filterStatus;
      return matchQ && matchStatus;
    });
  }, [events, q, filterStatus]);

  // KPIs
  const total = events.length;
  const upcomingCount = events.filter(e => new Date(e.start_date) > new Date()).length;

  const handleDelete = (id: number, title: string) => {
    if (!confirm(`Delete event "${title}"? This cannot be undone.`)) return;
    setBusyId(id);
    router.delete(`/staff/events/${id}`, {
      preserveScroll: true,
      onSuccess: () => openSnack('success', 'Event deleted successfully.'),
      onFinish: () => setBusyId(null),
    });
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Events', href: '/staff/events' }]}>
      <Head title="Staff - Events" />

      <Snackbar open={snackOpen} type={snackType} message={snackMsg} onClose={() => setSnackOpen(false)} />

      <div className="mx-auto w-full space-y-6 rounded-2xl bg-blue-50/40 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-900">Manage Events</h1>
            <p className="text-sm text-slate-600">Coordinate festivals and municipal announcements for Labrador.</p>
          </div>
          <Link href="/staff/events/create" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow hover:bg-blue-700">
            <Plus className="h-4 w-4" /> Add New Event
          </Link>
        </div>

        {/* KPI cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Calendar className="h-4 w-4 text-blue-700" /> Total Events
            </div>
            <div className="mt-2 text-3xl font-extrabold text-blue-900">{total}</div>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Clock className="h-4 w-4 text-blue-700" /> Upcoming
            </div>
            <div className="mt-2 text-3xl font-extrabold text-blue-900">{upcomingCount}</div>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <History className="h-4 w-4 text-blue-700" /> System Status
            </div>
            <div className="mt-2 text-xl font-bold text-blue-900 text-green-600">Operational</div>
          </div>
        </div>

        {/* Search + filter */}
        <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-700/70" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events by title or location..."
                className="w-full rounded-lg border border-blue-200 py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-blue-500/30 outline-none" />
            </div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30">
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-blue-50 text-blue-900">
                <tr>
                  <th className="px-6 py-3 font-semibold">Title</th>
                  <th className="px-6 py-3 font-semibold">Location</th>
                  <th className="px-6 py-3 font-semibold">Event Schedule</th>
                  <th className="px-6 py-3 font-semibold">Date Created</th> {/* ✅ Added Header */}
                  <th className="px-6 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{item.title}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.location}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(item.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    {/* ✅ Added Date Created Cell */}
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {new Date(item.created_at).toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/staff/events/${item.id}/edit`} className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors">
                        Edit
                      </Link>
                      <button type="button" onClick={() => handleDelete(item.id, item.title)} disabled={busyId === item.id}
                        className="ml-2 inline-flex items-center rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-60 transition-colors">
                        {busyId === item.id ? 'Deleting…' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}