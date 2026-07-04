'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState, useRef, useCallback, useEffect } from 'react';
import { ShieldAlert, Award, FileSpreadsheet, Percent, Users, Globe } from 'lucide-react';

// 3D tilt hook
function use3DTilt(strength = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) scale3d(1.02,1.02,1.02)`;
  }, [strength]);
  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)';
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

// Certification Stamp Sub-component
function CertificationStamp({ children, name }: { children: React.ReactNode; name: string }) {
  const tiltRef = use3DTilt(6);
  return (
    <motion.div
      initial={{ scale: 1.3, opacity: 0, rotate: -4 }}
      whileInView={{ scale: 1.0, opacity: 1, rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 280, damping: 15, delay: 0.1 }}
    >
      <div
        ref={tiltRef}
        style={{ transition: 'transform 0.15s ease-out' }}
        className="flex items-center gap-4 bg-[#0F0F11] border border-[#7A6B55]/15 p-4 rounded-[10px] hover:border-[#C5A880]/40 transition-colors duration-300 hover:shadow-[0_4px_24px_rgba(197,168,128,0.06)]"
      >
        <div className="w-12 h-12 rounded-full border border-[#C5A880]/30 flex items-center justify-center bg-[#050506] shadow-[0_0_12px_rgba(197,168,128,0.06)]">
          {children}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-sans font-semibold tracking-wider text-shimmer uppercase">Accredited</span>
          <span className="text-xs md:text-sm font-serif font-bold text-[#E8E4DC]">{name}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Stats Number counter — now with clip-path wipe reveal
function DynamicStat({ target, label }: { target: string; label: string }) {
  const isPercent = target.includes('%');
  const isPlus = target.includes('+');
  const isK = target.includes('k');
  const numericStr = target.replace(/[^0-9.]/g, '');
  const numericTarget = parseFloat(numericStr);
  const triggerRef = useRef<boolean>(false);
  const [count, setCount] = useState(0);
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onViewportEnter={() => {
        setRevealed(true);
        if (triggerRef.current) return;
        triggerRef.current = true;
        let start = 0;
        const step = numericTarget / 100;
        const timer = setInterval(() => {
          start += step;
          if (start >= numericTarget) { start = numericTarget; clearInterval(timer); }
          setCount(start);
        }, 16);
      }}
      className="flex flex-col items-start bg-[#0F0F11] border border-[#7A6B55]/15 p-6 rounded-[10px] hover:border-[#C5A880]/40 transition-colors duration-300"
    >
      <span className="text-3xl md:text-4xl font-serif text-[#C5A880] font-light leading-none mb-2">
        {isPercent ? `${count.toFixed(2)}%` : count.toFixed(0)}
        {!isPercent && isPlus && '+'}
        {!isPercent && isK && 'k+'}
      </span>
      <span className="text-[10px] md:text-xs font-sans uppercase tracking-wider text-[#9A9590]">
        {label}
      </span>
    </motion.div>
  );
}

// Partner Logo vector SVG templates
function PartnerLogo({ name, svgPath }: { name: string; svgPath: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.6 }}
      whileHover={{ opacity: 1, color: '#C5A880' }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center p-6 border border-[#7A6B55]/10 bg-[#0F0F11] rounded-[8px] hover:border-[#C5A880]/30 hover:bg-[#141416] transition-all duration-300 group cursor-pointer relative overflow-hidden"
    >
      {/* Scanline effect on hover */}
      <div className="absolute inset-0 scanline-overlay opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
      <svg
        viewBox="0 0 100 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-8 max-w-[100px] text-[#9A9590] group-hover:text-[#C5A880] transition-colors duration-300 relative z-10"
      >
        <path d={svgPath} />
        <circle cx="50" cy="20" r="1.5" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </svg>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const t = useTranslations('WhyChooseUs');

  const clientLogos = [
    { name: 'Adnoc', path: 'M 10 20 L 30 10 L 50 20 L 30 30 Z M 50 20 L 70 10 L 90 20 L 70 30 Z' },
    { name: 'Al-Hilal', path: 'M 20 10 Q 50 15 80 10 Q 50 30 20 10 Z M 30 20 L 70 20' },
    { name: 'Mubadala', path: 'M 15 30 L 30 10 L 45 30 L 60 10 L 75 30 L 90 10' },
    { name: 'DP World', path: 'M 20 20 Q 50 5 80 20 Q 50 35 20 20 Z' },
    { name: 'EMAAR', path: 'M 10 30 L 10 10 L 90 10 L 90 30 Z M 30 10 L 30 30 M 70 10 L 70 30' },
    { name: 'Ministry', path: 'M 50 5 L 85 20 L 50 35 L 15 20 Z M 50 12 L 50 28' }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#09090A] relative z-10 overflow-hidden">

      {/* ── UPGRADE: Glow divider at top ── */}
      <div className="section-divider-glow absolute top-0 left-0 right-0" />

      {/* ── UPGRADE: Ambient orbs ── */}
      <div
        className="ambient-orb w-[500px] h-[500px] z-0"
        style={{ background: '#C5A880', top: '-10%', right: '-10%', opacity: 0.07, animationDelay: '-8s' }}
      />
      <div
        className="ambient-orb-reverse w-[400px] h-[400px] z-0"
        style={{ background: '#1D4ED8', bottom: '0%', left: '-8%', animationDelay: '-2s' }}
      />

      {/* Background static texture */}
      <div className="absolute inset-0 bg-grain opacity-[0.02] mix-blend-overlay pointer-events-none z-0" />
      
      <div className="max-w-[1440px] mx-auto z-10 relative">
        
        {/* Section Header */}
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

        {/* Three Columns Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Column 1: Certifications (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-sm font-sans font-semibold tracking-[0.2em] text-[#E8E4DC] uppercase border-b border-[#7A6B55]/15 pb-4 mb-2">
              Certifications
            </h3>
            <CertificationStamp name="ISO 17100 Certified">
              <Award className="w-5 h-5 text-[#C5A880]" />
            </CertificationStamp>
            <CertificationStamp name="UAE Ministry Accredited">
              <ShieldAlert className="w-5 h-5 text-[#C5A880]" />
            </CertificationStamp>
            <CertificationStamp name="Sovereign Court Certified">
              <FileSpreadsheet className="w-5 h-5 text-[#C5A880]" />
            </CertificationStamp>
          </div>

          {/* Column 2: In Numbers (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-sm font-sans font-semibold tracking-[0.2em] text-[#E8E4DC] uppercase border-b border-[#7A6B55]/15 pb-4 mb-2">
              In Numbers
            </h3>
            <DynamicStat target={t('stats.projects.value')} label={t('stats.projects.label')} />
            <DynamicStat target={t('stats.accuracy.value')} label={t('stats.accuracy.label')} />
            <DynamicStat target={t('stats.experience.value')} label={t('stats.experience.label')} />
          </div>

          {/* Column 3: Trusted By Logo Grid (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-sm font-sans font-semibold tracking-[0.2em] text-[#E8E4DC] uppercase border-b border-[#7A6B55]/15 pb-4 mb-2">
              Trusted By
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {clientLogos.map((logo) => (
                <PartnerLogo key={logo.name} name={logo.name} svgPath={logo.path} />
              ))}
            </div>
          </div>

        </div>

        {/* Statement Block at bottom */}
        <div className="w-full border-t border-[#7A6B55]/15 pt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.85, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-[720px] text-center"
          >
            <p className="font-serif text-2xl md:text-3xl text-[#E8E4DC] italic tracking-tight font-light">
              &ldquo;Every translation carries the seal of certainty.&rdquo;
            </p>
          </motion.div>
        </div>

      </div>

      {/* ── UPGRADE: Glow divider at bottom ── */}
      <div className="section-divider-glow absolute bottom-0 left-0 right-0" />
    </section>
  );
}
