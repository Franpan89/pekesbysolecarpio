import { ProductCard } from '@/components/ProductCard';
import { getCategories } from '@/lib/data/queries';
import type { Product } from '@/lib/data/types';
import { cn } from '@/lib/cn';

export async function ProductGrid({ products, className }: { products: Product[]; className?: string }) {
  const categories = await getCategories();
  const bySlug = new Map(categories.map((c) => [c.slug, c]));

  return (
    <div className={cn('grid gap-x-4 gap-y-8 grid-cols-2 lg:grid-cols-4', className)}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} category={bySlug.get(p.categorySlug) ?? null} />
      ))}
    </div>
  );
}
