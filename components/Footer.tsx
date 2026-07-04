'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Shield, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('Common');
  const tContact = useTranslations('Contact.info');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'LinkedIn', href: '#' },
    { name: 'Twitter / X', href: '#' },
    { name: 'Instagram', href: '#' },
  ];

  return (
    <footer className="bg-[#050506] border-t border-[#7A6B55]/15 text-[#9A9590] relative overflow-hidden z-10">
      
      {/* Background static papyrus grain */}
      <div className="absolute inset-0 bg-grain opacity-[0.02] mix-blend-overlay pointer-events-none z-0" />
      
      {/* Visual Accent Light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-gradient-to-t from-[#7A6B55]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Main Grid */}
      <div className="max-w-[1440px] mx-auto px-8 pt-16 pb-12 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          
          {/* Identity Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 border border-[#C5A880] rounded-full flex items-center justify-center bg-[#050506] shadow-[0_0_10px_rgba(197,168,128,0.15)]">
                <Shield className="w-4 h-4 text-[#C5A880]" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-serif font-bold tracking-widest text-[#E8E4DC]">
                  {locale === 'ar' ? 'ديوان المعاني' : 'DIWAN AL MAANY'}
                </span>
                <span className="text-[8px] font-sans tracking-[0.2em] text-[#C5A880] uppercase font-semibold">
                  {t('tagline')}
                </span>
              </div>
            </Link>
            <p className="text-xs leading-relaxed max-w-sm">
              {locale === 'ar'
                ? 'ديوان المعاني هي المؤسسة الرائدة في تقديم خدمات الترجمة القانونية المحلفة وخدمات الصياغة اللغوية رفيعة المستوى لتمثيل قضاياكم بأعلى ولاية قانونية.'
                : 'Diwan Al Maany is the premier institution providing sworn legal translations and high-end linguistic drafting to represent your interests across jurisdictions.'}
            </p>
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="text-xs text-[#9A9590] hover:text-[#C5A880] flex items-center gap-1 transition-colors duration-300"
                >
                  {s.name}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Locations & Branches */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-sans font-semibold text-[#E8E4DC] uppercase tracking-wider border-b border-[#7A6B55]/15 pb-2">
                {tContact('addressTitle')}
              </span>
              <div className="flex gap-2.5 text-xs">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
                <p className="leading-relaxed text-[#9A9590]">
                  {tContact('address')}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-sans font-semibold text-[#E8E4DC] uppercase tracking-wider border-b border-[#7A6B55]/15 pb-2">
                {tContact('branchTitle')}
              </span>
              <div className="flex gap-2.5 text-xs">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
                <p className="leading-relaxed text-[#9A9590]">
                  {tContact('branch')}
                </p>
              </div>
            </div>
          </div>

          {/* Contacts & Support */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="text-xs font-sans font-semibold text-[#E8E4DC] uppercase tracking-wider border-b border-[#7A6B55]/15 pb-2">
              {locale === 'ar' ? 'تفاصيل الاتصال' : 'Communication'}
            </span>
            <div className="flex flex-col gap-3 text-xs">
              <a
                href={`tel:${tContact('phone')}`}
                className="flex items-center gap-2 text-[#9A9590] hover:text-[#C5A880] transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span dir="ltr">{tContact('phone')}</span>
              </a>
              <a
                href={`mailto:${tContact('email')}`}
                className="flex items-center gap-2 text-[#9A9590] hover:text-[#C5A880] transition-colors duration-300"
              >
                <Mail className="w-4 h-4 text-[#C5A880]" />
                <span>{tContact('email')}</span>
              </a>
              <div className="flex gap-2 text-[#9A9590]">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                <p className="whitespace-pre-line leading-relaxed">
                  {tContact('hours')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Banner */}
        <div className="border-t border-[#7A6B55]/15 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px]">
          <p>© {currentYear} {locale === 'ar' ? 'ديوان المعاني' : 'Diwan Al Maany'}. {t('allRightsReserved')}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#C5A880] transition-colors duration-300">
              {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link href="/terms" className="hover:text-[#C5A880] transition-colors duration-300">
              {locale === 'ar' ? 'شروط الخدمة' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
