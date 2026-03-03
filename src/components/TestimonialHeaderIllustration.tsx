"use client";

/**
 * Horizontal property building silhouette for testimonial card headers.
 */
export default function TestimonialHeaderIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="th-building" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#5a554c" />
          <stop offset="100%" stopColor="#6d665a" />
        </linearGradient>
        <linearGradient id="th-roof" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c75530" />
          <stop offset="100%" stopColor="#893823" />
        </linearGradient>
        <linearGradient id="th-window" x1="0%" y1="0%" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdf6f3" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fbece6" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Sky gradient */}
      <rect width="600" height="256" fill="url(#th-building)" opacity="0.15" />
      {/* Buildings row */}
      <path d="M0 256 L0 120 L70 80 L120 100 L120 256 Z" fill="url(#th-building)" opacity="0.9" />
      <path d="M0 120 L60 90 L120 120 L90 120 L60 105 L30 120 Z" fill="url(#th-roof)" />
      <rect x="20" y="140" width="35" height="45" rx="2" fill="url(#th-window)" />
      <rect x="65" y="140" width="35" height="45" rx="2" fill="url(#th-window)" />
      <path d="M100 256 L100 80 L220 50 L280 70 L280 256 Z" fill="url(#th-building)" />
      <path d="M100 80 L160 55 L220 80 L280 70 L220 70 L160 60 L120 80 Z" fill="url(#th-roof)" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <rect key={`t1-${row}-${col}`} x={115 + col * 50} y={100 + row * 40} width={38} height={28} rx="2" fill="url(#th-window)" />
        ))
      )}
      <path d="M260 256 L260 60 L400 100 L460 80 L460 256 Z" fill="url(#th-building)" opacity="0.95" />
      <path d="M260 60 L330 35 L400 60 L460 80 L400 80 L330 55 L290 70 Z" fill="url(#th-roof)" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <rect key={`t2-${row}-${col}`} x={278 + col * 55} y={95 + row * 42} width={42} height={30} rx="2" fill="url(#th-window)" />
        ))
      )}
      <path d="M440 256 L440 100 L560 70 L600 90 L600 256 Z" fill="url(#th-building)" opacity="0.85" />
      <path d="M440 100 L500 80 L560 100 L600 90 L560 90 L500 85 L460 100 Z" fill="url(#th-roof)" />
      <rect x="458" y="125" width="40" height="50" rx="2" fill="url(#th-window)" />
      <rect x="510" y="125" width="40" height="50" rx="2" fill="url(#th-window)" />
    </svg>
  );
}
