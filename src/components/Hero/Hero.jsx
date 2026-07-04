import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCoinSound, playStartSound } from '../../utils/sounds';

/* ===== Pixel Art Adventurer Sprite (CSS grid) ===== */
function PixelAdventurer() {
  // 16x16 classic point-and-click adventurer character sprite
  const sprite = [
    '....0000000.....',
    '...0HHHHHHH0....',
    '...0HHHHHHH0....',
    '...0HFFHFFH0....',
    '...0HFFFFFH0....',
    '....0FSSSF0.....',
    '....0FMMMF0.....',
    '.....0FFF0......',
    '....0CCCCCC0....',
    '...0CRRRRRRC0...',
    '..0CCRRRRRRCC0..',
    '..0C.RRRRRR.C0..',
    '....0RR..RR0....',
    '....0RR..RR0....',
    '...0BBB..BBB0...',
    '...0000..0000...'
  ];

  const colorMap = {
    'H': '#d4a655',   // Gold hair/hat
    'C': '#2a4a35',   // Forest green cape/shoulders
    'F': '#FFD4A8',   // Face
    'S': '#1a1d2e',   // Eyes
    'M': '#c75b39',   // Mouth
    'R': '#5c3d2e',   // Leather tunic/shirt
    'B': '#3a2820',   // Wooden/leather boots
    '0': '#120a06',   // Outline
    '.': 'transparent',
  };

  return (
    <motion.div
      className="inline-block"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(16, 6px)',
          gridTemplateRows: 'repeat(16, 6px)',
          gap: 0,
        }}
      >
        {sprite.map((row, y) =>
          row.split('').map((pixel, x) => (
            <div
              key={`${y}-${x}`}
              style={{
                backgroundColor: colorMap[pixel] || 'transparent',
                width: '6px',
                height: '6px',
              }}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}

/* ===== Main Hero Component ===== */
export default function Hero({ onGameStart }) {
  const [showContent, setShowContent] = useState(false);
  const [introClicked, setIntroClicked] = useState(false);
  const [showPressStart, setShowPressStart] = useState(false);

  useEffect(() => {
    // If they click, we start the loading immediately
    if (introClicked) {
      playCoinSound();
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 800);

      const startTimer = setTimeout(() => {
        setShowPressStart(true);
      }, 1600);

      return () => {
        clearTimeout(contentTimer);
        clearTimeout(startTimer);
      };
    }
  }, [introClicked]);

  const handleEmbark = () => {
    playStartSound();
    if (onGameStart) onGameStart();
    
    setTimeout(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Intro Gatekeeper Overlay */}
      <AnimatePresence>
        {!introClicked && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
            style={{ background: '#0f0b1e' }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            onClick={() => setIntroClicked(true)}
          >
            <motion.div
              style={{ fontFamily: 'var(--font-pixel)', fontSize: 'clamp(10px, 2.5vw, 16px)' }}
              className="text-gold animate-blink-soft cursor-pointer text-center px-6 leading-relaxed"
            >
              [ CLICK TO EMBAK ON THE QUEST ]
              <br />
              <span className="mt-4 block font-vt text-[20px] text-amber">THE ADVENTURE BEGINS NOW</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Title Area */}
      {showContent && (
        <div className="text-center px-4" style={{ zIndex: 5 }}>
          {/* Player Avatar */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            <div className="pixel-border p-4 inline-block bg-[rgba(30,22,48,0.8)]">
              <PixelAdventurer />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: 'clamp(1.2rem, 5vw, 2.8rem)',
              letterSpacing: '4px',
              lineHeight: 1.6,
            }}
            className="text-gold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span style={{ color: '#ffffff', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>ABHILEKH</span>
            <br />
            <span className="text-gold">BORAH</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            style={{
              fontFamily: 'var(--font-vt)',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              letterSpacing: '2px',
            }}
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="text-amber">AI/ML Developer</span>
            <span style={{ color: '#6b5e4a', margin: '0 8px' }}>•</span>
            <span className="text-forest">Backend Dev</span>
            <span style={{ color: '#6b5e4a', margin: '0 8px' }}>•</span>
            <span className="text-gold">Competitive Programmer</span>
          </motion.div>

          {/* Progress / XP Scroll Style */}
          <motion.div
            className="max-w-sm mx-auto mb-10 parchment p-3 px-5 border border-[#6b5a3e] rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex justify-between mb-1" style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px' }}>
              <span className="text-amber">CHAPTER I: THE DEPARTURE</span>
              <span className="text-gold">LVL 21</span>
            </div>
            <div className="stat-bar-track" style={{ height: '10px' }}>
              <motion.div
                className="stat-bar-fill"
                style={{ background: 'linear-gradient(90deg, var(--color-earth-light), var(--color-gold))' }}
                initial={{ width: '0%' }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.5, delay: 1.0, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Press Start / Begin Quest */}
          {showPressStart && (
            <motion.button
              onClick={handleEmbark}
              className="animate-blink-soft cursor-pointer pixel-border px-8 py-3 text-center"
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 'clamp(10px, 2vw, 14px)',
                color: '#000',
                background: 'var(--color-gold)',
                border: '4px solid var(--color-panel-border)',
                letterSpacing: '2px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
            >
              BEGIN QUEST ▶
            </motion.button>
          )}
        </div>
      )}

      {/* Bottom decoration */}
      {showContent && (
        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5 }}
          style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: 'var(--color-text-dim)' }}
        >
          © 2026 ABHILEKH BORAH • ALL RIGHTS RESERVED
        </motion.div>
      )}
    </section>
  );
}
