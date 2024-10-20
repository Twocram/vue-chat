<template>
  <div class="h-screen flex">
    <aside class="w-1/4 bg-gray-100 p-4 flex flex-col">
      <div class="mb-4">
        <input v-model="searchQuery" type="text" placeholder="Поиск чатов..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      </div>

      <VChatList :chats="filteredChats" :selectedChat="selectedChat" @selectChat="selectChat($event)" />

      <div class="mt-4">
        <button @click="openCreateChat"
          class="w-full mb-2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 focus:outline-none">
          Создать чат
        </button>
        <button @click="openJoinChat"
          class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 focus:outline-none">
          Присоединиться к чату
        </button>
      </div>

      <button @click="logout"
        class="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 focus:outline-none">
        Выйти
      </button>
    </aside>

    <VChat :currentUser="currentUser" :selectedChat="selectedChat" :selectedChatMessages="selectedChatMessages"
      @sendMessage="sendMessage($event)" />

    <VCreateChat v-if="showCreateChatModal" @createChat="createChat($event)" @close="closeCreateChat" />

    <VJoinChat v-if="showJoinChatModal" @joinChat="joinChat($event)" @close="closeJoinChat" />
  </div>
</template>

<script lang="ts" setup>
import VCreateChat from '@/components/dialogs/VCreateChat.vue';
import VJoinChat from '@/components/dialogs/VJoinChat.vue';
import VChat from '@/components/VChat.vue';
import VChatList from '@/components/VChatList.vue';
import { ref, computed } from 'vue';

const currentUser = 'me';

const chats = ref([
  {
    id: 1,
    name: 'Чат с другом',
    lastMessage: 'Как дела?',
    participants: ['me', 'friend1'],
    messages: [
      { from: 'me', text: 'Привет!' },
      { from: 'friend1', text: 'Привет! Как дела?' },
      { from: 'me', text: 'Все отлично!' },
    ],
  },
  {
    id: 2,
    name: 'Групповой чат',
    lastMessage: 'Когда встречаемся?',
    participants: ['me', 'friend2', 'friend3'],
    messages: [
      { from: 'friend2', text: 'Привет всем!' },
      { from: 'me', text: 'Привет!' },
      { from: 'friend3', text: 'Когда встречаемся?' },
    ],
  },
]);

const searchQuery = ref('');
const selectedChat = ref<typeof chats.value[0] | null>(null);
const newMessage = ref('');

// Фильтрация чатов по поисковому запросу
const filteredChats = computed(() => {
  return chats.value.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Сообщения выбранного чата
const selectedChatMessages = computed(() => {
  return selectedChat.value ? selectedChat.value.messages : [];
});

// Функция для выбора чата
const selectChat = (chat: typeof selectedChat.value) => {
  selectedChat.value = chat;
};

// Отправка сообщения
const sendMessage = (newMessage: string) => {
  if (!newMessage.trim()) return;

  if (selectedChat.value) {
    selectedChat.value.messages.push({
      from: currentUser,
      text: newMessage,
    });
    newMessage = '';
  }
};

// Выход из профиля
const logout = () => {
  console.log('Logout');
};

// Модальное окно для создания чата
const showCreateChatModal = ref(false);
const openCreateChat = () => {
  showCreateChatModal.value = true;
};
const closeCreateChat = () => {
  showCreateChatModal.value = false;
};

const createChat = (chatName: string) => {
  if (!chatName.trim()) return;
  chats.value.push({
    id: chats.value.length + 1,
    name: chatName,
    lastMessage: '',
    participants: [currentUser],
    messages: [],
  });
  closeCreateChat();
};

const showJoinChatModal = ref(false);
const openJoinChat = () => {
  showJoinChatModal.value = true;
};
const closeJoinChat = () => {
  showJoinChatModal.value = false;
};
const joinChat = (chatId: string) => {
  console.log('Присоединение к чату с ID:', chatId);
  closeJoinChat();
};
</script>

<style scoped></style>
