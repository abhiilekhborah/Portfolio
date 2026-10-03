import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Sun } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

export default function BulbNight({ onClose }) {
  const reduced = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const still = reduced || videoFailed;
  useEffect(() => {
    const previous = document.activeElement;
    const escape = event => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } };
    window.addEventListener('keydown', escape);
    return () => {
      window.removeEventListener('keydown', escape);
      previous?.focus({ preventScroll: true });
    };
  }, [onClose]);
  return createPortal(<>
    <div className={`bulb-night hanging-bulb-night${still ? ' lamp-static-mode' : ''}`}>
      <div className="night-shade" aria-hidden="true" />
      <div className="lamp-warmth" aria-hidden="true" />
      <div className="night-controls"><span className="annotation" role="status">Ideas shine brighter in the dark.</span><button onClick={onClose} className="lights-on"><Sun size={17} /> Turn the lights on</button><span className="eyebrow">ESC TO RESTORE</span></div>
    </div>
    <div className={`hanging-lamp-cord${still ? ' lamp-static-mode' : ''}`}  aria-hidden="true" />
    {still ? <img className="night-lamp hanging-night-lamp hanging-lamp-static" src={`${import.meta.env.BASE_URL}floating-elements/bulb-glow.png`} alt="" aria-hidden="true" width="380" height="420" /> : <div className="hanging-video-stage"><video className="night-lamp hanging-night-lamp" src={`${import.meta.env.BASE_URL}floating-elements/bulb-glow.webm`} poster={`${import.meta.env.BASE_URL}floating-elements/bulb-glow.png`} autoPlay loop muted playsInline onError={() => setVideoFailed(true)} aria-hidden="true" width="1280" height="720" /></div> }
  </>, document.body);
}
