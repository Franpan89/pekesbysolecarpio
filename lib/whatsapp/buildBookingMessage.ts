import type { Service, PetSize } from '@/lib/data/types';
import { formatDateLong, formatMoney } from '@/lib/format';

export interface BookingData {
  ownerName: string;
  phone: string;
  petName: string;
  petSize: PetSize;
  serviceIds: string[];
  date: string; // yyyy-mm-dd
  timeSlot: string;
  notes: string;
}

const SIZE_LABEL: Record<PetSize, string> = {
  pequeno: 'Pequeño (hasta 8 kg)',
  mediano: 'Mediano (8–18 kg)',
  grande: 'Grande (+18 kg)',
};

export function buildBookingMessage(data: BookingData, services: Service[]) {
  const selected = services.filter((s) => data.serviceIds.includes(s.id));
  const lines: string[] = [];
  lines.push('¡Hola Pekes! 🐾 Quiero agendar una cita:');
  lines.push('');
  lines.push(`• Mascota: ${data.petName || '—'} (${SIZE_LABEL[data.petSize]})`);
  lines.push('• Servicios:');
  let total = 0;
  for (const s of selected) {
    const price = s.pricing.find((p) => p.size === data.petSize)?.price ?? s.pricing[0].price;
    total += price;
    lines.push(`   – ${s.name} — ${formatMoney(price)} (${s.durationMinutes} min)`);
  }
  lines.push('');
  lines.push(`Total estimado: ${formatMoney(total)}`);
  lines.push('');
  lines.push(`Fecha deseada: ${data.date ? formatDateLong(data.date) : '—'}`);
  lines.push(`Franja horaria: ${data.timeSlot || '—'}`);
  lines.push('');
  lines.push('Mis datos:');
  lines.push(`• Nombre: ${data.ownerName || '—'}`);
  lines.push(`• Teléfono: ${data.phone || '—'}`);
  if (data.notes) lines.push(`• Notas: ${data.notes}`);
  lines.push('');
  lines.push('Quedo atento/a para confirmar el horario. ¡Gracias!');
  return lines.join('\n');
}

export function whatsappHref(number: string, message: string) {
  const clean = number.replace(/[^\d]/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
