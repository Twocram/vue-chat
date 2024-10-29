<template>
  <VChatLayout>
    <VChat
      v-if="currentChat && connectionIsReady"
      :current-chat="currentChat"
      :messages
    />
  </VChatLayout>
</template>

<script setup lang="ts">
import VChatLayout from '@/layouts/VChatLayout.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import VChat from '@/components/VChat.vue';
import { getCurrentChat } from '@/services/chatService';

const route = useRoute();

const connection = ref<WebSocket | null>(null);

const chatId = ref<string>(route.params.chatId);

const messages = ref<any>(null);

const currentChat = ref<any>(null);

const connectionIsReady = ref<boolean>(false);

onMounted(async () => {
  const { data, error } = await getCurrentChat(chatId.value);

  if (error) {
    return;
  }

  currentChat.value = data;

  connection.value = new WebSocket(
    `ws://localhost:3000/api/v1/messages/${chatId.value}`
  );

  connectionIsReady.value = true;

  connection.value.onmessage = (event) => {
    messages.value = JSON.parse(event.data).messages;
  };
});
</script>

<style scoped></style>
