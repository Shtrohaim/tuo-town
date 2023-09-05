<template>
  <main v-if="isLoad" class="catalog">
    <div class="catalog__banner container">
      <h1 class="catalog__title h3">{{ catalog.title }}</h1>
      <p class="catalog__description p_hg">{{ catalog.description }}</p>
      <img class="catalog__background" :src="`${catalog.image}`" />
    </div>
    <section class="catalog__category container">
      <h2 class="visually-hidden">Католог {{ catalog.title }}</h2>
      <ul class="catalog__category-list">
        <li
          class="catalog__category-list-item"
          v-for="category in catalog.category"
          :key="category.id"
        >
          <category-card :category="category"></category-card>
        </li>
      </ul>
    </section>
    <section class="catalog__recommendation">
      <h2 class="visually-hidden">Рекомендованные каталоги</h2>
      <base-slider
        :carousel="false"
        :havePagination="false"
        :width="144"
        :height="15"
        class="catalog__slider"
      >
        <div v-for="slide in slides" :key="slide.id" class="catalog__slide">
          <h3>{{ slide.title }}</h3>
          <img :src="slide.image" />
        </div>
      </base-slider>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import BaseSlider from '@/components/base/BaseSlider.vue'
import CategoryCard from '@/components/CategoryCard.vue'

import productsServices from '@/services/productsServices'
import recommendationService from '@/services/recommendationService'

const route = useRoute()
const isLoad = ref(false)

const catalog_id = Number(route.params.id)
const catalog = ref()
const slides = ref()

const fetchCatalog = async () => {
  await productsServices.getCatalog(catalog_id).then((res) => {
    catalog.value = res.data
    isLoad.value = true
  })
}

const fetchRecommendation = async () => {
  await recommendationService.getCatalogRecommendation().then((res) => {
    slides.value = res.data
  })
}

onMounted(async () => {
  await fetchCatalog()
  await fetchRecommendation()
})
</script>

<style scoped lang="scss">
.catalog {
  &__banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    position: relative;
    width: 100%;
    height: 40vh;
  }

  &__title {
    z-index: 1;

    margin-bottom: 15px;

    color: $white;
    text-transform: uppercase;
  }

  &__description {
    z-index: 1;

    color: $white;
    font-weight: 400;
    line-height: 140%;
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    object-fit: cover;
    z-index: 0;
  }

  &__category-list {
    display: flex;
    flex-wrap: wrap;
  }

  &__category-list-item {
    margin-bottom: 30px;
  }
}
</style>
