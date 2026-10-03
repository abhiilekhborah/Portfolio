import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Hero from './components/Hero/Hero';
import Navbar from './components/Menu/Navbar';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import SketchGallery from './components/Sketch/SketchGallery';
import CodingStats from './components/CodingStats/CodingStats';
import Contact from './components/Contact/Contact';
import ScrollThread from './components/Sketch/ScrollThread';
import FloatingElement from './components/Sketch/FloatingElement';
const Compiler = lazy(() => import('./components/Compiler/Compiler'));

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  const journey = useRef(null);
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  return <MotionConfig reducedMotion="user">
    {hash === '#/compiler' ? <Suspense fallback={<p className="runtime-loading">Opening code runner…</p>}><Compiler /></Suspense> :
      <div className="portfolio">
        <a className="skip-link" href="#about">Skip to content</a>
        <Navbar />
        <main>
          <Hero />
          <div className="journey" ref={journey}>
            <ScrollThread target={journey} />
            <About />
            <FloatingElement type="laptop" side="right" />
            <CodingStats />
            <FloatingElement type="bulb" />
            <Projects />
            <FloatingElement type="raccoon" side="right" />
            <Skills /><Experience />
            <FloatingElement type="movie" side="right" />
            <SketchGallery />
            <FloatingElement type="camera" />
            <Contact />
          </div>
        </main>
      </div>}
    <div className="paper-grain" aria-hidden="true" />
  </MotionConfig>;
}
