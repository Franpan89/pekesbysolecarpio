import Link from 'next/link';
import { getCategories, getSettings } from '@/lib/data/queries';
import { Logo } from '@/components/Logo';
import { PawIcon } from '@/components/icons';

export async function SiteFooter() {
  const [categories, settings] = await Promise.all([getCategories(), getSettings()]);
  const catalogLinks: [string, string][] = [
    ['/accesorios', 'Todos los accesorios'],
    ...categories.slice(0, 4).map((c): [string, string] => [`/accesorios/${c.slug}`, c.name]),
  ];

  return (
    <footer className="mt-24 border-t border-ink-200/60 bg-surface">
      <div className="container-page py-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 border-b border-ink-200/60">
        {[
          [<PawIcon key="p1" className="h-4 w-4" />, 'Atención con amor de peke a peke'],
          ['💬', 'Agenda y compra por WhatsApp'],
          ['🛁', 'Grooming profesional en Cuenca'],
          ['✨', 'Selección curada de accesorios'],
        ].map(([icon, label], i) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-primary text-base">
              {icon}
            </span>
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>

      <div className="container-page py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo size="lg" />
          <p className="mt-4 max-w-sm text-sm text-ink-600 text-pretty">
            Pet spa boutique en {settings.city}: peluquería, baño y accesorios seleccionados para
            consentir a tu peke como se merece.
          </p>
          <p className="mt-4 text-2xs text-ink-600">{settings.address}</p>
          <p className="mt-1 text-2xs text-ink-600">{settings.hours}</p>
        </div>
        <FooterCol title="Accesorios" links={catalogLinks} />
        <FooterCol
          title="Servicios"
          links={[
            ['/servicios', 'Peluquería y baño'],
            ['/servicios#agendar', 'Agendar una cita'],
            ['/sobre-nosotros', 'Sobre nosotros'],
          ]}
        />
        <FooterCol
          title="Contacto"
          links={[
            [`https://wa.me/${settings.whatsapp.number}`, 'WhatsApp'],
            [`https://instagram.com/${settings.instagram}`, `@${settings.instagram}`],
          ]}
        />
      </div>
      <div className="container-page border-t border-ink-200/60 py-6 flex flex-col sm:flex-row gap-2 items-center justify-between text-2xs text-ink-600">
        <span>© {new Date().getFullYear()} Pekes by Sole Carpio · Hecho con cariño en {settings.city}.</span>
        <span>Diseño y desarrollo: Web My Money</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="label mb-3">{title}</div>
      <ul className="space-y-2">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link href={href} className="text-sm text-ink-900/80 hover:text-primary">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
