import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import { PageHeader } from '@/components/page-header';
import { builds, users } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { BuildListItem } from '@/components/build-list-item';
import { Separator } from '@/components/ui/separator';

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
        <div className="border rounded-lg">
          {userBuilds.map((build, index) => (
            <div key={build.id} className="flex flex-col">
                 <BuildListItem 
                    build={build} 
                    isLast={index === userBuilds.length - 1}
                    locale={locale}
                />
                <div className='p-4 pt-0'>
                    <Button asChild variant="secondary" className="w-full">
                        <Link href={{ pathname: '/submit', query: { buildId: build.id } }}>
                        {t('addNewVersion')}
                        </Link>
                    </Button>
                </div>
                {index < userBuilds.length - 1 && <Separator />}
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
