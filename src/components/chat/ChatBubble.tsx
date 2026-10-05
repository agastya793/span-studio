'use client';

import React from 'react';
import Link from 'next/link';
import { ChatMessage, ChatAction } from '@/types/chat';

export interface ChatBubbleProps {
  message: ChatMessage;
}

/**
 * Formats a message timestamp into a readable 12-hour time string.
 */
function formatTime(timestamp: number): string {
  try {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

/**
 * Renders individual chat messages for either the user or the assistant.
 */
export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex flex-col gap-1.5 w-full ${
        isUser ? 'items-end' : 'items-start'
      }`}
    >
      <div
        className={`flex items-end gap-2 max-w-[85%] sm:max-w-[80%] ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Assistant Avatar Badge */}
        {!isUser && (
          <div
            aria-hidden="true"
            className="w-7 h-7 rounded-full bg-bg-deep border border-accent-primary/40 flex items-center justify-center text-accent-primary font-mono text-[10px] font-bold shrink-0 shadow-sm select-none"
          >
            SP
          </div>
        )}

        {/* Message Container */}
        <div
          className={`p-3.5 rounded-2xl text-body-sm leading-relaxed ${
            isUser
              ? 'rounded-tr-xs bg-accent-subtle/50 text-text-primary border border-accent-primary/30'
              : 'rounded-tl-xs bg-bg-elevated text-text-primary border border-border-default shadow-md'
          }`}
        >
          {/* Formatted Text with line-breaks */}
          <div className="whitespace-pre-wrap break-words">{message.text}</div>

          {/* Action CTAs attached to assistant messages */}
          {!isUser && message.actions && message.actions.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-border-subtle/60 flex flex-wrap gap-2">
              {message.actions.map((action: ChatAction) => (
                <ActionPill key={action.label} action={action} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Timestamp */}
      <span className="text-[10px] font-mono text-metal-mid px-2 select-none">
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
}

function ActionPill({ action }: { action: ChatAction }) {
  const isWhatsApp = action.variant === 'whatsapp';
  const isPrimary = action.variant === 'primary';

  const baseClasses =
    'inline-flex items-center gap-1.5 text-caption font-mono font-medium px-2.5 py-1 rounded-full transition-all duration-200';

  let variantClasses = 'bg-bg-deep border border-border-default text-text-secondary hover:text-text-primary';

  if (isWhatsApp) {
    variantClasses =
      'bg-[#25D366]/10 text-status-success border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366]/50';
  } else if (isPrimary) {
    variantClasses =
      'bg-accent-primary text-white border border-accent-primary hover:bg-accent-hover shadow-accent';
  }

  if (action.isExternal) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${variantClasses}`}
      >
        <span>{action.label}</span>
        <span aria-hidden="true" className="text-[10px]">↗</span>
      </a>
    );
  }

  return (
    <Link href={action.href} className={`${baseClasses} ${variantClasses}`}>
      <span>{action.label}</span>
      <span aria-hidden="true" className="text-[10px]">→</span>
    </Link>
  );
}
