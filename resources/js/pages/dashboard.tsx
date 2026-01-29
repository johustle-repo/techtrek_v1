import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { Building2, Store, Users, ShieldCheck, UserCog, MapPin, Clock } from 'lucide-react';

type Stats = {
  attractions_total?: number;
  businesses_total?: number;
  businesses_open?: number;
  businesses_closed?: number;

  users_total?: number;
  admins_total?: number;
  staff_total?: number;
};

type Activity = {
  type: 'Attraction' | 'Business' | 'User';
  label: string;
  date: string;
  url: string;
};

export default function Dashboard() {
  const { auth, stats, recentActivities } = usePage<
    SharedData & { stats: Stats; recentActivities: Activity[] }
  >().props;

  const isAdmin = auth?.user?.role === 'admin';

  const Card = ({
    title,
    value,
    subtitle,
    icon: Icon,
  }: {
    title: string;
    value: number | string;
    subtitle: string;
    icon: any;
  }) => (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-700">{title}</div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-100">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-2 text-4xl font-extrabold text-blue-900">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{subtitle}</div>
    </div>
  );

  const typeBadge = (type: Activity['type']) => {
    const base = 'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset';
    if (type === 'Attraction') return `${base} bg-blue-50 text-blue-800 ring-blue-200`;
    if (type === 'Business') return `${base} bg-blue-100 text-blue-900 ring-blue-200`;
    return `${base} bg-slate-100 text-slate-700 ring-slate-200`;
  };

  return (
    <AppLayout>
      <Head title="Dashboard" />

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6 rounded-2xl bg-blue-50/40 p-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">
              Dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Overview of TechTrek Labrador data and recent activity.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid gap-4 lg:grid-cols-3">
            {isAdmin && (
              <>
                <Card
                  title="Total Users"
                  value={stats.users_total ?? 0}
                  subtitle="All registered accounts"
                  icon={Users}
                />
                <Card
                  title="Admins"
                  value={stats.admins_total ?? 0}
                  subtitle="Full system access"
                  icon={ShieldCheck}
                />
                <Card
                  title="Staff"
                  value={stats.staff_total ?? 0}
                  subtitle="Editor / contributor accounts"
                  icon={UserCog}
                />
              </>
            )}

            <Card
              title="Attractions"
              value={stats.attractions_total ?? 0}
              subtitle="Total destinations listed"
              icon={MapPin}
            />

            <Card
              title="Businesses"
              value={stats.businesses_total ?? 0}
              subtitle="Total business listings"
              icon={Building2}
            />

            <Card
              title="Open Businesses"
              value={stats.businesses_open ?? 0}
              subtitle={`Closed: ${stats.businesses_closed ?? 0}`}
              icon={Store}
            />
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Clock className="h-4 w-4 text-blue-700" />
                Recent Activity
              </div>
              <div className="text-xs text-slate-500">
                Latest changes across the system
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-blue-100">
              <table className="w-full text-sm">
                <thead className="bg-blue-50 text-blue-900">
                  <tr>
                    <th className="p-3 text-left font-semibold">Type</th>
                    <th className="p-3 text-left font-semibold">Item</th>
                    <th className="p-3 text-left font-semibold">Date</th>
                    <th className="p-3 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentActivities?.map((a, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                      <td className="p-3">
                        <span className={typeBadge(a.type)}>{a.type}</span>
                      </td>
                      <td className="p-3 font-medium text-slate-900">{a.label}</td>
                      <td className="p-3 text-slate-600">
                        {new Date(a.date).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <a
                          href={a.url}
                          className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}

                  {!recentActivities?.length && (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-slate-500">
                        No recent activity yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Tip: Activity is based on the most recently created records (users, attractions, businesses).
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
