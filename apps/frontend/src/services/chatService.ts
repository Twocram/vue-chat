import type {
  CreateChatResponse,
  CurrentChatResponse,
  JoinToChatResponse,
  UserChatsResponse,
} from '@/types/response';

export async function getUserChats(
  queryValue: string
): Promise<UserChatsResponse> {
  try {
    const response = await fetch(
      `/api/v1/chat/my-chats${queryValue ? `?searchName=${queryValue}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    const { data } = await response.json();

    return { data, error: null };
  } catch (err: unknown) {
    return { data: [], error: err };
  }
}

export async function createChat(name: string): Promise<CreateChatResponse> {
  try {
    const response = await fetch('/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name,
      }),
    });

    const { data } = await response.json();

    return { data, error: null };
  } catch (err: unknown) {
    return { data: null, error: err };
  }
}

export async function getCurrentChat(id: string): Promise<CurrentChatResponse> {
  try {
    const response = await fetch(`/api/v1/chat/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const { data } = await response.json();

    return { data, error: null };
  } catch (error: unknown) {
    return { data: null, error };
  }
}

export async function joinToChat(id: string): Promise<JoinToChatResponse> {
  try {
    const response = await fetch(`/api/v1/chat/connect`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const { data } = await response.json();

    return { data, error: null };
  } catch (err: unknown) {
    return { data: null, error: err };
  }
}
