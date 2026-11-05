import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'full' | 'mark' | 'badge' | string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'full',
}) => {
  const displayWordmark = variant === 'mark' ? false : showText;
  // Sizing preserving exact 1:1 square proportions of the original uploaded image
  const sizeMap = {
    sm: { imgClass: 'w-8 h-8 rounded-md', textClass: 'text-sm font-semibold tracking-[0.14em]' },
    md: { imgClass: 'w-11 h-11 rounded-lg', textClass: 'text-base font-semibold tracking-[0.14em]' },
    lg: { imgClass: 'w-14 h-14 rounded-xl', textClass: 'text-lg font-semibold tracking-[0.14em]' },
    xl: { imgClass: 'w-24 h-24 rounded-2xl', textClass: 'text-2xl font-semibold tracking-[0.16em]' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Exact uploaded original logo file: /assets/aistudio/image_a87d1be2.png */}
      <img
        src="/assets/aistudio/image_a87d1be2.png"
        alt="Rayees Designs Original Logo"
        referrerPolicy="no-referrer"
        className={`${currentSize.imgClass} object-contain shrink-0 border border-[#00E640]/30 shadow-[0_0_15px_rgba(0,230,64,0.25)] group-hover:scale-105 transition-transform duration-300`}
      />

      {displayWordmark && (
        <div className="flex flex-col justify-center leading-none text-left rtl:text-right">
          <span className={`font-semibold uppercase tracking-[0.14em] text-white group-hover:text-[#00E640] transition-colors ${currentSize.textClass}`}>
            RAYEES
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] text-[#00E640] mt-0.5">
            DESIGNS
          </span>
        </div>
      )}
    </div>
  );
};
