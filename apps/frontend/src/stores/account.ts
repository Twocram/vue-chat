import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
  state: () => ({
    info: null,
  }),

  actions: {
    setUser(info: any) {
      this.info = info;
    },
  },
});
