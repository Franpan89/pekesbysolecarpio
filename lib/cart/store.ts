'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  variantLabel: string | null;
  unitPrice: number;
  currency: string;
  icon: string;
  quantity: number;
}

export type DeliveryMethod = 'pickup' | 'delivery';

export interface CustomerData {
  name: string;
  phone: string;
  notes: string;
  delivery: DeliveryMethod;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  customer: CustomerData;
  add: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setCustomer: (patch: Partial<CustomerData>) => void;
}

const keyOf = (it: { productId: string; variantLabel?: string | null }) =>
  `${it.productId}::${it.variantLabel ?? '-'}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      customer: { name: '', phone: '', notes: '', delivery: 'pickup' },
      setCustomer: (patch) => set((s) => ({ customer: { ...s.customer, ...patch } })),
      add: (item, qty = 1) =>
        set((s) => {
          const k = keyOf(item);
          const idx = s.items.findIndex((i) => keyOf(i) === k);
          if (idx >= 0) {
            const next = [...s.items];
            next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
            return { items: next, isOpen: true };
          }
          return { items: [...s.items, { ...item, quantity: qty }], isOpen: true };
        }),
      remove: (key) => set((s) => ({ items: s.items.filter((i) => keyOf(i) !== key) })),
      setQty: (key, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (keyOf(i) === key ? { ...i, quantity: Math.max(1, qty) } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: 'pekes-cart-v1',
      // isOpen es estado de UI: persistirlo reabría el drawer en cada carga.
      partialize: (s) => ({ items: s.items, customer: s.customer }),
      // Ignora cualquier isOpen guardado por versiones anteriores en localStorage.
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<Pick<CartState, 'items' | 'customer'>>;
        return { ...current, items: p.items ?? current.items, customer: p.customer ?? current.customer };
      },
    },
  ),
);

export const cartItemKey = keyOf;

export function cartTotals(items: CartItem[]) {
  const subtotal = items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);
  return { subtotal, count };
}
