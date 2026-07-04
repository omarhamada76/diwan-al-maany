'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldAlert, Check } from 'lucide-react';
import { Link } from '@/lib/navigation';

interface CtaProps {
  locale: string;
}

export default function Cta({ locale }: CtaProps) {
  const t = useTranslations('Contact');
  const tCommon = useTranslations('Common');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('certified-translation');
  const [message, setMessage] = useState('');

  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const servicesKeys = [
    'certified-translation', 'court-support', 'corporate-services',
    'contract-translation', 'embassy-translation', 'document-review',
  ];

  const isEmailValid = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isNameValid = (val: string) => val.trim().length > 1;
  const isMessageValid = (val: string) => val.trim().length > 9;

  const getNameState = () => { if (!touched.name) return 'neutral'; return isNameValid(name) ? 'valid' : 'error'; };
  const getEmailState = () => { if (!touched.email) return 'neutral'; return isEmailValid(email) ? 'valid' : 'error'; };
  const getMessageState = () => { if (!touched.message) return 'neutral'; return isMessageValid(message) ? 'valid' : 'error'; };

  const getInputStyles = (state: 'neutral' | 'valid' | 'error') => {
    switch (state) {
      case 'error': return { borderColor: '#902E2B', boxShadow: '0 0 15px rgba(144, 46, 43, 0.08)', background: 'rgba(144, 46, 43, 0.02)' };
      case 'valid': return { borderColor: '#C5A880', boxShadow: '0 0 10px rgba(197, 168, 128, 0.05)', background: 'transparent' };
      default: return { borderColor: 'rgba(122, 107, 85, 0.15)', boxShadow: 'none', background: 'transparent' };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isNameValid(name) || !isEmailValid(email) || !isMessageValid(message)) {
      setApiError(locale === 'ar' ? 'يرجى تصحيح الأخطاء في النموذج.' : 'Please correct the errors in the form.');
      return;
    }
    setSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, service, message }),
      });
      if (res.ok) {
        setSuccess(true);
        setName(''); setEmail(''); setPhone(''); setMessage('');
      } else { throw new Error('API submission failed'); }
    } catch (err) { setApiError(t('form.error')); }
    finally { setSubmitting(false); }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-[#050506] relative z-10 overflow-hidden">

      {/* ── UPGRADE: Glow divider at top ── */}
      <div className="section-divider-glow absolute top-0 left-0 right-0" />

      {/* ── UPGRADE: Cinematic light cone from top-center ── */}
      <div className="light-cone z-0" />

      {/* ── UPGRADE: 3 Ambient orbs ── */}
      <div
        className="ambient-orb w-[500px] h-[500px] z-0"
        style={{ background: '#7C3AED', top: '-5%', right: '-10%', animationDelay: '-7s' }}
      />
      <div
        className="ambient-orb-reverse w-[400px] h-[400px] z-0"
        style={{ background: '#C5A880', bottom: '-10%', left: '-8%', opacity: 0.06, animationDelay: '-14s' }}
      />
      <div
        className="ambient-orb-sm w-[300px] h-[300px] z-0"
        style={{ background: '#1D4ED8', top: '40%', right: '15%', animationDelay: '-4s' }}
      />

      {/* Papyrus static grain */}
      <div className="absolute inset-0 bg-grain opacity-[0.02] mix-blend-overlay pointer-events-none z-0" />

      <div className="max-w-[1440px] mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Premium Secure Communication Channels */}
          <div className="lg:col-span-5 flex flex-col items-start text-start">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-sans font-semibold tracking-[0.25em] text-[#C5A880] uppercase mb-4"
            >
              {t('title')}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl text-[#E8E4DC] tracking-tight leading-tight mb-8"
            >
              {t('subtitle')}
            </motion.h2>

            {/* Communication Channels */}
            <div className="w-full space-y-6 mb-12">
              <motion.a
                initial={{ opacity: 0, x: -20, clipPath: 'inset(0 0 100% 0)' }}
                whileInView={{ opacity: 1, x: 0, clipPath: 'inset(0 0 0% 0)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                href={`tel:${t('info.phone')}`}
                className="flex items-center gap-4 p-4 border border-[#7A6B55]/15 bg-[#0F0F11]/90 rounded-[10px] hover:border-[#C5A880]/40 transition-all duration-300 w-full group"
              >
                <div className="w-10 h-10 rounded-full border border-[#7A6B55]/30 flex items-center justify-center bg-[#050506] group-hover:border-[#C5A880]/50 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#9A9590] uppercase tracking-wider font-semibold">
                    {locale === 'ar' ? 'الهاتف المباشر' : 'Secure Hotline'}
                  </span>
                  <span className="text-xs md:text-sm font-serif font-bold text-[#E8E4DC]" dir="ltr">
                    {t('info.phone')}
                  </span>
                </div>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, x: -20, clipPath: 'inset(0 0 100% 0)' }}
                whileInView={{ opacity: 1, x: 0, clipPath: 'inset(0 0 0% 0)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                href={`mailto:${t('info.email')}`}
                className="flex items-center gap-4 p-4 border border-[#7A6B55]/15 bg-[#0F0F11]/90 rounded-[10px] hover:border-[#C5A880]/40 transition-all duration-300 w-full group"
              >
                <div className="w-10 h-10 rounded-full border border-[#7A6B55]/30 flex items-center justify-center bg-[#050506] group-hover:border-[#C5A880]/50 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-[#C5A880]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#9A9590] uppercase tracking-wider font-semibold">
                    {locale === 'ar' ? 'البريد الإلكتروني' : 'Official Inquiry'}
                  </span>
                  <span className="text-xs md:text-sm font-serif font-bold text-[#E8E4DC]">
                    {t('info.email')}
                  </span>
                </div>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, x: -20, clipPath: 'inset(0 0 100% 0)' }}
                whileInView={{ opacity: 1, x: 0, clipPath: 'inset(0 0 0% 0)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                href="https://wa.me/20227680000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 border border-green-500/10 bg-[#0F0F11]/90 rounded-[10px] hover:border-green-500/40 transition-all duration-300 w-full group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full border border-green-500/20 flex items-center justify-center bg-green-500/10">
                  <MessageSquare className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#9A9590] uppercase tracking-wider font-semibold">
                    {tCommon('whatsapp')}
                  </span>
                  <span className="text-xs md:text-sm font-serif font-bold text-[#E8E4DC]">
                    {locale === 'ar' ? 'محادثة فورية مع مستشارنا' : 'Chat with Legal Coordinator'}
                  </span>
                </div>
              </motion.a>
            </div>

            {/* HQ Branch Info */}
            <div className="flex items-start gap-4 text-xs text-[#9A9590] leading-relaxed">
              <MapPin className="w-5 h-5 text-[#C5A880] shrink-0" />
              <div>
                <span className="text-[#E8E4DC] font-serif font-bold block mb-1">
                  {t('info.addressTitle')}
                </span>
                <p>{t('info.address')}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Encrypted Document Intake Portal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 w-full bg-[#0F0F11] border border-[#C5A880]/12 p-8 sm:p-10 rounded-[16px] shadow-[0_0_80px_rgba(197,168,128,0.04)] relative overflow-hidden"
          >
            {/* Scanline overlay inside form card */}
            <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-30 z-0" />
            {/* Top inner glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/25 to-transparent" />
            
            <div className="flex items-center gap-3 border-b border-[#7A6B55]/15 pb-4 mb-6 select-none relative z-10">
              <ShieldAlert className="w-4 h-4 text-[#C5A880] opacity-80" />
              <span className="text-[9px] text-[#9A9590] font-sans font-semibold uppercase tracking-widest">
                {locale === 'ar' ? 'بوابة تسليم المستندات المشفرة' : 'Encrypted Document Intake portal'}
              </span>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16 gap-6 relative z-10"
              >
                <div className="w-14 h-14 rounded-full border-2 border-[#C5A880] flex items-center justify-center bg-[#C5A880]/10 shadow-[0_0_20px_rgba(197,168,128,0.3)]">
                  <Check className="w-6 h-6 text-[#C5A880]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#E8E4DC]">
                  {locale === 'ar' ? 'تم استلام طلبكم بنجاح' : 'Submission Authenticated'}
                </h3>
                <p className="text-xs text-[#9A9590] max-w-sm leading-relaxed">
                  {t('form.success')}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 noValidate relative z-10">
                
                {/* Name Input */}
                <div className="flex flex-col gap-2 relative">
                  <label className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#9A9590] flex items-center justify-between">
                    <span>{t('form.name')} <span className="text-[#C5A880]">*</span></span>
                    {getNameState() === 'valid' && <Check className="w-3.5 h-3.5 text-[#C5A880]" />}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                    onChange={(e) => setName(e.target.value)}
                    style={getInputStyles(getNameState())}
                    className="w-full bg-[#050506] border px-4 py-3 rounded-[6px] text-xs md:text-sm text-[#E8E4DC] focus:outline-none transition-all duration-300"
                  />
                  <AnimatePresence>
                    {getNameState() === 'error' && (
                      <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="text-[10px] text-[#902E2B] text-start font-mono block mt-1">
                        {locale === 'ar' ? 'يرجى إدخال اسم صحيح' : 'Please enter a valid name'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#9A9590] flex items-center justify-between">
                      <span>{t('form.email')} <span className="text-[#C5A880]">*</span></span>
                      {getEmailState() === 'valid' && <Check className="w-3.5 h-3.5 text-[#C5A880]" />}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                      onChange={(e) => setEmail(e.target.value)}
                      style={getInputStyles(getEmailState())}
                      className="w-full bg-[#050506] border px-4 py-3 rounded-[6px] text-xs md:text-sm text-[#E8E4DC] focus:outline-none transition-all duration-300"
                    />
                    <AnimatePresence>
                      {getEmailState() === 'error' && (
                        <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="text-[10px] text-[#902E2B] text-start font-mono block mt-1">
                          {locale === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address'}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#9A9590]">
                      {t('form.phone')}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={getInputStyles('neutral')}
                      className="w-full bg-[#050506] border px-4 py-3 rounded-[6px] text-xs md:text-sm text-[#E8E4DC] focus:outline-none transition-all duration-300"
                      placeholder="+20 100 000 0000"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#9A9590]">
                    {t('form.service')}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    style={getInputStyles('neutral')}
                    className="w-full bg-[#050506] border px-4 py-3 rounded-[6px] text-xs md:text-sm text-[#9A9590] focus:outline-none transition-all duration-300 cursor-pointer"
                  >
                    {servicesKeys.map((key) => (
                      <option key={key} value={key} className="bg-[#0F0F11] text-[#E8E4DC]">
                        {locale === 'ar' ? key : key.replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#9A9590] flex items-center justify-between">
                    <span>{t('form.message')} <span className="text-[#C5A880]">*</span></span>
                    {getMessageState() === 'valid' && <Check className="w-3.5 h-3.5 text-[#C5A880]" />}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onBlur={() => setTouched(prev => ({ ...prev, message: true }))}
                    onChange={(e) => setMessage(e.target.value)}
                    style={getInputStyles(getMessageState())}
                    className="w-full bg-[#050506] border px-4 py-3 rounded-[6px] text-xs md:text-sm text-[#E8E4DC] focus:outline-none transition-all duration-300 resize-none"
                  />
                  <AnimatePresence>
                    {getMessageState() === 'error' && (
                      <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="text-[10px] text-[#902E2B] text-start font-mono block mt-1">
                        {locale === 'ar' ? 'يرجى كتابة ١٠ أحرف على الأقل' : 'Please enter at least 10 characters'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {apiError && <p className="text-xs text-[#902E2B] text-start font-mono select-none">{apiError}</p>}

                {/* ── UPGRADE: Submit button with shimmer hover effect ── */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full relative flex items-center justify-center gap-2 py-4 border border-[#C5A880]/80 text-[#C5A880] hover:bg-[#C5A880]/8 text-xs font-semibold uppercase tracking-widest rounded-full overflow-hidden hover:shadow-[0_4px_30px_rgba(197,168,128,0.15)] disabled:opacity-60 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                >
                  {/* Shimmer sweep on hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#C5A880]/10 to-transparent pointer-events-none" />
                  {submitting ? (
                    <span>{t('form.submitting')}</span>
                  ) : (
                    <>
                      <span>{t('form.submit')}</span>
                      <Send className="w-3.5 h-3.5 rtl:-rotate-90" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
