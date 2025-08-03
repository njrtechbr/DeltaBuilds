import Link from 'next/link';
import Image from 'next/image';
import type { Build } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, MessageSquare, CheckCircle2, XCircle, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useTranslations } from 'next-intl';

export function BuildListItem({ build, isLast, locale }: { build: Build, isLast: boolean, locale: string }) {
  const t = useTranslations('BuildListItem');
  const voteScore = build.upvotes - build.downvotes;

  return (
    <Link href={`/builds/${build.id}`} className={cn(
        "group block transition-colors hover:bg-secondary/50",
        !isLast && "border-b"
    )}>
      <div className="flex items-center p-4 gap-4">
        <div className="relative w-24 h-16 rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={build.imageUrl}
              alt={build.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={build.imageHint}
            />
        </div>
        
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-1">
                <h3 className="font-headline text-lg font-semibold group-hover:text-primary transition-colors">{build.name}</h3>
                <p className="text-sm text-muted-foreground">
                    {t('for')} {build.baseWeapon}
                </p>
            </div>

            <div className="md:col-span-1 flex flex-col gap-1 text-sm text-muted-foreground">
                 <div className="flex items-center gap-2">
                    <Avatar className="w-5 h-5">
                        <AvatarImage src={build.author.avatarUrl} alt={build.author.name} />
                        <AvatarFallback>{build.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{build.author.name}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(build.createdAt).toLocaleDateString(locale)}</span>
                </div>
            </div>

            <div className="md:col-span-1 flex items-center justify-end gap-4">
                 <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5" title={t('votes')}>
                        <ArrowUp className={`w-4 h-4 ${voteScore > 0 ? 'text-green-500' : ''}`} />
                        <span className="font-semibold text-base">{voteScore}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title={t('comments')}>
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-semibold text-base">{build.comments.length}</span>
                    </div>
                 </div>
                 <div className="flex flex-col items-end gap-1.5">
                    <Badge variant={build.isValid ? 'default' : 'destructive'} className={cn('text-xs', build.isValid ? 'bg-green-600/20 text-green-400 border-green-600/30' : 'bg-red-600/20 text-red-400 border-red-600/30')}>
                        {build.isValid ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                        {build.isValid ? t('valid') : t('invalid')}
                    </Badge>
                     <Badge variant="outline" className="text-xs">v{build.version}</Badge>
                 </div>
            </div>
        </div>
      </div>
    </Link>
  );
}
