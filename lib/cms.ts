export interface CompanyInfo {
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  email: string;
  phone: string;
  addressEn: string;
  addressAr: string;
  branchEn: string;
  branchAr: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  contentEn: string;
  contentAr: string;
  date: string;
}

export interface TestimonialItem {
  id: string;
  quoteEn: string;
  quoteAr: string;
  authorEn: string;
  authorAr: string;
  positionEn: string;
  positionAr: string;
}

// Initial mock data mirroring a Headless CMS schema structure
export const initialCompanyInfo: CompanyInfo = {
  nameEn: "Diwan Al Maany",
  nameAr: "ديوان المعاني",
  taglineEn: "Certified Legal Authority",
  taglineAr: "السلطة القانونية المعتمدة",
  email: "counsel@diwanalmaany.com",
  phone: "+20 2 2768 0000",
  addressEn: "40 Nile Corniche, Maadi, Cairo, Egypt",
  addressAr: "40 كورنيش النيل، المعادي، القاهرة، جمهورية مصر العربية",
  branchEn: "The Gate District, East Wing, DIFC, Dubai, UAE",
  branchAr: "منطقة البوابة، الجناح الشرقي، مركز دبي المالي العالمي (DIFC)، دبي، الإمارات العربية المتحدة"
};

export const initialServices: ServiceItem[] = [
  {
    id: "s1",
    slug: "certified-translation",
    titleEn: "Certified Legal Translation",
    titleAr: "الترجمة القانونية المعتمدة",
    descEn: "Official translation of court deeds, power of attorney, certificates, and affidavits, authenticated and signed by certified translators for immediate government acceptance.",
    descAr: "الترجمة الرسمية للصحف القضائية، والتوكيلات، والشهادات، والإقرارات الموثقة والموقعة من مترجمين محلفين للقبول الفوري لدى الجهات الحكومية."
  },
  {
    id: "s2",
    slug: "court-support",
    titleEn: "Court & Litigation Support",
    titleAr: "دعم المحاكم والتقاضي",
    descEn: "Comprehensive translation of litigation files, case dossiers, witness statements, and court transcripts with absolute semantic fidelity for judicial proceedings.",
    descAr: "ترجمة شاملة لملفات القضايا، والمذكرات القانونية، وأقوال الشهود، ومحاضر الجلسات بأعلى درجات الأمانة اللغوية والقانونية."
  },
  {
    id: "s3",
    slug: "corporate-services",
    titleEn: "Corporate & Financial Services",
    titleAr: "خدمات الشركات والقطاع المالي",
    descEn: "Structuring elite bilingual corporate articles of association, shareholder agreements, mergers, acquisitions, and compliance documentation for global corporations.",
    descAr: "صياغة عقود تأسيس الشركات الثنائية اللغة، واتفاقيات المساهمين، وعمليات الاستحواذ والاندماج، ووثائق الامتثال للشركات العالمية."
  },
  {
    id: "s4",
    slug: "contract-translation",
    titleEn: "Contract & Treaty Translation",
    titleAr: "ترجمة العقود والمعاهدات",
    descEn: "Meticulous legal transposition of commercial agreements, intellectual property covenants, and international sovereign treaties where every comma defines liability.",
    descAr: "النقل القانوني الدقيق للاتفاقيات التجارية، وعقود الملكية الفكرية، والمعاهدات الدولية السيادية حيث تحدد كل فاصلة حجم المسؤولية القانونية."
  },
  {
    id: "s5",
    slug: "embassy-translation",
    titleEn: "Embassy & Diplomatic Services",
    titleAr: "الترجمة المعتمدة للسفارات",
    descEn: "Certified embassy-ready translations for visa documentations, immigration files, and diplomatic correspondence conforming strictly to international consular standards.",
    descAr: "ترجمات معتمدة وجاهزة للتقديم في السفارات لملفات التأشيرات، والهجرة، والمراسلات الدبلوماسية المتوافقة تماماً مع المعايير القنصلية."
  },
  {
    id: "s6",
    slug: "document-review",
    titleEn: "Legal Document Review",
    titleAr: "مراجعة الوثائق القانونية",
    descEn: "High-end cross-border legal checks, terminology matching, and bilingual document review by seasoned legal experts to eliminate exposure and risk.",
    descAr: "تدقيق قانوني رفيع المستوى للمستندات العابرة للحدود، ومطابقة المصطلحات من قبل خبراء قانونيين متمرسين لدرء المخاطر والمسؤوليات."
  }
];

