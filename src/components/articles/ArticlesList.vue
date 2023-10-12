<template>
  <ul v-if="listLoad" class="articles-list">
    <li v-for="article in articles" :key="article?.id" class="articles-list__item">
      <article-card :article="article" />
    </li>
  </ul>
  <ul class="articles-list" v-else>
    <li class="articles-list__item" v-for="n in 3" :key="n">
      <skeleton-article></skeleton-article>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'

import ArticleCard from '@/components/articles/ArticleCard.vue'
import SkeletonArticle from '@/components/articles/SkeletonArticle.vue'

import type { PropType } from 'vue'
import type { ArticleType } from '@/types/responseType'

const props = defineProps({
  articles: {
    type: Array as PropType<ArticleType[]>,
    required: true,
    default: () => []
  },
  listLoad: {
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
.articles-list {
  display: flex;
  flex-wrap: wrap;
  row-gap: 30px;

  width: 100%;
  justify-content: space-between;

  @media (min-width: 1440px) {
    justify-content: center;
    gap: 30px 15px;
  }
}
</style>
