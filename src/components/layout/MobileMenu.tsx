'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS_INFO, getWhatsAppUrl } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/#services' },
  { label: '3D', href: '/#3d' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Body scroll locking
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Focus close button on open
      closeButtonRef.current?.focus();

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Escape key handler & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      ref={dialogRef}
      className="fixed inset-0 z-50 flex flex-col bg-white/98 backdrop-blur-2xl transition-opacity duration-300 md:hidden"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between h-18 px-5 border-b border-border-default">
        <Link href="/" onClick={onClose} className="flex items-center gap-3.5 group py-2">
          <div className="relative w-11 h-11 shrink-0 rounded-full shadow-md ring-1 ring-border-default/80">
            <Image
              src="/images/span-logo-clean.png"
              alt="SPAN Studio Logo"
              width={44}
              height={44}
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="font-display font-black text-2xl tracking-tight text-text-primary">
                SPAN
              </span>
              <span className="font-display font-bold uppercase tracking-[0.16em] text-metal-mid text-sm">
                STUDIO
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary font-mono font-semibold mt-1">
              Visual &amp; Technology Solutions
            </span>
          </div>
        </Link>

        {/* Close Button — min 44x44 target */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors rounded-radius-sm focus-visible:ring-2 focus-visible:ring-accent-primary"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Links List */}
      <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
        <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation Links">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="font-display text-2xl font-bold text-text-primary hover:text-accent-primary transition-colors py-3 flex items-center justify-between border-b border-border-subtle group min-h-[44px]"
            >
              <span>{link.label}</span>
              <span className="text-sm font-mono text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </Link>
          ))}
        </nav>

        {/* Contact Information & Action Block */}
        <div className="pt-6 space-y-4 border-t border-border-default">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-text-muted font-mono block">
              Direct Contact
            </span>
            <a
              href={`tel:${BUSINESS_INFO.contact.phoneRaw}`}
              className="text-base font-semibold text-text-primary font-mono block min-h-[32px] flex items-center hover:text-accent-primary"
            >
              {BUSINESS_INFO.contact.phoneDisplay}
            </a>
            <span className="text-xs text-text-secondary block">
              {BUSINESS_INFO.contact.city}, {BUSINESS_INFO.contact.state}
            </span>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              href="/contact"
              onClick={onClose}
            >
              {BUSINESS_INFO.primaryCtaLabel}
            </Button>
            <Button
              variant="whatsapp"
              size="md"
              fullWidth
              href={getWhatsAppUrl()}
              onClick={onClose}
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
