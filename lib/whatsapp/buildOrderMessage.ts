import type { CartItem, CustomerData } from '@/lib/cart/store';
import { formatMoney } from '@/lib/format';

export const DELIVERY_FEE = 3;
export const PICKUP_LABEL = 'Retiro en tienda';

export function buildOrderMessage(items: CartItem[], data: CustomerData) {
  const lines: string[] = [];
  lines.push('¡Hola Pekes! 🐾 Quiero hacer este pedido:');
  lines.push('');
  for (const it of items) {
    const suffix = it.variantLabel ? ` (${it.variantLabel})` : '';
    lines.push(`• ${it.name}${suffix} x${it.quantity} — ${formatMoney(it.unitPrice, it.currency)} c/u`);
  }
  const subtotal = items.reduce((a, i) => a + i.unitPrice * i.quantity, 0);
  const isDelivery = data.delivery === 'delivery';
  const shipping = isDelivery ? DELIVERY_FEE : 0;
  const total = subtotal + shipping;

  lines.push('');
  lines.push(`Subtotal: ${formatMoney(subtotal)}`);
  lines.push(isDelivery ? `Envío en Cuenca: ${formatMoney(shipping)}` : `${PICKUP_LABEL}: gratis`);
  lines.push(`Total: ${formatMoney(total)}`);
  lines.push('');
  lines.push('Mis datos:');
  if (data.name) lines.push(`• Nombre: ${data.name}`);
  if (data.phone) lines.push(`• Teléfono: ${data.phone}`);
  lines.push(`• Entrega: ${isDelivery ? 'Envío a domicilio en Cuenca' : PICKUP_LABEL}`);
  if (data.notes) lines.push(`• Notas: ${data.notes}`);
  lines.push('');
  lines.push('¡Gracias! Quedo atento/a para coordinar el pago y la entrega.');
  return lines.join('\n');
}

export function whatsappHref(number: string, message: string) {
  const clean = number.replace(/[^\d]/g, '');
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
