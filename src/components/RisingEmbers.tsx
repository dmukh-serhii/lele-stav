'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EMBERS = [
  { left: '3%',  size: 3, color: '#059669', duration: 7.0, delay: 0.0, dx: 12  },
  { left: '9%',  size: 2, color: '#ffffff', duration: 5.5, delay: 1.4, dx: -8  },
  { left: '15%', size: 4, color: '#34D399', duration: 8.5, delay: 0.8, dx: 18  },
  { left: '21%', size: 2, color: '#059669', duration: 6.0, delay: 3.2, dx: -14 },
  { left: '28%', size: 3, color: '#10B981', duration: 7.5, delay: 0.3, dx: 10  },
  { left: '34%', size: 2, color: '#ffffff', duration: 5.0, delay: 2.1, dx: -6  },
  { left: '40%', size: 5, color: '#059669', duration: 9.0, delay: 1.0, dx: 20  },
  { left: '46%', size: 2, color: '#34D399', duration: 6.5, delay: 4.0, dx: -10 },
  { left: '52%', size: 3, color: '#10B981', duration: 7.2, delay: 0.6, dx: 8   },
  { left: '58%', size: 2, color: '#ffffff', duration: 5.8, delay: 2.8, dx: -16 },
  { left: '64%', size: 4, color: '#059669', duration: 8.0, delay: 1.5, dx: 14  },
  { left: '70%', size: 2, color: '#34D399', duration: 6.2, delay: 3.6, dx: -8  },
  { left: '76%', size: 3, color: '#10B981', duration: 7.8, delay: 0.2, dx: 22  },
  { left: '82%', size: 2, color: '#ffffff', duration: 5.3, delay: 1.9, dx: -12 },
  { left: '88%', size: 4, color: '#059669', duration: 8.8, delay: 0.9, dx: 10  },
  { left: '94%', size: 2, color: '#34D399', duration: 6.7, delay: 2.4, dx: -6  },
  { left: '6%',  size: 2, color: '#10B981', duration: 5.6, delay: 3.8, dx: 16  },
  { left: '18%', size: 3, color: '#ffffff', duration: 7.3, delay: 1.2, dx: -18 },
  { left: '43%', size: 2, color: '#059669', duration: 6.4, delay: 4.5, dx: 8   },
  { left: '61%', size: 3, color: '#34D399', duration: 8.2, delay: 0.5, dx: -10 },
  { left: '79%', size: 2, color: '#10B981', duration: 5.9, delay: 3.0, dx: 12  },
  { left: '91%', size: 3, color: '#059669', duration: 7.6, delay: 1.7, dx: -20 },
] as const;

export default function RisingEmbers() {
  const ref = useRef<HTMLDivElement>(null);
  // Same idea as FloatingParticles: no infinite animations while the hero is off screen
  const inView = useInView(ref);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block" aria-hidden>
      {inView && EMBERS.map((e, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: e.left,
            bottom: `${10 + (i % 5) * 18}%`,
            width: e.size,
            height: e.size,
            backgroundColor: e.color,
            boxShadow: `0 0 ${e.size * 3}px ${e.color}`,
          }}
          animate={{
            y: [0, -(220 + (i % 4) * 80)],
            x: [0, e.dx, 0],
            opacity: [0, 0.7, 0.5, 0],
          }}
          transition={{
            duration: e.duration,
            repeat: Infinity,
            ease: 'easeOut',
            delay: e.delay,
            times: [0, 0.25, 0.75, 1],
          }}
        />
      ))}
    </div>
  );
}
