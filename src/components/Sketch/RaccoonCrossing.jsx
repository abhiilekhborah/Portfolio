import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion } from 'framer-motion';
import { X, Pause, Play } from 'lucide-react';

// Draw transparent frames instead of depending on mobile video alpha support.
export default function RaccoonCrossing({ onClose }) {
  const canvas = useRef(null);
  const traveller = useRef(null);
  const pausedRef = useRef(false);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let frame, last, elapsed = 0, cancelled = false;
    const image = new Image();
    image.src = `${import.meta.env.BASE_URL}floating-elements/raccoon-frames.webp`;
    image.decode().then(() => {
      if (cancelled) return;
      setReady(true);
      const context = canvas.current.getContext('2d');
      const move = now => {
        if (cancelled) return;
        if (last !== undefined && !pausedRef.current) elapsed += now - last;
        last = now;
        const index = Math.min(114, Math.floor(elapsed / 1000 * 12));
        context.clearRect(0, 0, 480, 267);
        context.drawImage(image, index % 10 * 480, Math.floor(index / 10) * 267, 480, 267, 0, 0, 480, 267);
        const width = traveller.current.getBoundingClientRect().width;
        const x = reduced ? (window.innerWidth - width) / 2 : -width * .5 + window.innerWidth * Math.min(1, elapsed / (115 / 12 * 1000));
        traveller.current.style.transform = `translateX(${x}px)`;
        if (elapsed >= 115 / 12 * 1000) { onClose(); return; }
        frame = requestAnimationFrame(move);
      };
      frame = requestAnimationFrame(move);
    }).catch(() => { if (!cancelled) setFailed(true); });
    const escape = event => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', escape);
    return () => { cancelled = true; cancelAnimationFrame(frame); window.removeEventListener('keydown', escape); };
  }, [onClose, reduced]);
  return createPortal(<div className="raccoon-crossing-scene">
    <div ref={traveller} className="raccoon-traveller"><canvas ref={canvas} className="raccoon-crossing-video" width="480" height="267" role="img" aria-label="Raccoon running and jumping into a box across the portfolio" /></div>
    {!ready && <p className="raccoon-loading" role="status">{failed ? 'Animation could not load. Please try again.' : 'Getting the raccoon ready…'}</p>}
    <button className="icon-button raccoon-crossing-pause" disabled={!ready} aria-label={paused ? 'Play raccoon animation' : 'Pause raccoon animation'} onClick={() => { pausedRef.current = !pausedRef.current; setPaused(pausedRef.current); }}>{paused ? <Play size={20} /> : <Pause size={20} />}</button>
    <button className="icon-button raccoon-crossing-close" aria-label="Close raccoon animation" onClick={onClose}><X size={22} /></button>
  </div>, document.body);
}
