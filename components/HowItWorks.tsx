import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { Magnetic } from '@/components/motion/Magnetic';
import { ArrowIcon, CalendarIcon, PawIcon, WhatsAppIcon } from '@/components/icons';

const STEPS = [
  {
    icon: CalendarIcon,
    title: 'Elige el servicio',
    body: 'Selecciona baño, corte o spa, el tamaño de tu peke y la fecha que prefieras. Ves el total estimado al instante.',
  },
  {
    icon: WhatsAppIcon,
    title: 'Confirma por WhatsApp',
    body: 'Se abre el chat con tu cita ya redactada y te confirmamos la disponibilidad en minutos.',
  },
  {
    icon: PawIcon,
    title: 'Llega con tu peke',
    body: 'Preséntate en la hora acordada y nosotros nos encargamos de consentirlo.',
  },
];

export function HowItWorks() {
  return (
    <section className="container-page mb-20" aria-labelledby="how-title">
      <div className="rounded-3xl bg-accent/70 px-6 py-10 md:px-12 md:py-14">
        <Reveal className="max-w-xl">
          <div className="label">Así de fácil</div>
          <h2 id="how-title" className="mt-2 font-display text-3xl md:text-4xl tracking-tight text-balance">
            Agenda en 3 pasos
          </h2>
        </Reveal>

        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <li className="relative h-full rounded-2xl bg-surface p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-4xl font-medium leading-none text-mint" aria-hidden>
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-1.5 text-sm text-ink-600 text-pretty">{body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-8">
          <Magnetic>
            <Link href="/servicios" className="btn-primary">
              Agendar ahora
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
