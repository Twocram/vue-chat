<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-gray-700 text-center">
        Authorization
      </h2>
      <form @submit.prevent="handleLogin">
        <div class="mt-4">
          <label for="username" class="block text-sm text-gray-700"
            >Username</label
          >
          <input
            v-model="username"
            v-bind="usernameAttrs"
            type="text"
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
            v-model="password"
            v-bind="passwordAttrs"
            type="password"
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
            Login
          </button>
        </div>
        <div class="mt-4 text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <router-link
              :to="{ name: 'register' }"
              class="text-indigo-600 hover:underline"
              >Register</router-link
            >
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { login } from '@/services/authService';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { useForm } from 'vee-validate';

const schema = yup.object({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters\n')
    .required('Username is required field'),
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

const handleLogin = handleSubmit(async (values) => {
  const { data, error } = await login(values.username, values.password);

  if (data?.error) {
    if (data.error === 'User not found') {
      setFieldError('username', 'Username not found');
    }

    if (data.error === 'Wrong password') {
      setFieldError('password', 'Username or password is incorrect');
    }
  }

  if (error) {
    throw error;
  }

  if (data && data.token) {
    localStorage.setItem('token', data.token);
    await router.push({ name: 'home' });
  }
});
</script>
