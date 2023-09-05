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
      <div class="catalog__recommendation-wrapper">
        <base-slider
          :carousel="false"
          :havePagination="false"
          :slideWidth="167"
          :height="70"
          class="catalog__slider"
        >
          <div v-for="slide in slides" :key="slide.id" class="catalog__slide">
            <h3 class="catalog__slide-title p_hg">{{ slide.title }}</h3>
            <img class="catalog__slide-background" :src="slide.image" />
          </div>
        </base-slider>
      </div>
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
  })
}

const fetchRecommendation = async () => {
  await recommendationService.getCatalogRecommendation().then((res) => {
    slides.value = res.data
    isLoad.value = true
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

    margin-top: 30px;
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

    filter: brightness(60%);
  }

  &__category-list {
    display: flex;
    flex-wrap: wrap;
  }

  &__category-list-item {
    margin-bottom: 30px;
  }

  &__recommendation {
    padding: 30px 0;

    border-top: 1px solid rgba(255 255 255 / 10%);
    border-bottom: 1px solid rgba(255 255 255 / 10%);
  }

  &__recommendation-wrapper {
    min-width: 320px;
    max-width: 1290px;
    width: 100%;

    margin: 0 auto;
  }

  &__slide {
    position: relative;

    padding: 0 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    flex-shrink: 0;

    min-width: 144px;
    max-width: 144px;
    height: 70px;

    margin-left: 20px;
  }

  &__slide-background {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    border-radius: 15px;

    object-fit: cover;
    z-index: 0;

    filter: brightness(40%);
    pointer-events: none;
  }

  &__slide-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    line-clamp: 3;
    -webkit-line-clamp: 3;

    z-index: 1;

    color: $white;
    font-weight: 600;
    line-height: normal;

    user-select: none;
  }
}
</style>
