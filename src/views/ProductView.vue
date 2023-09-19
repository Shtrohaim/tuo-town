<template>
  <main class="product" v-if="isLoad">
    <div class="product__head">
      <div class="product__head-wrapper">
        <h1 class="product__title h3">{{ product.name }}</h1>
        <p class="product__description p_hg">{{ product.description }}</p>
        <base-button class="product__buy-button" :filled="true">Купить</base-button>
        <span class="product__cost p_hg">{{ textTransform().priceTransform(product.price) }}</span>
      </div>
      <base-image :src="product.background" class="product__background" />
    </div>
    <section class="product__slogan container">
      <h2 class="visually-hidden">Наш слоган</h2>
      <div class="product__slogan-first">
        <base-image class="product__slogan-image" :src="Slogan1" />
        <h3 class="h4 product__slogan-title">Исключительное качество без компромиссов</h3>
        <p class="product__slogan-description p_md">
          Ножи «Tuotown» — это главный инструмент поваров и секрет кулинарного мастерства
        </p>
      </div>
      <div class="product__slogan-second">
        <base-image class="product__slogan-image" :src="Slogan2" />
        <h3 class="h4 product__slogan-title">Исключительное качество без компромиссов</h3>
        <p class="product__slogan-description p_md">
          Ножи «Tuotown» — это главный инструмент поваров и секрет кулинарного мастерства
        </p>
      </div>
    </section>
    <section class="product__about">
      <div class="product__gallery">
        <base-slider class="product__slider" :height="166">
          <div class="product__slide" v-for="(slide, index) in product.gallery" :key="index">
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
      <div class="product__characteristics">
        <h3 class="h4 product__characteristics-title">Храктеристики</h3>
        <base-image class="product__scheme" :src="product.scheme" />
        <ul>
          <li class="p_hg" v-for="characteristic in characteristics" :key="characteristic.id">
            <span>{{ characteristic.name }}</span>
            <span>{{ characteristic.value }}</span>
          </li>
        </ul>
        <button @click="toggleCharacteristics">{{ moreCharacteristics }}</button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import BaseImage from '@/components/ui/BaseImage.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseSlider from '@/components/ui/BaseSlider.vue'

import Slogan1 from '@/assets/images/slogan1.jpg'
import Slogan2 from '@/assets/images/slogan2.jpg'

import productsServices from '@/services/productsServices'
import textTransform from '../utils/textTransform'

const route = useRoute()

const isLoad = ref(false)
const product = ref()
const video = ref()
const characteristicCount = ref(4)

const fetchProduct = async () => {
  await productsServices.getProduct(Number(route.params.id)).then((res) => {
    product.value = res.data
    isLoad.value = true
  })
}

const toggleCharacteristics = () => {
  characteristicCount.value =
    characteristicCount.value === product.value.characteristics.length
      ? 4
      : product.value.characteristics.length
}

const moreCharacteristics = computed(() => {
  return characteristicCount.value === product.value.characteristics.length
    ? 'Меньше характеристик'
    : 'Больше характеристик'
})

const characteristics = computed(() => {
  return product.value.characteristics.slice(0, characteristicCount.value)
})

onMounted(async () => {
  await fetchProduct()
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
    padding: 75px 15px;
    z-index: 20;
  }

  &__title {
    color: $white;
    line-height: normal;

    margin-bottom: 15px;
  }

  &__description {
    color: $white;
    line-height: 140%;

    margin-bottom: 10px;
  }

  &__buy-button {
    margin-right: 30px;
    min-width: 165px;
  }

  &__cost {
    line-height: normal;
    color: $white;
  }

  &__background {
    position: absolute;
    top: 0;
    height: 100%;

    z-index: 0;
  }

  &__slogan-first {
    margin-bottom: 72px;
  }

  &__slogan-second {
    margin-bottom: 42px;
  }

  &__slogan-image {
    width: 100%;

    border-radius: 15px;
    overflow: hidden;

    margin-bottom: 20px;
  }

  &__slogan-title {
    color: $white;
    font-weight: 500;
    line-height: normal;

    margin-bottom: 10px;
  }

  &__slogan-description {
    color: $white;
    line-height: normal;
  }

  &__about {
    background: $background-dark;
    padding: 30px 0;
  }

  &__slider {
    margin-bottom: 30px;
  }

  &__slide {
    width: 290px;

    margin-right: 8px;

    &:first-child {
      margin-left: 15px;
    }
  }

  &__slide-image {
    width: 290px;

    border-radius: 15px;
    overflow: hidden;
  }

  &__video {
    width: 100%;
    height: 100%;
    min-height: 175px;
    max-height: 175px;

    border-radius: 15px;
  }
}
</style>
