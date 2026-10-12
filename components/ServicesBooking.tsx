'use client';

import { useMemo, useState } from 'react';
import { ServiceIcon } from '@/components/icons/ServiceIcon';
import { CalendarIcon, ClockIcon, CheckIcon, WhatsAppIcon } from '@/components/icons';
import { Reveal } from '@/components/motion/Reveal';
import { buildBookingMessage, whatsappHref, type BookingData } from '@/lib/whatsapp/buildBookingMessage';
import { formatMoney } from '@/lib/format';
import { cn } from '@/lib/cn';
import type { PetSize, Service, SiteSettings } from '@/lib/data/types';

const SIZE_OPTIONS: { value: PetSize; label: string; hint: string }[] = [
  { value: 'pequeno', label: 'Pequeño', hint: 'hasta 8 kg' },
  { value: 'mediano', label: 'Mediano', hint: '8–18 kg' },
  { value: 'grande', label: 'Grande', hint: '+18 kg' },
];

const TIME_SLOTS = ['Mañana · 9:00 – 12:00', 'Tarde · 12:00 – 16:00', 'Tarde-noche · 16:00 – 19:00'];

function priceFor(service: Service, size: PetSize) {
  return service.pricing.find((p) => p.size === size)?.price ?? service.pricing[0].price;
}

