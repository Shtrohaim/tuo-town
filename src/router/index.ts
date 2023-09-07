import { createRouter, createWebHistory } from 'vue-router'

import MainView from '@/views/MainView.vue'
import CatalogView from '@/views/CatalogView.vue'
import CatalogCategory from '@/components/categories/CatalogCategory.vue'
import CatalogProducts from '@/components/products/CatalogProducts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView,
      children: [
        {
          path: 'categories/:id',
          name: 'category',
          component: CatalogCategory
        },
        {
          path: 'products/:id',
          name: 'products',
          component: CatalogProducts
        }
      ]
    }
  ]
})

export default router
