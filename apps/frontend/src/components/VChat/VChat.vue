<template>
  <section class="w-3/4 p-4 flex flex-col">
    <div class="flex justify-between items-center border-b pb-2 mb-4">
      <h2 class="text-xl font-semibold">
        {{ currentChat.name }}
      </h2>
      <p v-if="currentChat" class="text-sm text-gray-500">
        Участники:
        {{ currentChat.participants.map((p: any) => p.username).join(', ') }}
      </p>
    </div>

    <VMessageList :messages="messages" />

    <div class="flex items-center">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Input your message..."
        class="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        @click="buttonHandler"
        class="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-400"
      >
        Send
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import VMessageList from '../VMessageList/VMessageList.vue';

type Props = {
  messages: any;
  currentChat: any;
};

defineProps<Props>();

const newMessage = ref<string>('');

const emits = defineEmits(['sendMessage']);

function enterHandler(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    buttonHandler();
  }
}
function buttonHandler() {
  emits('sendMessage', newMessage.value);
  newMessage.value = '';
}

onMounted(() => {
  document.addEventListener('keydown', enterHandler);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', enterHandler);
});
</script>

<style scoped></style>
