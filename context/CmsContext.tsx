'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CompanyInfo, ServiceItem, ArticleItem, TestimonialItem, getCMSData, publishCMSData, initialCompanyInfo, initialServices, initialArticles, initialTestimonials } from '@/lib/cms';

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
  // Initialize directly with defaults so we never block rendering with a null state.
  // getCMSData() is safe to call on the server (returns initialCompanyInfo) and
  // on the client (reads localStorage, falls back to initialCompanyInfo).
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(initialCompanyInfo);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);

  // Hydrate from localStorage on the client after first render
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
