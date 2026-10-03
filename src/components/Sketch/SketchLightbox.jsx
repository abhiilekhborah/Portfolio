import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
export default function SketchLightbox({ sketches, currentIndex, onClose, onSelectIndex }) {
  const dialog = useRef(null);
  const touch = useRef(null);
  const current = sketches[currentIndex];
  const move = direction => onSelectIndex((currentIndex + direction + sketches.length) % sketches.length);
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    const modal = dialog.current;
    modal.showModal();
    document.body.style.overflow = 'hidden';
    return () => { modal.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return createPortal(<dialog ref={dialog} className="sketch-dialog" aria-labelledby="sketch-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={event => { if (['ArrowLeft','ArrowRight'].includes(event.key)) { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
    <div className="lightbox-sheet">
      <header><span className="eyebrow">SKETCHBOOK / {current.id} OF {String(sketches.length).padStart(2,'0')}</span><button className="icon-button" aria-label="Close sketch viewer" onClick={onClose} autoFocus><X size={22} /></button></header>
      <div className="lightbox-art" onPointerDown={event => {
        if (event.target.closest('button')) return;
        touch.current = [event.clientX, event.clientY];
        event.currentTarget.setPointerCapture(event.pointerId);
      }} onPointerCancel={() => { touch.current = null; }} onPointerUp={event => {
        if (!touch.current) return;
        const dx = event.clientX - touch.current[0], dy = event.clientY - touch.current[1];
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
        touch.current = null;
      }}><img src={current.image} alt={current.caption} draggable="false" /><button className="icon-button lightbox-prev" aria-label="Previous sketch" onClick={() => move(-1)}><ArrowLeft /></button><button className="icon-button lightbox-next" aria-label="Next sketch" onClick={() => move(1)}><ArrowRight /></button></div>
      <footer><div><h3 id="sketch-title">{current.title}</h3><p>{current.caption}</p></div><span className="eyebrow">← → TO BROWSE · ESC TO CLOSE</span></footer>
    </div>
  </dialog>, document.body);
}
