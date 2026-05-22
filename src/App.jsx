import { useEffect, useState } from 'react';
import PixelBackground from './components/Background/PixelBackground';
import Hero from './components/Hero/Hero';
import GameMenu from './components/Menu/GameMenu';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import CustomCursor from './components/UI/CustomCursor';

function SectionDivider({ color = '#00FFFF' }) {
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
        borderTop: '2px solid rgba(0, 255, 255, 0.1)',
        background: 'rgba(0, 0, 0, 0.3)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: '#555', lineHeight: 2.2 }}>
        <div>
          <span style={{ color: '#00FFFF' }}>DESIGNED & BUILT BY</span>
        </div>
        <div style={{ color: '#FFD700' }}>ABHILEKH BORAH</div>
        <div className="mt-2" style={{ fontSize: '8px', color: '#333' }}>
          © 2025 • ALL RIGHTS RESERVED • GAME OVER
        </div>
        <div className="mt-3 flex justify-center gap-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '3px',
                height: '3px',
                background: i % 4 === 0 ? '#00FFFF' : i % 4 === 1 ? '#9B59B6' : i % 4 === 2 ? '#FF6B9D' : '#FFD700',
                opacity: 0.3,
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

      {/* CRT Scanline Overlay */}
      <div className="crt-overlay" />

      {/* Navigation Menu */}
      {gameStarted && <GameMenu />}

      {/* Main Content */}
      <main>
        <Hero onGameStart={() => setGameStarted(true)} />
        
        {gameStarted && (
          <>
            <SectionDivider color="#00FFFF" />
            <About />
            
            <SectionDivider color="#FF6B9D" />
            <Projects />
            
            <SectionDivider color="#39FF14" />
            <Skills />
            
            <SectionDivider color="#FFD700" />
            <Experience />
            
            <SectionDivider color="#9B59B6" />
            <Contact />
          </>
        )}
      </main>

      {gameStarted && <Footer />}
    </>
  );
}
