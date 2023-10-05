<template>
  <main class="catalog">
    <div class="catalog__banner container" v-if="route.name !== 'search'">
      <h1 v-if="isLoad.catalogHead" class="catalog__title h3">{{ catalog?.title }}</h1>
      <h1 v-else class="catalog__title h3">Католог TuoTown</h1>
      <p v-if="isLoad.catalogHead" class="catalog__description p_hg">{{ catalog?.description }}</p>
      <base-image
        v-if="isLoad.catalogHead"
        class="catalog__background"
        :src="`${catalog?.image}`"
      />
    </div>
    <div class="catalog__search h3" v-else>Поиск по запросу: {{ route.query.search }}</div>
    <router-view v-slot="{ Component }" class="catalog__content">
      <component
        :is="Component"
        :categories="catalog?.category"
        :products="catalog?.products"
        :filter="filter"
        :isLoad="isLoad.catalog"
        :filterLoad="isLoad.filter"
        :totalItems="totalItems"
        @onUnmounted="catalogUnmounted"
        @onFiltered="onProductsChange"
        @onPagination="onProductsChange"
        @addProduct="addProduct"
      >
      </component>
    </router-view>
    <section class="catalog__recommendation">
      <h2 class="visually-hidden">Рекомендованные каталоги</h2>
      <div class="catalog__recommendation-wrapper">
        <base-slider
          v-if="isLoad.recommendations"
          :carousel="false"
          :havePagination="false"
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
import { computed, onMounted, onUpdated, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import BaseSlider from '@/components/ui/BaseSlider.vue'
import BaseImage from '@/components/ui/BaseImage.vue'

import productsServices from '@/services/productsServices'
import recommendationService from '@/services/recommendationService'

import type { CatalogRecommendationType, ProductsType } from '@/types/responseType'
import cartServices from '@/services/cartServices'

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
const search = ref('')

const onProductsChange = async () => {
  if (route.name === 'search') {
    await fetchSearchingProducts()
  } else {
    await fetchFilteredProduct()
  }
}
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

const addProduct = async (product: ProductsType) => {
  await cartServices.postCartProduct(product)
}

const stringFilter = computed(() => {
  const queryFilter = route.query
  let filterStr = ''
  for (let item in queryFilter) {
    if (item === 'min_price') filterStr += `&price_gte=${queryFilter[item]}`
    else if (item === 'max_price') filterStr += `&price_lte=${queryFilter[item]}`
    else if (item === 'search') filterStr += `&name_like=${queryFilter[item]}`
    else if (item === 'ff1') filterStr += `&image_ne=null`
    else if (item === 'page') {
      if (Math.ceil(totalItems.value / Number(route.query.limit)) < Number(route.query.page)) {
        filterStr += `&_page=${Math.ceil(totalItems.value / Number(route.query.limit))}`
      } else {
        filterStr += Number(queryFilter[item]) < 1 ? '&_page=1' : `&_page=${queryFilter[item]}`
      }
    } else if (item === 'limit') {
      filterStr += Number(queryFilter[item]) < 1 ? '&_limit=8' : `&_limit=${queryFilter[item]}`
    } else if (String(queryFilter[item]).trim() !== '') {
      if (Array.isArray(queryFilter[item])) {
        for (let i in queryFilter[item] as any) {
          filterStr += `&characteristics.${item}.id=${queryFilter[item]?.[i]}`
        }
      } else filterStr += `&${item}=${queryFilter[item]}`
    }
  }
  if (filterStr === '') {
    filterStr += '&_page=1&_limit=8'
  }

  return filterStr
})

const fetchFilteredProduct = async () => {
  isLoad.value.catalog = false
  await productsServices
    .getFilteredProduct({ id: catalog_id.value, filter: stringFilter.value })
    .then((res) => {
      catalog.value.products = res.data
      totalItems.value = res.headers['x-total-count']
      isLoad.value.catalog = true
    })
}

const fetchSearchingProducts = async () => {
  isLoad.value.catalog = false
  await productsServices.getSearchingProduct({ filter: stringFilter.value }).then(async (res) => {
    catalog.value = { products: [] }
    catalog.value.products = res.data
    totalItems.value = res.headers['x-total-count']
    isLoad.value.catalog = true
    if (catalog.value.products.length !== 0) {
      await fetchProductFilter(catalog.value.products[0].categoryId)
    }
  })
}

const fetchProductFilter = async (id: number) => {
  await productsServices.getProductFilter(id).then((res) => {
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
  } else if (route.name === 'products') {
    await fetchProductCatalog()
    await fetchFilteredProduct()
    await fetchProductFilter(catalog_id.value)
  } else if (route.name === 'search') {
    await fetchSearchingProducts()
  }
}

watch(catalog_id, async () => {
  await catalogUnmounted()
})

watch(search, async () => {
  await fetchSearchingProducts()
})

onpopstate = async () => {
  isLoad.value.filter = false
  await catalogUnmounted()
}

onUpdated(() => {
  catalog_id.value = Number(route.params.id)
  if (route.query.search) search.value = String(route.query.search)
})

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

    @media (min-width: 768px) {
      height: 100vh;
    }
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

  &__search {
    padding: 50px 15px 0 15px;
    color: $white;
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
