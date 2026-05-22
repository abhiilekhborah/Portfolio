import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useScrollSection';
import { usePixelTypewriter } from '../../hooks/usePixelTypewriter';
import PixelIcon from '../UI/PixelIcon';

const STATS = [
  { label: 'INTELLIGENCE', value: 90, color: '#00FFFF' },
  { label: 'ML SKILLS', value: 85, color: '#9B59B6' },
  { label: 'WEB DEV', value: 80, color: '#39FF14' },
  { label: 'DSA', value: 75, color: '#FFD700' },
  { label: 'CREATIVITY', value: 88, color: '#FF6B9D' },
  { label: 'TEAMWORK', value: 82, color: '#FF6600' },
];

const BIO_TEXT = `BTech CSE student with a passion for building impactful tools. Specializing in AI/ML and full-stack development, I love turning complex problems into elegant solutions. Currently leveling up in competitive programming and deep learning.`;

function StatBar({ label, value, color, delay, animate }) {
  return (
    <div className="mb-3">
      <div
        className="flex justify-between mb-1"
        style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px' }}
      >
        <span style={{ color }}>{label}</span>
        <span style={{ color: '#888' }}>{value}/100</span>
      </div>
      <div className="stat-bar-track">
        <motion.div
          className="stat-bar-fill"
          style={{ background: color }}
          initial={{ width: '0%' }}
          animate={animate ? { width: `${value}%` } : { width: '0%' }}
          transition={{ duration: 1.2, delay: delay, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

function PixelCharacter() {
  const sprite = [
    '....0000....',
    '..00CCCC00..',
    '..0CCCCCC0..',
    '..0FSSFSS0..',
    '..0FFFFFF0..',
    '..00FMMF00..',
    '....0FF0....',
    '..PPPPPPPP..',
    '.PPPCPPPCPP.',
    '..PPPPPPPP..',
    '..PPPCPCPP..',
    '..PPPPPPPP..',
    '...PP..PP...',
    '...PP..PP...',
    '..00PP00PP..',
    '..BBB..BBB..',
  ];
  const colorMap = {
    'C': '#00FFFF', 'F': '#FFD4A8', 'S': '#1a1a2e',
    'M': '#FF6B9D', 'P': '#9B59B6', 'B': '#3a3a5c', '0': '#1a1a2e', '.': 'transparent',
  };

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'steps(3)' }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 5px)',
        gridTemplateRows: 'repeat(16, 5px)',
        gap: 0,
      }}>
        {sprite.map((row, y) =>
          row.split('').map((pixel, x) => (
            <div key={`${y}-${x}`} style={{
              backgroundColor: colorMap[pixel] || 'transparent',
              width: '5px', height: '5px',
            }} />
          ))
        )}
      </div>
    </motion.div>
  );
}

export default function About() {
  const [sectionRef, isInView] = useInView(0.15);
  const { displayText, isComplete } = usePixelTypewriter(BIO_TEXT, 20, 500, isInView);

  return (
    <section id="about" ref={sectionRef} className="relative" style={{ zIndex: 1 }}>
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span style={{ color: '#FFD700' }}><PixelIcon name="user" size={24} /> </span>
          <span style={{ color: '#00FFFF' }}>PLAYER PROFILE</span>
          <span style={{ color: '#FFD700' }}> <PixelIcon name="user" size={24} /></span>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: Character Card */}
          <motion.div
            className="md:col-span-2 pixel-border p-6 text-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Character sprite */}
            <div className="flex justify-center mb-4">
              <div className="pixel-border-purple p-4 inline-block">
                <PixelCharacter />
              </div>
            </div>

            {/* Player Name */}
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px', color: '#00FFFF' }} className="mb-2">
              ABHILEKH BORAH
            </div>

            {/* Class */}
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color: '#FF6B9D' }} className="mb-4">
              FULL STACK MAGE
            </div>

            {/* Level & XP */}
            <div className="pixel-border-yellow p-3 mb-3">
              <div className="flex justify-between items-center" style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px' }}>
                <span style={{ color: '#FFD700' }}>LVL 21</span>
                <span style={{ color: '#39FF14' }}>XP 8750</span>
              </div>
            </div>

            {/* Info items */}
            <div className="text-left space-y-2" style={{ fontFamily: 'var(--font-vt)', fontSize: '16px' }}>
              {[
                { icon: 'book-open', text: 'BTech CSE Student', color: '#00FFFF' },
                { icon: 'robot', text: 'AI/ML Enthusiast', color: '#9B59B6' },
                { icon: 'monitor', text: 'Full-Stack Developer', color: '#39FF14' },
                { icon: 'sword', text: 'Competitive Programmer', color: '#FF6B9D' },
                { icon: 'tool-case', text: 'Tool Builder', color: '#FFD700' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <PixelIcon name={item.icon} size={20} color={item.color} />
                  <span style={{ color: item.color }}>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats & Bio */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Bio Dialog Box */}
            <div className="pixel-border p-5 mb-6 relative">
              <div
                className="absolute -top-3 left-4 px-2"
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '9px',
                  color: '#FFD700',
                  background: 'var(--color-navy-dark)',
                }}
              >
                BIO
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-vt)',
                  fontSize: '20px',
                  lineHeight: 1.6,
                  color: '#ddd',
                  minHeight: '120px',
                }}
              >
                {isInView ? displayText : ''}
                {!isComplete && isInView && (
                  <span className="inline-block w-2 h-5 ml-1 animate-blink" style={{ background: '#00FFFF', verticalAlign: 'middle' }} />
                )}
              </p>
            </div>

            {/* Stats Panel */}
            <div className="pixel-border-purple p-5 relative">
              <div
                className="absolute -top-3 left-4 px-2"
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '9px',
                  color: '#9B59B6',
                  background: 'var(--color-navy-dark)',
                }}
              >
                STATS
              </div>
              {STATS.map((stat, i) => (
                <StatBar
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  color={stat.color}
                  delay={0.3 + i * 0.15}
                  animate={isInView}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
