import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playMenuHover, playMenuSelect } from '../../utils/sounds';
import PixelIcon from '../UI/PixelIcon';
import RetroPopup from '../UI/RetroPopup';

const PROJECTS = [
  {
    id: 1,
    title: 'YOJANA.SEARCH',
    subtitle: 'AI Scheme Matcher',
    description: 'An intelligent search spell that helps citizens discover relevant government schemes using semantic matching and NLP processing.',
    tech: ['Python', 'NLP', 'Flask', 'AI'],
    color: 'var(--color-amber)',
    borderColor: 'var(--color-amber)',
    level: 'QUEST COMPLETED',
    xp: '+2000 XP',
    image: '/Portfolio/projects/Yojana_search.JPG',
  },
  {
    id: 2,
    title: 'FACE GENERATOR',
    subtitle: 'GAN Deep Magic',
    description: 'A deep generative model using Generative Adversarial Networks to synthesize high-fidelity human faces from pure noise vectors.',
    tech: ['Python', 'TensorFlow', 'GANs', 'DL'],
    color: 'var(--color-gold)',
    borderColor: 'var(--color-gold)',
    level: 'QUEST COMPLETED',
    xp: '+2000 XP',
    image: '/Portfolio/projects/Face_generator.JPG',
  },
  {
    id: 3,
    title: 'ARIM AI',
    subtitle: 'Autonomous Familiar',
    description: 'An intelligent companion AI built to assist users with administrative and creative quests using natural language understanding.',
    tech: ['Python', 'ML', 'APIs', 'NLP'],
    color: 'var(--color-rust)',
    borderColor: 'var(--color-rust)',
    level: 'QUEST COMPLETED',
    xp: '+2000 XP',
    image: '/Portfolio/projects/ArimAI.WEBP',
  },
  {
    id: 4,
    title: 'OXFORD FLOWERS',
    subtitle: 'Botanical Vision',
    description: 'Computer vision classification system utilizing transfer learning on Oxford Flowers, achieving high precision in cataloging.',
    tech: ['Python', 'TF', 'CNNs', 'Vision'],
    color: 'var(--color-forest-light)',
    borderColor: 'var(--color-forest-light)',
    level: 'QUEST COMPLETED',
    xp: '+2000 XP',
    image: '/Portfolio/projects/Oxford_flowers.AVIF',
  },
];

function ScrollCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <motion.div
      className="cartridge p-0 cursor-pointer"
      style={{ borderColor: project.borderColor, background: 'rgba(30, 22, 48, 0.9)' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      onMouseEnter={() => { setIsHovered(true); playMenuHover(); }}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        boxShadow: `0 0 20px ${project.color}30, 0 0 40px ${project.color}15`,
      }}
    >
      {/* Scroll Top Wax Seal Header */}
      <div
        className="text-center py-2 relative"
        style={{
          background: `linear-gradient(180deg, ${project.color}15, transparent)`,
          borderBottom: `2px dashed ${project.color}30`,
        }}
      >
        <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: project.color, letterSpacing: '1px' }}>
          ★ QUEST SCROLL ★
        </div>
      </div>

      {/* Cartridge Label Area / Map Canvas */}
      <div className="p-5">
        {/* Map Image Thumbnail */}
        <div
          className="mb-4 h-28 flex items-center justify-center relative overflow-hidden"
          style={{
            background: 'rgba(212, 197, 160, 0.05)',
            border: `2px solid ${project.color}30`,
          }}
        >
          {/* Show image */}
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'sepia(0.2) contrast(1.1)' }}
            />
          )}
          
          {/* Fallback pattern when no image */}
          {!project.image && (
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(var(--color-panel-border) 1px, transparent 1px)`,
              backgroundSize: '8px 8px',
            }} />
          )}

          {/* Project icon fallback */}
          {!project.image && (
            <div className="relative z-10 text-center flex justify-center text-[36px]">
              {project.id === 1 ? <PixelIcon name="search" size={40} /> :
                project.id === 2 ? <PixelIcon name="image" size={40} /> :
                  project.id === 3 ? <PixelIcon name="robot" size={40} /> :
                    <PixelIcon name="star" size={40} />}
            </div>
          )}

          {/* Unroll scroll overlay on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'rgba(30, 22, 48, 0.75)', zIndex: 10 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span
                  className="animate-blink-soft"
                  style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: project.color }}
                >
                  EXAMINE SCROLL
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Title */}
        <h3
          className="mb-1"
          style={{
            fontFamily: 'var(--font-pixel)',
            fontSize: '11px',
            color: project.color,
            lineHeight: 1.4,
          }}
        >
          {project.title}
        </h3>

        {/* Subtitle */}
        <div
          className="mb-3"
          style={{ fontFamily: 'var(--font-vt)', fontSize: '16px', color: 'var(--color-text-muted)' }}
        >
          {project.subtitle}
        </div>

        {/* Description */}
        <p
          className="mb-4"
          style={{
            fontFamily: 'var(--font-vt)',
            fontSize: '16px',
            color: 'var(--color-text-warm)',
            opacity: 0.85,
            lineHeight: 1.5,
          }}
        >
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5"
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '6px',
                color: project.color,
                border: `1px solid ${project.color}40`,
                background: 'rgba(30, 22, 48, 0.5)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Quest status & XP */}
        <div className="flex justify-between items-center mb-4" style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px' }}>
          <span style={{ color: 'var(--color-gold)' }}>{project.level}</span>
          <span style={{ color: 'var(--color-forest-light)' }}>{project.xp}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              playMenuSelect();
              if (project.id === 1) {
                window.open('https://drive.google.com/file/d/1Ty7ctoCpFRQLo_IOG8MIleYIWKUW3otJ/view?usp=sharing', '_blank');
              } else if (project.id === 3) {
                window.open('https://drive.google.com/file/d/1LAoZlFC4Vm0-yRD1IYYCJlZM_Kz5udyS/view?usp=sharing', '_blank');
              } else if (project.id === 2 || project.id === 4) {
                setShowPopup(true);
              }
            }}
            className="flex-1 py-2 cursor-pointer"
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '8px',
              color: '#000',
              background: project.color,
              border: 'none',
              transition: 'all 0.1s',
            }}
            onMouseEnter={(e) => e.target.style.filter = 'brightness(1.2)'}
            onMouseLeave={(e) => e.target.style.filter = 'none'}
          >
            ▶ EMBARK
          </button>
          <button
            onClick={() => playMenuSelect()}
            className="flex-1 py-2 cursor-pointer"
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '8px',
              color: project.color,
              background: 'transparent',
              border: `2px solid ${project.color}`,
              transition: 'all 0.1s',
            }}
            onMouseEnter={(e) => { e.target.style.background = 'rgba(212, 166, 85, 0.05)'; }}
            onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}
          >
            CODE LOG
          </button>
        </div>
      </div>

      {/* Scroll Bottom Wooden Roller Handle Decoration */}
      <div
        className="h-5 flex items-center justify-center"
        style={{
          background: '#2a1a12',
          borderTop: '2px solid rgba(107, 90, 62, 0.3)',
        }}
      >
        <div className="flex gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ width: '6px', height: '6px', background: 'var(--color-panel-border)', borderRadius: '50%' }} />
          ))}
        </div>
      </div>

      {/* Retro Popup */}
      <AnimatePresence>
        {showPopup && (
          <RetroPopup isOpen={showPopup} onClose={() => setShowPopup(false)} message="QUEST LOCKED" />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative" style={{ zIndex: 1 }}>
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span style={{ color: 'var(--color-rust)' }}><PixelIcon name="file" size={24} color="var(--color-rust)" /> </span>
          <span>QUEST LOG</span>
          <span style={{ color: 'var(--color-rust)' }}> <PixelIcon name="file" size={24} color="var(--color-rust)" /></span>
        </motion.div>

        <motion.div
          className="text-center mb-10"
          style={{ fontFamily: 'var(--font-vt)', fontSize: '20px', color: 'var(--color-text-muted)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          UNROLL A QUEST SCROLL TO READ THE LOG
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.map((project, index) => (
            <ScrollCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
