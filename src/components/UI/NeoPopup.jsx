import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export default function NeoPopup({ isOpen, onClose, message = 'COMING SOON' }) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(0, 0, 0, 0.6)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="neo-card p-8 relative max-w-sm w-full mx-4"
        initial={{ scale: 0.8, y: -30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: -30 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer bg-transparent border-none"
        >
          <X size={20} strokeWidth={3} />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-neo-accent border-4 border-black p-3" style={{ boxShadow: '4px 4px 0px 0px #000' }}>
              <AlertTriangle size={32} strokeWidth={3} />
            </div>
          </div>

          <h2 className="text-2xl font-bold uppercase tracking-tight mb-3">
            {message}
          </h2>

          <p className="text-sm font-medium opacity-70 mb-6 leading-relaxed">
            This project demo is currently under construction. Check back soon for the full experience!
          </p>

          <button
            onClick={onClose}
            className="neo-btn neo-btn-primary"
          >
            GOT IT
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
