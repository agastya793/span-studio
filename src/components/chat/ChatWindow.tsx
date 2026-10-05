'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from './ChatProvider';
import { ChatBubble } from './ChatBubble';
import { QuickReplies } from './QuickReplies';
import { TypingIndicator } from './TypingIndicator';

export function ChatWindow() {
  const { isOpen, closeChat, messages, isLoading, sendMessage } = useChat();
  const [inputText, setInputText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message on update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when chat window opens
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeChat]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    sendMessage(inputText);
    setInputText('');
  };

  const showQuickReplies = messages.length <= 1;

  return (
    <div
      role="dialog"
      aria-label="SPAN Assistant Chat"
      aria-modal="true"
      className="fixed z-50 transition-all duration-200 motion-reduce:transition-none
        inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[400px] sm:h-[600px]
        flex flex-col bg-bg-base sm:rounded-2xl border border-border-default shadow-2xl overflow-hidden"
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-bg-elevated border-b border-border-default shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-bg-deep border border-accent-primary/40 text-accent-primary font-mono text-xs font-bold shadow-sm">
            SP
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-status-success border-2 border-bg-elevated" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-body-sm font-display font-bold text-text-primary tracking-tight">
                SPAN Assistant
              </h2>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-accent-subtle text-accent-primary border border-accent-primary/30 uppercase tracking-widest">
                FAQ
              </span>
            </div>
            <p className="text-[11px] font-mono text-text-muted leading-tight">
              Rudrapur, UK &middot; Studio Representative
            </p>
          </div>
        </div>

        {/* Close Button — min 44x44 on mobile */}
        <button
          type="button"
          onClick={closeChat}
          aria-label="Close SPAN Assistant chat"
          className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* ── Message History Body ── */}
      <div
        role="log"
        aria-live="polite"
        className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin bg-bg-void/40"
      >
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {/* Initial 3 Quick Questions */}
        {showQuickReplies && (
          <div className="pt-2">
            <QuickReplies
              disabled={isLoading}
              onSelect={(question) => {
                sendMessage(question);
              }}
            />
          </div>
        )}

        {/* Live Typing Indicator */}
        {isLoading && (
          <div className="pt-1">
            <TypingIndicator />
          </div>
        )}

        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      {/* ── Input Box Footer ── */}
      <div className="p-3 sm:p-4 bg-bg-elevated border-t border-border-default shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <label htmlFor="chat-user-input" className="sr-only">
            Type your message to SPAN Assistant
          </label>
          <input
            id="chat-user-input"
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            maxLength={1000}
            placeholder="Ask about factory films, 3D, or quotes..."
            className="flex-1 h-11 px-3.5 rounded-lg bg-bg-deep border border-border-default text-body-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-border-accent focus:ring-1 focus:ring-accent-primary outline-none disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            aria-label="Send message to SPAN Assistant"
            className="w-11 h-11 rounded-lg bg-accent-primary hover:bg-accent-hover text-white flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary cursor-pointer"
          >
            <svg
              className="w-4 h-4 translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>

        <p className="text-[10px] font-mono text-center text-metal-mid mt-2 select-none">
          Grounded in confirmed studio information &middot; English &amp; Hinglish supported
        </p>
      </div>
    </div>
  );
}
