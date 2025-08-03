import { BuildForm } from "@/components/build-form";
import { PageHeader } from "@/components/page-header";
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import { redirect } from "@/navigation";

export default async function SubmitBuildPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Submit');

  // TODO: Replace with real authentication check
  const isAuthenticated = true;

  if (!isAuthenticated) {
    redirect('/login');
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader 
        title={t('title')}
        description={t('description')}
      />
      <BuildForm />
    </div>
  )
}
