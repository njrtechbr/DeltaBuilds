import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import { PageHeader } from '@/components/page-header';
import { builds, users } from '@/lib/data';
import { BuildCard } from '@/components/build-card';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';

export default async function MyBuildsPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('MyBuilds');

  const currentUser = users[0]; // Faking current user
  const userBuilds = builds.filter(b => b.author.id === currentUser.id);

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('title')}
        description={t('description')}
      />

      {userBuilds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userBuilds.map(build => (
            <div key={build.id} className="flex flex-col gap-2">
              <BuildCard build={build} />
              <Button asChild>
                <Link href={{ pathname: '/submit', query: { buildId: build.id } }}>
                  {t('addNewVersion')}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground bg-card rounded-lg">
          <h3 className="text-xl font-semibold">{t('noBuildsTitle')}</h3>
          <p className="mb-4">{t('noBuildsDescription')}</p>
          <Button asChild>
            <Link href="/submit">{t('submitFirstBuild')}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
