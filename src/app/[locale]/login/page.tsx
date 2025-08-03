import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';

export default async function LoginPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Login');
  return (
    <div className="max-w-md mx-auto">
      <PageHeader title={t('title')} />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">{t('cardTitle')}</CardTitle>
          <CardDescription>
            {t('cardDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t('emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{t('passwordLabel')}</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  {t('forgotPassword')}
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {t('loginButton')}
            </Button>
            <Button variant="outline" className="w-full">
              {t('socialLoginButton')}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {t('noAccount')}{" "}
            <Link href="/signup" className="underline text-primary">
              {t('signUpLink')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
