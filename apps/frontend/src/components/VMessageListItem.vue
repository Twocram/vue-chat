<template>
    <div class="mb-2">
        <p :class="{ 'text-right': messageFrom === currentUser }">
            <span
                :class="{ 'bg-indigo-500 text-white': messageFrom === currentUser, 'bg-gray-200': messageFrom !== currentUser }"
                class="inline-block px-3 py-2 rounded-lg">
                {{ text }}
            </span>
        </p>
    </div>
</template>

<script setup lang="ts">
type Props = {
    messageFrom: string,
    text: string,
    currentUser: string,
}

defineProps<Props>()
</script>

<style scoped></style>