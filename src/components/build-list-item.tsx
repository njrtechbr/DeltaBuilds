import Link from 'next/link';
import type { Build } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, MessageSquare, CheckCircle2, XCircle, User, Calendar, Smartphone, Laptop, Gamepad2, Ban } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useTranslations } from 'next-intl';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export function BuildListItem({ build, isLast, locale }: { build: Build, isLast: boolean, locale: string }) {
  const t = useTranslations('BuildListItem');
  const voteScore = build.upvotes - build.downvotes;
  const latestVersion = build.versions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

  const getStatusBadge = () => {
    switch(latestVersion.status) {
      case 'active':
        return <Badge variant={'default'} className={cn('text-xs', 'bg-green-600/20 text-green-400 border-green-600/30')}>
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {t('valid')}
        </Badge>
      case 'disabled':
        return <Badge variant={'destructive'} className={cn('text-xs', 'bg-red-600/20 text-red-400 border-red-600/30')}>
            <Ban className="w-3 h-3 mr-1" />
            {t('invalid')}
        </Badge>
      default:
        return null;
    }
  }

  return (
    <Link href={`/builds/${build.id}`} className={cn(
        "group block transition-colors hover:bg-secondary/50",
        !isLast && "border-b"
    )}>
      <div className="flex items-center p-4 gap-4">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
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

            <div className="md:col-span-1 flex items-center gap-4 text-muted-foreground">
                <TooltipProvider>
                    <div className="flex items-center gap-2">
                        {latestVersion.steamCode && (
                            <Tooltip>
                                <TooltipTrigger><Laptop className="w-5 h-5"/></TooltipTrigger>
                                <TooltipContent>Steam</TooltipContent>
                            </Tooltip>
                        )}
                        {latestVersion.garenaCode && (
                            <Tooltip>
                                <TooltipTrigger><Gamepad2 className="w-5 h-5"/></TooltipTrigger>
                                <TooltipContent>Garena</TooltipContent>
                            </Tooltip>
                        )}
                        {latestVersion.mobileCode && (
                             <Tooltip>
                                <TooltipTrigger><Smartphone className="w-5 h-5"/></TooltipTrigger>
                                <TooltipContent>Mobile</TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </TooltipProvider>
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
                    {getStatusBadge()}
                     <Badge variant="outline" className="text-xs">v{latestVersion.version}</Badge>
                 </div>
            </div>
        </div>
      </div>
    </Link>
  );
}
