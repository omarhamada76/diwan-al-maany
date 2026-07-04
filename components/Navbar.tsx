'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/lib/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import gsap from 'gsap';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('Common');
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const borderLineRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for glass background activation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for the Vault Opened loading screen completion event to play intro animation
  useEffect(() => {
    const playIntro = () => {
      const tl = gsap.timeline();

      // Ensure elements start hidden/contracted
      gsap.set(borderLineRef.current, { scaleX: 0, transformOrigin: 'center' });
      gsap.set('.nav-anim-item', { opacity: 0, y: -10 });

      // Border bottom draws center-out
      tl.to(borderLineRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        delay: 0.2,
      });

      // Nav items stagger fade-in and slide down
      tl.to(
        '.nav-anim-item',
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power2.out',
        },
        '-=0.8'
      );
    };

    // If loaded immediately, play, otherwise wait for event
    window.addEventListener('vault-opened', playIntro);
    
    // In case the loader is already bypassed
    if (document.body.style.overflow !== 'hidden') {
      playIntro();
    }

    return () => window.removeEventListener('vault-opened', playIntro);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  const leftLinks = [
    { href: '/#services', labelKey: 'Services.title' },
    { href: '/#about', labelKey: 'About.title' },
  ];

  const rightLinks = [
    { href: '/#process', labelKey: 'WorkProcess.title' },
    { href: '/#contact', labelKey: 'Contact.title' },
  ];

  const menuTranslations = useTranslations();

  return (
    <header
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-[#050506]/94 backdrop-blur-xl py-4 shadow-[0_4px_40px_rgba(0,0,0,0.8),0_0_0_0_rgba(197,168,128,0),inset_0_-1px_0_rgba(197,168,128,0.08)]'
          : 'bg-transparent py-6'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Symmetrical Split Layout Grid */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-[80px] flex items-center justify-between relative">
        
        {/* DESKTOP LEFT LINKS + LANGUAGE SWITCHER */}
        <div className="hidden lg:flex items-center gap-8 flex-1 nav-anim-item">
          {/* Rosetta Language switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9A9590] hover:text-[#C5A880] transition-colors duration-300 cursor-pointer mr-4"
          >
            <Globe className="w-4 h-4" />
            <span>{locale === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {leftLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest text-[#9A9590] hover:text-[#E8E4DC] transition-all duration-300 relative py-1 group"
            >
              {menuTranslations(link.labelKey)}
              <span className="absolute bottom-0 left-1/2 w-0 h-[0.5px] bg-[#C5A880] group-hover:w-full group-hover:left-0 transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CENTER DOCK TARGET (Empty gold guidelines for WebGL Seal docking) */}
        <div className="flex items-center justify-center z-50 nav-anim-item px-4">
          <Link href="/#top" id="navbar-dock-target" className="w-12 h-12 flex items-center justify-center relative group" aria-label="Return to top">
            {/* Ambient rest ring visual target */}
            <div className="absolute inset-0 rounded-full border border-[#C5A880]/15 scale-95 transition-all duration-500 group-hover:scale-105 group-hover:border-[#C5A880]/40" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#C5A880]/30 group-hover:bg-[#C5A880] transition-colors duration-300" />
          </Link>
        </div>

        {/* DESKTOP RIGHT LINKS + CTA BUTTON */}
        <div className="hidden lg:flex items-center justify-end gap-8 flex-1 nav-anim-item">
          {rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-widest text-[#9A9590] hover:text-[#E8E4DC] transition-all duration-300 relative py-1 group"
            >
              {menuTranslations(link.labelKey)}
              <span className="absolute bottom-0 left-1/2 w-0 h-[0.5px] bg-[#C5A880] group-hover:w-full group-hover:left-0 transition-all duration-300" />
            </Link>
          ))}

          {/* Golden CTA Button */}
          <Link
            href="/#contact"
            className="px-6 py-2.5 border border-[#C5A880]/70 text-[#C5A880] hover:bg-[#C5A880]/5 text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300 hover:shadow-[0_4px_24px_rgba(197,168,128,0.1)] hover:-translate-y-0.5 cursor-pointer ml-4"
          >
            {t('requestQuote')}
          </Link>
        </div>

        {/* MOBILE NAVIGATION TRIGGERS */}
        <div className="flex items-center justify-between w-full lg:hidden z-50">
          {/* Hamburger (Left) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#E8E4DC] hover:text-[#C5A880] transition-colors p-2"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Language Switcher (Right) */}
          <button
            onClick={toggleLanguage}
            className="text-[#9A9590] hover:text-[#C5A880] transition-colors p-2"
            aria-label="Toggle language"
          >
            <Globe className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* GSAP Bottom Filament Divider Line — upgraded to gradient glow */}
      <div 
        ref={borderLineRef}
        className="absolute bottom-0 left-0 right-0 h-[1px] scale-x-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(197,168,128,0.04) 20%, rgba(197,168,128,0.2) 50%, rgba(197,168,128,0.04) 80%, transparent 100%)',
          boxShadow: scrolled ? '0 0 12px rgba(197,168,128,0.08)' : 'none',
        }}
      />

      {/* MOBILE DRAWER (Full-screen Overlay Menu) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#050506]/98 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-8 text-center">
              {[...leftLinks, ...rightLinks].map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-3xl text-[#E8E4DC] hover:text-[#C5A880] transition-colors py-2 block"
                  >
                    {menuTranslations(link.labelKey)}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="h-[1px] bg-[#7A6B55]/15 my-4"
              />

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col gap-6 items-center"
              >
                {/* Admin Access link */}
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold tracking-widest uppercase text-[#9A9590] hover:text-[#C5A880]"
                >
                  {t('admin')}
                </Link>

                {/* Primary Mobile CTA */}
                <Link
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full max-w-[280px] py-4 border border-[#C5A880] text-[#C5A880] text-xs font-semibold uppercase tracking-widest rounded-full"
                >
                  {t('requestQuote')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
