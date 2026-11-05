import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useRouter } from '../context/RouterContext.tsx';
import { serviceCategories } from '../data/services.ts';
import {
  Sparkles,
  Layers,
  Compass,
  Zap,
  ArrowRight,
  Printer,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { navigate } = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories =
    activeCategory === 'all'
      ? serviceCategories
      : serviceCategories.filter((c) => c.id === activeCategory);

  const handleInquiry = (serviceTitle: string) => {
    navigate(`/contact?service=${encodeURIComponent(serviceTitle)}`);
  };

  return (
    <div className="min-h-screen bg-[#050806] text-[#F3F6F3] pt-32 pb-24 bg-tactical-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-12 text-left rtl:text-right">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-3 block">
            {t.servicesPage.pageTitle}
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.025em] leading-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {lang === 'en'
              ? 'Precision Design & Industrial Production Services.'
              : 'خدمات التصميم الدقيق والإنتاج الطباعي والتجاري.'}
          </h1>
          <p className="text-base sm:text-lg text-[#9EAA9F]">
            {t.servicesPage.pageSubtitle}
          </p>
        </div>

        {/* Commercial Printing Banner Callout (Requirement: available across India) */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#09140C] border border-[#00E640]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_4px_25px_rgba(0,230,64,0.1)]">
          <div className="flex items-start gap-4 text-left rtl:text-right">
            <div className="w-12 h-12 rounded-xl bg-[#00E640]/15 border border-[#00E640]/30 flex items-center justify-center text-[#00E640] shrink-0 mt-1">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-white">
                  {t.servicesPage.printNoticeTitle}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00E640] text-[#050806] font-semibold uppercase">
                  All India
                </span>
              </div>
              <p className="text-xs text-[#C5D0C6] max-w-3xl leading-relaxed">
                {t.servicesPage.printNoticeDesc}
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/918688297240"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#00E640] hover:bg-[#10f24f] text-[#050806] font-semibold text-xs flex items-center gap-2 shrink-0 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{lang === 'en' ? 'Print Inquiries (India)' : 'استفسارات الطباعة (الهند)'}</span>
          </a>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-16 p-1.5 rounded-xl bg-[#080F0A] border border-[#00E640]/20 max-w-fit">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#00E640] text-[#050806] shadow-sm'
                : 'text-[#C5D0C6] hover:text-white hover:bg-[#111C13]'
            }`}
          >
            {lang === 'en' ? 'All Services (22+)' : 'جميع الخدمات (٢٢+)'}
          </button>

          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#00E640] text-[#050806] shadow-sm'
                  : 'text-[#C5D0C6] hover:text-white hover:bg-[#111C13]'
              }`}
            >
              {cat.title[lang]}
            </button>
          ))}
        </div>

        {/* Category Sections */}
        <div className="space-y-20">
          {filteredCategories.map((category, catIdx) => (
            <div key={category.id} className="text-left rtl:text-right">
              {/* Category Header */}
              <div className="border-b border-[#00E640]/20 pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold font-mono text-[#00E640] mb-1">
                    <span>0{catIdx + 1}.</span>
                    <span className="uppercase tracking-widest">{category.id.replace('-', ' ')}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-[-0.02em]">
                    {category.title[lang]}
                  </h2>
                </div>
                <p className="text-xs text-[#9EAA9F] max-w-md">
                  {category.description[lang]}
                </p>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service) => (
                  <div
                    key={service.id}
                    className="p-6 rounded-2xl bg-[#0A110C] border border-[#00E640]/15 hover:border-[#00E640]/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_10px_35px_rgba(0,230,64,0.12)]"
                  >
                    <div>
                      {/* Highlight Tag if available (Anti-Pill clean text) */}
                      {service.highlight && (
                        <div className="mb-3 text-[11px] font-semibold text-[#00E640] flex items-center gap-1.5 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>{service.highlight[lang]}</span>
                        </div>
                      )}

                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00E640] transition-colors leading-snug">
                        {service.title[lang]}
                      </h3>

                      <p className="text-xs text-[#9EAA9F] leading-relaxed mb-6 font-normal">
                        {service.description[lang]}
                      </p>
                    </div>

                    <button
                      onClick={() => handleInquiry(service.title.en)}
                      className="pt-4 border-t border-[#00E640]/10 flex items-center justify-between text-xs font-semibold text-[#00E640] group-hover:text-white transition-colors cursor-pointer w-full"
                    >
                      <span>{t.servicesPage.inquireBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Consultation Box */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-[#09110B] border border-[#00E640]/30 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3 tracking-[-0.02em]">
              {lang === 'en' ? 'Need a custom scope or ongoing retainer?' : 'تحتاج نطاق عمل مخصص أو تعاقد شهري مستمر؟'}
            </h3>
            <p className="text-sm text-[#9EAA9F] mb-6">
              {lang === 'en'
                ? 'We configure bespoke solutions covering brand identity, packaging rollouts, social retainers, and nationwide print distribution.'
                : 'نصمم حلولاً مخصصة تلائم متطلبات نشاطك، من الهويات إلى التغليف وإدارة السوشيال والطباعة.'}
            </p>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact');
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#00E640] hover:bg-[#10f24f] text-[#050806] font-semibold text-sm transition-all hover:shadow-[0_0_25px_rgba(0,230,64,0.4)] cursor-pointer"
            >
              <span>{t.hero.ctaContact}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
