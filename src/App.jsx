import { useEffect, useState } from 'react';
import PixelBackground from './components/Background/PixelBackground';
import Hero from './components/Hero/Hero';
import GameMenu from './components/Menu/GameMenu';
import About from './components/About/About';
import CodingStats from './components/CodingStats/CodingStats';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import CustomCursor from './components/UI/CustomCursor';
import AdventureCharacter from './components/UI/AdventureCharacter';

function SectionDivider({ color = 'var(--color-gold)' }) {
  return (
    <div className="flex items-center justify-center py-8 px-4" style={{ zIndex: 1, position: 'relative' }}>
      <div className="flex items-center gap-2 w-full max-w-3xl">
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}40)` }} />
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '4px',
                height: '4px',
                background: i === 2 ? color : `${color}50`,
              }}
            />
          ))}
        </div>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer
      className="text-center py-8 relative"
      style={{
        zIndex: 1,
        borderTop: '3px solid var(--color-panel-border)',
        background: 'var(--color-panel-bg)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: 'var(--color-text-muted)', lineHeight: 2.2 }}>
        <div>
          <span style={{ color: 'var(--color-gold)' }}>SCRIBED & CONSTRUCTED BY</span>
        </div>
        <div style={{ color: 'var(--color-cream)', fontWeight: 'bold' }}>ABHILEKH BORAH</div>
        <div className="mt-2" style={{ fontSize: '8px', color: 'var(--color-text-dim)' }}>
          © 2026 • ALL RIGHTS RESERVED • THE QUEST CONTINUES
        </div>
        <div className="mt-3 flex justify-center gap-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '3px',
                height: '3px',
                background: i % 4 === 0 ? 'var(--color-gold)' : i % 4 === 1 ? 'var(--color-forest-light)' : i % 4 === 2 ? 'var(--color-rust)' : 'var(--color-amber)',
                opacity: 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Preload fonts
    document.fonts.ready.then(() => {
      document.body.classList.add('fonts-loaded');
    });
  }, []);

  return (
    <>
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Pixel Background (Canvas) */}
      <PixelBackground />

      {/* Navigation Menu */}
      {gameStarted && <GameMenu />}

      {/* Interactive Companion Character */}
      {gameStarted && <AdventureCharacter />}

      {/* Main Content */}
      <main>
        <Hero onGameStart={() => setGameStarted(true)} />
        
        {gameStarted && (
          <>
            <SectionDivider color="var(--color-gold)" />
            <About />
            
            <SectionDivider color="var(--color-rust)" />
            <CodingStats />
            
            <SectionDivider color="var(--color-amber)" />
            <Projects />
            
            <SectionDivider color="var(--color-forest-light)" />
            <Skills />
            
            <SectionDivider color="var(--color-gold)" />
            <Experience />
            
            <SectionDivider color="var(--color-rust)" />
            <Contact />
          </>
        )}
      </main>

      {gameStarted && <Footer />}
    </>
  );
}
