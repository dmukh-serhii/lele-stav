'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const currentLocale = useLocale();
  const isHome = pathname === '/' || pathname === '';
  const [scrolled, setScrolled] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const navLinks = [
    { id: 'home', href: '/' },
    { id: 'services', href: '/services' },
    { id: 'projects', href: '/gallery' },
    { id: 'contact', href: '/contact' },
  ] as const;

  const switchLocale = (next: string) => {
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;SameSite=Lax`;
    window.location.reload();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b ${
        scrolled
          ? 'bg-white border-gray-100 shadow-sm transition-all duration-300'
          : 'bg-transparent border-transparent [transition:background-color_300ms,box-shadow_300ms,border-color_80ms]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 bg-primary flex items-center justify-center"
              style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
            >
              <span className="text-white font-heading font-black text-sm">L</span>
            </div>
            <span className={`font-heading font-bold text-lg tracking-wide transition-colors group-hover:text-primary ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              LELE STAV <span className={`font-normal text-sm ${scrolled ? 'text-gray-400' : 'text-white/50'}`}>s.r.o.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ id, href }) => (
              <Link
                key={id}
                href={href}
                className={`text-sm font-medium uppercase tracking-widest transition-colors relative group ${
                  scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/70 hover:text-white'
                }`}
              >
                {t(id)}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right: lang switcher + phone */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+420702044714"
              className={`text-sm transition-colors font-medium ${
                scrolled ? 'text-gray-500 hover:text-gray-900' : 'text-white/60 hover:text-white'
              }`}
            >
              +420 702 044 714
            </a>
            <div className={`flex items-center border text-xs font-bold uppercase tracking-widest ${scrolled ? 'border-gray-200' : 'border-white/20'}`}>
              {(['cs', 'en', 'de'] as const).map((loc, i) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`px-2.5 py-1.5 transition-all ${
                    currentLocale === loc
                      ? 'bg-primary text-white'
                      : scrolled
                        ? 'text-gray-400 hover:text-gray-900'
                        : 'text-white/50 hover:text-white'
                  } ${i > 0 ? (scrolled ? 'border-l border-gray-200' : 'border-l border-white/20') : ''}`}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            <div className={`flex items-center border text-xs font-bold uppercase tracking-widest ${scrolled ? 'border-gray-200' : 'border-white/20'}`}>
              {(['cs', 'en', 'de'] as const).map((loc, i) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={`px-2 py-1 transition-all ${
                    currentLocale === loc
                      ? 'bg-primary text-white'
                      : scrolled ? 'text-gray-400' : 'text-white/50'
                  } ${i > 0 ? (scrolled ? 'border-l border-gray-200' : 'border-l border-white/20') : ''}`}
                >
                  {loc.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 flex flex-col items-center justify-center gap-1.5"
              aria-label="Menu"
            >
              <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''} ${scrolled ? 'bg-gray-700' : 'bg-white'}`} />
              <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''} ${scrolled ? 'bg-gray-700' : 'bg-white'}`} />
              <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''} ${scrolled ? 'bg-gray-700' : 'bg-white'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(({ id, href }) => (
                <Link
                  key={id}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-gray-600 hover:text-gray-900 text-sm font-medium uppercase tracking-widest border-b border-gray-100 last:border-0 transition-colors"
                >
                  {t(id)}
                </Link>
              ))}
              <a href="tel:+420702044714" className="pt-4 text-primary font-medium text-sm">
                +420 702 044 714
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
