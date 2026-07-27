'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

function rev(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' } as const,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

const features = [
  {
    key: 'feature1',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'feature2',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: 'feature3',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
] as const;

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <motion.p {...rev(0)} className="section-subtitle red-line mb-4">
              {t('subtitle')}
            </motion.p>
            <motion.h2 {...rev(0.1)} className="font-heading font-black text-4xl md:text-5xl text-gray-900 mb-8 leading-tight">
              {t('title')}
            </motion.h2>
            <motion.p {...rev(0.2)} className="text-gray-600 leading-relaxed mb-4 text-lg">
              {t('description1')}
            </motion.p>
            <motion.p {...rev(0.3)} className="text-gray-600 leading-relaxed mb-10 text-lg">
              {t('description2')}
            </motion.p>
            <motion.div {...rev(0.4)} className="flex items-center gap-4">
              <a href="tel:+420702044714" className="btn-primary text-sm">
                +420 702 044 714
              </a>
              <a href="mailto:info@lelecompany.cz" className="text-gray-400 hover:text-gray-700 text-sm transition-colors">
                info@lelecompany.cz
              </a>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3">
            {features.map(({ key, icon }, i) => (
              <motion.div
                key={key}
                {...rev(0.1 + i * 0.12)}
                className="group flex gap-5 p-6 bg-white border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all duration-300"
              >
                <div className="shrink-0 w-11 h-11 bg-emerald-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-gray-900 mb-2 text-lg">
                    {t(`${key}_title` as any)}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {t(`${key}_desc` as any)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
