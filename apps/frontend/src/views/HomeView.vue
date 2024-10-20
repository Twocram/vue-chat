<template>
  <div></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  if (!localStorage.getItem('token')) {
    router.push('/auth/login');
  }
})
</script>