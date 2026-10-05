'use client';

import React, { useState, useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { THREE_D_CAPABILITIES, ThreeDCapability } from '@/lib/constants';
import { FeatureScene } from '@/components/three/FeatureScene';
import { useGSAP } from '@/hooks/useGSAP';
import { DURATION, EASE, DISTANCE, STAGGER } from '@/lib/animations';

export function ThreeDFeature() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCapabilityId, setActiveCapabilityId] = useState<string>(
    THREE_D_CAPABILITIES[0].id
  );

  useGSAP(containerRef, (gsap) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from('.threed-header', {
      y: DISTANCE.MD,
      opacity: 0,
      duration: DURATION.NORMAL,
      ease: EASE.SMOOTH,
    })
      .from(
        '.threed-canvas-viewport',
        {
          opacity: 0,
          scale: 0.98,
          duration: DURATION.NORMAL,
          ease: EASE.SMOOTH,
        },
        '-=0.3'
      )
      .from(
        '.threed-panel',
        {
          y: DISTANCE.SM,
          opacity: 0,
          duration: DURATION.NORMAL,
          stagger: STAGGER.NORMAL,
          ease: EASE.SMOOTH,
        },
        '-=0.3'
      );
  });

  const activeCapability =
    THREE_D_CAPABILITIES.find((c) => c.id === activeCapabilityId) ||
    THREE_D_CAPABILITIES[0];

  return (
    <section
      ref={containerRef}
      id="3d"
      aria-label="3D Animation Feature"
      className="relative bg-bg-base py-20 lg:py-28 border-b border-border-subtle overflow-hidden scroll-mt-16 lg:scroll-mt-20"
    >
      {/* Background Lighting Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 25% 45%, rgba(182, 6, 61, 0.05) 0%, transparent 60%)',
        }}
      />

      <Container>
        {/* Section Header */}
        <div className="threed-header">
          <SectionHeader
            overline="3D ANIMATION"
            heading="When a camera isn't enough."
            description="Photorealistic exploded CAD views, automated manufacturing sequences, and pre-construction visualization that reveal what physical cameras physically cannot reach."
          />
        </div>

        {/* 50/50 Layout: Desktop side-by-side, Mobile viewport on top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive 3D Feature Canvas Viewport (Order 1 on mobile, 50% on lg) */}
          <div className="lg:col-span-6 order-1 threed-canvas-viewport">
            <Feature3DViewport activeItem={activeCapability} />
          </div>

          {/* Right Column: Three Capability Panels (Order 2 on mobile, 50% on lg) */}
          <div className="lg:col-span-6 order-2 space-y-4">
            {THREE_D_CAPABILITIES.map((capability) => {
              const isActive = capability.id === activeCapabilityId;
              return (
                <div
                  key={capability.id}
                  onClick={() => setActiveCapabilityId(capability.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveCapabilityId(capability.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  className={`threed-panel cursor-pointer rounded-xl border p-6 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                    isActive
                      ? 'bg-bg-elevated border-border-accent shadow-md'
                      : 'bg-bg-deep/70 border-border-default hover:border-border-strong hover:bg-bg-elevated/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className={`font-mono text-xs font-bold tracking-wider ${
                        isActive ? 'text-accent-primary' : 'text-text-muted'
                      }`}
                    >
                      CAPABILITY // {capability.number}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive ? 'bg-accent-primary' : 'bg-metal-dark'
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="text-heading-sm font-display font-semibold text-text-primary mb-1">
                    {capability.title}
                  </h3>

                  <p className="text-body-md text-text-secondary font-medium mb-3">
                    &ldquo;{capability.tagline}&rdquo;
                  </p>

                  <p className="text-body-sm text-text-muted leading-relaxed">
                    {capability.description}
                  </p>

                  {/* Technical Bullet Highlights */}
                  <div className="mt-4 pt-3 border-t border-border-subtle/60 flex flex-wrap gap-2">
                    {capability.technicalPoints.map((point) => (
                      <span
                        key={point}
                        className="inline-flex items-center text-[11px] font-mono px-2 py-0.5 rounded bg-bg-void/60 text-metal-mid border border-border-subtle"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent-primary/60 mr-1.5" />
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Bottom Link to Services */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-caption text-text-muted font-mono">
                CAD SUPPORT: STEP · IGES · SOLIDWORKS · OBJ
              </span>
              <Button variant="ghost" size="sm" href="/services">
                Explore 3D Services →
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * 3D Animation Feature Viewport integrating the live FeatureScene (Phase 6).
 * Maintains HUD telemetry, responsive aspect ratio, and frameloop="demand".
 */
function Feature3DViewport({ activeItem }: { activeItem: ThreeDCapability }) {
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-2xl border border-border-default bg-slate-900 overflow-hidden flex flex-col justify-between shadow-2xl">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(182, 6, 61, 0.15) 0%, rgba(22, 23, 23, 0.7) 45%, #161717 95%)',
        }}
      />

      {/* Viewport Top Telemetry Header */}
      <div className="relative z-20 flex items-center justify-between text-[11px] font-mono text-metal-mid border-b border-border-subtle/50 px-5 sm:px-7 py-3 bg-bg-void/40 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary" />
          </span>
          <span className="text-text-secondary font-semibold">3D VIEWPORT // INTERACTIVE PBR</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-text-muted">
          <span>MODE: DEMAND</span>
          <span className="text-accent-primary">ACTIVE</span>
        </div>
      </div>

      {/* The Actual Interactive 3D Feature Scene */}
      <div className="relative z-10 flex-1 w-full h-full min-h-[220px]">
        <FeatureScene activeCapabilityId={activeItem.id} />
      </div>

      {/* Viewport Bottom Status Bar */}
      <div className="relative z-20 flex items-center justify-between text-[10px] font-mono text-text-muted border-t border-border-subtle/50 px-5 sm:px-7 py-3 bg-bg-void/40 backdrop-blur-xs">
        <span className="truncate text-accent-primary">FOCUS: {activeItem.title}</span>
        <span className="text-metal-mid font-semibold tracking-wider">SPAN STUDIO 3D</span>
      </div>
    </div>
  );
}
