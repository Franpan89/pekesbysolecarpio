import Link from 'next/link';
import type { Metadata } from 'next';
import { PawIcon } from '@/components/icons';

export const metadata: Metadata = { title: '¡Gracias!' };

export default function GraciasPage() {
  return (
    <div className="container-page py-24 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-accent text-primary animate-wag">
        <PawIcon className="h-10 w-10" />
      </div>
      <h1 className="mt-6 font-display text-4xl tracking-tight">¡Gracias! 🐾</h1>
      <p className="mt-3 max-w-md mx-auto text-ink-600 text-pretty">
        Tu pedido se envió por WhatsApp. Te responderemos en minutos para confirmar disponibilidad y coordinar los
        detalles.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/accesorios" className="btn-outline">
          Seguir viendo accesorios
        </Link>
        <Link href="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
