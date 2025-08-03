import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix, pathnames } from './navigation';
 
export default createMiddleware({
  defaultLocale: 'pt-BR',
  locales,
  localePrefix,
  pathnames
});
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)', 
    '/([\\w-]+)?/builds/((?!api|next|static|favicon.ico).*)',
    '/([\\w-]+)?/admin/((?!api|next|static|favicon.ico).*)',
]
};
