'use client';

import { BuildForm } from "@/components/build-form";
import { PageHeader } from "@/components/page-header";
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation'
import { builds } from "@/lib/data";
import PageLayout from "../page-layout";

export default function SubmitBuildPage() {
  const t = useTranslations('Submit');
  const searchParams = useSearchParams()
  const buildId = searchParams.get('buildId');
  
  const buildToUpdate = buildId ? builds.find(b => b.id === buildId) : undefined;
  const isUpdateMode = !!buildToUpdate;
  
  // TODO: Replace with real authentication check
  const isAuthenticated = true;

  if (!isAuthenticated) {
    // In a real app, this would use the router from next/navigation
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        <PageHeader 
          title={isUpdateMode ? t('updateTitle') : t('title')}
          description={isUpdateMode ? t('updateDescription') : t('description')}
        />
        <BuildForm buildToUpdate={buildToUpdate} />
      </div>
    </PageLayout>
  )
}
