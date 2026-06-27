'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Compass, HeartHandshake, History } from 'lucide-react';

export default function About() {
  const t = useTranslations('About');
  const [activeYear, setActiveYear] = useState<string>('2010');

  const timelineYears = ['2010', '2015', '2020', '2024', '2026'];

  // Icons corresponding to each timeline phase
  const getYearIcon = (year: string) => {
    switch (year) {
      case '2010': return <Compass className="w-5 h-5 text-[#D4AF37]" />;
      case '2015': return <Award className="w-5 h-5 text-[#D4AF37]" />;
      case '2020': return <History className="w-5 h-5 text-[#D4AF37]" />;
      case '2024': return <HeartHandshake className="w-5 h-5 text-[#D4AF37]" />;
      default: return <Award className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#111111] relative z-10 border-y border-[#D4AF37]/10">
      
      {/* Background Decorative Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Editorial & Story */}
          <div className="lg:col-span-6 flex flex-col items-start text-start">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-3">
              {t('title')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-[#F5F5F5]">
              {t('storyTitle')}
            </h2>
            <div className="space-y-6 text-sm md:text-base leading-relaxed text-[#9E9E9E]">
              <p>{t('storyParagraph1')}</p>
              <p>{t('storyParagraph2')}</p>
            </div>

            {/* Custom Pharaonic Lotus Geometry decoration */}
            <div className="mt-12 opacity-35 hidden sm:block">
              <svg width="180" height="60" viewBox="0 0 180 60" fill="none" className="text-[#D4AF37]">
                <path d="M90 5C93 18 102 38 115 45C102 46 95 38 90 28C85 38 78 46 65 45C78 38 87 18 90 5Z" stroke="currentColor" strokeWidth="1" />
                <path d="M90 25C95 35 108 50 128 50C108 52 98 48 90 38C82 48 72 52 52 50C72 50 85 35 90 25Z" stroke="currentColor" strokeWidth="0.5" />
                <line x1="10" y1="50" x2="170" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
              </svg>
            </div>
          </div>

          {/* Right Column: Interactive Timeline */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row gap-8 sm:gap-12 items-stretch mt-8 lg:mt-0">
            
            {/* Year Selector Stepper */}
            <div className="flex sm:flex-col justify-between sm:justify-start items-center sm:items-start gap-4 border-b sm:border-b-0 sm:border-l border-[#D4AF37]/20 pb-4 sm:pb-0 sm:pl-0 sm:pr-8 rtl:sm:border-l-0 rtl:sm:border-r rtl:sm:pr-0 rtl:sm:pl-8">
              {timelineYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`relative py-2 sm:py-3 px-3 text-sm font-semibold tracking-widest transition-all duration-300 cursor-pointer ${
                    activeYear === year
                      ? 'text-[#D4AF37] scale-110'
                      : 'text-[#9E9E9E] hover:text-[#F5F5F5]'
                  }`}
                >
                  {/* Glowing connector for active dot */}
                  {activeYear === year && (
                    <motion.div
                      layoutId="activeTimelineIndicator"
                      className="absolute left-0 sm:-left-[17px] rtl:left-auto rtl:sm:-right-[17px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"
                    />
                  )}
                  {year}
                </button>
              ))}
            </div>

            {/* Timeline Description Block */}
            <div className="flex-grow flex items-center">
              <div className="bg-[#171717] border border-[#D4AF37]/10 p-8 rounded-sm w-full min-h-[220px] flex flex-col justify-center relative overflow-hidden shadow-xl">
                
                {/* Micro ornament background */}
                <div className="absolute top-4 right-4 text-[#D4AF37]/10">
                  {getYearIcon(activeYear)}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeYear}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#090909]">
                        {getYearIcon(activeYear)}
                      </div>
                      <span className="text-xs font-semibold text-[#D4AF37] tracking-[0.2em]">
                        {activeYear}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-[#F5F5F5]">
                      {t(`timeline.${activeYear}.title`)}
                    </h3>
                    
                    <p className="text-xs md:text-sm leading-relaxed text-[#9E9E9E]">
                      {t(`timeline.${activeYear}.description`)}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
