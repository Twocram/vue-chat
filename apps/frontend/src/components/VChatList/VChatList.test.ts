import VChatListItem from '@/components/VChatListItem/VChatListItem.vue';
import { shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import VChatList from './VChatList.vue';

describe('VChatList.vue', () => {
  const mockChats = [
    {
      id: '1',
      name: 'Chat 1',
      lastMessage: {
        id: '1',
        text: 'Message 1',
        createdAt: new Date().toISOString(),
        userId: '1',
      },
    },
    {
      id: '2',
      name: 'Chat 2',
      lastMessage: {
        id: '2',
        text: 'Message 2',
        createdAt: new Date().toISOString(),
        userId: '2',
      },
    },
    {
      id: '3',
      name: 'Chat 3',
      lastMessage: {
        id: '3',
        text: 'Message 3',
        createdAt: new Date().toISOString(),
        userId: '1',
      },
    },
  ];

  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(VChatList, {
      props: {
        chats: mockChats,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('displays all chats', async () => {
    const chatItems = wrapper.findAllComponents(VChatListItem);

    await wrapper.vm.$nextTick();

    expect(chatItems).toHaveLength(mockChats.length);
  });


  it('provide chat to VChatListItem', () => {
    const chatItems = wrapper.findAllComponents(VChatListItem);

    expect(chatItems[0].props('chat')).toEqual(mockChats[0]);
    expect(chatItems[2].props('chat')).toEqual(mockChats[2]);
  });
});
