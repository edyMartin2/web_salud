// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/All.vue'),
  },
  {
    path: '/signIn',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/signUp',
    component: () => import('@/views/SignUp.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
