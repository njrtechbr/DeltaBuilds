import { notFound } from 'next/navigation';
import { users, builds } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { BuildCard } from '@/components/build-card';
import { Star, Swords } from 'lucide-react';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';

export default async function ProfilePage({ params }: { params: { username: string, locale: string } }) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('Profile');
  const user = users.find(u => u.name.toLowerCase() === params.username.toLowerCase());

  if (!user) {
    notFound();
  }

  const userBuilds = builds.filter(b => b.author.id === user.id);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <Avatar className="w-24 h-24 border-4 border-primary">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <PageHeader title={user.name} />
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent"/>
                <span className="font-bold text-lg">{user.reputation}</span> {t('reputation')}
            </div>
             <div className="flex items-center gap-2">
                <Swords className="w-5 h-5 text-primary"/>
                <span className="font-bold text-lg">{userBuilds.length}</span> {t('builds')}
            </div>
          </div>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
            <h2 className="text-2xl font-headline font-bold mb-4">{t('submittedBuilds')}</h2>
             {userBuilds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userBuilds.map(build => (
                    <BuildCard key={build.id} build={build} />
                ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground">
                <h3 className="text-xl font-semibold">{t('noBuildsTitle')}</h3>
                <p>{t('noBuildsDescription', {username: user.name})}</p>
                </div>
            )}
        </CardContent>
      </Card>

    </div>
  );
}
