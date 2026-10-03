import { useCallback, useState } from 'react';
import { SKETCHES_DATA } from '../../data/portfolioData';
import SectionHeading, { Reveal } from './SectionHeading';
import SketchLightbox from './SketchLightbox';
export default function SketchGallery() {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  return <section id="sketches" className="section sketches-section"><div className="section-inner">
    <SectionHeading number="06" label="AWAY FROM THE KEYBOARD" title={<>I<br />SKETCH.</>} note="some things don’t need a compiler." />
    <div className="sketch-gallery">{SKETCHES_DATA.map((sketch,i) => <Reveal className={`sketch-position sketch-position-${i % 4}`} key={sketch.id}>
      <button className="sketch-sheet" style={{ '--rotation': `${sketch.rotation}deg` }} onClick={() => setSelected(i)} aria-label={`Open sketch: ${sketch.title}`}>
        <span className="sketch-number">#{sketch.id}</span><img src={`${import.meta.env.BASE_URL}sketches/thumbs/${sketch.image.split('/').at(-1).replace('.jpg','.webp')}`} alt={sketch.caption} loading="lazy" decoding="async" width="800" height="1000" />
        <span className="sketch-caption"><span>{sketch.title}</span><span className="sketch-open" aria-hidden="true">↗</span></span>
      </button>
    </Reveal>)}</div>
    <div className="section-end"><span>{String(SKETCHES_DATA.length).padStart(2,'0')} PAGES FROM MY SKETCHBOOK</span><span>OPEN A PAGE TO LOOK CLOSER ↗</span></div>
  </div>
  {selected !== null && <SketchLightbox sketches={SKETCHES_DATA} currentIndex={selected} onClose={close} onSelectIndex={setSelected} />}
  </section>;
}
