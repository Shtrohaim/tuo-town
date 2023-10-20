<template>
  <main class="product">
    <div class="product__head">
      <div class="product__head-wrapper">
        <h1 v-if="isLoad.product" class="product__title h3">{{ product.name }}</h1>
        <h1 v-else class="product__title h3">Ножи TuoTown</h1>
        <p v-if="isLoad.product" class="product__description p_hg">{{ product?.description }}</p>
        <p v-else class="product__description p_hg">
          Ножи «Tuotown» – это главный инструмент поваров и секрет кулинарного мастерства
        </p>
        <base-button @onClick="addProduct" class="product__buy-button" :filled="true"
          >Купить</base-button
        >
        <span v-if="isLoad.product" class="product__cost p_hg">{{
          textTransform().priceTransform(product.price)
        }}</span>
      </div>
      <base-image v-if="isLoad.product" :src="product.background" class="product__background" />
    </div>
    <section class="product__slogan container">
      <h2 class="visually-hidden">Наш слоган</h2>
      <div class="product__slogan-first" v-if="isLoad.product">
        <base-image class="product__slogan-image" :src="Slogan1" />
        <div class="product__slogan-text">
          <h3 class="h4 product__slogan-title">Исключительное качество без компромиссов</h3>
          <p class="product__slogan-description p_md">
            Ножи «Tuotown» — это главный инструмент поваров и секрет кулинарного мастерства
          </p>
        </div>
      </div>
      <div class="product__slogan-second" v-if="isLoad.product">
        <base-image class="product__slogan-image" :src="Slogan2" />
        <div class="product__slogan-text">
          <h3 class="h4 product__slogan-title">Исключительное качество без компромиссов</h3>
          <p class="product__slogan-description p_md">
            Ножи «Tuotown» — это главный инструмент поваров и секрет кулинарного мастерства
          </p>
        </div>
      </div>
    </section>
    <section class="product__about" v-if="isLoad.product">
      <div class="product__gallery">
        <base-slider class="product__slider" :height="sliderHeight">
          <div class="product__slide" v-for="(slide, index) in product?.gallery" :key="index">
            <base-image class="product__slide-image" :src="slide" />
          </div>
        </base-slider>
      </div>
      <iframe
        ref="video"
        class="product__video"
        src="https://www.youtube.com/embed/-CAgNu1qiOQ?si=CGsIoW1HJFKBd34Z"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      >
        <p class="p_hg">Ваш браузер не поддерживает видеоплеер.</p>
      </iframe>
      <div class="product__characteristics container">
        <h3 class="h4 product__characteristics-title">Храктеристики</h3>
        <base-image class="product__scheme" :src="product?.scheme" />
        <ul class="product__characteristics-list">
          <li
            class="p_hg product__characteristics-list-item"
            v-for="characteristic in characteristics"
            :key="characteristic.id"
          >
            <span class="product__characteristics-name">{{ characteristic.name }}</span>
            <span class="product__characteristics-value"
              >{{ characteristic.value }}
              {{ typeof characteristic.value === 'number' ? 'см' : '' }}</span
            >
          </li>
        </ul>
        <base-button
          class="product__characteristics-more"
          :icon="true"
          @onClick="toggleCharacteristics"
        >
          <svg class="icon24 fill-gray">
            <use
              v-if="characteristicCount !== Object.keys(product.characteristics).length"
              href="@/assets/images/svg/plusIcon.svg#icon"
            ></use>
            <use v-else href="@/assets/images/svg/minusIcon.svg#icon"></use>
          </svg>
          <span>{{ moreCharacteristics }}</span>
        </base-button>
      </div>
    </section>
    <section class="product__recommendation container">
      <h2 class="visually-hidden">Рекомендации</h2>
      <div class="product__accessories">
        <h3 class="h4 product__recommendation-title">Аксессуары ({{ accessories.count }})</h3>
        <ul v-if="isLoad.accessories" class="product__recommendation-list">
          <li
            v-for="product in accessories.products"
            :key="product.id"
            class="product__recommendation-list-item"
          >
            <product-card :product="product" />
          </li>
        </ul>
        <ul v-else class="product__recommendation-list">
          <li v-for="i in 4" :key="i" class="product__recommendation-list-item">
            <skeleton-products />
          </li>
        </ul>
      </div>
      <div class="product__see-also">
        <h3 class="h4 product__recommendation-title">Смотрите также</h3>
        <ul v-if="isLoad.also" class="product__recommendation-list">
          <li
            v-for="product in seeAlso"
            :key="product.id"
            class="product__recommendation-list-item"
          >
            <product-card :product="product" />
          </li>
        </ul>
        <ul v-else class="product__recommendation-list">
          <li v-for="i in 4" :key="i" class="product__recommendation-list-item">
            <skeleton-products />
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, markRaw, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import BaseImage from '@/components/ui/BaseImage.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseSlider from '@/components/ui/BaseSlider.vue'
import ProductCard from '@/components/products/ProductCard.vue'
import SkeletonProducts from '@/components/products/SkeletonProducts.vue'

