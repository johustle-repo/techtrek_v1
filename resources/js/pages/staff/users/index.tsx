import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import type { SharedData } from '@/types';
import { Search, Filter, Users, ShieldCheck, UserCog } from 'lucide-react';

type UserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
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

export default function UsersIndex({ users }: { users: UserRow[] }) {
  const { auth, flash } = usePage<SharedData & { flash?: any }>().props;

  const [busyId, setBusyId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(
    null
  );

  const [q, setQ] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'staff' | 'user'>('all');

  useEffect(() => {
    if (flash?.success) setSnackbar({ message: flash.success, type: 'success' });
    if (flash?.error) setSnackbar({ message: flash.error, type: 'error' });
  }, [flash]);

  const sortedUsers = useMemo(() => [...(users ?? [])].sort((a, b) => b.id - a.id), [users]);

  const filteredUsers = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return sortedUsers.filter((u) => {
      const matchQ =
        !needle ||
        u.name.toLowerCase().includes(needle) ||
        u.email.toLowerCase().includes(needle) ||
        u.role.toLowerCase().includes(needle);

      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      return matchQ && matchRole;
    });
  }, [sortedUsers, q, roleFilter]);

  const total = sortedUsers.length;
  const admins = useMemo(() => sortedUsers.filter((u) => u.role === 'admin').length, [sortedUsers]);
  const staff = useMemo(() => sortedUsers.filter((u) => u.role === 'staff').length, [sortedUsers]);

  const goCreate = () => router.visit('/admin/users/create');
  const goEdit = (id: number) => router.visit(`/admin/users/${id}/edit`);

  const updateRole = (id: number, role: string) => {
    setBusyId(id);
    router.put(
      `/admin/users/${id}`,
      { role },
      {
        preserveScroll: true,
        preserveState: true,
        onFinish: () => {
          setBusyId(null);
          setSnackbar({ message: 'Role updated successfully!', type: 'success' });
        },
      }
    );
  };

  const deleteUser = (id: number, name: string) => {
    if (auth?.user?.id === id) {
      setSnackbar({ message: "You can't delete your own account.", type: 'error' });
      return;
    }
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setBusyId(id);
    router.delete(`/admin/users/${id}`, {
      preserveScroll: true,
      onFinish: () => {
        setBusyId(null);
        setSnackbar({ message: 'User deleted successfully!', type: 'success' });
      },
    });
  };

  const roleBadge = (role: string) => {
    const base =
      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset';
    if (role === 'admin') return `${base} bg-blue-600 text-white ring-blue-600`;
    if (role === 'staff') return `${base} bg-blue-100 text-blue-700 ring-blue-200`;
    return `${base} bg-slate-100 text-slate-700 ring-slate-200`;
  };

  return (
    <AppLayout>
      <Head title="Manage Users" />

      {snackbar && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />
      )}

      {/* ✅ MAXIMUM WIDTH CONTAINER (no max-w, no mx-auto) */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* ✅ keep the nice background but allow it to stretch */}
        <div className="w-full space-y-6 rounded-2xl bg-blue-50/40 p-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">
                User Management
              </h1>
              <p className="text-sm text-slate-600">
                Control access, roles, and permissions.
              </p>
            </div>

            <button
              onClick={goCreate}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/40"
            >
              + Add User
            </button>
          </div>

          {/* KPI */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Users className="h-4 w-4 text-blue-700" />
                Total Users
              </div>
              <div className="mt-2 text-4xl font-extrabold text-blue-900">{total}</div>
              <div className="mt-1 text-xs text-slate-500">All registered accounts</div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <ShieldCheck className="h-4 w-4 text-blue-700" />
                Admins
              </div>
              <div className="mt-2 text-4xl font-extrabold text-blue-900">{admins}</div>
              <div className="mt-1 text-xs text-slate-500">Full system access</div>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <UserCog className="h-4 w-4 text-blue-700" />
                Staff
              </div>
              <div className="mt-2 text-4xl font-extrabold text-blue-900">{staff}</div>
              <div className="mt-1 text-xs text-slate-500">Editor / contributor accounts</div>
            </div>
          </div>

          {/* Search */}
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-xl">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-700/70" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search name, email, role…"
                  className="w-full rounded-lg border border-blue-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800">
                  <Filter className="h-4 w-4" />
                  Filter
                </div>

                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as any)}
                  className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="all">All roles</option>
                  <option value="admin">admin</option>
                  <option value="staff">staff</option>
                  <option value="user">user</option>
                </select>
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-500">
              Showing <span className="font-semibold">{filteredUsers.length}</span> of{' '}
              <span className="font-semibold">{total}</span> users
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-blue-50 text-blue-900">
                  <tr className="text-left">
                    <th className="p-4 font-semibold w-[90px]">User ID</th>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold">Role</th>
                    <th className="p-4 font-semibold">Created</th>
                    <th className="p-4 font-semibold w-[280px]">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredUsers.map((u) => {
                    const isBusy = busyId === u.id;

                    return (
                      <tr key={u.id} className="hover:bg-blue-50/40 transition-colors">
                        <td className="p-4 font-semibold text-slate-700">{u.id}</td>
                        <td className="p-4 font-semibold text-slate-900">{u.name}</td>
                        <td className="p-4 text-slate-600">{u.email}</td>

                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span className={roleBadge(u.role)}>{u.role}</span>
                            <select
                              value={u.role}
                              disabled={isBusy}
                              onChange={(e) => updateRole(u.id, e.target.value)}
                              className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-xs focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                            >
                              <option value="user">user</option>
                              <option value="staff">staff</option>
                              <option value="admin">admin</option>
                            </select>

                            {isBusy && <span className="text-xs text-blue-600">Saving…</span>}
                          </div>
                        </td>

                        <td className="p-4 text-slate-600">
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>

                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => goEdit(u.id)}
                              disabled={isBusy}
                              className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 disabled:opacity-60"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteUser(u.id, u.name)}
                              disabled={isBusy || auth?.user?.id === u.id}
                              className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-60"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {!filteredUsers.length && (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-slate-500">
                        No users found for your current search/filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-blue-100 bg-blue-50/40 px-6 py-3 text-xs text-slate-600">
              Tip: Use <strong>staff</strong> for editors and keep admin accounts minimal.
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
