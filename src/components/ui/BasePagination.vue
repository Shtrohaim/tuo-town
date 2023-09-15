<template>
  <div class="pagination" v-if="totalPages">
    <div class="pagination__wrapper">
      <base-button
        class="pagination__button pagination__button--prev"
        v-show="page !== 1"
        @onClick="page -= 1"
        :icon="true"
      >
        <svg class="fill-white icon24">
          <use href="@/assets/images/svg/navArrowIcon.svg#icon"></use>
        </svg>
      </base-button>
      <ul class="pagination__page-list">
        <li
          v-if="!getPages.find((e) => e === 1)"
          class="pagination__page-list-item p_hg"
          :class="{ 'pagination__page-list-item--active': 1 === page }"
        >
          <span @click="page = 1">1</span>
          <span class="pagination__dots pagination__dots--first">...</span>
        </li>
        <li
          class="pagination__page-list-item p_hg"
          :class="{ 'pagination__page-list-item--active': item === page }"
          v-for="item in getPages"
          :key="item"
          @click="page = item"
        >
          {{ item }}
        </li>
        <li
          v-if="!getPages.find((e) => e === totalPages)"
          class="pagination__page-list-item p_hg"
          :class="{ 'pagination__page-list-item--active': totalItems === page }"
        >
          <span class="pagination__dots pagination__dots--last">...</span>
          <span @click="page = totalPages">{{ totalPages }}</span>
        </li>
      </ul>
      <base-button
        class="pagination__button pagination__button--next"
        v-show="page !== totalPages"
        @onClick="page += 1"
        :icon="true"
      >
        <svg class="fill-white icon24">
          <use href="@/assets/images/svg/navArrowIcon.svg#icon"></use>
        </svg>
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(['onPagination'])

const route = useRoute()
const router = useRouter()

const page = ref(1)
const limit = ref(8)

page.value =
  Number(route.query.page) && String(route.query.page).trim() !== '' ? Number(route.query.page) : 1
limit.value =
  Number(route.query.limit) && String(route.query.page).trim() !== ''
    ? Number(route.query.limit)
    : 8

const totalPages = Math.ceil(props.totalItems / limit.value)
const onPagination = async () => {
  await router.push({ query: { ...route.query, page: page.value, limit: limit.value } })
  emits('onPagination')
}

const getPages = computed(() => {
  let begin = 1
  let step = window.innerWidth <= 640 ? 4 : 6
  let end = step
  if (page.value - 1 > 1 && page.value + 2 < totalPages) {
    begin = page.value - step / 2 === 0 ? 1 : page.value - step / 2
    end = page.value + step / 2
  } else if (page.value + 2 >= totalPages) {
    begin = totalPages - step !== 0 ? (totalPages - step > 0 ? totalPages - step : 1) : 1
    end = totalPages
  }
  return Array.from({ length: end - begin + 1 }, (value, index) => begin + index)
})

watch(page, () => {
  if (page.value > totalPages) {
    page.value = totalPages
  }
  if (page.value < 1) {
    page.value = 1
  }

  onPagination()
})
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;

  width: 100%;

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__page-list {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__page-list-item {
    font-weight: 500;
    color: $white;
    cursor: pointer;

    &--active {
      color: $red-active;
      cursor: default;
    }

    &:hover {
      opacity: 0.8;
    }
  }

  &__dots {
    &--first {
      margin-left: 8px;
    }

    &--last {
      margin-right: 8px;
    }
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 36px;
    height: 36px;

    background: transparent;

    border: 1px solid $border-line;

    &--prev {
      transform: rotate(180deg);
    }

    &:active {
      border-color: $red-active;
      border-radius: 50%;

      svg {
        fill: $red-active;
      }
    }

    &:hover {
      border-radius: 50%;
    }
  }
}
</style>
