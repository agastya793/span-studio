import type { Metadata } from 'next';
import { WorkShowcase } from '@/components/sections/WorkShowcase';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { JsonLd, getBreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Work & Visual Standards',
  description:
    'Visual capability demonstrations, concept treatments, and studio spec reels by SPAN Studio for industrial and commercial product cinematography.',
  alternates: {
    canonical: getCanonicalUrl('/work'),
  },
  openGraph: {
    title: 'Work & Visual Standards | SPAN Studio',
    description:
      'Internal capability demonstrations illustrating camera motion, cinematic lighting, and CAD fidelity across manufacturing environments.',
    url: getCanonicalUrl('/work'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work & Visual Standards | SPAN Studio',
    description:
      'Internal capability demonstrations illustrating camera motion, cinematic lighting, and CAD fidelity.',
  },
};

export default function WorkPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <WorkShowcase />
    </>
  );
}
