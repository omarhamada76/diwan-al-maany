import React from 'react';

interface MotifProps {
  className?: string;
  type?: 'lotus' | 'sun-disk' | 'corner';
}

export default function EgyptianMotif({ className = '', type = 'lotus' }: MotifProps) {
  if (type === 'lotus') {
    return (
      <svg 
        className={`pointer-events-none ${className}`} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M50 100 C 50 100, 20 60, 20 40 C 20 20, 50 10, 50 10 C 50 10, 80 20, 80 40 C 80 60, 50 100, 50 100 Z" stroke="var(--color-gold)" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M50 100 C 50 100, 35 60, 35 30 C 35 15, 50 5, 50 5 C 50 5, 65 15, 65 30 C 65 60, 50 100, 50 100 Z" stroke="var(--color-gold)" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="50" y1="100" x2="50" y2="5" stroke="var(--color-gold)" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M50 90 C 50 90, 10 70, 5 45 C 0 20, 20 20, 20 20 C 20 20, 30 50, 50 90 Z" stroke="var(--color-gold)" strokeWidth="1" strokeOpacity="0.2" />
        <path d="M50 90 C 50 90, 90 70, 95 45 C 100 20, 80 20, 80 20 C 80 20, 70 50, 50 90 Z" stroke="var(--color-gold)" strokeWidth="1" strokeOpacity="0.2" />
      </svg>
    );
  }

  if (type === 'sun-disk') {
    return (
      <svg 
        className={`pointer-events-none ${className}`} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="30" stroke="var(--color-gold)" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="50" cy="50" r="28" stroke="var(--color-gold)" strokeWidth="0.5" strokeOpacity="0.2" />
        <path d="M10 50 H 90" stroke="var(--color-gold)" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M50 10 V 90" stroke="var(--color-gold)" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M20 50 Q 50 80 80 50" stroke="var(--color-gold)" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M20 50 Q 50 20 80 50" stroke="var(--color-gold)" strokeWidth="1" strokeOpacity="0.3" />
      </svg>
    );
  }

  // Corner Motif
  return (
    <svg 
      className={`pointer-events-none ${className}`} 
      viewBox="0 0 50 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 0 0 L 50 0 L 50 5 L 5 5 L 5 50 L 0 50 Z" fill="var(--color-gold)" fillOpacity="0.5" />
      <path d="M 10 10 L 40 10 L 40 12 L 12 12 L 12 40 L 10 40 Z" fill="var(--color-gold)" fillOpacity="0.3" />
    </svg>
  );
}
