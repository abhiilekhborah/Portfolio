import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useScrollSection';
import { playAchievementSound } from '../../utils/sounds';
import PixelIcon from '../UI/PixelIcon';

const ACHIEVEMENTS = [
  {
    id: 1,
    title: 'ML/DL/GENAI WORKSHOP',
    description: 'Completed intensive workshop on Machine Learning, Deep Learning, and Generative AI technologies.',
    icon: 'robot',
    trophy: 'trophy',
    xp: '+1000 XP',
    rarity: 'LEGENDARY',
    rarityColor: '#FFD700',
    borderColor: '#FFD700',
    date: '2024',
  },
  {
    id: 2,
    title: 'SOCIAL INTERNSHIP',
    description: 'Gained real-world experience through social impact internship, applying technology for community benefit.',
    icon: 'users',
    trophy: 'star',
    xp: '+750 XP',
    rarity: 'EPIC',
    rarityColor: '#9B59B6',
    borderColor: '#9B59B6',
    date: '2024',
  },
  {
    id: 3,
    title: 'LEETCODE WARRIOR',
    description: 'Consistently solving algorithmic challenges on LeetCode, building strong problem-solving foundations.',
    icon: 'sword',
    trophy: 'shield',
    xp: '+500 XP',
    rarity: 'RARE',
    rarityColor: '#00FFFF',
    borderColor: '#00FFFF',
    date: 'ONGOING',
  },
  {
    id: 4,
    title: 'CODEFORCES COMPETITOR',
    description: 'Active participant in competitive programming contests on Codeforces platform.',
    icon: 'target',
    trophy: 'flag',
    xp: '+500 XP',
    rarity: 'RARE',
    rarityColor: '#39FF14',
    borderColor: '#39FF14',
    date: 'ONGOING',
  },
];

function AchievementCard({ achievement, index }) {
  const [unlocked, setUnlocked] = useState(false);
  const [cardRef, isInView] = useInView(0.3);

  if (isInView && !unlocked) {
    setTimeout(() => {
      setUnlocked(true);
      if (index === 0) playAchievementSound();
    }, index * 300);
  }

  return (
    <motion.div
      ref={cardRef}
      className="achievement-badge p-5 relative overflow-hidden"
      style={{ borderColor: achievement.borderColor }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
    >
      {/* Achievement Unlock Banner */}
      <AnimatePresence>
        {unlocked && (
          <motion.div
            className="absolute top-0 left-0 right-0 text-center py-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${achievement.rarityColor}30, transparent)`,
              borderBottom: `1px solid ${achievement.rarityColor}40`,
              fontFamily: 'var(--font-pixel)',
              fontSize: '7px',
              color: achievement.rarityColor,
              letterSpacing: '2px',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PixelIcon name="trophy" size={12} className="mr-1 inline-block align-middle" /> ACHIEVEMENT UNLOCKED
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4">
        {/* Icon and Trophy */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.span
              style={{ fontSize: '28px', color: achievement.rarityColor }}
              animate={unlocked ? { rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <PixelIcon name={achievement.icon} size={32} color={achievement.rarityColor} />
            </motion.span>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '11px',
                color: achievement.rarityColor,
                lineHeight: 1.5,
              }}>
                {achievement.title}
              </h3>
              <span style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '7px',
                color: achievement.rarityColor,
                opacity: 0.7,
              }}>
                [{achievement.rarity}]
              </span>
            </div>
          </div>
          <span style={{ fontSize: '24px' }}>
            <PixelIcon name={achievement.trophy} size={32} color={achievement.rarityColor} />
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-vt)',
          fontSize: '16px',
          color: '#aaa',
          lineHeight: 1.5,
          marginBottom: '12px',
        }}>
          {achievement.description}
        </p>

        {/* XP & Date */}
        <div className="flex justify-between items-center" style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px' }}>
          <motion.span
            style={{ color: '#39FF14' }}
            animate={unlocked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            {achievement.xp}
          </motion.span>
          <span style={{ color: '#888' }}>{achievement.date}</span>
        </div>

        {/* XP Bar */}
        <div className="mt-2 stat-bar-track" style={{ height: '6px' }}>
          <motion.div
            className="stat-bar-fill"
            style={{ background: achievement.rarityColor, height: '100%' }}
            initial={{ width: '0%' }}
            animate={unlocked ? { width: '100%' } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative" style={{ zIndex: 1 }}>
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span style={{ color: '#FFD700' }}><PixelIcon name="trophy" size={24} /> </span>
          <span style={{ color: '#00FFFF' }}>TROPHY ROOM</span>
          <span style={{ color: '#FFD700' }}> <PixelIcon name="trophy" size={24} /></span>
        </motion.div>

        <motion.div
          className="text-center mb-10"
          style={{ fontFamily: 'var(--font-vt)', fontSize: '20px', color: '#888' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          QUESTS COMPLETED & BATTLES WON
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((achievement, index) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={index} />
          ))}
        </div>

        {/* Total XP Summary */}
        <motion.div
          className="mt-10 text-center pixel-border-yellow p-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-6 flex-wrap" style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px' }}>
            <span style={{ color: '#FFD700' }}>TOTAL XP: 2750</span>
            <span style={{ color: '#FF6B9D' }}>ACHIEVEMENTS: {ACHIEVEMENTS.length}/{ACHIEVEMENTS.length + 3}</span>
            <span style={{ color: '#39FF14' }}>RANK: ELITE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
