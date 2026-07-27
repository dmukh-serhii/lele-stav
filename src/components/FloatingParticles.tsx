'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Particle = {
  left: string;
  top: string;
  size: number;
  color: string;
  opacity: number;
  dy: number;
  dx: number;
  rotate: number;
  duration: number;
  delay: number;
};

const PARTICLES: Particle[] = [
  { left: '4%',  top: '12%', size: 10, color: '#059669', opacity: 0.40, dy: -80, dx: 0,  rotate: 8,   duration: 9.0, delay: 0.0 },
  { left: '11%', top: '65%', size: 4,  color: '#4A7C62', opacity: 0.35, dy:  18, dx: 0,  rotate: -6,  duration: 8.0, delay: 1.2 },
  { left: '22%', top: '38%', size: 6,  color: '#059669', opacity: 0.25, dy: -15, dx: 0,  rotate: 0,   duration: 7.0, delay: 2.1 },
  { left: '35%', top: '80%', size: 3,  color: '#ffffff', opacity: 0.15, dy:  90, dx: 0,  rotate: 10,  duration: 11.0,delay: 0.5 },
  { left: '48%', top: '18%', size: 8,  color: '#4A7C62', opacity: 0.30, dy: -20, dx: 0,  rotate: -5,  duration: 7.5, delay: 3.0 },
  { left: '60%', top: '55%', size: 5,  color: '#059669', opacity: 0.35, dy: -70, dx: 0,  rotate: 7,   duration: 10.0,delay: 1.8 },
  { left: '73%', top: '28%', size: 12, color: '#059669', opacity: 0.20, dy: -25, dx: 0,  rotate: -12, duration: 8.5, delay: 0.3 },
  { left: '84%', top: '72%', size: 4,  color: '#4A7C62', opacity: 0.40, dy:  16, dx: 0,  rotate: 5,   duration: 7.2, delay: 2.5 },
  { left: '92%', top: '40%', size: 7,  color: '#ffffff', opacity: 0.12, dy: 100, dx: 0,  rotate: 0,   duration: 13.0,delay: 4.0 },
  { left: '7%',  top: '85%', size: 16, color: '#059669', opacity: 0.15, dy: -60, dx: 0,  rotate: -8,  duration: 12.0,delay: 1.0 },
  { left: '18%', top: '10%', size: 5,  color: '#4A7C62', opacity: 0.30, dy: -14, dx: 0,  rotate: 6,   duration: 7.0, delay: 0.8 },
  { left: '30%', top: '60%', size: 3,  color: '#059669', opacity: 0.45, dy:  20, dx: 0,  rotate: 0,   duration: 5.5, delay: 2.8 },
  { left: '42%', top: '90%', size: 8,  color: '#ffffff', opacity: 0.10, dy: -85, dx: 0,  rotate: 9,   duration: 11.5,delay: 0.2 },
  { left: '55%', top: '42%', size: 4,  color: '#4A7C62', opacity: 0.38, dy:  22, dx: 0,  rotate: -4,  duration: 6.2, delay: 3.5 },
  { left: '67%', top: '8%',  size: 6,  color: '#059669', opacity: 0.28, dy: -18, dx: 0,  rotate: 12,  duration: 8.0, delay: 1.5 },
  { left: '78%', top: '88%', size: 14, color: '#4A7C62', opacity: 0.18, dy: -110,dx: 0,  rotate: -3,  duration: 14.0,delay: 0.7 },
  { left: '88%', top: '22%', size: 3,  color: '#ffffff', opacity: 0.20, dy: -16, dx: 0,  rotate: 0,   duration: 7.8, delay: 4.2 },
  { left: '95%', top: '58%', size: 9,  color: '#059669', opacity: 0.30, dy:  75, dx: 0,  rotate: 7,   duration: 10.5,delay: 2.0 },
  { left: '2%',  top: '48%', size: 5,  color: '#4A7C62', opacity: 0.35, dy: -21, dx: 0,  rotate: -9,  duration: 7.5, delay: 3.3 },
  { left: '14%', top: '30%', size: 18, color: '#059669', opacity: 0.10, dy:  15, dx: 0,  rotate: 5,   duration: 12.0,delay: 0.4 },
  { left: '26%', top: '75%', size: 4,  color: '#ffffff', opacity: 0.18, dy: -95, dx: 0,  rotate: 0,   duration: 12.5,delay: 1.6 },
  { left: '38%', top: '22%', size: 7,  color: '#4A7C62', opacity: 0.28, dy:  19, dx: 0,  rotate: -6,  duration: 6.5, delay: 2.9 },
  { left: '50%', top: '68%', size: 3,  color: '#059669', opacity: 0.42, dy: -13, dx: 0,  rotate: 11,  duration: 5.8, delay: 0.6 },
  { left: '62%', top: '32%', size: 11, color: '#ffffff', opacity: 0.08, dy:  80, dx: 0,  rotate: -2,  duration: 12.0,delay: 3.8 },
  { left: '75%', top: '78%', size: 5,  color: '#4A7C62', opacity: 0.32, dy: -17, dx: 0,  rotate: 8,   duration: 7.3, delay: 1.1 },
  { left: '86%', top: '14%', size: 6,  color: '#059669', opacity: 0.25, dy: -65, dx: 0,  rotate: 0,   duration: 10.0,delay: 4.5 },
  { left: '97%', top: '82%', size: 3,  color: '#4A7C62', opacity: 0.40, dy: -20, dx: 0,  rotate: -7,  duration: 6.1, delay: 2.3 },
  { left: '9%',  top: '55%', size: 8,  color: '#ffffff', opacity: 0.13, dy: 105, dx: 0,  rotate: 4,   duration: 13.5,delay: 0.9 },
  { left: '20%', top: '92%', size: 4,  color: '#059669', opacity: 0.35, dy: -23, dx: 0,  rotate: -10, duration: 7.0, delay: 3.1 },
  { left: '33%', top: '45%', size: 15, color: '#4A7C62', opacity: 0.12, dy:  9,  dx: 0,  rotate: 6,   duration: 11.5,delay: 1.4 },
  { left: '45%', top: '6%',  size: 5,  color: '#059669', opacity: 0.38, dy:  90, dx: 0,  rotate: 0,   duration: 11.0,delay: 2.6 },
  { left: '57%', top: '50%', size: 3,  color: '#ffffff', opacity: 0.22, dy:  21, dx: 0,  rotate: -8,  duration: 5.5, delay: 4.1 },
  { left: '70%', top: '95%', size: 7,  color: '#4A7C62', opacity: 0.28, dy: -75, dx: 0,  rotate: 9,   duration: 11.0,delay: 0.1 },
  { left: '81%', top: '48%', size: 4,  color: '#059669', opacity: 0.45, dy:  18, dx: 0,  rotate: 3,   duration: 6.4, delay: 3.7 },
  { left: '93%', top: '10%', size: 10, color: '#ffffff', opacity: 0.10, dy: -14, dx: 0,  rotate: -5,  duration: 9.8, delay: 2.2 },
  { left: '16%', top: '22%', size: 3,  color: '#4A7C62', opacity: 0.42, dy: -85, dx: 0,  rotate: 11,  duration: 10.5,delay: 1.7 },
  { left: '28%', top: '58%', size: 6,  color: '#059669', opacity: 0.22, dy: -19, dx: 0,  rotate: 0,   duration: 7.6, delay: 0.3 },
  { left: '41%', top: '35%', size: 13, color: '#4A7C62', opacity: 0.15, dy:  13, dx: 0,  rotate: -4,  duration: 10.2,delay: 2.7 },
  { left: '53%', top: '82%', size: 4,  color: '#ffffff', opacity: 0.18, dy: -65, dx: 0,  rotate: 7,   duration: 10.0,delay: 1.3 },
  { left: '65%', top: '18%', size: 7,  color: '#059669', opacity: 0.32, dy:  20, dx: 0,  rotate: -9,  duration: 6.3, delay: 3.4 },
  { left: '77%', top: '62%', size: 3,  color: '#4A7C62', opacity: 0.40, dy: -16, dx: 0,  rotate: 5,   duration: 7.9, delay: 0.8 },
  { left: '89%', top: '35%', size: 9,  color: '#059669', opacity: 0.20, dy:  95, dx: 0,  rotate: 0,   duration: 12.0,delay: 4.4 },
  { left: '5%',  top: '72%', size: 5,  color: '#ffffff', opacity: 0.15, dy: -18, dx: 0,  rotate: -6,  duration: 7.1, delay: 2.0 },
  { left: '52%', top: '26%', size: 3,  color: '#059669', opacity: 0.45, dy:  25, dx: 0,  rotate: 10,  duration: 5.6, delay: 1.9 },
  { left: '72%', top: '44%', size: 6,  color: '#4A7C62', opacity: 0.30, dy: -80, dx: 0,  rotate: -3,  duration: 10.5,delay: 3.2 },
];

export default function FloatingParticles() {
  const ref = useRef<HTMLDivElement>(null);
  // Render the animated particles only while the hero is on screen,
  // so their infinite animations don't run while scrolling the rest of the page
  const inView = useInView(ref);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block" aria-hidden>
      {inView && PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, p.dy, 0],
            x: [0, p.dx, 0],
            rotate: [0, p.rotate, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
