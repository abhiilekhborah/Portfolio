import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({ children, className = '', ...props }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} {...props}>{children}</motion.div>;
}
export default function SectionHeading({ number, label, title, note }) {
  return <Reveal className="section-heading">
    <div className="eyebrow"><span>{number} / {label}</span><span className="section-rule" /></div>
    <div className="heading-row"><h2>{title}</h2>{note && <p className="annotation">{note}</p>}</div>
  </Reveal>;
}
