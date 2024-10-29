import type { Chat } from '@/types/chat';

export async function getUserChats(
  queryValue: string
): Promise<{ data: Chat[]; error: unknown }> {
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

export async function createChat(name: string): Promise<any> {
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

    return await response.json();
  } catch (err: unknown) {
    return err;
  }
}

export async function getCurrentChat(id: string) {
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
