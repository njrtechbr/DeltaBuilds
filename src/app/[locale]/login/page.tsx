'use client';

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
import { Link, useRouter } from "@/navigation"
import { useTranslations } from 'next-intl';
import PageLayout from "../page-layout"
import { useAuth } from "@/context/auth-provider"
import { useEffect } from "react"

export default function LoginPage() {
  const t = useTranslations('Login');
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission and call Supabase auth.
    // For now, we just call the mock login function.
    login();
  }

  return (
    <PageLayout>
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
            <form onSubmit={handleLogin}>
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
                <Button variant="outline" className="w-full" type="button">
                  {t('socialLoginButton')}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              {t('noAccount')}{" "}
              <Link href="/signup" className="underline text-primary">
                {t('signUpLink')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
