import { motion } from 'framer-motion';
import PixelIcon from './PixelIcon';

export default function RetroPopup({ isOpen, onClose, message = 'UNPLAYABLE' }) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(0, 0, 0, 0.7)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative p-8"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          border: '4px solid #00FFFF',
          boxShadow: '0 0 20px #00FFFF80, inset 0 0 20px #00FFFF20',
          maxWidth: '400px',
        }}
        initial={{ scale: 0.5, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: -50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top border decoration */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{
            background: 'repeating-linear-gradient(90deg, #00FFFF 0px, #00FFFF 8px, transparent 8px, transparent 16px)',
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl cursor-pointer"
          style={{
            color: '#FF6B9D',
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
          }}
        >
          ✕
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <PixelIcon name="alert" size={48} color="#FF6B9D" />
          </div>

          {/* Message */}
          <h2
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '24px',
              color: '#FF6B9D',
              letterSpacing: '2px',
              marginBottom: '16px',
              textShadow: '0 0 10px #FF6B9D40',
            }}
          >
            {message}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-vt)',
              fontSize: '14px',
              color: '#888',
              marginBottom: '24px',
              lineHeight: 1.5,
            }}
          >
            This cartridge is currently locked. Check back later for updates!
          </p>

          {/* Button */}
          <button
            onClick={onClose}
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '12px',
              color: '#000',
              background: '#00FFFF',
              border: 'none',
              padding: '8px 24px',
              cursor: 'pointer',
              transition: 'all 0.1s',
            }}
            onMouseEnter={(e) => e.target.style.filter = 'brightness(1.3)'}
            onMouseLeave={(e) => e.target.style.filter = 'none'}
          >
            OK
          </button>
        </div>

        {/* Bottom border decoration */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{
            background: 'repeating-linear-gradient(90deg, #FF6B9D 0px, #FF6B9D 8px, transparent 8px, transparent 16px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
