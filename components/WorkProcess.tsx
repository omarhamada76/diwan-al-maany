'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import { 
  ClipboardList, FileSearch, Coins, Languages as TransIcon, 
  CheckSquare, FileBadge, Truck 
} from 'lucide-react';

// 3D tilt hook
function use3DTilt(strength = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) scale3d(1.02,1.02,1.02)`;
  }, [strength]);
  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale3d(1,1,1)';
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => { el.removeEventListener('mousemove', handleMouseMove); el.removeEventListener('mouseleave', handleMouseLeave); };
  }, [handleMouseMove, handleMouseLeave]);
  return ref;
}

function StepCard({ stepKey, stepNum, index, isLeft, icon, name, title, description }: {
  stepKey: string; stepNum: string; index: number; isLeft: boolean;
  icon: React.ReactNode; name: string; title: string; description: string;
}) {
  const tiltRef = use3DTilt(8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={isLeft ? 'md:translate-y-0' : 'md:translate-y-12'}
    >
      <div
        ref={tiltRef}
        style={{ transition: 'transform 0.15s ease-out' }}
        className="bg-[#0F0F11] border border-[#7A6B55]/15 p-8 rounded-[16px] flex flex-col justify-between min-h-[260px] shadow-lg hover:border-[#C5A880]/40 hover:bg-[#141416] transition-colors duration-300 relative overflow-hidden group h-full"
      >
        {/* Large Background Outlined Number (Glyph) — shimmer on hover */}
        <div className="absolute top-4 right-4 md:right-8 font-serif text-7xl md:text-8xl font-black text-[#7A6B55]/10 group-hover:text-[#C5A880]/20 select-none pointer-events-none transition-colors duration-500">
          {stepNum}
        </div>

        {/* Radial bloom */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(197,168,128,0.05) 0%, transparent 60%)' }}
        />

        {/* Top Section */}
        <div>
          <div className="mb-6 w-10 h-10 rounded-full border border-[#7A6B55]/30 flex items-center justify-center bg-[#050506] group-hover:border-[#C5A880]/50 transition-colors duration-500">
            {icon}
          </div>
          
          <span className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#C5A880] uppercase block mb-2">
            {name}
          </span>
          
          <h3 className="text-base md:text-lg font-serif font-bold text-[#E8E4DC] mb-4 group-hover:text-[#C5A880] transition-colors duration-300">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm leading-relaxed text-[#9A9590] max-w-sm relative z-10">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WorkProcess() {
  const t = useTranslations('WorkProcess');
  const stepsKeys = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7'];

  const getStepIcon = (key: string) => {
    switch (key) {
      case 'step1': return <ClipboardList className="w-5 h-5 text-[#C5A880]" />;
      case 'step2': return <FileSearch className="w-5 h-5 text-[#C5A880]" />;
      case 'step3': return <Coins className="w-5 h-5 text-[#C5A880]" />;
      case 'step4': return <TransIcon className="w-5 h-5 text-[#C5A880]" />;
      case 'step5': return <CheckSquare className="w-5 h-5 text-[#C5A880]" />;
      case 'step6': return <FileBadge className="w-5 h-5 text-[#C5A880]" />;
      case 'step7': return <Truck className="w-5 h-5 text-[#C5A880]" />;
      default: return <ClipboardList className="w-5 h-5 text-[#C5A880]" />;
    }
  };

  return (
    <section id="process" className="py-24 px-6 md:px-12 bg-[#050506] relative z-10 overflow-hidden">

      {/* ── UPGRADE: Glow divider at top ── */}
      <div className="section-divider-glow absolute top-0 left-0 right-0" />

      {/* ── UPGRADE: Ambient orbs ── */}
      <div
        className="ambient-orb w-[550px] h-[550px] z-0"
        style={{ background: '#7C3AED', top: '-5%', left: '-10%', animationDelay: '-4s' }}
      />
      <div
        className="ambient-orb-reverse w-[400px] h-[400px] z-0"
        style={{ background: '#C5A880', bottom: '10%', right: '-8%', opacity: 0.07, animationDelay: '-15s' }}
      />

      {/* Background static texture & subtle glows */}
      <div className="absolute inset-0 bg-grain opacity-[0.02] mix-blend-overlay pointer-events-none z-0" />

      <div className="max-w-[1440px] mx-auto z-10 relative">
        
        {/* Section Title */}
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
            className="font-serif text-3xl md:text-4xl text-[#E8E4DC] tracking-tight leading-tight max-w-xl"
          >
            {t('subtitle')}
          </motion.h2>
        </div>

        {/* Staggered Linear Cascade Grid with 3D tilt cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-[1200px] mx-auto">
          {stepsKeys.map((key, index) => {
            const stepNum = String(index + 1).padStart(2, '0');
            const isLeft = index % 2 === 0;

            return (
              <StepCard
                key={key}
                stepKey={key}
                stepNum={stepNum}
                index={index}
                isLeft={isLeft}
                icon={getStepIcon(key)}
                name={t(`steps.${key}.name`)}
                title={t(`steps.${key}.title`)}
                description={t(`steps.${key}.description`)}
              />
            );
          })}
        </div>

      </div>

      {/* ── UPGRADE: Glow divider at bottom ── */}
      <div className="section-divider-glow absolute bottom-0 left-0 right-0" />
    </section>
  );
}
