import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSection } from '../../hooks/useScrollSection';
import { playMenuHover, playMenuSelect } from '../../utils/sounds';
import PixelIcon from '../UI/PixelIcon';

const MENU_ITEMS = [
  { id: 'hero', label: 'START', icon: 'play' },
  { id: 'about', label: 'PLAYER', icon: 'user' },
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
      {/* Desktop Menu */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            className="fixed top-0 left-0 right-0 z-50 hidden md:block"
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            exit={{ y: -80 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'rgba(5, 5, 5, 0.95)',
              borderBottom: '3px solid rgba(0, 255, 255, 0.4)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
              {/* Logo */}
              <div
                style={{ fontFamily: 'var(--font-pixel)', fontSize: '10px', color: '#00FFFF' }}
                className="flex items-center gap-2"
              >
                <span style={{ color: '#FF6B9D' }}>♥♥♥</span>
                <span>AB</span>
              </div>

              {/* Menu Items */}
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
                    className="relative px-3 py-2 cursor-pointer transition-colors flex items-center"
                    style={{
                      fontFamily: 'var(--font-pixel)',
                      fontSize: '9px',
                      color: activeSection === item.id ? '#FFD700' : hoveredItem === item.id ? '#00FFFF' : '#888',
                      background: activeSection === item.id ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                      border: 'none',
                      letterSpacing: '1px',
                    }}
                  >
                    {/* Selection cursor */}
                    {(activeSection === item.id || hoveredItem === item.id) && (
                      <motion.span
                        className="absolute left-0 flex items-center h-full pl-1"
                        layoutId="menu-cursor"
                        style={{ color: activeSection === item.id ? '#FFD700' : '#00FFFF' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        <PixelIcon name="play" size={12} />
                      </motion.span>
                    )}
                    <span className="ml-4">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Score display */}
              <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '9px', color: '#FFD700' }}>
                HI-SCORE 99999
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Hamburger */}
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
              fontSize: '20px',
              color: '#00FFFF',
              background: 'rgba(0,0,0,0.8)',
              border: '2px solid #00FFFF',
              padding: '8px 12px',
              lineHeight: 1,
            }}
          >
            {isMobileOpen ? '✕' : '☰'}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'rgba(5, 5, 5, 0.97)',
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,255,255,0.03) 0px, transparent 1px, transparent 4px)',
            }}
          >
            <div
              className="pixel-border p-8"
              style={{ minWidth: '280px' }}
            >
              <div
                className="text-center mb-6"
                style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px', color: '#FFD700' }}
              >
                — MENU —
              </div>

              {MENU_ITEMS.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full text-left py-3 px-4 flex items-center cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '12px',
                    color: activeSection === item.id ? '#FFD700' : '#00FFFF',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span style={{ color: '#FF6B9D', marginRight: '12px', display: 'flex' }}><PixelIcon name={item.icon} size={16} /></span>
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
