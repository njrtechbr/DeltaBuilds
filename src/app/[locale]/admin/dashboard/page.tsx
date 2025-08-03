import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { builds, reportedCodes } from "@/lib/data";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ShieldAlert, Swords, Timer } from "lucide-react";

export default async function AdminDashboardPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Admin');

  const totalBuilds = builds.length;
  const pendingBuilds = builds.filter(b => b.versions[0].status === 'pending').length;
  const totalReports = reportedCodes.length;

  return (
    <div className="space-y-8">
      <PageHeader title={t('dashboardTitle')} description={t('dashboardDescription')} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Builds" value={totalBuilds} icon={Swords} />
        <StatCard title="Pending Builds" value={pendingBuilds} icon={Timer} />
        <StatCard title="Open Reports" value={totalReports} icon={ShieldAlert} />
      </div>
    </div>
  );
}
