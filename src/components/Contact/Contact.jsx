import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Reveal } from '../Sketch/SectionHeading';
export default function Contact() {
  return <section id="contact" className="section contact-section"><div className="section-inner">
    <div className="eyebrow"><span>07 / THE NEXT CHAPTER</span><span>LET’S MAKE SOMETHING GOOD.</span></div>
    <Reveal className="contact-layout"><h2>GET<br />IN TOUCH<span>.</span></h2><div className="contact-copy"><p>Have an idea, an opportunity,<br />or something interesting to build?</p><a id="say-hello" href={`mailto:${PERSONAL_INFO.links.email}`} className="contact-cta">Say hello <ArrowUpRight /></a><span className="contact-email">{PERSONAL_INFO.links.email}</span></div></Reveal>
    <div className="contact-bottom"><span className="annotation">from the first line to the next idea.</span><div className="social-links"><a href={PERSONAL_INFO.links.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a><a href={PERSONAL_INFO.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16} /></a></div></div>
    <footer className="site-footer"><span>© {new Date().getFullYear()} ABHILEKH BORAH</span><span>CODE & A LITTLE GRAPHITE.</span><a href="#hero">BACK TO TOP <ArrowUp size={13} /></a></footer>
  </div></section>;
}
