import { createRouter, createWebHistory } from 'vue-router'

import MainView from '@/views/MainView.vue'
import CatalogView from '@/views/CatalogView.vue'
import CatalogCategory from '@/components/categories/CatalogCategory.vue'
import CatalogProducts from '@/components/products/CatalogProducts.vue'
import BaseFilter from '@/components/ui/BaseFilter.vue'
import ServiceView from '@/views/ServiceView.vue'
import ServiceReport from '@/components/service/ServiceReport.vue'
import ServiceOther from '@/components/service/ServiceOther.vue'
import ProductView from '@/views/ProductView.vue'

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
      component: ServiceView,
      children: [
        {
          path: '',
          name: 'report',
          component: ServiceReport
        },
        {
          path: '',
          name: 'centers',
          component: ServiceOther,
          meta: {
            title: 'Сервисные центры'
          }
        },
        {
          path: '',
          name: 'spares',
          component: ServiceOther,
          meta: {
            title: 'Запчасти'
          }
        },
        {
          path: '',
          name: 'instructions',
          component: ServiceOther,
          meta: {
            title: 'Инструкции'
          }
        },
        {
          path: '',
          name: 'certificates',
          component: ServiceOther,
          meta: {
            title: 'Сертификаты'
          }
        }
      ]
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView
    }
  ]
})

export default router
