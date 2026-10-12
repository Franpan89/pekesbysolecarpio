import Link from 'next/link';
import { PawIcon } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-accent text-primary">
        <PawIcon className="h-10 w-10" />
      </div>
      <h1 className="mt-6 font-display text-4xl tracking-tight">Esta página se escapó a pasear</h1>
      <p className="mt-3 max-w-md mx-auto text-ink-600 text-pretty">
        No encontramos lo que buscabas. Vuelve al inicio o explora nuestros accesorios y servicios.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Volver al inicio
        </Link>
        <Link href="/accesorios" className="btn-outline">
          Ver accesorios
        </Link>
      </div>
    </div>
  );
}
