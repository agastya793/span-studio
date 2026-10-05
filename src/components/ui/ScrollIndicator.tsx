import React from 'react';

export interface ScrollIndicatorProps {
  className?: string;
  targetId?: string;
}

export function ScrollIndicator({
  className = '',
  targetId = 'services',
}: ScrollIndicatorProps) {
  return (
    <a
      href={`#${targetId}`}
      aria-label="Scroll to next section"
      className={`group inline-flex items-center gap-3 text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary py-2 ${className}`}
    >
      <span className="text-[11px] font-mono tracking-[0.2em] uppercase font-medium">
        SCROLL
      </span>
      <div className="relative w-4 h-7 rounded-full border border-border-default flex items-start justify-center p-1 group-hover:border-accent-primary/60 transition-colors">
        <span className="w-1 h-1.5 rounded-full bg-accent-primary mt-0.5" />
      </div>
    </a>
  );
}
