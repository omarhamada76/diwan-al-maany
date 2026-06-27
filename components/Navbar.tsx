'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/lib/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Shield } from 'lucide-react';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('Common');
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const navLinks = [
    { href: '/#about', labelKey: 'About.title', translationKey: 'About' },
    { href: '/#services', labelKey: 'Services.title', translationKey: 'Services' },
    { href: '/#process', labelKey: 'WorkProcess.title', translationKey: 'WorkProcess' },
    { href: '/#tech', labelKey: 'AiTech.title', translationKey: 'AiTech' },
    { href: '/#contact', labelKey: 'Contact.title', translationKey: 'Contact' },
  ];

  // Helper translations for section headers (fall back if not fully defined in Common)
  const menuTranslations = useTranslations();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#090909]/80 backdrop-blur-md border-b border-[#D4AF37]/20 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 border border-[#D4AF37] rounded-full overflow-hidden bg-[#111111] transition-transform duration-500 group-hover:rotate-[360deg]">
            <Shield className="w-5 h-5 text-[#D4AF37]" />
            <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-widest text-[#F5F5F5] group-hover:text-[#D4AF37] transition-colors duration-300">
              {locale === 'ar' ? 'ديوان المعاني' : 'DIWAN AL MAANY'}
            </span>
            <span className="text-[9px] tracking-[0.2em] text-[#9E9E9E] uppercase">
              {t('tagline')}
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-[#9E9E9E] hover:text-[#D4AF37] transition-all duration-300 relative py-1 group"
            >
              {menuTranslations(link.labelKey)}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* CTA & LANG SELECTOR */}
        <div className="hidden md:flex items-center gap-6">
          {/* Lang toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9E9E9E] hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span>{locale === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Admin link */}
          <Link
            href="/admin"
            className="text-xs text-[#9E9E9E] hover:text-[#D4AF37] transition-colors"
          >
            {t('admin')}
          </Link>

          {/* Golden CTA */}
          <Link
            href="/#contact"
            className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E6C567] text-[#090909] text-xs font-semibold tracking-wider uppercase rounded-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {t('requestQuote')}
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleLanguage}
            className="text-[#9E9E9E] hover:text-[#D4AF37] transition-colors p-1"
          >
            <Globe className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#F5F5F5] hover:text-[#D4AF37] transition-colors p-1"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#111111] border-b border-[#D4AF37]/20 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold tracking-wide text-[#F5F5F5] hover:text-[#D4AF37] transition-colors"
                >
                  {menuTranslations(link.labelKey)}
                </Link>
              ))}

              <div className="h-[1px] bg-[#9E9E9E]/20 my-2" />

              <div className="flex flex-col gap-4">
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-[#9E9E9E] hover:text-[#D4AF37]"
                >
                  {t('admin')}
                </Link>
                
                <Link
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 bg-gradient-to-r from-[#D4AF37] to-[#E6C567] text-[#090909] text-sm font-semibold rounded-sm tracking-wide"
                >
                  {t('requestQuote')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
