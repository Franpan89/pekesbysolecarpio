export type IconKey =
  | 'collar'
  | 'cama'
  | 'juguete'
  | 'ropa'
  | 'higiene'
  | 'snack'
  | 'transporte';

export type ServiceIconKey = 'bano' | 'corte' | 'spa' | 'unas' | 'deslanado' | 'dental';

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: IconKey;
  tint: 'jade' | 'marigold' | 'terracotta' | 'sand';
}

export interface ProductVariant {
  id: string;
  label: string; // ej. "Talla M" o "Rosado"
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  basePrice: number;
  currency: string;
  featured: boolean;
  icon: IconKey;
  variants: ProductVariant[];
}

export type PetSize = 'pequeno' | 'mediano' | 'grande';

export interface ServicePricing {
  size: PetSize;
  price: number;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  description: string;
  durationMinutes: number;
  icon: ServiceIconKey;
  pricing: ServicePricing[];
  popular: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  petName: string;
  body: string;
  rating: number;
  placeholder?: boolean;
}

export interface HeroSlide {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface SiteSettings {
  brandName: string;
  city: string;
  whatsapp: { number: string; greeting: string };
  address: string;
  hours: string;
  instagram: string;
  heroSlides: HeroSlide[];
}