import Slogan1 from '@/assets/images/slogan1.jpg'
import Slogan2 from '@/assets/images/slogan2.jpg'

import productsServices from '@/services/productsServices'
import recommendationService from '@/services/recommendationService'

import textTransform from '../utils/textTransform'
import type { ProductsType } from '@/types/responseType'
import cartServices from '@/services/cartServices'
import router from '@/router'

const route = useRoute()

const isLoad = ref({
  product: false,
  also: false,
  accessories: false
})
const product = ref({} as ProductsType)
const characteristicCount = ref(4)
const accessories = ref({
  count: 9,
  products: [] as ProductsType[]
})
const seeAlso = ref<ProductsType[]>()
const productId = ref(Number(route.params.id))

const sliderHeight = ref(window.innerWidth < 768 ? 166 : window.innerWidth < 1440 ? 358 : 550)

const fetchProduct = async () => {
  await productsServices.getProduct(productId.value).then((res) => {
    product.value = res.data
    isLoad.value.product = true
  })
}

const addProduct = async () => {
  await cartServices.postCartProduct(product.value).finally(() => {
    router.push({ name: 'cart' })
  })
}

const fetchRecommendation = async () => {
  await recommendationService
    .getRecommendation(product.value?.categoryId, product.value?.id)
    .then((res) => {
      seeAlso.value = res.data
      accessories.value.products = res.data
      accessories.value.count = res.headers['x-total-count']
      isLoad.value.also = true
      isLoad.value.accessories = true
    })
}

const toggleCharacteristics = () => {
  characteristicCount.value =
    characteristicCount.value === Object.keys(product.value.characteristics).length
      ? 4
      : Object.keys(product.value.characteristics).length
}

const moreCharacteristics = computed(() => {
  return characteristicCount.value === Object.keys(product.value.characteristics).length
    ? 'Меньше характеристик'
    : 'Больше характеристик'
})

const characteristics = computed(() => {
  return Object.entries(product.value.characteristics)
    .slice(0, characteristicCount.value)
    .map((entry) => entry[1])
})

const resize = () => {
  sliderHeight.value = window.innerWidth < 768 ? 166 : window.innerWidth < 1440 ? 358 : 550
}

watch(productId, async () => {
  await fetchProduct()
  await fetchRecommendation()
})

onUpdated(() => {
  productId.value = Number(route.params.id)
})

onMounted(async () => {
  await fetchProduct()
  await fetchRecommendation()
  addEventListener('resize', resize)
})

onUnmounted(() => {
  removeEventListener('resize', resize)
})
</script>

