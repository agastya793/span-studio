'use client';

import React from 'react';
import { getWhatsAppUrl } from '@/lib/constants';

interface WhatsAppFloatingButtonProps {
  className?: string;
  customMessage?: string;
}

/**
 * Sticky floating WhatsApp CTA button inspired by premium production studio websites (e.g. revafilms.com).
 * Positioned in the bottom-right corner with a sleek dark pill design, official WhatsApp icon,
 * hover elevation, and direct link to SPAN Studio's verified business WhatsApp number.
 */
export function WhatsAppFloatingButton({
  className = '',
  customMessage = 'Hello SPAN Studio, I want to discuss a corporate film / visual content requirement.',
}: WhatsAppFloatingButtonProps) {
  const whatsappUrl = getWhatsAppUrl(customMessage);

  return (
    <aside aria-label="Quick contact via WhatsApp">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SPAN Studio on WhatsApp"
        className={`fixed right-5 sm:right-6 bottom-5 sm:bottom-6 z-40 group inline-flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full bg-[#0E1217]/95 border border-[#25D366]/40 hover:border-[#25D366] text-[#F4F0E8] hover:text-[#25D366] shadow-[0_12px_30px_rgba(0,0,0,0.32)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1217] ${className}`}
      >
        {/* WhatsApp Icon */}
        <span className="relative flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 32 32"
            className="w-4 h-4 sm:w-4 sm:h-4 fill-[#25D366] transition-transform duration-200 group-hover:scale-110"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M16.02 3.2C9.02 3.2 3.34 8.86 3.34 15.82c0 2.23.59 4.41 1.7 6.33L3.2 28.8l6.82-1.79a12.67 12.67 0 0 0 6 1.52h.01c6.99 0 12.68-5.66 12.68-12.62S23.01 3.2 16.02 3.2Zm0 23.2h-.01c-1.9 0-3.76-.51-5.39-1.47l-.39-.23-4.04 1.06 1.08-3.93-.25-.4a10.47 10.47 0 0 1-1.59-5.61c0-5.8 4.75-10.51 10.59-10.51 2.83 0 5.49 1.1 7.49 3.08a10.4 10.4 0 0 1 3.1 7.43c0 5.8-4.75 10.58-10.59 10.58Zm5.8-7.92c-.32-.16-1.88-.92-2.17-1.03-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1 1.23-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.56-.94-.83-1.58-1.86-1.76-2.17-.18-.31-.02-.48.14-.64.14-.14.32-.37.48-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.7-.98-2.33-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61s1.13 3.03 1.29 3.24c.16.21 2.22 3.37 5.38 4.73.75.32 1.34.52 1.8.66.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z" />
          </svg>
        </span>

        {/* Text Label */}
        <span className="font-sans text-[11px] sm:text-[12px] font-bold tracking-[0.08em] uppercase select-none leading-none">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}

export default WhatsAppFloatingButton;
