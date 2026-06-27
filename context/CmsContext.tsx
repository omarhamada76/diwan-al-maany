'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CompanyInfo, ServiceItem, ArticleItem, TestimonialItem, getCMSData, publishCMSData } from '@/lib/cms';

interface CmsContextType {
  companyInfo: CompanyInfo;
  services: ServiceItem[];
  articles: ArticleItem[];
  testimonials: TestimonialItem[];
  updateCompanyInfo: (info: CompanyInfo) => void;
  updateServices: (services: ServiceItem[]) => void;
  updateArticles: (articles: ArticleItem[]) => void;
  updateTestimonials: (testimonials: TestimonialItem[]) => void;
  publish: () => boolean;
  resetToDefault: () => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  // Load CMS data on mount
  useEffect(() => {
    const data = getCMSData();
    setCompanyInfo(data.companyInfo);
    setServices(data.services);
    setArticles(data.articles);
    setTestimonials(data.testimonials);
  }, []);

  const updateCompanyInfo = (info: CompanyInfo) => setCompanyInfo(info);
  const updateServices = (newServices: ServiceItem[]) => setServices(newServices);
  const updateArticles = (newArticles: ArticleItem[]) => setArticles(newArticles);
  const updateTestimonials = (newTestimonials: TestimonialItem[]) => setTestimonials(newTestimonials);

  const publish = () => {
    if (!companyInfo) return false;
    return publishCMSData({
      companyInfo,
      services,
      articles,
      testimonials,
    });
  };

  const resetToDefault = () => {
    localStorage.removeItem('diwan_company_info');
    localStorage.removeItem('diwan_services');
    localStorage.removeItem('diwan_articles');
    localStorage.removeItem('diwan_testimonials');
    
    const data = getCMSData();
    setCompanyInfo(data.companyInfo);
    setServices(data.services);
    setArticles(data.articles);
    setTestimonials(data.testimonials);
  };

  // Prevent rendering children until CMS state is hydrated from localStorage (client-side)
  if (!companyInfo) {
    return (
      <div className="fixed inset-0 bg-[#090909] flex items-center justify-center z-[99999]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#D4AF37] tracking-[0.2em] uppercase">DIWAN AL MAANY</span>
        </div>
      </div>
    );
  }

  return (
    <CmsContext.Provider
      value={{
        companyInfo,
        services,
        articles,
        testimonials,
        updateCompanyInfo,
        updateServices,
        updateArticles,
        updateTestimonials,
        publish,
        resetToDefault,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCMS must be used within a CmsProvider');
  }
  return context;
}
