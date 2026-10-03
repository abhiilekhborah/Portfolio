import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const BASE = import.meta.env.BASE_URL;
export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [firstVisit] = useState(() => { try { return sessionStorage.getItem('portfolioIntroSeen') !== 'true'; } catch { return true; } });
  const [finished, setFinished] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  useEffect(() => { try { sessionStorage.setItem('portfolioIntroSeen', 'true'); } catch { /* Artwork works without storage. */ } }, []);
  useEffect(() => {
    if (!loaded || !firstVisit || reduced) return;
    // The supplied animation fades to blank at its end; hold its completed artwork.
    const timer = setTimeout(() => setFinished(true), 5050);
    return () => clearTimeout(timer);
  }, [loaded, firstVisit, reduced]);
  const animate = firstVisit && !finished && !reduced;
  return <section id="hero" className="hero-cover" ref={ref} aria-label="Animated portfolio cover">
    <h1 className="sr-only">Abhilekh Borah — Software Developer</h1>
    <motion.div className="hero-artwork" style={reduced ? undefined : { scale, opacity }}>
      <img src={`${BASE}${animate ? 'hero-animation.webp' : 'hero-poster.webp'}`} alt="Abhilekh Borah’s hand-drawn portrait, with portfolio lettering and Backend & AI/ML Developer" fetchPriority="high" loading="eager" width="1920" height="1080" onLoad={() => setLoaded(true)} />
    </motion.div>
    <a href="#about" className={`hero-explore ${firstVisit && !reduced ? 'intro-hint' : ''}`}><span>SCROLL TO EXPLORE</span><span aria-hidden="true">↓</span></a>
  </section>;
}
