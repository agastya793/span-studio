'use client';

import React, { useState, useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { PRODUCT_STORY_PILLARS, PRODUCT_COMPARISON_SPECS } from '@/lib/constants';
import { useGSAP } from '@/hooks/useGSAP';
import { DURATION, EASE, DISTANCE, STAGGER } from '@/lib/animations';

export function ProductStory() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'both' | 'ordinary' | 'span'>('both');

  useGSAP(containerRef, (gsap) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.from('.product-header', {
      y: DISTANCE.MD,
      opacity: 0,
      duration: DURATION.NORMAL,
      ease: EASE.SMOOTH,
    })
      .from(
        '.product-panel-left',
        {
          x: -DISTANCE.LG,
          opacity: 0,
          duration: DURATION.NORMAL,
          ease: EASE.SMOOTH,
        },
        '-=0.3'
      )
      .from(
        '.product-panel-right',
        {
          x: DISTANCE.LG,
          opacity: 0,
          duration: DURATION.NORMAL,
          ease: EASE.SMOOTH,
        },
        '<0.1'
      )
      .from(
        '.product-specs',
        {
          y: DISTANCE.SM,
          opacity: 0,
          duration: DURATION.NORMAL,
          ease: EASE.SMOOTH,
        },
        '-=0.2'
      )
      .from(
        '.product-pillar',
        {
          y: DISTANCE.SM,
          opacity: 0,
          duration: DURATION.NORMAL,
          stagger: STAGGER.NORMAL,
          ease: EASE.SMOOTH,
        },
        '-=0.2'
      )
      .from(
        '.product-action',
        {
          opacity: 0,
          duration: DURATION.FAST,
          ease: EASE.SMOOTH,
        },
        '-=0.2'
      );
  });

  return (
    <section
      ref={containerRef}
      id="product"
      aria-label="Product Visual Story"
      className="relative bg-bg-void py-20 lg:py-28 border-b border-border-subtle overflow-hidden scroll-mt-16 lg:scroll-mt-20"
    >
      {/* Background Lighting Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 75% 35%, rgba(182, 6, 61, 0.04) 0%, transparent 70%)',
        }}
      />

      <Container>
        {/* Section Header */}
        <div className="product-header">
          <SectionHeader
            overline="PRODUCT VIDEOS & PHOTOGRAPHY"
            heading="The difference between a product photo and a product statement."
            description="Industrial hardware deserves commercial reverence. When lighting is sculpted, backgrounds are eliminated, and micro-textures are exposed, precision parts turn into undeniable proof of quality."
            note="Concept demonstration & spec benchmark. Realized through controlled studio lighting and dark void staging."
          />
        </div>

        {/* Mobile / Quick Filter Toggle for comparison */}
        <div className="flex sm:hidden justify-center mb-6">
          <div className="inline-flex rounded-lg p-1 bg-bg-elevated border border-border-subtle">
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                activeTab === 'both' ? 'bg-bg-raised text-text-primary' : 'text-text-muted'
              }`}
            >
              Split View
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ordinary')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                activeTab === 'ordinary' ? 'bg-bg-raised text-text-primary' : 'text-text-muted'
              }`}
            >
              Ordinary
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('span')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                activeTab === 'span' ? 'bg-accent-primary text-white' : 'text-text-muted'
              }`}
            >
              SPAN Studio
            </button>
          </div>
        </div>

        {/* Comparison Layout: BEFORE / ORDINARY vs AFTER / SPAN STUDIO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* ── BEFORE / ORDINARY CARD ── */}
          <div
            className={`product-panel-left rounded-2xl border border-border-subtle bg-bg-deep/60 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
              activeTab === 'span' ? 'hidden sm:flex' : 'flex'
            }`}
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4 mb-6">
                <span className="font-mono text-xs font-bold text-metal-mid tracking-wider">
                  BEFORE // ORDINARY
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-metal-dark/30 text-metal-mid border border-metal-dark/40">
                  UNCONTROLLED CAPTURE
                </span>
              </div>

              {/* Visual Concept Simulator: Flat, washed-out specimen */}
              <div className="relative w-full aspect-[16/9] rounded-xl border border-border-subtle bg-[#111419] overflow-hidden flex flex-col items-center justify-center p-6 mb-6">
                {/* Simulated ambient fluorescent wash */}
                <div
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(160, 175, 200, 0.15) 0%, rgba(100, 110, 130, 0.05) 100%)',
                  }}
                />

                {/* Simulated cluttered plant-floor reflections */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #A8B0BE 0, #A8B0BE 1px, transparent 0, transparent 24px)',
                  }}
                />

                {/* Flat Subject Graphic */}
                <div className="relative z-10 w-24 h-24 rounded-lg bg-[#2A313E] border border-metal-dark/60 flex items-center justify-center opacity-80">
                  <div className="w-12 h-12 rounded border border-metal-mid/40 bg-[#1E2535]" />
                </div>

                <div className="relative z-10 mt-3 text-center">
                  <span className="text-[10px] font-mono text-metal-mid uppercase tracking-widest block">
                    FLAT AMBIENT WASH // NO CONTOUR DEFINITION
                  </span>
                </div>
              </div>

              {/* Observed Pitfalls */}
              <h3 className="text-heading-sm font-display text-text-secondary font-semibold mb-3">
                Uncontrolled Factory Snapshot
              </h3>
              <ul className="space-y-2 text-body-sm text-text-muted mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-text-disabled select-none mt-0.5">✕</span>
                  <span>Flat overhead fluorescent lighting flattens physical volume and creates glare</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-text-disabled select-none mt-0.5">✕</span>
                  <span>Cluttered plant-floor background competes with the hardware</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-text-disabled select-none mt-0.5">✕</span>
                  <span>Compressed dynamic range washes out brushed metal finishes</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border-subtle/50 text-caption font-mono text-metal-dark">
              RESULT: LOOKS LIKE AN INTERNAL SPARE PART
            </div>
          </div>

          {/* ── AFTER / SPAN STUDIO CARD ── */}
          <div
            className={`product-panel-right rounded-2xl border border-accent-primary/30 bg-bg-elevated p-6 sm:p-8 flex flex-col justify-between relative shadow-md transition-all duration-300 ${
              activeTab === 'ordinary' ? 'hidden sm:flex' : 'flex'
            }`}
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-border-subtle/50 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-primary" />
                  <span className="font-mono text-xs font-bold text-accent-primary tracking-wider">
                    AFTER // SPAN STUDIO
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-subtle text-accent-primary border border-accent-primary/30">
                  CINEMATIC STUDIO BENCHMARK
                </span>
              </div>

              {/* Visual Concept Simulator: Sculpted, high-contrast, void-isolated specimen */}
              <div className="relative w-full aspect-[16/9] rounded-xl border border-border-default bg-slate-900 overflow-hidden flex flex-col items-center justify-center p-6 mb-6">
                {/* Sculpted directional rim lights */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 70% 60% at 75% 30%, rgba(182, 6, 61, 0.3) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 20% 70%, rgba(200, 205, 214, 0.15) 0%, transparent 55%)',
                  }}
                />

                {/* Pure dark void grid isolation */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #F0F2F5 1px, transparent 1px), linear-gradient(to bottom, #F0F2F5 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Sculpted High-Contrast Subject Graphic */}
                <div className="relative z-10 w-24 h-24 rounded-lg bg-bg-elevated border-2 border-accent-primary shadow-sm flex items-center justify-center">
                  <div className="w-12 h-12 rounded border border-metal-bright bg-bg-raised shadow-inner" />
                  {/* Directional rim edge highlight */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-primary" />
                </div>

                <div className="relative z-10 mt-3 text-center">
                  <span className="text-[10px] font-mono text-accent-primary uppercase tracking-widest block font-semibold">
                    SCULPTED RIM LIGHTING // VOID ISOLATION // MACRO TEXTURE
                  </span>
                </div>
              </div>

              {/* Observed Advantages */}
              <h3 className="text-heading-sm font-display text-text-primary font-semibold mb-3">
                Cinematic Product Authority
              </h3>
              <ul className="space-y-2 text-body-sm text-text-secondary mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary select-none mt-0.5 font-bold">✓</span>
                  <span>Sculpted multi-point key and rim lighting carve physical volume and edge contours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary select-none mt-0.5 font-bold">✓</span>
                  <span>Pure dark void backdrop eliminates background clutter and focuses 100% on the product</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-primary select-none mt-0.5 font-bold">✓</span>
                  <span>High-dynamic-range cinema sensors capture brushed alloys, coatings, and exact tolerances</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border-subtle/50 text-caption font-mono text-accent-primary">
              RESULT: LOOKS LIKE AN INDUSTRY STANDARD READY FOR GLOBAL BUYERS
            </div>
          </div>
        </div>

        {/* Feature Comparison Specification Table / Bar */}
        <div className="product-specs rounded-xl border border-border-default bg-bg-deep/80 overflow-hidden mb-16">
          <div className="px-6 py-4 border-b border-border-subtle bg-bg-elevated flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-text-primary tracking-wider uppercase">
              TECHNICAL SPECIFICATION COMPARISON
            </span>
            <span className="text-caption font-mono text-text-muted">
              STUDIO BENCHMARK CRITERIA
            </span>
          </div>

          <div className="divide-y divide-border-subtle">
            {PRODUCT_COMPARISON_SPECS.map((spec) => (
              <div
                key={spec.feature}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 p-5 text-body-sm hover:bg-bg-elevated/40 transition-colors"
              >
                <div className="md:col-span-3 font-display font-semibold text-text-primary">
                  {spec.feature}
                </div>
                <div className="md:col-span-4 text-text-muted flex items-start gap-2">
                  <span className="text-metal-dark mt-0.5 select-none">•</span>
                  <span>{spec.ordinary}</span>
                </div>
                <div className="md:col-span-5 text-text-secondary font-medium flex items-start gap-2">
                  <span className="text-accent-primary mt-0.5 select-none font-bold">✓</span>
                  <span>{spec.spanStudio}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Three Core Pillars: Precision Lighting, Controlled Environment, Material Detail */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCT_STORY_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="product-pillar rounded-xl border border-border-default bg-bg-elevated/60 p-6 hover:border-border-strong hover:bg-bg-elevated transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-accent-primary block mb-3">
                    PILLAR // {pillar.number}
                  </span>
                  <h4 className="text-heading-sm font-display font-semibold text-text-primary mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-body-sm text-text-secondary leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action */}
        <div className="product-action mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border-subtle">
          <p className="text-caption text-text-muted font-mono">
            SPECIFICATION BENCHMARK PRODUCED INTERNALLY BY SPAN STUDIO
          </p>
          <Button variant="secondary" size="md" href="/services">
            Explore Product Video &amp; Photography →
          </Button>
        </div>
      </Container>
    </section>
  );
}
