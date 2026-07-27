'use client';

import { useEffect, useRef } from 'react';

const COLORS = [
  'rgba(5,150,105,0.95)',
  'rgba(52,211,153,0.85)',
  'rgba(16,185,129,0.80)',
  'rgba(255,255,255,0.50)',
];

export default function HoneycombGrid() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ns = 'http://www.w3.org/2000/svg';
    const size = 42;
    const w = Math.sqrt(3) * size;
    const h = 2 * size;
    const rowSpacing = h * 0.75;
    const VW = 1000, VH = 600;
    const cols = Math.ceil(VW / w) + 2;
    const rows = Math.ceil(VH / rowSpacing) + 2;

    function hexPoints(cx: number, cy: number): [number, number][] {
      return Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 180) * (60 * i - 30);
        return [cx + size * Math.cos(a), cy + size * Math.sin(a)] as [number, number];
      });
    }

    const cellsG = document.createElementNS(ns, 'g');
    const trackG = document.createElementNS(ns, 'g');
    const lightG = document.createElementNS(ns, 'g');
    svg.append(cellsG, trackG, lightG);

    type Vertex = { x: number; y: number; neighbors: Set<string> };
    const graph = new Map<string, Vertex>();

    function vKey([x, y]: [number, number]) {
      return `${Math.round(x * 10) / 10}_${Math.round(y * 10) / 10}`;
    }
    function addV(p: [number, number]) {
      const k = vKey(p);
      if (!graph.has(k)) graph.set(k, { x: p[0], y: p[1], neighbors: new Set() });
      return k;
    }
    function addEdge(a: [number, number], b: [number, number]) {
      const ka = addV(a), kb = addV(b);
      graph.get(ka)!.neighbors.add(kb);
      graph.get(kb)!.neighbors.add(ka);
    }

    const drawn = new Set<string>();
    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const cx = col * w + (row % 2 ? w / 2 : 0);
        const cy = row * rowSpacing;
        const pts = hexPoints(cx, cy);

        const poly = document.createElementNS(ns, 'polygon');
        poly.setAttribute('points', pts.map(p => p.join(',')).join(' '));
        poly.setAttribute('fill', 'rgba(5,150,105,0.03)');
        poly.setAttribute('stroke', 'rgba(5,150,105,0.10)');
        poly.setAttribute('stroke-width', '0.8');
        cellsG.appendChild(poly);

        for (let i = 0; i < 6; i++) {
          const a = pts[i] as [number, number];
          const b = pts[(i + 1) % 6] as [number, number];
          const key = [vKey(a), vKey(b)].sort().join('|');
          if (!drawn.has(key)) {
            drawn.add(key);
            addEdge(a, b);
            const line = document.createElementNS(ns, 'line');
            line.setAttribute('x1', String(a[0])); line.setAttribute('y1', String(a[1]));
            line.setAttribute('x2', String(b[0])); line.setAttribute('y2', String(b[1]));
            line.setAttribute('stroke', 'rgba(5,150,105,0.08)');
            line.setAttribute('stroke-width', '0.8');
            trackG.appendChild(line);
          }
        }
      }
    }

    const allKeys = Array.from(graph.keys()).filter(k => {
      const v = graph.get(k)!;
      return v.x > -20 && v.x < VW + 20 && v.y > -20 && v.y < VH + 20;
    });

    function randomWalk(steps: number) {
      let cur = allKeys[Math.floor(Math.random() * allKeys.length)];
      let prev: string | null = null;
      const path = [graph.get(cur)!];
      for (let i = 0; i < steps; i++) {
        const nb = Array.from(graph.get(cur)!.neighbors);
        const opts = nb.filter(k => k !== prev);
        const next = (opts.length ? opts : nb)[Math.floor(Math.random() * (opts.length || nb.length))];
        if (!next) break;
        path.push(graph.get(next)!);
        prev = cur;
        cur = next;
      }
      return path;
    }

    function pathD(pts: Vertex[]) {
      return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    }

    interface Traveler {
      el: SVGPathElement;
      total: number;
      glow: number;
      speed: number;
      // offset decreases linearly — no looping, no jumps
      // glow visible while offset is in (-total, glow)
      // fully exited when offset < -(total + glow)
      offset: number;
    }

    const TRAVELER_COUNT = 18;
    const travelers: (Traveler | null)[] = [];

    function spawn(phaseOffset = 0): Traveler | null {
      const steps = 12 + Math.floor(Math.random() * 18);
      const pts = randomWalk(steps);
      if (pts.length < 2) return null;

      const el = document.createElementNS(ns, 'path');
      el.setAttribute('d', pathD(pts));
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      el.setAttribute('fill', 'none');
      el.setAttribute('stroke', color);
      el.setAttribute('stroke-width', '2.5');
      el.setAttribute('stroke-linecap', 'round');
      el.setAttribute('stroke-linejoin', 'round');
      el.style.filter = `drop-shadow(0 0 5px ${color})`;
      lightG.appendChild(el);

      const total = el.getTotalLength();
      const glow = Math.max(total * 0.22, 40);

      // Large gap so only one glow segment is ever visible — no second copy wrapping around
      el.setAttribute('stroke-dasharray', `${glow} ${total * 10}`);

      // offset = glow → glow just arriving at path start (position 0)
      // offset = 0     → front of glow at position 0, fully entered
      // offset = -total → glow at end of path
      // offset = -(total + glow) → glow fully past end, invisible
      // phaseOffset spreads initial positions so not all start together
      const offset = glow + phaseOffset;

      return { el, total, glow, speed: 38 + Math.random() * 48, offset };
    }

    // Stagger initial spawns across the full path length so screen isn't empty at start
    for (let i = 0; i < TRAVELER_COUNT; i++) {
      const t = spawn(Math.random() * 600);
      if (t) travelers.push(t);
    }

    let last = performance.now();
    let raf: number;
    let running = false;

    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05); // cap dt to avoid big jumps on tab switch
      last = now;

      for (let i = 0; i < travelers.length; i++) {
        const t = travelers[i];
        if (!t) continue;

        // Move glow forward — strictly linear, no wrapping
        t.offset -= t.speed * dt;

        // Clamp to avoid floating-point drift producing weird values
        t.el.setAttribute('stroke-dashoffset', String(t.offset));

        // Glow is fully past the end of the path — remove silently (already invisible)
        if (t.offset < -(t.total + t.glow + 5)) {
          lightG.removeChild(t.el);
          travelers[i] = spawn();
        }
      }

      raf = requestAnimationFrame(tick);
    }

    // Only animate while the hero is actually on screen — the rAF loop with
    // drop-shadow repaints otherwise competes with scrolling further down the page
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      travelers.forEach(t => t?.el.setAttribute('stroke-dashoffset', '0'));
    } else {
      io.observe(svg);
    }

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      while (svg.firstChild) svg.removeChild(svg.firstChild);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
