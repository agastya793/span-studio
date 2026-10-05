import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { BUSINESS_INFO, SERVICES } from '@/lib/constants';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { JsonLd, getBreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'About the Studio',
  description:
    'About SPAN Studio: Founded by Mr. Ankit, based in Rudrapur, Uttarakhand with a dedicated 10-person production team specialized in industrial cinematography and commercial product films.',
  alternates: {
    canonical: getCanonicalUrl('/about'),
  },
  openGraph: {
    title: 'About the Studio | SPAN Studio',
    description:
      'Independent visual cinematography studio based in Rudrapur, Uttarakhand with a dedicated 10-person team specialized in manufacturing and commercial product content.',
    url: getCanonicalUrl('/about'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About the Studio | SPAN Studio',
    description:
      'Independent visual cinematography studio based in Rudrapur, Uttarakhand.',
  },
};

export default function AboutPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]);

  return (
    <div className="pt-28 lg:pt-36 pb-24 bg-bg-base border-b border-border-subtle overflow-hidden">
      <JsonLd data={breadcrumbs} />

      {/* Background Lighting Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(182, 6, 61, 0.04) 0%, transparent 60%)',
        }}
      />

      <Container>
        {/* Page Header */}
        <div className="mb-16 lg:mb-20">
          <SectionHeader
            as="h1"
            overline="ABOUT SPAN STUDIO"
            heading="Built on engineering respect. Directed for cinematic impact."
            description="We are an independent visual content and cinematography studio based in the industrial manufacturing corridor of Uttarakhand, built to document factories, hardware, and commercial products with technical focus."
          />
        </div>

        {/* ── Studio Narrative & Strategic Positioning ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
          {/* Left Column: Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-body-lg text-text-secondary leading-relaxed">
            <h2 className="text-display-xs sm:text-heading-lg font-display font-bold text-text-primary">
              Industrial hardware deserves dedicated visual production.
            </h2>

            <p>
              Manufacturing facilities and engineering plants require specialized visual handling.
              When enterprise buyers, partners, or procurement executives evaluate a supplier, visual
              presentation communicates scale, discipline, and production quality.
            </p>

            <p>
              <strong className="text-text-primary font-semibold">SPAN Studio</strong> was established
              to provide focused visual production for industrial manufacturing and commercial products.
              We combine plant-floor awareness with controlled studio lighting, high-definition camera capture,
              and 3D technical animation.
            </p>

            <p>
              Operating from <strong className="text-text-primary font-semibold">{BUSINESS_INFO.contact.city}, {BUSINESS_INFO.contact.state}</strong>,
              we work with manufacturing facilities and commercial enterprises across Uttarakhand, the Delhi NCR region,
              and industrial hubs nationwide.
            </p>
          </div>

          {/* Right Column: Studio Profile & Founder Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-border-default bg-bg-elevated p-8 relative overflow-hidden shadow-xl">
            {/* Top Header with SPAN Logo */}
            <div className="flex items-center justify-between border-b border-border-subtle/60 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/span-logo-clean.png"
                  alt="SPAN Studio Official Logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
                <span className="font-mono text-xs font-bold text-accent-primary tracking-wider uppercase">
                  STUDIO IDENTITY
                </span>
              </div>
              <span className="text-[11px] font-mono text-metal-mid uppercase">
                OVERVIEW
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-caption font-mono text-text-muted uppercase block">FOUNDER</span>
                <h3 className="text-heading-md font-display font-bold text-text-primary">
                  {BUSINESS_INFO.founder}
                </h3>
              </div>

              <div>
                <span className="text-caption font-mono text-text-muted uppercase block">TEAM SIZE</span>
                <p className="text-body-md text-text-primary font-medium">
                  10 people
                </p>
              </div>

              <div>
                <span className="text-caption font-mono text-text-muted uppercase block">LOCATION</span>
                <p className="text-body-md text-text-primary font-medium">
                  {BUSINESS_INFO.contact.city}, {BUSINESS_INFO.contact.state}
                </p>
                <p className="text-caption text-text-muted mt-0.5">
                  {BUSINESS_INFO.contact.address}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border-subtle/60 flex items-center justify-between">
              <span className="text-[11px] font-mono text-metal-mid">
                RUDRAPUR, UTTARAKHAND
              </span>
              <Button variant="ghost" size="sm" href="/contact">
                Contact Studio →
              </Button>
            </div>
          </div>
        </div>

        {/* ── Studio Information Fact Bar ── */}
        <div className="rounded-2xl border border-border-default bg-bg-elevated p-8 sm:p-10 mb-20 shadow-md">
          <div className="mb-6 flex items-center justify-between border-b border-border-subtle/60 pb-4">
            <span className="font-mono text-xs font-semibold text-metal-mid uppercase tracking-wider">
              STUDIO FACTS &amp; OPERATIONAL BASE
            </span>
            <span className="text-[10px] font-mono text-accent-primary uppercase tracking-widest">
              CONFIRMED DETAILS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="border-l-2 border-accent-primary pl-5">
              <span className="font-display font-extrabold text-text-primary text-display-xs block mb-1">
                10 People
              </span>
              <span className="text-body-sm font-semibold text-text-primary block">
                Production Team
              </span>
              <p className="text-caption text-text-muted mt-1 leading-relaxed">
                Dedicated team handling on-site filming, photography, 3D, and post-production.
              </p>
            </div>

            <div className="border-l-2 border-accent-primary pl-5">
              <span className="font-display font-extrabold text-text-primary text-display-xs block mb-1">
                Rudrapur
              </span>
              <span className="text-body-sm font-semibold text-text-primary block">
                Studio Base
              </span>
              <p className="text-caption text-text-muted mt-1 leading-relaxed">
                Located in the Rudrapur manufacturing corridor in Uttarakhand, working with clients across India.
              </p>
            </div>

            <div className="border-l-2 border-accent-primary pl-5">
              <span className="font-display font-extrabold text-text-primary text-display-xs block mb-1">
                Video · Photo · 3D
              </span>
              <span className="text-body-sm font-semibold text-text-primary block">
                Core Capabilities
              </span>
              <p className="text-caption text-text-muted mt-1 leading-relaxed">
                Integrated visual disciplines focused on industrial operations and commercial products.
              </p>
            </div>
          </div>
        </div>

        {/* ── Production Capabilities Overview ── */}
        <div className="mb-20">
          <div className="max-w-2xl mb-10">
            <span className="text-overline font-mono text-accent-primary block mb-2">
              SERVICES &amp; DISCIPLINES
            </span>
            <h2 className="text-display-xs sm:text-heading-lg font-display font-bold text-text-primary">
              Core production services.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="p-6 sm:p-8 rounded-xl border border-border-default bg-bg-elevated flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-accent-primary block mb-3">
                    {'//'} {service.number}
                  </span>
                  <h3 className="text-heading-sm font-display font-bold text-text-primary mb-2">
                    {service.name}
                  </h3>
                  <p className="text-body-sm text-text-secondary leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                </div>
                <div className="pt-4 border-t border-border-subtle/50">
                  <span className="text-[11px] font-mono text-metal-mid block">
                    {service.deliverables.slice(0, 2).join(' · ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Conversion Section ── */}
        <div className="p-8 sm:p-12 rounded-2xl border border-border-default bg-bg-elevated text-center max-w-4xl mx-auto shadow-xl">
          <span className="text-overline font-mono text-accent-primary block mb-3">
            START A CONVERSATION
          </span>
          <h2 className="text-display-sm sm:text-display-md font-display font-bold text-text-primary mb-4">
            Let&apos;s discuss how to present your business.
          </h2>
          <p className="text-body-md text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
            Reach out to discuss your project requirements with our team in Rudrapur.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact">
              Start Project Inquiry
            </Button>
            <Button variant="secondary" size="lg" href="/services">
              Explore Services →
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
