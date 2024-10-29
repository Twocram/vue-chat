<template>
  <div class="mb-2">
    <p :class="{ 'text-right': messageFrom === currentUser.id }">
      <span
        :class="{
          'bg-indigo-500 text-white': messageFrom === currentUser.id,
          'bg-gray-200': messageFrom !== currentUser.id,
        }"
        class="inline-block px-3 py-2 rounded-lg"
      >
        {{ text }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
import { computed } from 'vue';

type Props = {
  messageFrom: string;
  text: string;
};

defineProps<Props>();

const accountStore = useAccountStore();

const currentUser = computed(() => {
  return accountStore.info;
});
</script>

<style scoped></style>
