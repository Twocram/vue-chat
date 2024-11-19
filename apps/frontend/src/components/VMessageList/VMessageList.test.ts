import VMessageListItem from '@/components/VMessageListItem/VMessageListItem.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import VMessageList from './VMessageList.vue';

describe('VMessageList.vue', () => {
  it('renders messages', () => {
    const messages = [
      { userId: 1, text: 'Hello!' },
      { userId: 2, text: 'Hi there!' },
    ];

    const wrapper = shallowMount(VMessageList, {
      props: {
        messages,
      },
    });

    const messageItems = wrapper.findAllComponents(VMessageListItem);
    expect(messageItems).toHaveLength(messages.length);

    messageItems.forEach((itemWrapper, index) => {
      expect(itemWrapper.props('messageFrom')).toBe(messages[index].userId);
      expect(itemWrapper.props('text')).toBe(messages[index].text);
    });
  });

  it('renders empty message list', () => {
    const wrapper = shallowMount(VMessageList, {
      props: {
        messages: [],
      },
    });

    const messageItems = wrapper.findAllComponents(VMessageListItem);
    expect(messageItems).toHaveLength(0);

    expect(wrapper.find('.flex-grow').exists()).toBe(true);
  });
});
