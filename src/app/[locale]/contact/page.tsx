'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const contactItems = [
  {
    key: 'address',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    value: null,
    translationKey: 'address',
  },
  {
    key: 'phone',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    value: '+420 702 044 714',
    href: 'tel:+420702044714',
    translationKey: 'phone',
  },
  {
    key: 'email',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    value: 'info@lelecompany.cz',
    href: 'mailto:info@lelecompany.cz',
    translationKey: 'email',
  },
  {
    key: 'hours',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    value: null,
    translationKey: 'hours',
  },
] as const;

export default function ContactPage() {
  const t = useTranslations('contact');

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [contactError, setContactError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() && !form.phone.trim()) {
      setContactError(true);
      return;
    }
    setContactError(false);
    setSubmitted(true);
  };

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

      {/* Contact info + form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: contact info */}
            <div>
              <div className="space-y-6 mb-10">
                {contactItems.map((item, i) => {
                  const { key, icon, value, translationKey } = item;
                  const href = 'href' in item ? item.href : undefined;
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-start gap-5"
                    >
                      <div
                        className="shrink-0 w-11 h-11 bg-emerald-50 border border-emerald-100 flex items-center justify-center text-primary mt-0.5"
                        style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                      >
                        {icon}
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1 font-medium">
                          {t(`${translationKey}_label` as any)}
                        </p>
                        {href ? (
                          <a href={href} className="text-gray-900 text-lg hover:text-primary transition-colors font-medium">
                            {value}
                          </a>
                        ) : (
                          <p className="text-gray-900 text-lg font-medium">
                            {value ?? t(translationKey as any)}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-3 border border-gray-200 pointer-events-none" />
                <div className="absolute -inset-1 border border-gray-100 pointer-events-none" />
                <div className="bg-white border border-gray-200 p-1.5">
                  <div className="overflow-hidden h-[300px]">
                    <iframe
                      src="https://maps.google.com/maps?q=Korunní+2569%2F108%2C+Vinohrady%2C+101+00+Praha&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Korunní 2569/108, Praha 10 map"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: contact form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
            >
              <h2 className="font-heading font-bold text-2xl text-gray-900 mb-8">
                {t('form_title')}
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-emerald-50 border border-emerald-100 text-center"
                >
                  <div className="w-14 h-14 bg-primary flex items-center justify-center mx-auto mb-4"
                    style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                  >
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-900 font-medium text-lg">{t('form_success')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      {t('form_name_label')} <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t('form_name_placeholder')}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-colors text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      {t('form_email_label')} <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setContactError(false); }}
                      placeholder={t('form_email_placeholder')}
                      className={`w-full px-4 py-3 border bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-colors text-sm ${contactError ? 'border-red-400' : 'border-gray-200'}`}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      {t('form_phone_label')} <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => { setForm({ ...form, phone: e.target.value }); setContactError(false); }}
                      placeholder={t('form_phone_placeholder')}
                      className={`w-full px-4 py-3 border bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-colors text-sm ${contactError ? 'border-red-400' : 'border-gray-200'}`}
                    />
                    {contactError && (
                      <p className="mt-2 text-red-500 text-xs font-medium">{t('form_contact_required')}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      {t('form_message_label')}
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t('form_message_placeholder')}
                      className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {t('form_submit')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
