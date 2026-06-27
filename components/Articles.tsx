'use client';

import { useTranslations } from 'next-intl';
import { useCMS } from '@/context/CmsContext';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar } from 'lucide-react';
import { Link } from '@/lib/navigation';

interface ArticlesProps {
  locale: string;
}

export default function Articles({ locale }: ArticlesProps) {
  const t = useTranslations('Articles');
  const { articles } = useCMS();

  return (
    <section className="py-24 px-6 md:px-12 bg-[#090909] relative z-10 border-t border-[#D4AF37]/10">
      
      {/* Background Soft Glow */}
      <div className="absolute left-[5%] top-[10%] w-[350px] h-[350px] bg-[#D4AF37]/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col items-start text-start">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-3">
              {t('title')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F5F5] max-w-xl">
              {t('subtitle')}
            </h2>
          </div>
          <div className="w-12 h-12 rounded-full border border-[#D4AF37]/20 flex items-center justify-center bg-[#111111]/80 shrink-0">
            <BookOpen className="w-5 h-5 text-[#D4AF37]" />
          </div>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => {
            const title = locale === 'ar' ? article.titleAr : article.titleEn;
            const summary = locale === 'ar' ? article.summaryAr : article.summaryEn;
            
            // Format dates simply
            const formattedDate = new Date(article.date || '2026-06-27').toLocaleDateString(
              locale === 'ar' ? 'ar-EG' : 'en-US',
              { year: 'numeric', month: 'short', day: 'numeric' }
            );

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className="group relative bg-[#111111] p-7 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 rounded-sm flex flex-col justify-between min-h-[300px] transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <div>
                  {/* Meta details */}
                  <div className="flex items-center gap-2 text-[10px] text-[#9E9E9E] mb-4">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{formattedDate}</span>
                  </div>
                  
                  {/* Heading */}
                  <h3 className="text-base font-bold text-[#F5F5F5] leading-snug mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {title}
                  </h3>
                  
                  {/* Summary */}
                  <p className="text-[12px] sm:text-xs leading-relaxed text-[#9E9E9E] line-clamp-3 mb-6">
                    {summary}
                  </p>
                </div>

                {/* Read More Link */}
                <div className="pt-4 border-t border-[#D4AF37]/10 flex items-center justify-between">
                  <Link
                    href={`/articles/${article.slug}`}
                    className="flex items-center gap-2 text-xs font-bold text-[#9E9E9E] group-hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    <span>{t('readMore')}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
