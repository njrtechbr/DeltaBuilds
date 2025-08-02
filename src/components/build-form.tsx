"use client";

import { useState } from 'react';
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
import { getTagSuggestions } from '@/app/actions';
import { Wand2, X, Loader2 } from 'lucide-react';

const buildFormSchema = z.object({
  name: z.string().min(3, "Build name must be at least 3 characters."),
  shareCode: z.string().min(6, "Share code seems too short.").regex(/^[A-Z0-9-]+$/, "Share code should only contain uppercase letters, numbers, and hyphens."),
  baseWeapon: z.string().min(2, "Base weapon is required."),
  description: z.string().min(20, "Description must be at least 20 characters.").max(1000, "Description is too long."),
  tags: z.array(z.string()).min(1, "At least one playstyle tag is required."),
});

type BuildFormValues = z.infer<typeof buildFormSchema>;

export function BuildForm() {
  const { toast } = useToast();
  const [tagInput, setTagInput] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const form = useForm<BuildFormValues>({
    resolver: zodResolver(buildFormSchema),
    defaultValues: {
      name: '',
      shareCode: '',
      baseWeapon: '',
      description: '',
      tags: [],
    },
  });

  const { control, watch, setValue, getValues } = form;
  const currentTags = watch('tags');
  const descriptionValue = watch('description');

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
        title: "Description too short",
        description: "Please provide a more detailed description to get tag suggestions.",
      });
      setIsSuggesting(false);
      return;
    }
    
    try {
      const result = await getTagSuggestions({ description });
      if (result.tags) {
        setSuggestedTags(result.tags);
      } else {
         toast({ variant: "destructive", title: "Suggestion Failed", description: "Could not generate tags. Please try again." });
      }
    } catch (error) {
       toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
    }
    setIsSuggesting(false);
  };

  const onSubmit = (data: BuildFormValues) => {
    console.log(data);
    toast({
      title: "Build Submitted!",
      description: "Your build has been successfully submitted for review.",
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader><CardTitle className="font-headline">Build Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Build Name</FormLabel>
                  <FormControl><Input placeholder="e.g., CQB Dominator" {...field} /></FormControl>
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
                    <FormLabel>Base Weapon</FormLabel>
                    <FormControl><Input placeholder="e.g., M4A1" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="shareCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Share Code</FormLabel>
                    <FormControl><Input placeholder="A1B2C3-X4Y5Z6" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="font-headline">Playstyle</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the build's strengths, weaknesses, and ideal playstyle..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This will be used to generate tag suggestions.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="button" variant="outline" onClick={handleSuggestTags} disabled={isSuggesting || descriptionValue.length < 20}>
              {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Suggest Tags with AI
            </Button>
            
            {suggestedTags.length > 0 && (
                <div className="space-y-2 p-3 bg-secondary/50 rounded-md">
                    <p className="text-sm font-medium">AI Suggestions (click to add):</p>
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
                  <FormLabel>Playstyle Tags</FormLabel>
                  <FormControl>
                    <div className="p-2 border rounded-md min-h-[40px]">
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
                          placeholder={currentTags.length === 0 ? "Add tags and press Enter..." : ""}
                        />
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
          Submit Build
        </Button>
      </form>
    </Form>
  );
}
