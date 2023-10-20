<template>
  <main class="main">
    <h1 class="visually-hidden h3">Официальный сайт «Tuotown»</h1>
    <section class="main__promo">
      <h2 class="visually-hidden">Промо материалы</h2>
      <base-slider
        v-if="isLoad.promo"
        class="main__slider"
        :havePagination="true"
        :carousel="true"
        :height="deviceHeight"
      >
        <div
          v-for="slide in slides"
          :key="slide.id"
          class="main__slider-slide main__slider-slide--active"
          :style="{ width: deviceWidth + 'px' }"
        >
          <base-image class="main__slider-background" :src="slide.image" :alt="slide.title" />
          <p class="main__slider-title h3">{{ slide.title }}</p>
          <p class="main__slider-description p_hg">{{ slide.description }}</p>
          <base-button
            v-if="slide?.link"
            @onClick="router.push({ path: slide?.link })"
            class="main__slider-link p_hg"
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
            <router-link :to="{ name: 'category', params: { id: 0 } }">
              <svg class="icon46 fill-gray">
                <use href="@/assets/images/svg/knifeIcon.svg#icon"></use>
              </svg>
              <span class="main__list-name p_hg">Кухонные ножи</span>
            </router-link>
          </li>
          <li class="main__nav-list-item">
            <router-link :to="{ name: 'products', params: { id: 6 } }">
              <svg class="icon46 fill-gray">
                <use href="@/assets/images/svg/jackknifeIcon.svg#icon"></use>
              </svg>
              <span class="main__list-name p_hg">Складные ножи</span>
            </router-link>
          </li>
          <li class="main__nav-list-item">
            <router-link :to="{ name: 'category', params: { id: 0 } }">
              <svg class="icon46 fill-gray">
                <use href="@/assets/images/svg/grindIcon.svg#icon"></use>
              </svg>
              <span class="main__list-name p_hg">Точилки для ножей</span>
            </router-link>
          </li>
          <li class="main__nav-list-item">
            <router-link :to="{ name: 'category', params: { id: 0 } }">
              <svg class="icon46 fill-gray">
                <use href="@/assets/images/svg/cookIcon.svg#icon"></use>
              </svg>
              <span class="main__list-name p_hg">Аксессуары для кухни</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <ul v-if="isLoad.recommendation" class="main__recommendation-list">
        <li class="main__recommendation-list-item">
          <category-card :category="category"></category-card>
        </li>
        <li class="main__recommendation-list-item" v-for="product in products" :key="product.id">
          <product-card @onClick="addProduct(product)" :product="product"></product-card>
        </li>
        <li class="main__recommendation-list-item main__recommendation-list-item--instagram">
          <a href="https://www.instagram.com/tuotown/" class="main__instagram-link">
            <base-image
              :src="InstagramImg"
              :alt="'Instagram - ссылка'"
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
      <ul class="main__recommendation-list" v-else>
        <li class="main__recommendation-list-item" v-for="n in 6" :key="n">
          <skeleton-products></skeleton-products>
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
      <ul v-if="isLoad.popular" class="main__tab-content-list">
        <li
          class="main__tab-content-list-item"
          v-for="product in popularAndNew[tabIndex][Object.keys(popularAndNew[tabIndex])[0]]"
          :key="product.id"
        >
          <product-card @onClick="addProduct(product)" :product="product"></product-card>
        </li>
      </ul>
      <ul class="main__tab-content-list" v-else>
        <li class="main__tab-content-list-item" v-for="n in 4" :key="n">
          <skeleton-products></skeleton-products>
        </li>
      </ul>
    </section>
    <section class="main__about container">
      <h2 class="visually-hidden">О «Tuotown»</h2>
      <div class="main__about-company">
        <base-image
          class="main__about-image"
          :src="AboutImage1"
          :alt="'«Tuotown» – легендарные ножи, создающие шедевры'"
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
        <base-image
          class="main__about-image"
          :src="AboutImage2"
          :alt="'Ножи «Tuotown» – это главный инструмент поваров и секрет кулинарного мастерства'"
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
      <articles-list class="main__articles-list" :listLoad="isLoad.articles" :articles="articles" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useSessionStore } from '@/stores/session'

import BaseButton from '@/components/ui/BaseButton.vue'
import BaseSlider from '@/components/ui/BaseSlider.vue'
import ProductCard from '@/components/products/ProductCard.vue'
import CategoryCard from '@/components/categories/CategoryCard.vue'
import ArticleCard from '@/components/articles/ArticleCard.vue'
import BaseImage from '@/components/ui/BaseImage.vue'
import SkeletonCategory from '@/components/categories/SkeletonCategory.vue'
import SkeletonProducts from '@/components/products/SkeletonProducts.vue'

