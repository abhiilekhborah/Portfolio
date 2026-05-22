import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCoinSound, playStartSound } from '../../utils/sounds';

/* ===== Pixel Art Avatar (CSS grid) ===== */
function PixelAvatar() {
  // 16x16 pixel art character sprite
  const sprite = [
    '..00CCCC00......',
    '..0CCCCCC0......',
    '..0FSSFSS0......',
    '..0FFFFFF0......',
    '..00FMMF00......',
    '....0FF0........',
    '..PPPPPPPP......',
    '..PCPCPCPC......',
    '..PPPPPPPP......',
    '..PCPPPPCP......',
    '..PPPPPPPP......',
    '....PP.PP.......',
    '....PP.PP.......',
    '...0PP.PP0......',
    '...00...00......',
    '..BBB...BBB.....',
  ];

  const colorMap = {
    'C': '#00FFFF',   // Cyan hair
    'F': '#FFD4A8',   // Face
    'S': '#1a1a2e',   // Sunglasses
    'M': '#FF6B9D',   // Mouth
    'P': '#9B59B6',   // Purple shirt
    'B': '#3a3a5c',   // Boots
    '0': '#1a1a2e',   // Outline
    '.': 'transparent',
  };

  return (
    <motion.div
      className="inline-block"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'steps(3)' }}
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

/* ===== HUD Elements ===== */
function HUDElement({ label, value, color }) {
  return (
    <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
      <span style={{ color }}>{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

function PixelHeart({ filled }) {
  return (
    <span style={{ color: filled ? '#FF0044' : '#333', fontSize: '14px', fontFamily: 'var(--font-pixel)' }}>
      ♥
    </span>
  );
}

/* ===== Main Hero Component ===== */
export default function Hero({ onGameStart }) {
  const [showContent, setShowContent] = useState(false);
  const [coinInserted, setCoinInserted] = useState(false);
  const [score, setScore] = useState(0);
  const [showPressStart, setShowPressStart] = useState(false);
  const scoreRef = useRef(null);

  useEffect(() => {
    // Coin insert animation on load
    const coinTimer = setTimeout(() => {
      setCoinInserted(true);
      playCoinSound();
    }, 500);

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1800);

    const startTimer = setTimeout(() => {
      setShowPressStart(true);
    }, 3000);

    return () => {
      clearTimeout(coinTimer);
      clearTimeout(contentTimer);
      clearTimeout(startTimer);
    };
  }, []);

  // Score counter animation
  useEffect(() => {
    if (!showContent) return;
    const target = 99999;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setScore(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [showContent]);

  const handlePressStart = () => {
    playStartSound();
    if (onGameStart) onGameStart();
    
    // Give React a tick to render the rest of the page before scrolling
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
      {/* Coin Insert Animation */}
      <AnimatePresence>
        {!coinInserted && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30"
            style={{ background: 'rgba(0,0,0,0.9)' }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.5 } }}
          >
            <motion.div
              style={{ fontFamily: 'var(--font-pixel)', fontSize: 'clamp(12px, 3vw, 20px)' }}
              className="text-yellow-retro animate-blink-soft"
            >
              INSERT COIN ▼
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coin Drop */}
      {coinInserted && (
        <motion.div
          className="absolute z-20"
          style={{ top: '20%' }}
          initial={{ y: -100, opacity: 0, rotateY: 0 }}
          animate={{ y: 0, opacity: [0, 1, 1, 0], rotateY: 720 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              border: '3px solid #CC8800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-pixel)',
              fontSize: '12px',
              color: '#8B4513',
            }}
          >
            ¢
          </div>
        </motion.div>
      )}

      {/* HUD Top Bar */}
      {showContent && (
        <motion.div
          className="absolute top-0 left-0 right-0 px-4 py-3 flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{ 
            background: 'rgba(0,0,0,0.6)', 
            borderBottom: '2px solid rgba(0, 255, 255, 0.3)',
            zIndex: 10,
          }}
        >
          <div className="flex items-center gap-4">
            <HUDElement label="SCORE" value={score.toString().padStart(6, '0')} color="#FFD700" />
          </div>
          <div className="flex items-center gap-1">
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: '#FF0044', marginRight: '4px' }}>
              HP
            </span>
            <PixelHeart filled={true} />
            <PixelHeart filled={true} />
            <PixelHeart filled={true} />
          </div>
          <div className="flex items-center gap-4">
            <HUDElement label="LVL" value="21" color="#39FF14" />
            <HUDElement label="XP" value="8750" color="#9B59B6" />
          </div>
        </motion.div>
      )}

      {/* Main Title Area */}
      {showContent && (
        <div className="text-center px-4" style={{ zIndex: 5 }}>
          {/* Player Avatar */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <div className="pixel-border p-4 inline-block">
              <PixelAvatar />
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
            className="glow-cyan mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span style={{ color: '#00FFFF' }}>ABHILEKH</span>
            <br />
            <span style={{ color: '#FF6B9D' }}>BORAH</span>
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
            transition={{ duration: 0.5, delay: 1 }}
          >
            <span style={{ color: '#FFD700' }}>AI/ML Developer</span>
            <span style={{ color: '#555', margin: '0 8px' }}>•</span>
            <span style={{ color: '#39FF14' }}>Full Stack Builder</span>
            <span style={{ color: '#555', margin: '0 8px' }}>•</span>
            <span style={{ color: '#FF6B9D' }}>Problem Solver</span>
          </motion.div>

          {/* XP Bar */}
          <motion.div
            className="max-w-sm mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex justify-between mb-1" style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px' }}>
              <span style={{ color: '#9B59B6' }}>EXP</span>
              <span style={{ color: '#9B59B6' }}>8750 / 10000</span>
            </div>
            <div className="stat-bar-track">
              <motion.div
                className="stat-bar-fill"
                style={{ background: 'linear-gradient(90deg, #9B59B6, #FF6B9D)' }}
                initial={{ width: '0%' }}
                animate={{ width: '87.5%' }}
                transition={{ duration: 1.5, delay: 1.5, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Press Start */}
          {showPressStart && (
            <motion.button
              onClick={handlePressStart}
              className="animate-blink-soft cursor-pointer"
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 'clamp(10px, 2vw, 14px)',
                color: '#FFD700',
                background: 'none',
                border: 'none',
                letterSpacing: '3px',
                padding: '1rem 2rem',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1, textShadow: '0 0 20px #FFD700' }}
            >
              ▶ PRESS START ◀
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
          transition={{ delay: 3.5 }}
          style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: '#555' }}
        >
          © 2025 ABHILEKH BORAH • ALL RIGHTS RESERVED
        </motion.div>
      )}
    </section>
  );
}
