import type { Metadata } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { Magnetic } from '@/components/motion/Magnetic';
import { PawIcon, WhatsAppIcon } from '@/components/icons';
import { getSettings } from '@/lib/data/queries';

export const metadata: Metadata = { title: 'Sobre Nosotros' };

// Copy de arranque — personaliza esta sección con la historia real de Sole
// Carpio antes de publicar el sitio.
export default async function SobreNosotrosPage() {
  const settings = await getSettings();

  return (
    <div className="container-page py-10">
      <Reveal className="max-w-2xl">
        <div className="label">Nuestra historia</div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl tracking-tight text-balance">
          Un rincón en {settings.city} para consentir a tu peke
        </h1>
        <p className="mt-4 text-ink-700 leading-relaxed text-pretty">
          Pekes by Sole Carpio nació de una idea simple: cada peke merece cuidado, paciencia y cariño de verdad.
          Combinamos peluquería y spa profesional con una selección de accesorios pensada para acompañar a tu
          compañero en cada etapa.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {[
          ['🐾', 'Trato personalizado', 'Conocemos a cada peke por su nombre y adaptamos el servicio a su temperamento.'],
          ['🧴', 'Productos de calidad', 'Shampoos hipoalergénicos y accesorios seleccionados para pieles sensibles.'],
          ['💬', 'Todo por WhatsApp', 'Agenda, pregunta y compra sin apps ni registros — como hablar con una amiga.'],
        ].map(([icon, title, body], i) => (
          <Reveal key={title} delay={i * 0.08}>
            <div className="card h-full rounded-2xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-lg">{icon}</span>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-ink-600 text-pretty">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 grid gap-8 rounded-3xl bg-primary text-white p-8 md:p-12 lg:grid-cols-[1fr_auto] lg:items-center" id="encuentranos">
        <div>
          <div className="label text-white/80">Encuéntranos</div>
          <h2 className="mt-2 font-display text-3xl tracking-tight">Visítanos en {settings.city}</h2>
          <p className="mt-3 text-white/85 max-w-md text-pretty">{settings.address}</p>
          <p className="mt-1 text-white/85">{settings.hours}</p>
        </div>
        <Magnetic>
          <a
            href={`https://wa.me/${settings.whatsapp.number}?text=${encodeURIComponent(settings.whatsapp.greeting)}`}
            target="_blank"
            rel="noopener"
            className="btn bg-secondary text-ink-900 hover:brightness-105"
          >
            <WhatsAppIcon className="h-4 w-4" /> Escríbenos por WhatsApp
          </a>
        </Magnetic>
      </Reveal>

      <Reveal className="mt-16 text-center">
        <PawIcon className="mx-auto h-8 w-8 text-secondary" />
        <p className="mt-4 font-display text-2xl tracking-tight text-balance">Tu peke merece lo mejor.</p>
        <Link href="/servicios" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
          Agenda su primera cita →
        </Link>
      </Reveal>
    </div>
  );
}
