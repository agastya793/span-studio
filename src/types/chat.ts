/**
 * Chatbot Type Definitions for SPAN Assistant.
 */

export type ChatRole = 'user' | 'model';

export interface ChatAction {
  label: string;
  href: string;
  isExternal?: boolean;
  variant?: 'primary' | 'secondary' | 'whatsapp';
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  timestamp: number;
  actions?: ChatAction[];
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ChatContextValue extends ChatState {
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (text: string) => Promise<void>;
  resetChat: () => void;
}

export interface ChatApiRequest {
  message: string;
  history?: Array<{
    role: ChatRole;
    text: string;
  }>;
}

export interface ChatApiResponse {
  success: boolean;
  reply?: string;
  actions?: ChatAction[];
  error?: string;
}
