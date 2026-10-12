import { CATEGORIES, PRODUCTS, SERVICES, SETTINGS, TESTIMONIALS } from './mock';
import type { Category, Product, Service, SiteSettings, Testimonial } from './types';

/**
 * Estas funciones simulan una capa de datos async (como si vinieran de
 * Supabase) para que las páginas ya queden listas: el día que se conecte una
 * base real, solo se reemplaza el cuerpo de cada función.
 */

export async function getSettings(): Promise<SiteSettings> {
  return SETTINGS;
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export async function listProducts(opts?: { featured?: boolean; categorySlug?: string; limit?: number }): Promise<Product[]> {
  let items = PRODUCTS;
  if (opts?.categorySlug) items = items.filter((p) => p.categorySlug === opts.categorySlug);
  if (opts?.featured) items = items.filter((p) => p.featured);
  if (opts?.limit) items = items.slice(0, opts.limit);
  return items;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function listServices(): Promise<Service[]> {
  return SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return SERVICES.find((s) => s.slug === slug) ?? null;
}

export async function listTestimonials(): Promise<Testimonial[]> {
  return TESTIMONIALS;
}
