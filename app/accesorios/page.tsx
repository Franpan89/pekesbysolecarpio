import type { Metadata } from 'next';
import { CategoryPills } from '@/components/CategoryPills';
import { ProductGrid } from '@/components/ProductGrid';
import { Reveal } from '@/components/motion/Reveal';
import { getCategories, listProducts } from '@/lib/data/queries';

export const metadata: Metadata = { title: 'Accesorios' };
export const revalidate = 60;

export default async function CatalogoPage() {
  const [categories, products] = await Promise.all([getCategories(), listProducts()]);

  return (
    <div className="container-page py-10">
      <Reveal className="mb-6">
        <div className="label">Tienda</div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl tracking-tight">Accesorios para tu peke</h1>
        <p className="mt-2 max-w-xl text-ink-600 text-pretty">
          Ropa, correas, camas, juguetes e higiene seleccionados con cariño. Compra y coordina la entrega por WhatsApp.
        </p>
      </Reveal>
      <CategoryPills categories={categories} />
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
