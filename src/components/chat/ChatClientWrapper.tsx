'use client';

import dynamic from 'next/dynamic';

const ChatRoot = dynamic(() => import('./ChatRoot'), {
  ssr: false,
});

/**
 * Client-side boundary wrapper for lazy-loading ChatRoot with ssr: false.
 * Imported into Server Components like RootLayout.
 */
export function ChatClientWrapper() {
  return <ChatRoot />;
}

export default ChatClientWrapper;
