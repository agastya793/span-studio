'use client';

import React, { useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { WHY_SPAN_PILLARS } from '@/lib/constants';
import { useGSAP } from '@/hooks/useGSAP';
import { DURATION, EASE, DISTANCE, STAGGER } from '@/lib/animations';

export function WhySpanStudio() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(containerRef, (gsap) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from('.why-header', {
      y: DISTANCE.MD,
      opacity: 0,
      duration: DURATION.NORMAL,
      ease: EASE.SMOOTH,
    }).from(
      '.why-card',
      {
        y: DISTANCE.SM,
        opacity: 0,
        duration: DURATION.NORMAL,
        stagger: STAGGER.CARD_60MS, // 60ms stagger as required
        ease: EASE.SMOOTH,
      },
      '-=0.3'
    );
  });

  return (
    <section
      ref={containerRef}
      id="why-span"
      aria-label="Why SPAN Studio"
      className="relative bg-bg-base py-20 lg:py-28 border-b border-border-subtle overflow-hidden scroll-mt-16 lg:scroll-mt-20"
    >
      {/* Background Lighting Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(182, 6, 61, 0.04) 0%, transparent 70%)',
        }}
      />

      <Container>
        {/* Section Header */}
        <div className="why-header">
          <SectionHeader
            overline="WHY SPAN STUDIO"
            heading="Built for technical precision. Focused on industrial impact."
            description="We combine plant-floor operational fluency with commercial filmmaking standards to help manufacturing and engineering businesses present their facilities, processes, and products with cinematic authority."
          />
        </div>

        {/* 4 Positioning Pillars: Desktop 4-col, Tablet 2x2, Mobile 1-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_SPAN_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="why-card group relative rounded-xl border border-border-default bg-bg-elevated p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-accent-primary/40 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                {/* Pillar Header with Monospace Index */}
                <div className="flex items-center justify-between border-b border-border-subtle/60 pb-3 mb-5">
                  <span className="font-mono text-sm font-bold text-accent-primary">
                    {pillar.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                    {pillar.subtitle}
                  </span>
                </div>

                {/* Pillar Title */}
                <h3 className="text-heading-sm font-display font-bold text-text-primary tracking-wide mb-3 group-hover:text-text-primary transition-colors">
                  {pillar.title}
                </h3>

                {/* Grounded Positioning Copy */}
                <p className="text-body-sm text-text-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom decorative accent line on hover */}
              <div className="pt-6 mt-6 border-t border-border-subtle/40 flex items-center justify-between">
                <span className="text-[11px] font-mono text-metal-mid tracking-wider uppercase">
                  POSITIONING PILLAR
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-metal-dark group-hover:bg-accent-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
