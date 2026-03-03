"use client";

/**
 * Property management illustration for About page.
 * Homes, keys, trust – no external image dependency.
 */
export default function AboutStoryIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="about-house" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#5a554c" />
          <stop offset="100%" stopColor="#6d665a" />
        </linearGradient>
        <linearGradient id="about-house-roof" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c75530" />
          <stop offset="100%" stopColor="#a64226" />
        </linearGradient>
        <linearGradient id="about-key" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e6906f" />
          <stop offset="100%" stopColor="#c75530" />
        </linearGradient>
        <linearGradient id="about-window" x1="0%" y1="0%" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdf6f3" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fbece6" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Left: House with roof */}
      <g transform="translate(80, 120)">
        <path d="M0 380 L0 180 L120 120 L240 180 L240 380 Z" fill="url(#about-house)" />
        <path d="M0 180 L120 80 L240 180 L180 180 L120 220 L60 180 Z" fill="url(#about-house-roof)" />
        <rect x="90" y="260" width="60" height="120" rx="4" fill="#3c160f" opacity="0.3" />
        <rect x="165" y="220" width="50" height="55" rx="2" fill="url(#about-window)" />
        <rect x="25" y="240" width="45" height="50" rx="2" fill="url(#about-window)" />
      </g>

      {/* Right: Second house (smaller, back) */}
      <g transform="translate(380, 180)">
        <path d="M0 320 L0 160 L80 120 L160 160 L160 320 Z" fill="url(#about-house)" opacity="0.85" />
        <path d="M0 160 L80 100 L160 160 L120 160 L80 190 L40 160 Z" fill="url(#about-house-roof)" opacity="0.9" />
        <rect x="55" y="220" width="50" height="100" rx="4" fill="#3c160f" opacity="0.25" />
        <rect x="25" y="200" width="35" height="40" rx="2" fill="url(#about-window)" />
      </g>

      {/* Key - property/trust symbol */}
      <g transform="translate(320, 400)">
        <circle cx="20" cy="20" r="18" fill="url(#about-key)" />
        <circle cx="20" cy="20" r="10" fill="#fdf6f3" />
        <rect x="18" y="36" width="4" height="35" rx="2" fill="url(#about-key)" />
        <rect x="12" y="65" width="16" height="8" rx="2" fill="url(#about-key)" />
      </g>

      {/* Subtle ground line */}
      <rect x="0" y="520" width="800" height="3" fill="#3c160f" opacity="0.15" />

      {/* Decorative dots - trust/care */}
      <circle cx="620" cy="140" r="8" fill="#c75530" opacity="0.4" />
      <circle cx="660" cy="180" r="6" fill="#e6906f" opacity="0.35" />
      <circle cx="700" cy="150" r="5" fill="#5a554c" opacity="0.25" />
    </svg>
  );
}
