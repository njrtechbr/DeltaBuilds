'use client';

import type { Build, User } from '@/lib/types';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, MessageSquare, CheckCircle2, XCircle, Copy, History, GalleryVertical, Youtube, Languages, Loader2, Star, Share2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useTranslations, useLocale } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getTranslation } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from '@/components/ui/label';

interface BuildDetailClientProps {
    build: Build;
    currentUser: User;
    locale: string;
}

export function BuildDetailClient({ build: initialBuild, currentUser, locale }: BuildDetailClientProps) {
  const t = useTranslations('BuildDetail');
  const bT = useTranslations('BuildForm');
  const { toast } = useToast();

  const [build, setBuild] = useState(initialBuild);
  const [translatedDescription, setTranslatedDescription] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  
  const [isFavorited, setIsFavorited] = useState(build.favoritedBy.includes(currentUser.id));
  
  const handleFavoriteToggle = () => {
    // This is a mock implementation. In a real app, this would be an API call.
    const newFavoritedBy = isFavorited 
        ? build.favoritedBy.filter(id => id !== currentUser.id)
        : [...build.favoritedBy, currentUser.id];
    
    setBuild(prevBuild => ({ ...prevBuild, favoritedBy: newFavoritedBy }));
    setIsFavorited(!isFavorited);
  }

  const handleTranslate = async () => {
    setIsTranslating(true);
    setTranslatedDescription(null);
    try {
      const result = await getTranslation({ text: build.description, targetLocale: locale });
      if (result.error) {
        toast({
          variant: 'destructive',
          title: bT('toast.errorTitle'),
          description: result.error,
        });
      } else {
        setTranslatedDescription(result.translatedText || null);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: bT('toast.errorTitle'),
        description: t('translationError'),
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const latestVersion = build.versions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  const voteScore = build.upvotes - build.downvotes;
  
  const copyImportCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
        title: t('copiedToast'),
        description: t('copiedToastDescription'),
    })
  }
  
  const renderImportCode = (code: string | undefined, platform: string) => {
    if (!code) return null;
    return (
        <div className='flex items-center gap-2'>
            <span className="font-mono text-xs md:text-sm bg-muted px-2 py-1 rounded-md">{code}</span>
            <Button variant="ghost" size="icon" aria-label={t('copyImportCode')} onClick={() => copyImportCode(code)}>
                <Copy className="w-4 h-4" />
            </Button>
        </div>
    )
  }

  const latestCode = latestVersion.steamCode || latestVersion.garenaCode || latestVersion.mobileCode;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-6">
          <div className="space-y-4">
            <div className='flex justify-between items-start'>
                <h1 className="text-4xl font-bold font-headline text-primary">{build.name}</h1>
                 <Button variant="outline" size="icon" onClick={handleFavoriteToggle} aria-label={isFavorited ? t('removeFromFavorites') : t('addToFavorites')}>
                    <Star className={cn("w-5 h-5", isFavorited ? "text-accent fill-accent" : "text-muted-foreground")} />
                 </Button>
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
               <span>{new Date(build.createdAt).toLocaleDateString(locale)}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold font-headline">{t('description')}</h2>
                <Button variant="outline" size="sm" onClick={handleTranslate} disabled={isTranslating}>
                    {isTranslating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Languages className="mr-2 h-4 w-4" />}
                    {t('translateWithAI')}
                </Button>
            </div>
            <p className="text-muted-foreground whitespace-pre-wrap">{build.description}</p>
            {isTranslating && (
                <div className="p-4 bg-secondary/50 rounded-md">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            )}
            {translatedDescription && (
              <div className="p-4 border-l-4 border-accent bg-secondary/50 rounded-md">
                <p className="text-muted-foreground whitespace-pre-wrap">{translatedDescription}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold font-headline">{t('playstyleTags')}</h2>
            <div className="flex flex-wrap gap-2">
              {build.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-base px-3 py-1">{tag}</Badge>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
                <CardTitle className="text-lg font-headline flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <History className="w-5 h-5 text-primary"/>
                        {t('versionHistory')}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>{t('version')}</TableHead>
                            <TableHead>{t('releaseDate')}</TableHead>
                            <TableHead>{bT('steamCodeLabel')}</TableHead>
                            <TableHead>{bT('garenaCodeLabel')}</TableHead>
                            <TableHead>{bT('mobileCodeLabel')}</TableHead>
                            <TableHead>{t('patchNotes')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {build.versions.map((v) => (
                            <TableRow key={v.version}>
                                <TableCell>
                                    <Badge variant="outline" className="text-base font-bold border-2">{v.version}</Badge>
                                </TableCell>
                                <TableCell>{new Date(v.createdAt).toLocaleDateString(locale)}</TableCell>
                                <TableCell>{renderImportCode(v.steamCode, 'Steam')}</TableCell>
                                <TableCell>{renderImportCode(v.garenaCode, 'Garena')}</TableCell>
                                <TableCell>{renderImportCode(v.mobileCode, 'Mobile')}</TableCell>
                                <TableCell className="text-muted-foreground min-w-[200px]">{v.patchNotes}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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

        <aside className="md:col-span-2 space-y-6 sticky top-24 h-min">
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
                 <Badge variant={latestVersion.isValid ? 'default' : 'destructive'} className={`text-lg px-4 py-2 ${latestVersion.isValid ? 'bg-green-600/20 text-green-400 border-green-600/30' : 'bg-red-600/20 text-red-400 border-red-600/30'}`}>
                    {latestVersion.isValid ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <XCircle className="w-4 h-4 mr-2" />}
                    {latestVersion.isValid ? t('valid') : t('invalid')}
                </Badge>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <Share2 className="w-5 h-5" />
                  {t('importCode')} (v{latestVersion.version})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 {latestVersion.steamCode && (
                    <div className='space-y-1'>
                        <Label>{bT('steamCodeLabel')}</Label>
                        {renderImportCode(latestVersion.steamCode, 'Steam')}
                    </div>
                 )}
                 {latestVersion.garenaCode && (
                    <div className='space-y-1'>
                        <Label>{bT('garenaCodeLabel')}</Label>
                        {renderImportCode(latestVersion.garenaCode, 'Garena')}
                    </div>
                 )}
                 {latestVersion.mobileCode && (
                    <div className='space-y-1'>
                        <Label>{bT('mobileCodeLabel')}</Label>
                        {renderImportCode(latestVersion.mobileCode, 'Mobile')}
                    </div>
                 )}
                 {!latestCode && (
                    <p className='text-sm text-muted-foreground text-center'>{t('noImportCode')}</p>
                 )}
              </CardContent>
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
                                <span className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString(locale)}</span>
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
