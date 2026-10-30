import { useEffect, useState } from 'react';

const SESSION_KEY = 'portfolioNativeIntroSeen';
export function HeroComposition({ animated = false }) {
  return <div className={`intro-stage${animated ? ' intro-animated' : ''}`} aria-hidden="true">
    <div className="intro-paper" />
    <div className="intro-name">ABHILEKH BORAH</div><div className="intro-rule" />
    <div className="intro-role">Backend &amp; AI/ML<br />Developer</div>
    <div className="intro-port">port</div>
    <div className="intro-portrait"><img src={`${import.meta.env.BASE_URL}intro/portrait.webp`} width="480" height="984" alt="" fetchPriority="high" decoding="async" /></div>
    <div className="intro-folio">folio.</div>
    <div className="intro-tagline">BACKEND • APIs • SYSTEMS • AI / ML</div>
  </div>;
}

export default function HeroLoader() {
  const [visible, setVisible] = useState(() => { try { return sessionStorage.getItem(SESSION_KEY) !== 'true'; } catch { return true; } });
  const [exiting, setExiting] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ready = document.readyState === 'complete', elapsed = false, removal;
    const finish = () => {
      if (!ready || !elapsed) return;
      setExiting(true);
      removal = setTimeout(() => { setVisible(false); try { sessionStorage.setItem(SESSION_KEY, 'true'); } catch { /* Optional session storage. */ } }, reduced ? 150 : 680);
    };
    const loaded = () => { ready = true; finish(); };
    window.addEventListener('load', loaded, { once: true });
    const timeline = setTimeout(() => { elapsed = true; finish(); }, reduced ? 600 : 5100);
    return () => { clearTimeout(timeline); clearTimeout(removal); window.removeEventListener('load', loaded); };
  }, [visible]);
  if (!visible) return null;
  return <div className={`hero-loader${exiting ? ' intro-exiting' : ''}`} role="status" aria-live="polite">
    <span className="intro-sr-only">Loading</span><HeroComposition animated />
  </div>;
}
