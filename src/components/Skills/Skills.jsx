import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useScrollSection';
import PixelIcon from '../UI/PixelIcon';

const SKILL_CATEGORIES = [
  {
    name: 'LANGUAGES',
    icon: 'terminal',
    color: '#00FFFF',
    skills: [
      { name: 'Python', level: 90, icon: 'terminal' },
      { name: 'C++', level: 75, icon: 'zap' },
      { name: 'Java', level: 70, icon: 'coffee' },
      { name: 'HTML/CSS', level: 85, icon: 'globe' },
      { name: 'SQL', level: 72, icon: 'database' },
    ],
  },
  {
    name: 'FRAMEWORKS & TOOLS',
    icon: 'tool-case',
    color: '#9B59B6',
    skills: [
      { name: 'TensorFlow', level: 82, icon: 'robot' },
      { name: 'Docker', level: 65, icon: 'box' },
      { name: 'GitHub', level: 88, icon: 'git-branch' },
      { name: 'Linux', level: 78, icon: 'terminal' },
      { name: 'n8n', level: 60, icon: 'files' },
    ],
  },
  {
    name: 'DOMAINS',
    icon: 'target',
    color: '#FF6B9D',
    skills: [
      { name: 'Machine Learning', level: 85, icon: 'chart' },
      { name: 'Deep Learning', level: 80, icon: 'eye' },
      { name: 'Web Development', level: 82, icon: 'monitor' },
      { name: 'Data Science', level: 75, icon: 'chart-bar-big' },
    ],
  },
];

function SkillNode({ skill, color, index, animate }) {
  const maxBlocks = 10;
  const filledBlocks = Math.round((skill.level / 100) * maxBlocks);
  const levelLabel = skill.level >= 85 ? 'MAX' : skill.level >= 70 ? 'PRO' : skill.level >= 50 ? 'ADV' : 'INT';

  return (
    <motion.div
      className="skill-node p-3"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ scale: 1.05 }}
      style={{ '--skill-color': color }}
    >
      {/* Skill Icon & Name */}
      <div className="flex items-center gap-2 mb-2">
        <span style={{ fontSize: '18px' }}><PixelIcon name={skill.icon} size={20} color={color} /></span>
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color }}>{skill.name}</span>
      </div>

      {/* XP Bar with blocks */}
      <div className="flex items-center gap-1 mb-1">
        {[...Array(maxBlocks)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              width: '100%',
              height: '8px',
              background: i < filledBlocks ? color : 'rgba(255,255,255,0.08)',
              border: `1px solid ${i < filledBlocks ? color : 'rgba(255,255,255,0.1)'}`,
            }}
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.05 }}
          />
        ))}
      </div>

      {/* Level label */}
      <div className="flex justify-between" style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px' }}>
        <span style={{ color: '#888' }}>LV.{skill.level}</span>
        <span style={{
          color: levelLabel === 'MAX' ? '#FFD700' : levelLabel === 'PRO' ? '#39FF14' : color,
        }}>
          [{levelLabel}]
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [sectionRef, isInView] = useInView(0.1);

  return (
    <section id="skills" ref={sectionRef} className="relative" style={{ zIndex: 1 }}>
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span style={{ color: '#39FF14' }}><PixelIcon name="star" size={24} /> </span>
          <span style={{ color: '#00FFFF' }}>SKILL TREE</span>
          <span style={{ color: '#39FF14' }}> <PixelIcon name="star" size={24} /></span>
        </motion.div>

        <motion.div
          className="text-center mb-10"
          style={{ fontFamily: 'var(--font-vt)', fontSize: '20px', color: '#888' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ABILITIES UNLOCKED THROUGH TRAINING & QUESTS
        </motion.div>

        {/* Skill Categories */}
        <div className="space-y-10">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.15 }}
            >
              {/* Category Header */}
              <div
                className="flex items-center gap-3 mb-5 pb-2"
                style={{ borderBottom: `2px solid ${category.color}30` }}
              >
                <span style={{ fontSize: '20px' }}><PixelIcon name={category.icon} size={28} color={category.color} /></span>
                <span style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '12px',
                  color: category.color,
                  letterSpacing: '2px',
                }}>
                  {category.name}
                </span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${category.color}30, transparent)` }} />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {category.skills.map((skill, idx) => (
                  <SkillNode
                    key={skill.name}
                    skill={skill}
                    color={category.color}
                    index={catIdx * 5 + idx}
                    animate={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Skills Counter */}
        <motion.div
          className="mt-10 text-center pixel-border p-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-6 flex-wrap" style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px' }}>
            <span style={{ color: '#FFD700' }}>
              SKILLS UNLOCKED: {SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0)}
            </span>
            <span style={{ color: '#39FF14' }}>
              AVG LEVEL: {Math.round(
                SKILL_CATEGORIES.flatMap(c => c.skills).reduce((acc, s) => acc + s.level, 0) /
                SKILL_CATEGORIES.flatMap(c => c.skills).length
              )}
            </span>
            <span style={{ color: '#FF6B9D' }}>
              RANK: S
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
