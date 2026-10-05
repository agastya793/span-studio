'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/Button';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { BUSINESS_INFO, getWhatsAppUrl } from '@/lib/constants';
import { useGSAP } from '@/hooks/useGSAP';
import { DURATION, EASE } from '@/lib/animations';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Hero Entrance Animation Sequence
  useGSAP((_, isReducedMotion) => {
    if (isReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: EASE.SMOOTH } });

    tl.fromTo(
      '.hero-overline',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4 }
    )
      .fromTo(
        '.hero-heading',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      )
      .fromTo(
        '.hero-copy',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.25'
      )
      .fromTo(
        '.hero-cta',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.25'
      )
      .fromTo(
        '.hero-proof',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.2'
      )
      .fromTo(
        '.hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        '-=0.1'
      );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Hero"
      className="relative bg-white pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 border-b border-border-default overflow-x-clip"
    >
      {/* Subtle brand ambiance glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 12%, rgba(182, 6, 61, 0.04) 0%, rgba(33, 192, 99, 0.02) 40%, transparent 75%)',
        }}
      />

      {/* Subtle corporate technical grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #161717 1px, transparent 1px), linear-gradient(to bottom, #161717 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Main Container: Full hero composition */}
      <div className="relative z-10 w-full max-w-[1440px] xl:max-w-[1536px] mx-auto px-5 sm:px-8 lg:px-16">
        <div className="w-full max-w-[1360px]">
          {/* Overline with SPAN live indicator badge */}
          <div className="mb-5 sm:mb-6 hero-overline">
            <div className="inline-flex max-w-full flex-wrap items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-bg-deep border border-border-default shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-text-primary">
                INDUSTRIAL &amp; TECHNOLOGY VISUAL PRODUCTION
              </span>
              <span className="hidden sm:inline text-border-strong">|</span>
              <span className="hidden sm:inline text-[11px] font-mono text-text-muted">PAN-INDIA DISPATCH</span>
            </div>
          </div>

          {/* Headline with accessible, unclipped typography */}
          <h1
            className="hero-heading text-display-hero text-text-primary tracking-tight uppercase mb-6 sm:mb-8 font-display font-extrabold leading-[1.02] break-words"
            aria-label="MAKE YOUR WORK IMPOSSIBLE TO IGNORE."
          >
            <span className="block">
              <span className="hero-word inline-block mr-[0.22em]">MAKE</span>
              <span className="hero-word inline-block mr-[0.22em]">YOUR</span>
              <span className="hero-word inline-block">WORK</span>
            </span>
            <span className="block mt-1 sm:mt-2">
              <span className="hero-word inline-block text-accent-primary">IMPOSSIBLE</span>
            </span>
            <span className="block mt-1 sm:mt-2">
              <span className="hero-word inline-block mr-[0.22em]">TO</span>
              <span className="hero-word inline-block">IGNORE.</span>
            </span>
          </h1>

          {/* Supporting Business-Oriented Copy */}
          <p className="text-body-lg text-text-secondary leading-relaxed max-w-[760px] mb-8 sm:mb-10 hero-copy">
            High-impact industrial cinematography, commercial product films, and precision 3D CAD animation.
            We turn complex manufacturing scale, machinery, and engineering capabilities into visually compelling business assets for global buyers, investors, and enterprise leadership.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 hero-cta mb-12 lg:mb-14">
            <Button
              variant="primary"
              size="lg"
              href="/contact"
              className="w-full sm:w-auto font-bold tracking-wider"
            >
              {BUSINESS_INFO.primaryCtaLabel}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/#services"
              className="w-full sm:w-auto"
            >
              {BUSINESS_INFO.secondaryCtaLabel}
            </Button>
            <Button
              variant="whatsapp"
              size="lg"
              href={getWhatsAppUrl()}
              className="w-full sm:w-auto"
            >
              Direct WhatsApp Discussion →
            </Button>
          </div>

          {/* Corporate Credibility Proof Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border-default hero-proof">
            <div className="space-y-1">
              <div className="text-caption font-mono text-accent-primary font-bold uppercase tracking-wider">
                01 // VISUAL STANDARDS
              </div>
              <div className="text-heading-sm font-display font-bold text-text-primary">
                Cinema 4K &amp; CAD 3D
              </div>
              <p className="text-body-sm text-text-muted">
                Broadcast-grade plant documentation, product films, and exploded animations.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-caption font-mono text-status-success font-bold uppercase tracking-wider">
                02 // DIRECT DISPATCH
              </div>
              <div className="text-heading-sm font-display font-bold text-text-primary">
                Rudrapur &amp; Pan-India
              </div>
              <p className="text-body-sm text-text-muted">
                On-site crew deployment across SIDCUL, Pantnagar, Delhi NCR, and manufacturing corridors.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-caption font-mono text-accent-primary font-bold uppercase tracking-wider">
                03 // ENTERPRISE SLA
              </div>
              <div className="text-heading-sm font-display font-bold text-text-primary">
                Clear Timeline &amp; Delivery
              </div>
              <p className="text-body-sm text-text-muted">
                Structured briefing, rapid turnaround, and dedicated project management.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 pt-4 pb-2 hero-scroll">
        <ScrollIndicator targetId="statement" />
      </div>
    </section>
  );
}
