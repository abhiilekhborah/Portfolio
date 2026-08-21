import { motion } from 'framer-motion';
import { Award, Brain, Users, Sword, Flag } from 'lucide-react';

const EXPERIENCES = [
  {
    id: 1,
    title: 'ML/DL/GENAI WORKSHOP',
    description: 'Completed intensive training in Machine Learning, Deep Learning, and Generative AI technologies.',
    icon: Brain,
    color: 'var(--color-neo-accent)',
    bg: 'bg-neo-accent',
    date: '2024',
    tag: 'CERTIFICATION',
  },
  {
    id: 2,
    title: 'SOCIAL IMPACT PROJECT',
    description: 'Applied technical skills for public welfare, engineering tools to benefit civic community structures.',
    icon: Users,
    color: 'var(--color-neo-secondary)',
    bg: 'bg-neo-secondary',
    date: '2024',
    tag: 'VOLUNTEER',
  },
  {
    id: 3,
    title: 'LEETCODE — 840+ PROBLEMS',
    description: 'Consistently solving algorithmic challenges across Easy, Medium, and Hard difficulties.',
    icon: Sword,
    color: 'var(--color-neo-muted)',
    bg: 'bg-neo-muted',
    date: 'ONGOING',
    tag: 'COMPETITIVE',
  },
  {
    id: 4,
    title: 'CODEFORCES COMPETITOR',
    description: 'Actively participating in competitive programming rounds and improving problem-solving skills.',
    icon: Flag,
    color: 'var(--color-neo-accent)',
    bg: 'bg-neo-accent',
    date: 'ONGOING',
    tag: 'COMPETITIVE',
  },
];

function ExperienceCard({ experience, index }) {
  const Icon = experience.icon;

  return (
    <motion.div
      className="neo-card p-0 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.12 }}
    >
      {/* Card Header */}
      <div className={`${experience.bg} border-b-4 border-black p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Icon size={18} strokeWidth={3} />
          <span className="font-bold text-xs uppercase tracking-widest">{experience.tag}</span>
        </div>
        <span className="font-bold text-xs uppercase tracking-wider">{experience.date}</span>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <h3 className="text-base font-bold uppercase tracking-tight mb-3">
          {experience.title}
        </h3>
        <p className="text-sm font-medium leading-relaxed opacity-80">
          {experience.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative bg-neo-bg" style={{ zIndex: 1 }}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-neo-secondary border-4 border-black p-2" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
              <Award size={20} strokeWidth={3} />
            </div>
            <h2 className="section-title mb-0">EXPERIENCE</h2>
          </div>
          <p className="section-subtitle mb-0">MILESTONES & ACHIEVEMENTS</p>
        </motion.div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERIENCES.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
