import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, X, Calendar, Plus, MapPin, FileText, Image as ImageIcon } from 'lucide-react';

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
  const styles = type === 'success' ? 'border-blue-200 bg-blue-50 text-blue-900' : 'border-blue-300 bg-blue-100 text-blue-900';
  return (
    <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4">
      <div className={`flex w-[min(92vw,460px)] items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${styles}`}>
        {type === 'success' ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-blue-600" /> : <AlertTriangle className="mt-0.5 h-5 w-5 text-blue-700" />}
        <div className="flex-1">
          <div className="text-sm font-semibold">{type === 'success' ? 'Success' : 'Action failed'}</div>
          <div className="text-sm opacity-90">{message}</div>
        </div>
        <button type="button" onClick={onClose} className="rounded-md p-1 opacity-60 hover:opacity-100"><X className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    description: '',
    location: '',
    start_date: '',
    end_date: '',
    image_url: '',
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
    post('/admin/events', {
      preserveScroll: true,
      onSuccess: () => {
        openSnack('success', 'Event published successfully.');
        reset();
      },
      onError: () => openSnack('error', 'Please check the form for errors.'),
    });
  };

  const inputBase = 'mt-1 block w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30';
  const labelBase = 'block text-sm font-medium text-slate-700 flex items-center gap-2';

  return (
    <AppLayout breadcrumbs={[{ title: 'Manage Events', href: '/admin/events' }, { title: 'Add New', href: '#' }]}>
      <Head title="Create Event" />
      <Snackbar open={snackOpen} type={snackType} message={snackMsg} onClose={() => setSnackOpen(false)} />

      <div className="mx-auto max-w-5xl space-y-6 rounded-2xl bg-blue-50/40 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-900">Promote New Event</h1>
            <p className="text-sm text-slate-600">Broadcast festivals and announcements to travelers[cite: 39, 91].</p>
          </div>
          <Link href="/admin/events" className="text-sm font-medium text-blue-600 hover:underline">← Back</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <form onSubmit={submit} className="lg:col-span-2 space-y-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm"><Calendar className="h-5 w-5" /></div>
              <div>
                <div className="text-sm font-semibold text-blue-900">Event Information</div>
                <div className="text-xs text-slate-500">Schedule, location, and visual assets [cite: 50, 265]</div>
              </div>
            </div>

            <div>
              <label className={labelBase}><FileText className="h-4 w-4" /> Event Title</label>
              <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className={inputBase} placeholder="e.g. Tinakayanan Festival" required />
              {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelBase}><Calendar className="h-4 w-4" /> Start Date</label>
                <input type="datetime-local" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} className={inputBase} required />
              </div>
              <div>
                <label className={labelBase}><Calendar className="h-4 w-4" /> End Date (Optional)</label>
                <input type="datetime-local" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} className={inputBase} />
              </div>
            </div>

            <div>
              <label className={labelBase}><MapPin className="h-4 w-4" /> Location</label>
              <input type="text" value={data.location} onChange={(e) => setData('location', e.target.value)} className={inputBase} placeholder="e.g. Labrador Public Plaza" required />
            </div>

            <div>
              <label className={labelBase}><ImageIcon className="h-4 w-4" /> Poster Image URL</label>
              <input type="url" value={data.image_url} onChange={(e) => setData('image_url', e.target.value)} className={inputBase} placeholder="https://..." />
            </div>

            <div>
              <label className={labelBase}>Description</label>
              <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className={`${inputBase} min-h-[120px]`} rows={5} placeholder="Details about the event..." required />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Link href="/admin/events" className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Cancel</Link>
              <button type="submit" disabled={processing} className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-60">
                {processing ? 'Publishing…' : 'Publish Event'}
              </button>
            </div>
          </form>

          <aside className="space-y-4 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm h-fit">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900"><ImageIcon className="h-4 w-4 text-blue-700" /> Poster Preview</div>
            <div className="overflow-hidden rounded-xl border border-blue-200 bg-white">
              <div className="h-[140px] w-full bg-blue-50">
                {data.image_url ? <img src={data.image_url} alt="Preview" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-xs text-slate-500 text-center p-4">Poster preview will appear here</div>}
              </div>
            </div>
            <div className="rounded-xl border border-blue-200 bg-white p-4 space-y-2">
              <div className="text-xs text-slate-500 font-bold">EVENT PREVIEW</div>
              <div className="text-sm font-semibold text-slate-900 uppercase">{data.title || 'Untitled Event'}</div>
              <div className="text-xs text-blue-700 flex items-center gap-1"><MapPin className="h-3 w-3" /> {data.location || 'No location set'}</div>
              <div className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="h-3 w-3" /> {data.start_date ? new Date(data.start_date).toLocaleDateString() : 'Set date'}</div>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}