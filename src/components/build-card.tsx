import Link from 'next/link';
import Image from 'next/image';
import type { Build } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, MessageSquare, CheckCircle2, XCircle } from 'lucide-react';

export function BuildCard({ build }: { build: Build }) {
  const voteScore = build.upvotes - build.downvotes;

  return (
    <Link href={`/builds/${build.id}`} className="group block">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10">
        <CardHeader>
          <div className="relative aspect-video mb-4 rounded-md overflow-hidden">
            <Image
              src={build.imageUrl}
              alt={build.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={build.imageHint}
            />
          </div>
          <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{build.name}</CardTitle>
          <CardDescription>
            For {build.baseWeapon} by{' '}
            <span className="text-primary/80 font-medium">{build.author.name}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {build.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
            {build.tags.length > 3 && (
              <Badge variant="outline">+{build.tags.length - 3} more</Badge>
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
          <Badge variant={build.isValid ? 'default' : 'destructive'} className={build.isValid ? 'bg-green-600/20 text-green-400 border-green-600/30' : 'bg-red-600/20 text-red-400 border-red-600/30'}>
            {build.isValid ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
            {build.isValid ? 'Valid' : 'Invalid'}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
