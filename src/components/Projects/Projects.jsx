import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playMenuHover, playMenuSelect } from '../../utils/sounds';
import PixelIcon from '../UI/PixelIcon';
import RetroPopup from '../UI/RetroPopup';

const PROJECTS = [
  {
    id: 1,
    title: 'YOJANA.SEARCH',
    subtitle: 'AI-Powered Scheme Search',
    description: 'An intelligent search engine that helps citizens find relevant government schemes using AI-powered matching and NLP processing.',
    tech: ['Python', 'NLP', 'Flask', 'AI'],
    color: '#00FFFF',
    borderColor: '#00FFFF',
    level: 'LVL 20',
    xp: '+2006 XP',
    image: '/Portfolio/projects/Yojana_search.JPG',
  },
  {
    id: 2,
    title: 'FACE GENERATOR',
    subtitle: 'GAN Deep Learning',
    description: 'A deep learning project using Generative Adversarial Networks to synthesize realistic human faces from random noise vectors.',
    tech: ['Python', 'TensorFlow', 'GAN', 'Deep Learning'],
    color: '#9B59B6',
    borderColor: '#9B59B6',
    level: 'LVL 20',
    xp: '+2006 XP',
    image: '/Portfolio/projects/Face_generator.JPG',
  },
  {
    id: 3,
    title: 'ARIM AI',
    subtitle: 'AI Assistant',
    description: 'An intelligent AI assistant built to help users with various tasks through natural language understanding and smart automation.',
    tech: ['Python', 'ML', 'API', 'NLP'],
    color: '#FF6B9D',
    borderColor: '#FF6B9D',
    level: 'LVL 20',
    xp: '+2006 XP',
    image: '/Portfolio/projects/ArimAI.WEBP',
  },
  {
    id: 4,
    title: 'OXFORD FLOWERS',
    subtitle: 'Transfer Learning',
    description: 'Image classification system using transfer learning on the Oxford Flowers dataset, achieving high accuracy with pre-trained models.',
    tech: ['Python', 'TensorFlow', 'CNN', 'Transfer Learning'],
    color: '#39FF14',
    borderColor: '#39FF14',
    level: 'LVL 20',
    xp: '+2006 XP',
    image: '/Portfolio/projects/Oxford_flowers.AVIF',
  },
];

function CartridgeCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <motion.div
      className="cartridge p-0 cursor-pointer"
      style={{ borderColor: project.borderColor }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      onMouseEnter={() => { setIsHovered(true); playMenuHover(); }}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        boxShadow: `0 0 20px ${project.color}40, 0 0 40px ${project.color}20`,
      }}
    >
      {/* Cartridge Top Label */}
      <div
        className="text-center py-2 relative"
        style={{
          background: `linear-gradient(180deg, ${project.color}15, transparent)`,
          borderBottom: `2px solid ${project.color}30`,
        }}
      >
        <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: project.color, letterSpacing: '2px' }}>
          GAME PAK
        </div>
      </div>

      {/* Cartridge Label Area */}
      <div className="p-5">
        {/* Pixel Art Thumbnail */}
        <div
          className="mb-4 h-28 flex items-center justify-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}10, ${project.color}05)`,
            border: `2px solid ${project.color}30`,
          }}
        >
          {/* Show image */}
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          
          {/* Fallback grid when no image */}
          {!project.image && (
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(${project.color}15 1px, transparent 1px)`,
              backgroundSize: '8px 8px',
            }} />
          )}

          {/* Project icon - only show if no image */}
          {!project.image && (
            <div className="relative z-10 text-center flex justify-center text-[36px]">
              {project.id === 1 ? <PixelIcon name="search" size={48} /> :
                project.id === 2 ? <PixelIcon name="image" size={48} /> :
                  project.id === 3 ? <PixelIcon name="robot" size={48} /> :
                    <PixelIcon name="star" size={48} />}
            </div>
          )}

          {/* Insert cartridge text on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: `${project.color}40`, zIndex: 10 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span
                  className="animate-blink-soft"
                  style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: project.color }}
                >
                  INSERT CARTRIDGE
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
            fontSize: '12px',
            color: project.color,
            lineHeight: 1.4,
          }}
        >
          {project.title}
        </h3>

        {/* Subtitle */}
        <div
          className="mb-3"
          style={{ fontFamily: 'var(--font-vt)', fontSize: '16px', color: '#888' }}
        >
          {project.subtitle}
        </div>

        {/* Description */}
        <p
          className="mb-4"
          style={{
            fontFamily: 'var(--font-vt)',
            fontSize: '16px',
            color: '#aaa',
            lineHeight: 1.5,
          }}
        >
          {project.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1"
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: '7px',
                color: project.color,
                border: `1px solid ${project.color}50`,
                background: `${project.color}10`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Level & XP */}
        <div className="flex justify-between items-center mb-4" style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px' }}>
          <span style={{ color: '#FFD700' }}>{project.level}</span>
          <span style={{ color: '#39FF14' }}>{project.xp}</span>
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
              fontSize: '9px',
              color: '#000',
              background: project.color,
              border: 'none',
              transition: 'all 0.1s',
            }}
            onMouseEnter={(e) => e.target.style.filter = 'brightness(1.3)'}
            onMouseLeave={(e) => e.target.style.filter = 'none'}
          >
            ▶ PLAY
          </button>
          <button
            onClick={() => playMenuSelect()}
            className="flex-1 py-2 cursor-pointer"
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '9px',
              color: project.color,
              background: 'transparent',
              border: `2px solid ${project.color}`,
              transition: 'all 0.1s',
            }}
            onMouseEnter={(e) => { e.target.style.background = `${project.color}20`; }}
            onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}
          >
            SOURCE
          </button>
        </div>
      </div>

      {/* Bottom connector */}
      <div
        className="h-6 flex items-center justify-center"
        style={{
          background: 'rgba(0,0,0,0.3)',
          borderTop: `2px solid ${project.color}20`,
        }}
      >
        <div className="flex gap-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ width: '4px', height: '8px', background: `${project.color}30` }} />
          ))}
        </div>
      </div>

      {/* Retro Popup */}
      <AnimatePresence>
        {showPopup && (
          <RetroPopup isOpen={showPopup} onClose={() => setShowPopup(false)} message="UNPLAYABLE" />
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
          <span style={{ color: '#FF6B9D' }}><PixelIcon name="file" size={24} /> </span>
          <span style={{ color: '#00FFFF' }}>QUEST LOG</span>
          <span style={{ color: '#FF6B9D' }}> <PixelIcon name="file" size={24} /></span>
        </motion.div>

        <motion.div
          className="text-center mb-10"
          style={{ fontFamily: 'var(--font-vt)', fontSize: '20px', color: '#888' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          SELECT A CARTRIDGE TO BEGIN YOUR QUEST
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.map((project, index) => (
            <CartridgeCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
