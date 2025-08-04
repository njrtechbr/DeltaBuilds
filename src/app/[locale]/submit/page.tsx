'use client';

import { BuildForm } from "@/components/build-form";
import { PageHeader } from "@/components/page-header";
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation'
import { builds } from "@/lib/data";
import PageLayout from "../page-layout";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "@/navigation";

export default function SubmitBuildPage() {
  const t = useTranslations('Submit');
  const searchParams = useSearchParams()
  const buildId = searchParams.get('buildId');
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  const buildToUpdate = buildId ? builds.find(b => b.id === buildId) : undefined;
  const isUpdateMode = !!buildToUpdate;
  
  if (typeof window !== 'undefined' && !isAuthenticated) {
    router.push('/login');
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
