import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'es', 'pt-BR'] as const;
export const localePrefix = 'always'; // Default

export const pathnames = {
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
  '/profile/edit': {
    en: '/profile/edit',
    es: '/perfil/editar',
    'pt-BR': '/perfil/editar'
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
  '/admin/dashboard': {
    en: '/admin/dashboard',
    es: '/admin/dashboard',
    'pt-BR': '/admin/dashboard'
  },
  '/admin/builds': {
    en: '/admin/builds',
    es: '/admin/builds',
    'pt-BR': '/admin/builds'
  },
  '/admin/reports': {
    en: '/admin/reports',
    es: '/admin/reports',
    'pt-BR': '/admin/reports'
  },
  '/admin/users': {
    en: '/admin/users',
    es: '/admin/usuarios',
    'pt-BR': '/admin/usuarios'
  }
};
 
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, localePrefix, pathnames});
