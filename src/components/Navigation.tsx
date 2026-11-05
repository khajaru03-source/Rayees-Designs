import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useRouter } from '../context/RouterContext.tsx';
import { Menu, X, Globe, ArrowUpRight } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { lang, t, toggleLanguage } = useLanguage();
  const { currentPath, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.services, path: '/services' },
    { label: t.nav.myWork, path: '/my-work' },
    { label: t.nav.contact, path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050806]/85 backdrop-blur-md border-b border-[#00E640]/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single element Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E640] rounded-lg"
            aria-label="Rayees Designs Home"
          >
            <Logo size="md" variant="full" />
          </a>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.path);

              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.path);
                  }}
                  className={`relative py-1 transition-colors duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#00E640] font-semibold'
                      : 'text-[#C5D0C6] hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#00E640] rounded-full shadow-[0_0_8px_#00E640]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + Language Switcher */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#0E1610] hover:bg-[#162319] text-[#C5D0C6] hover:text-[#00E640] border border-[#00E640]/20 hover:border-[#00E640]/50 transition-all duration-200 cursor-pointer"
              title="Switch Language / تبديل اللغة"
              aria-label={`Switch to ${lang === 'en' ? 'Arabic' : 'English'}`}
            >
              <Globe className="w-3.5 h-3.5 text-[#00E640]" />
              <span className="whitespace-nowrap">{t.nav.switchLang}</span>
            </button>

            {/* Primary Action Button (Desktop) */}
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/contact');
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#050806] bg-[#00E640] hover:bg-[#10f24f] rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,230,64,0.4)] whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
            >
              <span>{t.nav.startProject}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#0E1610] text-white hover:text-[#00E640] border border-[#00E640]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E640] cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#070C08]/95 backdrop-blur-xl border-b border-[#00E640]/20 px-6 py-6"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) => {
                const isActive =
                  item.path === '/'
                    ? currentPath === '/'
                    : currentPath.startsWith(item.path);

                return (
                  <motion.a
                    key={item.path}
                    href={item.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.path);
                    }}
                    className={`flex items-center justify-between text-lg font-medium py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? 'text-[#00E640] bg-[#00E640]/10 font-semibold'
                        : 'text-white hover:text-[#00E640] hover:bg-[#0E1610]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-[#00E640]" />}
                  </motion.a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-[#00E640]/20 flex flex-col gap-3">
                <button
                  onClick={() => {
                    toggleLanguage();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-lg bg-[#0E1610] text-[#00E640] border border-[#00E640]/30"
                >
                  <Globe className="w-4 h-4" />
                  <span>{t.nav.switchLang}</span>
                </button>

                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/contact');
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-[#050806] bg-[#00E640] rounded-lg shadow-[0_0_20px_rgba(0,230,64,0.4)]"
                >
                  <span>{t.nav.startProject}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
