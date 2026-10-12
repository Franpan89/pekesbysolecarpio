'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Magnetic } from '@/components/motion/Magnetic';
import { ServiceIcon } from '@/components/icons/ServiceIcon';
import { ArrowIcon, PawIcon, WhatsAppIcon } from '@/components/icons';
import type { HeroSlide } from '@/lib/data/types';

const AUTOPLAY_MS = 6000;

export function HeroSection({ slides, whatsappNumber }: { slides: HeroSlide[]; whatsappNumber: string }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (slides.length < 2 || reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [slides.length, reduce]);

  const slide = slides[index];

  return (
    <section className="relative">
      <div className="container-page pt-6 pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-white">
          <div className="absolute inset-0 bg-sunny-mesh" aria-hidden />
          <div className="absolute inset-0 bg-paper-grain" aria-hidden />

          {/* Decoración: paw prints y blobs flotantes */}
          <PawIcon className="pointer-events-none absolute left-[6%] top-[18%] h-8 w-8 text-secondary/40 animate-float" aria-hidden />
          <PawIcon className="pointer-events-none absolute left-[16%] top-[62%] h-5 w-5 text-white/25 animate-float [animation-delay:1.4s]" aria-hidden />
          <PawIcon className="pointer-events-none absolute right-[10%] top-[12%] h-6 w-6 text-white/20 animate-float [animation-delay:0.8s]" aria-hidden />
          <div
            className="pointer-events-none absolute -right-16 -bottom-20 h-72 w-72 rounded-blob bg-mint/30 blur-2xl md:h-96 md:w-96"
            aria-hidden
          />
          <div className="pointer-events-none absolute right-[8%] bottom-[10%] hidden h-40 w-40 rounded-blob bg-white/10 backdrop-blur-sm md:grid place-items-center lg:right-[14%]">
            <ServiceIcon icon="spa" className="h-16 w-16 text-secondary" />
          </div>

          <div className="relative px-6 py-16 md:px-14 md:py-24 lg:py-28 max-w-2xl min-h-[380px] md:min-h-[440px] lg:min-h-[480px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                  {slide.eyebrow}
                </span>
                <h1 className="mt-5 font-display text-4xl md:text-6xl lg:text-7xl font-medium leading-[0.98] tracking-tight text-balance">
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-xl text-base md:text-lg text-white/85 text-pretty">{slide.subtitle}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Link href="/servicios" className="btn bg-secondary text-ink-900 hover:brightness-105">
                  Agenda tu cita
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/accesorios" className="btn border border-white/30 text-white hover:bg-white/10">
                  Ver accesorios
                </Link>
              </Magnetic>
              <Magnetic>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener" className="btn bg-white/10 text-white hover:bg-white/20">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              </Magnetic>
            </div>

            {slides.length > 1 && (
              <div className="mt-8 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ir a la diapositiva ${i + 1}`}
                    aria-current={i === index}
                    className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-secondary' : 'w-3 bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
