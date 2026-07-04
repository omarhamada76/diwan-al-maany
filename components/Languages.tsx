'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, Check } from 'lucide-react';

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
    <section className="py-24 px-6 md:px-12 bg-[#09090A] relative z-10 overflow-hidden">

      {/* ── UPGRADE: Glow divider at top ── */}
      <div className="section-divider-glow absolute top-0 left-0 right-0" />

      {/* ── UPGRADE: Ambient orbs ── */}
      <div
        className="ambient-orb w-[500px] h-[500px] z-0"
        style={{ background: '#1D4ED8', top: '-10%', right: '-8%', animationDelay: '-6s' }}
      />
      <div
        className="ambient-orb-sm w-[280px] h-[280px] z-0"
        style={{ background: '#C5A880', bottom: '5%', left: '-5%', opacity: 0.07, animationDelay: '-11s' }}
      />

      {/* Background static texture & ambient glows */}
      <div className="absolute inset-0 bg-grain opacity-[0.02] mix-blend-overlay pointer-events-none z-0" />

      <div className="max-w-[1440px] mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Heading and Language Switcher */}
          <div className="lg:col-span-5 flex flex-col items-start text-start">
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
              className="text-xs md:text-sm leading-relaxed text-[#9A9590] mb-8"
            >
              {t('description')}
            </motion.p>

            {/* Language grid selectors */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {languagesList.map((lang, idx) => (
                <motion.button
                  key={lang.key}
                  initial={{ opacity: 0, y: 15, clipPath: 'inset(0 0 100% 0)' }}
                  whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredLang(lang.key)}
                  onMouseLeave={() => setHoveredLang(null)}
                  onClick={() => setSelectedLang(lang.key)}
                  className={`flex items-center justify-between p-4 border rounded-[8px] transition-all duration-300 cursor-pointer ${
                    selectedLang === lang.key || hoveredLang === lang.key
                      ? 'border-[#C5A880] bg-[#C5A880]/5 text-[#E8E4DC] shadow-[0_4px_20px_rgba(197,168,128,0.08)]'
                      : 'border-[#7A6B55]/15 bg-[#0F0F11]/90 text-[#9A9590] hover:border-[#C5A880]/30 hover:text-[#E8E4DC]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm select-none">{lang.flag}</span>
                    <span className="text-[10px] font-sans font-semibold tracking-wider uppercase">{t(lang.key)}</span>
                  </div>
                  {selectedLang === lang.key && <Check className="w-3.5 h-3.5 text-[#C5A880]" />}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Column: Holographic Projection Map Grid */}
          <div className="lg:col-span-7 flex flex-col gap-6 items-center w-full">
            
            {/* SVG Map Container with frosted glass border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[16/9] border border-[#C5A880]/15 bg-[#0F0F11]/40 backdrop-blur-md rounded-[16px] p-4 overflow-hidden shadow-[0_0_60px_rgba(197,168,128,0.04),0_0_0_1px_rgba(197,168,128,0.08)]"
            >
              {/* Inner glow at top */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent" />
              
              <svg className="w-full h-full text-[#9A9590]/5" viewBox="0 0 100 100" fill="none">
                
                {/* Micro Latitude/Longitude Grid Lines */}
                <line x1="0" y1="33" x2="100" y2="33" stroke="rgba(197,168,128,0.03)" strokeWidth="0.25" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(197,168,128,0.05)" strokeWidth="0.25" />
                <line x1="0" y1="66" x2="100" y2="66" stroke="rgba(197,168,128,0.03)" strokeWidth="0.25" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(197,168,128,0.03)" strokeWidth="0.25" />

                {/* Abstract Dot Matrix land representation */}
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

                {/* Connection lines running outward from Cairo HQ (55, 50) */}
                <AnimatePresence>
                  {languagesList.map((lang) => {
                    if (lang.key === 'ar') return null;
                    const isHighlighted = selectedLang === lang.key || hoveredLang === lang.key;
                    return (
                      <motion.path
                        key={lang.key}
                        d={`M 55 50 Q ${(55 + lang.x) / 2} ${(50 + lang.y) / 2 - 10} ${lang.x} ${lang.y}`}
                        stroke="#C5A880"
                        strokeWidth={isHighlighted ? 0.75 : 0.25}
                        strokeDasharray={isHighlighted ? 'none' : '2 2'}
                        opacity={isHighlighted ? 0.8 : 0.2}
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                      />
                    );
                  })}
                </AnimatePresence>

                {/* ── UPGRADE: Pulsing radial glow rings on Cairo HQ ── */}
                <circle
                  cx="55" cy="50" r="8"
                  fill="none"
                  stroke="#C5A880"
                  strokeWidth="0.15"
                  className="map-ping"
                  style={{ transformOrigin: '55px 50px' }}
                />
                <circle
                  cx="55" cy="50" r="5"
                  fill="none"
                  stroke="#C5A880"
                  strokeWidth="0.2"
                  className="map-ping"
                  style={{ transformOrigin: '55px 50px', animationDelay: '0.7s' }}
                />

                {/* Concentric rings on active node */}
                <circle
                  cx={activeLang.x}
                  cy={activeLang.y}
                  r="6"
                  fill="none"
                  stroke="#C5A880"
                  strokeWidth="0.2"
                  className="animate-pulse"
                />
                <circle
                  cx={activeLang.x}
                  cy={activeLang.y}
                  r="3.5"
                  fill="none"
                  stroke="#C5A880"
                  strokeWidth="0.5"
                />

                {/* City node points */}
                {languagesList.map((lang) => {
                  const isHighlighted = selectedLang === lang.key || hoveredLang === lang.key;
                  return (
                    <circle
                      key={lang.key}
                      cx={lang.x}
                      cy={lang.y}
                      r={isHighlighted ? 1.8 : 1.2}
                      fill={isHighlighted ? '#D4B896' : '#C5A880'}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </svg>

              {/* Holographic frosted glass Location detail box */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0F0F11]/90 backdrop-blur-md border border-[#7A6B55]/20 p-4 rounded-[8px] flex items-center justify-between gap-3 text-start shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C5A880]/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-semibold text-shimmer tracking-wider block uppercase">
                      {activeLang.nativeName} ({t(activeLang.key)})
                    </span>
                    <span className="text-[9px] text-[#9A9590]">
                      {activeLang.info}
                    </span>
                  </div>
                </div>
                <Globe className="w-5 h-5 text-[#C5A880]/20 shrink-0" />
              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* ── UPGRADE: Glow divider at bottom ── */}
      <div className="section-divider-glow absolute bottom-0 left-0 right-0" />
    </section>
  );
}
