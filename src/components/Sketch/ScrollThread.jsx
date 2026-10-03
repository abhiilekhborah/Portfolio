import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollThread({ target }) {
  const pathRef = useRef(null);
  const samples = useRef([]);
  const bounds = useRef({ top: 0, viewport: 0, bottom: 0 });
  const [geometry, setGeometry] = useState({ d: '', width: 1, height: 1 });
  const revision = useMotionValue(0);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const progress = useTransform([scrollY, revision], ([value]) => {
    const points = samples.current;
    if (!points.length) return 0;
    const { top, viewport, bottom } = bounds.current;
    // Gradually move the drawing frontier to the end over the last viewport.
    // This lets the final upward curl finish without a jump at the page bottom.
    const finish = Math.max(0, Math.min(1, (value - (bottom - viewport * 2)) / viewport));
    const y = value + viewport * (0.68 + 0.32 * finish) - top;
    if (y <= points[0].y) return 0;
    if (y >= points.at(-1).y) return 1;
    let lo = 0, hi = points.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (points[mid].y < y) lo = mid; else hi = mid;
    }
    return (lo + (y - points[lo].y) / (points[hi].y - points[lo].y)) / (points.length - 1);
  });
  const ink = useSpring(progress, { stiffness: 180, damping: 32, mass: 0.45 });
  function pointAt(value) {
    const points = samples.current;
    if (!points.length) return { x: 0, actualY: 0 };
    const index = Math.max(0, Math.min(1, value)) * (points.length - 1);
    const lo = Math.floor(index), hi = Math.min(lo + 1, points.length - 1), mix = index - lo;
    return {
      x: points[lo].x + (points[hi].x - points[lo].x) * mix,
      actualY: points[lo].actualY + (points[hi].actualY - points[lo].actualY) * mix,
    };
  }
  const tipX = useTransform(ink, value => pointAt(value).x);
  const tipY = useTransform(ink, value => pointAt(value).actualY);
  const tipOpacity = useTransform(ink, [0, 0.002], [0, 1]);
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    let frame, disposed = false;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const width = el.clientWidth;
      const narrow = width < 1050;
      const sections = [...el.querySelectorAll(':scope > section')];
      const inner = sections[0]?.querySelector('.section-inner')?.getBoundingClientRect();
      const gutter = inner ? inner.left - rect.left : width * 0.065;
      const left = Math.max(12, gutter * 0.45), right = width - left;
      const bend = Math.min(22, left * 0.45);
      bounds.current = { top: rect.top + window.scrollY, viewport: window.innerHeight, bottom: rect.top + window.scrollY + el.offsetHeight };
      let d = `M ${width * 0.56} 0`, previousX = width * 0.56, previousY = 0;
      sections.forEach((section, i) => {
        const top = section.offsetTop, height = section.offsetHeight;
        const x = i % 2 === 0 ? right : left;
        const direction = x < width / 2 ? 1 : -1;
        const entryY = top + (narrow ? 60 : 90);
        // Switch sides in the padding between sections, with vertical tangents
        // at both ends so the thread never forms a rectangular corner.
        const gap = entryY - previousY;
        d += ` C ${previousX} ${previousY + gap * 0.65}, ${x} ${entryY - gap * 0.65}, ${x} ${entryY}`;
        d += ` C ${x} ${top + height * 0.22}, ${x + direction * bend} ${top + height * 0.29}, ${x} ${top + height * 0.42}`;
        if (section.id === 'sketches') {
          const loop = Math.min(left * 0.8, narrow ? 16 : 44);
          d += ` C ${x - direction * loop} ${top + height * 0.54}, ${x + direction * loop} ${top + height * 0.59}, ${x + direction * loop} ${top + height * 0.50} C ${x + direction * loop} ${top + height * 0.43}, ${x - direction * loop * 0.3} ${top + height * 0.51}, ${x} ${top + height * 0.64}`;
        }
        if (section.id === 'contact') {
          const cta = section.querySelector('#say-hello')?.getBoundingClientRect();
          if (cta && !narrow) {
            const endX = cta.left - rect.left - 24, endY = cta.top - rect.top + cta.height / 2;
            // Approach the invitation from beneath the email, through blank space.
            d += ` C ${x} ${endY + 170}, ${endX - 70} ${endY + 230}, ${endX} ${endY}`;
          } else {
            d += ` C ${x + direction * bend} ${top + height * 0.63}, ${x - direction * bend * 0.4} ${top + height * 0.73}, ${x} ${top + height * 0.82}`;
          }
        } else {
          previousY = top + height - (narrow ? 24 : 48);
          d += ` C ${x + direction * bend} ${top + height * 0.72}, ${x - direction * bend * 0.35} ${top + height * 0.84}, ${x} ${previousY}`;
        }
        previousX = x;
      });
      setGeometry({ d, width, height: el.offsetHeight });
    };
    const schedule = () => { cancelAnimationFrame(frame); if (!disposed) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(el);
    el.querySelectorAll(':scope > section').forEach(section => observer.observe(section));
    window.addEventListener('resize', schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => { disposed = true; observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('resize', schedule); };
  }, [target]);
  useLayoutEffect(() => {
    if (!pathRef.current || !geometry.d) return;
    const count = 1600, length = pathRef.current.getTotalLength();
    let highest = 0;
    const raw = Array.from({ length: count + 1 }, (_, i) => {
      const point = pathRef.current.getPointAtLength(length * i / count);
      highest = Math.max(highest, point.y);
      return { x: point.x, actualY: point.y, frontier: highest };
    });
    // A little distance-based progression keeps loops strictly monotonic:
    // repeated vertical coordinates no longer make an entire loop pop in.
    const extent = raw.at(-1).frontier;
    samples.current = raw.map((point, i) => ({ ...point, y: point.frontier * 0.88 + extent * (i / count) * 0.12 }));
    revision.set(revision.get() + 1);
    ink.jump(progress.get());
  }, [geometry, revision, ink, progress]);
  return <svg className="scroll-thread" width={geometry.width} height={geometry.height} viewBox={`0 0 ${geometry.width} ${geometry.height}`} aria-hidden="true" focusable="false">
    <motion.path ref={pathRef} d={geometry.d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: reduced ? 1 : ink }} />
    {!reduced && <motion.circle r="2.8" fill="currentColor" style={{ cx: tipX, cy: tipY, opacity: tipOpacity }} />}
  </svg>;
}
