import { Reveal } from '@/components/motion/Reveal';
import { PlusIcon, WhatsAppIcon } from '@/components/icons';
import type { FaqItem } from '@/lib/data/faq';

/**
 * Acordeón con <details> nativo (sin JS, accesible por teclado) + JSON-LD
 * FAQPage para que Google pueda mostrar las respuestas en los resultados.
 */
export function FaqSection({ items, whatsappHref }: { items: FaqItem[]; whatsappHref: string }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <section className="container-page mb-20" aria-labelledby="faq-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }}
      />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
        <Reveal>
          <div className="label">Preguntas frecuentes</div>
          <h2 id="faq-title" className="mt-2 font-display text-3xl md:text-4xl tracking-tight text-balance">
            Lo que más nos preguntan
          </h2>
          <p className="mt-3 max-w-sm text-ink-600 text-pretty">
            ¿Algo más? Escríbenos y te respondemos por WhatsApp.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <WhatsAppIcon className="h-4 w-4" /> Preguntar por WhatsApp
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-3">
            {items.map((f) => (
              <details
                key={f.question}
                className="group rounded-2xl border border-ink-200/70 bg-surface px-5 py-4 transition-colors open:border-primary/40 open:shadow-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-medium leading-snug [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <PlusIcon className="h-4 w-4 flex-shrink-0 text-primary transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600 text-pretty md:text-base">{f.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
