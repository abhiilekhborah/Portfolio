
// Hand-drawn 4-point star / sparkle
export function DoodleStar({ size = 20, className = '', color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2 C12 7, 10 10, 2 12 C10 13, 12 16, 12 22 C13 16, 15 13, 22 12 C15 10, 13 7, 12 2 Z" />
    </svg>
  );
}

// Hand-drawn arrow pointing right
export function HandArrowRight({ size = 32, className = '', color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size * 0.4}
      viewBox="0 0 48 18"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 9 C15 7, 30 11, 44 8" />
      <path d="M36 2 C39 5, 43 7, 46 8 C42 10, 38 14, 35 16" />
    </svg>
  );
}

// Hand-drawn arrow pointing down
export function HandArrowDown({ size = 32, className = '', color = 'currentColor' }) {
  return (
    <svg
      width={size * 0.5}
      height={size}
      viewBox="0 0 20 44"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 2 C8 14, 12 28, 10 40" />
      <path d="M3 33 C6 36, 8 39, 10 42 C12 39, 15 35, 17 33" />
    </svg>
  );
}

// Curved directional scribble arrow
export function CurvedDoodleArrow({ className = '', color = 'currentColor', flip = false }) {
  return (
    <svg
      width="44"
      height="30"
      viewBox="0 0 60 40"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      className={className}
      aria-hidden="true"
    >
      <path d="M4 32 C18 36, 42 34, 52 14" />
      <path d="M41 12 C47 11, 51 12, 55 13 C53 18, 50 23, 47 28" />
    </svg>
  );
}

// Hand-drawn imperfect circle / loop
export function HandCircle({ size = 48, className = '', color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M30 6 C44 4, 55 16, 54 31 C53 45, 42 54, 27 54 C12 53, 5 41, 6 27 C7 14, 18 6, 32 6 C38 6, 48 9, 50 14" />
    </svg>
  );
}

// Hand-drawn underline stroke
export function HandUnderline({ width = 120, height = 12, className = '', color = 'currentColor' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 16"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 10 C35 6, 95 12, 158 8" />
    </svg>
  );
}

// Hand-drawn bracket
export function HandBracket({ side = 'left', height = 60, className = '', color = 'currentColor' }) {
  const isLeft = side === 'left';
  return (
    <svg
      width="20"
      height={height}
      viewBox="0 0 24 80"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: isLeft ? 'none' : 'scaleX(-1)' }}
      className={className}
      aria-hidden="true"
    >
      <path d="M18 4 C10 5, 8 16, 8 28 C8 36, 3 39, 2 40 C3 41, 8 44, 8 52 C8 64, 10 75, 18 76" />
    </svg>
  );
}

// Section number tag with sketched imperfect border
export function SectionPill({ number, label }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-paper-card border border-ink/80 rounded-full shadow-[1.5px_2px_0px_0px_#141312] text-xs font-mono font-bold tracking-wider uppercase mb-3">
      <span className="text-graphite font-semibold">{number}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-ink inline-block" />
      <span className="text-ink">{label}</span>
    </div>
  );
}

// Sketched Github Icon
export function GithubIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// Sketched LinkedIn Icon
export function LinkedinIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
