'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import {
  CAPABILITIES,
  CapabilityItem,
  CapabilityCategory,
  getWhatsAppUrl,
} from '@/lib/constants';

const FILTER_CATEGORIES: readonly CapabilityCategory[] = [
  'ALL',
  'FACTORY',
  'PRODUCT',
  'PHOTOGRAPHY',
  '3D',
] as const;

export function WorkShowcase() {
  const [activeCategory, setActiveCategory] = useState<CapabilityCategory>('ALL');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') {
      return CAPABILITIES;
    }
    return CAPABILITIES.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-28 lg:pt-36 pb-24 bg-bg-base border-b border-border-subtle overflow-hidden">
      {/* Background Lighting Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 25% 25%, rgba(182, 6, 61, 0.04) 0%, transparent 60%)',
        }}
      />

      <Container>
        {/* Page Header */}
        <div className="mb-12">
          <SectionHeader
            as="h1"
            overline="CAPABILITY SHOWCASE &amp; SPEC REELS"
            heading="Visual standards benchmark."
            description="Explore our camera movements, sculpted lighting configurations, CAD visualization pipelines, and macro optical fidelity across industrial and product environments."
            note="Concept demonstrations produced internally by SPAN Studio to establish production standards."
          />
        </div>

        {/* Clear Transparent Disclosure Banner */}
        <div className="mb-10 p-5 sm:p-6 rounded-xl border border-border-default bg-bg-elevated/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-accent-primary font-mono text-sm mt-0.5 select-none font-bold">
              ℹ
            </span>
            <div className="text-body-sm text-text-secondary">
              <strong className="text-text-primary block sm:inline font-semibold">
                Illustrative Production Specification:{' '}
              </strong>
              The items below are concept demonstrations created internally by SPAN Studio to illustrate
              visual style, camera movement, and lighting direction. They do not represent completed commercial commissions
              or verified footage from client facilities.
            </div>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-metal-mid bg-bg-deep px-3 py-1 rounded border border-border-subtle shrink-0">
            CONCEPT TREATMENT
          </span>
        </div>

        {/* Filter Navigation Bar */}
        <div className="mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          <div
            role="tablist"
            aria-label="Work Filter"
            className="flex items-center gap-2.5 min-w-max"
          >
            {FILTER_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full font-body text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                    isActive
                      ? 'bg-accent-primary text-white shadow-md'
                      : 'bg-bg-elevated border border-border-default text-text-secondary hover:text-text-primary hover:border-border-strong'
                  }`}
                >
                  {category === 'ALL' ? 'ALL DISCIPLINES' : category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Large Showcase Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {filteredItems.map((item) => (
            <ShowcaseCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom Conversion Box */}
        <div className="p-8 sm:p-12 rounded-2xl border border-border-default bg-bg-elevated text-center max-w-4xl mx-auto shadow-xl">
          <span className="text-overline font-mono text-accent-primary block mb-3">
            NEED A SIMILAR VISUAL STANDARD FOR YOUR FACILITY?
          </span>
          <h2 className="text-display-sm sm:text-display-md font-display font-bold text-text-primary mb-4">
            Bring this level of cinematic authority to your operations.
          </h2>
          <p className="text-body-md text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
            We work directly on-site at manufacturing plants and in our controlled studio environment
            to build custom visual assets tailored for your buyers and investors.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact">
              Brief Your Project
            </Button>
            <Button
              variant="whatsapp"
              size="lg"
              href={getWhatsAppUrl('Hi SPAN Studio, I looked at your Work showcase and would like to discuss a shoot for our plant.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Direct WhatsApp Discussion
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

/**
 * Large Showcase Card featuring concept badge and illustrative specification framing.
 */
function ShowcaseCard({ item }: { item: CapabilityItem }) {
  return (
    <article className="group rounded-2xl border border-border-default bg-bg-elevated overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-border-strong hover:shadow-2xl">
      {/* Visual Simulation Hero Area */}
      <div className="relative w-full aspect-[16/10] bg-slate-950 overflow-hidden flex flex-col justify-between p-6">
        {/* Background Video / Image / Render (100% Crystal Clear) */}
        {item.video ? (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={item.image}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            >
              <source src={item.video} type="video/mp4" />
            </video>
          </div>
        ) : item.image ? (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div
            className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 50%, #0B0F17 100%)',
            }}
          />
        )}

        {/* Localized Top & Bottom Dark Scrims for Text Legibility (Center is 100% Clear) */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-0" />

        {/* Top Badges (Fade out on hover to reveal pure video / image) */}
        <div className="relative z-10 flex items-center justify-between gap-2 transition-opacity duration-300 group-hover:opacity-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/65 backdrop-blur-md text-white border border-white/20 shadow-xs">
            {item.video && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />}
            {item.categoryTag}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase bg-black/65 backdrop-blur-md text-metal-light border border-white/15 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mr-1.5 animate-pulse" />
            {item.video ? 'Live CAD Reel' : 'Concept treatment'}
          </span>
        </div>

        {/* Center is left completely open and unobstructed */}
        <div className="my-auto pointer-events-none" />

        {/* Bottom Telemetry Bar (Fades out on hover) */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-metal-light border-t border-white/15 pt-2 transition-opacity duration-300 group-hover:opacity-0">
          <span>PORTFOLIO SPECIFICATION</span>
          <span className="text-white/80 font-semibold">4K HIGH DYNAMIC RANGE</span>
        </div>
      </div>

      {/* Narrative & Scope Breakdown */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-display-xs sm:text-heading-lg font-display font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-body-md text-text-secondary leading-relaxed mb-6">
            {item.subtitle}
          </p>
        </div>

        <div className="pt-6 border-t border-border-subtle/60 flex items-center justify-between">
          <span className="text-caption font-mono text-metal-mid">
            ILLUSTRATIVE SPECIFICATION
          </span>
          <Button
            variant="ghost"
            size="sm"
            href={`/contact?service=${encodeURIComponent(item.categoryTag)}`}
          >
            Inquire Similar →
          </Button>
        </div>
      </div>
    </article>
  );
}
