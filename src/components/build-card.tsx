import { Link } from '@/navigation';
import type { Build } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, MessageSquare, CheckCircle2, XCircle, Ban } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function BuildCard({ build }: { build: Build }) {
  const t = useTranslations('BuildCard');
  const voteScore = build.upvotes - build.downvotes;
  const latestVersion = build.versions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

  const getStatusBadge = () => {
    switch(latestVersion.status) {
        case 'active':
            return <Badge variant={'default'} className={'bg-green-600/20 text-green-400 border-green-600/30'}>
                <CheckCircle2 className="w-3 h-3 mr-1" />
                {t('valid')}
            </Badge>;
        case 'disabled':
             return <Badge variant={'destructive'} className={'bg-red-600/20 text-red-400 border-red-600/30'}>
                <Ban className="w-3 h-3 mr-1" />
                {t('invalid')}
            </Badge>;
        default:
            return null;
    }
  }

  return (
    <Link href={`/builds/${build.id}`} className="group block">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{build.name}</CardTitle>
            <Badge variant="outline">v{latestVersion.version}</Badge>
          </div>
          <CardDescription>
            {t('for')} {build.baseWeapon} {t('by')}{' '}
            <span className="text-primary/80 font-medium">{build.author.name}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {build.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
            {build.tags.length > 3 && (
              <Badge variant="outline">+{build.tags.length - 3} {t('more')}</Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <ArrowUp className={`w-4 h-4 ${voteScore > 0 ? 'text-green-500' : ''}`} />
              <span>{voteScore}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{build.comments.length}</span>
            </div>
          </div>
          {getStatusBadge()}
        </CardFooter>
      </Card>
    </Link>
  );
}
