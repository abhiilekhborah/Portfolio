import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Sun } from 'lucide-react';

export default function BulbNight({ onClose }) {
  const stage = useRef(null);
  const lamp = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const anchor = document.querySelector('#floating-bulb [data-thread-anchor]');
    let frame;
    const measure = () => {
      const rect = anchor.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      [stage.current, lamp.current].forEach(node => {
        node.style.setProperty('--lamp-x', `${x}px`);
        node.style.setProperty('--lamp-y', `${y}px`);
      });
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    const escape = event => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('keydown', escape);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('keydown', escape);
      previous?.focus({ preventScroll: true });
    };
  }, [onClose]);
  return createPortal(<><div className="bulb-night" ref={stage}>
    <div className="night-shade" aria-hidden="true" />
    <div className="lamp-warmth" aria-hidden="true" />
    <div className="night-controls"><span className="annotation" role="status">Ideas shine brighter in the dark.</span><button onClick={onClose} className="lights-on"><Sun size={17} /> Turn the lights on</button><span className="eyebrow">ESC TO RESTORE</span></div>
  </div>
    <img ref={lamp} className="night-lamp" src={`${import.meta.env.BASE_URL}floating-elements/bulb-night.jpg`} alt="" aria-hidden="true" width="700" height="1400" />
  </>, document.body);
}
