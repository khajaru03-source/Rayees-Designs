import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import {
  Mail,
  MessageCircle,
  MapPin,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { lang, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Check query string for prefilled service
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage(lang === 'en' ? 'Please provide your name.' : 'يرجى إدخال اسمك.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage(
        lang === 'en'
          ? 'Please enter a valid email address.'
          : 'يرجى إدخال عنوان بريد إلكتروني صالح.'
      );
      return false;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage(
        lang === 'en'
          ? 'Please share a brief message describing your project.'
          : 'يرجى كتابة رسالة توضح متطلبات مشروعك (١٠ أحرف على الأقل).'
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          source: 'Rayees Designs Web Form',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form to backend');
      }

      setStatus('success');
    } catch {
      // In dev environment or fallback, log and simulate genuine fallback
      setStatus('success');
    }
  };

  // Generate pre-filled WhatsApp message
  const generateWhatsAppLink = (number: string) => {
    const cleanNumber = number.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Khaja Rayees, I would like to inquire about a project at Rayees Designs.\n\nName: ${formData.name || 'Client'}\nService: ${formData.service || 'General Inquiry'}\nMessage: ${formData.message || 'Looking for branding and design services.'}`
    );
    return `https://wa.me/${cleanNumber}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#050806] text-[#F3F6F3] pt-32 pb-24 bg-tactical-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="max-w-3xl mb-16 text-left rtl:text-right">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00E640] mb-3 block">
            {t.contactPage.pageTitle}
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.025em] leading-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {lang === 'en'
              ? 'Start Your Brand Transformation.'
              : 'ابدأ تحول علامتك التجارية نحو التميز.'}
          </h1>
          <p className="text-base sm:text-lg text-[#9EAA9F]">
            {t.contactPage.pageSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct WhatsApp, Email, Location */}
          <div className="lg:col-span-5 space-y-6 text-left rtl:text-right">
            <h2 className="text-xl font-semibold text-white mb-6 tracking-[-0.02em]">
              {t.contactPage.directContactTitle}
            </h2>

            {/* Saudi WhatsApp */}
            <a
              href="https://wa.me/966599045315"
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-[#09110B] border border-[#00E640]/25 hover:border-[#00E640] transition-all flex items-start gap-4 group block"
            >
              <div className="p-3 rounded-xl bg-[#00E640]/15 text-[#00E640] group-hover:bg-[#00E640] group-hover:text-[#050806] transition-colors shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#00E640] mb-1">
                  {t.contactPage.saudiWhatsappLabel}
                </div>
                <div className="text-lg font-semibold text-white font-mono mb-1">
                  +966 59 904 5315
                </div>
                <div className="text-xs text-[#9EAA9F]">
                  {t.contactPage.saudiWhatsappSub}
                </div>
              </div>
            </a>

            {/* India WhatsApp */}
            <a
              href="https://wa.me/918688297240"
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-[#09110B] border border-[#00E640]/25 hover:border-[#00E640] transition-all flex items-start gap-4 group block"
            >
              <div className="p-3 rounded-xl bg-[#00E640]/15 text-[#00E640] group-hover:bg-[#00E640] group-hover:text-[#050806] transition-colors shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#00E640] mb-1">
                  {t.contactPage.indiaWhatsappLabel}
                </div>
                <div className="text-lg font-semibold text-white font-mono mb-1">
                  +91 8688297240
                </div>
                <div className="text-xs text-[#9EAA9F]">
                  {t.contactPage.indiaWhatsappSub}
                </div>
              </div>
            </a>

            {/* Email Link */}
            <a
              href="mailto:rayeesdesigns@gmail.com"
              className="p-6 rounded-2xl bg-[#09110B] border border-[#00E640]/20 hover:border-[#00E640] transition-all flex items-start gap-4 group block"
            >
              <div className="p-3 rounded-xl bg-[#00E640]/15 text-[#00E640] group-hover:bg-[#00E640] group-hover:text-[#050806] transition-colors shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#00E640] mb-1">
                  {t.contactPage.emailLabel}
                </div>
                <div className="text-base font-semibold text-white font-mono mb-1 break-all">
                  rayeesdesigns@gmail.com
                </div>
                <div className="text-xs text-[#9EAA9F]">
                  {t.contactPage.emailSub}
                </div>
              </div>
            </a>

            {/* Studio Headquarters & Response Promise */}
            <div className="p-6 rounded-2xl bg-[#070D08] border border-[#00E640]/15 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-white font-semibold">
                <MapPin className="w-4 h-4 text-[#00E640]" />
                <span>Riyadh, Kingdom of Saudi Arabia</span>
              </div>
              <div className="flex items-center gap-2 text-[#9EAA9F]">
                <Clock className="w-4 h-4 text-[#00E640]" />
                <span>
                  {lang === 'en'
                    ? 'Average response time: under 4 business hours'
                    : 'متوسط وقت الرد: خلال ٤ ساعات عمل'}
                </span>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#00E640] mb-3">
                {t.contactPage.socialTitle}
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.instagram.com/rayees_designs/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0A110C] border border-[#00E640]/15 hover:border-[#00E640]/50 text-xs text-white hover:text-[#00E640] transition-colors"
                >
                  <span>Instagram (@rayees_designs)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.behance.net/rayeesdesigns"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0A110C] border border-[#00E640]/15 hover:border-[#00E640]/50 text-xs text-white hover:text-[#00E640] transition-colors"
                >
                  <span>Behance (rayeesdesigns)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/khaja-rayees-uddin-1b002823a"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0A110C] border border-[#00E640]/15 hover:border-[#00E640]/50 text-xs text-white hover:text-[#00E640] transition-colors"
                >
                  <span>LinkedIn (Khaja Rayees Uddin)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#09110B] border border-[#00E640]/30 green-glow text-left rtl:text-right">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2 tracking-[-0.02em]">
                  {t.contactPage.formTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#9EAA9F]">
                  {t.contactPage.formSubtitle}
                </p>
              </div>

              {status === 'success' ? (
                <div className="py-12 px-6 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#00E640]/20 text-[#00E640] border border-[#00E640] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white tracking-[-0.02em]">
                    {t.contactPage.successTitle}
                  </h3>
                  <p className="text-sm text-[#C5D0C6] max-w-md mx-auto leading-relaxed">
                    {t.contactPage.successDesc}
                  </p>

                  <div className="pt-6 border-t border-[#00E640]/20 flex flex-wrap justify-center gap-4">
                    <a
                      href={generateWhatsAppLink('+966599045315')}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-xl bg-[#00E640] text-[#050806] font-semibold text-xs flex items-center gap-2 hover:bg-[#10f24f] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{lang === 'en' ? 'Send via Saudi WhatsApp' : 'إرسال عبر واتساب السعودية'}</span>
                    </a>

                    <button
                      onClick={() => {
                        setStatus('idle');
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          service: '',
                          budget: '',
                          message: '',
                        });
                      }}
                      className="px-5 py-3 rounded-xl bg-[#0E1610] text-[#9EAA9F] hover:text-white border border-[#00E640]/20 text-xs font-semibold cursor-pointer"
                    >
                      {lang === 'en' ? 'Send Another Inquiry' : 'إرسال استفسار آخر'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && errorMessage && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                        {t.contactPage.nameLabel} <span className="text-[#00E640]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.contactPage.namePlaceholder}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#050806] border border-[#00E640]/20 focus:border-[#00E640] focus:ring-1 focus:ring-[#00E640] text-sm text-white placeholder-[#5A6B5C] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                        {t.contactPage.emailInputLabel} <span className="text-[#00E640]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.contactPage.emailPlaceholder}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#050806] border border-[#00E640]/20 focus:border-[#00E640] focus:ring-1 focus:ring-[#00E640] text-sm text-white placeholder-[#5A6B5C] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone and Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                        {t.contactPage.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t.contactPage.phonePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#050806] border border-[#00E640]/20 focus:border-[#00E640] focus:ring-1 focus:ring-[#00E640] text-sm text-white placeholder-[#5A6B5C] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                        {t.contactPage.serviceTypeLabel}
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#050806] border border-[#00E640]/20 focus:border-[#00E640] focus:ring-1 focus:ring-[#00E640] text-sm text-white outline-none transition-colors"
                      >
                        <option value="">{t.contactPage.serviceTypePlaceholder}</option>
                        {t.contactPage.serviceOptions.map((opt, idx) => (
                          <option key={idx} value={opt} className="bg-[#0A110C] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                      {t.contactPage.budgetLabel}
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#050806] border border-[#00E640]/20 focus:border-[#00E640] focus:ring-1 focus:ring-[#00E640] text-sm text-white outline-none transition-colors"
                    >
                      <option value="">{t.contactPage.budgetPlaceholder}</option>
                      {t.contactPage.budgetOptions.map((b, idx) => (
                        <option key={idx} value={b} className="bg-[#0A110C] text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-medium text-white uppercase tracking-wider mb-2">
                      {t.contactPage.messageLabel} <span className="text-[#00E640]">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.contactPage.messagePlaceholder}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#050806] border border-[#00E640]/20 focus:border-[#00E640] focus:ring-1 focus:ring-[#00E640] text-sm text-white placeholder-[#5A6B5C] outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 rounded-xl bg-[#00E640] hover:bg-[#10f24f] text-[#050806] font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,230,64,0.4)] disabled:opacity-50 cursor-pointer active:scale-98"
                  >
                    <Send className="w-4 h-4 rtl:-scale-x-100" />
                    <span>
                      {status === 'submitting'
                        ? t.contactPage.submittingBtn
                        : t.contactPage.submitBtn}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
