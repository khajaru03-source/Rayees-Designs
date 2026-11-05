import { ServiceCategory } from '../types.ts';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'brand-identity',
    title: {
      en: 'Brand Identity',
      ar: 'الهوية البصرية والعلامات التجارية',
    },
    description: {
      en: 'Crafting distinctive, memorable, and enduring visual systems that reflect your company’s core essence and command market authority.',
      ar: 'ابتكار منظومات بصرية متكاملة وشعارات فريدة تعكس جوهر نشاطك التجاري وتمنحك حضوراً واثقاً في السوق.',
    },
    services: [
      {
        id: 'logo-design',
        title: { en: 'Logo Design', ar: 'تصميم الشعارات' },
        description: {
          en: 'Bespoke geometric marks, custom monograms, and iconic wordmarks engineered with mathematical precision.',
          ar: 'شعارات مبتكرة، مونوغرامات هندسية، وخطوط مخصصة تُبنى بدقة حسابية عالية لتبقى راسخة في الأذهان.',
        },
        iconName: 'Sparkles',
        highlight: { en: 'Handcrafted Vector Precision', ar: 'دقة متجهات يدوية فائقة' },
      },
      {
        id: 'brand-identity-system',
        title: { en: 'Brand Identity Systems', ar: 'تطوير الهوية المؤسسية الكاملة' },
        description: {
          en: 'Comprehensive style guides, color hierarchies, typography pairings, and unified brand expression guidelines.',
          ar: 'أدلة إرشادية شاملة تحدد لوحات الألوان، التدرجات الطباعية، وقواعد التطبيق البصري المتناغم.',
        },
        iconName: 'Palette',
      },
      {
        id: 'branding-graphics',
        title: { en: 'Branding Graphics', ar: 'الرسومات والأيقونات المؤسسية' },
        description: {
          en: 'Custom visual assets, brand patterns, iconography, and supporting graphics tailored to your brand DNA.',
          ar: 'أنماط زخرفية، أيقونات مخصصة، ورسومات مساندة تتناغم مع لغة هويتك البصرية.',
        },
        iconName: 'Shapes',
      },
      {
        id: 'business-card-design',
        title: { en: 'Business Card Design', ar: 'تصميم بطاقات العمل الفاخرة' },
        description: {
          en: 'Luxury print-ready cards with spot UV, foil stamping, edge painting, and high-tactile finishes.',
          ar: 'بطاقات عمل استثنائية مع تقنيات الطلاء اللامع UV، والختم الحراري الذهبي والفضي.',
        },
        iconName: 'CreditCard',
      },
      {
        id: 'corporate-graphics',
        title: { en: 'Corporate Graphics', ar: 'الجرافيك المؤسسي والعروض' },
        description: {
          en: 'Executive pitch decks, corporate profiles, annual reports, and investor presentation templates.',
          ar: 'عروض تقديمية للمستثمرين، ملفات تعريف الشركات، وتقارير الأعمال الدورية الراقية.',
        },
        iconName: 'Briefcase',
      },
      {
        id: 'custom-stationery',
        title: { en: 'Custom Stationery', ar: 'المطبوعات المكتبية الخاصة' },
        description: {
          en: 'Envelopes, presentation folders, note pads, and branded merchandise that exude executive professionalism.',
          ar: 'أظرف المراسلات، ملفات الحفظ، والمذكرات المكتبية المصممة بطابع موحد وأنيق.',
        },
        iconName: 'FileText',
      },
      {
        id: 'letterhead-design',
        title: { en: 'Letterhead Design', ar: 'تصميم الترويسات الرسمية' },
        description: {
          en: 'Official document headers, digital Word templates, and certified invoice/receipt layouts.',
          ar: 'أوراق المراسلات الرسمية المعتمدة ونماذج الفواتير والسندات المتوافقة للطباعة والرقمي.',
        },
        iconName: 'Layers',
      },
    ],
  },
  {
    id: 'digital-design',
    title: {
      en: 'Digital & UI/UX Design',
      ar: 'التصميم الرقمي وتجربة المستخدم',
    },
    description: {
      en: 'Immersive digital products, conversion-focused websites, and high-retention user interfaces tailored for modern screens.',
      ar: 'تصميم واجهات مستخدم متميزة، مواقع تفاعلية، ومنتجات رقمية تركز على سهولة الاستخدام وزيادة التحويل.',
    },
    services: [
      {
        id: 'social-media-design',
        title: { en: 'Social Media Design', ar: 'تصاميم السوشيال ميديا' },
        description: {
          en: 'High-engagement carousels, promotional posts, story templates, and visual grids designed for viral retention.',
          ar: 'سلاسل الكاروسيل التفاعلية، تصاميم البوستات والستوري المجهزة لجذب المتابعين وبناء الثقة.',
        },
        iconName: 'Share2',
        highlight: { en: '6,000+ Community Proven', ar: 'مجربة مع أكثر من 6000 متابع' },
      },
      {
        id: 'website-graphics',
        title: { en: 'Website Graphics & Banners', ar: 'جرافيك وبانرات المواقع الإلكترونية' },
        description: {
          en: 'Art-directed hero banners, feature showcases, custom vectors, and responsive web assets.',
          ar: 'بانرات عريضة، رسومات توضيحية رقمية، وأيقونات تفاعلية مجهزة لشاشات الويب الحديثة.',
        },
        iconName: 'Layout',
      },
      {
        id: 'web-design',
        title: { en: 'Web Design', ar: 'تصميم المواقع الإلكترونية' },
        description: {
          en: 'Modern desktop and mobile landing pages with fluid responsive layouts and editorial typography.',
          ar: 'صفحات هبوط ومواقع متكاملة بهندسة برمجية حديثة وتناسق تام على كافة مقاسات الشاشات.',
        },
        iconName: 'Globe',
      },
      {
        id: 'ui-ux-design',
        title: { en: 'UI/UX Design', ar: 'تصميم واجهات وتجربة المستخدم' },
        description: {
          en: 'Intuitive user journey mapping, wireframing, high-fidelity prototypes, and design systems.',
          ar: 'رسم خرائط تدفق المستخدم، نماذج أولية تفاعلية، ومنظومة تصميم متناسقة وموثقة.',
        },
        iconName: 'Figma',
      },
      {
        id: 'app-design',
        title: { en: 'Mobile App Design', ar: 'تصميم تطبيقات الجوال' },
        description: {
          en: 'iOS and Android mobile interface mockups with modern tactile interaction patterns.',
          ar: 'شاشات تطبيقات الهواتف الذكية للآيفون والأندرويد بمظهر معاصر وسلاسة تشغيل فائقة.',
        },
        iconName: 'Smartphone',
      },
      {
        id: 'advertisement-design',
        title: { en: 'Digital Advertisement Design', ar: 'تصميم الإعلانات الرقمية المدفوعة' },
        description: {
          en: 'Click-optimized Google Ads, Meta campaign banners, and high-CTR dynamic promotional banners.',
          ar: 'تصاميم إعلانات جوجل ومنصات ميتا الموجهة لتحقيق أعلى عائد على الاستثمار الإعلاني.',
        },
        iconName: 'Target',
      },
    ],
  },
  {
    id: 'marketing-print',
    title: {
      en: 'Marketing & Commercial Print',
      ar: 'التسويق والمطبوعات التجارية الكبرى',
    },
    description: {
      en: 'From tactile brochures to industrial-scale wide format flex and billboard graphics. (Printing services available across India).',
      ar: 'من المطبوعات الورقية الفاخرة إلى لوحات الشوارع والطباعة الكبيرة (خدمات الطباعة والتوصيل متوفرة في جميع أنحاء الهند).',
    },
    services: [
      {
        id: 'printing-services-india',
        title: { en: 'Commercial Printing Services', ar: 'خدمات الطباعة التجارية والتوريد' },
        description: {
          en: 'Turnkey industrial printing spanning t-shirts, ceramic mugs, flex vinyl, and corporate gifts. Available across all states in India with doorstep dispatch.',
          ar: 'طباعة متكاملة على التيشيرتات، الأكواب، الفينيل، والهدايا المؤسسية مع الشحن لكافة مدن الهند.',
        },
        iconName: 'Printer',
        highlight: { en: 'Available across all over India', ar: 'متوفرة في جميع أنحاء الهند' },
      },
      {
        id: 'flyers-brochures',
        title: { en: 'Flyers & Brochures', ar: 'البروشورات والمنشورات الترويجية' },
        description: {
          en: 'Tri-fold, bi-fold, and gatefold brochures with meticulous typography and print finishing guidelines.',
          ar: 'مطويات ثنائية وثلاثية الطي بتصميم هندسي وإرشادات واضحة للقص والطي والطباعة.',
        },
        iconName: 'BookOpen',
      },
      {
        id: 'catalogues',
        title: { en: 'Product Catalogues', ar: 'كتالوجات المنتجات وقوائم الأسعار' },
        description: {
          en: 'Structured multi-page FMCG, retail, and industrial machinery catalogs built for quick ordering.',
          ar: 'كتالوجات متعددة الصفحات للأغذية والسلع الاستهلاكية والمعدات الصناعية بتنظيم يسهل الشراء.',
        },
        iconName: 'Book',
      },
      {
        id: 'posters',
        title: { en: 'Posters & Wall Art', ar: 'البوسترات والملصقات الجدارية' },
        description: {
          en: 'High-impact promotional and creative posters with cinematic lighting and expressive typography.',
          ar: 'ملصقات إعلانية وفنية بتأثيرات ضوئية سينمائية تلفت الأنظار في المعارض والمتاجر.',
        },
        iconName: 'Image',
      },
      {
        id: 'magazines-editorial',
        title: { en: 'Magazines & Publications', ar: 'المجلات والإصدارات الدورية' },
        description: {
          en: 'Editorial page layout, magazine covers, article spreads, and typographic art direction.',
          ar: 'تنسيق صفحات المجلات، تصميم الأغلفة الجذابة، وإخراج المقالات بأسلوب تحريري راقٍ.',
        },
        iconName: 'Columns',
      },
      {
        id: 'invitations',
        title: { en: 'Bespoke Invitations', ar: 'بطاقات الدعوة الملكية والمناسبات' },
        description: {
          en: 'Wedding stationery, corporate gala cards, VIP invitations with luxury gold/silver foil.',
          ar: 'دعوات الزفاف الفخمة وبطاقات الفعاليات الرسمية مع لمسات التذهيب والخط العربي الفاخر.',
        },
        iconName: 'Mail',
      },
      {
        id: 'signage',
        title: { en: 'Architectural Signage & Displays', ar: 'اللوحات الإرشادية وواجهات المحلات' },
        description: {
          en: 'Storefront 3D acrylic signs, indoor directional signage, reception branding, and exhibition booth graphics.',
          ar: 'لوحات المحلات ثلاثية الأبعاد، اللوحات الإرشادية الداخلية، وتجهيز أجنحة المعارض.',
        },
        iconName: 'Compass',
      },
      {
        id: 'billboard-graphics',
        title: { en: 'Billboard & Highway Graphics', ar: 'لوحات الطرق واليونيبول العملاقة' },
        description: {
          en: 'High-visibility outdoor advertising layouts designed for split-second readability at high driving speeds.',
          ar: 'إعلانات الطرق السريعة والشاشات الرقمية المصممة لتُقرأ بوضوح فوري من سرعات القيادة العالية.',
        },
        iconName: 'Maximize2',
      },
    ],
  },
  {
    id: 'multimedia',
    title: {
      en: 'Multimedia & Motion Design',
      ar: 'الوسائط المتعددة والموشن جرافيك',
    },
    description: {
      en: 'Dynamic video editing, kinetic motion typography, and thumb-stopping creative advertising.',
      ar: 'مونتاج الفيديو الاحترافي، التحريك الإعلاني التفاعلي، وصناعة المحتوى المرئي عالي التأثير.',
    },
    services: [
      {
        id: 'video-editing',
        title: { en: 'Professional Video Editing', ar: 'المونتاج ومعالجة الفيديو الاحترافية' },
        description: {
          en: 'Pacing, color grading, sound design, and narrative flow for commercials, YouTube, and reels.',
          ar: 'تقطيع إيقاعي، تلوين سينمائي، هندسة صوتية وتجهيز مقاطع الريلز واليوتيوب بأعلى دقة.',
        },
        iconName: 'Video',
        highlight: { en: 'Cinematic Color Grading', ar: 'تلوين سينمائي احترافي' },
      },
      {
        id: 'video-design-motion',
        title: { en: 'Video Design & Motion Graphics', ar: 'الموشن جرافيك والتحريك البصري' },
        description: {
          en: 'Logo reveals, kinetic typography animations, UI micro-interactions, and 2D animated explainers.',
          ar: 'تحريك الشعارات، الموشن تايبوغرافي، وشرح الخدمات بالرسوم المتحركة ثنائية الأبعاد.',
        },
        iconName: 'Film',
      },
      {
        id: 'creative-advertising',
        title: { en: 'Creative Concept Advertising', ar: 'الإعلانات الإبداعية وصناعة الفكرة' },
        description: {
          en: 'Conceptual storytelling, viral video storyboarding, and strategic visual metaphors that spark conversations.',
          ar: 'ابتكار أفكار الحملات الإعلانية، كتابة السيناريوهات البصرية، وتقديم مفاهيم تسويقية خارج الصندوق.',
        },
        iconName: 'Tv',
      },
    ],
  },
];
