import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FolderOpen, ExternalLink, Code, Star } from 'lucide-react';
import NeoPopup from '../UI/NeoPopup';

const PROJECTS = [
  {
    id: 1,
    title: 'YOJANA.SEARCH',
    subtitle: 'AI Scheme Matcher',
    description: 'An intelligent search system that helps citizens discover relevant government schemes using semantic matching and NLP processing.',
    tech: ['Python', 'NLP', 'Flask', 'AI'],
    color: 'var(--color-neo-accent)',
    bg: 'bg-neo-accent',
    image: '/Portfolio/projects/Yojana_search.JPG',
  },
  {
    id: 2,
    title: 'FACE GENERATOR',
    subtitle: 'GAN Deep Learning',
    description: 'A deep generative model using Generative Adversarial Networks to synthesize high-fidelity human faces from pure noise vectors.',
    tech: ['Python', 'TensorFlow', 'GANs', 'DL'],
    color: 'var(--color-neo-secondary)',
    bg: 'bg-neo-secondary',
    image: '/Portfolio/projects/Face_generator.JPG',
  },
  {
    id: 3,
    title: 'ARIM AI',
    subtitle: 'Autonomous Assistant',
    description: 'An intelligent companion AI built to assist users with administrative and creative tasks using natural language understanding.',
    tech: ['Python', 'ML', 'APIs', 'NLP'],
    color: 'var(--color-neo-muted)',
    bg: 'bg-neo-muted',
    image: '/Portfolio/projects/ArimAI.WEBP',
  },
  {
    id: 4,
    title: 'OXFORD FLOWERS',
    subtitle: 'Computer Vision',
    description: 'Computer vision classification system utilizing transfer learning on Oxford Flowers dataset, achieving high precision cataloging.',
    tech: ['Python', 'TF', 'CNNs', 'Vision'],
    color: 'var(--color-neo-accent)',
    bg: 'bg-neo-accent',
    image: '/Portfolio/projects/Oxford_flowers.AVIF',
  },
];

function ProjectCard({ project, index }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <motion.div
      className="neo-card p-0 overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}

    >
      {/* Image area */}
      <div className="relative h-40 border-b-4 border-black overflow-hidden bg-neo-bg">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Number badge */}
        <div
          className="absolute top-3 left-3 neo-badge bg-black text-white"
          style={{ transform: 'rotate(-3deg)' }}
        >
          #{String(project.id).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold uppercase tracking-tight mb-1">
          {project.title}
        </h3>
        <div className="text-sm font-bold uppercase tracking-wider opacity-50 mb-3">
          {project.subtitle}
        </div>
        <p className="text-sm font-medium leading-relaxed opacity-80 mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="neo-badge text-[10px]"
              style={{ background: project.color, fontSize: '10px' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => {

              if (project.id === 1) {
                window.open('https://drive.google.com/file/d/1Ty7ctoCpFRQLo_IOG8MIleYIWKUW3otJ/view?usp=sharing', '_blank');
              } else if (project.id === 3) {
                window.open('https://drive.google.com/file/d/1LAoZlFC4Vm0-yRD1IYYCJlZM_Kz5udyS/view?usp=sharing', '_blank');
              } else {
                setShowPopup(true);
              }
            }}
            className="neo-btn neo-btn-primary flex-1 text-xs py-2 px-3"
          >
            <ExternalLink size={12} strokeWidth={3} /> VIEW
          </button>
          <button

            className="neo-btn neo-btn-outline flex-1 text-xs py-2 px-3"
          >
            <Code size={12} strokeWidth={3} /> CODE
          </button>
        </div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <NeoPopup isOpen={showPopup} onClose={() => setShowPopup(false)} message="COMING SOON" />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative bg-neo-bg" style={{ zIndex: 1 }}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-neo-muted border-4 border-black p-2" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
              <FolderOpen size={20} strokeWidth={3} />
            </div>
            <h2 className="section-title mb-0">PROJECTS</h2>
          </div>
          <p className="section-subtitle mb-0">THINGS I'VE BUILT & SHIPPED</p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Bottom decorative badge */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="neo-badge neo-badge-pill bg-neo-secondary flex items-center gap-2" style={{ transform: 'rotate(2deg)' }}>
            <Star size={12} strokeWidth={3} fill="#000" />
            MORE PROJECTS COMING SOON
            <Star size={12} strokeWidth={3} fill="#000" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
