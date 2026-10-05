import { useEffect, useRef, useState } from 'react';
import StickerMoment from './StickerMoment';
import BulbNight from './BulbNight';
import LaptopTyping from './LaptopTyping';
import RaccoonCrossing from './RaccoonCrossing';
import { motion, useReducedMotion } from 'framer-motion';

const ELEMENTS = {
  camera: { caption: 'Capture the good moments', alt: 'Vintage camera sticker with a yellow star', rotation: -6 },
  movie: { caption: 'My life is like a movie', alt: 'My Life movie clapperboard sticker', rotation: 5 },
  bulb: { caption: 'Always new ideas', alt: 'Glowing light bulb sticker', rotation: -8 },
  laptop: { caption: 'My life partner is my laptop', alt: 'MacBook with a coffee cup and notebook', rotation: 4 },
  raccoon: { caption: 'As cool as the rackoon', alt: 'Raccoon wearing sunglasses with its paws raised', rotation: -5 },
};
export default function FloatingElement({ type, side = 'left' }) {
  const ref = useRef(null);
  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    const files = type === 'movie' ? ['voiceover.mp4'] : type === 'raccoon' ? ['raccoon-frames.webp'] : type === 'bulb' ? ['bulb-glow.webm'] : type === 'laptop' ? Array.from({ length: 8 }, (_, index) => `typing/typing_${String(index).padStart(2, '0')}.webp`) : [];
    if (!files.length) return;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      files.forEach(file => { fetch(`${base}floating-elements/${file}`, { priority: 'low', cache: 'force-cache' }).catch(() => {}); });
      observer.disconnect();
    }, { rootMargin: '600px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [type]);
  const element = ELEMENTS[type];
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  return <div ref={ref} className={`floating-interlude floating-${side}${type === 'bulb' && open ? ' bulb-is-on' : ''}`} id={`floating-${type}`}>
    <div className="section-inner">
      <figure className="floating-piece">
        <div className="floating-sticker-anchor" data-thread-anchor>
          <button className="floating-sticker-button" onClick={() => setOpen(value => ['bulb', 'laptop', 'raccoon'].includes(type) ? !value : true)} aria-pressed={['bulb', 'laptop', 'raccoon'].includes(type) ? open : undefined} aria-label={`Click me: ${element.caption}`} aria-haspopup={['bulb', 'laptop', 'raccoon'].includes(type) ? undefined : 'dialog'}>
          <motion.img src={`${import.meta.env.BASE_URL}floating-elements/${type}.webp`} alt={element.alt} width="736" height="736" loading="eager" fetchPriority="low" decoding="async"
            initial={false} animate={reduced ? { y: 0, rotate: element.rotation } : { y: [0, -9, 0], rotate: [element.rotation, element.rotation + 2, element.rotation] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} />
          <span className="sticker-click-hint" aria-hidden="true">{type === 'bulb' && open ? 'Lights on ↗' : 'Click me ↗'}</span>
          </button>
        </div>
        <motion.figcaption className="annotation" initial={false} animate={reduced ? { y: 0 } : { y: [0, -5, 0] }} transition={{ duration: 5.5, delay: .3, repeat: Infinity, ease: 'easeInOut' }}>
          <span className="floating-caption-arrow" aria-hidden="true">{side === 'left' ? '↙' : '↘'}</span>{element.caption}
        </motion.figcaption>
      </figure>
    </div>
    {open && (type === 'bulb' ? <BulbNight onClose={() => setOpen(false)} /> : type === 'laptop' ? <LaptopTyping onClose={() => setOpen(false)} /> : type === 'raccoon' ? <RaccoonCrossing onClose={() => setOpen(false)} /> : <StickerMoment type={type} caption={element.caption} onClose={() => setOpen(false)} />)}
  </div>;
}