function minDateStr() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function ServicesBooking({ services, settings }: { services: Service[]; settings: SiteSettings }) {
  const [petSize, setPetSize] = useState<PetSize>('mediano');
  const [selected, setSelected] = useState<string[]>([]);
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [petName, setPetName] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState('');
  const [touched, setTouched] = useState(false);

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  const total = useMemo(
    () => services.filter((s) => selected.includes(s.id)).reduce((acc, s) => acc + priceFor(s, petSize), 0),
    [services, selected, petSize],
  );

  const isValid = selected.length > 0 && ownerName.trim().length >= 2 && phone.trim().length >= 7 && date.length > 0;

  const data: BookingData = { ownerName, phone, petName, petSize, serviceIds: selected, date, timeSlot, notes };
  const message = buildBookingMessage(data, services);
  const href = whatsappHref(settings.whatsapp.number, message);

  return (
    <div className="grid gap-10">
      {/* Selector de tamaño global */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <span className="label">Tamaño de tu peke</span>
          <div className="inline-flex flex-wrap gap-2">
            {SIZE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPetSize(opt.value)}
                aria-pressed={petSize === opt.value}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  petSize === opt.value ? 'border-primary bg-primary text-white' : 'border-ink-200 bg-surface hover:border-primary',
                )}
              >
                {opt.label} <span className={cn('text-2xs', petSize === opt.value ? 'text-white/70' : 'text-ink-500')}>({opt.hint})</span>
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Grid de servicios seleccionables */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const active = selected.includes(s.id);
          return (
            <Reveal key={s.id} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => toggle(s.id)}
                aria-pressed={active}
                className={cn(
                  'group relative w-full text-left rounded-2xl border p-5 transition-all duration-300 ease-wag',
                  active ? 'border-primary bg-primary/[0.05] shadow-lift' : 'border-ink-200/70 bg-surface hover:border-primary/50 hover:-translate-y-0.5',
                )}
              >
                {s.popular && (
                  <span className="absolute -top-2.5 right-4 rounded-full bg-secondary px-2.5 py-0.5 text-2xs font-bold uppercase tracking-wide text-ink-900">
                    Popular
                  </span>
                )}
                <div className="flex items-start justify-between gap-3">
                  <div className={cn('grid h-12 w-12 flex-shrink-0 place-items-center rounded-full', active ? 'bg-primary text-white' : 'bg-accent text-primary')}>
                    <ServiceIcon icon={s.icon} className="h-6 w-6" />
                  </div>
                  <div
                    className={cn(
                      'grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border-2 transition-colors',
                      active ? 'border-primary bg-primary text-white' : 'border-ink-200 text-transparent',
                    )}
                  >
                    <CheckIcon className="h-3.5 w-3.5" />
                  </div>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{s.name}</h3>
                <p className="mt-1 text-sm text-ink-600 text-pretty">{s.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-2xs font-medium text-ink-600">
                    <ClockIcon className="h-3.5 w-3.5" /> {s.durationMinutes} min
                  </span>
                  <span className="font-display text-lg font-semibold text-primary">{formatMoney(priceFor(s, petSize))}</span>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* Formulario de agendamiento */}
      <Reveal>
        <div id="agendar" className="scroll-mt-24 rounded-3xl border border-ink-200/70 bg-surface p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="label">Paso final</span>
              <h3 className="mt-2 font-display text-2xl md:text-3xl tracking-tight">Cuéntanos de tu peke</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field id="petName" label="Nombre de tu peke" value={petName} onChange={setPetName} placeholder="Toby" />
                <Field id="ownerName" label="Tu nombre" required value={ownerName} onChange={setOwnerName} onBlur={() => setTouched(true)} error={touched && ownerName.trim().length < 2 ? 'Cuéntanos tu nombre.' : undefined} placeholder="María Pérez" />
                <Field id="phone" label="Teléfono" required value={phone} onChange={setPhone} onBlur={() => setTouched(true)} error={touched && phone.trim().length < 7 ? 'Ingresa un teléfono de contacto.' : undefined} placeholder="09xxxxxxxx" />
                <div>
                  <label htmlFor="date" className="label">
                    Fecha deseada <span className="text-danger">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <CalendarIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                    <input id="date" type="date" min={minDateStr()} value={date} onChange={(e) => setDate(e.target.value)} onBlur={() => setTouched(true)} className="input pl-10" />
                  </div>
                  {touched && !date && <p className="mt-1 text-2xs text-danger">Elige una fecha.</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="timeSlot" className="label">
                    Franja horaria preferida
                  </label>
                  <select id="timeSlot" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="input mt-1.5">
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="label">
                    Notas (opcional)
                  </label>
                  <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="input mt-1.5 min-h-[80px]" placeholder="Raza, temperamento, alergias…" />
                </div>
              </div>
            </div>

            <aside className="rounded-2xl bg-accent/60 p-6 h-fit lg:sticky lg:top-24">
              <div className="label">Resumen de tu cita</div>
              {selected.length === 0 ? (
                <p className="mt-3 text-sm text-ink-600">Selecciona uno o más servicios arriba para armar tu cita.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {services
                    .filter((s) => selected.includes(s.id))
                    .map((s) => (
                      <li key={s.id} className="flex items-center justify-between text-sm">
                        <span className="text-ink-800">{s.name}</span>
                        <span className="font-mono tabular-nums">{formatMoney(priceFor(s, petSize))}</span>
                      </li>
                    ))}
                </ul>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-primary/15 pt-4">
                <span className="label">Total estimado</span>
                <span className="font-display text-2xl font-semibold text-primary tabular-nums">{formatMoney(total)}</span>
              </div>

              {isValid ? (
                <a href={href} target="_blank" rel="noopener" className="btn-whatsapp mt-5 w-full">
                  <WhatsAppIcon className="h-4 w-4" /> Confirmar por WhatsApp
                </a>
              ) : (
                <button type="button" onClick={() => setTouched(true)} className="btn-whatsapp mt-5 w-full opacity-90">
                  <WhatsAppIcon className="h-4 w-4" /> Completa los datos
                </button>
              )}
              <p className="mt-3 text-2xs text-ink-600 text-center">Te confirmamos disponibilidad real por WhatsApp en minutos.</p>
            </aside>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  required,
  error,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        className={`input mt-1.5 ${error ? 'border-danger focus:border-danger focus:ring-danger/15' : ''}`}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-2xs text-danger">{error}</p>}
    </div>
  );
}
