'use client';

import React, { useState, useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { FAQ_ITEMS, FAQItem } from '@/lib/constants';
import { useGSAP } from '@/hooks/useGSAP';
import { DURATION, EASE, DISTANCE } from '@/lib/animations';

export function FAQSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Store open items as a Set or map of IDs. First item open by default.
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    [FAQ_ITEMS[0].id]: true,
  });

  useGSAP(containerRef, (gsap) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.from('.faq-header', {
      y: DISTANCE.MD,
      opacity: 0,
      duration: DURATION.NORMAL,
      ease: EASE.SMOOTH,
    })
      .from(
        '.faq-item',
        {
          y: DISTANCE.SM,
          opacity: 0,
          duration: DURATION.NORMAL,
          stagger: 0.05,
          ease: EASE.SMOOTH,
        },
        '-=0.3'
      )
      .from(
        '.faq-bottom-bar',
        {
          y: DISTANCE.SM,
          opacity: 0,
          duration: DURATION.NORMAL,
          ease: EASE.SMOOTH,
        },
        '-=0.2'
      );
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Split into two balanced columns for desktop
  const midPoint = Math.ceil(FAQ_ITEMS.length / 2);
  const leftColumnItems = FAQ_ITEMS.slice(0, midPoint);
  const rightColumnItems = FAQ_ITEMS.slice(midPoint);

  return (
    <section
      ref={containerRef}
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative bg-bg-deep py-20 lg:py-28 border-b border-border-subtle overflow-hidden scroll-mt-16 lg:scroll-mt-20"
    >
      {/* Background Lighting Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 80% 20%, rgba(182, 6, 61, 0.04) 0%, transparent 60%)',
        }}
      />

      <Container>
        {/* Section Header */}
        <div className="faq-header">
          <SectionHeader
            overline="FREQUENTLY ASKED QUESTIONS"
            heading="Everything you need to know about working with us."
            description="Clear answers regarding plant safety protocols, 3D CAD modeling, production turnarounds, and master asset ownership."
          />
        </div>

        {/* ── DESKTOP & TABLET & MOBILE: Two-Column Accordion on lg, Single Column on mobile/md ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            {leftColumnItems.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={!!openItems[item.id]}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            {rightColumnItems.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={!!openItems[item.id]}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </div>

        {/* Still Have Questions Bar */}
        <div className="faq-bottom-bar rounded-xl border border-border-default bg-bg-elevated p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-body-md font-display font-semibold text-text-primary">
              Have a specific question about your plant or product?
            </h3>
            <p className="text-body-sm text-text-muted mt-0.5">
              Speak directly with our technical team in Rudrapur.
            </p>
          </div>
          <Button variant="secondary" size="sm" href="/contact">
            Ask a Question →
          </Button>
        </div>
      </Container>
    </section>
  );
}

/**
 * Accessible FAQ Accordion Item component
 */
function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`faq-item rounded-xl border transition-all duration-200 overflow-hidden ${
        isOpen
          ? 'border-border-strong bg-bg-elevated shadow-md'
          : 'border-border-default bg-bg-elevated/50 hover:border-border-strong hover:bg-bg-elevated/80'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
        className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
      >
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-metal-mid block">
            CATEGORY // {item.category}
          </span>
          <span className="font-display font-semibold text-text-primary text-body-md block leading-snug">
            {item.question}
          </span>
        </div>

        {/* Plus / Minus Indicator */}
        <span
          className={`font-mono text-xl font-bold transition-all duration-200 shrink-0 w-6 h-6 flex items-center justify-center rounded ${
            isOpen
              ? 'text-accent-primary bg-accent-subtle rotate-180'
              : 'text-text-muted hover:text-text-primary'
          }`}
          aria-hidden="true"
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {/* Answer Region */}
      {isOpen && (
        <div
          id={`faq-answer-${item.id}`}
          role="region"
          aria-labelledby={`faq-question-${item.id}`}
          className="px-5 pb-5 pt-1 text-body-sm text-text-secondary leading-relaxed border-t border-border-subtle/40"
        >
          {item.answer}
        </div>
      )}
    </div>
  );
}
