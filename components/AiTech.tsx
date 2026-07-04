'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Lock, LayoutGrid, CheckCircle2, RotateCw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface WordSegment {
  id: string;
  ar: string;
  en: string;
}

export default function AiTech() {
  const t = useTranslations('AiTech');
  const [isTranslated, setIsTranslated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredSegmentId, setHoveredSegmentId] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<boolean>(false);

  const cardsKeys = ['card1', 'card2', 'card3'];

  const segments: WordSegment[] = [
    { id: '1', ar: 'بموجب أحكام', en: 'Pursuant to the provisions' },
    { id: '2', ar: 'هذا العقد،', en: 'of this contract,' },
    { id: '3', ar: 'يتعهد الطرف الأول', en: 'the first party undertakes' },
    { id: '4', ar: 'بتقديم الخدمات القانونية المذكورة.', en: 'to provide the stated legal services.' }
  ];

  const getCardIcon = (key: string) => {
    switch (key) {
      case 'card1': return <Cpu className="w-5 h-5 text-[#C5A880]" />;
      case 'card2': return <Lock className="w-5 h-5 text-[#C5A880]" />;
      case 'card3': return <LayoutGrid className="w-5 h-5 text-[#C5A880]" />;
      default: return <Cpu className="w-5 h-5 text-[#C5A880]" />;
    }
  };

  const handleTriggerSweep = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => { setIsTranslated(prev => !prev); }, 1000);
    setTimeout(() => { setIsAnimating(false); }, 2000);
  };

  const handleViewportEntry = () => {
    if (triggerRef.current) return;
    triggerRef.current = true;
    setTimeout(() => { handleTriggerSweep(); }, 1200);
  };

  return (
    <section id="tech" className="py-24 px-6 md:px-12 bg-[#09090A] relative z-10 overflow-hidden">

      {/* ── UPGRADE: Glow divider at top ── */}
      <div className="section-divider-glow absolute top-0 left-0 right-0" />

      {/* ── UPGRADE: Stronger ambient orbs ── */}
      <div
        className="ambient-orb w-[600px] h-[600px] z-0"
        style={{ background: '#6D28D9', top: '-10%', right: '-10%', animationDelay: '-9s' }}
      />
      <div
        className="ambient-orb-sm w-[350px] h-[350px] z-0"
        style={{ background: '#1D4ED8', bottom: '0%', left: '-5%', animationDelay: '-3s' }}
      />

      {/* Background static grain texture & ambient glow */}
      <div className="absolute inset-0 bg-grain opacity-[0.02] mix-blend-overlay pointer-events-none z-0" />

      <div className="max-w-[1440px] mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Semantic Translation Morph Panel */}
          <div className="lg:col-span-6 flex justify-center items-center order-2 lg:order-1 mt-8 lg:mt-0">
            <motion.div 
              ref={containerRef}
              onViewportEnter={handleViewportEntry}
              viewport={{ once: true, margin: '-50px' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[540px] bg-[#0F0F11] border border-[#C5A880]/15 p-6 md:p-8 rounded-[16px] shadow-[0_0_60px_rgba(197,168,128,0.04)] relative overflow-hidden group"
            >
              {/* ── UPGRADE: Brighter, wider scanner laser sweep ── */}
              <AnimatePresence>
                {isAnimating && (
                  <motion.div
                    initial={{ left: '-2%' }}
                    animate={{ left: '102%' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.0, ease: 'easeInOut' }}
                    className="absolute top-0 bottom-0 w-[2px] z-30 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom, transparent, #C5A880, transparent)',
                      boxShadow: '0 0 25px 8px rgba(197,168,128,0.35), 0 0 50px 16px rgba(197,168,128,0.12)',
                    }}
                  >
                    {/* Glowing point trailing on the line */}
                    <div className="absolute top-[40%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D4B896] blur-[3px]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Top glow line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent" />

              {/* Console Dashboard Header */}
              <div className="flex items-center justify-between border-b border-[#7A6B55]/15 pb-4 mb-6 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C5A880]/20" />
                  <span className="text-[9px] font-mono text-[#9A9590] ml-2 tracking-widest uppercase">DIWAN_ROSETTA_MORPH.EXE</span>
                </div>
                <button 
                  onClick={handleTriggerSweep}
                  disabled={isAnimating}
                  className="flex items-center gap-1 text-[9px] font-mono text-[#C5A880] border border-[#C5A880]/30 hover:border-[#C5A880] px-2 py-0.5 rounded-[4px] cursor-pointer hover:bg-[#C5A880]/5 transition-colors disabled:opacity-40"
                  aria-label="Trigger translation sweep"
                >
                  <RotateCw className={`w-2.5 h-2.5 ${isAnimating ? 'animate-spin' : ''}`} />
                  SWEEP
                </button>
              </div>

              {/* Translation Text Field */}
              <div className="min-h-[140px] flex flex-col justify-center relative py-4 px-2">
                <div 
                  className="w-full flex flex-wrap gap-x-2 gap-y-3 font-serif text-sm md:text-base leading-relaxed tracking-wide transition-all duration-300"
                  style={{ direction: isTranslated ? 'ltr' : 'rtl' }}
                >
                  {segments.map((segment) => {
                    const isHovered = hoveredSegmentId === segment.id;
                    const textContent = isTranslated ? segment.en : segment.ar;
                    
                    return (
                      <span
                        key={segment.id}
                        onMouseEnter={() => setHoveredSegmentId(segment.id)}
                        onMouseLeave={() => setHoveredSegmentId(null)}
                        className={`transition-all duration-300 rounded-[2px] px-1 py-0.5 cursor-help ${
                          isHovered 
                            ? 'bg-[#C5A880]/10 text-[#D4B896] border-b border-[#C5A880]/60' 
                            : 'text-[#E8E4DC] hover:text-[#E8E4DC]'
                        }`}
                      >
                        {textContent}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Console Dashboard Footer */}
              <div className="border-t border-[#7A6B55]/15 pt-4 mt-6 flex items-center justify-between text-xs text-[#9A9590] select-none">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] opacity-80" />
                  <span className="text-[10px] font-mono">Semantic Alignment Check</span>
                </div>
                <span className="font-mono text-[9px] text-shimmer tracking-widest">SHA_256_PASS</span>
              </div>

            </motion.div>
          </div>

          {/* Right Column: Title Descriptions & AI Cards */}
          <div className="lg:col-span-6 flex flex-col items-start text-start order-1 lg:order-2">
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
              className="font-serif text-3xl md:text-4xl text-[#E8E4DC] tracking-tight leading-tight mb-6"
            >
              {t('subtitle')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xs md:text-sm leading-relaxed text-[#9A9590] mb-10 max-w-xl"
            >
              {t('description')}
            </motion.p>

            {/* Static cards list */}
            <div className="space-y-6 w-full">
              {cardsKeys.map((key, idx) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20, clipPath: 'inset(0 0 100% 0)' }}
                  whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-4 p-5 bg-[#0F0F11] border border-[#7A6B55]/15 hover:border-[#C5A880]/40 rounded-[12px] hover:bg-[#141416] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-[4px] bg-[#050506] border border-[#7A6B55]/20 flex items-center justify-center shrink-0 group-hover:border-[#C5A880]/50 transition-colors duration-300">
                    {getCardIcon(key)}
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-[#E8E4DC] mb-1.5 group-hover:text-[#C5A880] transition-colors duration-300">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#9A9590]">
                      {t(`${key}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── UPGRADE: Glow divider at bottom ── */}
      <div className="section-divider-glow absolute bottom-0 left-0 right-0" />
    </section>
  );
}
