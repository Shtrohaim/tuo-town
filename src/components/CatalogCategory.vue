<template>
  <section class="category container">
    <h2 class="visually-hidden">Католог категорий</h2>
    <ul class="category__list">
      <li class="category__list-item" v-for="category in categories" :key="category.id">
        <category-card :category="category"></category-card>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import CategoryCard from '@/components/CategoryCard.vue'

import type { CategoryType } from '@/types/responseType'

const props = defineProps({
  categories: {
    type: Object as PropType<CategoryType>
  }
})
</script>

<style scoped lang="scss">
.category {
  &__list {
    display: flex;
    flex-wrap: wrap;
  }

  &__list-item {
    margin-bottom: 30px;
  }
}
</style>
