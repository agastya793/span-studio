'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { BUSINESS_INFO, getWhatsAppUrl } from '@/lib/constants';
import { useGSAP } from '@/hooks/useGSAP';
import { DURATION, EASE, DISTANCE } from '@/lib/animations';

export function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(containerRef, (gsap) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.from('.cta-overline', {
      y: DISTANCE.SM,
      opacity: 0,
      duration: DURATION.NORMAL,
      ease: EASE.SMOOTH,
    })
      .from(
        '.cta-heading',
        {
          y: DISTANCE.MD,
          opacity: 0,
          duration: DURATION.NORMAL,
          ease: EASE.SMOOTH,
        },
        '-=0.2'
      )
      .from(
        '.cta-copy',
        {
          y: DISTANCE.SM,
          opacity: 0,
          duration: DURATION.NORMAL,
          ease: EASE.SMOOTH,
        },
        '-=0.2'
      )
      .from(
        '.cta-buttons',
        {
          y: DISTANCE.SM,
          opacity: 0,
          duration: DURATION.NORMAL,
          ease: EASE.SMOOTH,
        },
        '-=0.2'
      )
      .from(
        '.cta-footer',
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
      id="contact"
      aria-label="Final Call to Action"
      className="relative bg-bg-void py-24 lg:py-36 border-b border-border-subtle overflow-hidden scroll-mt-16 lg:scroll-mt-20"
    >
      {/* Subtle Accent Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(182, 6, 61, 0.05) 0%, transparent 60%)',
        }}
      />

      {/* Subtle fine technical grid line overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #161717 1px, transparent 1px), linear-gradient(to bottom, #161717 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <Container className="relative z-10 text-center max-w-4xl">
        {/* Logo & Overline Pillar */}
        <div className="cta-overline flex flex-col items-center justify-center mb-6">
          <div className="mb-4">
            <Image
              src="/images/span-logo-clean.png"
              alt="SPAN Studio Official Logo"
              width={64}
              height={64}
              className="w-16 h-16 object-contain drop-shadow-sm hover:scale-105 transition-transform"
            />
          </div>
          <span className="inline-flex items-center gap-2 text-overline font-semibold tracking-[0.14em] text-accent-primary uppercase px-3.5 py-1 rounded-full bg-accent-subtle border border-accent-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
            START A PROJECT
          </span>
        </div>

        {/* Primary Section Heading */}
        <h2 className="cta-heading text-display-md sm:text-display-lg lg:text-display-xl font-display font-extrabold text-text-primary tracking-tight leading-[1.1] mb-6">
          Ready to present your business
          <span className="block text-text-primary">with cinematic authority?</span>
        </h2>

        {/* Supporting Copy */}
        <p className="cta-copy text-body-lg sm:text-body-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
          Let&apos;s discuss your project. No obligation.
          <br className="hidden sm:inline" />
          {' '}Just a conversation about what you want to create.
        </p>

        {/* Conversion Action Buttons: Stack on Mobile, Inline on Tablet/Desktop */}
        <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10">
          {/* Primary CTA: Stronger Visual Hierarchy */}
          <Button
            variant="primary"
            size="lg"
            href="/contact"
            className="w-full sm:w-auto shadow-md hover:shadow-lg font-bold tracking-wider"
          >
            START A PROJECT
          </Button>

          {/* Secondary CTA: WhatsApp */}
          <Button
            variant="whatsapp"
            size="lg"
            href={getWhatsAppUrl()}
            className="w-full sm:w-auto"
          >
            Talk on WhatsApp
          </Button>

          {/* Secondary CTA: Direct Phone */}
          <Button
            variant="secondary"
            size="lg"
            href={`tel:${BUSINESS_INFO.contact.phoneRaw}`}
            className="w-full sm:w-auto"
          >
            Call {BUSINESS_INFO.contact.phoneDisplay}
          </Button>
        </div>

        {/* Bottom Grounded Logistics Line */}
        <div className="cta-footer pt-6 border-t border-border-subtle/50 text-caption font-mono text-text-muted flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <span>OPERATING FROM RUDRAPUR, UTTARAKHAND</span>
          <span className="hidden sm:inline text-metal-dark">•</span>
          <span>SERVING MANUFACTURING HUBS NATIONWIDE</span>
        </div>
      </Container>
    </section>
  );
}
