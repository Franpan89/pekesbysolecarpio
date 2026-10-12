import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/ProductDetail';
import { ProductGrid } from '@/components/ProductGrid';
import { Reveal } from '@/components/motion/Reveal';
import { getCategoryBySlug, getProductBySlug, getSettings, listProducts } from '@/lib/data/queries';

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product?.name ?? 'Producto' };
}

export default async function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [category, settings, related] = await Promise.all([
    getCategoryBySlug(product.categorySlug),
    getSettings(),
    listProducts({ categorySlug: product.categorySlug }),
  ]);

  const relatedFiltered = related.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="container-page py-10">
      <ProductDetail product={product} category={category} whatsappNumber={settings.whatsapp.number} />

      {relatedFiltered.length > 0 && (
        <section className="mt-24">
          <Reveal className="mb-6">
            <div className="label">También te puede gustar</div>
            <h2 className="mt-2 font-display text-2xl md:text-3xl tracking-tight">Combina su look</h2>
          </Reveal>
          <ProductGrid products={relatedFiltered} className="grid-cols-2 lg:grid-cols-4" />
        </section>
      )}
    </div>
  );
}
