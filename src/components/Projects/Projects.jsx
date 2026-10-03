import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/portfolioData';
import SectionHeading from '../Sketch/SectionHeading';

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [interaction, setInteraction] = useState(0);
  const region = useRef(null);
  const inView = useInView(region, { amount: 0.25 });
  const reduced = useReducedMotion();
  const paused = hovered || focused || dragging || hidden || stopped || reduced || !inView;
  const project = PROJECTS_DATA[index];
  const go = (next, dir) => { setDirection(dir); setIndex((next + PROJECTS_DATA.length) % PROJECTS_DATA.length); setInteraction(value => value + 1); };
  useEffect(() => {
    const change = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', change);
    return () => document.removeEventListener('visibilitychange', change);
  }, []);
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => { setDirection(1); setIndex(value => (value + 1) % PROJECTS_DATA.length); }, 3000);
    return () => clearTimeout(timer);
  }, [index, paused, interaction]);
  return <section id="projects" className="section projects-section"><div className="section-inner">
    <SectionHeading number="03" label="SELECTED WORK / IDEAS INTO SOFTWARE" title="PROJECTS." note="built this ↓" />
    <div ref={region} className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Selected projects" tabIndex={0}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); go(index + (event.key === 'ArrowRight' ? 1 : -1), event.key === 'ArrowRight' ? 1 : -1); } }}>
      <div className="project-chrome"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>SELECTED_WORK / {String(index + 1).padStart(2,'0')}</span><span>{String(PROJECTS_DATA.length).padStart(2,'0')} PROJECTS</span></div>
      <div className="project-stage" aria-live={paused ? 'polite' : 'off'}>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.article key={project.id} className="project-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${PROJECTS_DATA.length}: ${project.title}`}
            custom={direction} variants={{ enter: dir => ({ opacity: 0, x: reduced ? 0 : dir * 24 }), center: { opacity: 1, x: 0 }, exit: dir => ({ opacity: 0, x: reduced ? 0 : -dir * 24 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: reduced ? 0 : 0.2 }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={reduced ? 0 : 0.08} dragMomentum={false}
            onDragStart={() => setDragging(true)} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 45) go(index + (info.offset.x < 0 ? 1 : -1), info.offset.x < 0 ? 1 : -1); else setInteraction(value => value + 1); setDragging(false); }}>
            <div className="project-copy"><span className="eyebrow">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="project-tech"><span className="eyebrow">BUILT WITH</span><p>{project.tech.join(' / ')}</p></div><div className="project-links">
              {project.demoUrl && <a className="button-solid" href={project.demoUrl} target="_blank" rel="noreferrer" draggable="false">View project <ArrowUpRight size={17} /></a>}
              {project.githubUrl && <a className="text-link" href={project.githubUrl} target="_blank" rel="noreferrer" draggable="false">GitHub <ArrowUpRight size={17} /></a>}
              {!project.demoUrl && !project.githubUrl && <span className="eyebrow">DEMO NOT PUBLISHED</span>}
            </div></div>
            <figure className="project-figure"><div className="project-image">
              {project.image ? <img src={project.image} alt={`${project.title} project preview`} loading="lazy" decoding="async" draggable="false" /> : <div className="triage-preview"><span className="eyebrow">MEDIQUICK / CARE, CONNECTED.</span><div className="triage-title">A shorter path<br />to better care.</div><div className="triage-flow"><span>Patient</span><span>→</span><span>Doctor</span><span>→</span><span>Pharmacy</span></div><span className="eyebrow">APPOINTMENTS · TELECONSULTATION · RECORDS</span></div>}
            </div><figcaption><span>{project.annotation}</span><span aria-hidden="true">↗</span></figcaption></figure>
          </motion.article>
        </AnimatePresence>
      </div>
      <div className="carousel-controls"><div className="carousel-pages">{PROJECTS_DATA.map((item,i) => <button key={item.id} onClick={() => go(i, i > index ? 1 : -1)} aria-label={`Show project ${i + 1}: ${item.title}`} aria-current={i === index ? 'true' : undefined}><span>{String(i + 1).padStart(2,'0')}</span>{i === index && <span className="page-progress"><span key={`${index}-${interaction}-${paused}`} className={paused ? 'is-paused' : ''} /></span>}</button>)}</div><div className="carousel-buttons">
        {!reduced && <button className="icon-button pause-button" onClick={() => setStopped(!stopped)} aria-label={stopped ? 'Play slideshow' : 'Pause slideshow'}>{stopped ? <Play size={15} /> : <Pause size={15} />}</button>}
        <button className="icon-button" onClick={() => go(index - 1, -1)} aria-label="Previous project"><ArrowLeft size={20} /></button><button className="icon-button" onClick={() => go(index + 1, 1)} aria-label="Next project"><ArrowRight size={20} /></button>
      </div></div>
    </div>
    <div className="section-end"><span>{paused ? 'TAKE YOUR TIME.' : 'A NEW PROJECT EVERY 3 SECONDS.'}</span><span>DRAG, SWIPE, OR USE THE ARROWS ↔</span></div>
  </div></section>;
}
