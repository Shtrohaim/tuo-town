<template>
  <a href="#" class="article-card">
    <div class="article-card__wrapper">
      <base-image :src="article.image" class="article-card__background" />
      <div class="article-card__title-background">
        <h3 class="article-card__title p_hg">{{ article.title }}</h3>
      </div>
      <span class="article-card__date p_sm">{{ getLocalDate(article.date) }}</span>
    </div>
  </a>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import type { ArticleType } from '@/types/responseType'

import getLocalDate from '@/utils/date'
import BaseImage from '@/components/base/BaseImage.vue'

const props = defineProps({
  article: {
    type: Object as PropType<ArticleType>,
    required: true
  }
})
</script>

<style scoped lang="scss">
.article-card {
  display: block;
  width: 100%;
  min-width: 290px;

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    width: 100%;
    min-height: 280px;

    overflow: hidden;

    border-radius: 14px;
  }

  &__background {
    position: absolute;

    object-fit: cover;

    width: 100%;
    height: 100%;

    top: 0;
    left: 0;
    z-index: 0;
  }

  &__title {
    display: block;

    font-weight: 500;
    color: $white;
    line-height: 24px;

    z-index: 2;
  }

  &__date {
    display: block;
    position: absolute;
    top: 10px;
    right: 10px;

    font-weight: 400;
    color: $white;
    line-height: 24px;

    z-index: 1;
  }

  &__title-background {
    display: inline-block;
    position: absolute;
    bottom: 0;

    width: 100%;

    padding: 15px;

    background-size: 100% 200%;
    background-image: linear-gradient(to top, $red-active 50%, rgba(0 0 0 / 0) 50%);

    transition: all 0.3s ease;
  }

  &:hover {
    .article-card__title-background {
      background-position: 0 100%;
    }
  }
}
</style>
