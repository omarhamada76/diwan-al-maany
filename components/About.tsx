'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Compass, Award, History, HeartHandshake } from 'lucide-react';

interface TimelineItemProps {
  year: string;
  index: number;
  title: string;
  description: string;
  isLast: boolean;
}

function TimelineNode({ year, index, title, description, isLast }: TimelineItemProps) {
  const isLeft = index % 2 === 0;
  
  // Icon dictionary based on index
  const getYearIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Compass className="w-4 h-4 text-[#C5A880]" />;
      case 1: return <Award className="w-4 h-4 text-[#C5A880]" />;
      case 2: return <History className="w-4 h-4 text-[#C5A880]" />;
      case 3: return <HeartHandshake className="w-4 h-4 text-[#C5A880]" />;
      default: return <Award className="w-4 h-4 text-[#C5A880]" />;
    }
  };

  return (
    <div className="relative w-full flex flex-col md:flex-row items-center justify-center mb-16 md:mb-24 last:mb-0">
      
      {/* Central Axis Node Dot */}
      <div className="absolute left-[20px] md:left-1/2 -translate-x-[10px] md:-translate-x-1/2 z-20">
        {year === '2026' ? (
          /* Final Present Node (Diamond Shape) */
          <motion.div
            initial={{ scale: 0.8, rotate: 45 }}
            whileInView={{ scale: [1, 1.2, 1], rotate: 45 }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="w-[16px] h-[16px] bg-[#C5A880] border border-[#C5A880]/80 shadow-[0_0_15px_#C5A880] cursor-pointer"
            aria-label="Present Day"
          />
        ) : (
          /* Standard Circular Node */
          <motion.div
            initial={{ backgroundColor: '#0F0F11', borderColor: 'rgba(122,107,85,0.2)' }}
            whileInView={{ 
              backgroundColor: '#C5A880', 
              borderColor: '#C5A880',
              boxShadow: '0 0 12px rgba(197,168,128,0.4)'
            }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-[12px] h-[12px] rounded-full border-2 cursor-pointer"
          />
        )}
      </div>

      {/* Grid Layout Container */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pl-12 md:pl-0">
        
        {/* Left Side (Desktop: Content or Empty, Mobile: Hidden) */}
        <div className={`md:col-span-5 ${isLeft ? 'md:block text-left md:text-right' : 'hidden md:block opacity-0 pointer-events-none'}`}>
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -30, clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ opacity: 1, x: 0, clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="card-3d bg-[#0F0F11] border border-[#7A6B55]/15 p-6 md:p-8 rounded-[12px] hover:border-[#C5A880]/40 hover:bg-[#141416] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(197,168,128,0.08)]"
            >
              <div className="flex items-center justify-start md:justify-end gap-3 mb-4">
                <span className="font-mono text-sm font-semibold tracking-widest text-shimmer">{year}</span>
                <div className="w-7 h-7 rounded-full border border-[#7A6B55]/30 flex items-center justify-center bg-[#050506]">
                  {getYearIcon(index)}
                </div>
              </div>
              <h3 className="text-[#E8E4DC] font-serif text-lg font-bold mb-3">{title}</h3>
              <p className="text-[#9A9590] text-xs md:text-sm leading-relaxed">{description}</p>
            </motion.div>
          )}
        </div>

        {/* Center Axis Spacer (2 columns) */}
        <div className="hidden md:block md:col-span-2" />

        {/* Right Side (Desktop: Content or Empty, Mobile: Content) */}
        <div className={`md:col-span-5 ${!isLeft ? 'text-left' : 'md:block text-left md:opacity-0 md:pointer-events-none'}`}>
          {/* Mobilized/Right Column Inscription Card */}
          {(!isLeft || typeof window !== 'undefined' && window.innerWidth < 768) && (
            <motion.div
              initial={{ opacity: 0, x: 30, clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ opacity: 1, x: 0, clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="card-3d bg-[#0F0F11] border border-[#7A6B55]/15 p-6 md:p-8 rounded-[12px] hover:border-[#C5A880]/40 hover:bg-[#141416] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(197,168,128,0.08)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full border border-[#7A6B55]/30 flex items-center justify-center bg-[#050506]">
                  {getYearIcon(index)}
                </div>
                <span className="font-mono text-sm font-semibold tracking-widest text-shimmer">{year}</span>
              </div>
              <h3 className="text-[#E8E4DC] font-serif text-lg font-bold mb-3">{title}</h3>
              <p className="text-[#9A9590] text-xs md:text-sm leading-relaxed">{description}</p>
            </motion.div>
          )}
          
          {/* Desktop Fallback for Left Inscription Card when rendered on Right for Mobile */}
          {isLeft && (
            <div className="md:hidden">
              <motion.div
                initial={{ opacity: 0, x: 30, clipPath: 'inset(0 0 100% 0)' }}
                whileInView={{ opacity: 1, x: 0, clipPath: 'inset(0 0 0% 0)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="card-3d bg-[#0F0F11] border border-[#7A6B55]/15 p-6 md:p-8 rounded-[12px] hover:border-[#C5A880]/40 hover:bg-[#141416] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-7 rounded-full border border-[#7A6B55]/30 flex items-center justify-center bg-[#050506]">
                    {getYearIcon(index)}
                  </div>
                  <span className="font-mono text-sm font-semibold tracking-widest text-shimmer">{year}</span>
                </div>
                <h3 className="text-[#E8E4DC] font-serif text-lg font-bold mb-3">{title}</h3>
                <p className="text-[#9A9590] text-xs md:text-sm leading-relaxed">{description}</p>
              </motion.div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function About() {
  const t = useTranslations('About');
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside the timeline container to grow the line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center']
  });
  
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const ladyJusticeY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const timelineYears = ['2010', '2015', '2020', '2024', '2026'];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 px-6 md:px-12 bg-[#09090A] relative z-10 overflow-hidden"
    >
      {/* ── UPGRADE: Glow divider at top ── */}
      <div className="section-divider-glow absolute top-0 left-0 right-0" />

      {/* ── UPGRADE: Ambient orbs ── */}
      <div
        className="ambient-orb w-[500px] h-[500px] z-0"
        style={{ background: '#7C3AED', top: '-5%', right: '-8%', animationDelay: '-5s' }}
      />
      <div
        className="ambient-orb-sm w-[300px] h-[300px] z-0"
        style={{ background: '#C5A880', bottom: '10%', left: '-5%', animationDelay: '-10s' }}
      />

      {/* Background static texture & warm gradients */}
      <div className="absolute inset-0 bg-grain opacity-[0.02] mix-blend-overlay pointer-events-none z-0" />

      {/* Neoclassical Lady Justice Parallax Statue Backdrop (Red Blindfold Statue) */}
      <motion.div
        style={{ y: ladyJusticeY }}
        className="absolute left-[3%] xl:left-[8%] top-[25%] w-[320px] h-[550px] pointer-events-none z-0 hidden lg:block"
      >
        <img 
          src="/img/lady-justice.png" 
          alt="Lady Justice" 
          className="w-full h-full object-contain opacity-[0.22] mix-blend-screen"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </motion.div>

      <div className="max-w-[1440px] mx-auto z-10 relative">
        
        {/* Story Intro Header (Spans 8 columns, centered) */}
        <div className="max-w-[720px] mx-auto text-center mb-24 flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="text-[11px] font-sans font-semibold tracking-[0.25em] text-[#C5A880] uppercase mb-4"
          >
            {t('title')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
            className="font-serif text-3xl md:text-4xl text-[#E8E4DC] tracking-tight leading-tight mb-8"
          >
            {t('storyTitle')}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
            className="space-y-6 text-sm leading-relaxed text-[#9A9590]"
          >
            <p>{t('storyParagraph1')}</p>
            <p>{t('storyParagraph2')}</p>
          </motion.div>
        </div>

        {/* Central Vertical Timeline Section */}
        <div className="relative w-full max-w-[1200px] mx-auto pt-8">
          
          {/* Scroll-linked self-drawing gold line (Desktop) */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 -translate-x-[0.5px] md:-translate-x-1/2 w-[1px] z-10 hidden md:block">
            {/* Background inactive channel line */}
            <div className="absolute inset-0 bg-[#7A6B55]/15" />
            {/* Active self-growing filament */}
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-[#C5A880] to-[#brass-highlight] shadow-[0_0_8px_rgba(197,168,128,0.4)]"
            />
          </div>

          {/* Simple scroll-growth line fallback for Mobile */}
          <div className="absolute left-[20px] top-0 bottom-0 -translate-x-[0.5px] w-[1px] bg-[#7A6B55]/15 z-10 md:hidden" />

          {/* Timeline Nodes Iteration */}
          <div className="relative w-full flex flex-col items-center">
            {timelineYears.map((year, index) => (
              <TimelineNode
                key={year}
                year={year}
                index={index}
                title={t(`timeline.${year}.title`)}
                description={t(`timeline.${year}.description`)}
                isLast={index === timelineYears.length - 1}
              />
            ))}
          </div>

        </div>

      </div>

      {/* ── UPGRADE: Glow divider at bottom ── */}
      <div className="section-divider-glow absolute bottom-0 left-0 right-0" />
    </section>
  );
}
