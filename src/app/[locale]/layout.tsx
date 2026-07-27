import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Loader from '@/components/Loader';
import '../globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LELE And Company sro – Kamenické práce Praha',
  description:
    'Profesionální stavební společnost specializující se na kamenické práce, obklady, dlažbu a fasády v Praze a okolí.',
  keywords: 'kamenické práce, stavba, obklady, dlažba, fasády, Praha, LELE',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${montserrat.variable} ${openSans.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Loader />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
