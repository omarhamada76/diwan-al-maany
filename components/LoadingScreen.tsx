'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const sealOutlineRef = useRef<SVGPathElement>(null);
  const sealScalesRef = useRef<SVGPathElement>(null);
  const progressArcRef = useRef<SVGPathElement>(null);

  // 1. Progress tracking — pure simulated timer (no R3F Canvas context needed)
  useEffect(() => {
    let currentPercent = 0;
    const interval = setInterval(() => {
      // Accelerate at the start, slow down near 100
      const remaining = 100 - currentPercent;
      currentPercent += Math.random() * Math.max(1, remaining * 0.15) + 1;

      if (currentPercent >= 100) {
        currentPercent = 100;
        setPercent(100);
        setIsLoaded(true);
        clearInterval(interval);
        return;
      }

      setPercent(Math.floor(currentPercent));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // 2. Entrance & Exit Choreography
  useEffect(() => {
    // Disable body scroll during load
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Phase 1 (0-500ms): Stillness
      tl.to({}, { duration: 0.5 });

      // Phase 2 (500-1500ms): Gold line draws center-out (Engraving ease)
      tl.fromTo(
        lineRef.current,
        { strokeDashoffset: 500, strokeDasharray: 500 },
        {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power3.inOut',
        }
      );

      // Phase 3 (1500-3000ms): Seal draws stroke-by-stroke
      tl.fromTo(
        sealOutlineRef.current,
        { strokeDashoffset: 300, strokeDasharray: 300 },
        {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power2.inOut',
        },
        '-=0.2'
      );
      
      tl.fromTo(
        sealScalesRef.current,
        { strokeDashoffset: 200, strokeDasharray: 200 },
        {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  // 3. Update progress arc length on percent change
  useEffect(() => {
    if (progressArcRef.current) {
      const length = 110; // Approx length of bottom semi-circle arc
      const draw = (percent / 100) * length;
      gsap.to(progressArcRef.current, {
        strokeDashoffset: length - draw,
        duration: 0.3,
        ease: 'power1.out',
      });
    }
  }, [percent]);

  // 4. Settle / Exit sequence on complete
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          onComplete();
        },
      });

      // Loaded + 500ms pause, then complete pulse
      tl.to({}, { duration: 0.5 });
      
      // Pulse scale 1.0 -> 1.05 -> 1.0 (400ms)
      tl.to([sealOutlineRef.current, sealScalesRef.current, progressArcRef.current, lineRef.current], {
        scale: 1.05,
        transformOrigin: '50% 50%',
        duration: 0.2,
        ease: 'power1.out',
      });
      tl.to([sealOutlineRef.current, sealScalesRef.current, progressArcRef.current, lineRef.current], {
        scale: 1.0,
        transformOrigin: '50% 50%',
        duration: 0.2,
        ease: 'power1.in',
      });

      // Exit fade out (600ms): line contracts to 0, container fades
      tl.to(lineRef.current, {
        strokeDashoffset: 500,
        duration: 0.5,
        ease: 'power3.inOut',
      });
      
      tl.to(
        [sealOutlineRef.current, sealScalesRef.current, progressArcRef.current],
        {
          opacity: 0,
          y: -15,
          duration: 0.4,
          ease: 'power2.in',
        },
        '-=0.3'
      );

      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.1'
      );
    });

    return () => ctx.revert();
  }, [isLoaded, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#050506] flex flex-col justify-center items-center select-none"
    >
      <div 
        className="relative flex flex-col items-center justify-center w-full h-full"
        style={{ top: '11.8%' }} // Aligns elements at the 61.8% golden section point
      >
        {/* Neoclassical Vault Seal Outline Draw */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-24 h-24 text-[#C5A880] overflow-visible mb-6"
        >
          {/* Outer geometric shield/seal rim */}
          <path
            ref={sealOutlineRef}
            d="M 50 15 A 35 35 0 1 1 49.9 15 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="300"
            strokeDashoffset="300"
          />

          {/* Scales of Justice engraving silhouette */}
          <path
            ref={sealScalesRef}
            d="M 50 30 L 50 70 M 35 40 L 65 40 M 35 40 L 31 52 A 6 6 0 0 0 39 52 Z M 65 40 L 61 52 A 6 6 0 0 0 69 52 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="200"
            strokeDashoffset="200"
          />

          {/* Bottom half progress arc */}
          <path
            ref={progressArcRef}
            d="M 15 50 A 35 35 0 0 0 85 50"
            fill="none"
            stroke="#D4B896"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="110"
            strokeDashoffset="110"
          />
        </svg>

        {/* Golden Horizontal Line (Draws center-out) */}
        <svg viewBox="0 0 500 4" className="w-[30vw] h-1 overflow-visible">
          <path
            ref={lineRef}
            d="M 0 2 L 500 2"
            stroke="#C5A880"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            strokeDasharray="500"
            strokeDashoffset="500"
          />
        </svg>
      </div>
    </div>
  );
}
