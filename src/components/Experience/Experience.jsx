import { EXPERIENCE_DATA } from '../../data/portfolioData';
import SectionHeading, { Reveal } from '../Sketch/SectionHeading';
export default function Experience() {
  const intern = EXPERIENCE_DATA[0], workshop = EXPERIENCE_DATA[1];
  return <section id="experience" className="section experience-section"><div className="section-inner">
    <SectionHeading number="05" label="OUTSIDE THE SANDBOX" title="EXPERIENCE." />
    <Reveal className="experience-layout">
      <div className="experience-company"><span className="eyebrow">01 / INTERNSHIP</span><h3>ADVENX<br />ENTERTAINMENT<br /><span>LLP.</span></h3><p className="experience-date">{intern.period}</p><div className="architecture" aria-label="Illustration: client connects to FastAPI through REST and WebSockets; FastAPI connects to PostgreSQL and WebSocket sessions"><span>CLIENT</span><i>↓ REST / WS</i><span>FASTAPI</span><i>↙ &nbsp; &nbsp; &nbsp; ↘</i><div><span>PostgreSQL</span><span>WebSockets</span></div><p className="annotation">behind the scenes.</p></div></div>
      <div className="experience-detail"><h4>{intern.role}</h4><p className="experience-summary">{intern.summary}</p><ul>{intern.achievements.map((item,i) => <li key={item}><span className="eyebrow">0{i+1}</span><p>{item}</p></li>)}</ul><div className="experience-tech">{intern.tech.map(tech => <span key={tech}>{tech}</span>)}</div></div>
    </Reveal>
    <Reveal className="workshop-row"><span className="eyebrow">02 / CONTINUED LEARNING</span><div><h3>{workshop.role}</h3><p>{workshop.summary}</p></div><span className="experience-date">{workshop.period}</span></Reveal>
  </div></section>;
}
