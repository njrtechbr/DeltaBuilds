import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './navigation';
 
export default createMiddleware({
  defaultLocale: 'pt-BR',
  locales,
  localePrefix
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|es|pt-BR)/:path*']
};