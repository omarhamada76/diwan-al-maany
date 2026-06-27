'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, CheckCircle } from 'lucide-react';

interface CtaProps {
  locale: string;
}

export default function Cta({ locale }: CtaProps) {
  const t = useTranslations('Contact');
  const tCommon = useTranslations('Common');

  // Contact Form Fields State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('certified-translation');
  const [message, setMessage] = useState('');

  // Statuses
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const servicesKeys = [
    'certified-translation',
    'court-support',
    'corporate-services',
    'contract-translation',
    'embassy-translation',
    'document-review',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError(locale === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة.' : 'Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, service, message }),
      });

      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        throw new Error('API submission failed');
      }
    } catch (err) {
      setError(t('form.error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-[#111111] relative z-10 border-t border-[#D4AF37]/10">
      
      {/* Background Glows */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-[#D4AF37]/3 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-[#D4AF37]/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Premium Contact Details */}
          <div className="lg:col-span-5 flex flex-col items-start text-start">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#D4AF37] uppercase mb-3">
              {t('title')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F5F5] mb-8 leading-tight">
              {t('subtitle')}
            </h2>

            {/* Core Channels list */}
            <div className="w-full space-y-6 mb-12">
              <a
                href={`tel:${t('info.phone')}`}
                className="flex items-center gap-4 p-4 border border-[#D4AF37]/10 bg-[#171717]/40 rounded-sm hover:border-[#D4AF37]/30 transition-all duration-300 w-full"
              >
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center bg-[#090909]">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#9E9E9E] uppercase tracking-wider">
                    {locale === 'ar' ? 'الهاتف المباشر' : 'Secure Hotline'}
                  </span>
                  <span className="text-sm font-bold text-[#F5F5F5]" dir="ltr">
                    {t('info.phone')}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${t('info.email')}`}
                className="flex items-center gap-4 p-4 border border-[#D4AF37]/10 bg-[#171717]/40 rounded-sm hover:border-[#D4AF37]/30 transition-all duration-300 w-full"
              >
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center bg-[#090909]">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#9E9E9E] uppercase tracking-wider">
                    {locale === 'ar' ? 'البريد الإلكتروني' : 'Official Inquiry'}
                  </span>
                  <span className="text-sm font-bold text-[#F5F5F5]">
                    {t('info.email')}
                  </span>
                </div>
              </a>

              {/* WhatsApp direct button */}
              <a
                href="https://wa.me/20227680000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 border border-green-500/10 bg-[#171717]/40 rounded-sm hover:border-green-500/40 transition-all duration-300 w-full cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full border border-green-500/20 flex items-center justify-center bg-green-500/10">
                  <MessageSquare className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#9E9E9E] uppercase tracking-wider">
                    {tCommon('whatsapp')}
                  </span>
                  <span className="text-sm font-bold text-[#F5F5F5]">
                    {locale === 'ar' ? 'محادثة فورية مع مستشارنا' : 'Chat with Legal Coordinator'}
                  </span>
                </div>
              </a>
            </div>

            {/* HQ Branch Addresses Details */}
            <div className="flex items-start gap-3 text-xs text-[#9E9E9E] leading-relaxed">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <div>
                <span className="text-[#F5F5F5] font-bold block mb-1">
                  {t('info.addressTitle')}
                </span>
                <p>{t('info.address')}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Secure Submission Form */}
          <div className="lg:col-span-7 w-full bg-[#171717] border border-[#D4AF37]/15 p-8 sm:p-10 rounded-sm shadow-2xl relative overflow-hidden">
            
            {/* Header security seal indicator */}
            <div className="flex items-center gap-2 border-b border-[#D4AF37]/15 pb-4 mb-6">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-[10px] text-[#9E9E9E] font-semibold uppercase tracking-widest">
                {locale === 'ar' ? 'بوابة تسليم المستندات المشفرة' : 'Encrypted Document Intake portal'}
              </span>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12 gap-4"
              >
                <CheckCircle className="w-16 h-16 text-[#D4AF37] animate-[pulse_2s_infinite]" />
                <h3 className="text-lg font-bold text-[#F5F5F5]">
                  {locale === 'ar' ? 'تم استلام طلبكم بنجاح' : 'Submission Completed'}
                </h3>
                <p className="text-xs text-[#9E9E9E] max-w-sm leading-relaxed">
                  {t('form.success')}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div className="flex flex-col items-start gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#9E9E9E]">
                    {t('form.name')} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#090909] border border-[#D4AF37]/15 hover:border-[#D4AF37]/35 focus:border-[#D4AF37] focus:outline-none px-4 py-3 rounded-sm text-sm text-[#F5F5F5] transition-all"
                  />
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col items-start gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#9E9E9E]">
                      {t('form.email')} <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#090909] border border-[#D4AF37]/15 hover:border-[#D4AF37]/35 focus:border-[#D4AF37] focus:outline-none px-4 py-3 rounded-sm text-sm text-[#F5F5F5] transition-all"
                    />
                  </div>

                  <div className="flex flex-col items-start gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#9E9E9E]">
                      {t('form.phone')}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#090909] border border-[#D4AF37]/15 hover:border-[#D4AF37]/35 focus:border-[#D4AF37] focus:outline-none px-4 py-3 rounded-sm text-sm text-[#F5F5F5] transition-all"
                      placeholder="+20 100 000 0000"
                    />
                  </div>
                </div>

                {/* Service Selection Dropdown */}
                <div className="flex flex-col items-start gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#9E9E9E]">
                    {t('form.service')}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#090909] border border-[#D4AF37]/15 hover:border-[#D4AF37]/35 focus:border-[#D4AF37] focus:outline-none px-4 py-3 rounded-sm text-sm text-[#9E9E9E] transition-all cursor-pointer"
                  >
                    {servicesKeys.map((key) => (
                      <option key={key} value={key} className="bg-[#171717] text-[#F5F5F5]">
                        {locale === 'ar' ? key : key.replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col items-start gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#9E9E9E]">
                    {t('form.message')} <span className="text-[#D4AF37]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#090909] border border-[#D4AF37]/15 hover:border-[#D4AF37]/35 focus:border-[#D4AF37] focus:outline-none px-4 py-3 rounded-sm text-sm text-[#F5F5F5] transition-all resize-none"
                  />
                </div>

                {/* Submit Feedback */}
                {error && <p className="text-xs text-red-500 text-start">{error}</p>}

                {/* Action button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E6C567] text-[#090909] text-xs font-bold uppercase tracking-wider rounded-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-60 disabled:shadow-none transition-all duration-300 cursor-pointer"
                >
                  {submitting ? (
                    <span>{t('form.submitting')}</span>
                  ) : (
                    <>
                      <span>{t('form.submit')}</span>
                      <Send className="w-4 h-4 rtl:-rotate-90" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
