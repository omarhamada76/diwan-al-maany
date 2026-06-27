'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';

export default function WhyChooseUs() {
  const t = useTranslations('WhyChooseUs');

  const statsKeys = ['experience', 'accuracy', 'translators', 'countries', 'projects'];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-[#111111] relative z-10 border-t border-[#D4AF37]/10">
      
      {/* Background radial gold glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#D4AF37]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Header Texts */}
          <div className="lg:col-span-4 flex flex-col items-start text-start">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-3">
              {t('title')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F5F5] mb-6 leading-tight">
              {t('subtitle')}
            </h2>
            <div className="w-16 h-[1px] bg-[#D4AF37]" />
          </div>

          {/* Stats Display Grid */}
          <motion.div 
            className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-6 mt-8 lg:mt-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {statsKeys.map((key) => (
              <motion.div
                key={key}
                variants={itemVariants}
                className="flex flex-col items-center sm:items-start text-center sm:text-start p-4 bg-[#171717]/40 border border-[#D4AF37]/5 hover:border-[#D4AF37]/20 rounded-sm transition-all duration-300"
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-gold-gradient tracking-tight mb-2">
                  {t(`stats.${key}.value`)}
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-[#9E9E9E] leading-snug uppercase tracking-wider">
                  {t(`stats.${key}.label`)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
