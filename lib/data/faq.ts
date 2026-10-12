import { formatMoney } from '@/lib/format';
import { DELIVERY_FEE, PICKUP_LABEL } from '@/lib/whatsapp/buildOrderMessage';
import type { Service, SiteSettings } from './types';

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Preguntas frecuentes armadas solo con datos que el sitio ya conoce
 * (servicios, horario, tarifa de envío). Así no se desactualizan cuando se
 * cambia el tarifario o los ajustes. No agregar respuestas con políticas que
 * no estén en el sitio (cancelaciones, vacunas, métodos de pago) sin
 * confirmarlas antes con Sole.
 */
export function buildFaqs(settings: SiteSettings, services: Service[]): FaqItem[] {
  const byDuration = [...services].sort((a, b) => a.durationMinutes - b.durationMinutes);
  const shortest = byDuration[0];
  const longest = byDuration[byDuration.length - 1];

  const faqs: FaqItem[] = [
    {
      question: '¿Cómo agendo una cita?',
      answer:
        'Entra a Servicios y Citas, elige uno o más servicios, el tamaño de tu peke, la fecha y la franja que prefieras. Al enviar, se abre WhatsApp con tu solicitud ya redactada y te confirmamos la disponibilidad.',
    },
    {
      question: '¿Tengo que pagar en línea?',
      answer:
        'No. El sitio no cobra en línea: las citas y los pedidos de accesorios se coordinan por WhatsApp, y ahí acordamos el pago.',
    },
    {
      question: '¿Cómo se calcula el precio de un servicio?',
      answer:
        'Depende del tamaño de tu peke: pequeño (hasta 8 kg), mediano (8–18 kg) o grande (más de 18 kg). Al armar tu cita ves un total estimado antes de enviarla.',
    },
  ];

  if (shortest && longest) {
    faqs.push({
      question: '¿Cuánto dura cada servicio?',
      answer: `Va desde ${shortest.durationMinutes} minutos (${shortest.name}) hasta ${longest.durationMinutes} minutos (${longest.name}). Cada servicio muestra su duración en la página de Servicios y Citas.`,
    });
  }

  faqs.push(
    {
      question: '¿En qué horarios atienden?',
      answer: `Horario de atención: ${settings.hours}. Al agendar eliges la franja horaria que mejor te quede y confirmamos por WhatsApp.`,
    },
    {
      question: '¿Cómo compro los accesorios?',
      answer: `Agrega lo que te guste al carrito, elige ${PICKUP_LABEL.toLowerCase()} (sin costo) o envío en ${settings.city} (+${formatMoney(DELIVERY_FEE)}), deja tu nombre y teléfono, y se abre WhatsApp con tu pedido listo. Ahí confirmamos disponibilidad y pago.`,
    },
  );

  return faqs;
}
