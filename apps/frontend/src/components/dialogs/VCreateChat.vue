<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg w-96">
            <h3 class="text-xl font-semibold mb-4">Создать новый чат</h3>
            <input v-model="newChatName" type="text" placeholder="Название чата"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4" />
            <div class="flex justify-end">
                <button @click="emits('createChat', newChatName)"
                    class="mr-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400">
                    Создать
                </button>
                <button @click="emits('close')" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-200">
                    Отмена
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newChatName = ref<string>('')

const emits = defineEmits(['close', 'createChat'])
</script>

<style scoped></style>