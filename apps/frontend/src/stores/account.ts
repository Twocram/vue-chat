import { defineStore } from 'pinia';
import type { AccountInfoResponse } from '@/types/response';

export const useAccountStore = defineStore('account', {
  state: () => ({
    info: null as AccountInfoResponse['data'],
  }),

  actions: {
    setUser(info: any) {
      this.info = info;
    },
  },
});
