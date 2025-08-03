import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'es', 'pt-BR'] as const;
export const localePrefix = 'always'; // Default

const pathnames = {
  '/my-builds': {
    en: '/my-builds',
    es: '/mis-builds',
    'pt-BR': '/minhas-builds'
  },
  '/my-favorites': {
    en: '/my-favorites',
    es: '/mis-favoritos',
    'pt-BR': '/meus-favoritos'
  },
  '/submit': {
    en: '/submit',
    es: '/enviar',
    'pt-BR': '/enviar'
  },
   '/login': {
    en: '/login',
    es: '/iniciar-sesion',
    'pt-BR': '/entrar'
  },
  '/signup': {
    en: '/signup',
    es: '/registrarse',
    'pt-BR': '/cadastrar'
  },
  '/profile/[username]': {
    en: '/profile/[username]',
    es: '/perfil/[username]',
    'pt-BR': '/perfil/[username]'
  },
  '/builds/[id]': {
    en: '/builds/[id]',
    es: '/builds/[id]',
    'pt-BR': '/builds/[id]'
  },
};
 
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, localePrefix, pathnames});
