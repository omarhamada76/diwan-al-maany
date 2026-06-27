'use client';

import { useTranslations } from 'next-intl';
import { motion, Variants } from 'framer-motion';
import { Cpu, Lock, LayoutGrid, CheckCircle } from 'lucide-react';

export default function AiTech() {
  const t = useTranslations('AiTech');

  const cardsKeys = ['card1', 'card2', 'card3'];

  const getCardIcon = (key: string) => {
    switch (key) {
      case 'card1': return <Cpu className="w-6 h-6 text-[#D4AF37]" />;
      case 'card2': return <Lock className="w-6 h-6 text-[#D4AF37]" />;
      case 'card3': return <LayoutGrid className="w-6 h-6 text-[#D4AF37]" />;
      default: return <Cpu className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="tech" className="py-24 px-6 md:px-12 bg-[#090909] relative z-10 overflow-hidden border-t border-[#D4AF37]/10">
      
      {/* Visual Accent Light */}
      <div className="absolute right-[5%] bottom-[10%] w-[400px] h-[400px] bg-[#D4AF37]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: UI Dashboard Simulator */}
          <div className="lg:col-span-6 flex justify-center items-center order-2 lg:order-1 mt-8 lg:mt-0">
            <div className="w-full max-w-[500px] bg-[#111111] border border-[#D4AF37]/15 p-6 rounded-sm shadow-2xl relative">
              
              {/* Fake Dashboard Top Bar */}
              <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]/40" />
                  <span className="text-[9px] text-[#9E9E9E] ml-2 tracking-widest uppercase">DIWAN_CORE_GLOSSARY.EXE</span>
                </div>
                <span className="text-[9px] text-[#D4AF37] border border-[#D4AF37]/30 px-1.5 py-0.5 rounded-sm">
                  SECURE HTTPS
                </span>
              </div>

              {/* Fake Glossaries Items */}
              <div className="space-y-4">
                <div className="p-3 bg-[#171717] border border-[#D4AF37]/10 rounded-sm flex items-center justify-between">
                  <div className="flex flex-col text-start">
                    <span className="text-[8px] text-[#9E9E9E] uppercase tracking-wider">English Term</span>
                    <span className="text-xs font-bold text-[#F5F5F5]">Arbitration Agreement</span>
                  </div>
                  <div className="w-8 h-px bg-[#D4AF37]/30" />
                  <div className="flex flex-col text-end">
                    <span className="text-[8px] text-[#9E9E9E] uppercase tracking-wider">Arabic Translation</span>
                    <span className="text-xs font-bold text-[#D4AF37]" dir="rtl">اتفاق تحكيم</span>
                  </div>
                </div>

                <div className="p-3 bg-[#171717] border border-[#D4AF37]/10 rounded-sm flex items-center justify-between">
                  <div className="flex flex-col text-start">
                    <span className="text-[8px] text-[#9E9E9E] uppercase tracking-wider">Common Law Clause</span>
                    <span className="text-xs font-bold text-[#F5F5F5]">Hold Harmless</span>
                  </div>
                  <div className="w-8 h-px bg-[#D4AF37]/30" />
                  <div className="flex flex-col text-end">
                    <span className="text-[8px] text-[#9E9E9E] uppercase tracking-wider">Sharia Equivalency</span>
                    <span className="text-xs font-bold text-[#D4AF37]" dir="rtl">التزام بالتعويض ودرء الضرر</span>
                  </div>
                </div>

                {/* Cryptographic SHA Verification Mock */}
                <div className="border-t border-[#D4AF37]/10 pt-4 mt-2 flex items-center justify-between text-xs text-[#9E9E9E]">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Cryptographic SHA-256 Verified</span>
                  </div>
                  <span className="font-mono text-[9px] text-[#D4AF37]">f82e1c9a...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & Dynamic Cards */}
          <div className="lg:col-span-6 flex flex-col items-start text-start order-1 lg:order-2">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-3">
              {t('title')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F5F5] mb-6">
              {t('subtitle')}
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#9E9E9E] mb-10 max-w-xl">
              {t('description')}
            </p>

            {/* AI cards lists */}
            <motion.div 
              className="space-y-6 w-full"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {cardsKeys.map((key) => (
                <motion.div
                  key={key}
                  variants={itemVariants}
                  className="flex gap-4 p-5 bg-[#111111] border border-[#D4AF37]/5 hover:border-[#D4AF37]/25 rounded-sm transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#171717] border border-[#D4AF37]/10 flex items-center justify-center shrink-0">
                    {getCardIcon(key)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#F5F5F5] mb-1.5">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="text-[11px] sm:text-xs leading-relaxed text-[#9E9E9E]">
                      {t(`${key}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
