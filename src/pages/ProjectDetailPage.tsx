import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useRouter } from '../context/RouterContext.tsx';
import { projects, getProjectBySlug, getRelatedProjects } from '../data/projects.ts';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  Maximize2,
  X,
  MessageCircle,
} from 'lucide-react';

interface ProjectDetailPageProps {
  slug: string;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug }) => {
  const { lang, t } = useLanguage();
  const { navigate } = useRouter();
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050806] text-[#F3F6F3] pt-40 pb-24 text-center px-4">
        <h1 className="text-3xl font-semibold text-white mb-4 tracking-[-0.02em]">
          {lang === 'en' ? 'Project Not Found' : 'المشروع غير موجود'}
        </h1>
        <p className="text-sm text-[#9EAA9F] mb-8">
          {lang === 'en'
            ? 'The requested project could not be located in our showcase archives.'
            : 'لم يتم العثور على هذا المشروع في أرشيف الأعمال.'}
        </p>
        <button
          onClick={() => navigate('/my-work')}
          className="px-6 py-3 rounded-xl bg-[#00E640] text-[#050806] font-semibold text-sm cursor-pointer"
        >
          {t.projectDetail.backToWork}
        </button>
      </div>
    );
  }

  // Find prev and next project
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const related = getRelatedProjects(slug, 2);

  return (
    <div className="min-h-screen bg-[#050806] text-[#F3F6F3] pt-32 pb-24 bg-tactical-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/my-work')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#00E640] hover:text-white transition-colors cursor-pointer py-2"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{t.projectDetail.backToWork}</span>
          </button>
        </div>

        {/* Project Header */}
        <div className="max-w-4xl mb-12 text-left rtl:text-right">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#00E640] mb-4">
            <span className="bg-[#00E640]/10 border border-[#00E640]/30 px-3 py-1 rounded-md">
              {project.category[lang]}
            </span>
            <span className="text-[#9EAA9F]">·</span>
            <span className="text-[#9EAA9F] font-mono">{project.year}</span>
            <span className="text-[#9EAA9F]">·</span>
            <span className="text-[#9EAA9F]">{project.location[lang]}</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.025em] leading-tight mb-6"
            style={{ textWrap: 'balance' }}
          >
            {project.title[lang]}
          </h1>

          <p className="text-base sm:text-xl text-[#C5D0C6] leading-relaxed">
            {project.summary[lang]}
          </p>
        </div>

        {/* Hero Visual Cover */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0A110C] border border-[#00E640]/30 green-glow mb-16">
          <img
            src={project.coverImage}
            alt={project.title[lang]}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[700px] object-cover"
          />

          <button
            onClick={() => setActiveModalImage(project.coverImage)}
            className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 p-3 rounded-xl bg-[#050806]/80 text-[#00E640] hover:bg-[#00E640] hover:text-[#050806] border border-[#00E640]/30 transition-all cursor-pointer"
            title="Expand Full Resolution"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Project Details Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Left: Concept & Approach */}
          <div className="lg:col-span-8 space-y-12 text-left rtl:text-right">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-2 block">
                {t.projectDetail.conceptTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 tracking-[-0.02em]">
                {lang === 'en' ? 'The Vision & Conceptual Foundation' : 'الرؤية والأساس المفاهيمي'}
              </h2>
              <p className="text-base text-[#C5D0C6] leading-relaxed">
                {project.concept[lang]}
              </p>
            </div>

            <div className="pt-8 border-t border-[#00E640]/15">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-2 block">
                {t.projectDetail.approachTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 tracking-[-0.02em]">
                {lang === 'en' ? 'Design Execution & Art Direction' : 'التنفيذ الفني والإخراج الإبداعي'}
              </h2>
              <p className="text-base text-[#C5D0C6] leading-relaxed">
                {project.approach[lang]}
              </p>
            </div>
          </div>

          {/* Right: Meta Specification Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0B120C] border border-[#00E640]/20 space-y-4 text-xs text-left rtl:text-right">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white pb-3 border-b border-[#00E640]/15">
                {t.projectDetail.overviewTitle}
              </h3>

              <div className="flex justify-between py-1.5 border-b border-[#00E640]/10">
                <span className="text-[#9EAA9F]">{t.myWorkPage.categoryLabel}:</span>
                <span className="text-white font-medium">{project.category[lang]}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#00E640]/10">
                <span className="text-[#9EAA9F]">{t.myWorkPage.yearLabel}:</span>
                <span className="text-white font-mono">{project.year}</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-[#00E640]/10">
                <span className="text-[#9EAA9F]">{lang === 'en' ? 'Location:' : 'المقر:'}</span>
                <span className="text-white">{project.location[lang]}</span>
              </div>

              {/* Verified Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="pt-2">
                  <div className="text-[11px] font-semibold text-[#00E640] uppercase tracking-wider mb-2 font-mono">
                    {t.projectDetail.metricsTitle}
                  </div>
                  <div className="space-y-2">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="flex justify-between text-xs py-1">
                        <span className="text-[#9EAA9F]">{m.label[lang]}:</span>
                        <span className="text-white font-medium">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="pt-3 border-t border-[#00E640]/10">
                <div className="text-[11px] font-semibold text-[#00E640] uppercase tracking-wider mb-2 font-mono">
                  {t.projectDetail.deliverablesTitle}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[#111A13] text-[11px] text-[#C5D0C6] border border-[#00E640]/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Inquire about similar project CTA */}
            <div className="p-6 rounded-2xl bg-[#08120A] border border-[#00E640]/30 text-center">
              <h4 className="text-base font-semibold text-white mb-2">
                {t.projectDetail.discussProject}
              </h4>
              <p className="text-xs text-[#9EAA9F] mb-4">
                {lang === 'en'
                  ? 'Connect with Khaja Rayees directly to discuss a similar project for your brand.'
                  : 'تواصل مع المصمم خواجة رييس لمناقشة مشروع مماثل لعلامتك التجارية.'}
              </p>
              <button
                onClick={() =>
                  navigate(`/contact?service=${encodeURIComponent(project.category.en)}`)
                }
                className="w-full py-2.5 rounded-xl bg-[#00E640] hover:bg-[#10f24f] text-[#050806] font-semibold text-xs transition-colors cursor-pointer"
              >
                {t.hero.ctaContact}
              </button>
            </div>
          </div>
        </div>

        {/* Gallery of original uploaded images for this project */}
        {project.galleryImages.length > 1 && (
          <div className="mb-24">
            <div className="border-b border-[#00E640]/20 pb-4 mb-8 text-left rtl:text-right">
              <h3 className="text-2xl font-semibold text-white tracking-[-0.02em]">
                {t.projectDetail.galleryTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.galleryImages.map((imgSrc, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveModalImage(imgSrc)}
                  className="rounded-2xl overflow-hidden bg-[#0A110C] border border-[#00E640]/20 hover:border-[#00E640]/60 transition-all cursor-pointer relative group"
                >
                  <img
                    src={imgSrc}
                    alt={`${project.title[lang]} Artwork ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-lg bg-[#00E640] text-[#050806] font-semibold text-xs flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Enlarge' : 'تكبير'}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Previous / Next Project Navigation Bar */}
        <div className="py-8 border-y border-[#00E640]/15 flex items-center justify-between mb-20 text-xs font-semibold">
          {prevProject ? (
            <button
              onClick={() => navigate(`/my-work/${prevProject.slug}`)}
              className="flex items-center gap-2 text-[#9EAA9F] hover:text-[#00E640] transition-colors cursor-pointer text-left rtl:text-right"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <div>
                <span className="block text-[10px] text-[#7F8F81] uppercase font-mono">
                  {t.projectDetail.prevProject}
                </span>
                <span className="text-white text-xs">{prevProject.title[lang]}</span>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextProject ? (
            <button
              onClick={() => navigate(`/my-work/${nextProject.slug}`)}
              className="flex items-center gap-2 text-[#9EAA9F] hover:text-[#00E640] transition-colors cursor-pointer text-right rtl:text-left"
            >
              <div>
                <span className="block text-[10px] text-[#7F8F81] uppercase font-mono">
                  {t.projectDetail.nextProject}
                </span>
                <span className="text-white text-xs">{nextProject.title[lang]}</span>
              </div>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          ) : (
            <div />
          )}
        </div>

        {/* Related Projects */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-8 text-left rtl:text-right tracking-[-0.02em]">
            {t.projectDetail.relatedTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/my-work/${rel.slug}`)}
                className="group rounded-2xl bg-[#0A110C] border border-[#00E640]/20 hover:border-[#00E640]/60 overflow-hidden cursor-pointer flex flex-col transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#070C08]">
                  <img
                    src={rel.coverImage}
                    alt={rel.title[lang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs text-[#00E640] font-semibold mb-1">
                    {rel.category[lang]}
                  </div>
                  <h4 className="text-lg font-semibold text-white group-hover:text-[#00E640] transition-colors">
                    {rel.title[lang]}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal for high-res artwork inspection */}
      {activeModalImage && (
        <div
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setActiveModalImage(null)}
            className="absolute top-6 right-6 text-white hover:text-[#00E640] p-2 rounded-full bg-white/10"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeModalImage}
            alt="Artwork Fullscreen"
            referrerPolicy="no-referrer"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
