import React from 'react';

export default function PharaohBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.15]">
      {/* Top Left: Pharaoh Profile */}
      <svg
        className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] text-[#C5A880]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50 10 C 60 10, 65 20, 65 35 C 65 50, 70 60, 75 75 C 70 80, 50 85, 30 75 C 35 60, 40 50, 40 35 C 40 20, 45 10, 50 10 Z"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        {/* Eye of Horus simple motif */}
        <path
          d="M 45 35 Q 50 30 55 35 Q 50 40 45 35 Z"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <circle cx="50" cy="35" r="1.5" fill="currentColor" />
        {/* Headpiece lines */}
        <line x1="50" y1="10" x2="30" y2="75" stroke="currentColor" strokeWidth="0.2" />
        <line x1="55" y1="12" x2="35" y2="77" stroke="currentColor" strokeWidth="0.2" />
        <line x1="60" y1="15" x2="40" y2="80" stroke="currentColor" strokeWidth="0.2" />
        <line x1="65" y1="20" x2="45" y2="83" stroke="currentColor" strokeWidth="0.2" />
      </svg>

      {/* Right side: Hieroglyphics Pattern Column */}
      <div className="absolute top-0 right-[5%] bottom-0 w-[120px] border-l border-r border-[#C5A880]/10 flex flex-col items-center justify-around py-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <svg key={i} className="w-12 h-12 text-[#C5A880]" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1">
            {/* Ankh */}
            {i % 4 === 0 && (
              <>
                <circle cx="25" cy="15" r="8" />
                <line x1="25" y1="23" x2="25" y2="45" />
                <line x1="15" y1="30" x2="35" y2="30" />
              </>
            )}
            {/* Eye */}
            {i % 4 === 1 && (
              <>
                <path d="M 10 25 Q 25 10 40 25 Q 25 40 10 25 Z" />
                <circle cx="25" cy="25" r="4" fill="currentColor" />
                <path d="M 25 29 Q 20 40 15 45" />
              </>
            )}
            {/* Scarab */}
            {i % 4 === 2 && (
              <>
                <ellipse cx="25" cy="25" rx="8" ry="12" />
                <path d="M 17 25 C 10 25, 5 15, 5 15" />
                <path d="M 33 25 C 40 25, 45 15, 45 15" />
                <path d="M 17 25 C 10 25, 5 35, 5 35" />
                <path d="M 33 25 C 40 25, 45 35, 45 35" />
              </>
            )}
            {/* Lotus */}
            {i % 4 === 3 && (
              <>
                <path d="M 25 45 C 25 45, 10 25, 15 15 C 20 5, 25 5, 25 5 C 25 5, 30 5, 35 15 C 40 25, 25 45, 25 45 Z" />
                <line x1="25" y1="45" x2="25" y2="10" />
              </>
            )}
          </svg>
        ))}
      </div>
    </div>
  );
}
