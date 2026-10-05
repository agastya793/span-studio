'use client';

import React from 'react';

/**
 * Accessible Typing Indicator for SPAN Assistant.
 * Displays 3 pulsing dots, or static "..." when prefers-reduced-motion is active.
 */
export function TypingIndicator() {
  return (
    <div
      role="status"
      aria-label="SPAN Assistant is typing"
      className="flex items-center gap-1.5 py-2 px-3.5 rounded-2xl rounded-bl-sm bg-bg-elevated border border-border-default w-fit shadow-sm"
    >
      {/* Motion-enabled animated dots */}
      <span className="hidden motion-safe:flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-accent-primary animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-accent-primary animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-accent-primary animate-bounce" />
      </span>

      {/* Reduced-motion static fallback */}
      <span className="motion-reduce:inline hidden text-caption font-mono text-metal-mid tracking-widest select-none">
        ...
      </span>

      <span className="sr-only">SPAN Assistant is formulating a response</span>
    </div>
  );
}
