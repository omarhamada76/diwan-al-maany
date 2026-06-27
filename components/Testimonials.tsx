'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCMS } from '@/context/CmsContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface TestimonialsProps {
  locale: string;
}

export default function Testimonials({ locale }: TestimonialsProps) {
  const t = useTranslations('Testimonials');
  const { testimonials } = useCMS();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[activeIndex];
  const quote = locale === 'ar' ? current.quoteAr : current.quoteEn;
  const author = locale === 'ar' ? current.authorAr : current.authorEn;
  const position = locale === 'ar' ? current.positionAr : current.positionEn;

  return (
    <section className="py-24 px-6 md:px-12 bg-[#111111] relative z-10 border-t border-[#D4AF37]/10 overflow-hidden">
      
      {/* Background glowing particles effect */}
      <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[300px] h-[300px] bg-[#D4AF37]/3 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Header Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-3">
            {t('title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F5F5] max-w-xl">
            {t('subtitle')}
          </h2>
        </div>

        {/* Testimonial card container with glassmorphism */}
        <div className="w-full relative min-h-[280px] bg-[#171717]/60 backdrop-blur-md border border-[#D4AF37]/15 p-8 sm:p-12 rounded-sm shadow-2xl flex flex-col justify-between items-center text-center">
          
          {/* Quote Icon */}
          <div className="absolute top-4 left-6 text-[#D4AF37]/15">
            <Quote className="w-12 h-12" />
          </div>

          <div className="w-full flex-grow flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-6"
              >
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                {/* The Quote text */}
                <blockquote className="text-base sm:text-lg leading-relaxed text-[#F5F5F5] font-light max-w-2xl italic">
                  "{quote}"
                </blockquote>

                {/* Author Credentials */}
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold text-[#D4AF37] tracking-wider mb-1">
                    {author}
                  </span>
                  <span className="text-[10px] text-[#9E9E9E] uppercase tracking-[0.15em]">
                    {position}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center gap-6 mt-10">
            <button
              onClick={handlePrev}
              className="w-10 h-10 border border-[#D4AF37]/20 hover:border-[#D4AF37] text-[#9E9E9E] hover:text-[#D4AF37] rounded-full flex items-center justify-center bg-[#090909]/40 transition-colors duration-300 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
            </button>
            
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i ? 'bg-[#D4AF37] w-4' : 'bg-[#D4AF37]/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 border border-[#D4AF37]/20 hover:border-[#D4AF37] text-[#9E9E9E] hover:text-[#D4AF37] rounded-full flex items-center justify-center bg-[#090909]/40 transition-colors duration-300 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
