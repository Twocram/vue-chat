import { defineStore } from 'pinia';

const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [],
  }),

  actions: {
    setMessages(messages: any) {
      this.messages = messages;
    },
  },
});
