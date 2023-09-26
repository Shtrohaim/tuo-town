<template>
  <main class="dealers">
    <h1 class="dealers__title h3">Карта</h1>
    <div class="dealers__content container">
      <div class="dealers__map-control">
        <form class="dealers__search" @submit.prevent="geocoder">
          <input
            placeholder="Страна, город, улица..."
            class="dealers__input p_hg"
            v-model="search"
          />
          <base-button class="dealers__search-button" @onClick="geocoder" :icon="true">
            <svg class="icon20 fill-gray">
              <use href="@/assets/images/svg/navArrowIcon.svg#icon"></use>
            </svg>
          </base-button>
        </form>
        <ul class="dealers__options-list">
          <li class="dealers__options-list-item">
            <base-button
              class="dealers__option-button dealers__option-button--all"
              @onClick="
                Object.keys(markerOptions).forEach(
                  (item: keyof MarkerOptionsType) => (markerOptions[item] = false)
                )
              "
              :class="{ 'dealers__option-button--active': markerOptions.all }"
              :icon="true"
            >
              <div class="dealers__option-icon"></div>
            </base-button>
          </li>
          <li>
            <base-button
              class="dealers__option-button dealers__option-button--sharpening"
              @onClick="markerOptions.sharpening_stones = !markerOptions.sharpening_stones"
              :class="{ 'dealers__option-button--active': markerOptions.sharpening_stones }"
              :icon="true"
            >
              <div class="dealers__option-icon"></div>
            </base-button>
          </li>
          <li>
            <base-button
              class="dealers__option-button dealers__option-button--cutlery"
              @onClick="markerOptions.cutlery = !markerOptions.cutlery"
              :class="{ 'dealers__option-button--active': markerOptions.cutlery }"
              :icon="true"
            >
              <div class="dealers__option-icon"></div>
            </base-button>
          </li>
          <li>
            <base-button
              class="dealers__option-button dealers__option-button--knife"
              @onClick="markerOptions.knife = !markerOptions.knife"
              :class="{ 'dealers__option-button--active': markerOptions.knife }"
              :icon="true"
            >
              <div class="dealers__option-icon"></div>
            </base-button>
          </li>
          <li>
            <base-button
              class="dealers__option-button dealers__option-button--grill"
              @onClick="markerOptions.grill = !markerOptions.grill"
              :class="{ 'dealers__option-button--active': markerOptions.grill }"
              :icon="true"
            >
              <div class="dealers__option-icon"></div>
            </base-button>
          </li>
        </ul>
      </div>
      <yandex-map
        v-if="isMarkerLoad"
        ref="map"
        class="dealers__map"
        :coords="shops?.[0].coords"
        :zoom="10"
        :controls="[]"
      >
        <div v-for="shop in shops" :key="shop.id">
          <ymap-marker
            v-if="markerOptions.all || checkOptions(shop.categories)"
            :icon="marker"
            :coords="shop.coords"
            :marker-id="shop.id"
            :cluster-name="shop.city"
            :balloon-template="`
              <div class=&quot;dealers__balloon&quot;>
                <h3 class=&quot;dealers__balloon-name p_hg&quot;>${shop.name}</h3>
                <p class=&quot;dealers__balloon-address p_sm&quot;>${shop.address}</p>
                <p class=&quot;dealers__balloon-hours p_sm&quot;>${shop.opening_hours}</p>
                <p class=&quot;dealers__balloon-tel p_md&quot;>${shop.tel}</p>
                <p class=&quot;dealers__balloon-email p_md&quot;>${shop.email}</p>
              </div>
              `"
          >
          </ymap-marker>
        </div>
      </yandex-map>
      <base-image v-else class="dealers__map" src=""></base-image>
      <base-button class="dealers__nearest-button" @onClick="showNearestShop"
        >Найти ближайший</base-button
      >
      <ul class="dealers__shops-list">
        <li class="dealers__shops-list-item p_hg" v-for="shop in shops" :key="shop.id">
          <h3
            @click="map.myMap.setCenter(shop.coords, 18, { duration: 500 })"
            class="dealers__shop-name"
          >
            {{ shop.name }}
          </h3>
          <p class="dealers__shop-address">{{ shop.address }}</p>
          <p class="dealers__shop-hours">{{ shop.opening_hours }}</p>
          <p class="dealers__shop-tel">{{ shop.tel }}</p>
          <base-button class="dealers__show-route" :icon="true" @onClick="setRoute(shop.coords)">
            <svg class="icon20 fill-gray">
              <use href="@/assets/images/svg/subRightIcon.svg#icon"></use>
            </svg>
            Проложить маршрут
          </base-button>
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { yandexMap, ymapMarker, loadYmap } from 'vue-yandex-maps'

import markerIcon from '@/assets/images/svg/pinIcon.svg'

import mapServices from '@/services/mapServices'

import BaseButton from '@/components/ui/BaseButton.vue'

import type { MapShopType, ShopCategoriesType } from '@/types/responseType'
import type { MarkerOptionsType } from '@/types/mapType'
import BaseImage from '@/components/ui/BaseImage.vue'

const settings = {
  apiKey: 'd85b83e6-0670-4660-a8a2-b82073feda37',
  lang: 'ru_RU',
  enterprise: true,
  version: '2.1'
}

const marker = {
  layout: 'default#imageWithContent',
  imageHref: markerIcon,
  imageSize: [40, 40],
  imageOffset: [-20, -40]
}

const markerOptions = ref<MarkerOptionsType>({
  all: true,
  sharpening_stones: false,
  cutlery: false,
  knife: false,
  grill: false
})

const map = ref()
const routePanelControl = ref()

const myCoords = ref<number[]>([])
const search = ref('')
const isMarkerLoad = ref(false)

const shops = ref<MapShopType[]>()

const fetchMarkers = async () => {
  await mapServices.getMarkers().then((res) => {
    shops.value = res.data
    isMarkerLoad.value = true
  })
}

const checkOptions = (categories: ShopCategoriesType) => {
  let isTrue = false
  let option: keyof ShopCategoriesType
  for (option in categories) {
    for (let option_marker in markerOptions.value) {
      if (
        option === option_marker &&
        categories[option] &&
        categories[option] === markerOptions.value[option_marker]
      ) {
        isTrue = true
      }
    }
  }
  return isTrue
}

const geocoder = async () => {
  if (search.value === '') return
  await ymaps.geocode(search.value).then((res: any) => {
    const firstGeoObject = res.geoObjects.get(0)
    const newCoords = firstGeoObject.geometry.getCoordinates()
    map.value.myMap.setCenter(newCoords, 10, {
      duration: 500
    })
  })
}
const getUserCoords = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let newCoords = []
    newCoords.push(position.coords.latitude)
    newCoords.push(position.coords.longitude)
    myCoords.value = newCoords
  })
}
const showNearestShop = () => {
  getUserCoords()
  if (myCoords.value.length === 0) return alert('Геоданные не подключены!')
  let lengthCoords = []
  if (!shops.value) return
  for (let shop of shops.value) {
    lengthCoords.push(
      Math.sqrt(
        Math.pow(myCoords.value[0] - shop.coords[0], 2) +
          Math.pow(myCoords.value[1] - shop.coords[1], 2)
      )
    )
  }

  let index = lengthCoords.indexOf(Math.min(...lengthCoords))
  map.value.myMap.setCenter(shops.value?.[index].coords, 15, {
    duration: 500
  })
}
const setRoute = (coords: number[]) => {
  getUserCoords()
  if (myCoords.value.length === 0) return alert('Геоданные не подключены!')
  map.value.myMap.controls.add('routePanelControl', {
    maxWidth: 100
  })
  routePanelControl.value = map.value.myMap.controls.get('routePanelControl').routePanel
  routePanelControl.value.state.set({
    type: 'auto',
    from: myCoords.value,
    to: coords
  })
}

onMounted(async () => {
  await loadYmap(settings)
  await fetchMarkers()
  getUserCoords()
})

watch(markerOptions.value, () => {
  const objectLength = Object.keys(markerOptions.value).length
  const objectValues = Object.values(markerOptions.value)
  if (markerOptions.value.all && objectValues.slice(1, objectLength).find((item) => item === true))
    markerOptions.value.all = false
  if (objectValues.every((item) => !item)) markerOptions.value.all = true
  if (objectValues.slice(1, objectLength).every((item) => item))
    Object.keys(markerOptions.value).forEach(
      (item: keyof MarkerOptionsType) => (markerOptions.value[item] = false)
    )
})
</script>

<style lang="scss">
.dealers {
  &__title {
    padding: 70px 0 30px 0;

    text-transform: uppercase;
    text-align: center;
    color: $white;
  }

  &__content {
    background: $background-dark;
  }

  &__search {
    position: relative;

    width: 100%;

    margin-bottom: 30px;
  }

  &__input {
    width: 100%;
    height: 50px;

    padding: 0 40px 0 30px;

    appearance: none;

    font-size: 16px;

    background: transparent;
    outline: none;
    border: 1px solid $gray-border;
    border-radius: 20px;

    color: $white;
  }

  .dealers__search-button {
    position: absolute;
    top: 50%;
    right: 15px;

    transform: translateY(-50%);
  }

  &__options-list {
    display: flex;
    justify-content: center;
    column-gap: 5px;

    margin-bottom: 20px;
  }

  .dealers__option-button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;

    border: 2px solid $gray-border;
    border-radius: 50%;
    background: $black-input;

    &:active {
      border-radius: 50%;

      .dealers__option-icon {
        opacity: 1;
      }
    }

    &--active {
      border-color: $red-active;
      .dealers__option-icon {
        opacity: 1;
      }
    }

    &--all {
      margin-right: 10px;

      .dealers__option-icon {
        -webkit-mask-image: url('@/assets/images/svg/allIcon.svg');
        mask-image: url('@/assets/images/svg/allIcon.svg');
      }
    }

    &--sharpening {
      .dealers__option-icon {
        -webkit-mask-image: url('@/assets/images/svg/sharpeningIcon.svg');
        mask-image: url('@/assets/images/svg/sharpeningIcon.svg');
      }
    }

    &--cutlery {
      .dealers__option-icon {
        -webkit-mask-image: url('@/assets/images/svg/cutleryIcon.svg');
        mask-image: url('@/assets/images/svg/cutleryIcon.svg');
      }
    }

    &--knife {
      .dealers__option-icon {
        -webkit-mask-image: url('@/assets/images/svg/knife2Icon.svg');
        mask-image: url('@/assets/images/svg/knife2Icon.svg');
      }
    }

    &--grill {
      .dealers__option-icon {
        -webkit-mask-image: url('@/assets/images/svg/grillIcon.svg');
        mask-image: url('@/assets/images/svg/grillIcon.svg');
      }
    }
  }

  &__option-icon {
    width: 26px;
    height: 26px;

    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;

    opacity: 0.5;
    background: $white;
  }

  &__map {
    display: flex;
    height: 50vh;
    width: 100%;

    margin-bottom: 30px;

    overflow: hidden;

    filter: grayscale(1);

    border-bottom: 1px solid transparent;
    border-radius: 15px;

    .ymaps-2-1-79-balloon {
      background-color: $background-dark;
    }
    .ymaps-2-1-79-balloon__content {
      background: transparent;
    }
    .ymaps-2-1-79-balloon__close-button {
      width: 20px;
      height: 20px;

      margin: 10px 10px 0 0;
      -webkit-mask-image: url('@/assets/images/svg/closeIcon.svg');
      -webkit-mask-repeat: no-repeat;
      mask-image: url('@/assets/images/svg/closeIcon.svg');
      mask-repeat: no-repeat;
      background: $white;
    }
  }

  &__balloon {
    width: 100%;
    height: 100%;
    background: transparent;

    color: $white;
    font-weight: 500;
  }

  &__balloon-name {
    font-weight: 600;
    margin-bottom: 10px;
  }

  &__balloon-address {
    color: $gray-light;
    font-weight: 400;

    margin-bottom: 5px;
  }

  &__balloon-hours {
    color: $gray-light;
    font-weight: 400;

    margin-bottom: 10px;
  }

  .dealers__nearest-button {
    display: flex;
    justify-content: center;

    border-color: $gray-border;

    margin-bottom: 30px;
  }

  &__shops-list {
    display: flex;

    overflow-x: scroll;

    padding: 0 0 20px 0;

    column-gap: 20px;

    scrollbar-width: auto;
    scrollbar-color: $gray, $black-input;

    &::-webkit-scrollbar {
      height: 9px;
      background: $black-input;
      border-radius: 15px;
    }

    &::-webkit-scrollbar-thumb {
      height: 100%;
      width: auto;
      background: $gray;
      border-radius: 15px;

      cursor: pointer;
    }
  }

  &__shops-list-item {
    display: grid;

    width: 100%;
    min-width: 290px;

    color: $gray;
    line-height: 140%;
  }

  &__shop-name {
    font-size: 16px;
    color: $white;
    line-height: normal;

    margin-bottom: 10px;

    &:active {
      color: $red-active;
    }
  }

  &__shop-tel {
    margin-bottom: 10px;
  }

  .dealers__show-route {
    display: flex;
    align-items: center;

    text-transform: initial;
    font-weight: 400;
    color: $gray;

    svg {
      margin-right: 8px;
      margin-bottom: 4px;
    }
  }
}
</style>
