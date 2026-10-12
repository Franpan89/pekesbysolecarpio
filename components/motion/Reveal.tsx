'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  id?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) return (
    <div id={id} className={className}>
      {children}
    </div>
  );

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
