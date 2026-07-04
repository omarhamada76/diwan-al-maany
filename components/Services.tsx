'use client';

import { useTranslations } from 'next-intl';
import { useCMS } from '@/context/CmsContext';
import { motion } from 'framer-motion';
import { Shield, Scale, Briefcase, FileCheck, FileText, Bookmark, ArrowUpRight } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';

const LegalBook3D = dynamic(() => import('./LegalBook3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="w-[140px] h-[180px] border border-[#C5A880]/20 bg-[#0F0F11] rounded-[4px] shadow-2xl flex items-center justify-center animate-pulse">
        <div className="w-12 h-12 rounded-full border border-[#C5A880]/30 flex items-center justify-center bg-[#050506]">
          <span className="text-[10px] font-mono text-[#C5A880]">3D</span>
        </div>
      </div>
    </div>
  )
});

interface ServicesProps {
  locale: string;
}

// Simple dynamic number counter on viewport entry
function StatisticCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const triggerRef = useRef<boolean>(false);

  return (
    <motion.span
      whileInView={{
        opacity: 1,
        transition: { duration: 0.1 }
      }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        if (triggerRef.current) return;
        triggerRef.current = true;
        let start = 0;
        const increment = Math.ceil(target / (duration / 16)); // ~60fps target
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            start = target;
            clearInterval(timer);
          }
          setCount(start);
        }, 16);
      }}
    >
      {count}
    </motion.span>
  );
}

// 3D card tilt hook
function use3DTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) scale3d(1.02,1.02,1.02)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}

