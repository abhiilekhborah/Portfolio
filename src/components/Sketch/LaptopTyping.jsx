import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import TypingAnimation from './TypingAnimation';

export default function LaptopTyping({ onClose }) {
  const [finished, setFinished] = useState(false);
  const finish = useCallback(() => setFinished(true), []);
  useEffect(() => {
    const previous = document.activeElement;
    const escape = event => { if (event.key === 'Escape') { event.preventDefault(); onClose(); } };
    window.addEventListener('keydown', escape);
    return () => { window.removeEventListener('keydown', escape); previous?.focus({ preventScroll: true }); };
  }, [onClose]);
  return createPortal(<div className={`laptop-typing-scene${finished ? ' typing-finished' : ''}`} onAnimationEnd={event => { if (event.target === event.currentTarget && event.animationName === 'typing-scene-exit') onClose(); }}>
    <button className="icon-button typing-close" aria-label="Close typing animation" onClick={onClose}><X size={22} /></button>
    <TypingAnimation sayHello onComplete={finish} />
  </div>, document.body);
}
