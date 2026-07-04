import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSection } from '../../hooks/useScrollSection';
import { playMenuHover, playMenuSelect } from '../../utils/sounds';
import PixelIcon from '../UI/PixelIcon';

const MENU_ITEMS = [
  { id: 'hero', label: 'START', icon: 'play' },
  { id: 'about', label: 'PLAYER', icon: 'user' },
  { id: 'stats', label: 'STATS', icon: 'gamepad' },
  { id: 'projects', label: 'QUESTS', icon: 'file' },
  { id: 'skills', label: 'SKILLS', icon: 'star' },
  { id: 'experience', label: 'TROPHIES', icon: 'trophy' },
  { id: 'contact', label: 'CONTACT', icon: 'mail' },
];

const SECTION_IDS = MENU_ITEMS.map(item => item.id);

export default function GameMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const activeSection = useScrollSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      playMenuSelect();
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Ribbon Menu */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            className="fixed top-0 left-0 right-0 z-50 hidden md:block"
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            exit={{ y: -80 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'linear-gradient(180deg, #3a2820 0%, #2a1a12 100%)',
              borderBottom: '4px solid var(--color-panel-border)',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Top border decoration */}
            <div style={{
              height: '3px',
              background: 'repeating-linear-gradient(90deg, var(--color-gold) 0px, var(--color-gold) 6px, transparent 6px, transparent 12px)'
            }} />

            <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
              {/* Adventurer Compass Logo */}
              <div
                style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color: 'var(--color-gold)' }}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => scrollTo('hero')}
              >
                <PixelIcon name="star" size={14} color="var(--color-gold)" className="animate-spin" style={{ animationDuration: '6s' }} />
                <span>JOURNAL</span>
              </div>

              {/* Menu wooden tabs */}
              <div className="flex items-center gap-1">
                {MENU_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    onMouseEnter={() => {
                      setHoveredItem(item.id);
                      playMenuHover();
                    }}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative px-3 py-2.5 cursor-pointer transition-colors flex items-center"
                    style={{
                      fontFamily: 'var(--font-pixel)',
                      fontSize: '9px',
                      color: activeSection === item.id ? 'var(--color-gold)' : hoveredItem === item.id ? 'var(--color-cream)' : 'var(--color-text-muted)',
                      background: activeSection === item.id ? 'rgba(212, 166, 85, 0.08)' : 'transparent',
                      border: 'none',
                      letterSpacing: '1px',
                    }}
                  >
                    {/* Golden Bookmark/Arrow Pointer */}
                    {(activeSection === item.id || hoveredItem === item.id) && (
                      <motion.span
                        className="absolute left-0 flex items-center h-full pl-1"
                        layoutId="menu-cursor"
                        style={{ color: 'var(--color-gold)' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        <span style={{ fontSize: '8px' }}>▶</span>
                      </motion.span>
                    )}
                    <span className="ml-3">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Gold Counter (Leetcode Solved + Codeforces Solved fallback = 842 + 157 = 999) */}
              <div className="flex items-center gap-1.5" style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color: 'var(--color-gold)' }}>
                <PixelIcon name="coin" size={14} color="var(--color-gold)" />
                <span className="glow-yellow">GOLD: 999</span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Map Toggle Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            className="fixed top-4 right-4 z-[60] md:hidden cursor-pointer flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsMobileOpen(!isMobileOpen);
              playMenuSelect();
            }}
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '11px',
              color: 'var(--color-gold)',
              background: '#3a2820',
              border: '3px solid var(--color-panel-border)',
              padding: '10px 14px',
              lineHeight: 1,
              boxShadow: '4px 4px 0 rgba(0,0,0,0.4)',
            }}
          >
            {isMobileOpen ? 'CLOSE MAP' : 'OPEN MAP'}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Map/Journal Scroll Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'rgba(15, 11, 30, 0.96)',
            }}
          >
            <div
              className="dialogue-box p-8 max-w-[320px] w-full"
              style={{ background: '#f0e6d3', border: '5px solid #6b5a3e' }}
            >
              {/* Dialogue Corner Ornaments */}
              <div className="absolute top-1 left-1 font-pixel text-[8px] text-[#6b5a3e]">✦</div>
              <div className="absolute top-1 right-1 font-pixel text-[8px] text-[#6b5a3e]">✦</div>
              <div className="absolute bottom-1 left-1 font-pixel text-[8px] text-[#6b5a3e]">✦</div>
              <div className="absolute bottom-1 right-1 font-pixel text-[8px] text-[#6b5a3e]">✦</div>

              <div
                className="text-center mb-6 pb-2"
                style={{
                  fontFamily: 'var(--font-pixel)',
                  fontSize: '12px',
                  color: '#3a2820',
                  borderBottom: '2px dashed #6b5a3e'
                }}
              >
                — QUEST MAP —
              </div>

              <div className="space-y-2">
                {MENU_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="w-full text-left py-3 px-4 flex items-center cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      fontFamily: 'var(--font-pixel)',
                      fontSize: '10px',
                      color: activeSection === item.id ? 'var(--color-rust)' : '#3a2820',
                      background: activeSection === item.id ? 'rgba(199, 91, 57, 0.1)' : 'none',
                      border: 'none',
                      borderBottom: '1px solid rgba(107, 90, 62, 0.15)',
                    }}
                  >
                    <span style={{ color: 'var(--color-rust)', marginRight: '12px', display: 'flex' }}>
                      <PixelIcon name={item.icon} size={14} color="var(--color-rust)" />
                    </span>
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
