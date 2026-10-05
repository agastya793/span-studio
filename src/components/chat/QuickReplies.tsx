'use client';

import React from 'react';

export const INITIAL_QUICK_REPLIES = [
  'What services do you offer?',
  'How does the production process work?',
  'How can I start a project?',
] as const;

export interface QuickRepliesProps {
  onSelect: (reply: string) => void;
  disabled?: boolean;
}

/**
 * Renders the exactly 3 initial conversational starter prompts for SPAN Studio.
 */
export function QuickReplies({ onSelect, disabled = false }: QuickRepliesProps) {
  return (
    <div
      role="group"
      aria-label="Suggested quick questions"
      className="flex flex-col gap-2 pt-2 pb-1"
    >
      <span className="text-[10px] font-mono uppercase tracking-widest text-metal-mid px-1">
        SUGGESTED QUESTIONS
      </span>
      <div className="flex flex-wrap gap-2">
        {INITIAL_QUICK_REPLIES.map((reply) => (
          <button
            key={reply}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(reply)}
            className="text-left text-caption font-body font-medium px-3 py-1.5 rounded-full bg-bg-deep border border-border-default text-text-secondary hover:text-text-primary hover:border-accent-primary/60 hover:bg-accent-subtle/20 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
}
