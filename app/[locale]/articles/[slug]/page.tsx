'use client';

import { use, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCMS } from '@/context/CmsContext';
import { Link } from '@/lib/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, FileText } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default function ArticleSinglePage({ params }: ArticlePageProps) {
  const { locale, slug } = use(params);
  const t = useTranslations('Articles');
  const { articles } = useCMS();

  // Find the requested article
  const article = articles.find((art) => art.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#090909] text-[#F5F5F5] flex flex-col items-center justify-center pt-24 px-6">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <Link href="/" className="px-6 py-3 bg-[#D4AF37] text-[#090909] font-bold text-xs uppercase rounded-sm">
          Return to Home
        </Link>
      </div>
    );
  }

  const title = locale === 'ar' ? article.titleAr : article.titleEn;
  const content = locale === 'ar' ? article.contentAr : article.contentEn;
  
  const formattedDate = new Date(article.date || '2026-06-27').toLocaleDateString(
    locale === 'ar' ? 'ar-EG' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <article className="min-h-screen bg-[#090909] text-[#F5F5F5] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      
      {/* Background radial gold glow */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-[#D4AF37]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 text-start">
        
        {/* Back Link */}
        <Link 
          href="/#articles" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E9E9E] hover:text-[#D4AF37] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === 'ar' ? 'العودة للمقالات' : 'Back to Insights'}</span>
        </Link>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-[#9E9E9E] border-b border-[#D4AF37]/15 pb-6 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#D4AF37]" />
            <span>{locale === 'ar' ? 'هيئة التحرير القانونية' : 'Diwan Legal Council'}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span>{locale === 'ar' ? '5 دقائق قراءة' : '5 min read'}</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8 text-[#F5F5F5]">
          {title}
        </h1>

        {/* Content body */}
        <div className="prose prose-invert max-w-none text-[#9E9E9E] text-sm sm:text-base leading-relaxed space-y-6">
          <p className="first-letter:text-3xl first-letter:font-bold first-letter:text-[#D4AF37]">
            {content}
          </p>
          <p>
            {locale === 'ar'
              ? 'مكتب ديوان المعاني يلتزم بأعلى درجات الصياغة اللغوية والتكييف القانوني عند ترجمة العقود التجارية والمذكرات القضائية لضمان الحفاظ على المراكز القانونية للأطراف المعنية أمام المحاكم الأجنبية والجهات الحكومية.'
              : 'Diwan Al Maany ensures rigorous phrasing accuracy. When converting multi-jurisdictional contracts and arbitration records, we apply seasoned legal methodologies to shield your operational exposures before domestic and international courts.'}
          </p>

          {/* Pharaonic ornamental quote divider */}
          <div className="my-10 p-6 border-l-2 border-[#D4AF37] bg-[#111111] rounded-sm text-[#F5F5F5] italic text-xs sm:text-sm">
            {locale === 'ar'
              ? 'تنويه: محتوى هذا المقال مخصص لأغراض التدقيق اللغوي والمعرفة العامة ولا يمثل استشارة قانونية رسمية.'
              : 'Notice: The insights provided in this analysis are for general advisory and terminological audits, not formal legal counsel.'}
          </div>

          <p>
            {locale === 'ar'
              ? 'علاوة على ذلك، فإن دمج تقنيات SHA-256 للتحقق المشفر وتطبيق معايير الاعتماد الرسمية لدى القنصليات والبعثات الدبلوماسية يضمن السرعة القصوى في الإنجاز والاعتماد الفوري.'
              : 'Furthermore, incorporating blockchain SHA-256 cryptographic verifications alongside official accreditation frameworks across consulates and ministries streamlines verification timelines.'}
          </p>
        </div>

        <div className="border-t border-[#D4AF37]/15 pt-8 mt-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E9E9E]">
              DIWAN CERTIFIED ADVISORY
            </span>
          </div>
          
          <Link
            href="/#contact"
            className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#E6C567] text-[#090909] text-xs font-bold uppercase tracking-wider rounded-sm"
          >
            {locale === 'ar' ? 'استشارة مجانية' : 'Consult Counsel'}
          </Link>
        </div>

      </div>
    </article>
  );
}
