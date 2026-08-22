import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSection } from '../../hooks/useScrollSection';
import { Menu, X, Star } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'stats', label: 'STATS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'contact', label: 'CONTACT' },
];

const SECTION_IDS = NAV_ITEMS.map(item => item.id);

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeSection = useScrollSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            className="fixed top-0 left-0 right-0 z-50 hidden md:block"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="bg-neo-bg border-b-4 border-black">
              <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <button
                  onClick={() => scrollTo('hero')}
                  className="flex items-center gap-2 cursor-pointer bg-neo-secondary border-4 border-black px-3 py-1.5 font-bold text-sm uppercase tracking-wider"
                  style={{ boxShadow: '3px 3px 0px 0px #000' }}
                >
                  <Star size={14} strokeWidth={3} fill="#000" />
                  <span>AB</span>
                </button>

                 {/* Nav Links */}
                <div className="flex items-center gap-1">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="relative px-3 py-2 cursor-pointer font-bold text-xs uppercase tracking-wider border-4 border-transparent transition-all duration-100"
                      style={{
                        background: activeSection === item.id ? 'var(--color-neo-accent)' : 'transparent',
                        borderColor: activeSection === item.id ? '#000' : 'transparent',
                        boxShadow: activeSection === item.id ? '3px 3px 0px 0px #000' : 'none',
                      }}
                    >
                      {item.label}
                    </button>
                  ))}

                  {/* Try Coding Button */}
                  <a
                    href="#/compiler"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 flex items-center gap-1.5 bg-neo-accent border-4 border-black px-3.5 py-2 font-bold text-xs uppercase tracking-wider no-underline transition-all duration-100"
                    style={{
                      boxShadow: '3px 3px 0px 0px #000',
                    }}
                  >
                    <span>TRY CODING ⚡</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Toggle Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            className="fixed top-4 right-4 z-[60] md:hidden cursor-pointer flex items-center justify-center bg-neo-secondary border-4 border-black p-3"
            style={{ boxShadow: '4px 4px 0px 0px #000' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={20} strokeWidth={3} /> : <Menu size={20} strokeWidth={3} />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden flex flex-col items-center justify-center bg-neo-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="neo-card p-8 max-w-xs w-full">
              <div className="text-center mb-6 pb-3 border-b-4 border-black">
                <span className="font-bold text-lg uppercase tracking-wider">MENU</span>
              </div>
              <div className="space-y-2">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="w-full text-left py-3 px-4 cursor-pointer font-bold text-sm uppercase tracking-wider border-4 border-transparent transition-all duration-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      background: activeSection === item.id ? 'var(--color-neo-accent)' : 'transparent',
                      borderColor: activeSection === item.id ? '#000' : 'transparent',
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Try Coding Mobile Link */}
                <motion.a
                  href="#/compiler"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full text-center py-3 px-4 font-bold text-sm uppercase tracking-wider border-4 border-black bg-neo-accent text-black no-underline mt-4"
                  style={{
                    boxShadow: '4px 4px 0px 0px #000',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.05 }}
                >
                  TRY CODING ⚡
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
