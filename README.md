# Pekes by Sole Carpio — Sitio web

Pet spa boutique en Cuenca: catálogo de accesorios con checkout por WhatsApp +
agendamiento de servicios de peluquería/baño, también resuelto por WhatsApp.
Estructura basada en el proyecto **Dapa Home** (Next.js 15 + carrito WhatsApp),
adaptada a la marca y el modelo de negocio de Pekes (sin venta de cachorros).

## Dirección de diseño

Paleta derivada del **logo oficial** (`public/brand/pekes-logo.png`): menta
`#5BBA9B` y su sombra `#B3DBD3` como color ancla, dorado de la corona `#FBA424`
para CTAs, un naranja profundo (sombras de la corona) para acentos de servicios
y un gris-verde neutro para texto sobre fondo blanco-menta. `primary` es una
versión más profunda del menta de marca (`#22775B`) para que el texto blanco en
botones y hero cumpla contraste AA; el menta exacto del logo vive en el token
`mint`. Todos los colores son variables CSS en `app/globals.css`.
Tipografía **Fraunces** (display) + **Plus Jakarta Sans** (texto). Como no había
fotografía de producto/local disponible, el catálogo usa un sistema de
ilustraciones de línea propias en vez de fotos de stock; se reemplaza
fácilmente por fotografía real más adelante.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS con tokens de marca
- Zustand para el carrito (persistido en localStorage)
- Framer Motion para microinteracciones
- Capa de datos mock (`lib/data`) con la misma forma que tendría Supabase, lista para conectar

## Estructura

```
app/
  page.tsx                    Home: hero, servicios, cómo funciona, categorías, productos, Instagram, testimonios (solo reales), FAQ
  accesorios/                 Catálogo + categoría
  producto/[slug]/            Detalle de producto con variantes
  servicios/                  Servicios de grooming + formulario de agendamiento (WhatsApp)
  carrito/                    Checkout que arma el mensaje de WhatsApp
  sobre-nosotros/             Historia, ubicación y horarios
  gracias/                    Confirmación tras pedido/cita
components/
  ProductCard, ProductGrid, ProductDetail, ProductIllustration
  ServicesBooking (grid de servicios + formulario de cita)
  CartDrawer, CartView, SiteHeader, SiteFooter, FloatingWhatsApp, Logo
  InstagramFeed (embed oficial del perfil, en el home)
  HowItWorks (3 pasos para agendar), FaqSection (acordeón + JSON-LD FAQPage)
  icons/ (CategoryIcon, ServiceIcon) — set de ilustraciones de línea propio
lib/
  data/                       types, mock.ts (contenido de arranque), queries.ts
  cart/store.ts                Zustand store
  whatsapp/                    buildOrderMessage.ts, buildBookingMessage.ts
```

## Contenido que debes reemplazar antes de publicar

Todo está marcado con comentarios `TODO` o notas en el propio código:

- **`lib/data/mock.ts`**: dirección exacta, horario, catálogo real de
  accesorios y tarifario real de servicios. (El número de WhatsApp ya es el real.)
- **`lib/data/mock.ts` → `TESTIMONIALS`**: son placeholders (`placeholder: true`) y **no se publican**: la sección "Clientes felices" del home aparece sola en cuanto agregues reseñas reales (sin esa bandera).
- **`lib/data/faq.ts`**: las preguntas frecuentes se arman con datos del sitio (tarifas, duraciones, horario, envío), así que se actualizan solas. Antes de agregar respuestas sobre cancelaciones, vacunas o métodos de pago, confirma la política real con Sole.
- **`app/opengraph-image.png`**: imagen que se ve al compartir el link (WhatsApp, Instagram, etc.), generada con el logo oficial.
- **`app/sobre-nosotros/page.tsx`**: la historia de la marca es copy de arranque; personalízala con la historia real de Sole Carpio.
- **Feed de Instagram**: usa el embed oficial de `settings.instagram` (`lib/data/mock.ts`); funciona mientras la cuenta sea pública y muestra las últimas 6 publicaciones.
- Fotografía real de local, equipo y mascotas para ir reemplazando las ilustraciones donde tenga sentido.

## Próximos pasos sugeridos

- Conectar Supabase (productos, categorías, servicios, disponibilidad de citas) reemplazando `lib/data/queries.ts` sin tocar las páginas.
- Panel admin simple para que Sole edite catálogo, precios de servicios y horarios disponibles.
- Reemplazar ilustraciones por fotografía real del local y del equipo.

## Setup

```bash
npm install
npm run dev
```

Abre http://localhost:3000.
