import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useScrollSection';
import { Cpu, Terminal, Wrench, Target } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    name: 'LANGUAGES',
    icon: Terminal,
    color: 'var(--color-neo-accent)',
    bg: 'bg-neo-accent',
    skills: ['Python', 'C++', 'Java', 'HTML/CSS', 'SQL'],
  },
  {
    name: 'TOOLS & FRAMEWORKS',
    icon: Wrench,
    color: 'var(--color-neo-secondary)',
    bg: 'bg-neo-secondary',
    skills: ['TensorFlow', 'Docker', 'GitHub', 'Linux', 'n8n'],
  },
  {
    name: 'DOMAINS',
    icon: Target,
    color: 'var(--color-neo-muted)',
    bg: 'bg-neo-muted',
    skills: ['Machine Learning', 'Deep Learning', 'Web Development', 'Data Science'],
  },
];

function SkillChip({ name, color, index }) {
  return (
    <motion.div
      className="neo-card-sm p-3 flex items-center justify-center text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <span className="font-bold text-sm uppercase tracking-wider">{name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const [sectionRef, isInView] = useInView(0.1);

  return (
    <section id="skills" ref={sectionRef} className="relative bg-neo-secondary/15" style={{ zIndex: 1 }}>
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
              <Cpu size={20} strokeWidth={3} />
            </div>
            <h2 className="section-title mb-0">SKILLS</h2>
          </div>
          <p className="section-subtitle mb-0">TECHNOLOGIES I WORK WITH</p>
        </motion.div>

        {/* Skill Categories */}
        <div className="space-y-10">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`${category.bg} border-4 border-black p-2`}
                  style={{ boxShadow: '3px 3px 0px 0px #000' }}
                >
                  <category.icon size={16} strokeWidth={3} />
                </div>
                <span className="font-bold text-sm uppercase tracking-wider">{category.name}</span>
                <div className="flex-1 h-1 bg-black" />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {category.skills.map((skill, idx) => (
                  <SkillChip
                    key={skill}
                    name={skill}
                    color={category.color}
                    index={catIdx * 5 + idx}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          className="mt-10 neo-card p-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-8 flex-wrap font-bold text-xs uppercase tracking-wider">
            <span>
              {SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0)} TECHNOLOGIES
            </span>
            <span className="text-neo-accent">•</span>
            <span>
              {SKILL_CATEGORIES.length} CATEGORIES
            </span>
            <span className="text-neo-accent">•</span>
            <span>ALWAYS LEARNING</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
