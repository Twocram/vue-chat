import type { ChatListItem, Chat } from '@/types/chat';

export type UserChatsResponse = {
  data: ChatListItem[];
  error: unknown;
};

export type CreateChatResponse = {
  data: Chat | null;
  error: unknown;
};

export type CurrentChatResponse = {
  data: Chat | null;
  error: unknown;
};

export type JoinToChatResponse = {
  data: string | null;
  error: unknown;
};

export type LoginResponse = {
  data: {
    user: {
      id: number;
      username: string;
    };
    token: string;
  } | null;
  error: unknown;
};

export type RegisterResponse = {
  data: {
    id: number;
    username: string;
    token: string;
  } | null;
  error: unknown;
};

export type AccountInfoResponse = {
  data: {
    id: number;
    username: string;
  } | null;
  error: unknown;
};
