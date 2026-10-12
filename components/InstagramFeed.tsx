import { Reveal } from '@/components/motion/Reveal';
import { Magnetic } from '@/components/motion/Magnetic';
import { InstagramIcon } from '@/components/icons';

/**
 * Feed en vivo de Instagram vía el embed oficial de perfil (sin tokens ni API):
 * muestra las publicaciones recientes y se actualiza solo. Requiere que la
 * cuenta sea pública. Si más adelante se quiere una grilla propia, se puede
 * reemplazar el iframe por la Instagram Graph API sin tocar el resto del home.
 */
export function InstagramFeed({ handle }: { handle: string }) {
  const profileUrl = `https://www.instagram.com/${handle}/`;

  return (
    <section className="container-page mb-20" aria-labelledby="instagram-title">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14">
        <Reveal>
          <div className="label">Síguenos en Instagram</div>
          <h2 id="instagram-title" className="mt-2 font-display text-3xl md:text-4xl tracking-tight text-balance">
            Del día a día en Pekes
          </h2>
          <p className="mt-3 max-w-md text-ink-600 text-pretty">
            Novedades, promos y los pekes más consentidos del spa. Todo lo que publicamos, en vivo desde @{handle}.
          </p>
          <div className="mt-6">
            <Magnetic>
              <a href={profileUrl} target="_blank" rel="noopener" className="btn-primary">
                <InstagramIcon className="h-4 w-4" /> Seguir @{handle}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-3xl border border-ink-200/70 bg-surface shadow-lift">
            <iframe
              src={`${profileUrl}embed/`}
              title={`Publicaciones recientes de @${handle} en Instagram`}
              loading="lazy"
              className="block h-[400px] w-full border-0 sm:h-[560px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
