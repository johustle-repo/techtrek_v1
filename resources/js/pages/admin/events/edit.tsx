import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler, useMemo, useState } from 'react';
import { CheckCircle2, AlertTriangle, X, Image as ImageIcon, Save, Calendar, MapPin, FileText } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date?: string | null;
  image_url?: string | null;
}

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

export default function Edit({ event }: { event: Event }) {
  // Format the date string for datetime-local input (YYYY-MM-DDTHH:mm)
  const formatDateTime = (dateStr: string) => dateStr ? new Date(dateStr).toISOString().slice(0, 16) : '';

  const { data, setData, put, processing, errors } = useForm({
    title: event.title,
    description: event.description,
    location: event.location,
    start_date: formatDateTime(event.start_date),
    end_date: event.end_date ? formatDateTime(event.end_date) : '',
    image_url: event.image_url || '',
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
    put(`/admin/events/${event.id}`, {
      preserveScroll: true,
      onSuccess: () => openSnack('success', 'Event updated successfully.'),
      onError: () => openSnack('error', 'Please check the form and try again.'),
    });
  };

  const inputBase = 'mt-1 block w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30';
  const labelBase = 'block text-sm font-medium text-slate-700 flex items-center gap-2';
  const errorText = 'mt-1 text-xs text-red-600';

  const showPreview = useMemo(() => {
    return data.image_url && data.image_url.startsWith('http');
  }, [data.image_url]);

  return (
    <AppLayout breadcrumbs={[{ title: 'Manage Events', href: '/admin/events' }, { title: 'Edit Event', href: '#' }]}>
      <Head title={`Edit Event - ${event.title}`} />
      <Snackbar open={snackOpen} type={snackType} message={snackMsg} onClose={() => setSnackOpen(false)} />

      <div className="mx-auto max-w-5xl space-y-6 rounded-2xl bg-blue-50/40 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-900">Edit Event</h1>
            <p className="text-sm text-slate-600">Update the schedule or details of this activity.</p>
          </div>
          <Link href="/admin/events" className="text-sm font-medium text-blue-600 hover:underline">← Back</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <form onSubmit={submit} className="lg:col-span-2 space-y-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div>
              <label className={labelBase}><FileText className="h-4 w-4" /> Event Title</label>
              <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className={inputBase} required />
              {errors.title && <p className={errorText}>{errors.title}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelBase}><Calendar className="h-4 w-4" /> Start Date</label>
                <input type="datetime-local" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} className={inputBase} required />
                {errors.start_date && <p className={errorText}>{errors.start_date}</p>}
              </div>
              <div>
                <label className={labelBase}><Calendar className="h-4 w-4" /> End Date (Optional)</label>
                <input type="datetime-local" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} className={inputBase} />
              </div>
            </div>

            <div>
              <label className={labelBase}><MapPin className="h-4 w-4" /> Location</label>
              <input type="text" value={data.location} onChange={(e) => setData('location', e.target.value)} className={inputBase} required />
              {errors.location && <p className={errorText}>{errors.location}</p>}
            </div>

            <div>
              <label className={labelBase}><ImageIcon className="h-4 w-4" /> Image URL</label>
              <input type="url" value={data.image_url} onChange={(e) => setData('image_url', e.target.value)} className={inputBase} placeholder="https://..." />
              {errors.image_url && <p className={errorText}>{errors.image_url}</p>}
            </div>

            <div>
              <label className={labelBase}>Description</label>
              <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className={`${inputBase} min-h-[120px]`} rows={5} required />
              {errors.description && <p className={errorText}>{errors.description}</p>}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Link href="/admin/events" className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Cancel</Link>
              <button type="submit" disabled={processing} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-60">
                <Save className="h-4 w-4" /> {processing ? 'Updating…' : 'Update Event'}
              </button>
            </div>
          </form>

          <aside className="space-y-4 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm h-fit">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900"><ImageIcon className="h-4 w-4 text-blue-700" /> Current Poster</div>
            <div className="overflow-hidden rounded-xl border border-blue-200 bg-white">
              <div className="h-[140px] w-full bg-blue-50">
                {showPreview ? (
                  <img src={data.image_url} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-500">No image available</div>
                )}
              </div>
            </div>
            <div className="rounded-xl border border-blue-200 bg-white p-4 space-y-3">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Schedule View</div>
              <div>
                <div className="text-xs text-slate-500">Starts</div>
                <div className="text-sm font-semibold text-slate-900">{data.start_date ? new Date(data.start_date).toLocaleString() : '—'}</div>
              </div>
              <div className="pt-2 border-t border-blue-50">
                <div className="text-xs text-slate-500">Venue</div>
                <div className="text-sm font-semibold text-slate-900">{data.location || '—'}</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}