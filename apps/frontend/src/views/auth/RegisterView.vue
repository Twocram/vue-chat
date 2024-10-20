<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold text-gray-700 text-center">Registartion</h2>
            <form @submit.prevent="handleRegister">
                <div class="mt-4">
                    <label for="username" class="block text-sm text-gray-700">Username</label>
                    <input v-model="username" type="text" id="username"
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>
                <div class="mt-4">
                    <label for="password" class="block text-sm text-gray-700">Password</label>
                    <input v-model="password" type="password" id="password"
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>
                <div class="mt-6">
                    <button type="submit"
                        class="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                        Register
                    </button>
                </div>
                <div class="mt-4 text-center">
                    <p class="text-sm text-gray-600">Already have an account?
                        <router-link to="/auth/login" class="text-indigo-600 hover:underline">Login</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { register } from '@/services/authService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const username = ref<string>('')

const password = ref<string>('')

const router = useRouter();


async function handleRegister() {
    const { data, error } = await register(username.value, password.value)

    console.log("DATA", data)

    if (error) {
        throw error;
    }

    if (data && data.token) {
        localStorage.setItem('token', data.token);
        router.push({ name: 'home' })
    }
}
</script>