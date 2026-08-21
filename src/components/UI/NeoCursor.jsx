import { useState, useEffect, useRef } from 'react';

export default function NeoCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'none';

    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const el = e.target.closest('button, a, [role="button"], input, textarea, select, [data-cursor="pointer"]');
      setIsHovering(!!el);
    };

    // Smooth animation loop
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x}px, ${target.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Hide on touch devices
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring — follows with lag */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          marginLeft: isHovering ? '-24px' : '-16px',
          marginTop: isHovering ? '-24px' : '-16px',
          border: '3px solid #000',
          background: isClicking
            ? 'var(--color-neo-accent)'
            : isHovering
              ? 'var(--color-neo-secondary)'
              : 'transparent',
          opacity: isClicking ? 0.9 : isHovering ? 0.5 : 0.6,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s, height 0.2s, margin 0.2s, background 0.15s, opacity 0.15s',
          willChange: 'transform',
        }}
      />

      {/* Inner dot — instant position */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isClicking ? '12px' : '8px',
          height: isClicking ? '12px' : '8px',
          marginLeft: isClicking ? '-6px' : '-4px',
          marginTop: isClicking ? '-6px' : '-4px',
          background: '#000',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'width 0.1s, height 0.1s, margin 0.1s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
