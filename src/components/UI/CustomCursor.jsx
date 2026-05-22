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
      // Check if hovering over clickable elements
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
      // Trigger a tiny click particle effect
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

  // If on a touch device, don't show custom cursor
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Main Cursor (The Pixel Pointer) */}
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9999]"
              animate={{
                x: mousePosition.x,
                y: mousePosition.y,
                scale: isHovering ? 1.5 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 1000,
                damping: 50,
                mass: 0.1
              }}
              style={{
                width: '20px',
                height: '20px',
                marginLeft: '-2px', // Offset to make the visual tip align with actual click target
                marginTop: '-2px',
              }}
            >
              {/* Custom SVG Pixel Arrow */}
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: isHovering 
                    ? 'drop-shadow(0 0 6px rgba(0, 255, 255, 0.8))' 
                    : 'drop-shadow(0 0 2px rgba(0,0,0,0.8))'
                }}
              >
                <path d="M0 0V12L3 9H5L8 14L10 13L7 8H11L0 0Z" fill={isHovering ? '#00FFFF' : '#FFFFFF'}/>
                <path d="M1 1.5V10L3.5 7.5H6L8.5 11.5L9 11L6.5 7H9L1 1.5Z" fill={isHovering ? '#FF6B9D' : '#000000'}/>
              </svg>
            </motion.div>

            {/* Trailing Box (Follows with a slight delay) */}
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[9998]"
              animate={{
                x: mousePosition.x,
                y: mousePosition.y,
                opacity: isHovering ? 0 : 0.4,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                mass: 0.5
              }}
              style={{
                width: '16px',
                height: '16px',
                border: '2px solid #9B59B6',
                marginLeft: '8px',
                marginTop: '8px',
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Click Ripple / Pixel Burst Effect */}
      <AnimatePresence>
        {clickEffect && (
          <motion.div
            key={clickEffect.id}
            className="fixed top-0 left-0 pointer-events-none z-[9997]"
            initial={{ 
              x: clickEffect.x - 20, 
              y: clickEffect.y - 20, 
              width: 40, 
              height: 40,
              opacity: 1,
              scale: 0.5,
              rotate: 45
            }}
            animate={{ 
              scale: 1.5,
              opacity: 0,
              rotate: 90
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              border: '4px dotted #00FFFF',
            }}
            onAnimationComplete={() => setClickEffect(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
