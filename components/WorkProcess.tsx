'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  FileSearch, ClipboardList, Coins, Languages as TransIcon, 
  CheckCircle2, FileBadge, CheckSquare, Truck 
} from 'lucide-react';

export default function WorkProcess() {
  const t = useTranslations('WorkProcess');

  const stepsKeys = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7'];

  // Icons matching each step
  const getStepIcon = (key: string) => {
    switch (key) {
      case 'step1': return <ClipboardList className="w-5 h-5 text-[#D4AF37]" />;
      case 'step2': return <FileSearch className="w-5 h-5 text-[#D4AF37]" />;
      case 'step3': return <Coins className="w-5 h-5 text-[#D4AF37]" />;
      case 'step4': return <TransIcon className="w-5 h-5 text-[#D4AF37]" />;
      case 'step5': return <CheckSquare className="w-5 h-5 text-[#D4AF37]" />;
      case 'step6': return <FileBadge className="w-5 h-5 text-[#D4AF37]" />;
      case 'step7': return <Truck className="w-5 h-5 text-[#D4AF37]" />;
      default: return <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="process" className="py-24 px-6 md:px-12 bg-[#090909] relative z-10 border-t border-[#D4AF37]/10 overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-[#D4AF37]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        
        {/* Header Title */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-3">
            {t('title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F5F5] max-w-xl">
            {t('subtitle')}
          </h2>
        </div>

        {/* Central Vertical Connector Line (Desktop) */}
        <div className="absolute left-[16px] md:left-1/2 md:-translate-x-1/2 top-44 bottom-8 w-[1px] bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/10 to-[#D4AF37]/40" />

        {/* Steps Timeline Loop */}
        <div className="space-y-12 relative">
          {stepsKeys.map((key, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={key} 
                className={`flex flex-col md:flex-row items-start md:items-center justify-between w-full relative ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                
                {/* Visual Timeline Marker Node */}
                <div className="absolute left-[16px] md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full border-2 border-[#D4AF37]/40 bg-[#090909] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-[#D4AF37] transition-all">
                  {getStepIcon(key)}
                </div>

                {/* Content Card (Desktop: left or right, Mobile: stacked with offset left) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                    isEven ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'
                  }`}
                >
                  <div className="bg-[#111111]/90 backdrop-blur-md p-6 sm:p-8 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 rounded-sm relative overflow-hidden transition-all duration-300">
                    <span className="text-[10px] font-semibold text-[#D4AF37] tracking-[0.2em] uppercase block mb-3">
                      {t(`steps.${key}.name`)}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#F5F5F5] mb-4">
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#9E9E9E]">
                      {t(`steps.${key}.description`)}
                    </p>
                  </div>
                </motion.div>

                {/* Spacer block to balance layout on desktop */}
                <div className="hidden md:block w-[45%]" />

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