export default function Services({ locale }: ServicesProps) {
  const t = useTranslations('Services');
  const { services } = useCMS();
  
  // Custom Pharaonic Glyphs for Keystone card corners
  const renderCornerGlyphs = () => (
    <div className="absolute inset-0 pointer-events-none opacity-25">
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C5A880]" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#C5A880]" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#C5A880]" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#C5A880]" />
    </div>
  );

  // Classic vector icons maps
  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'certified-translation':
        return <Shield className="w-6 h-6 text-[#C5A880]" />;
      case 'court-support':
        return <Scale className="w-6 h-6 text-[#C5A880]" />;
      case 'corporate-services':
        return <Briefcase className="w-6 h-6 text-[#C5A880]" />;
      case 'contract-translation':
        return <FileCheck className="w-6 h-6 text-[#C5A880]" />;
      case 'document-review':
        return <FileText className="w-6 h-6 text-[#C5A880]" />;
      default:
        return <Bookmark className="w-6 h-6 text-[#C5A880]" />;
    }
  };

  // Find dynamic services from CMS to isolate them for Bento card allocation
  const keystoneService = services.find(s => s.slug === 'certified-translation') || services[0];
  const remainingServices = services.filter(s => s.id !== keystoneService?.id);

  // Active locale strings helper
  const getLocaleContent = (service: typeof keystoneService) => {
    if (!service) return { title: '', desc: '' };
    return {
      title: locale === 'ar' ? service.titleAr : service.titleEn,
      desc: locale === 'ar' ? service.descAr : service.descEn
    };
  };

  const keystoneContent = getLocaleContent(keystoneService);
  const keystoneTiltRef = use3DTilt(6);

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-[#09090A] relative z-10 overflow-hidden">
      
      {/* ── UPGRADE: Glow divider at top ── */}
      <div className="section-divider-glow absolute top-0 left-0 right-0" />

      {/* ── UPGRADE: Ambient orbs ── */}
      <div
        className="ambient-orb w-[600px] h-[600px] z-0"
        style={{ background: '#26619C', top: '10%', left: '-12%', animationDelay: '-3s' }}
      />
      <div
        className="ambient-orb-reverse w-[400px] h-[400px] z-0"
        style={{ background: '#7C3AED', bottom: '5%', right: '-8%', animationDelay: '-12s' }}
      />
      <div
        className="ambient-orb-sm w-[300px] h-[300px] z-0"
        style={{ background: '#C5A880', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animationDelay: '-6s' }}
      />

      {/* Background static texture & ambient light glows */}
      <div className="absolute inset-0 bg-grain opacity-[0.02] mix-blend-overlay pointer-events-none z-0" />

      <div className="max-w-[1440px] mx-auto z-10 relative">
        
        {/* Editorial Title */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-sans font-semibold tracking-[0.25em] text-[#C5A880] uppercase mb-4"
          >
            {t('title')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-egyptian-heading text-3xl md:text-4xl text-[#E8E4DC] tracking-tight leading-tight max-w-xl"
          >
            {t('subtitle')}
          </motion.h2>
        </div>

        {/* 12-Column Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          
          {/* Row 1: Keystone Portal Card (8 cols) — 3D tilt */}
          {keystoneService && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-8"
            >
              <div
                ref={keystoneTiltRef}
                className="border-egyptian bg-[#0F0F11] border border-[#7A6B55]/15 p-8 rounded-[16px] flex flex-col md:flex-row justify-between gap-8 min-h-[480px] shadow-lg relative hover:border-[#C5A880]/40 hover:bg-[#141416] transition-colors duration-300 overflow-hidden"
              >
                {renderCornerGlyphs()}
                {/* Keystone inner radial bloom on hover */}
                <div className="absolute inset-0 rounded-[16px] pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(197,168,128,0.06) 0%, transparent 60%)' }}
                />
                
                <div className="flex-grow flex flex-col justify-between max-w-md">
                  <div>
                    <div className="mb-8 w-12 h-12 rounded-full border border-[#7A6B55]/30 flex items-center justify-center bg-[#050506]">
                      {getServiceIcon(keystoneService.slug)}
                    </div>
                    
                    <span className="text-[11px] font-sans font-semibold tracking-[0.15em] text-shimmer uppercase mb-2 block">
                      Sovereign Priority
                    </span>
                    <h3 className="text-xl md:text-2xl text-egyptian-heading font-bold text-[#E8E4DC] mb-4">
                      {keystoneContent.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm leading-relaxed text-[#9A9590]">
                      {keystoneContent.desc}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-[#7A6B55]/15 pt-4">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9A9590]">
                      {t('cta')}
                    </span>
                    <Link href="/#contact" className="text-[#9A9590] hover:text-[#C5A880] transition-colors duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* WebGL 3D Codex Canvas portal */}
                <div className="w-full md:w-[320px] h-[300px] md:h-full flex items-center justify-center relative">
                  <div className="w-full h-full max-w-[280px] md:max-w-none">
                    <LegalBook3D />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Row 1: Companion Statistics Card (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 bg-[#0F0F11] border border-[#7A6B55]/15 p-8 rounded-[16px] flex flex-col justify-between min-h-[480px] shadow-lg hover:border-[#C5A880]/40 hover:bg-[#141416] transition-all duration-300 relative overflow-hidden"
          >
            {/* Inner bloom on hover */}
            <div className="absolute inset-0 rounded-[16px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(197,168,128,0.05) 0%, transparent 60%)' }}
            />
            <div>
              <span className="text-[11px] font-sans font-semibold tracking-[0.15em] text-shimmer-slow uppercase mb-2 block">
                Global Footprint
              </span>
              <h3 className="text-lg text-egyptian-heading font-bold text-[#E8E4DC] mb-6">
                {t('stats.title')}
              </h3>
            </div>

            <div className="my-auto flex flex-col items-start gap-2">
              <span className="text-5xl md:text-6xl font-serif text-[#C5A880] font-light leading-none">
                <StatisticCounter target={50} />+
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#9A9590] font-medium">
                Active Translation Dialects
              </span>
            </div>

            <p className="text-xs leading-relaxed text-[#9A9590] border-t border-[#7A6B55]/15 pt-4">
              Meticulous language transposition accepted across Embassies, Courts, and Sovereign Ministries globally.
            </p>
          </motion.div>

          {/* Row 2 & 3: Standard Cards (4 cols each) — 3D tilt */}
          {remainingServices.map((service, index) => {
            const content = getLocaleContent(service);

            return (
              <ServiceCard
                key={service.id}
                index={index}
                content={content}
                slug={service.slug}
                getServiceIcon={getServiceIcon}
                ctaLabel={t('cta')}
              />
            );
          })}
        </div>

        {/* Row 4: Pure Typographic Statement Block */}
        <div className="w-full border-t border-[#7A6B55]/15 pt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.85, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-[720px] text-center"
          >
            <p className="font-serif text-2xl md:text-3xl text-[#E8E4DC] italic tracking-tight font-light">
              &ldquo;Every word carries the weight of law.&rdquo;
            </p>
          </motion.div>
        </div>

      </div>

      {/* ── UPGRADE: Glow divider at bottom ── */}
      <div className="section-divider-glow absolute bottom-0 left-0 right-0" />
    </section>
  );
}

// Extracted service card with 3D tilt
function ServiceCard({
  index, content, slug, getServiceIcon, ctaLabel
}: {
  index: number;
  content: { title: string; desc: string };
  slug: string;
  getServiceIcon: (slug: string) => React.ReactNode;
  ctaLabel: string;
}) {
  const tiltRef = use3DTilt(10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="md:col-span-4"
    >
      <div
        ref={tiltRef}
        style={{ transition: 'transform 0.15s ease-out' }}
        className="border-egyptian bg-[#0F0F11] p-8 border border-[#7A6B55]/15 rounded-[16px] flex flex-col justify-between min-h-[320px] transition-colors duration-300 hover:border-[#C5A880]/40 hover:bg-[#141416] hover:shadow-[0_8px_40px_rgba(197,168,128,0.06)] relative overflow-hidden h-full"
      >
        <div>
          <div className="mb-6 w-11 h-11 rounded-full border border-[#7A6B55]/30 flex items-center justify-center bg-[#050506]">
            {getServiceIcon(slug)}
          </div>
          
          <h3 className="text-xl text-egyptian-heading font-bold text-[#E8E4DC] mb-4">
            {content.title}
          </h3>
          
          <p className="text-xs md:text-sm leading-relaxed text-[#9A9590]">
            {content.desc}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[#7A6B55]/15 pt-4">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9A9590]">
            {ctaLabel}
          </span>
          <Link href="/#contact" className="text-[#9A9590] hover:text-[#C5A880] transition-colors duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
