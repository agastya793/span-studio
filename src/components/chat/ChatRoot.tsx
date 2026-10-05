'use client';

import React from 'react';
import { ChatProvider } from './ChatProvider';
import { ChatLauncher } from './ChatLauncher';
import { ChatWindow } from './ChatWindow';

/**
 * Root wrapper integrating the ChatProvider context with the launcher and floating window.
 * Exported for client-side lazy-loading in layout.tsx.
 */
export function ChatRoot() {
  return (
    <ChatProvider>
      <ChatLauncher />
      <ChatWindow />
    </ChatProvider>
  );
}

export default ChatRoot;
