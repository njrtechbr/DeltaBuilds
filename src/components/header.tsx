import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { PlusCircle, User, LogOut, Star, Swords, Heart } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const t = useTranslations('Header');
  const isAuthenticated = true; 
  const username = "Ghost";

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
          {isAuthenticated && (
            <>
              <Link
                href="/submit"
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {t('submitBuild')}
              </Link>
              <Link
                href={`/profile/${username}`}
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {t('myBuilds')}
              </Link>
              <Link
                href={`/profile/${username}#favorites`}
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {t('myFavorites')}
              </Link>
            </>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-4">
           {isAuthenticated && (
             <Button asChild className="hidden sm:inline-flex">
                <Link href="/submit">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {t('newBuild')}
                </Link>
              </Button>
            )}
            
            {isAuthenticated ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                       <AvatarImage src="https://placehold.co/100x100" alt={`@${username}`} />
                       <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{username}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {/* m@example.com */}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                     <Link href={`/profile/${username}`}>
                      <User className="mr-2 h-4 w-4" />
                      <span>{t('profile')}</span>
                     </Link>
                  </DropdownMenuItem>
                   <DropdownMenuItem asChild>
                     <Link href={`/profile/${username}#favorites`}>
                      <Star className="mr-2 h-4 w-4" />
                      <span>{t('myFavorites')}</span>
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('signOut')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild>
                        <Link href="/login">{t('logIn')}</Link>
                    </Button>
                    <Button variant="outline" className="text-accent-foreground border-accent hover:bg-accent/90 hover:text-accent-foreground" asChild>
                        <Link href="/signup">{t('signUpLink')}</Link>
                    </Button>
                </div>
            )}
            <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
