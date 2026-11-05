import React from 'react';
import { Logo } from './Logo.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useRouter } from '../context/RouterContext.tsx';
import {
  ArrowUp,
  Mail,
  MapPin,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { navigate } = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/rayees_designs/',
      handle: '@rayees_designs',
    },
    {
      name: 'Behance',
      url: 'https://www.behance.net/rayeesdesigns',
      handle: 'rayeesdesigns',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/khaja-rayees-uddin-1b002823a',
      handle: 'Khaja Rayees Uddin',
    },
  ];

  const quickNav = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.services, path: '/services' },
    { label: t.nav.myWork, path: '/my-work' },
    { label: t.nav.contact, path: '/contact' },
  ];

  const primaryServices = [
    'Logo Design & Monograms',
    'Brand Identity Systems',
    'FMCG & Food Packaging',
    'Commercial Printing (India)',
    'Social Media Growth Carousels',
    'UI/UX & Web Design',
  ];

  return (
    <footer className="relative bg-[#040605] border-t border-[#00E640]/15 pt-20 pb-12 overflow-hidden bg-tactical-grid">
      {/* Ambient Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00E640]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#00E640]/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                className="inline-block mb-6 focus-visible:outline-none"
              >
                <Logo size="lg" variant="full" />
              </a>

              <p className="text-base text-[#B0BCB1] max-w-md leading-relaxed mb-6 font-normal">
                {t.footer.tagline}
              </p>

              <div className="flex items-center gap-2 text-xs text-[#9EAA9F] font-mono mb-8">
                <MapPin className="w-4 h-4 text-[#00E640] shrink-0" />
                <span>{t.aboutPage.locationValue}</span>
              </div>
            </div>

            {/* Direct WhatsApp Callouts */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/966599045315"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0A120D] border border-[#00E640]/25 hover:border-[#00E640] text-xs font-semibold text-white hover:text-[#00E640] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#00E640]" />
                <span>KSA: +966 59 904 5315</span>
              </a>

              <a
                href="https://wa.me/918688297240"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0A120D] border border-[#00E640]/25 hover:border-[#00E640] text-xs font-semibold text-white hover:text-[#00E640] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#00E640]" />
                <span>IND: +91 8688297240</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-6">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {quickNav.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                    }}
                    className="text-sm text-[#9EAA9F] hover:text-[#00E640] transition-colors inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-6">
              {t.footer.servicesHeading}
            </h3>
            <ul className="space-y-3">
              {primaryServices.map((service, idx) => (
                <li key={idx}>
                  <a
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/services');
                    }}
                    className="text-sm text-[#9EAA9F] hover:text-white transition-colors inline-block"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Platforms & Direct Email */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-6">
              {t.footer.contactHeading}
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:rayeesdesigns@gmail.com"
                className="flex items-center gap-2 text-sm text-[#C5D0C6] hover:text-[#00E640] transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#00E640] shrink-0" />
                <span className="truncate">rayeesdesigns@gmail.com</span>
              </a>

              <div className="pt-3 flex flex-col gap-2">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-xs text-[#9EAA9F] hover:text-[#00E640] py-1 border-b border-[#00E640]/10 hover:border-[#00E640]/30 transition-colors"
                  >
                    <span>{item.name}</span>
                    <ExternalLink className="w-3 h-3 text-[#00E640]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7F8F81]">
          <p>{t.footer.copyright}</p>
          <p className="text-center sm:text-right">{t.footer.foundedIn}</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0E1610] text-[#9EAA9F] hover:text-[#00E640] border border-[#00E640]/20 hover:border-[#00E640]/50 transition-colors cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
