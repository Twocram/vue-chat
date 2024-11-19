<template>
  <li
    @click="emits('selectChat', chat)"
    class="p-3 mb-2 cursor-pointer rounded-lg hover:bg-indigo-100"
    :class="{ 'bg-indigo-200': currentChat === chat.id }"
  >
    <p class="font-semibold">{{ chat.name }}</p>
    <p class="text-sm text-gray-500">
      {{ chat.lastMessage ? chat.lastMessage.text : null }}
    </p>
  </li>
</template>

<script setup lang="ts">
import type { ChatListItem } from '@/types/chat';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

type Props = {
  chat: ChatListItem;
};

const route = useRoute();

const currentChat = computed<string>(() => {
  return route.params.chatId as string;
});

defineProps<Props>();

const emits = defineEmits(['selectChat']);
</script>

<style scoped></style>
