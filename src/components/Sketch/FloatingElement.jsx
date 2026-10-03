import { useState } from 'react';
import StickerMoment from './StickerMoment';
import { motion, useReducedMotion } from 'framer-motion';

const ELEMENTS = {
  camera: { caption: 'Capture the good moments', alt: 'Vintage camera sticker with a yellow star', rotation: -6 },
  movie: { caption: 'My life is like a movie', alt: 'My Life movie clapperboard sticker', rotation: 5 },
  bulb: { caption: 'Always new ideas', alt: 'Glowing light bulb sticker', rotation: -8 },
  laptop: { caption: 'My life partner is my laptop', alt: 'MacBook with a coffee cup and notebook', rotation: 4 },
  raccoon: { caption: 'As cool as the rackoon', alt: 'Raccoon wearing sunglasses with its paws raised', rotation: -5 },
};
export default function FloatingElement({ type, side = 'left' }) {
  const element = ELEMENTS[type];
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  return <div className={`floating-interlude floating-${side}`} id={`floating-${type}`}>
    <div className="section-inner">
      <figure className="floating-piece">
        <div className="floating-sticker-anchor" data-thread-anchor>
          <button className="floating-sticker-button" onClick={() => setOpen(true)} aria-label={`Click me: ${element.caption}`} aria-haspopup="dialog">
          <motion.img src={`${import.meta.env.BASE_URL}floating-elements/${type}.jpg`} alt={element.alt} width="736" height="736" loading="lazy" decoding="async"
            initial={false} animate={reduced ? { y: 0, rotate: element.rotation } : { y: [0, -9, 0], rotate: [element.rotation, element.rotation + 2, element.rotation] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} />
          <span className="sticker-click-hint" aria-hidden="true">Click me ↗</span>
          </button>
        </div>
        <motion.figcaption className="annotation" initial={false} animate={reduced ? { y: 0 } : { y: [0, -5, 0] }} transition={{ duration: 5.5, delay: .3, repeat: Infinity, ease: 'easeInOut' }}>
          <span className="floating-caption-arrow" aria-hidden="true">{side === 'left' ? '↙' : '↘'}</span>{element.caption}
        </motion.figcaption>
      </figure>
    </div>
    {open && <StickerMoment type={type} caption={element.caption} onClose={() => setOpen(false)} />}
  </div>;
}
