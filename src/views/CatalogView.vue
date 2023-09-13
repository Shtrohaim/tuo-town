<template>
  <main class="catalog">
    <div class="catalog__banner container">
      <h1 v-if="isLoad.catalogHead" class="catalog__title h3">{{ catalog?.title }}</h1>
      <h1 v-else class="catalog__title h3">Католог TuoTown</h1>
      <p v-if="isLoad.catalogHead" class="catalog__description p_hg">{{ catalog?.description }}</p>
      <base-image
        v-if="isLoad.catalogHead"
        class="catalog__background"
        :src="`${catalog?.image}`"
      />
    </div>
    <router-view
      class="catalog__content"
      :categories="catalog?.category"
      :products="catalog?.products"
      :filter="filter"
      :isLoad="isLoad.catalog"
      :filterLoad="isLoad.filter"
      :totalItems="totalItems"
      @onUnmounted="catalogUnmounted"
      @onFiltered="fetchFilteredProduct"
      @onPagination="fetchFilteredProduct"
    ></router-view>
    <section class="catalog__recommendation">
      <h2 class="visually-hidden">Рекомендованные каталоги</h2>
      <div class="catalog__recommendation-wrapper">
        <base-slider
          v-if="isLoad.recommendations"
          :carousel="false"
          :havePagination="false"
          :slideWidth="167"
          :height="70"
          class="catalog__slider"
        >
          <div v-for="slide in slides" :key="slide.id" class="catalog__slide">
            <h3 class="catalog__slide-title p_hg">{{ slide.title }}</h3>
            <base-image class="catalog__slide-background" :src="slide.image" />
          </div>
        </base-slider>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import BaseSlider from '@/components/ui/BaseSlider.vue'
import BaseImage from '@/components/ui/BaseImage.vue'

import productsServices from '@/services/productsServices'
import recommendationService from '@/services/recommendationService'

import type { CatalogRecommendationType } from '@/types/responseType'

const route = useRoute()
const isLoad = ref({
  catalog: false,
  recommendations: false,
  filter: false,
  catalogHead: false
})

const catalog_id = ref(Number(route.params.id))
const catalog = ref<any>()
const slides = ref<CatalogRecommendationType[]>()
const filter = ref<any[]>()
const totalItems = ref(0)

const fetchCategoryCatalog = async () => {
  await productsServices.getCategoryCatalog(catalog_id.value).then((res) => {
    catalog.value = res.data
    isLoad.value.catalog = true
    isLoad.value.catalogHead = true
  })
}

const fetchProductCatalog = async () => {
  await productsServices.getProductCatalog(catalog_id.value).then((res) => {
    catalog.value = res.data
    isLoad.value.catalog = true
    isLoad.value.catalogHead = true
  })
}

const fetchFilteredProduct = async () => {
  const queryFilter = route.query
  isLoad.value.catalog = false
  let stringFilter = ''
  for (let item in queryFilter) {
    if (item === 'min_price') stringFilter += `&price_gte=${queryFilter[item]}`
    else if (item === 'max_price') stringFilter += `&price_lte=${queryFilter[item]}`
    else if (item === 'ff1') stringFilter += `&${item}.activate=true`
    else if (item === 'page') stringFilter += `&_page=${queryFilter[item]}`
    else if (item === 'limit') stringFilter += `&_limit=${queryFilter[item]}`
    else if (String(queryFilter[item]).trim() !== '') {
      if (Array.isArray(queryFilter[item])) {
        for (let i in queryFilter[item] as any) {
          stringFilter += `&${item}=${queryFilter[item]?.[i]}`
        }
      } else stringFilter += `&${item}=${queryFilter[item]}`
    }
  }
  await productsServices
    .getFilteredProduct({ id: catalog_id.value, filter: stringFilter })
    .then((res) => {
      catalog.value.products = res.data
      totalItems.value = res.headers['x-total-count']
      isLoad.value.catalog = true
    })
}

const fetchProductFilter = async () => {
  await productsServices.getProductFilter(catalog_id.value).then((res) => {
    filter.value = res.data
    isLoad.value.filter = true
  })
}

const fetchRecommendation = async () => {
  await recommendationService.getCatalogRecommendation().then((res) => {
    slides.value = res.data
    isLoad.value.recommendations = true
  })
}

const catalogUnmounted = async () => {
  catalog_id.value = Number(route.params.id)
  if (route.name === 'category') {
    await fetchCategoryCatalog()
  }

  if (route.name === 'products') {
    await fetchProductCatalog()
    await fetchProductFilter()
  }
}

onMounted(async () => {
  await catalogUnmounted()
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

  &__recommendation {
    padding: 30px 0;

    border-top: 1px solid $border-line;
    border-bottom: 1px solid $border-line;
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

    border-radius: 15px;

    overflow: hidden;
  }

  &__slide-background {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

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
