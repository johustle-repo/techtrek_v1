import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import {
  Eye,
  EyeOff,
  Shield,
  UserPlus,
  CheckCircle2,
  X,
} from 'lucide-react';

/* =========================
   Snackbar Component
========================= */
function Snackbar({
  open,
  message,
  onClose,
}: {
  open: boolean;
  message: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex w-[min(92vw,420px)] items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 shadow-lg">
        <CheckCircle2 className="mt-0.5 h-5 w-5 text-blue-600" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-blue-900">Success</div>
          <div className="text-sm text-blue-800">{message}</div>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1 opacity-60 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* =========================
   Page
========================= */
export default function CreateUser() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    role: 'user',
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const roleLabel = useMemo(() => {
    if (data.role === 'admin') return 'Admin (full control)';
    if (data.role === 'staff') return 'Staff (editor access)';
    return 'User (basic access)';
  }, [data.role]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    post('/admin/users', {
      preserveScroll: true,
      onSuccess: () => {
        setSnackOpen(true);
        reset();
      },
    });
  };

  const inputBase =
    'w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30';
  const errorText = 'mt-1 text-xs text-red-600';

  return (
    <AppLayout>
      <Head title="Add User" />

      {/* Snackbar */}
      <Snackbar
        open={snackOpen}
        message="User created successfully."
        onClose={() => setSnackOpen(false)}
      />

      <div className="mx-auto max-w-5xl space-y-6 rounded-2xl bg-blue-50/40 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-900">
              Add User
            </h1>
            <p className="text-sm text-slate-600">
              Create a new account and assign a role.
            </p>
          </div>

          <Link
            href="/admin/users"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to users
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* FORM */}
          <form
            onSubmit={submit}
            className="lg:col-span-2 space-y-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-blue-900">
                  Account Details
                </div>
                <div className="text-xs text-slate-500">
                  Basic information and credentials
                </div>
              </div>
            </div>

            {/* Name + Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className={inputBase}
                  placeholder="Full name"
                />
                {errors.name && <p className={errorText}>{errors.name}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className={inputBase}
                  placeholder="email@example.com"
                />
                {errors.email && <p className={errorText}>{errors.email}</p>}
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="text-sm font-medium">Role</label>
              <select
                value={data.role}
                onChange={(e) => setData('role', e.target.value)}
                className={`${inputBase} font-medium`}
              >
                <option value="user">User</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
              <p className="mt-1 text-xs text-slate-500">
                Selected: <span className="font-semibold">{roleLabel}</span>
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className={`${inputBase} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-slate-500 hover:text-blue-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && <p className={errorText}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={data.password_confirmation}
                  onChange={(e) =>
                    setData('password_confirmation', e.target.value)
                  }
                  className={`${inputBase} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-2 flex items-center text-slate-500 hover:text-blue-600"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60"
              >
                <Shield className="h-4 w-4" />
                {processing ? 'Creating…' : 'Create User'}
              </button>

              <Link
                href="/admin/users"
                className="text-sm font-medium text-slate-500 hover:underline"
              >
                Cancel
              </Link>
            </div>
          </form>

          {/* PREVIEW */}
          <aside className="space-y-4 rounded-2xl border border-blue-100 bg-blue-50 p-6 shadow-sm">
            <div className="text-sm font-semibold text-blue-900">Preview</div>

            <div className="space-y-3 rounded-lg border border-blue-200 bg-white p-4">
              <div>
                <div className="text-xs text-slate-500">Name</div>
                <div className="text-sm font-semibold">
                  {data.name || '—'}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500">Email</div>
                <div className="text-sm font-semibold break-all">
                  {data.email || '—'}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500">Role</div>
                <span className="inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  {data.role}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
