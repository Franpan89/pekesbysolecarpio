import Image from 'next/image';
import { cn } from '@/lib/cn';

/**
 * Logo oficial de Pekes by Sole Carpio (public/brand/pekes-logo.png): PNG
 * recortado y con fondo transparente, pensado para fondos claros.
 */
const SIZES = { sm: 'h-10', md: 'h-16', lg: 'h-24' } as const;

export function Logo({
  className,
  size = 'md',
  priority = false,
}: {
  className?: string;
  size?: keyof typeof SIZES;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/pekes-logo.png"
      alt="Pekes by Sole Carpio"
      width={947}
      height={464}
      sizes="200px"
      priority={priority}
      className={cn(SIZES[size], 'w-auto select-none', className)}
    />
  );
}
