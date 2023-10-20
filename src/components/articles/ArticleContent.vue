<template>
  <div class="article" v-if="articleLoad">
    <nav class="article__nav">
      <ul class="p_md article__nav-list">
        <li class="article__nav-list-item">
          <router-link :to="{ name: 'main' }"> Главная </router-link>
        </li>
        <li class="article__nav-list-item">
          <router-link :to="{ path: '/news' }"> Новости </router-link>
        </li>
        <li class="article__nav-list-item">{{ article.title }}</li>
      </ul>
    </nav>
    <base-image class="article__main-image" :src="article.image" />
    <p class="article__text p_hg">{{ article.description }}</p>
    <base-slider
      class="article__slider"
      :carousel="false"
      :have-pagination="false"
      :height="sliderHeight"
    >
      <base-image
        class="article__slide"
        v-for="(slide, index) in article.gallery"
        :key="index"
        :src="slide"
      />
    </base-slider>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import BaseImage from '@/components/ui/BaseImage.vue'
import BaseSlider from '@/components/ui/BaseSlider.vue'

import type { ArticleType } from '@/types/responseType'
import type { PropType } from 'vue'

const props = defineProps({
  article: {
    type: Object as PropType<ArticleType>,
    required: true
  },
  articleLoad: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['onUnmounted'])

const sliderHeight = ref(window.innerWidth < 768 ? 230 : window.innerWidth < 1440 ? 358 : 450)

const resize = () => {
  sliderHeight.value = window.innerWidth < 768 ? 230 : window.innerWidth < 1440 ? 358 : 450
}

onMounted(() => {
  addEventListener('resize', resize)
})

onUnmounted(() => {
  removeEventListener('resize', resize)
  emits('onUnmounted')
})
</script>

<style scoped lang="scss">
.article {
  &__main-image {
    width: 100%;
    min-width: 290px;
    max-width: 400px;
    max-height: 350px;
    border-radius: 15px;

    overflow: hidden;

    margin: 0 auto 30px;

    @media (min-width: 1440px) {
      float: left;
      margin-right: 30px;
      margin-bottom: 15px;

      max-width: 450px;
      max-height: 500px;
    }
  }

  &__nav-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px 10px;

    margin-bottom: 15px;

    @media (min-width: 768px) {
      margin-bottom: 30px;
    }
  }

  &__nav-list-item {
    color: $gray-light;

    @media (min-width: 1440px) {
      &:hover {
        color: $red-active;

        &:after {
          color: $gray-light;
        }
      }
    }

    &:active {
      color: $red-active;

      &:after {
        color: $gray-light;
      }
    }

    &:after {
      content: '-';
      font-size: 16px;
      margin-left: 5px;
    }

    &:last-child {
      @media (min-width: 1440px) {
        color: $gray-light;

        &::after {
          content: '';
        }
      }

      &:active {
        color: $gray-light;
      }

      &::after {
        content: '';
      }
    }
  }

  &__text {
    color: $white;
    line-height: 140%;

    margin-bottom: 30px;

    @media (min-width: 1440px) {
      margin-top: 50px;
    }
  }

  &__slide {
    min-width: 250px;
    margin-right: 15px;

    border-radius: 15px;

    overflow: hidden;

    @media (min-width: 768px) {
      min-width: 450px;
    }

    @media (min-width: 1440px) {
      min-width: 600px;
    }
  }
}
</style>
