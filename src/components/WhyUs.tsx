'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const reasons = ['r1', 'r2', 'r3'] as const;

export default function WhyUs() {
  const t = useTranslations('whyus');

  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 mb-16 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="section-subtitle red-line mb-4"
            >
              {t('subtitle')}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-black text-4xl md:text-5xl text-gray-900 leading-tight"
            >
              {t('title')}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block h-px bg-gradient-to-r from-gray-200 to-transparent origin-left"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white p-8 border border-gray-100 hover:border-emerald-100 card-glow transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-4 right-6 font-heading font-black text-8xl text-gray-100 leading-none select-none pointer-events-none">
                {t(`${r}_num` as any)}
              </div>

              <div className="w-11 h-11 bg-emerald-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white font-heading font-black text-sm transition-all duration-300 mb-6">
                {t(`${r}_num` as any)}
              </div>

              <h3 className="font-heading font-bold text-gray-900 text-xl mb-4">
                {t(`${r}_title` as any)}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {t(`${r}_desc` as any)}
              </p>

              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
