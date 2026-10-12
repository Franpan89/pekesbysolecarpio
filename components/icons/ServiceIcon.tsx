import type { ServiceIconKey } from '@/lib/data/types';

const STROKE = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export function ServiceIcon({ icon, className }: { icon: ServiceIconKey; className?: string }) {
  switch (icon) {
    case 'bano':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <path {...STROKE} d="M7 26h34v4a9 9 0 0 1-9 9H16a9 9 0 0 1-9-9Z" />
          <path {...STROKE} d="M12 26v-9a6 6 0 0 1 10.4-4M39 26v-2" />
          <path {...STROKE} d="M12 39v3M33 39v3" />
          <circle cx="31" cy="12" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="35" cy="17" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'corte':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <circle cx="12" cy="14" r="4" {...STROKE} />
          <circle cx="12" cy="34" r="4" {...STROKE} />
          <path {...STROKE} d="M15.2 16.6 38 34M38 14 15.2 31.4" />
        </svg>
      );
    case 'spa':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <path
            {...STROKE}
            d="M24 8c1 4 3 6 7 7-4 1-6 3-7 7-1-4-3-6-7-7 4-1 6-3 7-7Z"
          />
          <ellipse cx="20" cy="33" rx="8.5" ry="6.5" {...STROKE} />
          <ellipse cx="12" cy="27.5" rx="2.6" ry="3.2" transform="rotate(-16 12 27.5)" {...STROKE} />
          <ellipse cx="28.5" cy="27.5" rx="2.6" ry="3.2" transform="rotate(16 28.5 27.5)" {...STROKE} />
        </svg>
      );
    case 'unas':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <ellipse cx="19" cy="30" rx="9" ry="7.5" {...STROKE} />
          <ellipse cx="10.5" cy="22.5" rx="2.8" ry="3.6" transform="rotate(-18 10.5 22.5)" {...STROKE} />
          <ellipse cx="18" cy="18" rx="2.8" ry="3.8" {...STROKE} />
          <ellipse cx="25.5" cy="22.5" rx="2.8" ry="3.6" transform="rotate(18 25.5 22.5)" {...STROKE} />
          <path {...STROKE} d="M33 15 41 10M33 15l1.5 9.5M33 15l7-1.5" />
        </svg>
      );
    case 'deslanado':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <rect x="8" y="10" width="16" height="11" rx="3" {...STROKE} />
          <path {...STROKE} d="M12 21v6M16 21v8M20 21v6" />
          <path {...STROKE} d="M26 30c4 3 8 4 14 3" />
        </svg>
      );
    case 'dental':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <path
            {...STROKE}
            d="M24 10c-5 0-9 3-9 9 0 6 2 8 2.5 13 .4 3 3.5 3 4-.3.5-3.5 1.3-5.2 2.5-5.2s2 1.7 2.5 5.2c.5 3.3 3.6 3.3 4 .3.5-5 2.5-7 2.5-13 0-6-4-9-9-9Z"
          />
          <path {...STROKE} d="M30 12c2-1 3.5 1 3 3" />
        </svg>
      );
    default:
      return null;
  }
}
