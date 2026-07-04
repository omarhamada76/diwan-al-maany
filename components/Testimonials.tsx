'use client';

import { useTranslations } from 'next-intl';
import { useCMS } from '@/context/CmsContext';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useRef } from 'react';

interface TestimonialsProps {
  locale: string;
}

export default function Testimonials({ locale }: TestimonialsProps) {
  const t = useTranslations('Testimonials');
  const { testimonials } = useCMS();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Calculate translation range based on card quantity
  // Each card occupies ~80vw on desktop, so translating by (length - 1) * 80% is ideal
  const xTranslation = useTransform(
    smoothProgress, 
    [0, 1], 
    ['0%', `-${((testimonials?.length || 1) - 0.7) * 70}%`]
  );

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[250vh] bg-[#050506]"
    >
      {/* Pinned Viewport Frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden border-t border-[#7A6B55]/15">
        
        {/* Papyrus Grain Overlay */}
        <div className="absolute inset-0 bg-grain opacity-[0.02] mix-blend-overlay pointer-events-none z-0" />

        {/* Section Header */}
        <div className="absolute top-[12vh] left-[80px] z-20 max-w-xl text-left">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-sans font-semibold tracking-[0.25em] text-[#C5A880] uppercase mb-3 block"
          >
            {t('title')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl text-[#E8E4DC] tracking-tight leading-tight"
          >
            {t('subtitle')}
          </motion.h2>
        </div>

        {/* Huge watermarked quotation marks behind scroll */}
        <div className="absolute right-12 top-[10%] font-serif text-[18rem] md:text-[24rem] font-bold text-[#7A6B55]/5 leading-none select-none pointer-events-none">
          ”
        </div>

        {/* Horizontal Slider track */}
        <motion.div 
          style={{ x: xTranslation }}
          className="flex items-center gap-12 pl-[80px] pr-[120px] pt-[15vh] w-max z-10"
        >
          {testimonials.map((item, index) => {
            const quote = locale === 'ar' ? item.quoteAr : item.quoteEn;
            const author = locale === 'ar' ? item.authorAr : item.authorEn;
            const position = locale === 'ar' ? item.positionAr : item.positionEn;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-[80vw] md:w-[60vw] max-w-[800px] bg-[#0F0F11] border border-[#7A6B55]/15 p-8 md:p-12 rounded-[12px] flex flex-col justify-between min-h-[380px] shadow-2xl relative hover:border-[#C5A880]/30 hover:bg-[#141416] transition-all duration-300 shrink-0 group"
              >
                {/* Micro ornament corner grid lines */}
                <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-[#C5A880]/40" />
                <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-[#C5A880]/40" />
                <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-[#C5A880]/40" />
                <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-[#C5A880]/40" />

                {/* Floating quote label */}
                <div className="absolute top-6 right-8 text-[#C5A880]/10 group-hover:text-[#C5A880]/15 transition-colors duration-500">
                  <Quote className="w-16 h-16" />
                </div>

                <div className="flex flex-col gap-6">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5 select-none">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880] opacity-80" />
                    ))}
                  </div>

                  {/* Main Quote text */}
                  <blockquote className="font-serif text-base sm:text-lg md:text-xl leading-relaxed text-[#E8E4DC] font-light italic max-w-2xl">
                    &quot;{quote}&quot;
                  </blockquote>
                </div>

                {/* Author Metadata */}
                <div className="border-t border-[#7A6B55]/15 pt-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-serif font-bold text-[#C5A880] tracking-wider mb-1">
                      {author}
                    </span>
                    <span className="text-[10px] text-[#9A9590] uppercase tracking-[0.15em] font-sans">
                      {position}
                    </span>
                  </div>
                  
                  {/* Embossed verified security shield label */}
                  <span className="text-[9px] font-mono text-[#7A6B55] uppercase tracking-wider px-2 py-1 border border-[#7A6B55]/20 rounded-[4px] select-none">
                    Verified Endorsement
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll Progress indicator at bottom */}
        <div className="absolute bottom-[10vh] left-[80px] right-[80px] h-[1px] bg-[#7A6B55]/15 z-20">
          <motion.div 
            style={{ scaleX: scrollYProgress, originX: 0 }}
            className="h-full bg-[#C5A880] shadow-[0_0_8px_#C5A880]"
          />
        </div>

      </div>
    </div>
  );
}
