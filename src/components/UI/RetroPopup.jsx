import { motion } from 'framer-motion';
import PixelIcon from './PixelIcon';

export default function RetroPopup({ isOpen, onClose, message = 'QUEST LOCKED' }) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(15, 11, 30, 0.7)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative p-8 dialogue-box"
        style={{
          background: '#f0e6d3',
          border: '5px solid #6b5a3e',
          maxWidth: '400px',
          boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.4)',
        }}
        initial={{ scale: 0.5, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: -50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dialogue Corner Ornaments */}
        <div className="absolute top-1 left-1 font-pixel text-[8px] text-[#6b5a3e]">✦</div>
        <div className="absolute top-1 right-1 font-pixel text-[8px] text-[#6b5a3e]">✦</div>
        <div className="absolute bottom-1 left-1 font-pixel text-[8px] text-[#6b5a3e]">✦</div>
        <div className="absolute bottom-1 right-1 font-pixel text-[8px] text-[#6b5a3e]">✦</div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer"
          style={{
            color: 'var(--color-rust)',
            background: 'transparent',
            border: 'none',
            fontSize: '20px',
            fontFamily: 'var(--font-pixel)'
          }}
        >
          ✕
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <PixelIcon name="alert" size={40} color="var(--color-rust)" />
          </div>

          {/* Message */}
          <h2
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '18px',
              color: 'var(--color-rust)',
              letterSpacing: '1px',
              marginBottom: '16px',
            }}
          >
            {message}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-vt)',
              fontSize: '18px',
              color: '#3a2820',
              marginBottom: '24px',
              lineHeight: 1.5,
            }}
          >
            This scroll log is currently sealed by the sage. Work harder on quests to unlock!
          </p>

          {/* Button */}
          <button
            onClick={onClose}
            style={{
              fontFamily: 'var(--font-pixel)',
              fontSize: '9px',
              color: '#000',
              background: 'var(--color-gold)',
              border: '3px solid #6b5a3e',
              padding: '8px 24px',
              cursor: 'pointer',
              transition: 'all 0.1s',
            }}
            onMouseEnter={(e) => e.target.style.filter = 'brightness(1.2)'}
            onMouseLeave={(e) => e.target.style.filter = 'none'}
          >
            CONFIRM
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
