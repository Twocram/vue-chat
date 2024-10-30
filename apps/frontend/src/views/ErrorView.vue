<template>
  <div
    class="h-screen flex flex-col justify-center items-center text-center bg-gray-100"
  >
    <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
    <p class="text-2xl text-gray-600 mb-8">Page not found</p>
    <router-link
      :to="{ name: 'home' }"
      class="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
    >
      Go to Main Page
    </router-link>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped></style>
