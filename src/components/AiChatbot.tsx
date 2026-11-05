import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useRouter } from '../context/RouterContext.tsx';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  MessageCircle,
  Mail,
  ArrowRight,
  ExternalLink,
  Minimize2,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    action: () => void;
    icon?: 'whatsapp' | 'email' | 'link';
  }[];
}

export const AiChatbot: React.FC = () => {
  const { lang } = useLanguage();
  const { navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting =
    lang === 'en'
      ? 'Hello! I am the Rayees Designs Studio Assistant. How can I assist you with brand identity, packaging, UI/UX, commercial printing across India, or direct WhatsApp inquiries today?'
      : 'أهلاً بك! أنا المساعد الذكي لاستوديو رييس ديزاينز في الرياض. كيف يمكنني مساعدتك في تصميم الهويات، التغليف، الطباعة التجارية في الهند، أو التواصل المباشر عبر الواتساب؟';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: initialGreeting,
      timestamp: 'Just now',
      actions: [
        {
          label: lang === 'en' ? 'WhatsApp (KSA)' : 'واتساب السعودية',
          action: () => window.open('https://wa.me/966599045315', '_blank'),
          icon: 'whatsapp',
        },
        {
          label: lang === 'en' ? 'WhatsApp (India)' : 'واتساب الهند',
          action: () => window.open('https://wa.me/918688297240', '_blank'),
          icon: 'whatsapp',
        },
        {
          label: lang === 'en' ? 'View My Work' : 'استعراض أعمالي',
          action: () => {
            navigate('/my-work');
            setIsOpen(false);
          },
          icon: 'link',
        },
      ],
    },
  ]);

  // Update greeting if language switches and no user messages yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            id: 'welcome-1',
            sender: 'assistant',
            text:
              lang === 'en'
                ? 'Hello! I am the Rayees Designs Studio Assistant. How can I assist you with brand identity, packaging, UI/UX, commercial printing across India, or direct WhatsApp inquiries today?'
                : 'أهلاً بك! أنا المساعد الذكي لاستوديو رييس ديزاينز في الرياض. كيف يمكنني مساعدتك في تصميم الهويات، التغليف، الطباعة التجارية في الهند، أو التواصل المباشر عبر الواتساب؟',
            timestamp: 'Just now',
            actions: [
              {
                label: lang === 'en' ? 'WhatsApp (KSA)' : 'واتساب السعودية',
                action: () => window.open('https://wa.me/966599045315', '_blank'),
                icon: 'whatsapp',
              },
              {
                label: lang === 'en' ? 'WhatsApp (India)' : 'واتساب الهند',
                action: () => window.open('https://wa.me/918688297240', '_blank'),
                icon: 'whatsapp',
              },
              {
                label: lang === 'en' ? 'View My Work' : 'استعراض أعمالي',
                action: () => {
                  navigate('/my-work');
                  setIsOpen(false);
                },
                icon: 'link',
              },
            ],
          },
        ];
      }
      return prev;
    });
  }, [lang, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const quickPrompts =
    lang === 'en'
      ? [
          'What services do you offer?',
          'WhatsApp contact numbers',
          'Where is Rayees Designs based?',
          'Commercial printing across India',
          'Tell me about AlTasbhi packaging',
        ]
      : [
          'ما هي الخدمات التي تقدمونها؟',
          'أرقام التواصل عبر الواتساب',
          'أين يقع مقر رييس ديزاينز؟',
          'خدمات الطباعة التجارية في الهند',
          'أخبرني عن مشروع تغليف التسبيح',
        ];

  // Grounded knowledge response generator based strictly on authentic website data
  const generateResponse = (query: string): { text: string; actions?: ChatMessage['actions'] } => {
    const q = query.toLowerCase();

    if (q.includes('service') || q.includes('خدم') || q.includes('offer')) {
      return {
        text:
          lang === 'en'
            ? 'Rayees Designs specializes in 4 multidisciplinary areas:\n1. Brand Identity: Logo design, monograms, brand systems, custom stationery, business cards.\n2. Digital & UI/UX: Website design, mobile UI, social media carousels, paid advertising.\n3. Marketing & Commercial Print: Turnkey printing available across India (apparel, mugs, flex banners, brochures, ID cards, catalogues).\n4. Multimedia: Professional video editing, kinetic motion graphics, and creative advertising.'
            : 'يقدم رييس ديزاينز ٤ مجالات إبداعية متكاملة:\n١. الهوية البصرية: تصميم الشعارات، المونوغرامات، المطبوعات الرسمية وبطاقات العمل الفاخرة.\n٢. التصميم الرقمي وواجهات المستخدم: تصميم المواقع والتطبيقات، وبوستات السوشيال ميديا.\n٣. التسويق والطباعة التجارية الكبرى: خدمات الطباعة والتوريد في عموم الهند (تيشيرتات، أكواب، بروشورات، بطاقات ولافتات).\n٤. الوسائط المتعددة: المونتاج الاحترافي والموشن جرافيك.',
        actions: [
          {
            label: lang === 'en' ? 'Explore Services Page' : 'صفحة الخدمات الكاملة',
            action: () => {
              navigate('/services');
              setIsOpen(false);
            },
            icon: 'link',
          },
        ],
      };
    }

    if (
      q.includes('whatsapp') ||
      q.includes('contact') ||
      q.includes('واتساب') ||
      q.includes('تواصل') ||
      q.includes('phone') ||
      q.includes('رقم')
    ) {
      return {
        text:
          lang === 'en'
            ? 'You can reach Khaja Rayees directly through the following official channels:\n• Saudi Arabia WhatsApp: +966 59 904 5315 (Riyadh & GCC inquiries)\n• India WhatsApp: +91 8688297240 (India design & printing)\n• Official Email: rayeesdesigns@gmail.com\n\nDirect links are provided below:'
            : 'يمكنك التواصل مباشرة مع المصمم خواجة رييس عبر القنوات المعتمدة:\n• واتساب السعودية: 966599045315+ (لاستفسارات الرياض والخليج)\n• واتساب الهند: 918688297240+ (لخدمات التصميم والطباعة في الهند)\n• البريد الرسمي: rayeesdesigns@gmail.com',
        actions: [
          {
            label: lang === 'en' ? 'Chat on Saudi WhatsApp' : 'محادثة واتساب السعودية',
            action: () => window.open('https://wa.me/966599045315', '_blank'),
            icon: 'whatsapp',
          },
          {
            label: lang === 'en' ? 'Chat on India WhatsApp' : 'محادثة واتساب الهند',
            action: () => window.open('https://wa.me/918688297240', '_blank'),
            icon: 'whatsapp',
          },
        ],
      };
    }

    if (q.includes('print') || q.includes('طباع') || q.includes('india') || q.includes('هند')) {
      return {
        text:
          lang === 'en'
            ? 'Yes! Commercial printing services are fully operational across all states in India with doorstep dispatch. Products include Roland industrial wide-format printing, custom t-shirts, mugs, foil business cards, corporate gifts, ID cards, and flex vinyl signage.'
            : 'نعم! خدمات الطباعة التجارية الكبرى متوفرة وتُشحن لكافة ولايات ومدن الهند. تشمل طباعة ماكينات رولاند الكبيرة، التيشيرتات، الأكواب، بطاقات العمل المذهبة، لافتات الفينيل، والهدايا المؤسسية.',
        actions: [
          {
            label: lang === 'en' ? 'Print Inquiries (India WhatsApp)' : 'استفسار الطباعة (واتساب الهند)',
            action: () => window.open('https://wa.me/918688297240', '_blank'),
            icon: 'whatsapp',
          },
        ],
      };
    }

    if (q.includes('location') || q.includes('where') || q.includes('riyadh') || q.includes('رياض') || q.includes('مقر')) {
      return {
        text:
          lang === 'en'
            ? 'Rayees Designs is headquartered in Riyadh, Kingdom of Saudi Arabia, and operates dedicated commercial production and client fulfillment across India.'
            : 'يقع المقر الرئيسي لرييس ديزاينز في العاصمة الرياض بالمملكة العربية السعودية، مع تشغيل طباعي وإنتاجي متكامل يغطي جميع أنحاء الهند.',
      };
    }

    if (q.includes('altasbhi') || q.includes('تسبيح') || q.includes('poultry') || q.includes('دواجن')) {
      return {
        text:
          lang === 'en'
            ? 'The AlTasbhi campaign is one of our flagship packaging and advertising works in Saudi Arabia. It includes 1300g fresh poultry retail packaging adhering to Saudi Made standards, Saudi National Day 96 skyline visuals, and family culinary dinner campaigns.'
            : 'حملة التسبيح هي إحدى أبرز مشاريع التغليف والإعلان في السعودية، وشملت تصميم عبوات الدواجن الطازجة مطابقة لمعايير "صُنع في السعودية"، وتصاميم اليوم الوطني السعودي 96، وإعلانات المائدة العائلية في الرياض.',
        actions: [
          {
            label: lang === 'en' ? 'View AlTasbhi Case Study' : 'مشاهدة تفاصيل مشروع التسبيح',
            action: () => {
              navigate('/my-work/altasbhi-poultry-campaigns');
              setIsOpen(false);
            },
            icon: 'link',
          },
        ],
      };
    }

    if (q.includes('experience') || q.includes('who') || q.includes('خبر') || q.includes('من هو')) {
      return {
        text:
          lang === 'en'
            ? 'Rayees Designs is led by Khaja Rayees Uddin, a senior graphic designer, brand specialist, and UI/UX designer with 4+ years of professional experience, over 100 delivered projects, and a creative community of 6,000+ followers on Instagram.'
            : 'يقود الاستوديو المصمم خواجة رييس الدين، مصمم جرافيك أول ومختص في بناء الهويات وتجربة المستخدم بخبرة تزيد عن 4 سنوات، وأكثر من 100 مشروع منجز، ومجتمع يتجاوز 6,000 متابع على إنستقرام.',
        actions: [
          {
            label: lang === 'en' ? 'Read Full About Page' : 'اقرأ المزيد في صفحة عن رييس',
            action: () => {
              navigate('/about');
              setIsOpen(false);
            },
            icon: 'link',
          },
        ],
      };
    }

    // Default Fallback
    return {
      text:
        lang === 'en'
          ? 'Thank you for your question! For specific project timelines, quotes, and bespoke design briefs, Khaja Rayees personally reviews inquiries via WhatsApp and email.'
          : 'شكراً لاستفسارك! للحصول على عروض الأسعار والجدول الزمني لمشروعك، يقوم المصمم خواجة رييس بمراجعة الرسائل شخصياً عبر الواتساب والبريد.',
      actions: [
        {
          label: lang === 'en' ? 'Saudi WhatsApp (+966)' : 'واتساب السعودية (٩٦٦+)',
          action: () => window.open('https://wa.me/966599045315', '_blank'),
          icon: 'whatsapp',
        },
        {
          label: lang === 'en' ? 'Open Contact Page' : 'صفحة التواصل والموجز',
          action: () => {
            navigate('/contact');
            setIsOpen(false);
          },
          icon: 'link',
        },
      ],
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateResponse(query);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: reply.text,
        timestamp: 'Just now',
        actions: reply.actions,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-3.5 sm:px-4 sm:py-3 rounded-full bg-[#070E09] border-2 border-[#00E640] text-white green-glow flex items-center gap-2.5 shadow-[0_10px_35px_rgba(0,230,64,0.35)] cursor-pointer group"
          aria-label="Open Rayees Designs AI Assistant"
        >
          {/* Logo badge with pulse */}
          <div className="relative w-7 h-7 rounded-md overflow-hidden bg-black shrink-0 border border-[#00E640]/40">
            <img
              src="/assets/aistudio/image_a87d1be2.png"
              alt="Rayees Designs"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="hidden sm:flex flex-col text-left rtl:text-right leading-none">
            <span className="text-xs font-semibold uppercase tracking-wider text-white group-hover:text-[#00E640] transition-colors">
              {lang === 'en' ? 'Studio AI Guide' : 'المساعد الذكي'}
            </span>
            <span className="text-[10px] text-[#00E640] font-mono mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E640] animate-pulse" />
              <span>{lang === 'en' ? 'Online' : 'متصل الآن'}</span>
            </span>
          </div>

          <Sparkles className="w-4 h-4 text-[#00E640] group-hover:rotate-12 transition-transform shrink-0" />
        </motion.button>
      </div>

      {/* Animated Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6 z-50 w-[92vw] sm:w-[410px] max-h-[600px] flex flex-col rounded-3xl bg-[#070D08]/98 backdrop-blur-xl border border-[#00E640]/40 shadow-[0_20px_60px_rgba(0,0,0,0.85)] green-glow overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#00E640]/20 bg-[#0A140C] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-black border border-[#00E640]/40 shrink-0">
                  <img
                    src="/assets/aistudio/image_a87d1be2.png"
                    alt="Rayees Designs"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left rtl:text-right">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <span>{lang === 'en' ? 'Rayees Designs Assistant' : 'مساعد رييس ديزاينز'}</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#00E640]" />
                  </h3>
                  <p className="text-[11px] text-[#9EAA9F] font-mono">
                    {lang === 'en' ? 'Studio Knowledge Guide • Riyadh' : 'دليل الاستوديو المعرفي • الرياض'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-[#9EAA9F] hover:text-white hover:bg-[#111C13] transition-colors cursor-pointer"
                  aria-label="Close Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[380px] bg-tactical-grid-dense text-left rtl:text-right text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#00E640] text-[#050806] font-semibold rounded-br-none'
                        : 'bg-[#0E1810] text-[#E0EBE1] border border-[#00E640]/25 rounded-bl-none shadow-md whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Interactive Actions attached to message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 max-w-[85%]">
                      {msg.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={act.action}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#070D08] hover:bg-[#00E640] text-[#00E640] hover:text-[#050806] border border-[#00E640]/30 hover:border-[#00E640] text-[11px] font-semibold transition-all cursor-pointer"
                        >
                          {act.icon === 'whatsapp' && <MessageCircle className="w-3 h-3" />}
                          {act.icon === 'link' && <ArrowRight className="w-3 h-3 rtl:rotate-180" />}
                          <span>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-[#6B7C6E] mt-1 px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 bg-[#0E1810] border border-[#00E640]/25 rounded-2xl px-4 py-2.5 max-w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#00E640] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#00E640] animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#00E640] animate-bounce [animation-delay:0.3s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-4 py-2 bg-[#09110B] border-t border-[#00E640]/15 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-md bg-[#0F1B12] hover:bg-[#00E640]/20 text-[#A0B0A2] hover:text-[#00E640] border border-[#00E640]/20 text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-[#00E640]/20 bg-[#070D08] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  lang === 'en'
                    ? 'Ask about services, WhatsApp, printing...'
                    : 'اسأل عن الخدمات، الواتساب، الطباعة...'
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0D160E] border border-[#00E640]/20 focus:border-[#00E640] text-xs text-white placeholder-[#68796A] outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-[#00E640] hover:bg-[#10f24f] text-[#050806] disabled:opacity-40 transition-colors cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 rtl:-scale-x-100" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
