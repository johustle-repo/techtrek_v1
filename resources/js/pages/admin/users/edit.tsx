import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import {
  Shield,
  KeyRound,
  MailCheck,
  Power,
  CheckCircle2,
  AlertTriangle,
  X,
} from 'lucide-react';
import { useState } from 'react';

type EditUserProps = {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at?: string | null;
    is_active?: boolean;
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
        className={`flex w-[min(92vw,420px)] items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${styles}`}
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
          onClick={onClose}
          className="rounded-md p-1 opacity-60 hover:opacity-100"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function EditUser({ user }: EditUserProps) {
  const { auth } = usePage<SharedData>().props;

  const isSelf = auth.user.id === user.id;
  const canChangeRole = !(isSelf && user.role === 'admin');

  const { data, setData, put, processing, errors } = useForm({
    role: user.role,
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    put(`/admin/users/${user.id}`, {
      preserveScroll: true,
      onSuccess: () => openSnack('success', 'User updated successfully.'),
      onError: () => openSnack('error', 'Unable to update user.'),
    });
  };

  const adminAction = (label: string, cb: () => void) => {
    if (confirm(label)) cb();
  };

  const card =
    'rounded-2xl border border-blue-100 bg-white p-6 shadow-sm space-y-4';

  return (
    <AppLayout>
      <Head title="Edit User" />

      <Snackbar
        open={snackOpen}
        type={snackType}
        message={snackMsg}
        onClose={() => setSnackOpen(false)}
      />

      <div className="mx-auto max-w-4xl space-y-6 rounded-2xl bg-blue-50/40 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-900">
              User Management
            </h1>
            <p className="text-sm text-slate-600">
              Manage permissions and security settings
            </p>
          </div>

          <Link
            href="/admin/users"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to users
          </Link>
        </div>

        {/* PROFILE */}
        <div className={card}>
          <h2 className="text-sm font-semibold uppercase text-blue-800">
            Profile
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-xs text-slate-500">Name</div>
              <div className="font-semibold text-slate-900">{user.name}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Email</div>
              <div className="font-semibold text-slate-900">{user.email}</div>
            </div>
          </div>
        </div>

        {/* ROLE */}
        <form onSubmit={submit} className={card}>
          <h2 className="text-sm font-semibold uppercase text-blue-800">
            Role & Access
          </h2>

          <div>
            <label className="text-sm font-medium">Role</label>
            <select
              value={data.role}
              onChange={(e) => setData('role', e.target.value)}
              disabled={!canChangeRole || processing}
              className="mt-1 w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60"
            >
              <option value="user">User – Basic access</option>
              <option value="staff">Staff – Content editor</option>
              <option value="admin">Admin – Full control</option>
            </select>

            {errors.role && (
              <p className="mt-1 text-xs text-red-600">{errors.role}</p>
            )}

            {isSelf && user.role === 'admin' && (
              <p className="mt-2 text-xs text-blue-700">
                You cannot remove your own admin role.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={processing || !canChangeRole}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/40 disabled:opacity-60"
          >
            <Shield className="h-4 w-4" />
            Save Changes
          </button>
        </form>

        {/* SECURITY / ADMIN TOOLS */}
        <div className={card}>
          <h2 className="text-sm font-semibold uppercase text-blue-800">
            Security Tools
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Reset Password */}
            <button
              type="button"
              onClick={() =>
                adminAction('Reset password for this user?', () =>
                  router.post(
                    `/admin/users/${user.id}/reset-password`,
                    {},
                    {
                      preserveScroll: true,
                      onSuccess: () =>
                        openSnack('success', 'Password reset triggered.'),
                      onError: () =>
                        openSnack('error', 'Failed to reset password.'),
                    }
                  )
                )
              }
              className="flex items-center gap-2 rounded-lg border border-blue-200 px-4 py-2 text-sm hover:bg-blue-50"
            >
              <KeyRound className="h-4 w-4 text-blue-700" />
              Reset Password
            </button>

            {/* Verify Email */}
            {!user.email_verified_at && (
              <button
                type="button"
                onClick={() =>
                  adminAction('Mark email as verified?', () =>
                    router.put(
                      `/admin/users/${user.id}/verify-email`,
                      {},
                      {
                        preserveScroll: true,
                        onSuccess: () =>
                          openSnack('success', 'Email marked as verified.'),
                        onError: () =>
                          openSnack('error', 'Failed to verify email.'),
                      }
                    )
                  )
                }
                className="flex items-center gap-2 rounded-lg border border-blue-200 px-4 py-2 text-sm hover:bg-blue-50"
              >
                <MailCheck className="h-4 w-4 text-blue-700" />
                Verify Email
              </button>
            )}

            {/* Toggle Active */}
            <button
              type="button"
              disabled={isSelf}
              onClick={() =>
                adminAction(
                  user.is_active ? 'Deactivate this user?' : 'Reactivate this user?',
                  () =>
                    router.put(
                      `/admin/users/${user.id}/toggle-active`,
                      {},
                      {
                        preserveScroll: true,
                        onSuccess: () =>
                          openSnack(
                            'success',
                            user.is_active ? 'User deactivated.' : 'User reactivated.'
                          ),
                        onError: () =>
                          openSnack('error', 'Failed to update user status.'),
                      }
                    )
                )
              }
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm
                ${
                  user.is_active
                    ? 'border-blue-300 bg-blue-50 text-blue-800 hover:bg-blue-100'
                    : 'border-blue-200 bg-white text-blue-700 hover:bg-blue-50'
                }
                disabled:opacity-50`}
            >
              <Power className="h-4 w-4" />
              {user.is_active ? 'Deactivate User' : 'Reactivate User'}
            </button>
          </div>

          <p className="text-xs text-slate-500">
            Admin actions are logged. Use responsibly.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
