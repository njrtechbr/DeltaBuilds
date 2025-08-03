"use client";

import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getTagSuggestions, parseCode } from '@/app/actions';
import { Wand2, X, Loader2, BrainCircuit, Upload, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useDebounce } from 'use-debounce';
import { allBaseWeapons } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const buildFormSchema = z.object({
  name: z.string().min(3, "Build name must be at least 3 characters."),
  shareCode: z.string().min(10, "Share code seems too short."),
  baseWeapon: z.string().min(2, "Base weapon is required."),
  version: z.string().min(1, "Version is required."),
  description: z.string().min(20, "Description must be at least 20 characters.").max(1000, "Description is too long."),
  patchNotes: z.string().max(1000, "Patch notes are too long.").optional(),
  youtubeUrl: z.string().url("Please enter a valid YouTube URL.").optional().or(z.literal('')),
  tags: z.array(z.string()).min(1, "At least one playstyle tag is required."),
});

type BuildFormValues = z.infer<typeof buildFormSchema>;

export function BuildForm() {
  const t = useTranslations('BuildForm');
  const { toast } = useToast();
  const [tagInput, setTagInput] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  const form = useForm<BuildFormValues>({
    resolver: zodResolver(buildFormSchema),
    defaultValues: {
      name: '',
      shareCode: '',
      baseWeapon: '',
      version: '1.0',
      description: '',
      patchNotes: '',
      youtubeUrl: '',
      tags: [],
    },
  });

  const { control, watch, setValue, getValues } = form;
  const currentTags = watch('tags');
  const descriptionValue = watch('description');
  const shareCodeValue = watch('shareCode');
  const [debouncedShareCode] = useDebounce(shareCodeValue, 1000);

  const handleParseCode = useCallback(async (code: string) => {
    if (code.length < 10) return;
    setIsParsing(true);
    try {
      const result = await parseCode({ shareCode: code });
      if (result.error) {
        // Don't toast here, it's too aggressive
      } else if(result.baseWeapon && result.tags) {
        setValue('baseWeapon', result.baseWeapon, { shouldValidate: true });
        const existingTags = getValues('tags');
        const newTags = Array.from(new Set([...existingTags, ...result.tags]));
        setValue('tags', newTags, { shouldValidate: true });
      }
    } catch (e) {
      // silent fail
    } finally {
      setIsParsing(false);
    }
  }, [setValue, getValues]);
  
  useEffect(() => {
    if (debouncedShareCode) {
      handleParseCode(debouncedShareCode);
    }
  }, [debouncedShareCode, handleParseCode]);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!currentTags.includes(newTag)) {
        setValue('tags', [...currentTags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };
  
  const addSuggestedTag = (tag: string) => {
    if (!currentTags.includes(tag)) {
        setValue('tags', [...currentTags, tag]);
    }
    setSuggestedTags(prev => prev.filter(t => t !== tag));
  }

  const handleSuggestTags = async () => {
    setIsSuggesting(true);
    const description = getValues('description');
    if(description.length < 20) {
      toast({
        variant: "destructive",
        title: t('toast.descriptionTooShortTitle'),
        description: t('toast.descriptionTooShortDescription'),
      });
      setIsSuggesting(false);
      return;
    }
    
    try {
      const result = await getTagSuggestions({ description });
      if (result.tags) {
        setSuggestedTags(result.tags);
      } else {
         toast({ variant: "destructive", title: t('toast.suggestionFailedTitle'), description: t('toast.suggestionFailedDescription') });
      }
    } catch (error) {
       toast({ variant: "destructive", title: t('toast.errorTitle'), description: t('toast.errorDescription') });
    }
    setIsSuggesting(false);
  };

  const onSubmit = (data: BuildFormValues) => {
    console.log(data);
    toast({
      title: t('toast.buildSubmittedTitle'),
      description: t('toast.buildSubmittedDescription'),
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader><CardTitle className="font-headline">{t('buildDetailsTitle')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
             <FormField
              control={control}
              name="shareCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('shareCodeLabel')}</FormLabel>
                   <FormControl>
                    <div className="relative">
                      <Input placeholder={t('shareCodePlaceholder')} {...field} />
                       <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                        {isParsing ? <Loader2 className="h-4 w-4 animate-spin" /> : <BrainCircuit className="h-4 w-4" />}
                       </div>
                    </div>
                  </FormControl>
                  <FormDescription>{t('shareCodeHint')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('buildNameLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('buildNamePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                  control={control}
                  name="baseWeapon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('baseWeaponLabel')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                           <div className="relative">
                            <SelectTrigger>
                                <SelectValue placeholder={t('baseWeaponPlaceholder')} />
                            </SelectTrigger>
                            {isParsing && (
                                <div className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                            )}
                           </div>
                        </FormControl>
                        <SelectContent>
                          {allBaseWeapons.map(weapon => (
                            <SelectItem key={weapon} value={weapon}>{weapon}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('versionLabel')}</FormLabel>
                    <FormControl><Input placeholder="e.g., 1.0" {...field} disabled /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle className="font-headline">{t('mediaTitle')}</CardTitle></CardHeader>
           <CardContent className="space-y-4">
                <FormField
                    control={control}
                    name="youtubeUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className='flex items-center gap-2'><Youtube className='w-5 h-5'/> {t('youtubeUrlLabel')}</FormLabel>
                        <FormControl>
                            <Input placeholder={t('youtubeUrlPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <div>
                    <FormLabel className='flex items-center gap-2'><Upload className='w-5 h-5'/> {t('galleryImagesLabel')}</FormLabel>
                    <FormControl>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                            <div className="text-center">
                                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                                <p className="pl-1">{t('galleryImagesPlaceholder')}</p>
                                </div>
                                <p className="text-xs leading-5 text-muted-foreground">{t('galleryImagesHint')}</p>
                            </div>
                        </div>
                    </FormControl>
                 </div>
           </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-headline">{t('descriptionAndPlaystyleTitle')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
             <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('descriptionLabel')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('descriptionPlaceholder')}
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t('descriptionHint')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="patchNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('patchNotesLabel')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('patchNotesPlaceholder')}
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                   <FormDescription>{t('patchNotesHint')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-headline">{t('playstyleTagsTitle')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
             <div>
                <Button type="button" variant="outline" onClick={handleSuggestTags} disabled={isSuggesting || descriptionValue.length < 20}>
                  {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  {t('suggestTagsButton')}
                </Button>
             </div>
            
            {suggestedTags.length > 0 && (
                <div className="space-y-2 p-3 bg-secondary/50 rounded-md">
                    <p className="text-sm font-medium">{t('aiSuggestions')}</p>
                    <div className="flex flex-wrap gap-2">
                        {suggestedTags.map(tag => (
                            <Badge key={tag} variant="outline" className="cursor-pointer bg-accent/20 border-accent/50 hover:bg-accent/40" onClick={() => addSuggestedTag(tag)}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
            
            <FormField
              control={control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>{t('playstyleTagsLabel')}</FormLabel>
                  <FormControl>
                  <div className="relative">
                    <div className="p-2 border rounded-md min-h-[40px] pr-8">
                      <div className="flex flex-wrap gap-2">
                        {currentTags.map(tag => (
                          <Badge key={tag} variant="default">
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} className="ml-2 rounded-full hover:bg-primary-foreground/20">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleTagKeyDown}
                          className="bg-transparent outline-none flex-1 text-sm"
                          placeholder={currentTags.length === 0 ? t('tagsPlaceholder') : ""}
                        />
                      </div>
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                        {isParsing && <Loader2 className="h-4 w-4 animate-spin" />}
                    </div>
                  </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {t('submitButton')}
        </Button>
      </form>
    </Form>
  );
}
