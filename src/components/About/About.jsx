import { motion } from 'framer-motion';
import { User, BookOpen, Brain, Server, Sword, Wrench } from 'lucide-react';

const BIO_TEXT = `A developer crafting intelligent systems and robust backends. Specializing in AI/ML architectures and solid backend engineering, I tackle algorithmic challenges with a passion for clean, efficient code. Currently deepening my expertise in deep learning and competitive programming.`;

const INFO_ITEMS = [
  { icon: BookOpen, text: 'BTech CSE Student', color: 'var(--color-neo-accent)' },
  { icon: Brain, text: 'AI/ML Explorer', color: 'var(--color-neo-secondary)' },
  { icon: Server, text: 'Backend Engineer', color: 'var(--color-neo-muted)' },
  { icon: Sword, text: 'Competitive Programmer', color: 'var(--color-neo-accent)' },
  { icon: Wrench, text: 'System Builder', color: 'var(--color-neo-secondary)' },
];

const INTERESTS = [
  'Deep Learning', 'NLP', 'Computer Vision', 'System Design',
  'Competitive Programming', 'Open Source', 'Backend Architecture',
];

export default function About() {
  return (
    <section id="about" className="relative bg-neo-bg" style={{ zIndex: 1 }}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-neo-accent border-4 border-black p-2" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
              <User size={20} strokeWidth={3} />
            </div>
            <h2 className="section-title mb-0">ABOUT ME</h2>
          </div>
          <p className="section-subtitle mb-0">WHO I AM & WHAT I DO</p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: Profile Card */}
          <motion.div
            className="md:col-span-2 neo-card p-0 overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {/* Name Header */}
            <div className="bg-black text-white p-5 border-b-4 border-black">
              <div className="text-xl font-bold uppercase tracking-tight">ABHILEKH BORAH</div>
              <div className="text-xs font-bold uppercase tracking-widest text-neo-secondary mt-1">
                AI/ML DEVELOPER • BACKEND ENGINEER
              </div>
            </div>

            {/* Info Items */}
            <div className="p-5 space-y-3">
              {INFO_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-2.5 border-3 border-black bg-neo-bg"
                  style={{ boxShadow: '3px 3px 0px 0px #000' }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <div className="p-1.5 border-2 border-black" style={{ background: item.color }}>
                    <item.icon size={14} strokeWidth={3} />
                  </div>
                  <span className="font-bold text-sm uppercase">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio & Interests */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {/* Bio Card */}
            <div className="neo-card p-6 mb-6 relative">
              <div
                className="absolute -top-4 left-4 bg-neo-secondary border-4 border-black px-3 py-1 font-bold text-xs uppercase tracking-wider"
                style={{ boxShadow: '3px 3px 0px 0px #000' }}
              >
                BIO
              </div>
              <p className="text-lg leading-relaxed font-medium mt-2">
                {BIO_TEXT}
              </p>
            </div>

            {/* Interests/Focus Areas Card */}
            <div className="neo-card p-6 relative">
              <div
                className="absolute -top-4 left-4 bg-neo-accent border-4 border-black px-3 py-1 font-bold text-xs uppercase tracking-wider"
                style={{ boxShadow: '3px 3px 0px 0px #000' }}
              >
                FOCUS AREAS
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {INTERESTS.map((interest, i) => {
                  const colors = ['bg-neo-accent', 'bg-neo-secondary', 'bg-neo-muted'];
                  return (
                    <motion.span
                      key={interest}
                      className={`neo-badge ${colors[i % 3]}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                    >
                      {interest}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
