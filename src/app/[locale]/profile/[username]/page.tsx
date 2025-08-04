import { notFound } from 'next/navigation';
import { users, builds } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BuildListItem } from '@/components/build-list-item';
import { Star, Swords, Globe, Twitch, Twitter, Youtube, Facebook, Instagram, Settings } from 'lucide-react';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import PageLayout from '../../page-layout';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default async function ProfilePage({ params }: { params: { username: string, locale: string } }) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('Profile');
  const user = users.find(u => u.name.toLowerCase() === params.username.toLowerCase());

  if (!user) {
    notFound();
  }

  const userBuilds = builds.filter(b => b.author.id === user.id);
  const favoriteBuilds = builds.filter(b => b.favoritedBy.includes(user.id));
  const isCurrentUser = users[0].id === user.id; // Faking current user

  const socialIcons = {
    youtube: Youtube,
    twitch: Twitch,
    instagram: Instagram,
    facebook: Facebook,
    x: Twitter,
  }

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="w-24 h-24 border-4 border-primary">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className='flex-grow'>
            <div className='flex justify-between items-start'>
                <PageHeader title={user.name} />
                {isCurrentUser && (
                    <Button asChild variant="outline">
                        <Link href="/profile/edit"><Settings className="mr-2 h-4 w-4" /> {t('editProfile')}</Link>
                    </Button>
                )}
            </div>
            <div className="flex items-center gap-6 text-muted-foreground mb-2">
              <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent"/>
                  <span className="font-bold text-lg">{user.reputation}</span> {t('reputation')}
              </div>
              <div className="flex items-center gap-2">
                  <Swords className="w-5 h-5 text-primary"/>
                  <span className="font-bold text-lg">{userBuilds.length}</span> {t('builds')}
              </div>
            </div>
             {user.bio && <p className="text-muted-foreground max-w-prose">{user.bio}</p>}
             {user.socials && (
                <div className='flex items-center gap-2 mt-4'>
                    <TooltipProvider>
                    {Object.entries(user.socials).map(([key, value]) => {
                        if (value) {
                            const Icon = socialIcons[key as keyof typeof socialIcons];
                            return (
                                <Tooltip key={key}>
                                    <TooltipTrigger asChild>
                                        <a href={value} target="_blank" rel="noopener noreferrer">
                                            <Button variant="ghost" size="icon">
                                                <Icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                                            </Button>
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{t(`socials.${key}` as any)}</p>
                                    </TooltipContent>
                                </Tooltip>
                            )
                        }
                        return null;
                     })}
                    </TooltipProvider>
                </div>
             )}
          </div>
        </div>
        
        <div className="space-y-8">
          <div>
              <h2 className="text-2xl font-headline font-bold mb-4">{t('submittedBuilds')}</h2>
              {userBuilds.length > 0 ? (
                  <div className="border rounded-lg">
                      {userBuilds.map((build, index) => (
                          <BuildListItem 
                              key={build.id} 
                              build={build} 
                              isLast={index === userBuilds.length - 1}
                              locale={params.locale}
                          />
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-16 text-muted-foreground bg-card rounded-lg">
                  <h3 className="text-xl font-semibold">{t('noBuildsTitle')}</h3>
                  <p>{t('noBuildsDescription', {username: user.name})}</p>
                  </div>
              )}
          </div>

          <div>
              <h2 className="text-2xl font-headline font-bold mb-4">{t('favoriteBuilds')}</h2>
              {favoriteBuilds.length > 0 ? (
                  <div className="border rounded-lg">
                      {favoriteBuilds.map((build, index) => (
                          <BuildListItem 
                              key={build.id} 
                              build={build} 
                              isLast={index === favoriteBuilds.length - 1}
                              locale={params.locale}
                          />
                      ))}
                  </div>
              ) : (
                  <div className="text-center py-16 text-muted-foreground bg-card rounded-lg">
                  <h3 className="text-xl font-semibold">{t('noFavoritesTitle')}</h3>
                  <p>{ isCurrentUser ? t('noFavoritesDescription') : t('noFavoritesDescriptionOther', {username: user.name})}</p>
                  </div>
              )}
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
