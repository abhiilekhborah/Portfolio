import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion } from 'framer-motion';
import { X, Pause, Play } from 'lucide-react';

export default function RaccoonCrossing({ onClose }) {
  const video = useRef(null);
  const traveller = useRef(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    let frame;
    const move = () => {
      const media = video.current;
      if (!media) return;
      const width = traveller.current.getBoundingClientRect().width;
      const progress = media.duration > 0 ? Math.min(1, media.currentTime / media.duration) : 0;
      const x = reduced ? (window.innerWidth - width) / 2 : -width * .5 + window.innerWidth * progress;
      traveller.current.style.transform = `translateX(${x}px)`;
      frame = requestAnimationFrame(move);
    };
    const escape = event => { if (event.key === 'Escape') onClose(); };
    frame = requestAnimationFrame(move);
    window.addEventListener('keydown', escape);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('keydown', escape); };
  }, [onClose, reduced]);
  return createPortal(<div className="raccoon-crossing-scene">
    <div ref={traveller} className="raccoon-traveller"><video ref={video} className="raccoon-crossing-video" src={`${import.meta.env.BASE_URL}floating-elements/raccoon-crossing.webm`} autoPlay muted playsInline onLoadedData={event => { event.currentTarget.play().catch(() => setPaused(true)); }} preload="auto" onEnded={onClose} onPause={() => setPaused(true)} onPlay={() => setPaused(false)} aria-label="Raccoon walking across the portfolio" width="1280" height="720" /></div>
    <button className="icon-button raccoon-crossing-pause" aria-label={paused ? 'Play raccoon animation' : 'Pause raccoon animation'} onClick={() => { const media = video.current; if (media.paused) media.play().catch(() => setPaused(true)); else media.pause(); }}>{paused ? <Play size={20} /> : <Pause size={20} />}</button>
    <button className="icon-button raccoon-crossing-close" aria-label="Close raccoon animation" onClick={onClose}><X size={22} /></button>
  </div>, document.body);
}
