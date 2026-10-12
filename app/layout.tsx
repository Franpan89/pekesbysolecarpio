import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { LazyCartDrawer } from '@/components/LazyCartDrawer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { PageTransition } from '@/components/motion/PageTransition';
import { getSettings } from '@/lib/data/queries';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pekesbysole.com';

export const metadata: Metadata = {
  title: { default: 'Pekes by Sole Carpio — Pet Spa Boutique en Cuenca', template: '%s · Pekes by Sole Carpio' },
  description:
    'Peluquería, baño y spa para tu peke, más accesorios curados con amor. Agenda tu cita o compra por WhatsApp en Cuenca, Ecuador.',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Pekes by Sole Carpio',
    description: 'Tu peke merece lo mejor: grooming boutique y accesorios en Cuenca.',
    locale: 'es_EC',
    type: 'website',
    url: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: '#F3FAF7',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'PetStore',
    name: settings.brandName,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/pekes-logo.png`,
    image: `${SITE_URL}/brand/pekes-logo.png`,
    sameAs: [`https://www.instagram.com/${settings.instagram}/`],
    areaServed: settings.city,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${settings.whatsapp.number}`,
      areaServed: 'EC',
      availableLanguage: ['es'],
    },
  };

  return (
    <html lang="es" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh flex flex-col bg-ink-100 text-ink-900">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Saltar al contenido
        </a>
        <SiteHeader number={settings.whatsapp.number} greeting={settings.whatsapp.greeting} />
        <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <LazyCartDrawer />
        <FloatingWhatsApp number={settings.whatsapp.number} greeting={settings.whatsapp.greeting} />
        <Toaster
          position="top-center"
          richColors
          toastOptions={{ style: { fontFamily: 'var(--font-jakarta)', borderRadius: '14px' } }}
        />
      </body>
    </html>
  );
}
