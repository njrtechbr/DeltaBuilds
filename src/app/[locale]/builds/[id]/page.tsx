import { notFound } from 'next/navigation';
import { builds, users } from '@/lib/data';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { BuildDetailClient } from './build-detail-client';
import PageLayout from '../../page-layout';

export default async function BuildDetailPage({ params }: { params: { id: string, locale: string } }) {
  unstable_setRequestLocale(params.locale);

  const build = builds.find(b => b.id === params.id);

  if (!build) {
    notFound();
  }

  const currentUser = users[0]; // Faking current user

  return (
    <PageLayout>
      <BuildDetailClient build={build} currentUser={currentUser} locale={params.locale} />
    </PageLayout>
  );
}
