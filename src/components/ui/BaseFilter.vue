<template>
  <form class="filter">
    <ul class="filter__outer-list">
      <li class="filter__outer-list-item" v-for="filter in data" :key="filter?.id">
        <div class="filter__header" @click="openFilter">
          <span class="p_md">{{ filter?.title }}</span>
          <base-button class="filter__button" :icon="true">
            <svg class="icon20 fill-white">
              <use href="@/assets/images/svg/dropdownIcon.svg#icon"></use>
            </svg>
          </base-button>
        </div>
        <div class="filter__body">
          <ul class="filter__inner-list">
            <li class="filter__inner-list-item" v-for="item in filter?.content" :key="item.id">
              <base-checkbox v-model="filterValues[filter.id][item.id]" class="filter__checkbox" />
              <label class="p_sm">
                <input
                  v-model="filterValues[filter.id][item.id]"
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
  </form>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const filterValues = ref({})

const router = useRouter()
const route = useRoute()

const getValues = () => {
  props.data?.forEach((filter) => {
    filterValues.value[filter.id] = {}
    filter.content.forEach((item) => {
      if (Array.isArray(route.query[filter.id])) {
        filterValues.value[filter.id][item.id] = false
        for (let index in route.query[filter.id]) {
          if (Number(route.query[filter.id][index]) === item.id)
            filterValues.value[filter.id][item.id] = true
        }
      } else {
        filterValues.value[filter.id][item.id] =
          Number(route.query[filter.id]) === item.id ? true : false
      }
    })
  })
}

const transformToQuery = computed(() => {
  let queryObject = {}
  for (let n in filterValues.value) {
    queryObject[n] = []
    for (let m in filterValues.value[n])
      if (filterValues.value[n][m]) {
        queryObject[n].push(m)
      }
  }
  return queryObject
})

getValues()

const openFilter = (e) => {
  e.currentTarget.parentNode.classList.toggle('filter__outer-list-item--open')
}

watch(filterValues.value, () => {
  router.push({ query: transformToQuery.value, params: { savePosition: true } })
})
</script>

<style scoped lang="scss">
.filter {
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
}
</style>
