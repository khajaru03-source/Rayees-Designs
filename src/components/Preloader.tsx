import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo.tsx';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if ?autostart=1 or already shown in this session
    const urlParams = new URLSearchParams(window.location.search);
    const autostart = urlParams.get('autostart') === '1';
    const alreadyShown = sessionStorage.getItem('rayees_preloader_shown');

    // Ensure fonts are loaded in background without flickering
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.load('400 16px "Manrope"').catch(() => {});
      document.fonts.load('600 16px "Manrope"').catch(() => {});
      document.fonts.load('400 16px "IBM Plex Sans Arabic"').catch(() => {});
      document.fonts.load('600 16px "IBM Plex Sans Arabic"').catch(() => {});
    }

    const finishLoading = () => {
      const dismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('rayees_preloader_shown', 'true');
        onComplete?.();
      };

      if (typeof document !== 'undefined' && 'fonts' in document) {
        document.fonts.ready.then(dismiss).catch(dismiss);
      } else {
        dismiss();
      }
    };

    if (autostart || alreadyShown) {
      if (typeof document !== 'undefined' && 'fonts' in document) {
        document.fonts.ready.then(() => {
          setIsVisible(false);
          onComplete?.();
        }).catch(() => {
          setIsVisible(false);
          onComplete?.();
        });
      } else {
        setIsVisible(false);
        onComplete?.();
      }
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(finishLoading, 300);
          return 100;
        }
        // Organic acceleration curve
        const step = Math.floor(Math.random() * 14) + 6;
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050806] text-white overflow-hidden bg-tactical-grid select-none"
        >
          {/* Luminous Ambient Glow */}
          <div className="absolute w-[500px] h-[500px] bg-[#00E640]/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Logo Reveal */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="p-3 rounded-2xl border border-[#00E640]/30 bg-[#0A110C] green-glow mb-6">
              <Logo size="xl" showText={false} />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-semibold uppercase tracking-[0.18em] text-white"
            >
              RAYEES <span className="text-[#00E640]">DESIGNS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xs uppercase tracking-[0.3em] text-[#9EAA9F] mt-2 font-medium"
            >
              Riyadh · Creative Studio · Branding
            </motion.p>
          </motion.div>

          {/* Progress Bar & Counter */}
          <div className="relative z-10 w-64 max-w-[80vw] mt-10">
            <div className="flex items-center justify-between text-xs font-mono text-[#9EAA9F] mb-2 tabular-nums">
              <span className="text-[#00E640] tracking-wider">INITIALIZING CRAFT</span>
              <span className="font-bold text-white">{progress}%</span>
            </div>

            <div className="w-full h-1 bg-[#111A13] rounded-full overflow-hidden border border-[#00E640]/20">
              <motion.div
                className="h-full bg-[#00E640] rounded-full shadow-[0_0_12px_#00E640]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
          </div>

          {/* Skip Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              sessionStorage.setItem('rayees_preloader_shown', 'true');
              onComplete?.();
            }}
            className="absolute bottom-8 text-xs text-[#9EAA9F] hover:text-[#00E640] transition-colors uppercase tracking-widest px-4 py-2 border border-transparent hover:border-[#00E640]/30 rounded-lg cursor-pointer"
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
