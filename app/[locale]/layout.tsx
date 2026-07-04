import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';
import { CmsProvider } from '@/context/CmsContext';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PharaohBackground from '@/components/PharaohBackground';

// Define static font variables (loaded via standard web imports in globals.css)
// to prevent build-time Google Fonts compiler fetches which are blocked by network sandbox.
const inter = { variable: 'font-inter' };
const ibmPlexArabic = { variable: 'font-ibm-plex-arabic' };

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600;700;800;900&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body 
        className={`min-h-screen text-[#F5F5F5] bg-[#050506] antialiased selection:bg-[#C5A880] selection:text-[#050506] ${
          isRtl ? 'font-ibm-plex-arabic' : 'font-inter'
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
        {/* Global Neoclassical Grain/Papyrus Overlay (No CSS parser side-effects, 100% offline compile) */}
        <PharaohBackground />
        <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.022] z-50 mix-blend-overlay">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </body>
    </html>
  );
}
