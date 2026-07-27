'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const IMAGES = [
  { src: '/images/IMG_20231010_184424-1024x768.webp', alt: 'Construction project 1', span: 'md:col-span-2 md:row-span-2' },
  { src: '/images/IMG_20231024_124239-1024x768.webp', alt: 'Tile work', span: '' },
  { src: '/images/IMG_20230912_171502-1024x768.webp', alt: 'Facade work', span: '' },
  { src: '/images/IMG_20231009_183029-1024x768.webp', alt: 'Masonry work', span: 'md:col-span-2' },
  { src: '/images/IMG_20231024_124300-scaled.webp', alt: 'Interior work', span: '' },
  { src: '/images/IMG_20230525_075817_828.webp', alt: 'Tile installation', span: '' },
  { src: '/images/IMG_20230914_112136-scaled.webp', alt: 'Construction detail', span: 'md:col-span-2' },
];

export default function Gallery() {
  const t = useTranslations('gallery');
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
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
            className="font-heading font-black text-4xl md:text-5xl text-gray-900"
          >
            {t('title')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-3">
          {IMAGES.map(({ src, alt, span }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`gallery-item cursor-pointer ${span}`}
              onClick={() => setLightbox(src)}
            >
              <Image
                src={src} alt={alt} fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="gallery-overlay" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
          >
            {t('view_all')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors" onClick={() => setLightbox(null)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={lightbox} alt="" className="max-h-[90vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  );
}
