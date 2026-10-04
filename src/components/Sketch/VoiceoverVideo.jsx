import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

export default function VoiceoverVideo() {
  const video = useRef(null);
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(3);
  const [take, setTake] = useState(0);
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    if (!ready) return;
    if (count > 0) {
      const timer = setTimeout(() => setCount(value => value - 1), 1000);
      return () => clearTimeout(timer);
    }
    video.current.play().catch(() => setBlocked(true));
  }, [ready, count, take]);
  return <>
    <h2 id="sticker-moment-title">Do voiceover</h2>
    <p className="annotation voiceover-count" role="status">{!ready ? 'Getting your scene ready…' : count > 0 ? count : 'Your turn!'}</p>
    <video ref={video} className="voiceover-video" src={`${import.meta.env.BASE_URL}floating-elements/voiceover.mp4`} muted playsInline preload="auto" controls={count === 0} onCanPlay={() => setReady(true)} aria-label="Muted One Piece scene for your voiceover" />
    {blocked && <button className="sticker-replay" onClick={() => { video.current.play().then(() => setBlocked(false)).catch(() => {}); }}>Play scene</button>}
    <button className="sticker-replay" onClick={() => { video.current.pause(); video.current.currentTime = 0; setCount(3); setBlocked(false); setTake(value => value + 1); }}><RotateCcw size={15} /> One more take</button>
  </>;
}
