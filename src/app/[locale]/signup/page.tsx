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

export default async function SignupPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('SignUp');
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
              <Label htmlFor="username">{t('usernameLabel')}</Label>
              <Input id="username" placeholder="DeltaOperator" required />
            </div>
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
              <Label htmlFor="password">{t('passwordLabel')}</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {t('createAccountButton')}
            </Button>
            <Button variant="outline" className="w-full">
              {t('socialSignUpButton')}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {t('hasAccount')}{" "}
            <Link href="/login" className="underline text-primary">
              {t('loginLink')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
