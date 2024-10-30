<template>
  <div class="h-screen flex">
    <aside class="w-1/4 bg-gray-100 p-4 flex flex-col">
      <div class="mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск чатов..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <VChatList :chats="chats" @selectChat="selectChat($event)" />

      <div class="mt-4">
        <button
          @click="openCreateChat"
          class="w-full mb-2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 focus:outline-none"
        >
          Create chat
        </button>
        <button
          @click="openJoinChat"
          class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 focus:outline-none"
        >
          Join to chat
        </button>
      </div>

      <button
        @click="logout"
        class="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 focus:outline-none"
      >
        Logout
      </button>
    </aside>

    <slot></slot>

    <VCreateChat
      v-if="showCreateChatModal"
      @createChat="createChatHandler($event)"
      @close="closeCreateChat"
    />

    <VJoinChat
      v-if="showJoinChatModal"
      @joinChat="joinChat($event)"
      @close="closeJoinChat"
    />
  </div>
</template>

<script setup lang="ts">
import VCreateChat from '@/components/dialogs/VCreateChat.vue';
import VJoinChat from '@/components/dialogs/VJoinChat.vue';
import VChatList from '@/components/VChatList.vue';
import { createChat, getUserChats, joinToChat } from '@/services/chatService';
import type { ChatListItem } from '@/types/chat';
import { debounce } from '@/utils/debounce';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

onMounted(() => {
  fetchUserChats();
});

async function fetchUserChats() {
  const { data, error } = await getUserChats(searchQuery.value);

  if (error) {
    throw error;
  }

  chats.value = data;
}

const chats = ref<ChatListItem[]>([]);

const searchQuery = ref<string>('');

const router = useRouter();

const selectChat = async (chat: ChatListItem) => {
  await router.push({ name: 'chat', params: { chatId: chat.id } });
};

const logout = async () => {
  localStorage.removeItem('token');
  await router.push({ name: 'login' });
};

const showCreateChatModal = ref(false);
const openCreateChat = () => {
  showCreateChatModal.value = true;
};
const closeCreateChat = () => {
  showCreateChatModal.value = false;
};

const createChatHandler = async (chatName: string) => {
  if (!chatName.trim()) return;

  await createChat(chatName);

  closeCreateChat();
};

const showJoinChatModal = ref(false);
const openJoinChat = () => {
  showJoinChatModal.value = true;
};
const closeJoinChat = () => {
  showJoinChatModal.value = false;
};
const joinChat = async (chatId: string) => {
  const { error } = await joinToChat(chatId);
  if (!error) {
    await fetchUserChats();
  }
  closeJoinChat();
};

const debounceFetchChats = debounce(fetchUserChats, 300);

watch(searchQuery, () => {
  debounceFetchChats();
});
</script>

<style scoped></style>
