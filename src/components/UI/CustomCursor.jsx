import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [clickEffect, setClickEffect] = useState(null);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        window.getComputedStyle(e.target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleClick = (e) => {
      setClickEffect({ x: e.clientX, y: e.clientY, id: Date.now() });
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('click', handleClick);
    };
  }, [isVisible]);

  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
              scale: isHovering ? 1.25 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 1000,
              damping: 50,
              mass: 0.1
            }}
            style={{
              width: '28px',
              height: '28px',
              // Align index finger tip of the hand icon to the mouse coordinate
              marginLeft: '-4px',
              marginTop: '-2px',
            }}
          >
            {/* Retro Adventure Game Pixelated Hand Cursor */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: isHovering
                  ? 'drop-shadow(0 0 6px #d4a655)'
                  : 'drop-shadow(0 0 2px rgba(0,0,0,0.5))'
              }}
            >
              {isHovering ? (
                /* Grabbing/Interactive Hand */
                <g>
                  {/* Outline */}
                  <path d="M12 2h8v2h-8V2zM8 4h4v2H8V4zm12 0h4v2h-4V4zM4 6h4v2H4V6zm20 0h4v2h-4V6zM2 8h2v14H2V8zm26 0h2v14h-2V8zM4 22h4v2H4v-2zm20 0h4v2h-4v-2zm4 2h4v2h-4v-2zM8 24h16v2H8v-2zm4 2h8v2h-8v-2z" fill="#000" />
                  {/* Hand Body */}
                  <path d="M12 4h8v2h-8V4zM8 6h4v2H8V6zm12 0h4v2h-4V6zm-4 4h4v6h-4v-6zm-4 2h4v4H8v-4zm12 0h4v4h-4v-4zM4 8h24v14H4V8zm4 14h16v2H8v-2zm4 2h8v2h-8v-2z" fill="#FFF" />
                  <path d="M14 6h4v14h-4V6zM10 8h2v10h-2V8zm10 0h2v10h-2V8z" fill="#DDD" />
                </g>
              ) : (
                /* Pointing Hand */
                <g>
                  {/* Outer Black Outline */}
                  <path d="M8 2h6v2H8V2zm6 2h2v12h-2V4zm-8 4h2v8H6V8zm2 8h8v2H8v-2zm-6 2h2v4H2v-4zm2 4h4v2H4v-2zm6 2h10v2H10v-2zm10-4h2v4h-2v-4zm2-2h2v2h-2v-2zm2-2h2v2h-2v-2zm2-2h2v2h-2v-2zm2-2h2v2h-2v-2zm-6-2h2v2h-2V8zm-2-2h2v2h-2V6zm-2-2h2v2h-2V4z" fill="#000" />
                  {/* White Fill */}
                  <path d="M8 4h6v12H8V4zm6 12h2v4h-2v-4zm-8-8h2v8H6V8zm2 8h6v2H8v-2zm-4 2h2v4H4v-4zm6 4h10v2H10v-2zm10-4h2v4h-2v-4zm2-2h2v2h-2v-2zm2-2h2v2h-2v-2zm2-2h2v2h-2v-2z" fill="#FFF" />
                  {/* Shading/Depth Details (Warm grey/parchment tone) */}
                  <path d="M10 5h2v11h-2V5zm4 11h2v3h-2v-3z" fill="#DDD" />
                </g>
              )}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Golden Adventure Sparkle Click Effect */}
      <AnimatePresence>
        {clickEffect && (
          <motion.div
            key={clickEffect.id}
            className="fixed top-0 left-0 pointer-events-none z-[9997] flex items-center justify-center"
            initial={{
              x: clickEffect.x - 16,
              y: clickEffect.y - 16,
              width: 32,
              height: 32,
              opacity: 1,
              scale: 0.2,
              rotate: 0
            }}
            animate={{
              scale: 1.2,
              opacity: 0,
              rotate: 180
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onAnimationComplete={() => setClickEffect(null)}
          >
            {/* Pixel star sparkle shape */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 2h2v4h-2V2zm0 16h2v4h-2v-4ZM2 11h4v2H2v-2zm16 0h4v2h-4v-2zM6 6h2v2H6V6zm10 0h2v2h-2V6zm-10 10h2v2H6v-2zm10 0h2v2h-2v-2z" fill="#d4a655" />
              <rect x="10" y="10" width="4" height="4" fill="#FFE8A3" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
