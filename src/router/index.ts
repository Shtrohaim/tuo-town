import { createRouter, createWebHistory } from 'vue-router'

import MainView from '@/views/MainView.vue'
import CatalogView from '@/views/CatalogView.vue'
import CatalogCategory from '@/components/categories/CatalogCategory.vue'
import CatalogProducts from '@/components/products/CatalogProducts.vue'
import ServiceView from '@/views/ServiceView.vue'
import ServiceReport from '@/components/service/ServiceReport.vue'
import ServiceOther from '@/components/service/ServiceOther.vue'
import ProductView from '@/views/ProductView.vue'
import DealersView from '@/views/DealersView.vue'
import CartView from '@/views/CartView.vue'
import ContactsView from '@/views/ContactsView.vue'
import AboutView from '@/views/AboutView.vue'
import NewsView from '@/views/NewsView.vue'
import ArticlesList from '@/components/articles/ArticlesList.vue'
import ArticleContent from '@/components/articles/ArticleContent.vue'

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
        },
        {
          path: 'products',
          name: 'search',
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
          component: ServiceReport,
          meta: {
            title: 'Служба заботы'
          }
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
    },
    {
      path: '/dealers',
      name: 'dealers',
      component: DealersView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/news',
      name: 'news',
      component: NewsView,
      children: [
        {
          path: '',
          name: 'newsList',
          component: ArticlesList
        },
        {
          path: '/news/:id',
          name: 'article',
          component: ArticleContent
        }
      ]
    }
  ]
})

export default router
