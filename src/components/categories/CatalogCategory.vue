<template>
  <section class="category">
    <h2 class="visually-hidden">Католог категорий</h2>
    <ul v-if="isLoad" class="category__list">
      <li class="category__list-item" v-for="category in categories" :key="category.id">
        <category-card :category="category"></category-card>
      </li>
    </ul>
    <ul class="category__list" v-else>
      <li class="category__list-item" v-for="n in 6" :key="n">
        <skeleton-category></skeleton-category>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import CategoryCard from '@/components/categories/CategoryCard.vue'
import SkeletonCategory from '@/components/categories/SkeletonCategory.vue'

import type { CategoryType } from '@/types/responseType'
import { onUnmounted } from 'vue'

const props = defineProps({
  categories: {
    type: Array as PropType<CategoryType[]>,
    required: true
  },
  isLoad: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['onUnmounted'])

onUnmounted(() => {
  emits('onUnmounted')
})
</script>

<style scoped lang="scss">
.category {
  padding: 30px 15px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 30px;
  }

  &__list-item {
    margin-bottom: 30px;
  }
}
</style>
