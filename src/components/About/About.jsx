import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useScrollSection';
import { usePixelTypewriter } from '../../hooks/usePixelTypewriter';
import PixelIcon from '../UI/PixelIcon';

const STATS = [
  { label: 'DSA INTELLIGENCE', value: 90, color: 'var(--color-gold)' },
  { label: 'ML ARCHERY', value: 85, color: 'var(--color-rust)' },
  { label: 'WEB ALCHEMY', value: 80, color: 'var(--color-forest-light)' },
  { label: 'PROBLEM SOLVING', value: 92, color: 'var(--color-amber)' },
  { label: 'CREATIVE SPELLS', value: 82, color: 'var(--color-gold)' },
  { label: 'PARTY TEAMWORK', value: 88, color: 'var(--color-text-muted)' },
];

const BIO_TEXT = `A traveling developer crafting intelligent scripts and complex systems. Specializing in AI/ML structures and solid backend architecture, I embark on algorithmic challenges with a passion for clean code. Currently leveling up in deep learning and competitive coding arenas.`;

function StatBar({ label, value, color, delay, animate }) {
  return (
    <div className="mb-3">
      <div
        className="flex justify-between mb-1"
        style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px' }}
      >
        <span style={{ color }}>{label}</span>
        <span style={{ color: 'var(--color-text-muted)' }}>{value}/100</span>
      </div>
      <div className="stat-bar-track" style={{ border: '2px solid var(--color-panel-border)', height: '16px' }}>
        <motion.div
          className="stat-bar-fill"
          style={{ background: color, height: '100%' }}
          initial={{ width: '0%' }}
          animate={animate ? { width: `${value}%` } : { width: '0%' }}
          transition={{ duration: 1.2, delay: delay, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

function PixelAdventurerSprite() {
  const sprite = [
    '....0000000.....',
    '...0HHHHHHH0....',
    '...0HHHHHHH0....',
    '...0HFFHFFH0....',
    '...0HFFFFFH0....',
    '....0FSSSF0.....',
    '....0FMMMF0.....',
    '.....0FFF0......',
    '....0CCCCCC0....',
    '...0CRRRRRRC0...',
    '..0CCRRRRRRCC0..',
    '..0C.RRRRRR.C0..',
    '....0RR..RR0....',
    '....0RR..RR0....',
    '...0BBB..BBB0...',
    '...0000..0000...'
  ];
  const colorMap = {
    'H': '#d4a655',   // Gold hair/hat
    'C': '#2a4a35',   // Forest green cape/shoulders
    'F': '#FFD4A8',   // Face
    'S': '#1a1d2e',   // Eyes
    'M': '#c75b39',   // Mouth
    'R': '#5c3d2e',   // Leather tunic/shirt
    'B': '#3a2820',   // Wooden/leather boots
    '0': '#120a06',   // Outline
    '.': 'transparent',
  };

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(16, 5px)',
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
          <span style={{ color: 'var(--color-gold)' }}><PixelIcon name="user" size={24} color="var(--color-gold)" /> </span>
          <span>PLAYER PROFILE</span>
          <span style={{ color: 'var(--color-gold)' }}> <PixelIcon name="user" size={24} color="var(--color-gold)" /></span>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: Adventurer Journal Card */}
          <motion.div
            className="md:col-span-2 pixel-border p-6 text-center bg-[rgba(30,22,48,0.85)]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Character sprite */}
            <div className="flex justify-center mb-4">
              <div className="pixel-border p-4 inline-block bg-[rgba(15,11,30,0.6)]" style={{ borderColor: 'var(--color-panel-border)' }}>
                <PixelAdventurerSprite />
              </div>
            </div>

            {/* Player Name */}
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '13px', color: '#fff' }} className="mb-2">
              ABHILEKH BORAH
            </div>

            {/* Class */}
            <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color: 'var(--color-amber)' }} className="mb-4">
              ML MAGE / BACKEND WARRIOR
            </div>

            {/* Level & XP Scroll */}
            <div className="parchment p-3 mb-3 border border-[rgba(212,197,160,0.3)]">
              <div className="flex justify-between items-center" style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color: '#3a2820' }}>
                <span style={{ color: 'var(--color-earth-dark)' }}>LVL 21</span>
                <span style={{ color: 'var(--color-rust)' }}>XP 8750</span>
              </div>
            </div>

            {/* Info items */}
            <div className="text-left space-y-2 mt-4" style={{ fontFamily: 'var(--font-vt)', fontSize: '18px' }}>
              {[
                { icon: 'book-open', text: 'BTech CSE Student', color: 'var(--color-gold)' },
                { icon: 'robot', text: 'AI/ML Explorer', color: 'var(--color-rust)' },
                { icon: 'monitor', text: 'Backend Scriptor', color: 'var(--color-forest-light)' },
                { icon: 'sword', text: 'Competitive Knight', color: 'var(--color-amber)' },
                { icon: 'tool-case', text: 'System Artisan', color: 'var(--color-gold)' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <PixelIcon name={item.icon} size={18} color={item.color} />
                  <span style={{ color: 'var(--color-text-warm)' }}>{item.text}</span>
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
            {/* Bio Dialogue Scroll */}
            <div className="dialogue-box p-5 mb-6 relative" style={{ background: '#f0e6d3', border: '4px solid #6b5a3e' }}>
              <div
                className="absolute -top-3 left-4 px-2"
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '8px',
                  color: '#6b5a3e',
                  background: '#f0e6d3',
                  border: '1px solid #6b5a3e'
                }}
              >
                LOGBOOK
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-vt)',
                  fontSize: '20px',
                  lineHeight: 1.6,
                  color: '#3a2820',
                  minHeight: '120px',
                }}
              >
                {isInView ? displayText : ''}
                {!isComplete && isInView && (
                  <span className="inline-block w-2.5 h-4 ml-1 animate-blink" style={{ background: 'var(--color-rust)', verticalAlign: 'middle' }} />
                )}
              </p>
            </div>

            {/* Stats Panel */}
            <div className="pixel-border p-5 relative bg-[rgba(30,22,48,0.85)]">
              <div
                className="absolute -top-3 left-4 px-2"
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '8px',
                  color: 'var(--color-gold)',
                  background: 'var(--color-sky-deep)',
                }}
              >
                ATTRIBUTES
              </div>
              {STATS.map((stat, i) => (
                <StatBar
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  color={stat.color}
                  delay={0.2 + i * 0.1}
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
