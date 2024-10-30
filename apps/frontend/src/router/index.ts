import { createRouter, createWebHistory } from 'vue-router';
import { useAccountStore } from '@/stores/account';
import { computed, onMounted } from 'vue';
import { getAccountInfo } from '@/services/accountService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/chat/:chatId',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/auth/RegisterView.vue'),
    },
  ],
});

router.beforeEach(async (to) => {
  if (!localStorage.getItem('token')) {
    if (to.name !== 'login' && to.name !== 'register') {
      return { name: 'login' };
    }
  }

  if (localStorage.getItem('token')) {
    if (to.name !== 'login' && to.name !== 'register') {
      const accountStore = useAccountStore();

      const accountInfo = computed(() => {
        return accountStore.info;
      });

      if (!accountInfo.value) {
        const { data, error } = await getAccountInfo();
        if (error) {
          throw error;
        }

        accountStore.setUser(data);
      }
    }
  }
});

export default router;
