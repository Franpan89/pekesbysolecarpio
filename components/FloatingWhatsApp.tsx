'use client';

import { motion } from 'framer-motion';
import { WhatsAppIcon } from '@/components/icons';

export function FloatingWhatsApp({ number, greeting }: { number: string; greeting?: string }) {
  const href = `https://wa.me/${number}${greeting ? `?text=${encodeURIComponent(greeting)}` : ''}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Hablar por WhatsApp"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 }}
      whileHover={{ scale: 1.08, rotate: [0, -8, 8, 0] }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-pop ring-1 ring-black/5"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="sr-only">Hablar por WhatsApp</span>
    </motion.a>
  );
}
