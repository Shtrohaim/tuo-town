<template>
  <section class="products container">
    <h2 class="visually-hidden">Католог продуктов</h2>
    <ul v-if="isLoad" class="products__list">
      <li class="products__list-item" v-for="product in products" :key="product.id">
        <product-card :product="product"></product-card>
      </li>
    </ul>
    <ul class="products__list" v-else>
      <li class="products__list-item" v-for="n in 8" :key="n">
        <skeleton-products></skeleton-products>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import ProductCard from '@/components/products/ProductCard.vue'

import type { ProductsType } from '@/types/responseType'
import SkeletonProducts from '@/components/products/SkeletonProducts.vue'

const props = defineProps({
  products: {
    type: Object as PropType<ProductsType>,
    required: true
  },
  isLoad: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped lang="scss">
.products {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  &__list-item {
    margin-bottom: 30px;
  }
}
</style>
