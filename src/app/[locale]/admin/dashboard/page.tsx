import { PageHeader } from "@/components/page-header";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export default async function AdminDashboardPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Admin');

  return (
    <div className="space-y-8">
      <PageHeader title={t('dashboardTitle')} description={t('dashboardDescription')} />
      {/* Add dashboard widgets here */}
    </div>
  );
}
