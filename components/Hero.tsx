'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Link } from '@/lib/navigation';

const LegalSeal3D = dynamic(() => import('./LegalSeal3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="absolute w-[240px] h-[240px] rounded-full border border-[#C5A880]/15 flex items-center justify-center animate-[spin_100s_linear_infinite]">
        <svg className="w-full h-full text-[#C5A880]/30" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>
      </div>
    </div>
  )
});
import EgyptianMotif from './EgyptianMotif';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const t = useTranslations('Hero');
  const tCommon = useTranslations('Common');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sealContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track cursor movement for ambient diagonal glows
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 45; // Smooth lag offset
      const y = (clientY / innerHeight - 0.5) * 45;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 1. GSAP ENTRANCE ANIMATION (Triggered on loader vault opening)
  useEffect(() => {
    const playIntro = () => {
      const lineState = { sag: 50 }; // Starts straight (50px in 100px SVG viewbox height)

      const introTl = gsap.timeline();

      // Set initial layout offsets
      gsap.set(sealContainerRef.current, { y: 120, opacity: 0, scale: 1.0 });
      gsap.set('.title-reveal-line', { y: '105%', rotate: 1.5 });
      gsap.set('.intro-fade-item', { opacity: 0, y: 15 });
      gsap.set('#tension-wire', { attr: { d: 'M 0 50 Q 500 50 1000 50' } });

      // Phase 1: Draw gold centerline (1.2s duration)
      introTl.fromTo('#tension-wire-svg', 
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          transformOrigin: 'center',
          duration: 1.2,
          ease: 'power3.inOut',
        }
      );

      // Phase 2: Solar rise of 3D Seal (glides from translateY(120px), 2s duration)
      introTl.to(sealContainerRef.current, {
        y: 0,
        opacity: 1,
        duration: 2.0,
        ease: 'cubic-bezier(0.25, 1, 0.3, 1)',
      }, '+=0.2');

      // Phase 3: Wire sag settles to 56 (8px Bezier sag) as the seal settles
      introTl.to(lineState, {
        sag: 56,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          const wire = document.getElementById("tension-wire");
          if (wire) wire.setAttribute("d", `M 0 50 Q 500 ${lineState.sag} 1000 50`);
        }
      }, '-=1.2');

      // Phase 4: Staggered reveal of headlines (LineReveal clip-path)
      introTl.to('.title-reveal-line', {
        y: 0,
        rotate: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
      }, '-=0.8');

      // Phase 5: Staggered reveal of paragraph and button CTAs
      introTl.to('.intro-fade-item', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.5');
    };

    window.addEventListener('vault-opened', playIntro);
    
    // Play immediately if loading was completed or bypassed
    if (document.body.style.overflow !== 'hidden') {
      playIntro();
    }

    return () => window.removeEventListener('vault-opened', playIntro);
  }, []);

  // 2. GSAP SCROLL-LINKED DOCKING TIMELINE (scrubbed ScrollTrigger)
  useEffect(() => {
    const initScrollTrigger = () => {
      const lineState = { sag: 56 };

      const dockTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1.2,
          pin: true,
          invalidateOnRefresh: true,
        }
      });

      // Fade out and translate down typography text elements
      dockTl.to(textContainerRef.current, {
        opacity: 0,
        y: 40,
        ease: 'power2.inOut',
      }, 0);

      // Docking transition of 3D Seal to Navbar center target slot
      dockTl.to(sealContainerRef.current, {
        y: () => {
          const innerH = window.innerHeight;
          // Maps canvas center to navbar center slot (approx 44px from top)
          return -innerH * 0.5 + 46;
        },
        scale: 0.11, // scales the 440px model container to fit the 48px target circle
        ease: 'power3.inOut',
      }, 0);

      // Flatten wire sag back to straight
      dockTl.to(lineState, {
        sag: 50,
        ease: 'power2.inOut',
        onUpdate: () => {
          const wire = document.getElementById("tension-wire");
          if (wire) wire.setAttribute("d", `M 0 50 Q 500 ${lineState.sag} 1000 50`);
        }
      }, 0);

      // Fade and shrink horizontal line
      dockTl.to('#tension-wire-svg', {
        scaleX: 0,
        opacity: 0,
        transformOrigin: 'center',
        ease: 'power2.inOut',
      }, 0);
    };

    window.addEventListener('vault-opened', initScrollTrigger);

    if (document.body.style.overflow !== 'hidden') {
      initScrollTrigger();
    }

    return () => {
      window.removeEventListener('vault-opened', initScrollTrigger);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // 3. WIRE PHYSICAL INTERACTIVE SAG/VIBRATION ON HOVER
  const triggerWireVibration = () => {
    const lineState = { sag: 56 };
    
    // Lift the 3D Seal slightly via the hover-wrapper
    gsap.to('#seal-hover-wrapper', {
      y: -10,
      duration: 0.35,
      ease: 'power2.out',
    });

    // Straighten line and vibrate with elastic decay sine-wave (400ms duration)
    gsap.killTweensOf(lineState);
    gsap.fromTo(lineState,
      { sag: 56 },
      {
        sag: 50,
        duration: 0.45,
        ease: 'elastic.out(1.2, 0.3)',
        onUpdate: () => {
          const wire = document.getElementById("tension-wire");
          if (wire) wire.setAttribute("d", `M 0 50 Q 500 ${lineState.sag} 1000 50`);
        }
      }
    );
  };

  const resetWireSag = () => {
    const lineState = { sag: 50 };

    // Lower the 3D Seal back to resting position
    gsap.to('#seal-hover-wrapper', {
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Sag centerline back to its 8px gravity sag
    gsap.killTweensOf(lineState);
    gsap.to(lineState, {
      sag: 56,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        const wire = document.getElementById("tension-wire");
        if (wire) wire.setAttribute("d", `M 0 50 Q 500 ${lineState.sag} 1000 50`);
      }
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[140vh] bg-[#050506] overflow-hidden select-none"
    >
      {/* Sticky Hero Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        
        {/* ── MOTIONSITES UPGRADE: 3 Cinematic Ambient Orbs ── */}
        {/* Purple orb — upper left */}
        <div
          className="ambient-orb w-[700px] h-[700px] z-0"
          style={{
            background: '#6D28D9',
            top: '-10%',
            left: '-8%',
            animationDelay: '0s',
          }}
        />
        {/* Blue orb — lower right */}
        <div
          className="ambient-orb-reverse w-[500px] h-[500px] z-0"
          style={{
            background: '#26619C', // Lapis Lazuli Blue
            bottom: '-5%',
            right: '-5%',
            animationDelay: '-7s',
          }}
        />
        {/* Gold orb — center, subtle warmth */}
        <div
          className="ambient-orb-sm w-[350px] h-[350px] z-0"
          style={{
            background: '#C5A880',
            top: '40%',
            left: '50%',
            transform: 'translateX(-50%)',
            animationDelay: '-3s',
          }}
        />

        {/* Dynamic Background washes (mouse-tracked) */}
        <motion.div 
          className="absolute top-[15%] left-[15%] w-[600px] h-[600px] rounded-full bg-[#131722]/30 blur-[140px] pointer-events-none z-0"
          style={{ x: mousePos.x, y: mousePos.y }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] rounded-full bg-[#7A6B55]/4 blur-[130px] pointer-events-none z-0"
          style={{ x: -mousePos.x, y: -mousePos.y }}
        />

        {/* Scanline micro-texture */}
        <div className="absolute inset-0 scanline-overlay pointer-events-none z-0 opacity-40" />

        {/* Static Papyrus/Stone Grain Layer */}
        <div className="absolute inset-0 bg-grain opacity-[0.025] mix-blend-overlay pointer-events-none z-0" />

        {/* Egyptian Motif Watermark */}
        <EgyptianMotif type="sun-disk" className="absolute top-[15%] right-[20%] w-[500px] h-[500px] opacity-[0.03] pointer-events-none z-0" />

        {/* Subtle vertical dividing guidelines (Museum/Agency aesthetic) */}
        <div className="absolute left-[25%] top-0 bottom-0 w-[1px] bg-[#7A6B55]/5 pointer-events-none hidden lg:block" />
        <div className="absolute left-[75%] top-0 bottom-0 w-[1px] bg-[#7A6B55]/5 pointer-events-none hidden lg:block" />

        {/* Global Central Horizontal Line (Tensioned Wire Centerline) */}
        <div className="absolute left-[10%] right-[10%] top-[57%] -translate-y-[50%] z-10 pointer-events-none">
          <svg id="tension-wire-svg" viewBox="0 0 1000 100" fill="none" className="w-full overflow-visible">
            <defs>
              {/* LTR: Fades out on the left (text), visible on the right (seal) */}
              <linearGradient id="wire-gradient-ltr" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C5A880" stopOpacity="0" />
                <stop offset="42%" stopColor="#C5A880" stopOpacity="0" />
                <stop offset="65%" stopColor="#C5A880" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#C5A880" stopOpacity="0.25" />
              </linearGradient>

              {/* RTL: Visible on the left (seal), fades out on the right (text) */}
              <linearGradient id="wire-gradient-rtl" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C5A880" stopOpacity="0.25" />
                <stop offset="35%" stopColor="#C5A880" stopOpacity="0.25" />
                <stop offset="58%" stopColor="#C5A880" stopOpacity="0" />
                <stop offset="100%" stopColor="#C5A880" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              id="tension-wire"
              d="M 0 50 Q 500 56 1000 50"
              strokeWidth="0.8"
            />
          </svg>
        </div>

        {/* Asymmetrical Column Grid Layout */}
        <div className="max-w-[1440px] w-full mx-auto px-8 md:px-[80px] grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-20 relative">
          
          {/* Left Column: Editorial & Paragraph (Route-isolated active language) */}
          <div 
            ref={textContainerRef}
            className="col-span-12 md:col-span-7 flex flex-col items-start text-start"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#C5A880]/30 bg-[#0F0F11]/90 backdrop-blur-md mb-6 intro-fade-item">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
              <span className="text-[9px] font-sans font-semibold tracking-[0.25em] text-[#D4B896] uppercase">
                {tCommon('tagline')}
              </span>
            </div>

            {/* Display Title - Serif Font with clip-mask Line reveals */}
            <h1 className="text-egyptian-heading text-4xl sm:text-5xl md:text-6xl text-[#E8E4DC] tracking-tight leading-[1.05] mb-6">
              <span className="inline-block overflow-hidden block">
                <span className="title-reveal-line block origin-left">
                  {t('titleLine1')}
                </span>
              </span>
              <br />
              <span className="inline-block overflow-hidden block">
                {/* ── UPGRADE: shimmer sweep on the gold accent line ── */}
                <span className="title-reveal-line text-shimmer-slow font-light block origin-left">
                  {t('titleLine2')}
                </span>
              </span>
            </h1>

            {/* Subtitle - Neutral Font */}
            <p className="text-xs md:text-sm leading-relaxed text-[#9A9590] max-w-xl mb-10 intro-fade-item">
              {t('subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-6 intro-fade-item">
              <Link
                href="/#contact"
                className="group relative flex items-center justify-center gap-3 px-8 py-3.5 border border-[#C5A880]/80 text-[#C5A880] text-xs font-semibold uppercase tracking-widest rounded-full overflow-hidden hover:shadow-[0_4px_24px_rgba(197,168,128,0.15)] hover:-translate-y-0.5 transition-all duration-300 hover:bg-[#C5A880]/5"
              >
                <span>{tCommon('requestQuote')}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/#services"
                className="group flex items-center justify-center gap-2 text-[#E8E4DC]/80 hover:text-[#C5A880] text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
              >
                <span>{tCommon('explore')}</span>
                <span className="block w-1.5 h-1.5 rounded-full bg-[#C5A880] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </div>

          {/* Right Column: WebGL Scale of Justice (Occupies 5 columns) */}
          <div 
            className="col-span-12 md:col-span-5 flex justify-center items-center relative min-h-[350px] md:min-h-[480px] z-10"
          >
            <div
              ref={sealContainerRef}
              className="w-full max-w-[460px] h-[300px] md:h-[440px] relative"
            >
              <div
                id="seal-hover-wrapper"
                onMouseEnter={triggerWireVibration}
                onMouseLeave={resetWireSag}
                className="w-full h-full cursor-grab active:cursor-grabbing relative"
              >
                <LegalSeal3D />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
