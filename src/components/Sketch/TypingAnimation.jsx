import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

export default function TypingAnimation({ sayHello = false, onComplete }) {
  const [loaded, setLoaded] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!sayHello || !reduced || loaded !== 8 || paused) return;
    const timer = setTimeout(() => onComplete?.(), 1200);
    return () => clearTimeout(timer);
  }, [sayHello, reduced, loaded, paused, onComplete]);
  return <>
    {sayHello && <div className="typing-greeting" role="status" aria-label="Hello Humans"><span aria-hidden="true" onAnimationEnd={event => { if (event.animationName === 'hello-human-type') onComplete?.(); }} style={{ width: reduced ? '12ch' : loaded === 8 ? undefined : 0, animationPlayState: paused ? 'paused' : 'running', animation: loaded === 8 && !reduced ? 'hello-human-type 2.4s steps(12,end) .2s both' : 'none' }}>Hello Humans</span></div>}
    <div className={`typing-animation${loaded === 8 && !reduced ? ' is-ready' : ' is-still'}`} role="img" aria-label="Animated enthusiastic typing on a keyboard">
      {Array.from({ length: 8 }, (_, index) => <img key={index} className="typing-frame" src={`${import.meta.env.BASE_URL}floating-elements/typing/typing_${String(index).padStart(2, '0')}.webp`} alt="" aria-hidden="true" width="980" height="588" onLoad={() => setLoaded(value => Math.min(value + 1, 8))} style={{ animationDelay: `${-((8 - index) % 8) * .1}s`, animationPlayState: paused ? 'paused' : 'running' }} />)}
    </div>
    {!reduced && <button className="sticker-replay" onClick={() => setPaused(value => !value)}>{paused ? <Play size={15} /> : <Pause size={15} />}{paused ? 'Play animation' : 'Pause animation'}</button>}
  </>;
}
