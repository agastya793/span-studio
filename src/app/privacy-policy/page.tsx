import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { BUSINESS_INFO } from '@/lib/constants';

import { getCanonicalUrl } from '@/lib/siteConfig';
import { JsonLd, getBreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Website privacy policy and technical data handling information for SPAN Studio in Rudrapur, Uttarakhand.',
  alternates: {
    canonical: getCanonicalUrl('/privacy-policy'),
  },
  openGraph: {
    title: 'Privacy Policy | SPAN Studio',
    description: 'Privacy policy and data handling information for SPAN Studio.',
    url: getCanonicalUrl('/privacy-policy'),
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

export default function PrivacyPolicyPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ]);

  return (
    <div className="pt-28 lg:pt-36 pb-24 bg-bg-base border-b border-border-subtle overflow-hidden">
      <JsonLd data={breadcrumbs} />
      {/* Background Lighting Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 80% 20%, rgba(182, 6, 61, 0.04) 0%, transparent 60%)',
        }}
      />

      <Container className="max-w-4xl">
        {/* Header */}
        <div className="mb-12 border-b border-border-subtle/80 pb-8">
          <span className="text-overline font-mono text-accent-primary block mb-2">
            LEGAL INFORMATION
          </span>
          <h1 className="text-display-sm sm:text-display-md font-display font-bold text-text-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-body-md text-text-secondary leading-relaxed">
            Effective Date: October 1, 2026 · Governing Entity:{' '}
            <LegalPlaceholder /> (trading as &ldquo;SPAN Studio&rdquo;)
          </p>
        </div>

        {/* Notice Card regarding legal entity placeholder */}
        <div className="mb-10 p-5 rounded-xl border border-border-default bg-bg-elevated/70 flex items-start gap-3">
          <span className="text-accent-primary font-mono text-sm mt-0.5 select-none font-bold">
            ℹ
          </span>
          <p className="text-caption font-mono text-text-muted leading-relaxed">
            NOTICE: This website privacy policy is maintained by <LegalPlaceholder />. SPAN Studio
            operates as an independent visual production studio based in Rudrapur, Uttarakhand.
          </p>
        </div>

        {/* Formal Generic Website Privacy Policy Content */}
        <div className="space-y-10 text-body-md text-text-secondary leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              1. Overview &amp; Scope
            </h2>
            <p>
              This Privacy Policy describes how <LegalPlaceholder /> (&ldquo;SPAN Studio&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) handles personal information
              collected through our website and related online communications. By visiting our website
              or providing information through our contact channels, you acknowledge the terms described
              in this policy.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              2. Information We Collect
            </h2>
            <p>
              We collect information that you voluntarily provide to us when inquiring about our
              services, as well as routine technical data generated during website visits:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-body-sm text-text-secondary">
              <li>
                <strong className="text-text-primary font-semibold">Contact &amp; Inquiry Information:</strong>{' '}
                Name, business email address, phone number, company name, selected service interest, and any project notes or scope descriptions you choose to submit.
              </li>
              <li>
                <strong className="text-text-primary font-semibold">Website Technical Data:</strong>{' '}
                Standard connection information, such as IP address, browser type, operating system, referring URL, and pages viewed, collected routinely for site security, administration, and uptime monitoring.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              3. How We Use Information
            </h2>
            <p>We use information collected through this website solely for legitimate business purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-body-sm text-text-secondary">
              <li>To evaluate project inquiries and communicate with prospective clients.</li>
              <li>To provide requested information regarding our capabilities, quotations, or scheduling.</li>
              <li>To maintain, protect, and optimize the performance and security of our website.</li>
              <li>To comply with applicable legal or statutory obligations.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              4. Commercial Confidentiality &amp; Project Discussions
            </h2>
            <p>
              We recognize that prospective project inquiries may involve pre-release products or
              sensitive operational discussions. Information received during project discussions is
              treated with commercial care. Where formal non-disclosure or confidentiality obligations
              are required by either party, they will be defined and governed under mutually agreed,
              project-specific agreements.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              5. Information Sharing &amp; Third Parties
            </h2>
            <p>
              <LegalPlaceholder /> does not sell, rent, or trade personal information to third parties
              for marketing purposes. We may share information only with trusted service providers who
              assist in operating our website or supporting our communications, under appropriate
              confidentiality expectations, or when disclosure is required by applicable law or competent
              legal authority.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              6. Data Security &amp; Retention
            </h2>
            <p>
              We implement reasonable organizational and technical safeguards designed to protect personal
              information against unauthorized access, alteration, or disclosure. We retain inquiry
              information only for as long as necessary to fulfill the purposes outlined in this policy,
              maintain routine business records, or comply with applicable legal requirements.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-heading-sm font-display font-bold text-text-primary">
              7. Contact Information
            </h2>
            <p>
              For questions regarding this website Privacy Policy, please reach out to us at:
            </p>
            <div className="p-5 rounded-radius-sm bg-bg-elevated border border-border-default font-mono text-body-sm space-y-1">
              <div className="text-text-primary font-bold">SPAN Studio</div>
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
