import Link from 'next/link';
import { HeroSection } from '@/components/HeroSection';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductIllustration } from '@/components/ProductIllustration';
import { InstagramFeed } from '@/components/InstagramFeed';
import { HowItWorks } from '@/components/HowItWorks';
import { FaqSection } from '@/components/FaqSection';
import { Reveal } from '@/components/motion/Reveal';
import { Magnetic } from '@/components/motion/Magnetic';
import { ServiceIcon } from '@/components/icons/ServiceIcon';
import { ArrowIcon, StarIcon, WhatsAppIcon } from '@/components/icons';
import { formatMoney } from '@/lib/format';
import { buildFaqs } from '@/lib/data/faq';
import { getCategories, getSettings, listProducts, listServices, listTestimonials } from '@/lib/data/queries';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, categories, latest, services, testimonials] = await Promise.all([
    getSettings(),
    getCategories(),
    listProducts({ limit: 8 }),
    listServices(),
    listTestimonials(),
  ]);

  // Populares primero; si hay menos de 3, completa con los siguientes para no dejar columnas vacías.
  const featuredServices = [...services.filter((s) => s.popular), ...services.filter((s) => !s.popular)].slice(0, 3);
  // Las reseñas de relleno (placeholder) no se publican: la sección aparece sola cuando haya reseñas reales.
  const reviews = testimonials.filter((t) => !t.placeholder);
  const whatsappHref = `https://wa.me/${settings.whatsapp.number}?text=${encodeURIComponent(settings.whatsapp.greeting)}`;

  return (
    <>
      <HeroSection slides={settings.heroSlides} whatsappNumber={settings.whatsapp.number} />

      {/* Servicios destacados */}
      <section className="container-page mb-20 mt-4">
        <Reveal className="mb-6">
          <div className="label">Peluquería, baño y spa</div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl tracking-tight text-balance">
            Un día de spa para tu peke
          </h2>
          <p className="mt-2 max-w-xl text-ink-600 text-pretty">
            Agenda en minutos y confirmamos tu cita por WhatsApp — sin filas, sin vueltas.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {featuredServices.map((s, i) => {
            const from = Math.min(...s.pricing.map((p) => p.price));
            return (
              <Reveal key={s.id} delay={i * 0.08}>
                <Link
                  href="/servicios"
                  className="group block h-full rounded-2xl border border-ink-200/70 bg-surface p-6 transition-all duration-300 ease-wag hover:-translate-y-1 hover:border-primary/50 hover:shadow-lift"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <ServiceIcon icon={s.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{s.name}</h3>
                  <p className="mt-1.5 text-sm text-ink-600 text-pretty">{s.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xs font-semibold uppercase tracking-wider text-ink-600">
                      Desde {formatMoney(from)}
                    </span>
                    <ArrowIcon className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-6 flex justify-center">
          <Magnetic>
            <Link href="/servicios" className="btn-primary">
              Ver todos los servicios y agendar
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </Magnetic>
        </Reveal>
      </section>

      <HowItWorks />

      {/* Categorías */}
      <section className="container-page mb-20">
        <Reveal className="flex items-end justify-between mb-6">
          <div>
            <div className="label">Comprar por categoría</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl tracking-tight">Encuentra su estilo</h2>
          </div>
          <Link href="/accesorios" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Ver todo <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <Link
                href={`/accesorios/${c.slug}`}
                className="group relative block overflow-hidden rounded-2xl aspect-[5/6] lg:aspect-[6/5] transition-transform duration-300 ease-wag hover:-translate-y-1"
              >
                <ProductIllustration icon={c.icon} className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <div className="text-2xs font-bold uppercase tracking-wider text-ink-600">0{i + 1}</div>
                  <div>
                    <div className="font-display text-2xl font-medium tracking-tight text-ink-900">{c.name}</div>
                    <p className="mt-1 text-xs text-ink-600 text-pretty">{c.description}</p>
                  </div>
                </div>
                <div className="absolute bottom-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowIcon className="h-4 w-4" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Recién llegados */}
      <section className="container-page mb-20">
        <Reveal className="flex items-end justify-between mb-6">
          <div>
            <div className="label">Recién llegados</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl tracking-tight">Para consentirlo</h2>
          </div>
          <Link href="/accesorios" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Ver todos los accesorios <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
        <ProductGrid products={latest.slice(0, 8)} />
      </section>

      {/* Feed de Instagram */}
      <InstagramFeed handle={settings.instagram} />

      {/* Testimonios: solo reseñas reales */}
      {reviews.length > 0 && (
        <section className="container-page mb-20">
          <Reveal className="mb-10">
            <div className="label">Clientes felices</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl tracking-tight">Lo que dicen los pekes</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08}>
                <figure className="card p-6 flex flex-col gap-4 rounded-2xl h-full">
                  <div className="flex gap-0.5" aria-label={`${t.rating} de 5 estrellas`}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <StarIcon key={j} filled={j < t.rating} className="h-4 w-4 text-secondary" />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-ink-800 text-pretty leading-relaxed text-sm md:text-base">
                    &ldquo;{t.body}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3 pt-4 border-t border-ink-100">
                    <div className="h-10 w-10 rounded-full bg-accent grid place-items-center text-primary font-display font-semibold text-sm flex-shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{t.name}</div>
                      <div className="text-xs text-ink-600">Dueño/a de {t.petName}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <FaqSection items={buildFaqs(settings, services)} whatsappHref={whatsappHref} />

      {/* CTA WhatsApp */}
      <section className="container-page mb-20">
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary text-white p-8 md:p-14">
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-blob bg-mint/30 blur-3xl" aria-hidden />
          <div className="absolute -bottom-16 -left-10 h-72 w-72 rounded-blob bg-mint/20 blur-3xl" aria-hidden />
          <div className="relative max-w-2xl">
            <div className="label text-white/80">¿Tienes dudas?</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl leading-[1.05] tracking-tight text-balance">
              Escríbenos y te ayudamos a elegir el mejor plan para tu peke.
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="btn bg-secondary text-ink-900 hover:brightness-105"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Conversar por WhatsApp
                </a>
              </Magnetic>
              <Magnetic>
                <Link href="/sobre-nosotros" className="btn border border-white/30 text-white hover:bg-white/10">
                  Conócenos
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
