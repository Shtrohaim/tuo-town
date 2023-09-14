import { createRouter, createWebHistory } from 'vue-router'

import MainView from '@/views/MainView.vue'
import CatalogView from '@/views/CatalogView.vue'
import CatalogCategory from '@/components/categories/CatalogCategory.vue'
import CatalogProducts from '@/components/products/CatalogProducts.vue'
import BaseFilter from '@/components/ui/BaseFilter.vue'
import ServiceView from '@/views/ServiceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.params.savePosition) return {}
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
    },
    {
      path: '/service',
      name: 'service',
      component: ServiceView
    }
  ]
})

export default router
