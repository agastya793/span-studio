'use client';

import React, { useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { INDUSTRIAL_STORY_STAGES, IndustrialStoryStage } from '@/lib/constants';
import { useGSAP } from '@/hooks/useGSAP';

export function IndustrialStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Phase 7: Cinematic Horizontal Pin-Scroll (Desktop >= 1280px only)
  useGSAP((gsap) => {
    if (typeof window === 'undefined') return;

    // Use gsap.matchMedia to ensure pin-scroll ONLY runs on desktop (>= 1280px), excluding tablet (1024px)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1280px)', () => {
      if (!trackRef.current || !sectionRef.current) return;

      const track = trackRef.current;
      const getScrollDistance = () => track.scrollWidth - track.clientWidth;

      gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: () => `+=${getScrollDistance() + 200}`,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="industrial-story"
      aria-label="Industrial Visual Story"
      className="relative bg-bg-void py-16 xl:py-0 xl:h-screen xl:flex xl:flex-col xl:justify-center border-b border-border-subtle overflow-hidden scroll-mt-16 xl:scroll-mt-0"
    >
      {/* ── DESKTOP VIEW: Horizontal Pin-Scroll (>= 1280px) ── */}
      <div className="hidden xl:flex flex-col justify-center h-full w-full max-w-[1440px] mx-auto px-8 xl:px-16 py-8">
        {/* Top Bar with Header & Scope */}
        <div className="flex items-end justify-between mb-8 shrink-0">
          <div>
            <span className="text-overline block mb-2 font-semibold tracking-[0.14em] text-accent-primary">
              FOR FACTORIES &amp; INDUSTRIAL BUSINESSES
            </span>
            <h2 className="text-display-md text-text-primary tracking-tight font-display">
              Your facility has a story.{' '}
              <span className="text-text-secondary">
                Most companies never tell it.
              </span>
            </h2>
          </div>
          <div className="text-right">
            <span className="text-caption font-mono text-metal-mid block">
              CINEMATIC 4-STAGE DOCUMENTARY PIPELINE
            </span>
            <span className="text-[11px] font-mono text-text-muted">
              SCROLL DOWN TO PROGRESS HORIZONTALLY →
            </span>
          </div>
        </div>

        {/* Horizontal Track Viewport */}
        <div className="overflow-hidden w-full relative pb-4">
          <div
            ref={trackRef}
            className="flex items-stretch gap-8 w-max will-change-transform"
          >
            {/* Stage Cards */}
            {INDUSTRIAL_STORY_STAGES.map((stage) => (
              <div
                key={stage.stageNumber}
                className="w-[380px] xl:w-[420px] shrink-0"
              >
                <StoryStageCard stage={stage} isDesktopPin />
              </div>
            ))}

            {/* Ending Destination Card with CTA Button */}
            <div className="w-[360px] xl:w-[400px] shrink-0 rounded-xl border border-accent-primary/30 bg-bg-elevated p-8 flex flex-col justify-between shadow-md">
              <div>
                <span className="font-mono text-xs font-bold text-accent-primary block mb-2">
                  FULL PRODUCTION SCOPE
                </span>
                <h4 className="text-heading-sm font-display font-bold text-text-primary mb-3">
                  Ready to document your plant?
                </h4>
                <p className="text-body-sm text-text-secondary leading-relaxed">
                  Turn your factory floor into your most compelling business asset with cinematic motion and technical documentation.
                </p>
              </div>

              <div className="pt-6 border-t border-border-subtle/60">
                <Button variant="primary" size="md" href="/services" className="w-full">
                  Explore Industrial Videos →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE & TABLET VIEW: Standard Vertical Stacking (< 1280px) ── */}
      <div className="block xl:hidden">
        <Container>
          {/* Section Header */}
          <SectionHeader
            overline="FOR FACTORIES & INDUSTRIAL BUSINESSES"
            heading={
              <>
                Your facility has a story.{' '}
                <span className="text-text-secondary block sm:inline">
                  Most companies never tell it.
                </span>
              </>
            }
            description="Understanding the manufacturing environment, precision documentation, and cinematic storytelling tailored for investors, B2B buyers, and procurement teams."
          />

          {/* Cinematic Wide-Crop Visual Placeholder */}
          <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl border border-border-default bg-slate-900 overflow-hidden mb-10 flex flex-col justify-between p-6">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 60% 40%, rgba(182, 6, 61, 0.2) 0%, rgba(22, 23, 23, 0.8) 50%, #161717 100%)',
              }}
            />
            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-primary" />
                FACTORY INTERIOR // CINEMATIC STILL
              </span>
              <span className="tracking-widest uppercase">
                SPEC BENCHMARK
              </span>
            </div>
            <div className="relative z-10 my-auto text-center max-w-xl mx-auto">
              <h3 className="text-display-sm text-text-primary font-display mb-2">
                Scale. Precision. Operation.
              </h3>
              <p className="text-body-sm text-text-muted">
                Controlled industrial lighting revealing the reality of production.
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-text-muted border-t border-border-subtle/50 pt-2">
              <span>SPAN STUDIO EDITORIAL</span>
              <span>RUDRAPUR</span>
            </div>
          </div>

          {/* 4-Stage Visual Story Sequence (Vertical grid on Mobile, 2-col on Tablet) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {INDUSTRIAL_STORY_STAGES.map((stage) => (
              <StoryStageCard key={stage.stageNumber} stage={stage} />
            ))}
          </div>

          {/* Approved Blueprint Link: [Explore Industrial Videos →] */}
          <div className="pt-2 flex justify-start">
            <Button variant="secondary" size="md" href="/services">
              Explore Industrial Videos →
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}

/**
 * Single card representing one stage of the 4-part industrial visual story.
 */
function StoryStageCard({
  stage,
  isDesktopPin = false,
}: {
  stage: IndustrialStoryStage;
  isDesktopPin?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-border-default bg-bg-elevated p-6 sm:p-7 flex flex-col justify-between h-full transition-all duration-300 hover:border-border-strong hover:bg-bg-raised/40 ${
        isDesktopPin ? 'min-h-[280px] shadow-lg' : 'min-h-[220px]'
      }`}
    >
      <div>
        {/* Stage Number */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs font-bold text-accent-primary">
            STAGE {stage.stageNumber}
          </span>
          <span className="text-[10px] font-mono text-metal-mid uppercase tracking-wider">
            {stage.aspectHint}
          </span>
        </div>

        {/* Stage Title */}
        <h4 className="text-heading-sm text-text-primary font-display font-semibold mb-2">
          {stage.title}
        </h4>

        {/* Headline Description */}
        <p className="text-body-sm text-text-secondary leading-relaxed font-medium">
          &ldquo;{stage.description}&rdquo;
        </p>
      </div>

      {/* Subtitle / Narrative detail if present */}
      {stage.subtitle && (
        <p className="text-caption text-text-muted border-t border-border-subtle/60 pt-3 mt-4">
          {stage.subtitle}
        </p>
      )}
    </div>
  );
}
