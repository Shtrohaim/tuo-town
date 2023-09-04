<template>
  <main v-if="isLoad" class="main">
    <h1 class="visually-hidden">Официальный сайт «Tuotown»</h1>
    <section class="main__promo">
      <h2 class="visually-hidden">Промо материалы</h2>
      <base-slider
        class="main__slider"
        :havePagination="true"
        :width="deviceWidth"
        :carousel="true"
        :height="100"
      >
        <div
          v-for="slide in slides"
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
    <section class="main__recommendation container">
      <h2 class="visually-hidden">Рекомендации</h2>
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
      <ul class="main__recommendation-list">
        <li class="main__recommendation-list-item"><category-card></category-card></li>
        <li class="main__recommendation-list-item" v-for="product in products" :key="product.id">
          <product-card :product="product"></product-card>
        </li>
        <li class="main__recommendation-list-item main__recommendation-list-item--instagram">
          <a href="https://www.instagram.com/tuotown/" class="main__instagram-link">
            <img
              src="@/assets/images/instagram.jpg"
              alt="Instagram - ссылка"
              class="main__instagram-image"
            />
            <div class="main__instagram-title">
              <svg class="icon24 fill-white">
                <use href="@/assets/images/svg/instaIcon.svg#icon"></use>
              </svg>
              <span class="p_hg">Instagram</span>
            </div>
          </a>
        </li>
      </ul>
    </section>
    <section class="main__products">
      <h2 class="visually-hidden">Новинки и популярное</h2>
      <nav class="main__tabulation">
        <ul class="main__tab-list">
          <li
            class="main__tab-list-item p_hg"
            :class="{ 'main__tab-list-item--active': tabIndex === 0 }"
            @click="changeTabIndex"
          >
            Новинки
          </li>
          <li
            class="main__tab-list-item p_hg"
            :class="{ 'main__tab-list-item--active': tabIndex === 1 }"
            @click="changeTabIndex"
          >
            Популярное
          </li>
        </ul>
      </nav>
      <ul class="main__tab-content-list">
        <li
          class="main__tab-content-list-item"
          v-for="product in popularAndNew[tabIndex][Object.keys(popularAndNew[tabIndex])[0]]"
          :key="product.id"
        >
          <product-card :product="product"></product-card>
        </li>
      </ul>
    </section>
    <section class="main__about container">
      <h2 class="visually-hidden">О «Tuotown»</h2>
      <div class="main__about-company">
        <img
          class="main__about-image"
          src="@/assets/images/about1.jpg"
          alt="«Tuotown» – легендарные ножи, создающие шедевры"
        />
        <h3 class="main__about-title h3">«Tuotown» – легендарные ножи, создающие шедевры</h3>
        <p class="main__about-description p_sm">
          Компания «Tuotown» – эксклюзивный представитель профессиональных кухонных ножей,
          изготовленных лучшими мастерами Восточной Азии с применением передового европейского
          оборудования и современных материалов. <br />
          <br />
          Они отличаются идеальным балансом и фантастической остротой. Сочетают в себе вековые
          традиции и новейшие разработки. Также предлагаем широкий ассортимент сопутствующих
          товаров.
        </p>
      </div>
      <div class="main__about-knife">
        <img
          class="main__about-image"
          src="@/assets/images/about2.jpg"
          alt="Ножи «Tuotown» – это главный инструмент поваров и секрет кулинарного мастерства"
        />
        <h3 class="main__about-title h3">
          Ножи «Tuotown» – это главный инструмент поваров и секрет кулинарного мастерства
        </h3>
        <p class="main__about-description p_sm">
          Истинная красота ножа — совершённая функциональность и визуальная гармония. Этот предмет
          издревле сопутствовал человеку: от зари цивилизации до сегодняшних дней. <br />
          <br />
          На протяжении всей истории человечества он был верным помощником, незаменимым инструментом
          и грозным оружием. Предлагаем изделия Hi-end качества по доступным ценам настоящим
          ценителям японских ножей.
        </p>
        <p class="main__about-description p_sm">
          Отличительной чертой нашего интернет-магазина являются уникальные торговые предложения,
          эксклюзивность продукции, неизменно высокое качество и выгодные цены. <br />
          <br />
          Осуществляем продажи элитных японских кухонных ножей для профессионалов и любителей. В
          обширной ассортиментной линейке представлены изделия для различных потребностей и любого
          бюджета — от столовых приборов до шеф-ножей.
        </p>
      </div>
    </section>
    <section class="main__articles container">
      <h2 class="main__articles-title h3">Всё самое интересное о ножах</h2>
      <ul class="main__articles-list">
        <li class="main__articles-list-item" v-for="article in articles" :key="article.id">
          <article-card :article="article"></article-card>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import BaseButton from '@/components/base/BaseButton.vue'
