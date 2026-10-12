'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ProductIllustration } from '@/components/ProductIllustration';
import { PlusIcon } from '@/components/icons';
import type { Category, Product } from '@/lib/data/types';
import { formatMoney } from '@/lib/format';
import { useCart } from '@/lib/cart/store';

export function ProductCard({ product, category }: { product: Product; category?: Category | null }) {
  const add = useCart((s) => s.add);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variantLabel: null,
      unitPrice: product.basePrice,
      currency: product.currency,
      icon: product.icon,
    });
    toast.success(`${product.name} agregado al carrito`);
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
      <Link href={`/producto/${product.slug}`} className="group block" aria-label={`Ver ${product.name}`}>
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <ProductIllustration
            icon={product.icon}
            className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {product.featured && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-2xs font-bold uppercase tracking-wider text-ink-900">
              Favorito
            </span>
          )}

          <button
            type="button"
            onClick={quickAdd}
            aria-label={`Agregar ${product.name} al carrito`}
            className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-primary text-white shadow-lift
                       translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                       transition-all duration-300 ease-wag
                       hover:bg-secondary hover:text-ink-900 hover:scale-110 active:scale-95"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {category && <div className="text-2xs font-semibold uppercase tracking-wider text-ink-600">{category.name}</div>}
            <h3 className="mt-0.5 font-display text-base font-medium leading-snug tracking-tight text-balance line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="flex-shrink-0 text-right tabular-nums">
            <div className="font-display text-base font-semibold leading-none">{formatMoney(product.basePrice)}</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
