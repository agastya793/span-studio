import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { BUSINESS_INFO, SERVICES, getWhatsAppUrl } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-deep border-t border-border-default pt-16 pb-12 text-text-secondary font-body">
      <Container>
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-border-default">
          {/* Column 1: Brand & Studio Identification with Official SPAN Logo */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-3.5 group focus-visible:ring-2 focus-visible:ring-accent-primary rounded-radius-sm"
              aria-label="SPAN Studio Home"
            >
              <div className="relative w-12 h-12 shrink-0 rounded-full shadow-md ring-1 ring-border-default/80 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/images/span-logo-clean.png"
                  alt="SPAN Studio Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5 leading-none">
                  <span className="font-display font-black text-2xl tracking-tight text-text-primary">
                    SPAN
                  </span>
                  <span className="font-display font-bold uppercase tracking-[0.16em] text-metal-mid text-base">
                    STUDIO
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary font-mono font-semibold mt-1">
                  Visual &amp; Technology Solutions
                </span>
              </div>
            </Link>

            <p className="text-body-sm text-text-secondary leading-relaxed max-w-sm">
              Visual content and cinematography studio providing industrial walkthrough videos,
              commercial product films, commercial photography, and photorealistic 3D animation.
            </p>

            <div className="pt-1 text-caption text-text-muted space-y-1">
              <p>
                <strong className="text-text-primary font-medium">Headquarters:</strong>{' '}
                {BUSINESS_INFO.contact.address}
              </p>
              <p>Operating across Uttarakhand, Delhi NCR, and manufacturing hubs nationwide.</p>
            </div>
          </div>

          {/* Column 2: Confirmed Services */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-label text-text-primary font-semibold font-display tracking-widest">
              Visual Services
            </h3>
            <ul className="space-y-2 text-body-sm list-none p-0 m-0">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services`}
                    className="hover:text-accent-primary transition-colors block py-0.5"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company & Legal Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-label text-text-primary font-semibold font-display tracking-widest">
              Company
            </h3>
            <ul className="space-y-2 text-body-sm list-none p-0 m-0">
              <li>
                <Link href="/about" className="hover:text-accent-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-accent-primary transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li className="pt-2 border-t border-border-default">
                <Link
                  href="/privacy-policy"
                  className="hover:text-accent-primary transition-colors text-caption text-text-muted block py-0.5"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-accent-primary transition-colors text-caption text-text-muted block py-0.5"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Verified Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-label text-text-primary font-semibold font-display tracking-widest">
              Direct Inquiries
            </h3>
            <div className="space-y-3 text-body-sm">
              <div>
                <span className="text-caption text-text-muted block">Direct Line</span>
                <a
                  href={`tel:${BUSINESS_INFO.contact.phoneRaw}`}
                  className="font-mono text-text-primary hover:text-accent-primary transition-colors text-heading-sm font-semibold"
                >
                  {BUSINESS_INFO.contact.phoneDisplay}
                </a>
              </div>

              <div>
                <span className="text-caption text-text-muted block">WhatsApp Business</span>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-status-success font-semibold hover:underline flex items-center gap-1.5"
                >
                  <span>Chat on WhatsApp</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              <div>
                <span className="text-caption text-text-muted block">Email</span>
                <a
                  href={`mailto:${BUSINESS_INFO.contact.email}`}
                  className="text-text-primary hover:text-accent-primary transition-colors font-mono text-caption break-all"
                >
                  {BUSINESS_INFO.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-caption text-text-muted">
          <p>© {currentYear} {BUSINESS_INFO.brandName}. All rights reserved.</p>
          <p className="text-center md:text-right max-w-lg">
            SPAN Studio is an independent visual content and videography business.
          </p>
        </div>
      </Container>
    </footer>
  );
}
