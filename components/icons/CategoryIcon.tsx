import type { IconKey } from '@/lib/data/types';

const STROKE = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export function CategoryIcon({ icon, className }: { icon: IconKey; className?: string }) {
  switch (icon) {
    case 'ropa':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <path {...STROKE} d="M17 10 12 14v6h4v16h16V20h4v-6l-5-4" />
          <path {...STROKE} d="M17 10c1.8 2 3.4 3 7 3s5.2-1 7-3" />
        </svg>
      );
    case 'collar':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <path {...STROKE} d="M9 20c0 8.3 6.7 15 15 15s15-6.7 15-15" />
          <circle cx="24" cy="30" r="4" {...STROKE} />
          <path {...STROKE} d="M24 34v4" />
        </svg>
      );
    case 'cama':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <path {...STROKE} d="M6 34v-8a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v8" />
          <path {...STROKE} d="M6 34h36M9 34v4M39 34v4" />
          <path {...STROKE} d="M13 22v-3a3 3 0 1 1 6 0v3M20 22v-2a3 3 0 1 1 6 0v2" />
        </svg>
      );
    case 'juguete':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <path
            {...STROKE}
            d="M14 20a5 5 0 1 0-6.5 6.5 5 5 0 1 0 6.5 6.5l13-13a5 5 0 1 0 6.5-6.5 5 5 0 1 0-6.5-6.5Z"
          />
        </svg>
      );
    case 'higiene':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <path {...STROKE} d="M20 10h8v4l3 3v19a3 3 0 0 1-3 3H20a3 3 0 0 1-3-3V17l3-3Z" />
          <path {...STROKE} d="M20 6h8v4h-8zM20 24h8" />
          <path {...STROKE} d="M31 11c1.4 1.2 1.4 2.8 0 4M34 9c2.2 1.9 2.2 4.5 0 6.4" />
        </svg>
      );
    case 'snack':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <path
            {...STROKE}
            d="M11 20a4.2 4.2 0 1 1 6.5-5 6 6 0 0 1 13 0 4.2 4.2 0 1 1 6.5 5c1.6 1 2.6 2.7 2.6 4.7 0 4.6-6.4 12.3-12.6 15.8a4 4 0 0 1-4 0C16.8 37 10.4 29.3 10.4 24.7c0-2 1-3.7 2.6-4.7Z"
          />
        </svg>
      );
    case 'transporte':
      return (
        <svg viewBox="0 0 48 48" className={className}>
          <path {...STROKE} d="M8 18h32v18a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3Z" />
          <path {...STROKE} d="M16 18v-4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4" />
          <path {...STROKE} d="M8 27h32" />
        </svg>
      );
    default:
      return null;
  }
}
