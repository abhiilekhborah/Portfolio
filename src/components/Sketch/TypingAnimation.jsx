import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

export default function TypingAnimation() {
  const [loaded, setLoaded] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  return <>
    <div className={`typing-animation${loaded === 8 && !reduced ? ' is-ready' : ' is-still'}`} role="img" aria-label="Animated enthusiastic typing on a keyboard">
      {Array.from({ length: 8 }, (_, index) => <img key={index} className="typing-frame" src={`${import.meta.env.BASE_URL}floating-elements/typing/typing_${String(index).padStart(2, '0')}.png`} alt="" aria-hidden="true" width="980" height="588" onLoad={() => setLoaded(value => Math.min(value + 1, 8))} style={{ animationDelay: `${-((8 - index) % 8) * .1}s`, animationPlayState: paused ? 'paused' : 'running' }} />)}
    </div>
    {!reduced && <button className="sticker-replay" onClick={() => setPaused(value => !value)}>{paused ? <Play size={15} /> : <Pause size={15} />}{paused ? 'Play animation' : 'Pause animation'}</button>}
  </>;
}
