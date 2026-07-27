'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ALL_IMAGES = [
  '/images/IMG_20231010_184424-1024x768.webp',
  '/images/IMG_20231024_124239-1024x768.webp',
  '/images/IMG_20230912_171502-1024x768.webp',
  '/images/IMG_20231009_183029-1024x768.webp',
  '/images/IMG_20231024_124300-scaled.webp',
  '/images/IMG_20230525_075817_828.webp',
  '/images/IMG_20230914_112136-scaled.webp',
  '/images/IMG-20230307-WA0000.webp',
  '/images/IMG_20231023_121744-scaled.webp',
  '/images/IMG_20230525_075734_444.webp',
  '/images/IMG_20230525_075817_828-1.webp',
  '/images/IMG_20230912_171502-1-scaled.webp',
  '/images/IMG_20230914_112136-1-scaled.webp',
  '/images/IMG_20231009_183029-1-scaled.webp',
  '/images/IMG_20230525_075725_190.webp',
  '/images/IMG_20231024_124300-1-scaled.webp',
  '/images/IMG_20231024_124247-scaled.webp',
  '/images/IMG_20231024_124239-1-scaled.webp',
  '/images/IMG_20231010_184424-1-scaled.webp',
  '/images/IMG_20230912_171502-scaled.webp',
  '/images/IMG_20231009_183029-scaled.webp',
  '/images/IMG_20231024_124239-scaled.webp',
  '/images/IMG_20231010_184424-scaled.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.28.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.28-1.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.29.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.29-1.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.29-2.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.29-3.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.29-4.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.29-5.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.29-6.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.29-7.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.30.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.30-1.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.30-2.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.30-3.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.30-4.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.30-5.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.30-6.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.30-7.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.31.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.31-1.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.31-2.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.31-3.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.31-4.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.31-5.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.31-6.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.31-7.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.32.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.32-1.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.32-2.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.32-3.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.32-4.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.32-5.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.32-6.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.32-7.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.33.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.33-1.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.33-2.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.33-3.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.33-4.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.33-5.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.33-6.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.33-7.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.34.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.34-1.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.34-2.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.34-3.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.34-4.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.34-5.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.34-6.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.34-7.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.34-8.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.35.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.35-1.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.35-2.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.35-3.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.35-4.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.35-5.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.35-6.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.35-7.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.35-8.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.36.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.36-1.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.36-2.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.15.36-3.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.16.28.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.16.28-1.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.16.28-2.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.16.28-3.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.16.28-4.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.16.28-5.webp',
  '/images/WhatsApp-Image-2024-11-27-at-13.16.28-6.webp',
];

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <main className="overflow-x-hidden">
      <Header />

      {/* Page hero */}
      <section className="pt-32 pb-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('back')}
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-subtitle red-line mb-4"
          >
            {t('subtitle')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-black text-4xl md:text-5xl text-gray-900"
          >
            {t('title')}
          </motion.h1>
        </div>
      </section>

      {/* Full photo grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ALL_IMAGES.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                className="gallery-item cursor-pointer aspect-[4/3]"
                onClick={() => setLightbox(src)}
              >
                <Image
                  src={src} alt="" fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="gallery-overlay" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); const idx = ALL_IMAGES.indexOf(lightbox); setLightbox(ALL_IMAGES[(idx - 1 + ALL_IMAGES.length) % ALL_IMAGES.length]); }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); const idx = ALL_IMAGES.indexOf(lightbox); setLightbox(ALL_IMAGES[(idx + 1) % ALL_IMAGES.length]); }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <motion.img
            key={lightbox}
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            src={lightbox}
            alt=""
            className="max-h-[90vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}

      <Footer />
    </main>
  );
}
