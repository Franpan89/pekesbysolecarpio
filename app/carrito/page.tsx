import type { Metadata } from 'next';
import { CartView } from '@/components/CartView';
import { getSettings } from '@/lib/data/queries';

export const metadata: Metadata = { title: 'Tu carrito' };

export default async function CarritoPage() {
  const settings = await getSettings();
  return (
    <div className="container-page py-10">
      <div className="label">Paso final</div>
      <h1 className="mt-2 font-display text-4xl md:text-5xl tracking-tight">Tu carrito</h1>
      <CartView settings={settings} />
    </div>
  );
}
