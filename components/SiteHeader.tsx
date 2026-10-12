'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart, cartTotals } from '@/lib/cart/store';
import { Logo } from '@/components/Logo';
import { BagIcon, MenuIcon, WhatsAppIcon } from '@/components/icons';

export function SiteHeader({ number, greeting }: { number: string; greeting?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = useCart((s) => s.items);
  const toggle = useCart((s) => s.toggle);
  const { count } = cartTotals(items);
  const whatsappHref = `https://wa.me/${number}${greeting ? `?text=${encodeURIComponent(greeting)}` : ''}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: [string, string][] = [
    ['/', 'Inicio'],
    ['/accesorios', 'Accesorios'],
    ['/servicios', 'Servicios y Citas'],
    ['/sobre-nosotros', 'Sobre Nosotros'],
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-ink-100/90 backdrop-blur border-b border-ink-200/60' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" aria-label="Inicio Pekes by Sole Carpio">
          <Logo size="md" priority />
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
          {links.map(([href, label]) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggle}
            className="relative inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 text-sm font-medium hover:bg-ink-200/40 min-h-[44px]"
            aria-label={`Abrir carrito, ${count} ${count === 1 ? 'producto' : 'productos'}`}
          >
            <BagIcon className="h-5 w-5" />
            {count > 0 && (
              <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-secondary px-1.5 text-2xs font-bold text-ink-900 tabular-nums">
                {count}
              </span>
            )}
          </button>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener"
            className="btn hidden md:inline-flex bg-whatsapp text-white hover:brightness-105 active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>

          <Link
            href="/servicios"
            className="btn-primary hidden lg:inline-flex"
          >
            Agenda tu cita
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex p-2.5 rounded-full hover:bg-ink-200/40"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-ink-200/60 bg-surface" aria-label="Menú móvil">
          <ul className="container-page py-2 grid gap-1">
            {links.map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-md px-3 py-3 text-sm font-medium hover:bg-ink-100"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/servicios"
                className="mt-1 flex items-center justify-center rounded-md bg-primary px-3 py-3 text-sm font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Agenda tu cita
              </Link>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-2 rounded-md bg-whatsapp px-3 py-3 text-sm font-medium text-white"
                onClick={() => setOpen(false)}
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-700 hover:text-primary hover:bg-ink-200/40 transition-colors"
    >
      {children}
    </Link>
  );
}
