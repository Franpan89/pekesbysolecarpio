import type { MetadataRoute } from 'next';
import { getCategories, listProducts } from '@/lib/data/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pekesbysole.com';
  const [categories, products] = await Promise.all([getCategories(), listProducts()]);

  const staticRoutes = ['', '/accesorios', '/servicios', '/sobre-nosotros'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((c) => ({ url: `${base}/accesorios/${c.slug}`, lastModified: new Date() }));
  const productRoutes = products.map((p) => ({ url: `${base}/producto/${p.slug}`, lastModified: new Date() }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
