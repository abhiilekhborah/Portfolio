import { SKILLS_DATA } from '../../data/portfolioData';
import SectionHeading, { Reveal } from '../Sketch/SectionHeading';
const GROUPS = [['languages','Languages'],['backend','Backend & APIs'],['databasesAndTools','Database & tools'],['domains','Areas of interest']];
export default function Skills() {
  return <section id="skills" className="section skills-section"><div className="section-inner">
    <SectionHeading number="04" label="THE TOOLKIT" title="SKILLS." note="the things I reach for." />
    <div className="skills-list">{GROUPS.map(([key,label],i) => <Reveal key={key} className="skill-row"><div className="skill-category"><span className="eyebrow">0{i+1}</span><h3>{label}</h3></div><ul>{SKILLS_DATA[key].map(skill => <li key={skill.name} className={['Python','FastAPI'].includes(skill.name) ? 'circled-skill' : ''}>{skill.name}</li>)}</ul></Reveal>)}</div>
  </div></section>;
}
