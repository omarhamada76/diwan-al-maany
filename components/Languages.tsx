'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Check } from 'lucide-react';

interface LanguageItem {
  key: string;
  nativeName: string;
  flag: string;
  x: number; // Map coordinates in SVG %
  y: number;
  info: string;
}

export default function Languages() {
  const t = useTranslations('Languages');
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<string>('en');

  // Locations of key legal/diplomatic hubs
  const languagesList: LanguageItem[] = [
    { key: 'ar', nativeName: 'العربية', flag: '🇪🇬', x: 55, y: 50, info: 'Cairo HQ - Primary Sovereign Hub' },
    { key: 'en', nativeName: 'English', flag: '🇬🇧', x: 47, y: 32, info: 'London Hub - Common Law Jurisdictions' },
    { key: 'fr', nativeName: 'Français', flag: '🇫🇷', x: 48, y: 38, info: 'Paris - Civil Code Translation Authority' },
    { key: 'de', nativeName: 'Deutsch', flag: '🇩🇪', x: 50, y: 35, info: 'Berlin Hub - Central European Corporate' },
    { key: 'es', nativeName: 'Español', flag: '🇪🇸', x: 45, y: 44, info: 'Madrid Hub - Latin American Consular' },
    { key: 'zh', nativeName: '中文', flag: '🇨🇳', x: 75, y: 48, info: 'Beijing - Sino-Arab Commercial Arbitrations' },
    { key: 'ru', nativeName: 'Русский', flag: '🇷🇺', x: 62, y: 30, info: 'Moscow - Bilateral Investment Contracts' },
    { key: 'it', nativeName: 'Italiano', flag: '🇮🇹', x: 50, y: 42, info: 'Rome - Maritime and Trade Agreements' },
  ];

  const activeLang = languagesList.find((l) => l.key === (hoveredLang || selectedLang)) || languagesList[0];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#111111] relative z-10 border-t border-[#D4AF37]/10">
      
      {/* Background Glow */}
      <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#D4AF37]/3 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Language Cards */}
          <div className="lg:col-span-5 flex flex-col items-start text-start">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-3">
              {t('title')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F5F5] mb-6">
              {t('subtitle')}
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-[#9E9E9E] mb-8">
              {t('description')}
            </p>

            {/* Language grid selectors */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {languagesList.map((lang) => (
                <button
                  key={lang.key}
                  onMouseEnter={() => setHoveredLang(lang.key)}
                  onMouseLeave={() => setHoveredLang(null)}
                  onClick={() => setSelectedLang(lang.key)}
                  className={`flex items-center justify-between p-4 border rounded-sm transition-all duration-300 cursor-pointer ${
                    selectedLang === lang.key || hoveredLang === lang.key
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5 text-[#F5F5F5] shadow-[0_0_15px_rgba(212,175,55,0.05)]'
                      : 'border-[#D4AF37]/10 bg-[#171717]/40 text-[#9E9E9E] hover:border-[#D4AF37]/30 hover:text-[#F5F5F5]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{lang.flag}</span>
                    <span className="text-xs font-bold uppercase tracking-wider">{t(lang.key)}</span>
                  </div>
                  {selectedLang === lang.key && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: World Map Projection Canvas (SVG) */}
          <div className="lg:col-span-7 flex flex-col gap-6 items-center">
            
            {/* Elegant SVG Map Container */}
            <div className="relative w-full aspect-[16/9] border border-[#D4AF37]/10 bg-[#171717]/30 backdrop-blur-sm rounded-sm p-4 overflow-hidden shadow-2xl">
              
              {/* Map background grid representing landmass */}
              <svg className="w-full h-full text-[#9E9E9E]/10" viewBox="0 0 100 100" fill="none">
                
                {/* Lat/Long Lines */}
                <line x1="0" y1="33" x2="100" y2="33" stroke="rgba(212,175,55,0.03)" strokeWidth="0.25" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(212,175,55,0.05)" strokeWidth="0.25" />
                <line x1="0" y1="66" x2="100" y2="66" stroke="rgba(212,175,55,0.03)" strokeWidth="0.25" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(212,175,55,0.03)" strokeWidth="0.25" />

                {/* Abstract grid land dots */}
                <circle cx="20" cy="35" r="1.5" fill="currentColor" />
                <circle cx="25" cy="32" r="2.5" fill="currentColor" />
                <circle cx="28" cy="40" r="1.8" fill="currentColor" />
                <circle cx="45" cy="44" r="2" fill="currentColor" />
                <circle cx="48" cy="38" r="3" fill="currentColor" />
                <circle cx="50" cy="35" r="2.2" fill="currentColor" />
                <circle cx="55" cy="50" r="3" fill="currentColor" />
                <circle cx="62" cy="30" r="2.5" fill="currentColor" />
                <circle cx="75" cy="48" r="3" fill="currentColor" />
                <circle cx="80" cy="52" r="1.8" fill="currentColor" />

                {/* Connection lines starting from Cairo HQ (55, 50) */}
                <AnimatePresence>
                  {languagesList.map((lang) => {
                    if (lang.key === 'ar') return null; // No connection to itself
                    
                    const isHighlighted = selectedLang === lang.key || hoveredLang === lang.key;

                    return (
                      <motion.path
                        key={lang.key}
                        d={`M 55 50 Q ${(55 + lang.x) / 2} ${(50 + lang.y) / 2 - 10} ${lang.x} ${lang.y}`}
                        stroke="#D4AF37"
                        strokeWidth={isHighlighted ? 0.8 : 0.25}
                        strokeDasharray={isHighlighted ? 'none' : '2 2'}
                        opacity={isHighlighted ? 0.8 : 0.2}
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    );
                  })}
                </AnimatePresence>

                {/* Glow concentric ring on highlighted language node */}
                <circle
                  cx={activeLang.x}
                  cy={activeLang.y}
                  r="6"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="0.2"
                  className="animate-pulse"
                />
                <circle
                  cx={activeLang.x}
                  cy={activeLang.y}
                  r="3.5"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                />

                {/* Draw all city nodes */}
                {languagesList.map((lang) => {
                  const isHighlighted = selectedLang === lang.key || hoveredLang === lang.key;
                  return (
                    <circle
                      key={lang.key}
                      cx={lang.x}
                      cy={lang.y}
                      r={isHighlighted ? 1.8 : 1.2}
                      fill={isHighlighted ? '#E6C567' : '#D4AF37'}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>

              {/* Holographic Location details box */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#090909]/90 border border-[#D4AF37]/20 p-4 rounded-sm flex items-center justify-between gap-3 text-start">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-[#E6C567] tracking-wider block uppercase">
                      {activeLang.nativeName} ({t(activeLang.key)})
                    </span>
                    <span className="text-[9px] text-[#9E9E9E]">
                      {activeLang.info}
                    </span>
                  </div>
                </div>
                <Globe className="w-5 h-5 text-[#D4AF37]/30 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
