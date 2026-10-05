'use client';

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Tag } from '@/components/ui/Tag';
import {
  CAPABILITIES,
  CapabilityItem,
  CapabilityCategory,
} from '@/lib/constants';
import { useGSAP } from '@/hooks/useGSAP';
import { DURATION, EASE, STAGGER } from '@/lib/animations';

const FILTER_CATEGORIES: readonly CapabilityCategory[] = [
  'ALL',
  'FACTORY',
  'PRODUCT',
  'PHOTOGRAPHY',
  '3D',
] as const;

export function CapabilitiesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] =
    useState<CapabilityCategory>('ALL');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') {
      return CAPABILITIES;
    }
    return CAPABILITIES.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Phase 7: Entrance animation on scroll
  useGSAP((_, isReducedMotion) => {
    if (isReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
      defaults: { ease: EASE.CINEMATIC },
    });

    tl.fromTo(
      '.capabilities-header',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: DURATION.NORMAL }
    )
      .fromTo(
        '.capabilities-filter-bar',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      )
      .fromTo(
        '.capability-card',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION.NORMAL,
          stagger: STAGGER.CARD_60MS, // 60ms stagger per architecture
        },
        '-=0.2'
      );
  }, { scope: containerRef });

  // Phase 7: Lightweight transition when category filter changes
  useGSAP((_, isReducedMotion) => {
    if (isReducedMotion) return;
    gsap.fromTo(
      '.capability-card',
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.32,
        stagger: 0.04,
        ease: 'power2.out',
      }
    );
  }, { scope: containerRef, dependencies: [activeCategory] });

  return (
    <section
      ref={containerRef}
      id="work"
      aria-label="Visual Capabilities"
      className="relative bg-bg-void py-20 lg:py-28 border-b border-border-subtle scroll-mt-16 lg:scroll-mt-20 overflow-hidden"
    >
      <Container>
        {/* Section Header */}
        <div className="capabilities-header">
          <SectionHeader
            overline="WHAT WE CAN CREATE"
            heading="See the standard."
            description="A collection of concept demonstrations and studio spec work, showing the quality and range of visual production we bring to every project."
            note="The following are concept demonstrations produced by SPAN Studio."
          />
        </div>

        {/* Filter Navigation Bar */}
        <div className="capabilities-filter-bar mb-10 lg:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          <div
            role="tablist"
            aria-label="Capabilities Filter"
            className="flex items-center gap-2.5 min-w-max"
          >
            {FILTER_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full font-body text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                    isActive
                      ? 'bg-accent-primary text-white shadow-accent'
                      : 'bg-white border border-border-default text-text-secondary hover:text-text-primary hover:border-border-strong shadow-xs'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[340px]">
          {filteredItems.map((item) => (
            <div key={item.id} className="capability-card h-full">
              <CapabilityCard item={item} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/**
 * Editorial Capability Card with clean corporate styling,
 * concept badge, category tag, and subtle hover interactions.
 */
function CapabilityCard({ item }: { item: CapabilityItem }) {
  // Map gridSpan to column/row spans for visual rhythm on desktop
  const spanClasses =
    item.gridSpan === 'wide'
      ? 'md:col-span-2 lg:col-span-2 row-span-1'
      : item.gridSpan === 'tall'
      ? 'md:col-span-1 lg:col-span-1 row-span-1 lg:row-span-1'
      : 'col-span-1 row-span-1';

  return (
    <article
      className={`group relative rounded-xl border border-slate-200/90 bg-white overflow-hidden flex flex-col justify-between p-6 transition-all duration-300 hover:border-accent-primary/60 hover:-translate-y-1 hover:shadow-2xl cursor-pointer ${spanClasses}`}
    >
      {/* ── 1. BACKGROUND MEDIA LAYER (Always rendered / playing, scales smoothly on hover) ── */}
      <div className="absolute inset-0 overflow-hidden bg-slate-900 pointer-events-none">
        {item.video ? (
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
        ) : item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-slate-100" />
        )}
      </div>

      {/* ── 2. LIGHT ELEGANT VEIL (Active in default state to eliminate black boxes, completely dissolves on hover) ── */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] transition-opacity duration-300 ease-out group-hover:opacity-0 pointer-events-none z-10" />

      {/* ── 3. TEXT & UI LAYER (Clean high-contrast typography in default state, disappears completely on hover) ── */}
      <div className="relative z-20 flex flex-col justify-between h-full pointer-events-none transition-opacity duration-300 ease-out group-hover:opacity-0">
        {/* Card Header: Crisp Light Pill Tags */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white/95 text-slate-900 border border-slate-200/90 shadow-xs">
            {item.video && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            )}
            {item.categoryTag}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-wide uppercase bg-white/95 text-slate-600 border border-slate-200/90 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mr-1.5" />
            {item.video ? 'Live CAD Reel' : 'SPAN Concept'}
          </span>
        </div>

        {/* Center: Open spacer */}
        <div className="my-auto" />

        {/* Card Bottom: Clean Dark Typography over soft white container */}
        <div className="pt-4 border-t border-slate-200/80 bg-white/70 -mx-6 -mb-6 p-6 backdrop-blur-xs">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <h3 className="text-heading-md text-slate-950 font-display font-bold group-hover:text-accent-primary transition-colors">
              {item.title}
            </h3>
            <span className="text-accent-primary text-sm font-bold flex-shrink-0">
              →
            </span>
          </div>
          <p className="text-body-sm text-slate-700 line-clamp-2 leading-relaxed">
            {item.subtitle}
          </p>
        </div>
      </div>
      {/* Bottom accent glow strip on hover */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
    </article>
  );
}
