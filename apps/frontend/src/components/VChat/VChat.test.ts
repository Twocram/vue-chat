import { shallowMount } from '@vue/test-utils';
import { afterEach } from 'node:test';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import VMessageList from '../VMessageList/VMessageList.vue';
import VChat from './VChat.vue';

describe('VChat.vue', () => {
  let wrapper: any;

  const props = {
    messages: [
      { userId: 1, text: 'Hello!' },
      { userId: 2, text: 'Hi!' },
    ],
    currentChat: {
      name: 'Test Chat',
      participants: [{ username: 'User1' }, { username: 'User2' }],
    },
  };

  beforeEach(() => {
    wrapper = shallowMount(VChat, {
      props,
    });
  });

  afterEach(() => {
    wrapper.unmount();
  })

  it('display chat name', () => {
    const chatName = wrapper.find('h2');
    expect(chatName.text()).toBe(props.currentChat.name);
  });

  it('display chat participants', () => {
    const participants = wrapper.find('p');
    expect(participants.text()).toContain('Участники: User1, User2');
  });

  it('renders message list', () => {
    const messageList = wrapper.findComponent(VMessageList);
    expect(messageList.exists()).toBe(true);
    expect(messageList.props('messages')).toEqual(props.messages);
  });

  it('sends message', async () => {
    const input = wrapper.find('input');
    const button = wrapper.find('button');
  
    await input.setValue('Test message');
    expect(wrapper.vm.newMessage).toBe('Test message');
  
    await button.trigger('click');
  
    expect(wrapper.emitted('sendMessage')).toHaveLength(1);
    expect(wrapper.emitted('sendMessage')[0]).toEqual(['Test message']);
  
    expect(wrapper.vm.newMessage).toBe('');
  });
  

  it('sends message via Enter', async () => {
    const input = wrapper.find('input');
  
    await input.setValue('Message via Enter');
    expect(wrapper.vm.newMessage).toBe('Message via Enter');
  
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(event);
  
    expect(wrapper.emitted('sendMessage')).toHaveLength(1);
    expect(wrapper.emitted('sendMessage')[0]).toEqual(['Message via Enter']);
  
    expect(wrapper.vm.newMessage).toBe('');
  });
  

  it('add and remove event listeners', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    const removeSpy = vi.spyOn(document, 'removeEventListener');

    const localWrapper = shallowMount(VChat, { props });

    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    localWrapper.unmount();
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
