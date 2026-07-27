'use client';

import { useTranslations } from 'next-intl';

export default function Marquee() {
  const t = useTranslations();
  const items = t.raw('marquee') as string[];
  const doubled = [...items, ...items];

  return (
    <div className="bg-gray-100 overflow-hidden py-3.5 border-y border-gray-200">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-gray-500 font-heading font-semibold text-xs tracking-[0.22em] uppercase px-8 whitespace-nowrap">
              {item}
            </span>
            <span className="text-gray-300">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
