import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useRouter } from '../context/RouterContext.tsx';
import { projects } from '../data/projects.ts';
import { serviceCategories } from '../data/services.ts';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Layers,
  ChevronDown,
  ShieldCheck,
  Compass,
  Zap,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { navigate } = useRouter();

  // Mouse coordinate for reactive glow in hero
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#050806] text-[#F3F6F3]">
      {/* ======================================================== */}
      {/* 1. CINEMATIC HERO SECTION */}
      {/* ======================================================== */}
      <section
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-tactical-grid border-b border-[#00E640]/10"
      >
        {/* Mouse Follow Glow */}
        <div
          className="pointer-events-none absolute w-[550px] h-[550px] rounded-full blur-[160px] opacity-25 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: 'radial-gradient(circle, #00E640 0%, transparent 70%)',
          }}
        />

        {/* Ambient Top Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00E640]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, Subtitle, CTAs */}
            <div className="lg:col-span-7 text-left rtl:text-right">
              {/* Kicker Tag */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-wider uppercase text-[#00E640] mb-6"
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00E640] shrink-0" />
                  <span>{t.hero.kicker}</span>
                </div>
                <span className="text-[#9EAA9F] hidden sm:inline">·</span>
                <span className="text-[#9EAA9F]">{t.hero.experienceBadge}</span>
              </motion.div>

              {/* Main Expressive Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] leading-[1.12] mb-6 text-white"
                style={{ textWrap: 'balance' }}
              >
                {t.hero.headlineStart}{' '}
                <span className="text-[#00E640] underline decoration-[#00E640]/40 decoration-4 underline-offset-8">
                  {t.hero.headlineAccent}
                </span>{' '}
                <br className="hidden sm:inline" />
                {t.hero.headlineEnd}
              </motion.h1>

              {/* Subhead Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-[#C5D0C6] max-w-2xl leading-relaxed mb-8 font-normal"
              >
                {t.hero.subhead}
              </motion.p>

              {/* Primary Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                <a
                  href="/my-work"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/my-work');
                  }}
                  className="px-6 py-3.5 rounded-xl bg-[#00E640] hover:bg-[#10f24f] text-[#050806] font-semibold text-sm flex items-center gap-2.5 transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,230,64,0.45)] active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <span>{t.hero.ctaWork}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </a>

                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/contact');
                  }}
                  className="px-6 py-3.5 rounded-xl bg-[#0E1610] hover:bg-[#162319] text-white hover:text-[#00E640] font-semibold text-sm border border-[#00E640]/30 hover:border-[#00E640] transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <span>{t.hero.ctaContact}</span>
                </a>
              </motion.div>

              {/* Direct WhatsApp Instant Reach */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#00E640]/15"
              >
                <span className="text-xs text-[#9EAA9F] font-mono">
                  {lang === 'en' ? 'Direct WhatsApp Connect:' : 'تواصل واتساب مباشر:'}
                </span>

                <a
                  href="https://wa.me/966599045315"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0A120D] text-xs font-semibold text-[#00E640] border border-[#00E640]/25 hover:border-[#00E640] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>KSA: +966 59 904 5315</span>
                </a>

                <a
                  href="https://wa.me/918688297240"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0A120D] text-xs font-semibold text-[#00E640] border border-[#00E640]/25 hover:border-[#00E640] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>IND: +91 8688297240</span>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Hero Visual Asset Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              {/* Outer Glowing Border Frame */}
              <div className="relative rounded-2xl p-1 bg-gradient-to-b from-[#00E640]/40 via-[#00E640]/10 to-transparent shadow-[0_0_50px_rgba(0,230,64,0.15)]">
                <div className="relative rounded-xl overflow-hidden bg-[#0A110C] border border-[#00E640]/25">
                  <img
                    src="/assets/aistudio/image_87a125a5.png"
                    alt="Rayees Designs Designer Desk and Logo Sketching"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover max-h-[480px] hover:scale-105 transition-transform duration-700"
                  />

                  {/* Corner Label Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#050806] via-[#050806]/85 to-transparent flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#00E640]">
                        Rayees Designs Studio
                      </span>
                      <p className="text-xs font-bold text-white mt-0.5">
                        {lang === 'en'
                          ? 'Handcrafted Vector Precision & Identity Systems'
                          : 'دقة هندسية يدوية وصياغة متقدمة للهويات'}
                      </p>
                    </div>

                    <a
                      href="/my-work/identity-craft-sketchbook"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/my-work/identity-craft-sketchbook');
                      }}
                      className="p-2 rounded-lg bg-[#00E640] text-[#050806] hover:bg-white transition-colors"
                      title="View Case Study"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 sm:-right-6 bg-[#0E1610]/95 backdrop-blur-md border border-[#00E640]/40 rounded-xl px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#00E640]/15 border border-[#00E640]/30 flex items-center justify-center text-[#00E640]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Riyadh Base</div>
                  <div className="text-[10px] text-[#9EAA9F]">Pan-India & KSA Coverage</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs text-[#9EAA9F] font-mono pointer-events-none opacity-60">
          <span>{t.hero.scrollDown}</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#00E640]" />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. ABOUT PREVIEW & VERIFIED METRICS */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#070C08] border-b border-[#00E640]/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 text-left rtl:text-right">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-3 block">
                {t.aboutPreview.kicker}
              </span>
              <h2
                className="text-3xl sm:text-4xl font-semibold text-white tracking-[-0.02em] leading-tight mb-6"
                style={{ textWrap: 'balance' }}
              >
                {t.aboutPreview.title}
              </h2>
              <p className="text-base text-[#B0BCB1] leading-relaxed mb-8 font-normal">
                {t.aboutPreview.description}
              </p>

              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/about');
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#00E640] hover:text-white transition-colors group"
              >
                <span>{t.aboutPreview.readMore}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right Verified Stat Strip */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-[#0B120C] border border-[#00E640]/15 hover:border-[#00E640]/40 transition-colors">
                <div className="text-3xl sm:text-4xl font-semibold text-[#00E640] font-mono mb-2 tabular-nums">
                  {t.aboutPreview.stat1Number}
                </div>
                <div className="text-sm font-medium text-white mb-1">
                  {t.aboutPreview.stat1Label}
                </div>
                <div className="text-xs text-[#9EAA9F]">Graphic & Brand Design</div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B120C] border border-[#00E640]/15 hover:border-[#00E640]/40 transition-colors">
                <div className="text-3xl sm:text-4xl font-semibold text-[#00E640] font-mono mb-2 tabular-nums">
                  {t.aboutPreview.stat2Number}
                </div>
                <div className="text-sm font-medium text-white mb-1">
                  {t.aboutPreview.stat2Label}
                </div>
                <div className="text-xs text-[#9EAA9F]">Corporate & Retail Brands</div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B120C] border border-[#00E640]/15 hover:border-[#00E640]/40 transition-colors">
                <div className="text-3xl sm:text-4xl font-semibold text-[#00E640] font-mono mb-2 tabular-nums">
                  {t.aboutPreview.stat3Number}
                </div>
                <div className="text-sm font-medium text-white mb-1">
                  {t.aboutPreview.stat3Label}
                </div>
                <div className="text-xs text-[#9EAA9F]">Instagram Followers Base</div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B120C] border border-[#00E640]/15 hover:border-[#00E640]/40 transition-colors">
                <div className="text-3xl sm:text-4xl font-semibold text-[#00E640] font-mono mb-2 tabular-nums">
                  {t.aboutPreview.stat4Number}
                </div>
                <div className="text-sm font-medium text-white mb-1">
                  {t.aboutPreview.stat4Label}
                </div>
                <div className="text-xs text-[#9EAA9F]">Riyadh & All Over India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. FEATURED WORK SHOWCASE */}
      {/* ======================================================== */}
      <section className="py-24 bg-[#050806] border-b border-[#00E640]/10 bg-tactical-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="text-left rtl:text-right">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-2 block">
                {t.featuredWork.kicker}
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-[-0.02em]">
                {t.featuredWork.title}
              </h2>
              <p className="text-base text-[#9EAA9F] mt-2 max-w-xl">
                {t.featuredWork.subtitle}
              </p>
            </div>

            <a
              href="/my-work"
              onClick={(e) => {
                e.preventDefault();
                navigate('/my-work');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E1610] hover:bg-[#162319] border border-[#00E640]/30 hover:border-[#00E640] text-sm font-semibold text-[#00E640] transition-colors whitespace-nowrap self-start md:self-auto"
            >
              <span>{t.featuredWork.viewAll}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>
          </div>

          {/* Grid of Authentic Work */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                data-cursor="project"
                onClick={() => navigate(`/my-work/${project.slug}`)}
                className="group relative rounded-2xl bg-[#0A110C] border border-[#00E640]/20 hover:border-[#00E640]/60 overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,230,64,0.15)] flex flex-col cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#070C08]">
                  <img
                    src={project.coverImage}
                    alt={project.title[lang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A110C] via-transparent to-transparent opacity-80" />

                  {/* Clean unboxed category badge (Anti-Pill Rule) */}
                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 text-xs font-semibold text-[#00E640] bg-[#050806]/90 backdrop-blur-md px-3 py-1 rounded-md border border-[#00E640]/30">
                    {project.category[lang]}
                  </div>

                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-xs font-mono text-[#C5D0C6] bg-[#050806]/90 px-2.5 py-1 rounded-md border border-white/10">
                    {project.year}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#00E640] transition-colors mb-2 leading-snug">
                      {project.title[lang]}
                    </h3>
                    <p className="text-sm text-[#9EAA9F] leading-relaxed line-clamp-2">
                      {project.summary[lang]}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#00E640]/10 flex items-center justify-between text-xs text-[#9EAA9F]">
                    <span>{project.location[lang]}</span>
                    <span className="font-semibold text-[#00E640] flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      {t.featuredWork.viewCase}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. SERVICES OVERVIEW (4 PILLARS) */}
      {/* ======================================================== */}
      <section className="py-24 bg-[#070C08] border-b border-[#00E640]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-3 block">
              {t.servicesOverview.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-[-0.02em]">
              {t.servicesOverview.title}
            </h2>
            <p className="text-base text-[#9EAA9F] mt-3">
              {t.servicesOverview.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category, idx) => (
              <div
                key={category.id}
                className="p-6 rounded-2xl bg-[#0B120C] border border-[#00E640]/15 hover:border-[#00E640]/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_10px_30px_rgba(0,230,64,0.1)]"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#00E640]/10 border border-[#00E640]/30 flex items-center justify-center text-[#00E640] mb-5 group-hover:bg-[#00E640] group-hover:text-[#050806] transition-colors">
                    {idx === 0 && <Sparkles className="w-6 h-6" />}
                    {idx === 1 && <Layers className="w-6 h-6" />}
                    {idx === 2 && <Compass className="w-6 h-6" />}
                    {idx === 3 && <Zap className="w-6 h-6" />}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {category.title[lang]}
                  </h3>
                  <p className="text-xs text-[#9EAA9F] leading-relaxed mb-6">
                    {category.description[lang]}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {category.services.slice(0, 4).map((s) => (
                      <li key={s.id} className="text-xs text-[#C5D0C6] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00E640] shrink-0" />
                        <span>{s.title[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/services');
                  }}
                  className="pt-4 border-t border-[#00E640]/10 text-xs font-semibold text-[#00E640] group-hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>{lang === 'en' ? 'View Details' : 'عرض التفاصيل'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                navigate('/services');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0E1610] hover:bg-[#162319] border border-[#00E640]/30 hover:border-[#00E640] text-sm font-semibold text-[#00E640] transition-colors"
            >
              <span>{t.servicesOverview.exploreServices}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. WORK PROCESS (01-04) */}
      {/* ======================================================== */}
      <section className="py-24 bg-[#050806] border-b border-[#00E640]/10 bg-tactical-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left rtl:text-right max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-2 block">
              {t.process.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-[-0.02em]">
              {t.process.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: t.process.step1Num,
                title: t.process.step1Title,
                desc: t.process.step1Desc,
              },
              {
                num: t.process.step2Num,
                title: t.process.step2Title,
                desc: t.process.step2Desc,
              },
              {
                num: t.process.step3Num,
                title: t.process.step3Title,
                desc: t.process.step3Desc,
              },
              {
                num: t.process.step4Num,
                title: t.process.step4Title,
                desc: t.process.step4Desc,
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0A110C] border border-[#00E640]/20 hover:border-[#00E640]/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-semibold font-mono text-[#00E640] mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#9EAA9F] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. WHY CHOOSE RAYEES DESIGNS */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#070C08] border-b border-[#00E640]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left rtl:text-right max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-2 block">
              {t.whyRayees.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-[-0.02em]">
              {t.whyRayees.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#0B120C] border border-[#00E640]/15">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00E640]" />
                <span>{t.whyRayees.reason1Title}</span>
              </h3>
              <p className="text-sm text-[#9EAA9F] leading-relaxed">
                {t.whyRayees.reason1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B120C] border border-[#00E640]/15">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00E640]" />
                <span>{t.whyRayees.reason2Title}</span>
              </h3>
              <p className="text-sm text-[#9EAA9F] leading-relaxed">
                {t.whyRayees.reason2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B120C] border border-[#00E640]/15">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00E640]" />
                <span>{t.whyRayees.reason3Title}</span>
              </h3>
              <p className="text-sm text-[#9EAA9F] leading-relaxed">
                {t.whyRayees.reason3Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B120C] border border-[#00E640]/15">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00E640]" />
                <span>{t.whyRayees.reason4Title}</span>
              </h3>
              <p className="text-sm text-[#9EAA9F] leading-relaxed">
                {t.whyRayees.reason4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. BOTTOM CTA BANNER */}
      {/* ======================================================== */}
      <section className="py-24 bg-[#050806] relative overflow-hidden bg-tactical-grid">
        <div className="absolute inset-0 bg-radial from-[#00E640]/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#0A120D] to-[#050806] border border-[#00E640]/30 green-glow">
            <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-[-0.02em] leading-tight mb-6">
              {t.ctaBanner.title}
            </h2>
            <p className="text-base sm:text-lg text-[#C5D0C6] max-w-2xl mx-auto leading-relaxed mb-8">
              {t.ctaBanner.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/contact');
                }}
                className="px-8 py-4 rounded-xl bg-[#00E640] hover:bg-[#10f24f] text-[#050806] font-semibold text-sm flex items-center gap-2 transition-all duration-200 hover:shadow-[0_0_35px_rgba(0,230,64,0.5)] active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>{t.ctaBanner.contactNow}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <a
                href="https://wa.me/966599045315"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-4 rounded-xl bg-[#0E1610] hover:bg-[#162319] text-white hover:text-[#00E640] font-semibold text-sm border border-[#00E640]/30 hover:border-[#00E640] transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#00E640]" />
                <span>{t.hero.saudiWhatsapp}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
