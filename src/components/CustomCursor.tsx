import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';

export const CustomCursor: React.FC = () => {
  const { t } = useLanguage();
  const [isEnabled, setIsEnabled] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | 'click'>('default');
  const [cursorText, setCursorText] = useState<string>('');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging follower
  const springConfig = { damping: 25, stiffness: 350 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectTarget = target.closest('[data-cursor="project"]');
      if (projectTarget) {
        setCursorType('project');
        setCursorText(t.cursor.viewProject);
        return;
      }

      const interactive = target.closest('button, a, input, select, textarea, [role="button"]');
      if (interactive) {
        setCursorType('pointer');
        setCursorText('');
        return;
      }

      setCursorType('default');
      setCursorText('');
    };

    const handleMouseDown = () => {
      setCursorType((prev) => (prev === 'project' ? 'project' : 'click'));
    };

    const handleMouseUp = () => {
      setCursorType((prev) => (prev === 'click' ? 'pointer' : prev));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY, t.cursor.viewProject]);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Central Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#00E640] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#00E640]"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: cursorType === 'project' ? 0 : 1,
        }}
        transition={{ duration: 0.05 }}
      />

      {/* Outer Magnetic Follower Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          width: cursorType === 'project' ? 96 : cursorType === 'pointer' ? 44 : 28,
          height: cursorType === 'project' ? 96 : cursorType === 'pointer' ? 44 : 28,
          backgroundColor:
            cursorType === 'project'
              ? 'rgba(0, 230, 64, 0.92)'
              : cursorType === 'pointer'
              ? 'rgba(0, 230, 64, 0.15)'
              : 'rgba(0, 230, 64, 0.04)',
          borderColor:
            cursorType === 'project'
              ? 'rgba(0, 230, 64, 1)'
              : cursorType === 'pointer'
              ? 'rgba(0, 230, 64, 0.7)'
              : 'rgba(0, 230, 64, 0.4)',
          borderWidth: cursorType === 'project' ? '0px' : '1.5px',
        }}
      >
        {cursorType === 'project' && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#050806] text-center px-2 select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
};
