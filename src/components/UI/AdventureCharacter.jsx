import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playBeep } from '../../utils/sounds';

const QUOTES = [
  "Look behind you, a three-headed monkey!",
  "I am looking for the legendary treasure of Clean Code.",
  "This section looks complicated. Better check my stats.",
  "Solving algorithmic challenges levels up my DSA intelligence.",
  "I've got a bad feeling about this compiler warning...",
  "Use the sword on... the bug? No, that didn't work.",
  "My adventurer class is AI/ML SAGE and BACKEND WARRIOR.",
  "I sync statistics in real-time. That's a high level spell!"
];

export default function AdventureCharacter() {
  const [dialogue, setDialogue] = useState(null);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [isWalking, setIsWalking] = useState(false);
  const [xPos, setXPos] = useState(20);

  // Adventurer sprite layout
  const spriteRight = [
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

  // Logic to make the character walk back and forth occasionally
  useEffect(() => {
    const walkTimer = setInterval(() => {
      if (Math.random() < 0.3 && !dialogue) {
        setIsWalking(true);
        const distance = (30 + Math.random() * 50) * direction;
        
        // Target positioning bounded within side margin
        setXPos(prev => {
          const next = prev + distance;
          if (next > window.innerWidth - 100) {
            setDirection(-1);
            return window.innerWidth - 120;
          }
          if (next < 20) {
            setDirection(1);
            return 30;
          }
          return next;
        });

        // Stop walking after animation
        setTimeout(() => setIsWalking(false), 2000);
      }
    }, 5000);

    return () => clearInterval(walkTimer);
  }, [direction, dialogue]);

  const handleClick = () => {
    playBeep(440, 60, 0.05);
    // Display a random dialogue quote
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setDialogue(randomQuote);

    // Auto-dismiss dialogue bubble
    setTimeout(() => setDialogue(null), 3500);
  };

  return (
    <div
      className="fixed z-40 pointer-events-none"
      style={{
        bottom: '8%',
        left: `${xPos}px`,
        transition: isWalking ? 'left 2s linear' : 'none',
      }}
    >
      <div className="relative pointer-events-auto cursor-pointer" onClick={handleClick}>
        {/* Dialogue Box Speech Bubble */}
        <AnimatePresence>
          {dialogue && (
            <motion.div
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 dialogue-box p-3 text-center"
              style={{
                background: '#f0e6d3',
                border: '3px solid #6b5a3e',
                color: '#3a2820',
                fontFamily: 'var(--font-vt)',
                fontSize: '18px',
                width: '180px',
                zIndex: 50,
                lineHeight: 1.3
              }}
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 20 }}
            >
              {dialogue}
              {/* Little arrow at the bottom of dialogue bubble */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '0',
                  height: '0',
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '8px solid #6b5a3e',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character Sprite Grid */}
        <motion.div
          animate={isWalking ? { y: [0, -3, 0], x: [0, 1, 0] } : { y: [0, -1, 0] }}
          transition={{ duration: isWalking ? 0.3 : 1.5, repeat: Infinity }}
          style={{ transform: `scaleX(${direction})` }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(16, 3.5px)',
              gridTemplateRows: 'repeat(16, 3.5px)',
              gap: 0,
            }}
          >
            {spriteRight.map((row, y) =>
              row.split('').map((pixel, x) => (
                <div
                  key={`${y}-${x}`}
                  style={{
                    backgroundColor: colorMap[pixel] || 'transparent',
                    width: '3.5px',
                    height: '3.5px',
                  }}
                />
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
