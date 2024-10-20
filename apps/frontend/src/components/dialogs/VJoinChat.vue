<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg w-96">
            <h3 class="text-xl font-semibold mb-4">Присоединиться к чату</h3>
            <input v-model="chatIdToJoin" type="text" placeholder="ID чата"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4" />
            <div class="flex justify-end">
                <button @click="emits('joinChat', chatIdToJoin)"
                    class="mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
                    Присоединиться
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

const chatIdToJoin = ref<string>('')

const emits = defineEmits(['joinChat', 'close'])

</script>

<style scoped></style>