<template>
  <section class="products container">
    <h2 class="visually-hidden">Католог продуктов</h2>
    <base-button class="products__open-filter" :icon="true" @onClick="openFilter">
      <svg class="icon24 fill-white">
        <use href="@/assets/images/svg/filterIcon.svg#icon"></use>
      </svg>
    </base-button>
    <Transition>
      <div class="products__filter-container" v-show="filterIsOpen" @click="closeFilter">
        <div class="products__filter-wrapper" @click.stop="">
          <div class="products__filter-header" @mousedown="closeFilter" @touchmove="closeFilter">
            <div class="products__close-filter"></div>
            <span class="products__filter-title h3">Фильтры</span>
          </div>
          <base-filter
            @onFiltered="emits('onFiltered')"
            class="products__filter"
            v-if="filterLoad"
            :data="filter"
          />
        </div>
      </div>
    </Transition>
    <ul v-if="products.length > 0 && isLoad" class="products__list">
      <li class="products__list-item" v-for="product in products" :key="product.id">
        <product-card @onClick="emits('addProduct', product)" :product="product"></product-card>
      </li>
    </ul>
    <ul class="products__list" v-else-if="!isLoad">
      <li class="products__list-item" v-for="n in 8" :key="n">
        <skeleton-products></skeleton-products>
      </li>
    </ul>
    <div class="products__not-found h4" v-else>Товар с такими характеристиками отсутсвует</div>
    <base-button
      v-if="limit < totalItems"
      @onClick="showMore"
      class="products__show-more"
      :icon="true"
    >
      <svg class="fill-white icon24">
        <use href="@/assets/images/svg/plusIcon.svg#icon"></use>
      </svg>
      <span class="p_hg">Показать еще</span>
    </base-button>
    <base-pagination
      v-if="isLoad"
      @onPagination="emits('onPagination')"
      :totalItems="totalItems"
    ></base-pagination>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import ProductCard from '@/components/products/ProductCard.vue'

import type { FilterType, ProductsType } from '@/types/responseType'
import SkeletonProducts from '@/components/products/SkeletonProducts.vue'
import BaseFilter from '@/components/ui/BaseFilter.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BasePagination from '@/components/ui/BasePagination.vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  products: {
    type: Array as PropType<ProductsType[]>,
    required: true,
    default: () => []
  },
  filter: {
    type: Array as PropType<FilterType[]>,
    required: true
  },
  isLoad: {
    type: Boolean,
    required: true
  },
  filterLoad: {
    type: Boolean,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(['onUnmounted', 'onFiltered', 'onPagination', 'addProduct'])

const router = useRouter()
const route = useRoute()

const filterIsOpen = ref(false)

const limit = ref(8)

const closeFilter = () => {
  filterIsOpen.value = false
  document.querySelector('body').style.overflow = 'auto'
}

const openFilter = () => {
  filterIsOpen.value = true
  document.querySelector('body').style.overflow = 'hidden'
}

const checkLimit = () => {
  if (Number(route.query.limit)) {
    limit.value = Number(route.query.limit)
  }
}

const showMore = async () => {
  await router.push({
    query: { ...route.query, page: 1, limit: limit.value + 8 },
    params: { savePosition: 1 }
  })
  checkLimit()
  emits('onPagination')
}

onMounted(() => {
  checkLimit()
})

onUnmounted(() => {
  emits('onUnmounted')
})
</script>

<style scoped lang="scss">
.products {
  display: grid;

  &__not-found {
    color: $white;
    padding-bottom: 30px;
    text-align: center;
  }

  &__open-filter {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: flex-end;

    width: 36px;
    height: 36px;

    background: $background-dark;

    border-radius: 8px;

    margin-bottom: 15px;

    svg {
      transform: rotate(90deg);
    }

    &:hover {
      border-radius: 8px;
      opacity: 0.7;
    }
  }

  &__filter-container {
    position: fixed;
    top: 0;
    left: 0;

    height: 100vh;
    width: 100%;
    z-index: 10;
  }

  &__filter-wrapper {
    position: fixed;
    bottom: 0;
    left: 50%;

    background: $background-dark;

    width: 100%;

    transform: translateX(-50%);
  }

  &__filter {
    overflow: scroll;

    height: 75vh;

    padding: 5px 15px 30px 15px;

    background: $background-light;
  }

  &__filter-header {
    position: relative;

    min-height: 60px;

    cursor: pointer;
  }

  &__close-filter {
    position: absolute;
    top: 10px;
    left: 50%;

    transform: translateX(-50%);

    width: 50px;
    height: 3px;

    border-radius: 4px;

    background: $red-active;
  }

  &__filter-title {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    color: $white;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  &__list-item {
    margin-bottom: 30px;
  }

  &__show-more {
    display: inline-flex;
    align-items: center;
    width: fit-content;

    justify-self: center;
    margin-bottom: 30px;

    &:active {
      svg {
        fill: $red-active;
        transition: 0.3s;
      }
    }

    svg {
      margin-right: 8px;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transform: translateY(0);
  transition: 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(100%);
}
</style>
