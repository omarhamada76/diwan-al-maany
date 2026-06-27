import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import WorkProcess from '@/components/WorkProcess';
import Languages from '@/components/Languages';
import AiTech from '@/components/AiTech';
import Testimonials from '@/components/Testimonials';
import Articles from '@/components/Articles';
import Cta from '@/components/Cta';

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
