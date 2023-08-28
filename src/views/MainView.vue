<template>
  <main class="main">
    <section class="main__promo">
      <base-slider
        v-if="isLoad"
        class="main__slider"
        :havePagination="true"
        :width="deviceWidth"
        :carousel="true"
        :height="100"
      >
        <div
          v-for="slide in data"
          :key="slide.id"
          class="main__slider-slide main__slider-slide--active"
          :style="{ width: deviceWidth + 'px' }"
        >
          <img class="main__slider-background" :src="slide.image" :alt="slide.title" />
          <p class="main__slider-title h3">{{ slide.title }}</p>
          <p class="main__slider-description p_hg">{{ slide.description }}</p>
          <base-button v-if="slide?.link" :href="'/#'" class="main__slider-link p_hg"
            >Подробнее</base-button
          >
        </div>
      </base-slider>
    </section>
    <section class="main__recommendation">
      <nav class="main__navigation">
        <ul class="main__nav-list">
          <li class="main__nav-list-item">
            <a>
              <svg class="icon46 fill-gray">
                <use href="@/assets/images/svg/knifeIcon.svg#icon"></use>
              </svg>
              <span class="main__list-name p_hg">Кухонные ножи</span>
            </a>
          </li>
          <li class="main__nav-list-item">
            <a>
              <svg class="icon46 fill-gray">
                <use href="@/assets/images/svg/jackknifeIcon.svg#icon"></use>
              </svg>
              <span class="main__list-name p_hg">Складные ножи</span>
            </a>
          </li>
          <li class="main__nav-list-item">
            <a>
              <svg class="icon46 fill-gray">
                <use href="@/assets/images/svg/grindIcon.svg#icon"></use>
              </svg>
              <span class="main__list-name p_hg">Точилки для ножей</span>
            </a>
          </li>
          <li class="main__nav-list-item">
            <a>
              <svg class="icon46 fill-gray">
                <use href="@/assets/images/svg/cookIcon.svg#icon"></use>
              </svg>
              <span class="main__list-name p_hg">Аксессуары для кухни</span>
            </a>
          </li>
        </ul>
      </nav>
      <product-card></product-card>
    </section>
  </main>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import BaseSlider from '@/components/base/BaseSlider.vue'
import { onMounted, ref } from 'vue'

import promoServices from '@/services/promoServices'
import ProductCard from '@/components/ProductCard.vue'

const deviceWidth = window.innerWidth
const data = ref()
const isLoad = ref(false)

const fetchPromo = async () => {
  await promoServices.getMainRecommendations().then((res) => {
    data.value = res.data
    isLoad.value = true
  })
}

onMounted(async () => {
  await fetchPromo()
})
</script>

<style scoped lang="scss">
.main {
  &__slider-slide {
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
    }
  }

  &__slider-background {
    position: absolute;
    bottom: 0;
    left: 0;

    object-fit: cover;

    width: 100%;
    height: 63vh;
    z-index: -1;
  }

  &__slider-title {
    position: relative;
    z-index: 3;

    color: $white;
    text-transform: uppercase;

    margin-bottom: 15px;
  }

  &__slider-description {
    position: relative;
    color: $white;

    font-weight: 400;
    line-height: 140%;

    max-width: 215px;

    margin-bottom: 8px;

    z-index: 3;
  }

  &__recommendation {
    padding: 30px 15px;

    background: $background-light;
  }

  &__nav-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }

  &__list-name {
    display: block;
    color: $gray-light;
    font-weight: 500;

    cursor: pointer;
  }

  &__nav-list-item {
    width: 35%;
    margin-bottom: 30px;
    &:hover {
      svg {
        fill: $red-active;
        cursor: pointer;
      }

      span {
        color: $red-active;
      }
    }
  }
}
</style>
