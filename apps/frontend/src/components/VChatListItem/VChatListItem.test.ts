import { shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useRoute } from 'vue-router';
import ChatListItem from './VChatListItem.vue';

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

describe('ChatListItem.vue', () => {
  const mockChat = {
    id: '1',
    name: 'Test Chat',
    lastMessage: {
      id: '2',
      text: 'Hello!',
      createdAt: new Date().toISOString(),
      userId: '1',
    },
  };

  const mockCurrentChatId = '1';

  let wrapper: any;

  beforeEach(() => {
    // as vi.Mock
    (useRoute as any).mockReturnValue({
      params: {
        chatId: mockCurrentChatId,
      },
    });

    wrapper = shallowMount(ChatListItem, {
      props: {
        chat: mockChat,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('displays chat name and last message', () => {
    const chatName = wrapper.find('.font-semibold');
    const lastMessage = wrapper.find('.text-sm.text-gray-500');

    expect(chatName.text()).toBe(mockChat.name);
    expect(lastMessage.text()).toBe(mockChat.lastMessage?.text);
  });

  it('calls selectChat event when clicked', async () => {
    const listItem = wrapper.find('li');
    await listItem.trigger('click');

    const emittedEvents = wrapper.emitted('selectChat');
    expect(emittedEvents).toHaveLength(1);
    expect(emittedEvents[0]).toEqual([mockChat]);
  });

  it('add class "bg-indigo-200" for current chat', () => {
    const listItem = wrapper.find('li');

    expect(listItem.classes()).toContain('bg-indigo-200');
  });

  it('does not add class "bg-indigo-200" for other chat', async () => {
    // as vi.Mock
    (useRoute as any).mockReturnValue({
      params: {
        chatId: '2', 
      },
    });

    wrapper = shallowMount(ChatListItem, {
      props: {
        chat: mockChat,
      },
    });

    const listItem = wrapper.find('li');
    expect(listItem.classes()).not.toContain('bg-indigo-200');
  });
});
