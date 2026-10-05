'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { getGoogleMapsUrl } from '@/lib/constants';

export function GeographicDispatchMap() {
  const mapsUrl = getGoogleMapsUrl();
  const embedUrl =
    'https://maps.google.com/maps?q=ARS+COMPUTER+Rudrapur+Bypass+Rd+Rudrapur&t=&z=16&ie=UTF8&iwloc=&output=embed';

  return (
    <div className="rounded-2xl border border-border-default bg-bg-deep overflow-hidden shadow-md">
      {/* ── Top Header ── */}
      <div className="px-5 py-3.5 border-b border-border-subtle bg-bg-base flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-pulse" />
          <span className="text-[12px] font-mono font-bold text-text-primary tracking-wider">
            STUDIO LOCATION
          </span>
        </div>
        <span className="text-[11px] font-mono text-metal-mid">
          RUDRAPUR // IN
        </span>
      </div>

      {/* ── Live Google Street Map View (Clickable to open store in Google Maps) ── */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Click to open ARS COMPUTER / SPAN Studio location in Google Maps"
        title="Click anywhere to open in Google Maps"
        className="relative block w-full h-[380px] bg-bg-raised group cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent-primary"
      >
        <iframe
          title="ARS Computer / SPAN Studio Live Google Map"
          src={embedUrl}
          className="w-full h-full border-0 pointer-events-none select-none"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Hover / Tap indicator badge */}
        <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
          <div className="bg-bg-void/95 backdrop-blur-xs text-text-primary group-hover:bg-accent-primary group-hover:text-white border border-border-default group-hover:border-accent-primary px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 text-xs font-mono font-bold transition-all duration-200">
            <span>Click to Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </a>

      {/* ── Bottom Information Bar ── */}
      <div className="px-4 py-3 bg-bg-base border-t border-border-subtle flex items-center justify-between text-caption font-mono">
        <span className="text-text-muted text-[11px]">
          Direct road connectivity to Pantnagar, Kashipur &amp; Delhi NCR.
        </span>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-primary hover:underline font-bold text-[11px] inline-flex items-center gap-1"
        >
          <span>Open Full Map</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
