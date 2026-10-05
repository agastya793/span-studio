import type { Metadata } from 'next';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { HeroSection } from '@/components/sections/HeroSection';
import { BrandStatement } from '@/components/sections/BrandStatement';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { IndustrialStory } from '@/components/sections/IndustrialStory';
import { ThreeDFeature } from '@/components/sections/ThreeDFeature';
import { ProductStory } from '@/components/sections/ProductStory';
import { WhySpanStudio } from '@/components/sections/WhySpanStudio';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'SPAN Studio | Industrial Videography & Visual Content',
  description:
    'Cinematic factory walkthroughs, commercial product films, precision photography, 3D technical animation, and video editing for manufacturing and commercial businesses.',
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  openGraph: {
    title: 'SPAN Studio | Industrial Videography & Visual Content',
    description:
      'Cinematic factory walkthroughs, commercial product films, precision photography, and photorealistic 3D animation.',
    url: getCanonicalUrl('/'),
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col w-full bg-bg-void">
      {/* 01. Hero Section (id: hero) */}
      <HeroSection />

      {/* 02. Brand Statement Section (id: statement) */}
      <BrandStatement />

      {/* 03. Five-Service Editorial Stage (id: services) */}
      <ServicesSection />

      {/* 04. Visual Capabilities Showcase (id: work) */}
      <CapabilitiesSection />

      {/* 05. Industrial Visual Story (id: industrial-story) */}
      <IndustrialStory />

      {/* 07. 3D Animation Feature (id: 3d) */}
      <ThreeDFeature />

      {/* 08. Product Visual Story (id: product) */}
      <ProductStory />

      {/* 09. Why SPAN Studio (id: why-span) */}
      <WhySpanStudio />

      {/* 10. Production Process (id: process) */}
      <ProcessSection />

      {/* 11. About Section (id: about) */}
      <AboutSection />

      {/* 12. FAQ Section (id: faq) */}
      <FAQSection />

      {/* 13. Final Call to Action (id: contact) */}
      <FinalCTA />
    </div>
  );
}

