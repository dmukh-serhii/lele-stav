'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = 16;
    const increment = to / (2000 / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 10,  suffix: '+', key: 'years'    },
  { value: 350, suffix: '+', key: 'projects' },
  { value: 280, suffix: '+', key: 'clients'  },
  { value: 25,  suffix: '+', key: 'workers'  },
] as const;

export default function Stats() {
  const t = useTranslations('stats');

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, suffix, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                <Counter to={value} suffix={suffix} />
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-widest font-medium">
                {t(key)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
