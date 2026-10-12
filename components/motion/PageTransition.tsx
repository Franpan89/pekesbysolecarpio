'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const GROUPED_PREFIXES = ['/accesorios'];

function transitionKey(pathname: string) {
  const grouped = GROUPED_PREFIXES.find((p) => pathname === p || pathname.startsWith(`${p}/`));
  return grouped ?? pathname;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={transitionKey(pathname ?? '')}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
