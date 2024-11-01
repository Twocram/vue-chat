<template>
  <VChatLayout>
    <VChat
      v-if="currentChat && connectionIsReady"
      :current-chat="currentChat"
      :messages
      @send-message="sendMessage($event)"
    />
  </VChatLayout>
</template>

<script setup lang="ts">
import VChatLayout from '@/layouts/VChatLayout.vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VChat from '@/components/VChat.vue';
import { getCurrentChat } from '@/services/chatService';
import type { Chat, Message } from '@/types/chat';

const route = useRoute();
const router = useRouter();

const connection = ref<WebSocket | null>(null);

const chatId = computed<string>(() => {
  return route.params.chatId as string;
});

const messages = ref<Message[]>([]);

const currentChat = ref<Chat | null>(null);

const connectionIsReady = ref<boolean>(false);

async function escapeHandler(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    await router.push({ name: 'home' });
  }
}

async function connectToChat() {
  const { data, error } = await getCurrentChat(chatId.value);

  if (error) {
    return;
  }

  currentChat.value = data;

  connection.value = new WebSocket(
    `${import.meta.env['VITE_WS_URL']}/messages/${chatId.value}`,
    ['accessToken', localStorage.getItem('token') as string]
  );

  connectionIsReady.value = true;

  if (connection.value) {
    connection.value.onmessage = (event) => {
      messages.value = JSON.parse(event.data).messages as Message[];
    };
  }
}

onMounted(async () => {
  document.addEventListener('keydown', escapeHandler);

  await connectToChat();
});

function sendMessage(message: string) {
  if (connection.value) {
    connection.value.send(
      JSON.stringify({
        message,
      })
    );
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('keydown', escapeHandler);
  connection.value?.close();
});

watch(chatId, async () => {
  await connectToChat();
});
</script>

<style scoped></style>
