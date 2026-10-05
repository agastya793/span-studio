'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { Container } from '@/components/layout/Container';
import { useGSAP } from '@/hooks/useGSAP';
import { DURATION, EASE } from '@/lib/animations';

const STATEMENT_WORDS = [
  'We',
  'are',
  'a',
  'visual',
  'content',
  'studio',
  'built',
  'to',
  'help',
  'businesses',
  'present',
  'their',
  'work,',
  'products,',
  'and',
  'facilities',
  'with',
  'cinematic',
  'precision.',
];

export function BrandStatement() {
  const containerRef = useRef<HTMLElement>(null);

  // Phase 7: Word-by-word subtle reveal on viewport entry
  useGSAP((_, isReducedMotion) => {
    if (isReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 82%',
        once: true,
      },
      defaults: { ease: EASE.CINEMATIC },
    });

    tl.fromTo(
      '.statement-accent',
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.5, transformOrigin: 'center center' }
    )
      .fromTo(
        '.statement-word',
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.025,
          ease: 'power2.out',
        },
        '-=0.2'
      )
      .fromTo(
        '.statement-location',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: DURATION.NORMAL },
        '-=0.3'
      );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="statement"
      aria-label="Brand Statement"
      className="relative bg-bg-base border-y border-border-subtle py-12 md:py-16 lg:py-20 scroll-mt-20 overflow-hidden"
    >
      <Container className="max-w-4xl text-center">
        {/* Subtle decorative accent pill */}
        <div className="flex justify-center mb-6">
          <span className="statement-accent w-8 h-[2px] bg-accent-primary rounded-full" />
        </div>

        {/* Primary Statement: Word-by-word reveal */}
        <p
          className="text-display-sm sm:text-display-md text-text-primary font-display font-semibold tracking-tight leading-[1.25] mb-6"
          aria-label="“We are a visual content studio built to help businesses present their work, products, and facilities with cinematic precision.”"
        >
          <span className="select-none text-accent-primary mr-1">&ldquo;</span>
          {STATEMENT_WORDS.map((word, idx) => (
            <span
              key={`${word}-${idx}`}
              className="inline-block overflow-hidden mr-[0.25em] align-top"
            >
              <span className="statement-word inline-block">{word}</span>
            </span>
          ))}
          <span className="select-none text-accent-primary">&rdquo;</span>
        </p>

        {/* Location & Coverage Line */}
        <p className="statement-location text-body-sm sm:text-body-md text-text-muted font-body tracking-wider uppercase">
          Based in Rudrapur. Working across India.
        </p>
      </Container>
    </section>
  );
}
