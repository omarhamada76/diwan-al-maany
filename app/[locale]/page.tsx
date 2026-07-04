import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import dynamic from 'next/dynamic';

const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'));
const WorkProcess = dynamic(() => import('@/components/WorkProcess'));
const Languages = dynamic(() => import('@/components/Languages'));
const AiTech = dynamic(() => import('@/components/AiTech'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const Articles = dynamic(() => import('@/components/Articles'));
const Cta = dynamic(() => import('@/components/Cta'));

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomeLocalePage({ params }: PageProps) {
  const { locale } = await params;
  
  // Set the locale context on server side
  setRequestLocale(locale);

  return (
    <>
      {/* Cinematic interactive hero entrance */}
      <Hero />
      
      {/* Storytelling & timelines */}
      <About />
      
      {/* Expanding service modules */}
      <Services locale={locale} />
      
      {/* Staggered numeric statistics */}
      <WhyChooseUs />
      
      {/* Vertical scroll-revealed process workflow */}
      <WorkProcess />
      
      {/* Holographic world map connections */}
      <Languages />
      
      {/* AI tech & dashboard simulation */}
      <AiTech />
      
      {/* Premium testimonial endorsements */}
      <Testimonials locale={locale} />
      
      {/* Editorial articles knowledge center */}
      <Articles locale={locale} />
      
      {/* Client intake contact channels */}
      <Cta locale={locale} />
    </>
  );
}
