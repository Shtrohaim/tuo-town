<template>
  <section class="products container">
    <h2 class="visually-hidden">Католог продуктов</h2>
    <ul class="products__list">
      <li class="products__list-item" v-for="product in products" :key="product.id">
        <product-card :product="product"></product-card>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import ProductCard from '@/components/ProductCard.vue'

import type { ProductsType } from '@/types/responseType'

const props = defineProps({
  products: {
    type: Object as PropType<ProductsType>,
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
