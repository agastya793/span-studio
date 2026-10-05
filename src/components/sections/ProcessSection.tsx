'use client';

import React, { useState, useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PROCESS_STEPS } from '@/lib/constants';
import { useGSAP } from '@/hooks/useGSAP';
import { DURATION, EASE, DISTANCE } from '@/lib/animations';

export function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [openMobileSteps, setOpenMobileSteps] = useState<Record<string, boolean>>({
    '01': true,
  });

  useGSAP(containerRef, (gsap) => {
    const mm = gsap.matchMedia();

    // Desktop (>= 1024px): Progressive line draw + staggered step nodes
    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      tl.from('.process-header', {
        y: DISTANCE.MD,
        opacity: 0,
        duration: DURATION.NORMAL,
        ease: EASE.SMOOTH,
      })
        .from(
          '.process-timeline-line',
          {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: DURATION.DELIBERATE,
            ease: EASE.SMOOTH,
          },
          '-=0.2'
        )
        .from(
          '.process-node',
          {
            scale: 0.8,
            opacity: 0,
            duration: DURATION.FAST,
            stagger: 0.08,
            ease: EASE.BACK,
          },
          '-=0.4'
        )
        .from(
          '.process-active-panel',
          {
            y: DISTANCE.SM,
            opacity: 0,
            duration: DURATION.NORMAL,
            ease: EASE.SMOOTH,
          },
          '-=0.2'
        );
    });

    // Mobile / Tablet (< 1024px): Subtle vertical stagger, no line draw
    mm.add('(max-width: 1023px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.from('.process-header', {
        y: DISTANCE.MD,
        opacity: 0,
        duration: DURATION.NORMAL,
        ease: EASE.SMOOTH,
      }).from(
        '.process-mobile-item',
        {
          y: DISTANCE.SM,
          opacity: 0,
          duration: DURATION.NORMAL,
          stagger: 0.08,
          ease: EASE.SMOOTH,
        },
        '-=0.2'
      );
    });
  });

  const activeStep = PROCESS_STEPS[activeStepIndex] || PROCESS_STEPS[0];

  const toggleMobileStep = (stepNumber: string) => {
    setOpenMobileSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  return (
    <section
      ref={containerRef}
      id="process"
      aria-label="Production Process"
      className="relative bg-bg-void py-20 lg:py-28 border-b border-border-subtle overflow-hidden scroll-mt-16 lg:scroll-mt-20"
    >
      {/* Background Lighting Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(182, 6, 61, 0.04) 0%, transparent 65%)',
        }}
      />

      <Container>
        {/* Section Header */}
        <div className="process-header">
          <SectionHeader
            overline="PRODUCTION PROCESS"
            heading="From first conversation to final master."
            description="A disciplined, five-stage framework structured to ensure zero factory disruption, complete creative alignment, and cinema-grade delivery."
          />
        </div>

        {/* ── DESKTOP: Horizontal Timeline (>= 1024px) ── */}
        <div className="hidden lg:block mb-12">
          {/* Horizontal Track Bar */}
          <div className="relative mb-10">
            {/* Base connecting line */}
            <div className="process-timeline-line absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-border-default z-0" />
            {/* Active highlight line up to the active step */}
            <div
              className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-accent-primary transition-all duration-500 z-0"
              style={{
                width: `${(activeStepIndex / (PROCESS_STEPS.length - 1)) * 100}%`,
              }}
            />

            {/* 5 Step Indicator Nodes */}
            <div className="relative z-10 grid grid-cols-5 gap-4">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isPast = idx < activeStepIndex;

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    onMouseEnter={() => setActiveStepIndex(idx)}
                    aria-selected={isActive}
                    role="tab"
                    id={`process-tab-${step.number}`}
                    aria-controls={`process-panel-${step.number}`}
                    className="process-node flex flex-col items-center text-center group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-xl py-2"
                  >
                    {/* Circle Node */}
                    <div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 mb-3 ${
                        isActive
                          ? 'border-accent-primary bg-bg-elevated text-accent-primary shadow-md scale-110'
                          : isPast
                          ? 'border-accent-primary/60 bg-bg-deep text-text-primary'
                          : 'border-border-default bg-bg-deep text-text-muted group-hover:border-border-strong group-hover:text-text-secondary'
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Step Title & Subtitle */}
                    <span
                      className={`font-display text-sm font-bold tracking-wider transition-colors uppercase ${
                        isActive ? 'text-accent-primary' : 'text-text-secondary group-hover:text-text-primary'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-[11px] font-mono text-text-muted mt-0.5">
                      {step.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Detailed Content Panel */}
          <div
            id={`process-panel-${activeStep.number}`}
            role="tabpanel"
            aria-labelledby={`process-tab-${activeStep.number}`}
            className="process-active-panel rounded-2xl border border-border-default bg-bg-elevated p-8 lg:p-10 shadow-lg transition-all duration-300 relative overflow-hidden"
          >
            {/* Subtle glow in card background */}
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full pointer-events-none opacity-10"
              style={{
                background: 'radial-gradient(circle, rgba(182, 6, 61, 0.2) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 grid grid-cols-12 gap-8 items-center">
              {/* Left Column: Number & Narrative */}
              <div className="col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs font-bold text-accent-primary px-2.5 py-1 rounded bg-accent-subtle border border-accent-primary/30">
                    STAGE {activeStep.number} OF 05
                  </span>
                  <span className="text-caption font-mono text-text-muted uppercase">
                    {activeStep.shortLabel}
                  </span>
                </div>

                <h3 className="text-display-sm font-display font-bold text-text-primary mb-4">
                  {activeStep.title}
                </h3>

                <p className="text-body-lg text-text-secondary leading-relaxed max-w-xl">
                  {activeStep.description}
                </p>
              </div>

              {/* Right Column: Key Deliverables & Protocol */}
              <div className="col-span-5 rounded-xl border border-border-subtle bg-bg-deep/80 p-6">
                <span className="font-mono text-xs font-semibold text-metal-mid uppercase tracking-wider block mb-4">
                  STAGE DELIVERABLES &amp; CONTROLS
                </span>
                <ul className="space-y-3 list-none p-0 m-0">
                  {activeStep.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-body-sm text-text-primary">
                      <span className="text-accent-primary font-bold mt-0.5 select-none">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE & TABLET: Vertical Accordion (< 1024px) ── */}
        <div className="block lg:hidden space-y-4">
          {PROCESS_STEPS.map((step) => {
            const isOpen = !!openMobileSteps[step.number];

            return (
              <div
                key={step.number}
                className="process-mobile-item rounded-xl border border-border-default bg-bg-elevated overflow-hidden transition-all duration-200"
              >
                {/* Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleMobileStep(step.number)}
                  aria-expanded={isOpen}
                  aria-controls={`mobile-process-content-${step.number}`}
                  id={`mobile-process-trigger-${step.number}`}
                  className="w-full p-5 flex items-center justify-between text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-primary hover:bg-bg-raised/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-xs font-bold w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                        isOpen
                          ? 'border-accent-primary text-accent-primary bg-accent-subtle'
                          : 'border-border-default text-text-muted bg-bg-deep'
                      }`}
                    >
                      {step.number}
                    </span>
                    <div>
                      <span className="font-display font-bold text-text-primary block text-body-md uppercase">
                        {step.title}
                      </span>
                      <span className="text-[11px] font-mono text-text-muted">
                        {step.shortLabel}
                      </span>
                    </div>
                  </div>

                  {/* + / − Indicator */}
                  <span
                    className={`font-mono text-lg font-bold transition-transform duration-200 ${
                      isOpen ? 'text-accent-primary rotate-180' : 'text-text-muted'
                    }`}
                    aria-hidden="true"
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div
                    id={`mobile-process-content-${step.number}`}
                    role="region"
                    aria-labelledby={`mobile-process-trigger-${step.number}`}
                    className="px-5 pb-6 pt-2 border-t border-border-subtle/50 text-body-sm space-y-4"
                  >
                    <p className="text-text-secondary leading-relaxed">
                      {step.description}
                    </p>

                    <div className="rounded-lg bg-bg-deep p-4 border border-border-subtle">
                      <span className="font-mono text-[10px] text-metal-mid uppercase tracking-widest block mb-2 font-semibold">
                        STAGE DELIVERABLES:
                      </span>
                      <ul className="space-y-1.5 list-none p-0 m-0">
                        {step.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-caption text-text-primary">
                            <span className="text-accent-primary font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
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
