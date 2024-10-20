<template>
    <li @click="emits('selectChat', chat)" class="p-3 mb-2 cursor-pointer rounded-lg hover:bg-indigo-100"
        :class="{ 'bg-indigo-200': selectedChat && selectedChat.id === chat.id }">
        <p class="font-semibold">{{ chat.name }}</p>
        <p class="text-sm text-gray-500">{{ chat.lastMessage }}</p>
    </li>
</template>

<script setup lang="ts">
type Props = {
    chat: any,
    selectedChat: any
}

defineProps<Props>()

const emits = defineEmits(['selectChat'])
</script>

<style scoped></style>