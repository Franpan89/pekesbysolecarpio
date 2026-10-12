import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryPills } from '@/components/CategoryPills';
import { ProductGrid } from '@/components/ProductGrid';
import { Reveal } from '@/components/motion/Reveal';
import { getCategories, getCategoryBySlug, listProducts } from '@/lib/data/queries';

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }): Promise<Metadata> {
  const { categoria } = await params;
  const category = await getCategoryBySlug(categoria);
  return { title: category?.name ?? 'Accesorios' };
}

export default async function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const [categories, category, products] = await Promise.all([
    getCategories(),
    getCategoryBySlug(categoria),
    listProducts({ categorySlug: categoria }),
  ]);

  if (!category) notFound();

  return (
    <div className="container-page py-10">
      <Reveal className="mb-6">
        <div className="label">Accesorios</div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl tracking-tight">{category.name}</h1>
        <p className="mt-2 max-w-xl text-ink-600 text-pretty">{category.description}</p>
      </Reveal>
      <CategoryPills categories={categories} />
      <div className="mt-8">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="mt-10 text-ink-600">Todavía no hay productos publicados en esta categoría.</p>
        )}
      </div>
    </div>
  );
}
