import { useState, useEffect, useRef } from 'react';

export default function NeoCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only run on desktop with fine pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    document.body.style.cursor = 'none';

    const handleMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const targetEl = e.target.closest('[data-cursor], button, a, [role="button"]');
      if (targetEl) {
        setIsHovering(true);
        const customText = targetEl.getAttribute('data-cursor');
        if (customText) {
          setCursorText(customText);
        } else if (targetEl.tagName === 'A' && targetEl.getAttribute('target') === '_blank') {
          setCursorText('↗');
        } else {
          setCursorText('');
        }
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22;
      pos.current.y += (target.current.y - pos.current.y) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
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
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Follower Ring / Badge */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform flex items-center justify-center transition-[width,height,margin,opacity] duration-150 ease-out"
        style={{
          width: cursorText ? '48px' : isHovering ? '36px' : '20px',
          height: cursorText ? '26px' : isHovering ? '36px' : '20px',
          marginLeft: cursorText ? '-24px' : isHovering ? '-18px' : '-10px',
          marginTop: cursorText ? '-13px' : isHovering ? '-18px' : '-10px',
          borderRadius: cursorText ? '12px' : '9999px',
          border: '1.5px solid #141312',
          backgroundColor: cursorText ? '#141312' : isHovering ? 'rgba(20, 19, 18, 0.08)' : 'transparent',
          color: '#f6f5f1',
          opacity: isClicking ? 0.9 : 1,
        }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase select-none leading-none">
            {cursorText}
          </span>
        )}
      </div>

      {/* Tiny Ink Pen Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform rounded-full bg-[#141312]"
        style={{
          width: isClicking ? '6px' : cursorText ? '0px' : '5px',
          height: isClicking ? '6px' : cursorText ? '0px' : '5px',
          marginLeft: isClicking ? '-3px' : '-2.5px',
          marginTop: isClicking ? '-3px' : '-2.5px',
          opacity: cursorText ? 0 : 1,
          transition: 'width 0.1s, height 0.1s, opacity 0.1s',
        }}
      />
    </>
  );
}
