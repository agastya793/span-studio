import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContactForm } from '@/components/forms/ContactForm';
import { GeographicDispatchMap } from '@/components/ui/GeographicDispatchMap';
import { BUSINESS_INFO, getWhatsAppUrl, getGoogleMapsUrl } from '@/lib/constants';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { JsonLd, getBreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Contact & Project Inquiries',
  description:
    'Start a visual production inquiry with SPAN Studio. Inquire about industrial cinematography, product photography, or 3D technical animation in Rudrapur, Uttarakhand, Delhi NCR, and across India.',
  alternates: {
    canonical: getCanonicalUrl('/contact'),
  },
  openGraph: {
    title: 'Contact & Project Inquiries | SPAN Studio',
    description:
      'Direct contact channels and project briefing for factory walkthroughs, commercial product films, and 3D animation.',
    url: getCanonicalUrl('/contact'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & Project Inquiries | SPAN Studio',
    description:
      'Direct contact channels and project briefing for industrial visual content.',
  },
};

export default function ContactPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]);

  return (
    <div className="pt-28 lg:pt-36 pb-24 bg-bg-base border-b border-border-subtle overflow-hidden">
      <JsonLd data={breadcrumbs} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 75% 25%, rgba(182, 6, 61, 0.04) 0%, transparent 60%)',
        }}
      />

      <Container>
        {/* Page Header */}
        <div className="mb-14 lg:mb-20">
          <SectionHeader
            as="h1"
            overline="START A PROJECT"
            heading="Let's build something impossible to ignore."
            description="Whether planning an on-site factory shoot, commercial product film, plant photography session, or 3D exploded CAD animation, reach out to discuss your objectives. No obligation."
          />
        </div>

        {/* 2-Column Split: Form (Left) & Direct Channels / Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-border-default bg-bg-elevated p-6 sm:p-10 shadow-xl">
            <div className="border-b border-border-subtle/80 pb-4 mb-8">
              <span className="font-mono text-xs font-bold text-accent-primary uppercase tracking-wider block mb-1">
                PROJECT BRIEFING FORM
              </span>
              <p className="text-body-sm text-text-secondary">
                Please complete the briefing details below. All fields marked with * are required.
              </p>
            </div>

            <ContactForm />
          </div>

          {/* Right Column: Direct Channels, Studio Location & Static Map Placeholder (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Cards */}
            <div className="rounded-2xl border border-border-default bg-bg-elevated p-6 sm:p-8 space-y-6 shadow-md">
              <span className="font-mono text-xs font-bold text-metal-mid uppercase tracking-wider block border-b border-border-subtle/60 pb-3">
                DIRECT STUDIO CHANNELS
              </span>

              {/* Direct Phone */}
              <div className="space-y-1">
                <span className="text-caption font-mono text-text-muted block">Direct Phone</span>
                <a
                  href={`tel:${BUSINESS_INFO.contact.phoneRaw}`}
                  className="text-heading-sm font-mono text-text-primary hover:text-accent-primary transition-colors block"
                >
                  {BUSINESS_INFO.contact.phoneDisplay}
                </a>
                <span className="text-[11px] font-mono text-metal-mid block">
                  Mon – Sat, 9:00 AM – 7:00 PM IST
                </span>
              </div>

              {/* WhatsApp Business */}
              <div className="space-y-1 pt-4 border-t border-border-subtle/40">
                <span className="text-caption font-mono text-text-muted block">
                  WhatsApp Direct Inquiry
                </span>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-md font-semibold text-status-success hover:underline flex items-center gap-2"
                >
                  <span>{BUSINESS_INFO.contact.whatsappDisplay}</span>
                  <span aria-hidden="true">→</span>
                </a>
                <span className="text-[11px] font-mono text-metal-mid block">
                  Fastest response for project scheduling
                </span>
              </div>

              {/* Email */}
              <div className="space-y-1 pt-4 border-t border-border-subtle/40">
                <span className="text-caption font-mono text-text-muted block">Email</span>
                <a
                  href={`mailto:${BUSINESS_INFO.contact.email}`}
                  className="text-body-md font-mono text-text-primary hover:text-accent-primary transition-colors block break-all"
                >
                  {BUSINESS_INFO.contact.email}
                </a>
                <span className="text-[11px] font-mono text-metal-mid block">
                  RFPs, tender documents &amp; project briefs
                </span>
              </div>

              {/* Studio Physical Address */}
              <div className="space-y-1 pt-4 border-t border-border-subtle/40">
                <div className="flex items-center justify-between">
                  <span className="text-caption font-mono text-text-muted block">Studio Headquarters</span>
                  <a
                    href={getGoogleMapsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-accent-primary hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    <span>View on Map</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <p className="text-body-sm text-text-secondary leading-relaxed font-body">
                  {BUSINESS_INFO.contact.address}
                </p>
                <span className="text-[11px] font-mono text-metal-mid block pt-1">
                  SIDCUL Manufacturing Corridor, Rudrapur, Uttarakhand
                </span>
              </div>
            </div>

            {/* Multi-Location Geographic Dispatch Map */}
            <GeographicDispatchMap />
          </div>
        </div>
      </Container>
    </div>
  );
}
