'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import FloatingParticles from './FloatingParticles';
import RisingEmbers from './RisingEmbers';
import HoneycombGrid from './HoneycombGrid';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const t = useTranslations('hero');

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#091E17]"
    >
      {/* Layer 1 — honeycomb animation (base, below everything) */}
      <div className="absolute inset-0 z-0">
        <HoneycombGrid />
      </div>

      {/* Layer 2 — photo at reduced opacity, so the grid shows through */}
      <div className="absolute inset-0 z-[1]">
        <Image
          src="/main_image.webp"
          alt="Construction site"
          fill
          priority
          sizes="100vw"
          quality={60}
          className="object-cover object-center"
          style={{ opacity: 0.28 }}
        />
      </div>

      {/* Layer 3 — dark overlay to unify both layers */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'linear-gradient(135deg, rgba(9,30,23,0.82) 0%, rgba(9,30,23,0.70) 45%, rgba(40,46,44,0.65) 100%)',
        }}
      />

      {/* Blueprint grid at low opacity */}
      <div className="absolute inset-0 hero-grid z-[3]" style={{ opacity: 0.12 }} />

      {/* Floating squares + rising embers — above the overlay */}
      <div className="absolute inset-0 z-[5]">
        <FloatingParticles />
        <RisingEmbers />
      </div>

      {/* Vertical accent lines */}
      {[{ left: '25%', delay: 0.7 }, { left: '75%', delay: 0.9 }].map(({ left, delay }, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0 w-px z-[4]"
          style={{
            left,
            background: 'linear-gradient(to bottom, transparent 0%, rgb(4 120 87 / 0.3) 35%, rgb(4 120 87 / 0.3) 65%, transparent 100%)',
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Horizontal accent line */}
      <motion.div
        className="absolute left-0 right-0 h-px z-[4]"
        style={{
          top: '33%',
          background: 'linear-gradient(to right, transparent 0%, rgb(4 120 87 / 0.25) 25%, rgb(4 120 87 / 0.25) 75%, transparent 100%)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Glass stat — left */}
      <motion.div
        className="absolute left-8 xl:left-14 top-1/2 -translate-y-1/2 hidden xl:block z-10"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass-card p-6 w-40 text-center">
          <div className="text-[2.4rem] font-black text-white font-heading leading-none">{t('stat1_value')}</div>
          <div className="text-[10px] text-white/40 mt-2 uppercase tracking-[0.18em] leading-snug">
            {t('stat1_label').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </div>
          <div className="mt-3 h-px w-7 bg-primary mx-auto" />
        </div>
      </motion.div>

      {/* Glass stat — right */}
      <motion.div
        className="absolute right-8 xl:right-14 top-1/2 -translate-y-1/2 hidden xl:block z-10"
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass-card p-6 w-40 text-center">
          <div className="text-[2.4rem] font-black text-white font-heading leading-none">{t('stat2_value')}</div>
          <div className="text-[10px] text-white/40 mt-2 uppercase tracking-[0.18em] leading-snug">
            {t('stat2_label').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </div>
          <div className="mt-3 h-px w-7 bg-primary mx-auto" />
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center pt-20">

        {/* Badge */}
        <motion.div {...fadeUp(0.2)} className="inline-flex items-center gap-3 mb-8">
          <span className="glass-card px-4 py-2 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
            <span className="text-[10px] text-white/55 uppercase tracking-[0.28em] font-medium font-heading">
              {t('subtitle')}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.35)}
          className="font-heading font-black text-white leading-[0.88] mb-5"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 8rem)' }}
        >
          <span className="block gradient-text">{t('title').split(' ')[0]}</span>
          <span className="block text-white/90">{t('title').split(' ').slice(1).join(' ')}</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="w-16 h-px mx-auto mb-8"
          style={{ background: 'linear-gradient(to right, transparent, rgb(var(--c-primary)), transparent)' }}
        />

        {/* Description */}
        <motion.p
          {...fadeUp(0.55)}
          className="text-white/55 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          {t('description')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.7)}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button onClick={() => scrollTo('#services')} className="btn-primary">
            {t('cta_primary')}
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button onClick={() => scrollTo('#gallery')} className="btn-outline">
            {t('cta_secondary')}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-9 border border-white/15 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-0.5 h-2 bg-white/25 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
