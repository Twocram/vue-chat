<template>
    <section class="w-3/4 p-4 flex flex-col">
        <div class="flex justify-between items-center border-b pb-2 mb-4">
            <h2 class="text-xl font-semibold">
                {{ selectedChat ? selectedChat.name : 'Выберите чат' }}
            </h2>
            <p v-if="selectedChat" class="text-sm text-gray-500">
                Участники: {{ selectedChat.participants.join(', ') }}
            </p>
        </div>

        <VMessageList :messages="selectedChatMessages" :currentUser="currentUser" />

        <div v-if="selectedChat" class="flex items-center">
            <input v-model="newMessage" type="text" placeholder="Введите сообщение..."
                class="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            <button @click="emits('sendMessage', newMessage)"
                class="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-400">
                Отправить
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VMessageList from './VMessageList.vue';

type Props = {
    currentUser: any,
    selectedChat: any,
    selectedChatMessages: any,
}

defineProps<Props>()

const newMessage = ref<string>('')

const emits = defineEmits(['sendMessage'])
</script>

<style scoped></style>