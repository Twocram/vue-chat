<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-gray-700 text-center">
        Registration
      </h2>
      <form @submit.prevent="handleRegister">
        <div class="mt-4">
          <label for="username" class="block text-sm text-gray-700"
            >Username</label
          >
          <input
            name="username"
            v-model="username"
            type="text"
            v-bind="usernameAttrs"
            id="username"
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div class="text-red-600">{{ errors.username }}</div>
        </div>
        <div class="mt-4">
          <label for="password" class="block text-sm text-gray-700"
            >Password</label
          >
          <input
            name="password"
            type="password"
            v-bind="passwordAttrs"
            v-model="password"
            id="password"
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div class="text-red-600">{{ errors.password }}</div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Register
          </button>
        </div>
        <div class="mt-4 text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <router-link
              :to="{ name: 'login' }"
              class="text-indigo-600 hover:underline"
              >Login</router-link
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { register } from '@/services/authService';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { useForm } from 'vee-validate';

const schema = yup.object({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters\n')
    .required('Username is required field\n'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters\n')
    .required('Password is required field'),
});

const { defineField, errors, setFieldError, handleSubmit } = useForm({
  validationSchema: schema,
});

const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');

const router = useRouter();

const handleRegister = handleSubmit(async (values) => {
  const { data, error } = await register(values.username, values.password);

  if (error) {
    return;
  }

  if (data?.error) {
    if (data.error === 'User already exists') {
      setFieldError('username', 'Username already exists');
    }
  }

  if (data && data.token) {
    localStorage.setItem('token', data.token);
    await router.push({ name: 'home' });
  }
});
</script>

<style scoped></style>
