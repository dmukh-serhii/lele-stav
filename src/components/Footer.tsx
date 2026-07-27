'use client';

import { useTranslations } from 'next-intl';

const SCROLL = (id: string) => () => {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 bg-primary flex items-center justify-center"
                style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
              >
                <span className="text-white font-heading font-black text-sm">L</span>
              </div>
              <span className="font-heading font-bold text-gray-800 text-lg">
                LELE STAV <span className="text-gray-400 font-normal text-sm">s.r.o.</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {t('tagline')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-gray-200 hover:border-primary hover:bg-primary/10 flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                aria-label="facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-gray-200 hover:border-primary hover:bg-primary/10 flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                aria-label="instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={1.5} />
                  <path strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={1.5} strokeLinecap="round" />
                </svg>
              </a>
              <a
                href="tel:+420702044714"
                className="w-9 h-9 border border-gray-200 hover:border-primary hover:bg-primary/10 flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                aria-label="phone"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h5 className="font-heading font-bold text-gray-700 text-sm uppercase tracking-widest mb-6">
              {t('company_title')}
            </h5>
            <ul className="space-y-3">
              {(['home', 'services', 'projects', 'contact'] as const).map((k) => (
                <li key={k}>
                  <button
                    onClick={SCROLL(k === 'home' ? '#hero' : k === 'services' ? '#services' : k === 'projects' ? '#gallery' : '#contact')}
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors hover:pl-2 duration-200"
                  >
                    {nav(k)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-heading font-bold text-gray-700 text-sm uppercase tracking-widest mb-6">
              {t('services_title')}
            </h5>
            <ul className="space-y-3">
              {(['s1', 's2', 's3', 's4', 's5', 's6'] as const).map((s) => (
                <li key={s}>
                  <button
                    onClick={SCROLL('#services')}
                    className="text-gray-500 hover:text-gray-900 text-sm transition-colors hover:pl-2 duration-200 text-left"
                  >
                    {t(s)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-heading font-bold text-gray-700 text-sm uppercase tracking-widest mb-6">
              {t('contact_title')}
            </h5>
            <div className="space-y-4 text-sm text-gray-500">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Korunní 2569/108, Praha 10</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+420702044714" className="hover:text-primary transition-colors">+420 702 044 714</a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@lelecompany.cz" className="hover:text-primary transition-colors">info@lelecompany.cz</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-xs">
          <p>{t('copyright')}</p>
          <div className="flex gap-6">
            <button className="hover:text-gray-700 transition-colors">{t('terms')}</button>
            <button className="hover:text-gray-700 transition-colors">{t('privacy')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
