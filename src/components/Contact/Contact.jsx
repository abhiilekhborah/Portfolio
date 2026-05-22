import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useScrollSection';
import { useMultiLineTypewriter } from '../../hooks/usePixelTypewriter';
import PixelIcon from '../UI/PixelIcon';

const BOOT_LINES = [
  'BOOTING CONTACT.SYS...',
  'LOADING PROTOCOLS...',
  'INITIALIZING NETWORK INTERFACE...',
  'CONNECTING TO ABHILEKH.EXE...',
  'STATUS: ONLINE',
  'READY.',
  '',
  '═══════════════════════════════════════',
  '',
];

const CONTACT_LINKS = [
  {
    command: 'EMAIL',
    value: 'abhilekhborah428@email.com',
    href: 'mailto:abhilekhborah@email.com',
    color: '#FFD700',
    icon: 'mail',
  },
  {
    command: 'GITHUB',
    value: 'github.com/abhiilekhborah',
    href: 'https://github.com/abhilekhborah',
    color: '#39FF14',
    icon: 'git-branch',
  },
  {
    command: 'LINKEDIN',
    value: 'linkedin.com/in/abhilekhborah',
    href: 'https://linkedin.com/in/abhilekhborah',
    color: '#00FFFF',
    icon: 'briefcase',
  },
  {
    command: 'LEETCODE',
    value: 'leetcode.com/abhilekhborah',
    href: 'https://leetcode.com/abhiilekhborah',
    color: '#FF6B9D',
    icon: 'sword',
  },
  {
    command: 'CODEFORCES',
    value: 'codeforces.com/abhilekhborah',
    href: 'https://codeforces.com/profile/abhiilekhborah',
    color: '#9B59B6',
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
          <span style={{ color: '#39FF14' }}><PixelIcon name="mail" size={24} /> </span>
          <span style={{ color: '#00FFFF' }}>CONTACT TERMINAL</span>
          <span style={{ color: '#39FF14' }}> <PixelIcon name="mail" size={24} /></span>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Terminal Window */}
          <div className="terminal">
            {/* Terminal Header */}
            <div
              className="absolute top-0 left-0 right-0 px-4 py-2 flex items-center justify-between"
              style={{
                borderBottom: '2px solid rgba(57, 255, 20, 0.3)',
                background: 'rgba(57, 255, 20, 0.05)',
              }}
            >
              <div className="flex gap-2">
                <div style={{ width: '8px', height: '8px', background: '#FF0044' }} />
                <div style={{ width: '8px', height: '8px', background: '#FFD700' }} />
                <div style={{ width: '8px', height: '8px', background: '#39FF14' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '8px', color: '#39FF14' }}>
                CONTACT.SYS v2.0
              </span>
              <div />
            </div>

            {/* Terminal Content */}
            <div className="mt-8 space-y-0" style={{ minHeight: '350px' }}>
              {/* Boot sequence */}
              {displayLines.map((line, i) => (
                <div key={i} className="terminal-line" style={{
                  fontSize: '18px',
                  opacity: line === 'READY.' ? 1 : 0.7,
                  color: line === 'STATUS: ONLINE' ? '#39FF14'
                    : line === 'READY.' ? '#FFD700'
                      : line.includes('═') ? '#00FFFF'
                        : '#39FF14',
                }}>
                  {line}
                </div>
              ))}

              {/* Contact Links */}
              {bootComplete && (
                <motion.div
                  className="space-y-3 pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="terminal-line" style={{ fontSize: '16px', color: '#888', marginBottom: '8px' }}>
                    TYPE A COMMAND OR CLICK TO CONNECT:
                  </div>

                  {CONTACT_LINKS.map((link, index) => (
                    <motion.a
                      key={link.command}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 px-3 no-underline"
                      style={{
                        fontFamily: 'var(--font-vt)',
                        fontSize: '20px',
                        background: 'transparent',
                        border: 'none',
                        transition: 'background 0.1s',
                        cursor: 'pointer',
                        display: 'block',
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.12 }}
                      whileHover={{
                        backgroundColor: 'rgba(57, 255, 20, 0.05)',
                        x: 4,
                      }}
                    >
                      <span style={{ color: '#00FFFF' }}>{'>'} </span>
                      <span style={{ color: link.color, fontFamily: 'var(--font-pixel)', fontSize: '11px' }}>
                        {link.command}
                      </span>
                      <span style={{ color: '#555' }}> — </span>
                      <span style={{ color: '#aaa' }}>{link.value}</span>
                      <span className="ml-2 inline-flex items-center"><PixelIcon name={link.icon} size={20} color={link.color} /></span>
                    </motion.a>
                  ))}

                  {/* Blinking cursor */}
                  <div className="pt-4 flex items-center gap-1">
                    <span style={{ color: '#00FFFF', fontFamily: 'var(--font-vt)', fontSize: '20px' }}>{'>'}</span>
                    <span
                      className="animate-blink inline-block"
                      style={{
                        width: '10px',
                        height: '18px',
                        background: '#39FF14',
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
            style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color: '#555' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            TRANSMISSION COMPLETE • PLAYER 1 AWAITING RESPONSE
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