import InstagramImg from '@/assets/images/instagram.jpg'
import AboutImage1 from '@/assets/images/about1.jpg'
import AboutImage2 from '@/assets/images/about2.jpg'

import productsServices from '@/services/productsServices'
import recommendationService from '@/services/recommendationService'
import cartServices from '@/services/cartServices'
import articlesServices from '@/services/articlesServices'

import type {
  ProductsType,
  PromoType,
  ArticleType,
  CategoryType,
  PopularNewType
} from '@/types/responseType'
import ArticlesList from '@/components/articles/ArticlesList.vue'

const deviceWidth = ref(window.innerWidth)
const deviceHeight = ref(window.innerHeight)

const slides = ref([] as PromoType[])
const products = ref([] as ProductsType[])
const category = ref({} as CategoryType)
const articles = ref([] as ArticleType[])

const isLoad = ref({
  promo: false,
  recommendation: false,
  articles: false,
  popular: false
})

const popularAndNew = ref([] as PopularNewType[])
const tabIndex = ref(0)

const router = useRouter()

const resize = () => {
  deviceWidth.value = window.innerWidth
  deviceHeight.value = window.innerHeight
}

addEventListener('resize', resize)
const changeTabIndex = (e: any) => {
  const elem = e.target
  const childList = elem.parentNode.children
  tabIndex.value = Array.from(childList).indexOf(elem)
}

const addProduct = async (product: ProductsType) => {
  await cartServices.postCartProduct(product)
}

const fetchPromo = async () => {
  await recommendationService.getPromo().then((res) => {
    slides.value = res.data
    isLoad.value.promo = true
  })
}
const fetchArticles = async () => {
  await articlesServices.getArticlesRecommendation().then((res) => {
    articles.value = res.data
    isLoad.value.articles = true
  })
}
const fetchProducts = async () => {
  await recommendationService.getProductRecommendation().then((res) => {
    products.value = res.data[0].products
    category.value = res.data[1].category[0]
    isLoad.value.recommendation = true
  })
}

const fetchPopularAndNew = async () => {
  await productsServices.getNewAndPopular().then((res) => {
    popularAndNew.value = res.data
    isLoad.value.popular = true
  })
}

onMounted(async () => {
  await fetchPromo()
  await fetchProducts()
  await fetchArticles()
  await fetchPopularAndNew()
})

onUnmounted(() => {
  removeEventListener('resize', resize)
})
</script>