import BaseSlider from '@/components/base/BaseSlider.vue'
import ProductCard from '@/components/ProductCard.vue'
import CategoryCard from '@/components/CategoryCard.vue'
import ArticleCard from '@/components/ArticleCard.vue'

import productsServices from '@/services/productsServices'
import recommendationService from '@/services/recommendationService'

import type ProductsType from '@/types/productsType'
import type PromoType from '@/types/promoType'
import type ArticlesType from '@/types/articleType'

const deviceWidth = window.innerWidth
const slides = ref([] as PromoType[])
const products = ref([] as ProductsType[])
const articles = ref([] as ArticlesType[])
const isLoad = ref(false)

const popularAndNew = ref()
const tabIndex = ref(0)

const changeTabIndex = (e: any) => {
  const elem = e.target
  const childList = elem.parentNode.children
  tabIndex.value = Array.from(childList).indexOf(elem)
}

const fetchPromo = async () => {
  await recommendationService.getPromo().then((res) => {
    slides.value = res.data
  })
}
const fetchArticles = async () => {
  await recommendationService.getArticlesRecommendation().then((res) => {
    articles.value = res.data
  })
}
const fetchProducts = async () => {
  await recommendationService.getProductRecommendation().then((res) => {
    products.value = res.data
  })
}

const fetchPopularAndNew = async () => {
  await productsServices.getNewAndPopular().then((res) => {
    popularAndNew.value = res.data
    isLoad.value = true
  })
}

onMounted(async () => {
  await fetchPromo()
  await fetchProducts()
  await fetchArticles()
  await fetchPopularAndNew()
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

  &__recommendation-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  &__recommendation-list-item {
    margin-bottom: 30px;

    &:nth-last-child(2) {
      order: 1;
    }
  }

  &__instagram-link {
    display: block;
    position: relative;
    overflow: hidden;

    border-radius: 14px;

    min-width: 138px;
    min-height: 190px;
    max-width: 138px;
    max-height: 190px;

    &:hover {
      .main__instagram-image {
        transform: scale(1.15);
        filter: blur(3px);
      }
    }
  }

  &__instagram-title {
    position: absolute;
    top: 25px;
    right: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: $white;
    font-weight: 600;
    text-transform: uppercase;

    svg {
      margin-right: 8px;
    }
  }

  &__instagram-image {
    position: absolute;
    top: 0;
    left: 0;

    max-width: 140px;
    max-height: 200px;

    object-fit: cover;

    transition: all 0.3s ease;

    z-index: 0;
  }

  &__products {
    padding: 0 15px 30px 15px;
    border-top: 1px solid rgba(255 255 255 / 10%);
  }

  &__tab-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    column-gap: 27px;
    row-gap: 8px;

    margin-bottom: 30px;
  }

  &__tab-list-item {
    font-weight: 600;
    line-height: 42px;
    text-transform: uppercase;
    color: $white;
    opacity: 0.5;

    cursor: pointer;

    &--active {
      opacity: 1;
      text-decoration: underline $red-active 2px;
      text-underline-offset: 6px;

      cursor: default;
    }
  }

  &__tab-content-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  &__tab-content-list-item {
    margin-bottom: 30px;
  }

  &__about-company {
    margin-bottom: 30px;
  }

  &__about-image {
    width: 100%;

    border-radius: 20px;

    margin-bottom: 10px;
  }

  &__about-title {
    font-weight: 500;
    text-transform: uppercase;
    color: $white;
  }

  &__about-description {
    font-weight: 500;
    line-height: 140%;
    color: $gray-light;

    margin-top: 25px;
  }

  &__articles-title {
    font-weight: 500;
    color: $white;

    margin-bottom: 30px;
  }

  &__articles-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;

    width: 100%;
  }

  &__articles-list-item {
    margin-bottom: 30px;
  }
}
</style>