<style scoped lang="scss">
.product {
  &__head {
    position: relative;

    height: 100vh;
  }

  &__head-wrapper {
    position: relative;
    width: 100%;
    flex-shrink: 0;
    padding: 75px 15px;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      content: '';

      background: linear-gradient(180deg, #000 45%, rgba(0, 0, 0, 0) 100%);

      width: 100%;
      height: 80vh;
      z-index: 2;

      @media (min-width: 1440px) {
        background: linear-gradient(268deg, rgba(0, 0, 0, 0) 21.45%, #000 85.16%);
        height: 100vh;
      }
    }

    @media (min-width: 768px) {
      padding: 130px 69px;
    }

    @media (min-width: 1440px) {
      padding: 149px 189px;
    }
  }

  &__title {
    position: relative;
    z-index: 3;

    color: $white;
    line-height: normal;

    margin-bottom: 15px;
  }

  &__description {
    position: relative;
    z-index: 3;

    color: $white;
    line-height: 140%;

    margin-bottom: 10px;

    @media (min-width: 768px) {
      margin-bottom: 30px;
    }
  }

  &__buy-button {
    margin-right: 30px;
    min-width: 165px;
  }

  &__cost {
    position: relative;
    z-index: 3;

    line-height: normal;
    color: $white;
  }

  &__background {
    position: absolute;
    bottom: 0;
    left: 0;

    object-fit: cover;

    width: 100%;
    height: 63vh;
    z-index: 0;

    @media (min-width: 1440px) {
      top: 0;
      height: 100%;
    }
  }

  &__slogan-first {
    margin-bottom: 72px;

    @media (min-width: 768px) {
      display: flex;
      column-gap: 30px;
    }

    @media (min-width: 1440px) {
      margin-bottom: 89px;
      align-items: center;
      column-gap: 140px;
    }
  }

  &__slogan-second {
    margin-bottom: 42px;

    @media (min-width: 768px) {
      display: flex;
      flex-direction: row-reverse;
      column-gap: 30px;
    }

    @media (min-width: 1440px) {
      margin-bottom: 90px;
      align-items: center;
      column-gap: 140px;
    }
  }

  &__slogan-text {
    @media (min-width: 1440px) {
      max-width: 350px;
    }
  }

  &__slogan-image {
    width: 100%;
    max-width: 500px;

    border-radius: 15px;
    overflow: hidden;

    margin: 0 auto 20px;
  }

  &__slogan-title {
    color: $white;
    font-weight: 500;
    line-height: normal;

    margin-bottom: 10px;

    @media (min-width: 768px) {
      margin-bottom: 25px;
    }
  }

  &__slogan-description {
    color: $white;
    line-height: normal;
  }

  &__about {
    display: flex;
    flex-direction: column;
    background: $background-dark;
    padding: 30px 0;

    @media (min-width: 1440px) {
      padding: 90px 0;
    }
  }

  &__slider {
    margin-bottom: 30px;

    @media (min-width: 768px) {
      margin-bottom: 90px;
    }

    @media (min-width: 1440px) {
      max-width: 1920px;
      margin: 0 auto;
    }
  }

  &__slide {
    width: 290px;

    margin-right: 8px;

    @media (min-width: 768px) {
      width: 630px;
      margin-right: 15px;
    }

    @media (min-width: 1440px) {
      width: 940px;
    }

    &:first-child {
      margin-left: 15px;
    }
  }

  &__slide-image {
    width: 290px;

    @media (min-width: 768px) {
      width: 630px;
    }

    @media (min-width: 1440px) {
      width: 940px;
    }

    border-radius: 15px;
    overflow: hidden;
  }

  &__video {
    width: 100%;
    height: 100%;
    min-height: 175px;
    max-height: 175px;

    border-radius: 15px;

    @media (min-width: 768px) {
      min-height: 408px;
    }

    @media (min-width: 1440px) {
      min-height: 900px;
      max-width: 1920px;
      margin: 0 auto;
    }
  }

  &__characteristics {
    @media (min-width: 1440px) {
      display: grid;
      grid-template-columns: 40% 60%;
      grid-template-rows: 1fr auto 1fr;
      column-gap: 125px;
    }
  }

  &__characteristics-title {
    color: $white;
    line-height: normal;
    text-decoration: 2px underline $red-active;
    text-underline-offset: 5px;
    text-align: center;

    margin-bottom: 35px;

    @media (min-width: 768px) {
      margin-bottom: 68px;
    }

    @media (min-width: 1440px) {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 2;
      grid-column-end: 3;
      align-self: end;
      justify-self: start;
      margin-bottom: 25px;
    }
  }

  &__scheme {
    width: 100%;

    max-width: 144px;

    overflow: hidden;

    margin: 0 auto 30px;

    border-radius: 15px;

    @media (min-width: 768px) {
      max-width: 250px;
    }

    @media (min-width: 1440px) {
      max-width: 407px;
      max-height: 620px;

      grid-row-start: 1;
      grid-row-end: 4;
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }

  &__characteristics-list {
    display: flex;
    flex-direction: column;
    row-gap: 15px;

    margin-bottom: 20px;

    @media (min-width: 768px) {
      margin-bottom: 30px;
    }

    @media (min-width: 1440px) {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 2;
      grid-column-end: 3;

      max-width: 550px;

      height: fit-content;
    }
  }

  &__characteristics-list-item {
    display: flex;
    justify-content: space-between;

    color: $white;

    padding-bottom: 10px;

    border-bottom: 1px solid $gray-border;
  }

  &__characteristics-name {
    min-width: fit-content;
    line-height: 140%;
  }

  &__characteristics-value {
    text-align: end;
    line-height: 140%;
  }

  &__characteristics-more {
    display: flex;
    align-items: center;

    width: fit-content;

    column-gap: 15px;

    color: $gray-light;

    @media (min-width: 1440px) {
      grid-row-start: 3;
      grid-row-end: 4;
      grid-column-start: 2;
      grid-column-end: 3;

      align-self: start;
    }
  }

  &__accessories {
    margin-bottom: 60px;
  }

  &__recommendation-title {
    color: $white;
    text-decoration: 2px underline $red-active;
    text-underline-offset: 10px;

    margin-bottom: 27px;

    @media (min-width: 768px) {
      margin-bottom: 38px;
    }
  }

  &__recommendation-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px 14px;

    @media (min-width: 768px) {
      gap: 30px 29px;
    }

    @media (min-width: 1440px) {
      gap: 0;
      justify-content: space-between;
    }
  }
}
</style>
