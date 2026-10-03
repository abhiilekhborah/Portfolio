import { PERSONAL_INFO } from '../../data/portfolioData';
import { Reveal } from '../Sketch/SectionHeading';
export default function About() {
  return <section id="about" className="section about-section">
    <div className="section-inner">
      <div className="eyebrow"><span>01 / A LITTLE INTRODUCTION</span><span>BASED IN {PERSONAL_INFO.location.toUpperCase()}</span></div>
      <Reveal className="about-layout">
        <div className="about-title"><h2>HI,<br />I’M<br /><span>ABHILEKH.</span></h2><span className="annotation about-note">a little code, a little graphite ↗</span></div>
        <div className="about-copy">
          <span className="tiny-cross" aria-hidden="true">✳</span>
          <p className="intro-copy">I build backend systems,<br />APIs and software.<br /><span>And sometimes, I sketch.</span></p>
          <p className="body-copy">I’m a Computer Science and Engineering student at Jorhat Engineering College, graduating in 2028.</p>
          <div className="interest-window">
            <div className="window-bar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>currently exploring</span><span aria-hidden="true">↗</span></div>
            <div className="interest-content">BACKEND <span>/</span> APIs<br />SYSTEMS <span>/</span> AI</div>
          </div>
          <a href="#projects" className="text-link">A few things I’ve built <span aria-hidden="true">↗</span></a>
        </div>
      </Reveal>
      <div className="section-end"><span>SOFTWARE DEVELOPER</span><span>CURIOUS BY DEFAULT.</span></div>
    </div>
  </section>;
}
