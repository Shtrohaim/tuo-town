<template>
  <main class="dealers container">
    <yandex-map
      ref="map"
      class="dealers__map"
      :settings="settings"
      :coords="mainCoords"
      :zoom="10"
      :controls="['routePanelControl']"
    >
      <div v-for="(coords, index) in coordsArray" :key="index">
        <ymap-marker :icon="marker" :coords="coords" :marker-id="index" cluster-name="Хакасия" />
      </div>
    </yandex-map>
    <form @submit.prevent="onSubmit">
      <input v-model="search" id="suggest" type="search" />
    </form>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch } from 'vue'

import { yandexMap, ymapMarker } from 'vue-yandex-maps'

import markerIcon from '@/assets/images/svg/pinIcon.svg'
import axios from '@/http/axios'

const map = ref()

const coordsArray = [
  [53.100762, 91.412204],
  [53.045567, 90.920592]
]

const myCoords = ref([])

const routePanelControl = ref()

const marker = {
  layout: 'default#imageWithContent',
  imageHref: markerIcon,
  imageSize: [40, 40],
  imageOffset: [-20, -40]
}

const mainCoords = ref(coordsArray[0])
const search = ref()
const mapLoading = ref()
const isLoad = ref(false)

const settings = {
  apiKey: 'd85b83e6-0670-4660-a8a2-b82073feda37',
  lang: 'ru_RU',
  enterprise: true,
  version: '2.1'
}
const onSubmit = async () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let newCoords = []
    newCoords.push(position.coords.latitude)
    newCoords.push(position.coords.longitude)
    myCoords.value = newCoords
    let lengthCoords = []
    coordsArray.map((coords) => {
      lengthCoords.push(
        Math.sqrt(
          Math.pow(myCoords.value[0] - coords[0], 2) + Math.pow(myCoords.value[1] - coords[1], 2)
        )
      )
    })
    let index = lengthCoords.indexOf(Math.min(...lengthCoords))
    mainCoords.value = coordsArray[1]

    routePanelControl.value.routePanel.state.set({
      // Тип маршрутизации.
      type: 'auto',
      // Выключим возможность задавать пункт отправления в поле ввода.
      // Адрес или координаты пункта отправления.
      from: myCoords.value,
      // Включим возможность задавать пункт назначения в поле ввода.
      // Адрес или координаты пункта назначения.
      to: coordsArray[1]
    })
  })

  // await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=d85b83e6-0670-4660-a8a2-b82073feda37&format=json&geocode=${search.value}`).then((res) => {
  //   mainCoords.value = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse()
  // })
}

onMounted(() => {
  mapLoading.value = setInterval(() => {
    isLoad.value = map.value.isReady
  }, 400)
})

watch(isLoad, () => {
  routePanelControl.value = map.value.myMap.controls.get('routePanelControl')
  routePanelControl.value.options.set({
    visible: false
  })
  clearInterval(mapLoading.value)
})

// const balloonTemplate = computed((coords) => {
//   return `
//         <h1 class="red">Hi, everyone!</h1>
//         <p>I am here: ${coords}</p>
//       `
// })
</script>

<style scoped lang="scss">
.dealers {
  &__map {
    display: flex;
    height: 50vh;
    width: 100%;

    margin-top: 100px;

    overflow: hidden;

    filter: grayscale(1);

    border-radius: 15px;
  }
}
</style>
