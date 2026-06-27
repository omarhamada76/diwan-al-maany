'use client';

import { useTranslations } from 'next-intl';
import { useCMS } from '@/context/CmsContext';
import { motion } from 'framer-motion';
import { Shield, Scale, Briefcase, FileCheck, FileText, Bookmark, ArrowUpRight, Landmark } from 'lucide-react';
import { Link } from '@/lib/navigation';

interface ServicesProps {
  locale: string;
}

export default function Services({ locale }: ServicesProps) {
  const t = useTranslations('Services');
  const { services } = useCMS();

  // Maps slugs to specific premium icons
  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'certified-translation':
        return <Shield className="w-8 h-8 text-[#D4AF37]" />;
      case 'court-support':
        return <Scale className="w-8 h-8 text-[#D4AF37]" />;
      case 'corporate-services':
        return <Briefcase className="w-8 h-8 text-[#D4AF37]" />;
      case 'contract-translation':
        return <FileCheck className="w-8 h-8 text-[#D4AF37]" />;
      case 'embassy-translation':
        return <Landmark className="w-8 h-8 text-[#D4AF37]" />; // Fallback helper
      case 'document-review':
        return <FileText className="w-8 h-8 text-[#D4AF37]" />;
      default:
        return <Bookmark className="w-8 h-8 text-[#D4AF37]" />;
    }
  };

  // Safe Landmark rendering
  const renderIcon = (slug: string) => {
    if (slug === 'embassy-translation') {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#D4AF37]"
        >
          <line x1="3" y1="22" x2="21" y2="22" />
          <line x1="6" y1="18" x2="6" y2="11" />
          <line x1="10" y1="18" x2="10" y2="11" />
          <line x1="14" y1="18" x2="14" y2="11" />
          <line x1="18" y1="18" x2="18" y2="11" />
          <polygon points="12 2 2 7 22 7" />
        </svg>
      );
    }
    return getServiceIcon(slug);
  };

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-[#090909] relative z-10">
      
      {/* Visual Accent Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#D4AF37]/3 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-3">
            {t('title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F5F5] max-w-xl">
            {t('subtitle')}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const title = locale === 'ar' ? service.titleAr : service.titleEn;
            const description = locale === 'ar' ? service.descAr : service.descEn;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className="interactive-card group relative bg-[#111111] p-8 border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 rounded-sm flex flex-col justify-between min-h-[320px] transition-all duration-500 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.05)]"
              >
                
                {/* Top Section */}
                <div>
                  <div className="mb-8 w-14 h-14 rounded-full border border-[#D4AF37]/20 flex items-center justify-center bg-[#090909] group-hover:border-[#D4AF37] transition-colors duration-500">
                    {renderIcon(service.slug)}
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#F5F5F5] mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {title}
                  </h3>
                  
                  <p className="text-xs md:text-sm leading-relaxed text-[#9E9E9E]">
                    {description}
                  </p>
                </div>

                {/* CTA Action */}
                <div className="mt-8 flex items-center justify-between border-t border-[#D4AF37]/10 pt-4 group-hover:border-[#D4AF37]/30 transition-colors duration-500">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9E9E9E] group-hover:text-[#D4AF37] transition-colors duration-300">
                    {t('cta')}
                  </span>
                  <Link href="/#contact" className="text-[#9E9E9E] group-hover:text-[#D4AF37] transition-transform duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Subtle card outline glow */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#D4AF37]/20 rounded-sm pointer-events-none transition-colors duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
