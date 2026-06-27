'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, MessageSquare, ChevronDown } from 'lucide-react';
import LegalSeal3D from './LegalSeal3D';
import { Link } from '@/lib/navigation';

export default function Hero() {
  const t = useTranslations('Hero');
  const tCommon = useTranslations('Common');

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(5px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#090909] pt-24 px-6 md:px-12">
      
      {/* Background Soft Glows */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#D4AF37]/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#D4AF37]/3 blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Subtle Vertical Light Shafts */}
      <div className="light-shaft left-[25%] top-0 h-full opacity-30" />
      <div className="light-shaft left-[50%] top-0 h-full opacity-20" />
      <div className="light-shaft left-[75%] top-0 h-full opacity-35" />

      {/* Main Grid Content */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Side: Editorial Typography */}
        <motion.div 
          className="lg:col-span-7 flex flex-col items-start text-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline label */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#111111]/80 backdrop-blur-sm mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#E6C567] uppercase">
              {tCommon('tagline')}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 text-[#F5F5F5]"
          >
            <span className="block">{t('titleLine1')}</span>
            <span className="block text-gold-gradient font-light mt-1">{t('titleLine2')}</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-base leading-relaxed text-[#9E9E9E] max-w-xl mb-10"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/#contact"
              className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#E6C567] text-[#090909] text-xs font-bold uppercase tracking-wider rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>{tCommon('requestQuote')}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
            
            <Link
              href="/#services"
              className="flex items-center justify-center gap-2 px-7 py-3.5 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#F5F5F5] text-xs font-bold uppercase tracking-wider rounded-sm bg-[#111111]/40 backdrop-blur-sm transition-all duration-300 hover:bg-[#D4AF37]/10"
            >
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              <span>{tCommon('explore')}</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: Rotating 3D Legal Seal */}
        <motion.div 
          className="lg:col-span-5 flex justify-center items-center relative min-h-[300px] md:min-h-[450px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {/* Subtle gold ring highlight behind canvas */}
          <div className="absolute w-[300px] h-[300px] rounded-full border border-[#D4AF37]/10 animate-[spin_120s_linear_infinite] pointer-events-none" />
          <div className="w-full max-w-[420px]">
            <LegalSeal3D />
          </div>
        </motion.div>
      </div>

      {/* Mouse scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#9E9E9E] z-10 select-none">
        <span className="text-[9px] uppercase tracking-[0.2em] font-medium opacity-60">
          {t('scrollDown')}
        </span>
        <motion.div 
          className="w-5 h-8 border border-[#D4AF37]/40 rounded-full flex justify-center p-1"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <div className="w-1 h-1.5 bg-[#D4AF37] rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
