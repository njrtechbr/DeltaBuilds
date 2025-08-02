import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const t = useTranslations('Header');
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="ml-10 hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            {t('discover')}
          </Link>
          <Link
            href="/submit"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            {t('submitBuild')}
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
           <Button asChild className="hidden sm:inline-flex">
              <Link href="/submit">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('newBuild')}
              </Link>
            </Button>
            <div className="flex items-center gap-2">
                 <Button variant="ghost" asChild>
                    <Link href="/login">{t('logIn')}</Link>
                </Button>
                <Button variant="outline" className="text-accent-foreground border-accent hover:bg-accent/90 hover:text-accent-foreground" asChild>
                    <Link href="/signup">{t('signUp')}</Link>
                </Button>
            </div>
            <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
