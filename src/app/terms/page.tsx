import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { BUSINESS_INFO } from '@/lib/constants';

import { getCanonicalUrl } from '@/lib/siteConfig';
import { JsonLd, getBreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Website terms and conditions of use, intellectual property ownership, and production standards for SPAN Studio in Rudrapur, Uttarakhand.',
  alternates: {
    canonical: getCanonicalUrl('/terms'),
  },
  openGraph: {
    title: 'Terms & Conditions | SPAN Studio',
    description: 'Terms and conditions of use for SPAN Studio.',
    url: getCanonicalUrl('/terms'),
    type: 'website',
  },
};

function LegalPlaceholder() {
  return (
    <span className="inline-block px-2 py-0.5 rounded bg-accent-subtle text-accent-primary font-mono text-xs border border-accent-primary/40 font-bold tracking-wider select-all">
      [LEGAL_ENTITY_NAME]
    </span>
  );
}

export default function TermsPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Terms', path: '/terms' },
  ]);

  return (
    <div className="pt-28 lg:pt-36 pb-24 bg-bg-base border-b border-border-subtle overflow-hidden">
      <JsonLd data={breadcrumbs} />
      {/* Background Lighting Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 25%, rgba(182, 6, 61, 0.04) 0%, transparent 60%)',
        }}
      />

      <Container className="max-w-4xl">
        {/* Header */}
        <div className="mb-12 border-b border-border-subtle/80 pb-8">
          <span className="text-overline font-mono text-accent-primary block mb-2">
            LEGAL &amp; COMMERCIAL TERMS
          </span>
          <h1 className="text-display-sm sm:text-display-md font-display font-bold text-text-primary mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-body-md text-text-secondary leading-relaxed">
            Effective Date: October 1, 2026 · Governing Entity:{' '}
            <LegalPlaceholder /> (operating as &ldquo;SPAN Studio&rdquo;)
          </p>
        </div>

        {/* Notice Card regarding legal entity placeholder */}
        <div className="mb-10 p-5 rounded-xl border border-border-default bg-bg-elevated/70 flex items-start gap-3">
          <span className="text-accent-primary font-mono text-sm mt-0.5 select-none font-bold">
            ℹ
          </span>
          <p className="text-caption font-mono text-text-muted leading-relaxed">
            NOTICE: These terms are issued by <LegalPlaceholder />. SPAN Studio operates as an
            independent visual cinematography and media studio based in Rudrapur, Uttarakhand.
          </p>
        </div>

        {/* Formal Legal Terms Content */}
        <div className="space-y-10 text-body-md text-text-secondary leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using this website, you agree to comply with and be bound by these Terms
              and Conditions (&ldquo;Terms&rdquo;). This website is provided by <LegalPlaceholder />{' '}
              (&ldquo;SPAN Studio&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
              If you do not agree with any part of these Terms, please do not use this website.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              2. Commercial Engagements &amp; Project Agreements
            </h2>
            <p>
              The content on this website is provided for informational and showcase purposes.
              Engagements for cinematography, product video, photography, 3D animation, or post-production
              services are subject to individual contract negotiations.
            </p>
            <p className="p-4 rounded-radius-sm bg-bg-deep border border-border-subtle text-text-primary font-medium">
              Project-specific deliverables, timelines, revisions, licensing, confidentiality, payment
              terms, and other commercial terms will be defined in the applicable quotation, proposal, or
              Statement of Work.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              3. Website Content &amp; Demonstrations
            </h2>
            <p>
              Visual materials, showreels, concept demonstrations, and technical specifications
              displayed on this website are presented to illustrate creative direction, camera motion,
              lighting styles, and production capabilities. Unless explicitly noted as completed client
              commissions, showcase items are concept treatments produced internally by SPAN Studio to
              demonstrate visual standards.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              4. Intellectual Property
            </h2>
            <p>
              All trademarks, logos, texts, graphics, video clips, animations, and website design
              elements on this site are the property of <LegalPlaceholder /> or their respective
              rights holders. You may not reproduce, copy, distribute, or modify any materials from
              this website without prior written authorization.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, <LegalPlaceholder /> shall not be liable
              for any direct, indirect, incidental, or consequential damages resulting from your access
              to, use of, or inability to use this website or any information contained herein.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              6. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms and any matters arising out of or related to the use of this website shall be
              governed by and construed in accordance with the laws of the Republic of India. The courts
              having jurisdiction over Rudrapur, Uttarakhand, India, shall have exclusive jurisdiction to
              hear any dispute arising hereunder.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              7. Contact Information
            </h2>
            <p>
              For contractual or legal inquiries regarding these Terms, please contact:
            </p>
            <div className="p-5 rounded-radius-sm bg-bg-elevated border border-border-default font-mono text-body-sm space-y-1">
              <div className="text-text-primary font-bold">SPAN Studio — Commercial Contracts</div>
              <div>Entity: <LegalPlaceholder /></div>
              <div>
                Email:{' '}
                <a
                  href={`mailto:${BUSINESS_INFO.contact.email}`}
                  className="text-accent-primary hover:underline"
                >
                  {BUSINESS_INFO.contact.email}
                </a>
              </div>
              <div>
                Phone:{' '}
                <a
                  href={`tel:${BUSINESS_INFO.contact.phoneRaw}`}
                  className="text-text-primary hover:underline"
                >
                  {BUSINESS_INFO.contact.phoneDisplay}
                </a>
              </div>
              <div>Location: {BUSINESS_INFO.contact.address}</div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
