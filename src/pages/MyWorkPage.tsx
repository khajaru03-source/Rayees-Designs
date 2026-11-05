import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useRouter } from '../context/RouterContext.tsx';
import { projects } from '../data/projects.ts';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const MyWorkPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { navigate } = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { key: 'all', label: t.myWorkPage.filterAll },
    { key: 'branding', label: t.myWorkPage.filterBranding },
    { key: 'logo', label: t.myWorkPage.filterLogo },
    { key: 'packaging', label: t.myWorkPage.filterPackaging },
    { key: 'social', label: t.myWorkPage.filterSocial },
    { key: 'print', label: t.myWorkPage.filterPrint },
    { key: 'advertising', label: t.myWorkPage.filterAdvertising },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.categoryKey === activeFilter);

  return (
    <div className="min-h-screen bg-[#050806] text-[#F3F6F3] pt-32 pb-24 bg-tactical-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12 text-left rtl:text-right">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-3 block">
            {t.myWorkPage.pageTitle}
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.025em] leading-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {lang === 'en'
              ? 'Selected Design Work & Brand Systems.'
              : 'أعمال منتقاة في بناء الهويات وحملات التصميم التجاري.'}
          </h1>
          <p className="text-base sm:text-lg text-[#9EAA9F]">
            {t.myWorkPage.pageSubtitle}
          </p>
        </div>

        {/* Category Filters (Clean functional buttons, compliant with Anti-Pill discipline) */}
        <div className="flex flex-wrap items-center gap-2 mb-14 p-1.5 rounded-xl bg-[#080F0A] border border-[#00E640]/20 max-w-fit">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-[#00E640] text-[#050806] shadow-sm'
                  : 'text-[#C5D0C6] hover:text-white hover:bg-[#111C13]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Gallery */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                data-cursor="project"
                onClick={() => navigate(`/my-work/${project.slug}`)}
                className="group relative rounded-2xl bg-[#0A110C] border border-[#00E640]/20 hover:border-[#00E640]/70 overflow-hidden transition-all duration-300 hover:shadow-[0_15px_45px_rgba(0,230,64,0.18)] flex flex-col cursor-pointer"
              >
                {/* Media Container */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#070C08]">
                  <img
                    src={project.coverImage}
                    alt={project.title[lang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A110C] via-transparent to-transparent opacity-80" />

                  {/* Clean unboxed category label */}
                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 text-xs font-semibold text-[#00E640] bg-[#050806]/90 backdrop-blur-md px-3 py-1 rounded-md border border-[#00E640]/30">
                    {project.category[lang]}
                  </div>

                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-xs font-mono text-[#C5D0C6] bg-[#050806]/90 px-2.5 py-1 rounded-md border border-white/10">
                    {project.year}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-[#00E640] transition-colors mb-3 leading-snug">
                      {project.title[lang]}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#9EAA9F] leading-relaxed mb-4 line-clamp-2">
                      {project.summary[lang]}
                    </p>

                    {/* Unboxed Tag List with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#7F8F81] font-mono">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <React.Fragment key={tag}>
                          {idx > 0 && <span aria-hidden="true">·</span>}
                          <span>{tag}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#00E640]/10 flex items-center justify-between text-xs">
                    <span className="text-[#9EAA9F]">{project.location[lang]}</span>
                    <span className="font-semibold text-[#00E640] flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      {t.myWorkPage.viewCaseStudy}
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 p-8 rounded-2xl bg-[#09110B] border border-[#00E640]/20">
            <p className="text-[#9EAA9F] text-sm">
              {lang === 'en'
                ? 'No projects in this category yet.'
                : 'لا توجد مشاريع في هذا القسم حالياً.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