export const initialArticles: ArticleItem[] = [
  {
    id: "a1",
    slug: "commercial-arbitration-clauses",
    titleEn: "Translating Commercial Arbitration Clauses: Civil vs Common Law",
    titleAr: "ترجمة بنود التحكيم التجاري: بين القانون المدني والقانون العام",
    summaryEn: "An in-depth analysis of how minor phrasing differences in translation can shift liability in international commercial disputes.",
    summaryAr: "دراسة تحليلية مفصلة حول كيفية تسبب الاختلافات الطفيفة في صياغة الترجمة في تغيير المسؤوليات القانونية في النزاعات التجارية الدولية.",
    contentEn: "Legal arbitration clauses demand strict transposition. Under Civil Law jurisdictions (e.g., Egypt, France), terms reflect legislative codes, while Common Law (e.g., UK, US) relies heavily on precedent. When localizing clauses, translating 'indemnity' versus 'damages' can result in vastly different legal allocations. Expert bilingual analysis is required to preserve intent.",
    contentAr: "تتطلب بنود التحكيم صياغة قانونية صارمة. ففي الأنظمة ذات القانون المدني (مثل مصر وفرنسا)، تعكس المصطلحات نصوصاً تشريعية مقننة، بينما تعتمد أنظمة القانون العام (مثل بريطانيا وأمريكا) على السوابق القضائية. وعند ترجمة البنود، قد يؤدي خلط مصطلح 'التعويض' بمفاهيم المسؤولية العقدية إلى تغيير الاختصاص والمسؤولية المالية.",
    date: "2026-06-27"
  },
  {
    id: "a2",
    slug: "digital-stamps-legality",
    titleEn: "The Legality of Digital Stamps in Embassy Documentations",
    titleAr: "حجية الأختام الرقمية في توثيقات السفارات والبعثات الدبلوماسية",
    summaryEn: "Exploring the evolving standards of consular authentication and how the Diwan Digital Gold Seal matches embassy criteria.",
    summaryAr: "استعراض للمعايير المتطورة للتوثيق القنصلي ومدى مطابقة الختم الرقمي الذهبي لديوان المعاني لمتطلبات السفارات الدولية.",
    contentEn: "Sovereign consulates are shifting to online verification hashes. The traditional ink stamp is increasingly accompanied by cryptographic verification. The Diwan Al Maany Gold Seal includes unique QR signatures and localized hash outputs that meet EU consular and GCC ministerial audit standards, streamlining international filing pipelines.",
    contentAr: "تتحول القنصليات السيادية إلى التوثيق الإلكتروني. ولم يعد الختم الحبري التقليدي كافياً دون تحقق رقمي مشفر. يوفر ختم ديوان المعاني الذهبي توقيعات رمزية فريدة QR ورموز تشفير مطابقة لمعايير المراجعة الحكومية والدبلوماسية لتسهيل الإجراءات القانونية.",
    date: "2026-06-25"
  },
  {
    id: "a3",
    slug: "articles-of-association-pitfalls",
    titleEn: "Key Terminology Pitfalls in Bilingual Articles of Association",
    titleAr: "الأخطاء الشائعة في ترجمة عقود تأسيس الشركات ثنائية اللغة",
    summaryEn: "A guide for corporate counsels on avoiding ambiguities when localizing founding contracts for LLCs in the GCC region.",
    summaryAr: "دليل عملي للمستشارين القانونيين لتفادي الغموض عند صياغة وتوطين العقود التأسيسية للشركات ذات المسؤولية المحدودة في منطقة الخليج.",
    contentEn: "Translating articles of association for LLCs in the GCC requires understanding local commercial laws. Terms like 'limited liability' and 'quorum' have precise local legal equivalents. Careless translations of profit distribution mechanisms can invalidate the document before the notary public.",
    contentAr: "تطلب ترجمة عقود التأسيس للشركات في منطقة الخليج فهماً عميقاً للقوانين التجارية المحلية. ومصطلحات مثل 'النصاب القانوني' و 'توزيع الأرباح' لها مرادفات قانونية حصرية في اللوائح التجارية الإقليمية يؤدي الخطأ فيها لرفض القيد.",
    date: "2026-06-22"
  }
];

