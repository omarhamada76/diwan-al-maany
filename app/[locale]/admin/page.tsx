'use client';

import { useState } from 'react';
import { useCMS } from '@/context/CmsContext';
import { ShieldAlert, Save, RefreshCw, Layers, FileEdit, Users, HelpCircle, ArrowLeft } from 'lucide-react';
import { Link } from '@/lib/navigation';

export default function AdminPage() {
  const {
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
  } = useCMS();

  // Active edit tab state
  const [activeTab, setActiveTab] = useState<'info' | 'services' | 'articles' | 'testimonials'>('info');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveAll = () => {
    const success = publish();
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to revert all edits to defaults?')) {
      resetToDefault();
      alert('Data reset to original initial schemas.');
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-[#F5F5F5] pt-28 pb-16 px-6 sm:px-8">
      
      {/* Top Breadcrumb banner */}
      <div className="max-w-6xl mx-auto flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 mb-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[#9E9E9E] hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" />
            <span>Exit Dashboard</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#9E9E9E]">
            DIWAN AL MAANY CMS ADAPTER
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Sidebar Tabs Navigation */}
        <div className="md:col-span-3 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-3 p-4 text-xs font-bold uppercase tracking-wider rounded-sm border transition-all text-start cursor-pointer ${
              activeTab === 'info'
                ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                : 'border-[#D4AF37]/10 bg-[#111111] text-[#9E9E9E] hover:border-[#D4AF37]/35'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Company Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-3 p-4 text-xs font-bold uppercase tracking-wider rounded-sm border transition-all text-start cursor-pointer ${
              activeTab === 'services'
                ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                : 'border-[#D4AF37]/10 bg-[#111111] text-[#9E9E9E] hover:border-[#D4AF37]/35'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Manage Services</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-3 p-4 text-xs font-bold uppercase tracking-wider rounded-sm border transition-all text-start cursor-pointer ${
              activeTab === 'articles'
                ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                : 'border-[#D4AF37]/10 bg-[#111111] text-[#9E9E9E] hover:border-[#D4AF37]/35'
            }`}
          >
            <FileEdit className="w-4 h-4" />
            <span>Legal Articles</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-3 p-4 text-xs font-bold uppercase tracking-wider rounded-sm border transition-all text-start cursor-pointer ${
              activeTab === 'testimonials'
                ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                : 'border-[#D4AF37]/10 bg-[#111111] text-[#9E9E9E] hover:border-[#D4AF37]/35'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Testimonials</span>
          </button>

          <div className="h-[1px] bg-[#D4AF37]/10 my-4" />

          {/* Action buttons */}
          <button
            onClick={handleSaveAll}
            className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-[#D4AF37] to-[#E6C567] text-[#090909] text-xs font-bold uppercase tracking-wider rounded-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Drafts</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 p-4 border border-red-500/20 hover:border-red-500 text-red-500 bg-[#111111] text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Default Schema</span>
          </button>

          {saveSuccess && (
            <p className="text-center text-xs text-[#D4AF37] font-semibold mt-2 animate-pulse">
              ✓ All Drafts Published Live!
            </p>
          )}
        </div>

        {/* Right Side: Tab Forms Panel */}
        <div className="md:col-span-9 bg-[#111111] border border-[#D4AF37]/15 p-8 rounded-sm shadow-xl min-h-[500px]">
          
          {/* TAB 1: COMPANY INFO */}
          {activeTab === 'info' && (
            <div className="space-y-6 text-start">
              <h2 className="text-lg font-bold text-[#F5F5F5] border-b border-[#D4AF37]/20 pb-2 mb-6">
                Company Profile Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-[#9E9E9E]">Company Name (EN)</label>
                  <input
                    type="text"
                    value={companyInfo.nameEn}
                    onChange={(e) => updateCompanyInfo({ ...companyInfo, nameEn: e.target.value })}
                    className="bg-[#090909] border border-[#D4AF37]/15 px-4 py-2.5 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-[#9E9E9E]">Company Name (AR)</label>
                  <input
                    type="text"
                    value={companyInfo.nameAr}
                    onChange={(e) => updateCompanyInfo({ ...companyInfo, nameAr: e.target.value })}
                    className="bg-[#090909] border border-[#D4AF37]/15 px-4 py-2.5 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                    dir="rtl"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-[#9E9E9E]">Tagline (EN)</label>
                  <input
                    type="text"
                    value={companyInfo.taglineEn}
                    onChange={(e) => updateCompanyInfo({ ...companyInfo, taglineEn: e.target.value })}
                    className="bg-[#090909] border border-[#D4AF37]/15 px-4 py-2.5 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-[#9E9E9E]">Tagline (AR)</label>
                  <input
                    type="text"
                    value={companyInfo.taglineAr}
                    onChange={(e) => updateCompanyInfo({ ...companyInfo, taglineAr: e.target.value })}
                    className="bg-[#090909] border border-[#D4AF37]/15 px-4 py-2.5 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                    dir="rtl"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-[#9E9E9E]">Intake Email</label>
                  <input
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => updateCompanyInfo({ ...companyInfo, email: e.target.value })}
                    className="bg-[#090909] border border-[#D4AF37]/15 px-4 py-2.5 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-[#9E9E9E]">Intake Phone</label>
                  <input
                    type="text"
                    value={companyInfo.phone}
                    onChange={(e) => updateCompanyInfo({ ...companyInfo, phone: e.target.value })}
                    className="bg-[#090909] border border-[#D4AF37]/15 px-4 py-2.5 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-wider text-[#9E9E9E]">Headquarters Address (EN)</label>
                <input
                  type="text"
                  value={companyInfo.addressEn}
                  onChange={(e) => updateCompanyInfo({ ...companyInfo, addressEn: e.target.value })}
                  className="bg-[#090909] border border-[#D4AF37]/15 px-4 py-2.5 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-wider text-[#9E9E9E]">Headquarters Address (AR)</label>
                <input
                  type="text"
                  value={companyInfo.addressAr}
                  onChange={(e) => updateCompanyInfo({ ...companyInfo, addressAr: e.target.value })}
                  className="bg-[#090909] border border-[#D4AF37]/15 px-4 py-2.5 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                  dir="rtl"
                />
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-8 text-start">
              <h2 className="text-lg font-bold text-[#F5F5F5] border-b border-[#D4AF37]/20 pb-2 mb-6">
                Specialized Services List
              </h2>

              {services.map((service, idx) => (
                <div key={service.id} className="p-5 bg-[#090909] border border-[#D4AF37]/10 rounded-sm space-y-4">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block">
                    SERVICE TIER {idx + 1} ({service.slug})
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Title (EN)</label>
                      <input
                        type="text"
                        value={service.titleEn}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[idx].titleEn = e.target.value;
                          updateServices(updated);
                        }}
                        className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Title (AR)</label>
                      <input
                        type="text"
                        value={service.titleAr}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[idx].titleAr = e.target.value;
                          updateServices(updated);
                        }}
                        className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Description (EN)</label>
                      <textarea
                        rows={2}
                        value={service.descEn}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[idx].descEn = e.target.value;
                          updateServices(updated);
                        }}
                        className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] resize-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Description (AR)</label>
                      <textarea
                        rows={2}
                        value={service.descAr}
                        onChange={(e) => {
                          const updated = [...services];
                          updated[idx].descAr = e.target.value;
                          updateServices(updated);
                        }}
                        className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] resize-none"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ARTICLES */}
          {activeTab === 'articles' && (
            <div className="space-y-8 text-start">
              <h2 className="text-lg font-bold text-[#F5F5F5] border-b border-[#D4AF37]/20 pb-2 mb-6">
                Knowledge Center Articles
              </h2>

              {articles.map((article, idx) => (
                <div key={article.id} className="p-5 bg-[#090909] border border-[#D4AF37]/10 rounded-sm space-y-4">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block">
                    ARTICLE TIER {idx + 1}
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Title (EN)</label>
                      <input
                        type="text"
                        value={article.titleEn}
                        onChange={(e) => {
                          const updated = [...articles];
                          updated[idx].titleEn = e.target.value;
                          updateArticles(updated);
                        }}
                        className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Title (AR)</label>
                      <input
                        type="text"
                        value={article.titleAr}
                        onChange={(e) => {
                          const updated = [...articles];
                          updated[idx].titleAr = e.target.value;
                          updateArticles(updated);
                        }}
                        className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Summary (EN)</label>
                    <textarea
                      rows={2}
                      value={article.summaryEn}
                      onChange={(e) => {
                        const updated = [...articles];
                        updated[idx].summaryEn = e.target.value;
                        updateArticles(updated);
                      }}
                      className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Summary (AR)</label>
                    <textarea
                      rows={2}
                      value={article.summaryAr}
                      onChange={(e) => {
                        const updated = [...articles];
                        updated[idx].summaryAr = e.target.value;
                        updateArticles(updated);
                      }}
                      className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] resize-none"
                      dir="rtl"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Body Content (EN)</label>
                    <textarea
                      rows={4}
                      value={article.contentEn}
                      onChange={(e) => {
                        const updated = [...articles];
                        updated[idx].contentEn = e.target.value;
                        updateArticles(updated);
                      }}
                      className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Body Content (AR)</label>
                    <textarea
                      rows={4}
                      value={article.contentAr}
                      onChange={(e) => {
                        const updated = [...articles];
                        updated[idx].contentAr = e.target.value;
                        updateArticles(updated);
                      }}
                      className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                      dir="rtl"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8 text-start">
              <h2 className="text-lg font-bold text-[#F5F5F5] border-b border-[#D4AF37]/20 pb-2 mb-6">
                Client Endorsements & Testimonials
              </h2>

              {testimonials.map((test, idx) => (
                <div key={test.id} className="p-5 bg-[#090909] border border-[#D4AF37]/10 rounded-sm space-y-4">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block">
                    TESTIMONIAL TIER {idx + 1}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Author Name (EN)</label>
                      <input
                        type="text"
                        value={test.authorEn}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[idx].authorEn = e.target.value;
                          updateTestimonials(updated);
                        }}
                        className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Author Name (AR)</label>
                      <input
                        type="text"
                        value={test.authorAr}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[idx].authorAr = e.target.value;
                          updateTestimonials(updated);
                        }}
                        className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Position (EN)</label>
                      <input
                        type="text"
                        value={test.positionEn}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[idx].positionEn = e.target.value;
                          updateTestimonials(updated);
                        }}
                        className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Position (AR)</label>
                      <input
                        type="text"
                        value={test.positionAr}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[idx].positionAr = e.target.value;
                          updateTestimonials(updated);
                        }}
                        className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Quote (EN)</label>
                    <textarea
                      rows={2}
                      value={test.quoteEn}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[idx].quoteEn = e.target.value;
                        updateTestimonials(updated);
                      }}
                      className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-[#9E9E9E]">Quote (AR)</label>
                    <textarea
                      rows={2}
                      value={test.quoteAr}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[idx].quoteAr = e.target.value;
                        updateTestimonials(updated);
                      }}
                      className="bg-[#111111] border border-[#D4AF37]/15 px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37] resize-none"
                      dir="rtl"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
