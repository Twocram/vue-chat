import { shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';
import { useAccountStore } from '../../stores/account';
import VMessageListItem from './VMessageListItem.vue';

describe('VMessageListItem.vue', () => {
  let accountStore: ReturnType<typeof useAccountStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    accountStore = useAccountStore();
  });

  it('renders message from current user', () => {
    accountStore.info = { id: 1, username: "Test name" };

    const wrapper = shallowMount(VMessageListItem, {
      props: {
        messageFrom: 1,
        text: 'Hello!',
      },
    });

    const message = wrapper.find('p');
    expect(message.exists()).toBe(true);
    expect(message.classes()).toContain('text-right');

    const bubble = wrapper.find('span');
    expect(bubble.classes()).toContain('bg-indigo-500');
    expect(bubble.text()).toBe('Hello!');
  });

  it('renders message from another user', () => {
    accountStore.info = { id: 1, username: "Test name" };

    const wrapper = shallowMount(VMessageListItem, {
      props: {
        messageFrom: 2,
        text: 'Hi there!',
      },
    });

    const message = wrapper.find('p');
    expect(message.exists()).toBe(true);
    expect(message.classes()).not.toContain('text-right');

    const bubble = wrapper.find('span');
    expect(bubble.classes()).toContain('bg-gray-200');
    expect(bubble.text()).toBe('Hi there!');
  });

  it('does not render message if currentUser is undefined', () => {
    accountStore.info = null;

    const wrapper = shallowMount(VMessageListItem, {
      props: {
        messageFrom: 1,
        text: 'Hello!',
      },
    });

    expect(wrapper.find('p').exists()).toBe(false);
  });
});
