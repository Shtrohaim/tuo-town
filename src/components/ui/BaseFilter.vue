<template>
  <form class="filter">
    <ul class="filter__outer-list">
      <li class="filter__outer-list-item">
        <div class="filter__header" @click="openFilter">
          <span class="p_md">Цена</span>
          <base-button class="filter__button" :icon="true">
            <svg class="icon20 fill-white">
              <use href="@/assets/images/svg/dropdownIcon.svg#icon"></use>
            </svg>
          </base-button>
        </div>
        <div class="filter__body">
          <base-range
            @onChange="getCurrentPrice"
            :curValues="curPrice"
            :minPrice="price?.min_price"
            :maxPrice="price?.max_price"
          />
        </div>
      </li>
      <li class="filter__outer-list-item" v-for="elem in filter" :key="elem?.id">
        <div class="filter__header" @click="openFilter">
          <span class="p_md">{{ elem?.title }}</span>
          <base-button class="filter__button" :icon="true">
            <svg class="icon20 fill-white">
              <use href="@/assets/images/svg/dropdownIcon.svg#icon"></use>
            </svg>
          </base-button>
        </div>
        <div class="filter__body">
          <ul class="filter__inner-list">
            <li class="filter__inner-list-item" v-for="item in elem?.content" :key="item.id">
              <base-checkbox v-model="filterValues[elem.id][item.id]" class="filter__checkbox" />
              <label class="p_sm">
                <input
                  v-model="filterValues[elem.id][item.id]"
                  class="visually-hidden"
                  type="checkbox"
                />
                {{ item.title }}
              </label>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <base-button @onClick="clearFilter" class="filter__clear-button" :filled="true"
      >Сбросить</base-button
    >
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import BaseRange from '@/components/ui/BaseRange.vue'

import type { FilterType } from '@/types/responseType'
import type { FilterValuesType } from '@/types/filterType'

const props = defineProps({
  data: {
    type: Array as PropType<FilterType[]>,
    required: true
  }
})

const emits = defineEmits(['onFiltered'])

const filterValues = ref<FilterValuesType>({})
const price = ref()
const curPrice = ref({
  minPrice: 0,
  maxPrice: 0
})
const filter = ref([...props.data])

const router = useRouter()
const route = useRoute()

const getPrice = () => {
  filter.value?.forEach((item) => {
    if (item.id === 'ff0') {
      price.value = item
      filter.value?.shift()
    }
  })
}

const getValues = () => {
  filter.value?.forEach((item) => {
    filterValues.value[item.id] = {}
    item.content.forEach((elem) => {
      if (Array.isArray(route.query[item.id])) {
        filterValues.value[item.id][elem.id] = false
        for (let index in route.query[item.id] as any) {
          if (Number(route.query[item.id]?.[index]) === elem.id)
            filterValues.value[item.id][elem.id] = true
        }
      } else {
        filterValues.value[item.id][elem.id] = Number(route.query[item.id]) === elem.id
      }
    })
  })

  curPrice.value.minPrice = route.query.min_price ? route.query.min_price : price.value?.min_price
  curPrice.value.maxPrice = route.query.max_price ? route.query.max_price : price.value?.max_price
}

const transformToQuery = computed(() => {
  let queryObject = {
    min_price: 0,
    max_price: 0
  } as { [key: string]: any }
  for (let n in filterValues.value) {
    queryObject[n] = []
    for (let m in filterValues.value[n])
      if (filterValues.value[n][m]) {
        queryObject[n].push(m)
      }
  }
  queryObject.min_price =
    String(curPrice.value.minPrice).trim() === '' ? price.value.min_price : curPrice.value.minPrice
  queryObject.max_price =
    String(curPrice.value.maxPrice).trim() === '' ? price.value.max_price : curPrice.value.maxPrice

  return queryObject
})

const getCurrentPrice = ({ minPrice, maxPrice }: { [key: string]: number }) => {
  curPrice.value.minPrice = minPrice
  curPrice.value.maxPrice = maxPrice
  setFilter()
}

const setFilter = async () => {
  await router.push({
    query: { ...route.query, ...transformToQuery.value, page: 1 },
    params: { savePosition: 1 }
  })
  emits('onFiltered')
}

const clearFilter = () => {
  router.replace({ query: undefined })
  setTimeout(() => {
    router.go(0)
  }, 100)
}
const openFilter = (event: any) => {
  event.currentTarget.parentNode.classList.toggle('filter__outer-list-item--open')
}

getPrice()
getValues()

watch(filterValues.value, () => {
  setFilter()
})
</script>

<style scoped lang="scss">
.filter {
  display: flex;
  flex-direction: column;

  &__outer-list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  &__outer-list-item {
    border-bottom: 1px solid $border-line;
    padding: 15px 0;

    &--open {
      .filter__body {
        max-height: 100vh;
        transition: max-height 1s ease-in-out;
      }

      .filter__button {
        transform: rotate(-180deg);
      }
    }
  }

  &__button {
    height: 20px;
    transition: all 0.35s ease-in-out;
  }

  &__body {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);

    color: $gray-light;
    font-weight: 400;
    line-height: 140%;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    margin-bottom: 10px;

    color: $white;
    font-weight: 400;
    line-height: normal;

    cursor: pointer;

    &:hover {
      color: #c80000;
    }
  }

  &__inner-list {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }

  &__inner-list-item {
    display: flex;
    align-items: center;
    text-align: center;
  }

  &__checkbox {
    margin-right: 10px;
  }

  &__checkbox,
  label {
    cursor: pointer;

    &:hover {
      color: $white;
    }
  }

  &__clear-button {
    margin: 15px auto 0;
  }
}
</style>
