import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, RotateCcw } from 'lucide-react';
import TypingAnimation from './TypingAnimation';

const BASE = import.meta.env.BASE_URL;
export default function StickerMoment({ type, caption, onClose }) {
  const dialog = useRef(null);
  const [take, setTake] = useState(1);
  const camera = type === 'camera';
  const movie = type === 'movie';
  const raccoon = type === 'raccoon';
  const laptop = type === 'laptop';
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    const modal = dialog.current;
    modal.showModal();
    document.body.style.overflow = 'hidden';
    return () => { modal.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return createPortal(<dialog ref={dialog} className={`sticker-dialog ${camera ? 'camera-dialog' : ''}`} aria-labelledby="sticker-moment-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="sticker-moment-sheet">
      <header><span className="eyebrow">{camera ? 'A MOMENT, CAPTURED' : movie ? `ON SET / TAKE ${String(take).padStart(2, '0')}` : 'A LITTLE ABOUT ME'}</span><button className="icon-button" aria-label="Close sticker moment" onClick={onClose} autoFocus><X size={22} /></button></header>
      {camera ? <>
        <div className="camera-capture" key={take}>
          <div className="capture-flash" aria-hidden="true" />
          <div className="film-snapshot">
            <img className="film-border" src={`${BASE}floating-elements/film-frame.jpg`} alt="Black Fuji RDP III film frame" width="640" height="581" />
            <div className="film-exposure"><img src={`${BASE}hero-poster.webp`} alt="Abhilekh’s hand-drawn portfolio portrait, captured in a film frame" /></div>
          </div>
        </div>
        <h2 id="sticker-moment-title">Capture the good moments.</h2>
        <p className="annotation">One for the scrapbook.</p>
        <button className="sticker-replay" onClick={() => setTake(value => value + 1)}><RotateCcw size={15} /> Capture again</button>
      </> : movie ? <>
        <img className="moment-mini-sticker" src={`${BASE}floating-elements/movie.jpg`} alt="Movie clapperboard" width="600" height="600" />
        <h2 id="sticker-moment-title">Rehearse with me</h2>
        <blockquote className="rehearsal-line" key={take}>Basanti, in kutton ke saamne mat naachna!</blockquote>
        <p className="eyebrow">SHOLAY · YOUR TURN, MAKE IT DRAMATIC.</p>
        <button className="sticker-replay" onClick={() => setTake(value => value + 1)}><RotateCcw size={15} /> One more take</button>
      </> : laptop ? <>
        <h2 id="sticker-moment-title">My life partner is my laptop</h2>
        <TypingAnimation />
      </> : raccoon ? <>
        <img className="moment-mini-sticker" src={`${BASE}floating-elements/raccoon.jpg`} alt="Raccoon wearing sunglasses" width="600" height="600" />
        <h2 id="sticker-moment-title">A clever little creature</h2>
        <div className="raccoon-facts">
          <p>Raccoons are <strong>highly intelligent</strong> animals with a working memory that can retain solutions to complex tasks for up to <strong>three years</strong>, a cognitive ability comparable to that of young children.</p>
          <p>Their name derives from the Powhatan word <em>aroughcun</em>, meaning <strong>“animal that scratches with its hands,”</strong> reflecting their human-like, dexterous front paws which contain sensory receptors four times more dense than their back paws.</p>
        </div>
      </> : <>
        <img className="moment-mini-sticker" src={`${BASE}floating-elements/${type}.jpg`} alt="" width="736" height="736" />
        <h2 id="sticker-moment-title" className="annotation">{caption}</h2>
      </>}
    </div>
  </dialog>, document.body);
}
