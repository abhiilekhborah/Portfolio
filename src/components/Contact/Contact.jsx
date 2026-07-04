import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useScrollSection';
import { useMultiLineTypewriter } from '../../hooks/usePixelTypewriter';
import PixelIcon from '../UI/PixelIcon';

const BOOT_LINES = [
  'PREPARING INK & SCRIPT QUILL...',
  'UNROLLING SCRIBE PARCHMENTS...',
  'FEEDING THE CARRIER PIGEONS...',
  'ESTABLISHING CONNECTION WITH THE SAGE...',
  'STATUS: ONLINE',
  'READY TO RECEIVE MESSAGES.',
  '',
  '═══════════════════════════════════════',
  '',
];

const CONTACT_LINKS = [
  {
    command: 'MAIL PIGEON',
    value: 'abhilekhborah428@email.com',
    href: 'mailto:abhilekhborah@email.com',
    color: 'var(--color-gold)',
    icon: 'mail',
  },
  {
    command: 'GITHUB SCROLL',
    value: 'github.com/abhiilekhborah',
    href: 'https://github.com/abhilekhborah',
    color: 'var(--color-forest-light)',
    icon: 'git-branch',
  },
  {
    command: 'LINKEDIN GUILD',
    value: 'linkedin.com/in/abhilekhborah',
    href: 'https://linkedin.com/in/abhilekhborah',
    color: 'var(--color-amber)',
    icon: 'briefcase',
  },
  {
    command: 'LEETCODE TRIAL',
    value: 'leetcode.com/abhilekhborah',
    href: 'https://leetcode.com/abhiilekhborah',
    color: 'var(--color-rust)',
    icon: 'sword',
  },
  {
    command: 'CODEFORCES TRIAL',
    value: 'codeforces.com/abhilekhborah',
    href: 'https://codeforces.com/profile/abhiilekhborah',
    color: 'var(--color-gold)',
    icon: 'flag',
  },
];

export default function Contact() {
  const [termRef, isInView] = useInView(0.2);
  const [bootComplete, setBootComplete] = useState(false);
  const { displayLines, isComplete: bootDone } = useMultiLineTypewriter(
    isInView ? BOOT_LINES : [],
    25,
    200
  );

  useEffect(() => {
    if (bootDone) {
      const timer = setTimeout(() => setBootComplete(true), 300);
      return () => clearTimeout(timer);
    }
  }, [bootDone]);

  return (
    <section id="contact" ref={termRef} className="relative" style={{ zIndex: 1 }}>
      <div className="section-container">
        {/* Section Title */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span style={{ color: 'var(--color-gold)' }}><PixelIcon name="mail" size={24} color="var(--color-gold)" /> </span>
          <span>MESSENGER STATION</span>
          <span style={{ color: 'var(--color-gold)' }}> <PixelIcon name="mail" size={24} color="var(--color-gold)" /></span>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Scribe Board */}
          <div className="dialogue-box p-6 md:p-8" style={{ background: '#f0e6d3', border: '5px solid #6b5a3e' }}>
            {/* Header */}
            <div
              className="absolute top-0 left-0 right-0 px-4 py-2 flex items-center justify-between"
              style={{
                borderBottom: '2px dashed rgba(107, 90, 62, 0.4)',
              }}
            >
              <div className="flex gap-1.5 text-[#6b5a3e] font-pixel text-[8px]">
                <span>✦</span>
              </div>
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: '#3a2820' }}>
                SCRIBE_POST.EXE
              </span>
              <div />
            </div>

            {/* Board Content */}
            <div className="mt-8 space-y-0" style={{ minHeight: '350px' }}>
              {/* Scribe sequence */}
              {displayLines.map((line, i) => (
                <div key={i} className="terminal-line" style={{
                  fontSize: '18px',
                  color: line === 'STATUS: ONLINE' ? 'var(--color-forest-dark)'
                    : line === 'READY TO RECEIVE MESSAGES.' ? 'var(--color-rust)'
                      : line.includes('═') ? 'var(--color-panel-border)'
                        : '#3a2820',
                }}>
                  {line}
                </div>
              ))}

              {/* Message Links */}
              {bootComplete && (
                <motion.div
                  className="space-y-3 pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="terminal-line" style={{ fontSize: '16px', color: '#6b5e4a', marginBottom: '8px' }}>
                    SELECT A DESTINATION FOR YOUR MESSAGE PIGEON:
                  </div>

                  {CONTACT_LINKS.map((link, index) => (
                    <motion.a
                      key={link.command}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2.5 px-4 no-underline parchment"
                      style={{
                        fontFamily: 'var(--font-vt)',
                        fontSize: '20px',
                        border: '2px solid rgba(107, 90, 62, 0.25)',
                        transition: 'all 0.1s',
                        cursor: 'pointer',
                        display: 'block',
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        backgroundColor: 'rgba(107, 90, 62, 0.08)',
                        borderColor: link.color,
                        x: 4,
                      }}
                    >
                      <span style={{ color: 'var(--color-rust)' }}>{'>'} </span>
                      <span style={{ color: '#3a2820', fontFamily: 'var(--font-pixel)', fontSize: '9px', fontWeight: 'bold' }}>
                        {link.command}
                      </span>
                      <span style={{ color: '#8a7350' }}> — </span>
                      <span style={{ color: '#5c3d2e' }}>{link.value}</span>
                      <span className="ml-2.5 inline-flex items-center"><PixelIcon name={link.icon} size={16} color={link.color} /></span>
                    </motion.a>
                  ))}

                  {/* Blinking quill cursor */}
                  <div className="pt-4 flex items-center gap-1">
                    <span style={{ color: 'var(--color-rust)', fontFamily: 'var(--font-vt)', fontSize: '20px' }}>{'>'}</span>
                    <span
                      className="animate-blink inline-block"
                      style={{
                        width: '10px',
                        height: '18px',
                        background: 'var(--color-rust)',
                        verticalAlign: 'middle',
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom message */}
          <motion.div
            className="text-center mt-6"
            style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: 'var(--color-text-dim)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            TRANSMISSION COMPLETE • AWAITING NEXT QUEST
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
