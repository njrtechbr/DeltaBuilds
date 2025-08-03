import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { builds } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, MessageSquare, CheckCircle2, XCircle, Copy, History, GalleryVertical, Youtube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default async function BuildDetailPage({ params }: { params: { id: string, locale: string } }) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('BuildDetail');
  const build = builds.find(b => b.id === params.id);

  if (!build) {
    notFound();
  }

  const voteScore = build.upvotes - build.downvotes;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-6">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
             <Image
              src={build.imageUrl}
              alt={build.name}
              fill
              className="object-cover"
              data-ai-hint={build.imageHint}
            />
          </div>

          <div className="space-y-4">
            <div className='flex justify-between items-start'>
                <h1 className="text-4xl font-bold font-headline text-primary">{build.name}</h1>
                <Badge variant="outline" className="text-base font-bold border-2">v{build.version}</Badge>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
               <Link href={`/profile/${build.author.name}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={build.author.avatarUrl} alt={build.author.name} />
                    <AvatarFallback>{build.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{build.author.name}</span>
               </Link>
               <span>•</span>
               <span>{new Date(build.createdAt).toLocaleDateString(params.locale)}</span>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-headline flex items-center gap-2"><Copy className="w-5 h-5" /> {t('shareCode')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 p-3 bg-secondary rounded-md">
                <span className="font-mono text-lg text-accent-foreground flex-grow">{build.shareCode}</span>
                <Button variant="ghost" size="icon" aria-label={t('copyShareCode')}>
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {build.youtubeUrl && (
            <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-headline flex items-center gap-2">
                    <Youtube className="w-5 h-5 text-red-500"/>
                    {t('video')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video rounded-lg overflow-hidden border">
                        <iframe
                            className="w-full h-full"
                            src={build.youtubeUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold font-headline">{t('description')}</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">{build.description}</p>
          </div>
          
          {build.patchNotes && (
             <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle className="text-lg font-headline flex items-center gap-2">
                    <History className="w-5 h-5 text-primary"/>
                    {t('patchNotes')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">{build.patchNotes}</p>
                </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold font-headline">{t('playstyleTags')}</h2>
            <div className="flex flex-wrap gap-2">
              {build.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-base px-3 py-1">{tag}</Badge>
              ))}
            </div>
          </div>

          {build.galleryImageUrls && build.galleryImageUrls.length > 0 && (
             <div className="space-y-4">
                <h2 className="text-2xl font-semibold font-headline flex items-center gap-2">
                    <GalleryVertical className="w-6 h-6" />
                    {t('gallery')}
                </h2>
                <Carousel className="w-full">
                    <CarouselContent>
                        {build.galleryImageUrls.map((url, index) => (
                        <CarouselItem key={index} className="md:basis-1/2">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-video items-center justify-center p-0 rounded-lg overflow-hidden">
                                        <Image src={url} alt={`${build.name} gallery image ${index + 1}`} width={600} height={400} className="object-cover" />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
             </div>
          )}

        </div>

        <aside className="md:col-span-2 space-y-6">
            <Card className="flex items-center justify-around p-4">
                 <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" aria-label={t('upvote')}>
                        <ArrowUp className="w-5 h-5 text-green-500"/>
                    </Button>
                    <span className="text-xl font-bold">{voteScore}</span>
                    <Button variant="outline" size="icon" aria-label={t('downvote')}>
                        <ArrowDown className="w-5 h-5 text-red-500"/>
                    </Button>
                </div>
                 <Badge variant={build.isValid ? 'default' : 'destructive'} className={`text-lg px-4 py-2 ${build.isValid ? 'bg-green-600/20 text-green-400 border-green-600/30' : 'bg-red-600/20 text-red-400 border-red-600/30'}`}>
                    {build.isValid ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                    {build.isValid ? t('valid') : t('invalid')}
                </Badge>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <MessageSquare className="w-5 h-5" />
                  {t('comments')} ({build.comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Textarea placeholder={t('addCommentPlaceholder')} />
                    <Button className="w-full" variant="secondary">{t('submitComment')}</Button>
                 </div>
                 <Separator/>
                 <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {build.comments.map(comment => (
                      <div key={comment.id} className="flex gap-3">
                         <Avatar className="w-8 h-8">
                            <AvatarImage src={comment.author.avatarUrl} />
                            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                         </Avatar>
                         <div className="flex-grow">
                            <div className="flex items-baseline gap-2">
                                <span className="font-semibold text-sm">{comment.author.name}</span>
                                <span className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString(params.locale)}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{comment.text}</p>
                         </div>
                      </div>
                    ))}
                    {build.comments.length === 0 && (
                        <p className="text-sm text-center text-muted-foreground py-4">{t('noComments')}</p>
                    )}
                 </div>
              </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}
