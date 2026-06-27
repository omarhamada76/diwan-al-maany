import type { Metadata } from 'next';
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import { CmsProvider } from '@/context/CmsContext';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-arabic',
  display: 'swap',
});

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(
  props: LocaleLayoutProps
): Promise<Metadata> {
  const { locale } = await props.params;
  const isRtl = locale === 'ar';
  
  return {
    title: isRtl 
      ? 'ديوان المعاني | ترجمة قانونية معتمدة وخدمات قانونية فاخرة'
      : 'Diwan Al Maany | Premium Legal Translation & Services',
    description: isRtl
      ? 'ترجمة قانونية معتمدة رفيعة المستوى لشركات المحاماة والصناديق السيادية والسفارات والجهات الحكومية بصياغة دقيقة وهيبة قانونية.'
      : 'Elite certified legal translation for premier law firms, sovereign funds, embassies, and corporate entities. Meticulous precision and official authority.',
    metadataBase: new URL('https://diwanalmaany.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
    openGraph: {
      title: isRtl 
        ? 'ديوان المعاني | ترجمة قانونية معتمدة'
        : 'Diwan Al Maany | Premium Legal Translation',
      description: isRtl
        ? 'الختم الذهبي للترجمة القانونية المعتمدة في الشرق الأوسط.'
        : 'The gold seal of certified legal translation in the Middle East.',
      url: `https://diwanalmaany.com/${locale}`,
      siteName: 'Diwan Al Maany',
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
  };
}

export default async function LocaleLayout(
  props: LocaleLayoutProps
) {
  const { children } = props;
  const { locale } = await props.params;
  
  // Validate that the incoming locale is supported
  if (!['en', 'ar'].includes(locale)) {
    notFound();
  }

  // Set request locale for next-intl server APIs
  setRequestLocale(locale);

  // Retrieve the translation messages
  const messages = await getMessages();
  const isRtl = locale === 'ar';

  return (
    <html 
      lang={locale} 
      dir={isRtl ? 'rtl' : 'ltr'} 
      className={`${inter.variable} ${ibmPlexArabic.variable} scroll-smooth`}
    >
      <body 
        className={`min-h-screen text-[#F5F5F5] bg-[#090909] antialiased selection:bg-[#D4AF37] selection:text-[#090909] ${
          isRtl ? ibmPlexArabic.className : inter.className
        }`}
      >
        <NextIntlClientProvider messages={messages}>
          <CmsProvider>
            <SmoothScroll>
              <CustomCursor />
              <Navbar locale={locale} />
              <main className="relative z-10 flex-grow">
                {children}
              </main>
              <Footer locale={locale} />
            </SmoothScroll>
          </CmsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
