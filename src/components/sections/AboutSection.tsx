'use client';

import React, { useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { BUSINESS_INFO, ABOUT_FACTS } from '@/lib/constants';
import { useGSAP } from '@/hooks/useGSAP';
import { DURATION, EASE, DISTANCE } from '@/lib/animations';

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(containerRef, (gsap) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.from('.about-image', {
      x: -DISTANCE.LG,
      opacity: 0,
      duration: DURATION.DELIBERATE,
      ease: EASE.SMOOTH,
    }).from(
      '.about-content',
      {
        x: DISTANCE.LG,
        opacity: 0,
        duration: DURATION.DELIBERATE,
        ease: EASE.SMOOTH,
      },
      '<0.15'
    );
  });

  return (
    <section
      ref={containerRef}
      id="about"
      aria-label="About SPAN Studio"
      className="relative bg-bg-base py-20 lg:py-28 border-b border-border-subtle overflow-hidden scroll-mt-16 lg:scroll-mt-20"
    >
      {/* Subtle Background Lighting Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 50%, rgba(182, 6, 61, 0.04) 0%, transparent 60%)',
        }}
      />

      <Container>
        {/* Split Grid: Left Image Placeholder, Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Studio & Team Visual Placeholder (5 cols) */}
          <div className="about-image lg:col-span-5 order-2 lg:order-1">
            <StudioVisualPlaceholder />
          </div>

          {/* Right Column: Narrative Content & Confirmed Fact Bar (7 cols) */}
          <div className="about-content lg:col-span-7 order-1 lg:order-2">
            <SectionHeader
              overline="ABOUT SPAN STUDIO"
              heading="Built on experience. Creating a new visual chapter."
              className="!mb-6"
            />

            {/* Grounded narrative strictly adhering to confirmed facts */}
            <div className="space-y-4 text-body-md text-text-secondary leading-relaxed mb-8">
              <p>
                Founded by <strong className="text-text-primary font-semibold">{BUSINESS_INFO.founder}</strong>,{' '}
                {BUSINESS_INFO.brandName} is an independent visual content and cinematography studio based in{' '}
                <strong className="text-text-primary font-semibold">
                  {BUSINESS_INFO.contact.city}, {BUSINESS_INFO.contact.state}
                </strong>.
              </p>
              <p>
                We bring together a focused team of{' '}
                <strong className="text-text-primary font-semibold">
                  {BUSINESS_INFO.teamCount} professionals
                </strong>{' '}
                specializing in industrial plant cinematography, commercial product films, plant photography,
                and photorealistic 3D technical animation.
              </p>
              <p>
                Operating directly from the regional manufacturing corridor, we work with industrial plants,
                engineering enterprises, and commercial businesses across India to present their operations
                with cinematic authority.
              </p>
            </div>

            {/* Confirmed Fact Bar: 10 Professionals, Rudrapur Uttarakhand, Video · Photography · 3D */}
            <div className="rounded-xl border border-border-default bg-bg-elevated p-6 mb-8 shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-widest text-metal-mid block mb-4">
                CONFIRMED STUDIO METRICS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {ABOUT_FACTS.map((fact) => (
                  <div key={fact.label} className="border-l-2 border-accent-primary pl-4">
                    <span className="font-display font-bold text-text-primary text-heading-sm block">
                      {fact.value}
                    </span>
                    <span className="text-caption text-text-muted font-mono block mt-1">
                      {fact.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Conversion Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="md" href="/contact">
                Start a Conversation
              </Button>
              <Button variant="secondary" size="md" href="/#work">
                View Visual Standard →
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * High-craft intentional dark placeholder representing the studio and technical production crew.
 * Adheres strictly to the dark, industrial, cinematic design system.
 */
function StudioVisualPlaceholder() {
  return (
    <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-2xl border border-border-default bg-slate-900 overflow-hidden flex flex-col justify-between p-6 shadow-xl">
      {/* Background Lighting & Camera Reticle Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 40% 40%, rgba(182, 6, 61, 0.2) 0%, rgba(22, 23, 23, 0.7) 50%, #161717 95%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F0F2F5 1px, transparent 1px), linear-gradient(to bottom, #F0F2F5 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top Status Header */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-300 border-b border-border-subtle/50 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-primary" />
          <span className="text-white font-semibold">STUDIO PROFILE</span>
        </div>
        <span className="text-slate-400 uppercase">RUDRAPUR // IN</span>
      </div>

      {/* Center Cinematic Graphic / Cinema Camera Glyph */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center p-4">
        {/* Cinema Camera & Studio Rig Silhouette */}
        <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-dashed border-slate-700 animate-[spin_30s_linear_infinite]" />
          <div className="w-20 h-20 rounded-full bg-slate-800 border border-accent-primary/40 flex items-center justify-center shadow-md">
            <svg
              className="w-10 h-10 text-accent-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {/* Cinema Camera Icon */}
              <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
              <rect x="2" y="6" width="14" height="12" rx="2" />
              <circle cx="8" cy="12" r="2" />
            </svg>
          </div>
        </div>

        <span className="font-mono text-[10px] uppercase tracking-widest text-accent-primary bg-accent-subtle px-2.5 py-1 rounded border border-accent-primary/20 mb-2">
          10-MEMBER PRODUCTION UNIT
        </span>
        <h4 className="text-heading-sm font-display font-semibold text-text-primary">
          SPAN Studio Production Team
        </h4>
        <p className="text-caption text-text-muted mt-1 max-w-xs">
          Industrial Cinematography · Commercial Photography · 3D Technical Animation
        </p>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-text-muted border-t border-border-subtle/50 pt-3">
        <span>HEADQUARTERS // SIDCUL REGION</span>
        <span className="text-metal-mid font-semibold">EST. RUDRAPUR</span>
      </div>
    </div>
  );
}
