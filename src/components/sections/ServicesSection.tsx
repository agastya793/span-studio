'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { SERVICES, ServiceItem } from '@/lib/constants';
import { useGSAP } from '@/hooks/useGSAP';
import { ServiceVideoStage } from '@/components/ui/ServiceVideoStage';
import { DURATION, EASE } from '@/lib/animations';

export function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeServiceId, setActiveServiceId] = useState<string>(
    SERVICES[0].id
  );
  // Track open state for mobile accordion (first item open by default)
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(
    SERVICES[0].id
  );

  const activeService =
    SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  const toggleMobileAccordion = (id: string) => {
    setOpenMobileAccordion((prev) => (prev === id ? null : id));
  };

  // Phase 7: Entrance animation on scroll
  useGSAP((_, isReducedMotion) => {
    if (isReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
      defaults: { ease: EASE.CINEMATIC },
    });

    tl.fromTo(
      '.services-header',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: DURATION.NORMAL }
    )
      .fromTo(
        '.services-tab',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 },
        '-=0.3'
      )
      .fromTo(
        '.services-stage',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: DURATION.NORMAL },
        '-=0.2'
      );
  }, { scope: containerRef });

  // Phase 7: Active service stage transition on tab switch
  useGSAP((_, isReducedMotion) => {
    if (isReducedMotion) return;
    gsap.fromTo(
      '.services-stage-content',
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    );
  }, { scope: containerRef, dependencies: [activeServiceId] });

  return (
    <section
      ref={containerRef}
      id="services"
      aria-label="Services"
      className="relative bg-bg-deep py-20 lg:py-28 border-b border-border-subtle scroll-mt-16 lg:scroll-mt-20 overflow-hidden"
    >
      <Container>
        {/* Section Header */}
        <div className="services-header">
          <SectionHeader
            overline="WHAT WE DO"
            heading="Five ways we help your business look unmistakable."
            description="From heavy manufacturing facilities to precision commercial products, we produce cinematic media built to impress buyers, partners, and investors."
          />
        </div>

        {/* ── DESKTOP: Horizontal Tab Navigation (hidden on mobile) ── */}
        <div className="hidden lg:block">
          {/* Tab Navigation Strip */}
          <div
            role="tablist"
            aria-label="Services Navigation"
            className="flex items-center gap-2 border-b border-border-default pb-4 mb-8 overflow-x-auto"
          >
            {SERVICES.map((service) => {
              const isActive = service.id === activeServiceId;
              return (
                <button
                  key={service.id}
                  id={`tab-${service.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${service.id}`}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`services-tab group relative px-5 py-3 text-left transition-all rounded-lg flex items-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                    isActive
                      ? 'bg-bg-elevated text-text-primary shadow-sm'
                      : 'text-text-muted hover:text-text-secondary hover:bg-bg-base/60'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold transition-colors ${
                      isActive ? 'text-accent-primary' : 'text-text-muted'
                    }`}
                  >
                    {service.number}
                  </span>
                  <span className="font-body text-sm font-semibold tracking-wide whitespace-nowrap">
                    {service.tabLabel}
                  </span>

                  {/* Active Underline Indicator */}
                  {isActive && (
                    <span className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-accent-primary" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Large Active Service Stage Panel */}
          <div
            id={`panel-${activeService.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeService.id}`}
            className="services-stage rounded-2xl border border-border-default bg-white p-8 xl:p-12 transition-all duration-300 shadow-md"
          >
            <div className="services-stage-content grid grid-cols-12 gap-8 xl:gap-12 items-center">
              {/* Left Media Stage Placeholder (60% width -> 7 cols) */}
              <div className="col-span-12 xl:col-span-7">
                <ServiceVideoStage
                  key={activeService.id}
                  slug={activeService.slug}
                  title={activeService.name}
                  label={activeService.tabLabel}
                  fallback={<ServiceMediaPlaceholder service={activeService} />}
                />
              </div>

              {/* Right Information Area (40% width -> 5 cols) */}
              <div className="col-span-12 xl:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-accent-primary font-mono text-sm font-bold tracking-widest">
                      SERVICE {activeService.number}
                    </span>
                    <Tag variant="concept">FULL PRODUCTION</Tag>
                  </div>

                  <h3 className="text-display-md text-text-primary font-display mb-4">
                    {activeService.name}
                  </h3>

                  <p className="text-body-lg text-text-secondary leading-relaxed mb-6 font-body">
                    {activeService.value}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="mb-8">
                    <span className="text-label text-text-muted block mb-3">
                      KEY DELIVERABLES:
                    </span>
                    <ul className="space-y-2.5">
                      {activeService.deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-body-sm text-metal-bright"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-border-subtle">
                  <Button variant="primary" size="md" href="/contact">
                    Discuss {activeService.name}
                  </Button>
                  <Button variant="secondary" size="md" href="/services">
                    All Services
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE: Accessible Accordion System (hidden on desktop) ── */}
        <div className="block lg:hidden space-y-4">
          {SERVICES.map((service) => {
            const isOpen = openMobileAccordion === service.id;
            return (
              <div
                key={service.id}
                className="rounded-xl border border-border-default bg-bg-elevated overflow-hidden transition-colors"
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  id={`accordion-trigger-${service.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-content-${service.id}`}
                  onClick={() => toggleMobileAccordion(service.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-accent-primary">
                      {service.number}
                    </span>
                    <span className="font-display font-semibold text-text-primary text-base">
                      {service.name}
                    </span>
                  </div>

                  <span
                    className={`text-text-muted transition-transform duration-200 text-lg ${
                      isOpen ? 'rotate-180 text-accent-primary' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Accordion Expandable Panel */}
                {isOpen && (
                  <div
                    id={`accordion-content-${service.id}`}
                    role="region"
                    aria-labelledby={`accordion-trigger-${service.id}`}
                    className="p-5 pt-0 border-t border-border-subtle/60 space-y-5"
                  >
                    {/* Media Placeholder */}
                    <div className="mt-4">
                      <ServiceVideoStage
                        slug={service.slug}
                        title={service.name}
                        label={service.tabLabel}
                        isMobile
                        fallback={<ServiceMediaPlaceholder service={service} isMobile />}
                      />
                    </div>

                    <p className="text-body-md text-text-secondary leading-relaxed">
                      {service.value}
                    </p>

                    <div>
                      <span className="text-label text-text-muted block mb-2">
                        DELIVERABLES:
                      </span>
                      <ul className="space-y-2">
                        {service.deliverables.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-body-sm text-metal-bright"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="primary"
                        size="md"
                        href="/contact"
                        className="w-full"
                      >
                        Start {service.name}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/**
 * High-tech cinematic media placeholder for the active service.
 * Avoids raw stock imagery; uses intentional dark technical staging.
 */
function ServiceMediaPlaceholder({
  service,
  isMobile = false,
}: {
  service: ServiceItem;
  isMobile?: boolean;
}) {
  return (
    <div
      className={`relative w-full rounded-xl border border-border-default bg-bg-deep overflow-hidden flex flex-col justify-between p-6 ${
        isMobile ? 'h-[220px]' : 'h-[360px] xl:h-[420px]'
      }`}
    >
      {/* Background technical gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(182, 6, 61, 0.06) 0%, rgba(33, 192, 99, 0.04) 40%, transparent 80%)',
        }}
      />

      {/* Grid line texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #161717 1px, transparent 1px), linear-gradient(to bottom, #161717 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top HUD info */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-text-muted">
        <span className="flex items-center gap-1.5 font-semibold">
          <span className="w-2 h-2 rounded-full bg-brand-green" />
          SPEC STAGE // {service.number}
        </span>
        <span className="tracking-widest uppercase font-semibold">
          {service.slug.replace('-', ' ')}
        </span>
      </div>

      {/* Center Cinematic Graphic Frame */}
      <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-border-strong bg-white flex items-center justify-center mb-3 shadow-sm">
          <span className="font-mono text-accent-primary font-bold text-xl sm:text-2xl">
            {service.number}
          </span>
        </div>
        <p className="text-heading-sm text-text-primary font-display font-semibold max-w-sm">
          {service.visualAesthetic}
        </p>
      </div>

      {/* Bottom Technical Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-text-muted border-t border-border-default pt-3">
        <span>CINEMATIC SPECIFICATION</span>
        <span>SPAN STUDIO // PRODUCTION GRADE</span>
      </div>
    </div>
  );
}
