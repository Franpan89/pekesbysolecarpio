'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { ProductIllustration } from '@/components/ProductIllustration';
import { ArrowIcon, BagIcon, WhatsAppIcon } from '@/components/icons';
import { formatMoney } from '@/lib/format';
import { useCart } from '@/lib/cart/store';
import { whatsappHref } from '@/lib/whatsapp/buildOrderMessage';
import type { Category, Product } from '@/lib/data/types';

export function ProductDetail({ product, category, whatsappNumber }: { product: Product; category: Category | null; whatsappNumber: string }) {
  const [variantId, setVariantId] = useState<string | null>(product.variants[0]?.id ?? null);
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const variant = product.variants.find((v) => v.id === variantId) ?? null;

  function handleAdd() {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variantLabel: variant?.label ?? null,
      unitPrice: product.basePrice,
      currency: product.currency,
      icon: product.icon,
    });
    toast.success(`${product.name} agregado al carrito`);
    openCart();
  }

  const waMessage = `Hola Pekes 🐾, me interesa "${product.name}"${variant ? ` (${variant.label})` : ''}. ¿Está disponible?`;
  const waHref = whatsappHref(whatsappNumber, waMessage);

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <ProductIllustration icon={product.icon} className="aspect-square rounded-3xl" />

      <div>
        {category && <div className="label text-primary">{category.name}</div>}
        <h1 className="mt-2 font-display text-3xl md:text-4xl tracking-tight text-balance">{product.name}</h1>
        <p className="mt-4 font-display text-2xl font-semibold">{formatMoney(product.basePrice, product.currency)}</p>
        <p className="mt-5 text-ink-700 leading-relaxed text-pretty">{product.description}</p>

        {product.variants.length > 0 && (
          <div className="mt-6">
            <span className="label">Opciones</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariantId(v.id)}
                  aria-pressed={variantId === v.id}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    variantId === v.id ? 'border-primary bg-primary text-white' : 'border-ink-200 hover:border-primary'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={handleAdd} className="btn-primary">
            <BagIcon className="h-4 w-4" /> Agregar al carrito
          </button>
          <a href={waHref} target="_blank" rel="noopener" className="btn-whatsapp">
            <WhatsAppIcon className="h-4 w-4" /> Preguntar por WhatsApp
          </a>
        </div>

        <a href="/accesorios" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-primary">
          <ArrowIcon className="h-3.5 w-3.5 rotate-180" /> Seguir viendo accesorios
        </a>
      </div>
    </div>
  );
}
