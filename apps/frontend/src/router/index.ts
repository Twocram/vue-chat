import { createRouter, createWebHistory } from 'vue-router';

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

router.beforeEach((to) => {
  if (!localStorage.getItem('token')) {
    if (to.name !== 'login' && to.name !== 'register') {
      return { name: 'login' };
    }
  }
});

export default router;
