import HeroLoader, { HeroComposition } from './HeroLoader';

export default function Hero() {
  return <>
    <section id="hero" className="hero-cover native-hero" aria-label="Portfolio cover">
      <h1 className="sr-only">Abhilekh Borah — Software Developer</h1>
      <HeroComposition />
      <a href="#about" className="hero-explore"><span>SCROLL TO EXPLORE</span><span aria-hidden="true">↓</span></a>
    </section>
    <HeroLoader />
  </>;
}
