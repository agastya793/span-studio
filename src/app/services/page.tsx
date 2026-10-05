import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { SERVICES, getWhatsAppUrl } from '@/lib/constants';
import { getCanonicalUrl } from '@/lib/siteConfig';
import { JsonLd, getBreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Production Services',
  description:
    'Visual production services by SPAN Studio: Factory and industrial videos, commercial product cinematography, high-definition photography, 3D technical CAD animation, and cinema video editing.',
  alternates: {
    canonical: getCanonicalUrl('/services'),
  },
  openGraph: {
    title: 'Production Services | SPAN Studio',
    description:
      'Five core visual production disciplines tailored for manufacturing facilities, industrial hardware, and commercial product brands.',
    url: getCanonicalUrl('/services'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Production Services | SPAN Studio',
    description:
      'Five core visual production disciplines tailored for manufacturing facilities and commercial products.',
  },
};

export default function ServicesPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
  ]);

  return (
    <div className="pt-28 lg:pt-36 pb-24 bg-bg-base border-b border-border-subtle overflow-hidden">
      <JsonLd data={breadcrumbs} />

      {/* Background Lighting Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 75% 20%, rgba(182, 6, 61, 0.04) 0%, transparent 60%)',
        }}
      />

      <Container>
        {/* Page Header */}
        <div className="mb-16 lg:mb-24">
          <SectionHeader
            as="h1"
            overline="SERVICES &amp; DISCIPLINES"
            heading="Engineered for technical precision. Directed for cinematic impact."
            description="Our core production disciplines are structured to give manufacturing facilities, hardware businesses, and commercial product brands focused visual coverage."
          />
        </div>

        {/* Five Full Service Modules */}
        <div className="space-y-16 lg:space-y-24 mb-20">
          {SERVICES.map((service, index) => {
            const isEven = index % 2 === 1;

            return (
              <article
                key={service.id}
                id={service.slug}
                aria-label={service.name}
                className="scroll-mt-24 rounded-2xl border border-border-default bg-bg-elevated p-8 sm:p-10 lg:p-12 relative overflow-hidden transition-all duration-300 hover:border-accent-primary/40 hover:shadow-lg"
              >
                {/* Background Ambient Glow */}
                <div
                  className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none opacity-10"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(182, 6, 61, 0.2) 0%, transparent 70%)',
                  }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column (7 cols): Identity, Value & Description */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-xs font-bold text-accent-primary px-3 py-1 rounded bg-accent-subtle border border-accent-primary/30">
                        DISCIPLINE // {service.number}
                      </span>
                      <span className="text-caption font-mono text-text-muted uppercase">
                        {service.tabLabel}
                      </span>
                    </div>

                    <h2 className="text-display-sm sm:text-display-md font-display font-bold text-text-primary tracking-tight mb-4">
                      {service.name}
                    </h2>

                    <p className="text-body-lg text-text-primary font-medium leading-relaxed mb-4">
                      &ldquo;{service.value}&rdquo;
                    </p>

                    <p className="text-body-md text-text-secondary leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>

                    {/* Aesthetic / Direction Note */}
                    <div className="p-4 rounded-radius-sm bg-bg-deep/80 border border-border-subtle/80 mb-8">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-metal-mid block mb-1">
                        VISUAL DIRECTION:
                      </span>
                      <p className="text-caption text-text-muted font-mono">
                        {service.visualAesthetic}
                      </p>
                    </div>

                    {/* Action Group */}
                    <div className="flex flex-wrap items-center gap-4">
                      <Button
                        variant="primary"
                        size="md"
                        href={`/contact?service=${encodeURIComponent(service.name)}`}
                      >
                        Inquire About {service.name}
                      </Button>
                      <Button
                        variant="whatsapp"
                        size="md"
                        href={getWhatsAppUrl(`Hi SPAN Studio, I would like to discuss your ${service.name} service.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Talk on WhatsApp
                      </Button>
                    </div>
                  </div>

                  {/* Right Column (5 cols): Scope Deliverables */}
                  <div
                    className={`lg:col-span-5 rounded-xl border border-border-subtle bg-bg-deep/90 p-6 sm:p-8 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="border-b border-border-subtle/60 pb-4 mb-6 flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-metal-mid uppercase tracking-wider">
                        TYPICAL DELIVERABLES
                      </span>
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                        SERVICE SCOPE
                      </span>
                    </div>

                    <ul className="space-y-4 list-none p-0 m-0">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-body-sm text-text-primary">
                          <span className="text-accent-primary font-bold mt-0.5 select-none shrink-0">
                            ✓
                          </span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="p-8 sm:p-12 rounded-2xl border border-border-default bg-bg-elevated text-center max-w-4xl mx-auto shadow-xl">
          <span className="text-overline font-mono text-accent-primary block mb-3">
            HAVE A PROJECT IN MIND?
          </span>
          <h2 className="text-display-sm sm:text-display-md font-display font-bold text-text-primary mb-4">
            Discuss your production requirements.
          </h2>
          <p className="text-body-md text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
            Reach out to our team in Rudrapur to discuss on-site factory shoots, product photography,
            or 3D technical animation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact">
              Start Project Conversation
            </Button>
            <Button variant="secondary" size="lg" href="/work">
              View Capability Demos →
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
