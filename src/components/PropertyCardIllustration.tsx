"use client";

/**
 * Compact property/building illustration for portfolio cards.
 * Residential buildings on dark background.
 */
export default function PropertyCardIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="pc-building" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#4c4841" />
          <stop offset="100%" stopColor="#6d665a" />
        </linearGradient>
        <linearGradient id="pc-roof" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e6906f" />
          <stop offset="100%" stopColor="#a64226" />
        </linearGradient>
        <linearGradient id="pc-window" x1="0%" y1="0%" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdf6f3" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fbece6" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Back building */}
      <path d="M50 320 L50 140 L120 100 L200 140 L200 320 Z" fill="url(#pc-building)" opacity="0.8" />
      <path d="M50 140 L120 80 L200 140 L160 140 L120 165 L80 140 Z" fill="url(#pc-roof)" opacity="0.9" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1].map((col) => (
          <rect key={`b1-${row}-${col}`} x={65 + col * 55} y={155 + row * 38} width={32} height={24} rx={2} fill="url(#pc-window)" />
        ))
      )}
      {/* Front building */}
      <path d="M180 320 L180 80 L350 120 L420 100 L420 320 Z" fill="url(#pc-building)" />
      <path d="M180 80 L280 50 L380 80 L420 100 L350 100 L280 75 L220 100 Z" fill="url(#pc-roof)" />
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2].map((col) => (
          <rect key={`b2-${row}-${col}`} x={198 + col * 68} y={130 + row * 38} width={48} height={28} rx={2} fill="url(#pc-window)" />
        ))
      )}
    </svg>
  );
}
