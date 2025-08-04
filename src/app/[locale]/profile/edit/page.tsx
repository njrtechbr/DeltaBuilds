
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { users } from "@/lib/data";
import PageLayout from "../../page-layout";
import { PageHeader } from "@/components/page-header";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Twitch, Twitter, Youtube, Link as LinkIcon } from "lucide-react";
import { useRouter } from "@/navigation";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string().max(160, { message: "Bio must not be longer than 160 characters." }).optional(),
  socials: z.object({
      youtube: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
      twitch: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
      instagram: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
      facebook: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
      x: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
      discord: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
      steam: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
      tiktok: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function EditProfilePage() {
  const t = useTranslations('Profile');
  const router = useRouter();
  const { toast } = useToast();

  // Faking current user
  const currentUser = users[0];

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: currentUser.name || "",
      bio: currentUser.bio || "",
      socials: {
        youtube: currentUser.socials?.youtube || "",
        twitch: currentUser.socials?.twitch || "",
        instagram: currentUser.socials?.instagram || "",
        facebook: currentUser.socials?.facebook || "",
        x: currentUser.socials?.x || "",
        discord: currentUser.socials?.discord || "",
        steam: currentUser.socials?.steam || "",
        tiktok: currentUser.socials?.tiktok || "",
      }
    },
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: t('toast.profileUpdatedTitle'),
      description: t('toast.profileUpdatedDescription'),
    });
    // In a real app, you'd send this data to your server.
    console.log(data);
    router.push(`/profile/${data.name}`);
  }

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        <PageHeader title={t('editProfile')} description={t('editProfileDescription')} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{t('publicProfile')}</CardTitle>
                    <CardDescription>{t('publicProfileDescription')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t('usernameLabel')}</FormLabel>
                        <FormControl>
                            <Input placeholder={t('usernamePlaceholder')} {...field} />
                        </FormControl>
                        <FormDescription>
                            {t('usernameDescription')}
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t('bioLabel')}</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder={t('bioPlaceholder')}
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormDescription>
                           {t('bioDescription')}
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t('socialsTitle')}</CardTitle>
                    <CardDescription>{t('socialsDescription')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <FormField
                      control={form.control}
                      name="socials.youtube"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><Youtube /> {t('socials.youtube')}</FormLabel>
                          <FormControl>
                            <Input placeholder="https://youtube.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="socials.twitch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><Twitch /> {t('socials.twitch')}</FormLabel>
                          <FormControl>
                            <Input placeholder="https://twitch.tv/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="socials.x"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><Twitter /> {t('socials.x')}</FormLabel>
                          <FormControl>
                            <Input placeholder="https://x.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="socials.instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><Instagram /> {t('socials.instagram')}</FormLabel>
                          <FormControl>
                            <Input placeholder="https://instagram.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="socials.facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><Facebook /> {t('socials.facebook')}</FormLabel>
                          <FormControl>
                            <Input placeholder="https://facebook.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="socials.discord"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><LinkIcon /> {t('socials.discord')}</FormLabel>
                          <FormControl>
                            <Input placeholder="https://discord.gg/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="socials.steam"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><LinkIcon /> {t('socials.steam')}</FormLabel>
                          <FormControl>
                            <Input placeholder="https://steamcommunity.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="socials.tiktok"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2"><LinkIcon /> {t('socials.tiktok')}</FormLabel>
                          <FormControl>
                            <Input placeholder="https://tiktok.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </CardContent>
            </Card>
            
            <Button type="submit">{t('updateProfile')}</Button>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}
