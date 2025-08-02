import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'es', 'pt-BR'],
  defaultLocale: 'pt-BR'
});
 
export const config = {
  matcher: ['/', '/(en|es|pt-BR)/:path*']
};