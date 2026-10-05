'use client';

import React, { useState, useEffect } from 'react';
import { useChat } from './ChatProvider';

export function ChatLauncher() {
  const { isOpen, toggleChat } = useChat();
  const [showAttentionPulse, setShowAttentionPulse] = useState<boolean>(false);

  // Trigger a subtle attention pulse after 30 seconds of idle time
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAttentionPulse(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setShowAttentionPulse(false);
    toggleChat();
  };

  // If chat is open on mobile, launcher can hide or stay accessible
  if (isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={handleClick}
        aria-label="Open SPAN Assistant chat"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={`group relative flex items-center bg-bg-elevated border border-border-default hover:border-accent-primary/80 transition-all duration-300 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary cursor-pointer ${
          showAttentionPulse
            ? 'motion-safe:animate-[pulse_3s_ease-in-out_2] ring-2 ring-accent-primary/40'
            : ''
        } rounded-full`}
      >
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-accent-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        />

        {/* ── Mobile View: 56x56 icon-only round button ── */}
        <div className="flex sm:hidden w-14 h-14 rounded-full items-center justify-center text-accent-primary relative">
          <ChatIcon className="w-6 h-6" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-status-success border-2 border-bg-elevated" />
        </div>

        {/* ── Desktop View: Pill with text, icon, and status badge ── */}
        <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 h-12">
          {/* Avatar Icon */}
          <div className="w-7 h-7 rounded-full bg-bg-deep border border-accent-primary/40 flex items-center justify-center text-accent-primary font-mono text-[11px] font-bold shrink-0">
            SP
          </div>

          {/* Label */}
          <div className="text-left">
            <span className="text-body-sm font-semibold text-text-primary block leading-none">
              SPAN Assistant
            </span>
            <span className="text-[10px] font-mono text-metal-mid flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success shrink-0" />
              Online &middot; Ask Anything
            </span>
          </div>

          {/* Action indicator arrow */}
          <div className="w-6 h-6 rounded-full bg-bg-deep border border-border-subtle flex items-center justify-center text-text-muted group-hover:text-accent-primary transition-colors ml-1">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

function ChatIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
