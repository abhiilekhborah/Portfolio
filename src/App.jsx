import { useEffect, useState } from 'react';
import Hero from './components/Hero/Hero';
import Navbar from './components/Menu/Navbar';
import About from './components/About/About';
import CodingStats from './components/CodingStats/CodingStats';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import NeoCursor from './components/UI/NeoCursor';
import Compiler from './components/Compiler/Compiler';

const TECH_NAMES = [
  'PYTHON', 'TENSORFLOW', 'REACT', 'DOCKER', 'LINUX', 'C++',
  'JAVA', 'NLP', 'DEEP LEARNING', 'GIT', 'SQL', 'FLASK',
  'GANs', 'CNNs', 'VITE', 'NODE.JS', 'MACHINE LEARNING',
];

function SectionDivider() {
  // Shuffle and repeat tech names for a continuous marquee
  const items = [...TECH_NAMES, ...TECH_NAMES, ...TECH_NAMES, ...TECH_NAMES];
  return (
    <div className="w-full overflow-hidden border-y-4 border-black bg-neo-secondary">
      <div className="flex animate-marquee whitespace-nowrap py-3">
        {items.map((tech, i) => (
          <span key={i} className="flex items-center gap-4 mx-4">
            <span className="font-bold text-sm uppercase tracking-widest">
              {tech}
            </span>
            <span className="text-black font-bold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white border-t-4 border-black">
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-2xl font-bold uppercase tracking-tight">
              ABHILEKH BORAH
            </div>
            <div className="text-sm uppercase tracking-widest opacity-60 mt-1">
              AI/ML Developer • Backend Engineer • Competitive Programmer
            </div>
          </div>
          <div className="text-sm uppercase tracking-wider opacity-40">
            MAKE YOUR OWN, DON'T USE MINE
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    document.fonts.ready.then(() => {
      document.body.classList.add('fonts-loaded');
    });

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      // Smooth scroll back to top if entering compiler
      if (window.location.hash === '#/compiler') {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentHash === '#/compiler') {
    return (
      <>
        <NeoCursor />
        <Compiler />
      </>
    );
  }

  return (
    <>
      {/* Interactive Cursor */}
      <NeoCursor />

      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 texture-grid" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <CodingStats />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
