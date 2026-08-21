import { motion } from 'framer-motion';
import { ArrowDown, Star, Zap, Code } from 'lucide-react';

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-neo-bg"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large outlined text behind content */}
        <div
          className="absolute -top-10 -right-20 text-stroke select-none hidden lg:block"
          style={{
            fontSize: 'clamp(120px, 20vw, 280px)',
            fontWeight: 700,
            lineHeight: 0.85,
            opacity: 0.08,
          }}
        >
          DEV
          <br />
          EL
          <br />
          OP
          <br />
          ER
        </div>

        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 right-[15%] hidden md:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <Star size={40} strokeWidth={3} className="text-neo-accent" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 right-[25%] hidden md:block"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-16 h-16 bg-neo-secondary border-4 border-black" style={{ boxShadow: '4px 4px 0px 0px #000' }} />
        </motion.div>

        <motion.div
          className="absolute top-[40%] right-[10%] hidden md:block"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <div className="w-10 h-10 bg-neo-muted border-4 border-black rounded-full" />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] left-[8%] hidden md:block"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <Star size={28} strokeWidth={3} className="text-neo-secondary" fill="#FFD93D" />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="section-container relative z-10 w-full">
        <div className="max-w-4xl">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <span
              className="neo-badge neo-badge-pill bg-neo-secondary inline-flex items-center gap-2"
              style={{ transform: 'rotate(-2deg)' }}
            >
              <Zap size={12} strokeWidth={3} />
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1
              className="uppercase tracking-tighter leading-none mb-2"
              style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', fontWeight: 700 }}
            >
              <span className="block">ABHILEKH</span>
              <span className="block text-stroke" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}>
                BORAH
              </span>
            </h1>
          </motion.div>

          {/* Role tags */}
          <motion.div
            className="flex flex-wrap gap-3 mt-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {[
              { label: 'AI/ML DEVELOPER', bg: 'bg-neo-accent', icon: Zap },
              { label: 'BACKEND ENGINEER', bg: 'bg-neo-muted', icon: Code },
              { label: 'COMPETITIVE PROGRAMMER', bg: 'bg-neo-secondary', icon: Star },
            ].map(({ label, bg, icon: Icon }) => (
              <div
                key={label}
                className={`${bg} border-4 border-black px-4 py-2 font-bold text-sm uppercase tracking-wider flex items-center gap-2`}
                style={{ boxShadow: '4px 4px 0px 0px #000' }}
              >
                <Icon size={14} strokeWidth={3} />
                {label}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <button
              onClick={scrollToAbout}
              className="neo-btn neo-btn-primary"
            >
              EXPLORE PORTFOLIO
              <ArrowDown size={16} strokeWidth={3} />
            </button>
            <a
              href="#contact"
              className="neo-btn neo-btn-outline"
            >
              GET IN TOUCH
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black" />
    </section>
  );
}
