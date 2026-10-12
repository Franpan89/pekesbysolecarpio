import { CategoryIcon } from '@/components/icons/CategoryIcon';
import { PawIcon } from '@/components/icons';
import type { IconKey } from '@/lib/data/types';
import { cn } from '@/lib/cn';

const TINTS: Record<string, string> = {
  jade: 'bg-mint/30 text-primary',
  marigold: 'bg-secondary/[0.2] text-terracotta',
  terracotta: 'bg-terracotta-soft/30 text-terracotta',
  sand: 'bg-accent text-primary',
};

const ICON_TINT: Record<IconKey, keyof typeof TINTS> = {
  ropa: 'jade',
  collar: 'marigold',
  cama: 'terracotta',
  juguete: 'jade',
  higiene: 'marigold',
  snack: 'terracotta',
  transporte: 'sand',
};

export function ProductIllustration({ icon, className }: { icon: IconKey; className?: string }) {
  const tint = TINTS[ICON_TINT[icon]];
  return (
    <div className={cn('relative flex items-center justify-center overflow-hidden', tint, className)}>
      <PawIcon className="absolute -left-2 -top-1 h-9 w-9 rotate-[-18deg] opacity-[0.12]" />
      <PawIcon className="absolute -right-3 bottom-2 h-12 w-12 rotate-[14deg] opacity-[0.1]" />
      <CategoryIcon icon={icon} className="relative h-[42%] w-[42%]" />
    </div>
  );
}
