<template>
  <main class="service">
    <h1 class="service__title h3">Сервис</h1>
    <div class="service__slider-container">
      <base-slider
        class="service__tab-slider"
        :carousel="false"
        :havePagination="false"
        :height="30"
      >
        <router-link
          v-for="tab in tabs"
          :key="tab.name"
          :to="{ name: tab.name }"
          class="service__tab p_hg"
          :class="{ 'service__tab--active': route.name == tab.name }"
          >{{ tab.meta?.title }}</router-link
        >
      </base-slider>
    </div>
    <router-view v-slot="{ Component }">
      <component :is="Component" :isSent="isSent" @onSubmit="onSubmit"></component>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BaseSlider from '@/components/ui/BaseSlider.vue'

import validation from '@/utils/validation'

import reportServices from '@/services/reportServices'

import type { RouteRecordRaw } from 'vue-router'
import type { ServiceType } from '@/types/formType'

const router = useRouter()
const route = useRoute()

const errors = ref({
  errors: {} as any,
  countErrors: 0
})
const { fieldValidation } = validation()
const isSent = ref(false)
const formData = ref<ServiceType>()

const tabs = computed(() => {
  let routeTabs: RouteRecordRaw[] | undefined = []
  for (let curRoute of router.options.routes) {
    if (curRoute.path === route.path) {
      routeTabs = curRoute.children
    }
  }
  return routeTabs
})
const onSubmit = async (data: ServiceType) => {
  formData.value = data
  await sendReport()
}

const sendReport = async () => {
  const sendData = {} as any
  let item: keyof ServiceType
  for (item in formData.value) {
    if (formData.value?.[item].value === undefined) formData.value[item].value = ''
    if (item === 'topic') sendData['topic'] = formData.value?.topic.data.code
    else sendData[item] = formData.value?.[item].value
  }
  errors.value = fieldValidation(formData.value)
  if (!errors.value.countErrors) {
    await reportServices.sendReport(sendData)
    await router.push({ name: route.name ? route.name : 'report' })
    isSent.value = true
  }
}
</script>

<style scoped lang="scss">
.service {
  padding: 65px 0 0 0;

  &__title {
    text-transform: uppercase;
    text-align: center;
    line-height: normal;
    color: $white;

    margin-bottom: 30px;
  }

  &__slider-container {
    min-width: 320px;
    max-width: fit-content;
    width: 100%;
    margin: 0 auto;
  }

  &__tab-slider {
    margin-bottom: 45px;
    text-align: center;
  }

  &__tab {
    min-width: fit-content;

    margin-left: 15px;

    font-weight: 500;
    line-height: normal;
    text-transform: uppercase;
    color: $gray-light;

    cursor: pointer;

    &--active {
      text-decoration: underline $red-active 2px;
      text-underline-offset: 6px;
      color: $white;
      cursor: default;
    }
  }
}
</style>
