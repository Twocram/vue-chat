<template>
  <div class="flex-grow overflow-auto mb-4 p-4 bg-gray-50 rounded-lg">
    <VMessageListItem
      v-for="(message, index) in messages"
      :key="index"
      :messageFrom="message.userId"
      :text="message.text"
    />
  </div>
</template>

<script setup lang="ts">
import VMessageListItem from '../VMessageListItem/VMessageListItem.vue';
type Props = {
  messages: any;
};

defineProps<Props>();
</script>

<style scoped></style>
