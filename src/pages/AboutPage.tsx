import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useRouter } from '../context/RouterContext.tsx';
import {
  MapPin,
  Briefcase,
  Calendar,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { navigate } = useRouter();

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/rayees_designs/',
      stat: '6,000+ Followers',
    },
    {
      name: 'Behance',
      url: 'https://www.behance.net/rayeesdesigns',
      stat: 'Creative Showcase',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/khaja-rayees-uddin-1b002823a',
      stat: 'Professional Network',
    },
  ];

  const tools = [
    'Adobe Illustrator',
    'Adobe Photoshop',
    'Adobe InDesign',
    'Adobe Premiere Pro',
    'Adobe After Effects',
    'Figma & UI Prototyping',
    'Roland RIP Print Prep',
    'Geometric Dot-Grid Craft',
  ];

  return (
    <div className="min-h-screen bg-[#050806] text-[#F3F6F3] pt-32 pb-24 bg-tactical-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb / Title */}
        <div className="max-w-3xl mb-16 text-left rtl:text-right">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-3 block">
            {t.aboutPage.pageTitle}
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.025em] leading-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {t.aboutPage.bioTitle}
          </h1>
          <p className="text-base sm:text-lg text-[#9EAA9F]">
            {t.aboutPage.pageSubtitle}
          </p>
        </div>

        {/* Hero Bio Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Left Column: Owner Photograph */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden bg-[#0A110C] border border-[#00E640]/30 green-glow relative group">
              <img
                src="/assets/aistudio/image_e87a7884.png"
                alt="Khaja Rayees Uddin — Founder & Creative Director of Rayees Designs"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="p-4 bg-[#0A110C] border-t border-[#00E640]/20 flex items-center justify-between text-xs">
                <div>
                  <span className="text-white font-semibold block">Khaja Rayees Uddin</span>
                  <span className="text-[11px] text-[#9EAA9F]">
                    {lang === 'en' ? 'Senior Designer & Branding Specialist' : 'مصمم أول ومختص في الهويات المؤسسية'}
                  </span>
                </div>
                <span className="text-[#00E640] font-mono font-semibold text-[11px]">Riyadh · KSA</span>
              </div>
            </div>

            {/* Quick Fact Sheet */}
            <div className="mt-6 p-6 rounded-2xl bg-[#080E09] border border-[#00E640]/15 space-y-4 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-[#00E640]/10">
                <span className="text-[#9EAA9F] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00E640]" />
                  {t.aboutPage.locationLabel}
                </span>
                <span className="text-white font-medium text-right">Riyadh, Saudi Arabia</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-[#00E640]/10">
                <span className="text-[#9EAA9F] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#00E640]" />
                  {t.aboutPage.experienceLabel}
                </span>
                <span className="text-white font-medium text-right">4+ Years Active</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-[#00E640]/10">
                <span className="text-[#9EAA9F] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#00E640]" />
                  {t.aboutPage.availabilityLabel}
                </span>
                <span className="text-[#00E640] font-semibold text-right">Select Commissions</span>
              </div>
            </div>
          </div>

          {/* Right Column: Story Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left rtl:text-right">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-snug tracking-[-0.02em]">
              {lang === 'en'
                ? 'Building brands that command attention and foster enduring community connections.'
                : 'نبني علامات تجارية تصنع الفارق وترسخ حضورها في وجدان الجمهور.'}
            </h2>

            <p className="text-base sm:text-lg text-[#C5D0C6] leading-relaxed">
              {t.aboutPage.bioParagraph1}
            </p>

            <p className="text-base sm:text-lg text-[#C5D0C6] leading-relaxed">
              {t.aboutPage.bioParagraph2}
            </p>

            {/* Disciplines & Toolset Grid */}
            <div className="pt-8 border-t border-[#00E640]/15">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-4">
                {t.aboutPage.experienceTitle}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#0E1610] border border-[#00E640]/15 text-xs text-white font-medium flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00E640]" />
                    <span className="truncate">{tool}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Channels Strip */}
            <div className="pt-6 flex flex-wrap gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#0E1610] hover:bg-[#162319] border border-[#00E640]/25 hover:border-[#00E640] text-xs font-bold text-white hover:text-[#00E640] transition-colors flex items-center gap-2"
                >
                  <span>{s.name}</span>
                  <span className="text-[#9EAA9F] font-normal">({s.stat})</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#00E640]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Design Convictions */}
        <div className="mb-24">
          <div className="text-left rtl:text-right max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-2 block">
              {t.aboutPage.designPhilosophyTitle}
            </span>
            <h2 className="text-3xl font-semibold text-white tracking-[-0.02em]">
              {lang === 'en'
                ? 'Core principles guiding every line, curve & layout.'
                : 'المبادئ الأساسية التي تحكم كل خط، منحنى، وتكوين بصري.'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-[#0B120C] border border-[#00E640]/20">
              <span className="text-xs font-mono font-semibold text-[#00E640] mb-2 block">
                01. PRINCIPLE
              </span>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t.aboutPage.conviction1Title}
              </h3>
              <p className="text-sm text-[#9EAA9F] leading-relaxed">
                {t.aboutPage.conviction1Desc}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B120C] border border-[#00E640]/20">
              <span className="text-xs font-mono font-semibold text-[#00E640] mb-2 block">
                02. PRINCIPLE
              </span>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t.aboutPage.conviction2Title}
              </h3>
              <p className="text-sm text-[#9EAA9F] leading-relaxed">
                {t.aboutPage.conviction2Desc}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B120C] border border-[#00E640]/20">
              <span className="text-xs font-mono font-semibold text-[#00E640] mb-2 block">
                03. PRINCIPLE
              </span>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t.aboutPage.conviction3Title}
              </h3>
              <p className="text-sm text-[#9EAA9F] leading-relaxed">
                {t.aboutPage.conviction3Desc}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0B120C] border border-[#00E640]/20">
              <span className="text-xs font-mono font-semibold text-[#00E640] mb-2 block">
                04. PRINCIPLE
              </span>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t.aboutPage.conviction4Title}
              </h3>
              <p className="text-sm text-[#9EAA9F] leading-relaxed">
                {t.aboutPage.conviction4Desc}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Bottom Banner */}
        <div className="p-10 rounded-3xl bg-[#0A120D] border border-[#00E640]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left rtl:text-right">
            <h3 className="text-2xl font-semibold text-white mb-1">
              {lang === 'en' ? 'Ready to elevate your brand?' : 'مستعد للارتقاء بهوية علامتك؟'}
            </h3>
            <p className="text-sm text-[#9EAA9F]">
              {lang === 'en'
                ? 'Direct collaboration with Khaja Rayees Uddin from Riyadh.'
                : 'تواصل مباشر مع المصمم خواجة رييس الدين من الرياض.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact');
              }}
              className="px-6 py-3 rounded-xl bg-[#00E640] hover:bg-[#10f24f] text-[#050806] font-semibold text-sm flex items-center gap-2 transition-all hover:shadow-[0_0_25px_rgba(0,230,64,0.4)] whitespace-nowrap"
            >
              <span>{t.hero.ctaContact}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>

            <a
              href="https://wa.me/966599045315"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-[#0E1610] text-[#00E640] border border-[#00E640]/30 hover:border-[#00E640]"
              title="WhatsApp Riyadh"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
