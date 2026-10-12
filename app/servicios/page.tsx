import type { Metadata } from 'next';
import { ServicesBooking } from '@/components/ServicesBooking';
import { Reveal } from '@/components/motion/Reveal';
import { getSettings, listServices } from '@/lib/data/queries';

export const metadata: Metadata = { title: 'Servicios y Citas' };
export const revalidate = 60;

export default async function ServiciosPage() {
  const [services, settings] = await Promise.all([listServices(), getSettings()]);

  return (
    <div className="container-page py-10">
      <Reveal className="mb-10 max-w-2xl">
        <div className="label">Peluquería · Baño · Spa</div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl tracking-tight text-balance">
          Agenda un día de spa para tu peke
        </h1>
        <p className="mt-3 text-ink-600 text-pretty">
          Elige los servicios, cuéntanos el tamaño y la fecha que prefieres, y confirmamos tu cita por WhatsApp en
          minutos. Sin pagos en línea, sin complicaciones.
        </p>
      </Reveal>

      <ServicesBooking services={services} settings={settings} />
    </div>
  );
}
