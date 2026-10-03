import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
const ITEMS = [['about','About'], ['profiles','Code'], ['projects','Projects'], ['skills','Skills'], ['experience','Experience'], ['sketches','Sketches'], ['contact','Contact']];
export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('about');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('hero');
    const coverObserver = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { rootMargin: '-64px 0px 0px', threshold: 0.7 });
    if (hero) coverObserver.observe(hero);
    const sectionObserver = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-20% 0px -55% 0px' });
    ITEMS.forEach(([id]) => { const el = document.getElementById(id); if (el) sectionObserver.observe(el); });
    return () => { coverObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);
  return <header className={`site-header ${visible ? 'is-visible' : ''}`} inert={!visible}>
    <a href="#hero" className="wordmark" onClick={() => setOpen(false)}>ABHILEKH<span>.</span></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    <nav id="main-navigation" className={open ? 'is-open' : ''} aria-label="Main navigation" onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); document.querySelector('.menu-toggle')?.focus(); } }}>
      {ITEMS.map(([id,label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
  </header>;
}
