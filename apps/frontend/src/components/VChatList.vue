<template>
  <ul class="flex-grow overflow-auto">
    <VChatListItem
      v-for="(chat, index) in chats"
      :key="index"
      :chat="chat"
      @selectChat="emits('selectChat', chat)"
    />
  </ul>
</template>

<script setup lang="ts">
import type { ChatListItem } from '@/types/chat';
import VChatListItem from './VChatListItem.vue';

const emits = defineEmits(['selectChat']);
type Props = {
  chats: ChatListItem[];
};

defineProps<Props>();
</script>

<style scoped></style>
