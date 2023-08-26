<template>
  <the-header class="header"></the-header>
  <base-slider
    class="slider"
    :havePagination="true"
    :width="deviceWidth"
    :carousel="true"
    :height="100"
  >
    <div
      v-for="slide in data"
      :key="slide.id"
      class="slider__slide slider__slide--active"
      :style="{ width: deviceWidth + 'px' }"
    >
      <img class="slider__background" :src="slide.image" :alt="slide.title" />
      <p class="slider__title h3">{{ slide.title }}</p>
      <p class="slider__description p_hg">{{ slide.description }}</p>
      <a v-if="slide?.link" class="slider__link p_hg">Подробнее</a>
    </div>
  </base-slider>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import baseSlider from '@/components/base/baseSlider.vue'
import { ref } from 'vue'

const deviceWidth = window.innerWidth

const data = [
  {
    id: 0,
    image: 'src/assets/images/1.jpg',
    title: 'Исключительное качество без компромиссов',
    description: 'Ножи «Tuotown» – это главный инструмент поваров и секрет кулинарного мастерства',
    link: '#'
  },
  {
    id: 1,
    image: 'src/assets/images/1.jpg',
    title: 'Слайд 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  },
  {
    id: 2,
    image: 'src/assets/images/1.jpg',
    title: 'Слайд 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    link: '#'
  },
  {
    id: 3,
    image: 'src/assets/images/1.jpg',
    title: 'Слайд 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  },
  {
    id: 4,
    image: 'src/assets/images/1.jpg',
    title: 'Слайд 5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  },
  {
    id: 5,
    image: 'src/assets/images/1.jpg',
    title: 'Слайд 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    link: '#'
  },
  {
    id: 6,
    image: 'src/assets/images/1.jpg',
    title: 'Слайд 7',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  }
]
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;

  z-index: 9999;
}
.slider {
  &__slide {
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

  &__background {
    position: absolute;
    bottom: 0;
    left: 0;

    object-fit: cover;

    width: 100%;
    height: 63vh;
    z-index: -1;
  }

  &__title {
    position: relative;
    z-index: 3;

    color: $white;
    text-transform: uppercase;

    margin-bottom: 15px;
  }

  &__description {
    position: relative;
    color: $white;

    font-weight: 400;
    line-height: 140%;

    max-width: 215px;

    margin-bottom: 8px;

    z-index: 3;
  }

  &__link {
    position: relative;
    display: inline-block;

    z-index: 3;
    color: $white;
    font-weight: 600;
    text-transform: uppercase;

    border: 2px solid $red-active;
    padding: 16px 34px;
    border-radius: 27px;

    transition: 0.3s;
    cursor: pointer;

    &:hover {
      border-radius: 0;
    }

    &:active {
      color: $red-active;
    }
  }
}
</style>