export const initialTestimonials: TestimonialItem[] = [
  {
    id: "t1",
    quoteEn: "Diwan Al Maany is our exclusive partner for international commercial arbitration files. Their speed and legal precision are unmatched in the Middle East.",
    quoteAr: "ديوان المعاني هو شريكنا الحصري لملفات التحكيم التجاري الدولي. سرعة أدائهم ودقتهم القانونية لا ميل لهما في منطقة الشرق الأوسط.",
    authorEn: "Dr. Tariq Al-Mansoor",
    authorAr: "د. طارق المنصور",
    positionEn: "Senior Partner, Al-Mansoor Litigation",
    positionAr: "شريك أول، المنصور للمحاماة والاستشارات"
  },
  {
    id: "t2",
    quoteEn: "The certified translation of our merger contracts was accepted by the Ministry without a single note. An absolute masterclass in legal translation.",
    quoteAr: "قُبلت الترجمة المعتمدة لعقود الاندماج الخاصة بنا لدى الوزارة دون إبداء ملاحظة واحدة. عمل احترافي يمثل قمة التميز في الصياغة القانونية.",
    authorEn: "Victoria Sterling",
    authorAr: "فيكتوريا ستيرلينغ",
    positionEn: "General Counsel, Sterling Capital Holdings",
    positionAr: "المستشار القانوني العام، ستيرلينغ القابضة للاستثمار"
  }
];

// Content loading wrapper (local storage fallback simulating Sanity client fetch)
export function getCMSData() {
  if (typeof window === 'undefined') {
    return {
      companyInfo: initialCompanyInfo,
      services: initialServices,
      articles: initialArticles,
      testimonials: initialTestimonials
    };
  }

  const companyInfo = localStorage.getItem('diwan_company_info')
    ? JSON.parse(localStorage.getItem('diwan_company_info')!)
    : initialCompanyInfo;

  const services = localStorage.getItem('diwan_services')
    ? JSON.parse(localStorage.getItem('diwan_services')!)
    : initialServices;

  const articles = localStorage.getItem('diwan_articles')
    ? JSON.parse(localStorage.getItem('diwan_articles')!)
    : initialArticles;

  const testimonials = localStorage.getItem('diwan_testimonials')
    ? JSON.parse(localStorage.getItem('diwan_testimonials')!)
    : initialTestimonials;

  return { companyInfo, services, articles, testimonials };
}

// Content saving wrapper (simulating a CMS publish action)
export function publishCMSData(data: {
  companyInfo: CompanyInfo;
  services: ServiceItem[];
  articles: ArticleItem[];
  testimonials: TestimonialItem[];
}) {
  if (typeof window === 'undefined') return false;

  localStorage.setItem('diwan_company_info', JSON.stringify(data.companyInfo));
  localStorage.setItem('diwan_services', JSON.stringify(data.services));
  localStorage.setItem('diwan_articles', JSON.stringify(data.articles));
  localStorage.setItem('diwan_testimonials', JSON.stringify(data.testimonials));
  
  return true;
}
