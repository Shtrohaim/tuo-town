import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import CatalogView from '@/views/CatalogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/catalog/:id',
      name: 'catalog',
      component: CatalogView
    }
  ]
})

export default router
