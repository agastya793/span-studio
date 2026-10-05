'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ChatMessage, ChatContextValue } from '@/types/chat';

import { matchIntent, COMMON_ACTIONS } from '@/lib/chatbot';

const MAX_HISTORY_MESSAGES = 20;

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-001',
  role: 'model',
  text: "Hello! I'm SPAN Assistant. How can I help you today? You can ask about our 5 core production services, production process, service locations, pricing, or how to start a project.",
  timestamp: Date.now(),
  actions: [
    COMMON_ACTIONS.SERVICES,
    COMMON_ACTIONS.START_PROJECT,
    COMMON_ACTIONS.WHATSAPP,
  ],
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);

  const resetChat = useCallback(() => {
    setMessages([{ ...INITIAL_WELCOME_MESSAGE, timestamp: Date.now() }]);
    setError(null);
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessageId = `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const userMessage: ChatMessage = {
        id: userMessageId,
        role: 'user',
        text: trimmed,
        timestamp: Date.now(),
      };

      // 1. Append user message (maintain sliding window of max 20 messages)
      setMessages((prev) => [...prev, userMessage].slice(-MAX_HISTORY_MESSAGES));
      setIsLoading(true);
      setError(null);

      // 2. Short synthetic delay (200-300ms) to display typing indicator before response
      setTimeout(() => {
        const response = matchIntent(trimmed);
        const assistantMessageId = `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const assistantMessage: ChatMessage = {
          id: assistantMessageId,
          role: 'model',
          text: response.text,
          timestamp: Date.now(),
          actions: response.actions,
        };

        setMessages((prev) => [...prev, assistantMessage].slice(-MAX_HISTORY_MESSAGES));
        setIsLoading(false);
      }, 250);
    },
    [isLoading]
  );

  const value = useMemo<ChatContextValue>(
    () => ({
      messages,
      isOpen,
      isLoading,
      error,
      openChat,
      closeChat,
      toggleChat,
      sendMessage,
      resetChat,
    }),
    [messages, isOpen, isLoading, error, openChat, closeChat, toggleChat, sendMessage, resetChat]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat(): ChatContextValue {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