<style lang="scss">
.main {
  &__promo {
    height: 100vh;
  }

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

      @media (min-width: 1440px) {
        background: linear-gradient(268deg, rgba(0, 0, 0, 0) 21.45%, #000 85.16%);
        height: 100%;
      }
    }

    @media (min-width: 768px) {
      padding: 125px 69px;
    }

    @media (min-width: 1440px) {
      padding: 150px 189px;
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

    @media (min-width: 1440px) {
      top: 0;
      height: 100%;
    }
  }

  &__slider-title {
    position: relative;
    z-index: 3;

    color: $white;
    text-transform: uppercase;

    margin-bottom: 15px;

    @media (min-width: 768px) {
      margin-bottom: 20px;
    }

    @media (min-width: 1440px) {
      margin-bottom: 24px;

      max-width: 602px;

      line-height: 48px;
    }
  }

  &__slider-description {
    position: relative;
    color: $white;

    font-weight: 400;
    line-height: 140%;

    max-width: 215px;

    margin-bottom: 8px;

    z-index: 3;

    @media (min-width: 768px) {
      max-width: 447px;

      margin-bottom: 27px;
    }

    @media (min-width: 1440px) {
      margin-bottom: 40px;
    }
  }

  &__nav-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    text-align: center;

    @media (min-width: 768px) {
      margin-bottom: 60px;
    }
  }

  &__list-name {
    display: block;
    color: $gray-light;
    font-weight: 500;

    cursor: pointer;

    @media (min-width: 768px) {
      margin-top: 30px;
    }
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

    @media (min-width: 768px) {
      width: 25%;
    }
  }

  &__recommendation {
    @media (min-width: 320px) and (max-width: 767px) {
      max-width: 640px;
    }
  }

  &__recommendation-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    @media (min-width: 768px) {
      justify-content: space-between;
    }

    @media (min-width: 1400px) {
      justify-content: space-between;
    }
  }

  &__recommendation-list-item {
    margin-bottom: 30px;

    @media (min-width: 1400px) {
      margin-bottom: 25px;
    }

    &:first-child {
      .category-card__wrapper {
        @media (min-width: 768px) {
          min-width: 630px;
          min-height: 514px;
        }

        @media (min-width: 1400px) {
          min-width: 590px;
          min-height: 481px;
        }
      }
    }

    &:nth-last-child(2) {
      order: 1;
    }
  }

  &__instagram-link {
    display: block;
    position: relative;

    height: 100%;
    width: 100%;

    min-width: 138px;
    min-height: 190px;
    max-width: 138px;
    max-height: 190px;

    @media (min-width: 768px) {
      min-width: 295px;
      min-height: 450px;
      max-width: 295px;
      max-height: 450px;
    }

    @media (min-width: 1440px) {
      min-width: 280px;
      max-height: 408px;
      min-height: 408px;
      max-width: 280px;
    }

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

    overflow: hidden;

    border-radius: 14px;

    max-width: 140px;
    max-height: 200px;

    object-fit: cover;

    transition: all 0.3s ease;

    z-index: 0;

    @media (min-width: 768px) {
      max-height: 379px;
      max-width: 300px;
    }

    @media (min-width: 1440px) {
      max-width: 286px;
      max-height: 412px;
    }
  }

  &__products {
    padding: 0 15px 30px 15px;
    border-top: 1px solid $border-line;

    @media (min-width: 768px) {
      padding-top: 60px;
    }
  }

  &__tab-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    column-gap: 27px;
    row-gap: 8px;

    margin-bottom: 30px;

    @media (min-width: 768px) {
      column-gap: 53px;
    }
  }

  &__tab-list-item {
    font-weight: 600;
    line-height: 42px;
    text-transform: uppercase;
    color: $white;
    opacity: 0.5;

    cursor: pointer;

    @media (min-width: 1440px) {
      &:hover {
        opacity: 0.8;
      }
    }

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

    @media (min-width: 768px) {
      justify-content: center;
      column-gap: 30px;
    }
  }

  &__tab-content-list-item {
    margin-bottom: 30px;
  }

  &__about-company {
    margin-bottom: 30px;

    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 50% 50%;
      column-gap: 30px;

      .main__about-title {
        margin-top: 80px;
      }

      .main__about-image {
        grid-row-start: 1;
        grid-row-end: 3;

        height: 302px;
      }

      .main__about-description {
        grid-row-start: 2;
        grid-row-end: 3;
        grid-column-start: 2;
        grid-column-end: 3;
      }
    }

    @media (min-width: 1440px) {
      grid-template-columns: 25% 75%;
      column-gap: 80px;

      .main__about-title {
        margin-top: 0;
      }

      .main__about-description {
        max-width: 672px;
        color: $white;
        line-height: 22px;

        margin: 0;

        br {
          display: none;
        }
      }
    }
  }

  &__about-knife {
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 50% 50%;
      column-gap: 20px;

      .main__about-image {
        grid-row-start: 1;
        grid-row-end: 3;

        height: 302px;
        justify-self: center;
      }

      .main__about-title {
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column-start: 1;
        grid-column-end: 2;
      }

      .main__about-description {
        &:first-child {
          grid-row-start: 2;
          grid-row-end: 3;
          grid-column-start: 1;
          grid-column-end: 2;
        }

        &:last-child {
          grid-row-start: 3;
          grid-row-end: 4;
          grid-column-start: 2;
          grid-column-end: 3;
        }
      }
    }

    @media (min-width: 1440px) {
      grid-template-columns: 75% 25%;
      column-gap: 80px;

      .main__about-title {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 3;
        grid-row-end: 4;

        margin-top: 30px;
      }

      .main__about-image {
        grid-row-start: 1;
        grid-row-end: 4;

        height: 100%;
        justify-self: center;
      }

      .main__about-description {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 2;

        margin: 0;

        color: $white;
        line-height: 22px;

        &:last-child {
          grid-column-start: 1;
          grid-column-end: 2;
          grid-row-start: 2;
          grid-row-end: 3;
        }

        br {
          display: none;
        }
      }
    }
  }

  &__about-image {
    width: 100%;
    min-height: 280px;
    max-width: 300px;
    overflow: hidden;

    border-radius: 20px;

    margin: 0 auto 10px;
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

    @media (min-width: 768px) {
      margin-bottom: 60px;
    }
  }

  .main__articles-list {
    justify-content: space-around;
  }
}
</style>
