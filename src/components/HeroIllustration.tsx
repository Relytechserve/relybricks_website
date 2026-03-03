"use client";

/**
 * Premium SVG illustration for property management hero.
 * Modern buildings, keys, and trust motifs — no external image dependency.
 */
export default function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Background gradient mesh */}
      <defs>
        <linearGradient id="hero-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3c160f" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#703222" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#4c4841" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="building-front" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#5a554c" />
          <stop offset="100%" stopColor="#6d665a" />
        </linearGradient>
        <linearGradient id="building-mid" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#4c4841" />
          <stop offset="100%" stopColor="#5a554c" />
        </linearGradient>
        <linearGradient id="building-back" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3c160f" />
          <stop offset="100%" stopColor="#5a554c" />
        </linearGradient>
        <linearGradient id="key-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e6906f" />
          <stop offset="100%" stopColor="#c75530" />
        </linearGradient>
        <linearGradient id="window-glow" x1="0%" y1="0%" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdf6f3" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fbece6" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Subtle background */}
      <rect width="600" height="400" fill="url(#hero-bg)" />

      {/* Back building - silhouette */}
      <path
        d="M80 220 L80 120 L140 100 L200 120 L200 220 Z"
        fill="url(#building-back)"
        opacity="0.7"
      />
      {/* Windows back building */}
      {[0, 1, 2].map((row) =>
        [0, 1].map((col) => (
          <rect
            key={`b1-${row}-${col}`}
            x={100 + col * 45}
            y={140 + row * 28}
            width={24}
            height={18}
            rx={2}
            fill="url(#window-glow)"
          />
        ))
      )}

      {/* Mid building */}
      <path
        d="M180 240 L180 80 L320 60 L380 80 L380 240 Z"
        fill="url(#building-mid)"
      />
      {/* Windows mid building - grid */}
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`b2-${row}-${col}`}
            x={198 + col * 42}
            y={95 + row * 30}
            width={28}
            height={20}
            rx={2}
            fill="url(#window-glow)"
          />
        ))
      )}

      {/* Front building - main */}
      <path
        d="M320 260 L320 60 L480 80 L520 100 L520 260 Z"
        fill="url(#building-front)"
      />
      {/* Windows front building */}
      {[0, 1, 2, 3, 4, 5].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`b3-${row}-${col}`}
            x={338 + col * 52}
            y={95 + row * 28}
            width={36}
            height={20}
            rx={2}
            fill="url(#window-glow)"
          />
        ))
      )}

      {/* Decorative key icon - property trust symbol */}
      <g transform="translate(460 260)">
        <path
          d="M0 20 C0 9 9 0 20 0 C31 0 40 9 40 20 C40 28 36 34 30 38 L30 50 L20 50 L20 38 C14 34 10 28 10 20 C10 14 13 9 18 6 L18 0 L22 0 L22 6 C27 9 30 14 30 20 C30 26 26 31 20 33 C14 31 10 26 10 20 Z"
          fill="url(#key-grad)"
          opacity="0.95"
        />
        <circle cx="20" cy="20" r="8" fill="#fdf6f3" opacity="0.9" />
      </g>

      {/* Roof accent - brick color */}
      <path
        d="M320 60 L400 45 L480 60 L520 80 L480 80 L400 65 L320 80 Z"
        fill="#c75530"
        opacity="0.5"
      />

      {/* Ground / base line */}
      <rect x="0" y="255" width="600" height="4" fill="#3c160f" opacity="0.2" />
    </svg>
  );
}
