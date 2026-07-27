'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Cta() {
  const t = useTranslations('cta');

  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />

      {/* Decorative circles */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full border border-white/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-heading font-black text-white text-3xl md:text-4xl max-w-xl leading-tight"
          >
            {t('title')}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-heading font-bold text-sm uppercase tracking-widest hover:bg-white/90 transition-colors"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              {t('button')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
