'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart, cartTotals, cartItemKey } from '@/lib/cart/store';
import { formatMoney } from '@/lib/format';
import { buildOrderMessage, whatsappHref, DELIVERY_FEE, PICKUP_LABEL } from '@/lib/whatsapp/buildOrderMessage';
import { ProductIllustration } from '@/components/ProductIllustration';
import { BagIcon, WhatsAppIcon } from '@/components/icons';
import type { IconKey } from '@/lib/data/types';
import type { SiteSettings } from '@/lib/data/types';

export function CartView({ settings }: { settings: SiteSettings }) {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const setQty = useCart((s) => s.setQty);
  const clear = useCart((s) => s.clear);
  const customer = useCart((s) => s.customer);
  const setCustomer = useCart((s) => s.setCustomer);
  const { subtotal, count } = cartTotals(items);

  const router = useRouter();
  const [touched, setTouched] = useState(false);

  const isDelivery = customer.delivery === 'delivery';
  const shippingFee = isDelivery ? DELIVERY_FEE : 0;
  const total = subtotal + shippingFee;
  const isValid = customer.name.trim().length >= 2 && customer.phone.trim().length >= 7;

  const previewMsg = useMemo(() => buildOrderMessage(items, customer), [items, customer]);
  const href = whatsappHref(settings.whatsapp.number, previewMsg);

  const handleCheckout = useCallback(() => {
    window.open(href, '_blank', 'noopener,noreferrer');
    clear();
    router.push('/gracias');
  }, [href, clear, router]);

  if (count === 0) {
    return (
      <div className="mt-12 grid place-items-center text-center gap-3 rounded-2xl border border-dashed border-ink-200 py-20">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-accent text-primary">
          <BagIcon className="h-7 w-7" />
        </div>
        <p className="font-display text-2xl">Tu carrito está vacío</p>
        <p className="text-ink-600">Agrega accesorios para enviarlos por WhatsApp.</p>
        <Link href="/accesorios" className="btn-primary mt-2">
          Explorar accesorios
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] items-start">
      <section>
        <ul className="divide-y divide-ink-200/60 rounded-2xl border border-ink-200/60 bg-surface">
          {items.map((it) => {
            const k = cartItemKey(it);
            return (
              <li key={k} className="flex gap-4 p-5">
                <ProductIllustration icon={it.icon as IconKey} className="h-24 w-20 flex-shrink-0 rounded-lg" />
                <div className="flex-1">
                  <Link href={`/producto/${it.slug}`} className="font-display text-lg leading-tight hover:text-primary">
                    {it.name}
                  </Link>
                  {it.variantLabel && <div className="text-xs text-ink-600 mt-0.5">{it.variantLabel}</div>}
                  <div className="mt-3 flex items-center gap-4">
                    <div className="inline-flex items-center rounded-md border border-ink-200">
                      <button onClick={() => setQty(k, it.quantity - 1)} className="h-9 w-9 grid place-items-center text-ink-600 hover:text-primary" aria-label="Reducir cantidad">
                        −
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums">{it.quantity}</span>
                      <button onClick={() => setQty(k, it.quantity + 1)} className="h-9 w-9 grid place-items-center text-ink-600 hover:text-primary" aria-label="Aumentar cantidad">
                        +
                      </button>
                    </div>
                    <button onClick={() => remove(k)} className="text-xs text-danger hover:underline">
                      Quitar
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm tabular-nums">{formatMoney(it.unitPrice * it.quantity, it.currency)}</div>
                  <div className="text-2xs text-ink-600 mt-1">{formatMoney(it.unitPrice, it.currency)} c/u</div>
                </div>
              </li>
            );
          })}
        </ul>
        <button onClick={clear} className="mt-4 text-xs text-ink-600 hover:text-danger">
          Vaciar carrito
        </button>
      </section>

      <aside className="lg:sticky lg:top-24 self-start">
        <div className="card p-6 space-y-5">
          <div>
            <span className="label">Entrega</span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCustomer({ delivery: 'pickup' })}
                aria-pressed={customer.delivery === 'pickup'}
                className={`rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                  customer.delivery === 'pickup' ? 'border-primary bg-primary text-white' : 'border-ink-200 hover:border-ink-400'
                }`}
              >
                <div className="font-medium">{PICKUP_LABEL}</div>
                <div className={`text-2xs ${customer.delivery === 'pickup' ? 'text-white/70' : 'text-ink-600'}`}>Sin costo</div>
              </button>
              <button
                type="button"
                onClick={() => setCustomer({ delivery: 'delivery' })}
                aria-pressed={customer.delivery === 'delivery'}
                className={`rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                  customer.delivery === 'delivery' ? 'border-primary bg-primary text-white' : 'border-ink-200 hover:border-ink-400'
                }`}
              >
                <div className="font-medium">Envío en Cuenca</div>
                <div className={`text-2xs ${customer.delivery === 'delivery' ? 'text-white/70' : 'text-ink-600'}`}>+ {formatMoney(DELIVERY_FEE)}</div>
              </button>
            </div>
          </div>

          <div className="space-y-2 border-t border-ink-200/60 pt-4">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-ink-600">Subtotal</span>
              <span className="font-mono tabular-nums">{formatMoney(subtotal)}</span>
            </div>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-ink-600">{isDelivery ? 'Envío' : PICKUP_LABEL}</span>
              <span className="font-mono tabular-nums">{shippingFee > 0 ? `+ ${formatMoney(shippingFee)}` : 'Gratis'}</span>
            </div>
            <div className="flex items-baseline justify-between pt-3 border-t border-ink-200/60">
              <span className="label">Total a pagar</span>
              <span className="font-mono text-2xl tabular-nums font-semibold">{formatMoney(total)}</span>
            </div>
          </div>

          <div className="space-y-3 border-t border-ink-200/60 pt-5">
            <Field id="name" label="Nombre completo" required value={customer.name} onChange={(v) => setCustomer({ name: v })} onBlur={() => setTouched(true)} error={touched && customer.name.trim().length < 2 ? 'Cuéntanos tu nombre.' : undefined} placeholder="María Pérez" autoComplete="name" />
            <Field id="phone" label="Teléfono" required value={customer.phone} onChange={(v) => setCustomer({ phone: v })} onBlur={() => setTouched(true)} error={touched && customer.phone.trim().length < 7 ? 'Ingresa un teléfono de contacto.' : undefined} placeholder="09xxxxxxxx" autoComplete="tel" />
            <div>
              <label htmlFor="notes" className="label">
                Notas (opcional)
              </label>
              <textarea id="notes" value={customer.notes} onChange={(e) => setCustomer({ notes: e.target.value })} className="input mt-1.5 min-h-[88px]" placeholder="Color preferido, referencia de dirección…" />
            </div>
          </div>

          {isValid ? (
            <button type="button" onClick={handleCheckout} className="btn-whatsapp w-full">
              <WhatsAppIcon className="h-4 w-4" /> Finalizar por WhatsApp
            </button>
          ) : (
            <button type="button" onClick={() => setTouched(true)} className="btn-whatsapp w-full opacity-90" aria-disabled="true">
              <WhatsAppIcon className="h-4 w-4" /> Completa tus datos
            </button>
          )}
          <p className="text-2xs text-ink-600 text-center">Se abrirá WhatsApp con tu pedido pre-formateado. Confirmamos disponibilidad y pago por chat.</p>
        </div>
      </aside>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  required,
  error,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`input mt-1.5 ${error ? 'border-danger focus:border-danger focus:ring-danger/15' : ''}`}
        placeholder={placeholder}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-2xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
