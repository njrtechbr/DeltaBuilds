import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import { PageHeader } from '@/components/page-header';
import { builds, users } from '@/lib/data';
import { BuildListItem } from '@/components/build-list-item';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import PageLayout from '../page-layout';

export default async function MyFavoritesPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('MyFavorites');

  const currentUser = users[0]; // Faking current user
  const favoriteBuilds = builds.filter(b => b.favoritedBy.includes(currentUser.id));

  return (
    <PageLayout>
      <div className="space-y-8">
        <PageHeader
          title={t('title')}
          description={t('description')}
        />

        {favoriteBuilds.length > 0 ? (
          <div className="border rounded-lg">
            {favoriteBuilds.map((build, index) => (
              <BuildListItem 
                  key={build.id} 
                  build={build} 
                  isLast={index === favoriteBuilds.length - 1}
                  locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground bg-card rounded-lg">
            <h3 className="text-xl font-semibold">{t('noFavoritesTitle')}</h3>
            <p className="mb-4">{t('noFavoritesDescription')}</p>
            <Button asChild>
              <Link href="/">{t('discoverBuilds')}</Link>
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
