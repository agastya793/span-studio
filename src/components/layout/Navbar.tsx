'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { BUSINESS_INFO } from '@/lib/constants';

const navItems = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: '3D', href: '/#3d' },
  { label: 'About', href: '/#about' },
];

export function Navbar() {
  const { isScrolled } = useScrollPosition(80);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'h-20 bg-white/95 backdrop-blur-xl border-b border-border-default shadow-sm'
            : 'h-24 bg-white/90 backdrop-blur-md border-b border-border-subtle'
        }`}
      >
        <Container className="h-full flex items-center justify-between">
          {/* Logo / Wordmark with Official SPAN Logo */}
          <Link
            href="/"
            className="flex items-center gap-3.5 sm:gap-4 group py-2 select-none focus-visible:ring-2 focus-visible:ring-accent-primary rounded-radius-sm"
            aria-label="SPAN Studio Home"
          >
            {/* High-Impact Logo Emblem with Subtle Ring & Elevation */}
            <div
              className={`relative shrink-0 rounded-full group-hover:scale-105 transition-all duration-300 shadow-md ring-1 ring-border-default/80 group-hover:ring-accent-primary/40 ${
                isScrolled ? 'w-12 h-12' : 'w-13 h-13 sm:w-14 sm:h-14 lg:w-15 lg:h-15'
              }`}
            >
              <Image
                src="/images/span-logo-clean.png"
                alt="SPAN Studio Logo"
                width={64}
                height={64}
                priority
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            {/* Typography Lockup: SPAN STUDIO + VISUAL & TECHNOLOGY SOLUTIONS */}
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-2 leading-none">
                <span
                  className={`font-display font-black tracking-tight text-text-primary transition-all duration-300 ${
                    isScrolled
                      ? 'text-2xl sm:text-3xl'
                      : 'text-2xl sm:text-3xl lg:text-[32px]'
                  }`}
                >
                  SPAN
                </span>
                <span
                  className={`font-display font-bold uppercase tracking-[0.16em] text-metal-mid transition-all duration-300 ${
                    isScrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg lg:text-xl'
                  }`}
                >
                  STUDIO
                </span>
              </div>
              <span
                className={`uppercase tracking-[0.22em] text-text-secondary font-mono font-semibold transition-all duration-300 mt-1 sm:mt-1.5 flex items-center gap-1.5 ${
                  isScrolled
                    ? 'text-[10px] sm:text-[11px]'
                    : 'text-[10px] sm:text-[11px] lg:text-[12px]'
                }`}
              >
                <span>Visual &amp; Technology Solutions</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (>= 1024px) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
            <ul className="flex items-center gap-8 list-none m-0 p-0">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-nav-item font-body font-medium text-text-secondary hover:text-text-primary transition-colors duration-150 relative py-1 group focus-visible:ring-2 focus-visible:ring-accent-primary rounded-radius-sm"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-primary group-hover:w-full transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Primary Action */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="primary" size="sm" href="/contact">
              {BUSINESS_INFO.primaryCtaLabel}
            </Button>
          </div>

          {/* Mobile Hamburger Toggle (minimum 44x44 touch target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden min-w-[44px] min-h-[44px] p-2 text-text-primary hover:text-accent-primary transition-colors flex flex-col gap-1.5 justify-center items-center rounded-radius-sm focus-visible:ring-2 focus-visible:ring-accent-primary"
          >
            <span className="w-5 h-0.5 bg-current transition-all" />
            <span className="w-5 h-0.5 bg-current transition-all" />
            <span className="w-3.5 h-0.5 bg-current self-start transition-all" />
          </button>
        </Container>
      </header>

      {/* Full-screen Mobile Navigation Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
