import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
    
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          {/* Phone Frame */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="absolute -top-12 right-0 sm:-right-12 sm:top-0 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Phone Design */}
            <div className="relative">
              {/* Phone Outer Frame */}
              <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[3rem] p-2 shadow-2xl shadow-black/50">
                {/* Phone Inner Frame */}
                <div className="bg-black rounded-[2.5rem] p-1 relative overflow-hidden">
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-black w-28 h-7 rounded-full flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-800" />
                      <div className="w-3 h-3 rounded-full bg-gray-800" />
                    </div>
                  </div>

                  {/* Screen */}
                  <div className="bg-black rounded-[2.3rem] overflow-hidden relative" style={{ width: '280px', height: '580px' }}>
                    {/* Video */}
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      className="w-full h-full object-cover"
                      controls
                      playsInline
                      autoPlay
                    />
                    
                    {/* Screen Glare Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                  </div>
                  
                  {/* Side Buttons (Left) */}
                  <div className="absolute left-[-2px] top-24 w-[3px] h-8 bg-gray-700 rounded-l-sm" />
                  <div className="absolute left-[-2px] top-36 w-[3px] h-14 bg-gray-700 rounded-l-sm" />
                  <div className="absolute left-[-2px] top-52 w-[3px] h-14 bg-gray-700 rounded-l-sm" />
                  
                  {/* Side Button (Right - Power) */}
                  <div className="absolute right-[-2px] top-32 w-[3px] h-20 bg-gray-700 rounded-r-sm" />
                </div>
              </div>
              
              {/* Ambient Glow */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 rounded-full scale-150" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
