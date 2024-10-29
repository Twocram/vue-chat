<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useAccountStore } from '@/stores/account';
import { computed, onMounted } from 'vue';
import { getAccountInfo } from '@/services/accountService';

const accountStore = useAccountStore();

const accountInfo = computed(() => {
  return accountStore.info;
});

onMounted(async () => {
  if (!accountInfo.value && localStorage.getItem('token')) {
    const { data, error } = await getAccountInfo();
    if (error) {
      throw error;
    }

    accountStore.setUser(data);
  }
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
