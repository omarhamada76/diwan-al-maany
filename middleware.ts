import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
  
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Automatically redirect prefixless paths to their localized counterparts
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match root path
    '/',
    // Match all pathnames starting with a locale prefix
    '/(ar|en)/:path*',
    // Match nested routes, excluding static assets
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
