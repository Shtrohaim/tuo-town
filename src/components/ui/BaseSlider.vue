<template>
  <div class="slider">
    <div class="slider__container" :style="{ height: props.height + 'px' }">
      <div
        ref="sliderContent"
        class="slider__content"
        @mousedown="touchStartMethod"
        @touchstart="touchStartMethod"
        :style="{
          transform: `translate3d(${translateX}px,0,0)`,
          transition: transitionTime + 'ms'
        }"
      >
        <slot></slot>
      </div>
      <div v-if="havePagination" class="slider__pagination">
        <button
          class="slider__pagination-button slider__pagination-button--prev"
          @click="pagination(slide - 1)"
        >
          <svg class="icon24 fill-white">
            <use href="@/assets/images/svg/navArrowIcon.svg#icon"></use>
          </svg>
        </button>
        <ul class="slider__pagination-list">
          <li
            v-for="item in filteredItems"
            :key="item"
            @click="pagination(carousel ? item + 1 : item)"
            class="slider__pagination-list-item"
            :class="{
              'slider__pagination-list-item--active':
                (item == slide - 1 && carousel) || (item == slide && !carousel)
            }"
          >
            {{ item }}
          </li>
        </ul>
        <button
          class="slider__pagination-button slider__pagination-button--next"
          @click="pagination(slide + 1)"
        >
          <svg class="icon24 fill-white">
            <use href="@/assets/images/svg/navArrowIcon.svg#icon"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script async setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  havePagination: Boolean,
  carousel: Boolean,
  height: Number
})

const slide = props.carousel ? ref(2) : ref(1)
const slides = ref(1)
const sliderContent = ref()
const width = ref(0)
const translateX = ref(0)
const transitionTime = ref(0)
const posInit = ref(0)
const posX1 = ref(0)
const posX2 = ref(0)
const posFinal = ref(0)
const posThreshold = ref(0)
const inTransition = ref(false)

const carouselBegin = ref()
const carouselEnd = ref()

const deviceWidth = ref(window.innerWidth)

const resize = () => {
  if (props.carousel) {
    deviceWidth.value = window.innerWidth
    width.value = deviceWidth.value
    posThreshold.value = width.value * 0.35
    carouselBegin.value.style.width = width.value + 'px'
    carouselEnd.value = width.value + 'px'
    translateX.value = -width.value
    slide.value = 2
  }
}

addEventListener('resize', resize)

const pagination = (newSlide: number) => {
  if (!inTransition.value) {
    transitionTime.value = 400
    slide.value = newSlide
    translateX.value = 0 - width.value * (newSlide - 1)
    inTransition.value = true

    setTimeout(() => {
      inTransition.value = false
    }, 402)
  }
}

const filteredItems = computed(() => {
  let begin = 1
  let step = deviceWidth.value <= 640 ? 3 : 6
  let end = step
  if (slide.value - 1 >= step && props.carousel) {
    begin = slide.value > slides.value ? slide.value - step : slide.value - step + 1
    end = slide.value + 1 > slides.value ? slides.value : slide.value
  }
  if (slide.value >= step && !props.carousel) {
    begin = slide.value >= slides.value ? slide.value - 2 : slide.value - 1
    end = slide.value + 1 > slides.value ? slides.value : slide.value + 1
  }

  return Array.from({ length: end - begin + 1 }, (value, index) => begin + index)
})
const touchStartMethod = (event: any) => {
  if (!inTransition.value) {
    posInit.value = posX1.value = event.changedTouches
      ? event.changedTouches[0].clientX
      : event.clientX

    transitionTime.value = 0

    addEventListener('touchmove', swipeAction)
    addEventListener('touchend', swipeEnd)
    addEventListener('mousemove', swipeAction)
    addEventListener('mouseup', swipeEnd)
  }
}

const swipeAction = (event: any) => {
  let clientX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX
  posX2.value = posX1.value - clientX
  posX1.value = clientX

  translateX.value = translateX.value - posX2.value
}

const swipeEnd = () => {
  let noPagination = false
  posFinal.value = posInit.value - posX1.value

  removeEventListener('touchmove', swipeAction)
  removeEventListener('mousemove', swipeAction)
  removeEventListener('touchend', swipeEnd)
  removeEventListener('mouseup', swipeEnd)

  if (
    Math.abs(posFinal.value) > posThreshold.value &&
    width.value >= sliderContent.value.clientWidth
  ) {
    if (posInit.value < posX1.value) {
      slide.value--
    } else if (posInit.value > posX1.value) {
      slide.value++
    }
  } else if (width.value < sliderContent.value.clientWidth) {
    noPagination = true
    if (translateX.value < sliderContent.value.scrollWidth * -1 + sliderContent.value.clientWidth) {
      translateX.value = sliderContent.value.scrollWidth * -1 + sliderContent.value.clientWidth - 15
      transitionTime.value = 400
    } else if (translateX.value > 0) {
      translateX.value = 0
      transitionTime.value = 400
    }
  }

  if (posInit.value !== posX1.value && !noPagination) {
    pagination(slide.value)
  }
}

onMounted(() => {
  width.value =
    sliderContent.value.children[0].offsetWidth < deviceWidth.value
      ? sliderContent.value.children[0].offsetWidth
      : deviceWidth.value
  posThreshold.value = width.value * 0.35
  setTimeout(() => {
    slides.value = sliderContent.value.children.length
    if (props.carousel) {
      translateX.value = -width.value
      carouselBegin.value = sliderContent.value.children[slides.value - 1].cloneNode(true)
      carouselEnd.value = sliderContent.value.children[0].cloneNode(true)
      sliderContent.value.append(carouselEnd.value)
      sliderContent.value.prepend(carouselBegin.value)
    }
  }, 500)
})

onUnmounted(() => {
  removeEventListener('resize', resize)
})

watch(slide, () => {
  if (slide.value == 1 && props.carousel) {
    slide.value = slides.value + 1
    setTimeout(() => {
      transitionTime.value = 0
      translateX.value = width.value * slides.value * -1
    }, 420)
  } else if (slide.value == slides.value + 2 && props.carousel) {
    slide.value = 2
    setTimeout(() => {
      transitionTime.value = 0
      translateX.value = -width.value
    }, 420)
  }
  if (slide.value < 1 && !props.carousel) {
    slide.value = 1
    translateX.value = 0
  } else if (slide.value > slides.value && !props.carousel) {
    slide.value = slides.value
    translateX.value = width.value * (slides.value - 1) * -1
  }
})
</script>

<style scoped lang="scss">
.slider {
  width: 100%;

  &__container {
    position: relative;

    width: 100%;

    overflow: hidden;
  }

  &__content {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
  }

  &__pagination {
    position: absolute;
    bottom: 60px;
    left: 50%;

    transform: translateX(-50%);

    display: grid;
    grid-template-columns: 15% 70% 15%;

    width: 90%;

    z-index: 2;
  }

  &__pagination-list {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    color: $white;
  }

  &__pagination-list-item {
    width: 19px;
    height: 19px;

    margin: 0 21px;

    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    font-weight: 600;

    cursor: pointer;

    &--active {
      background-color: $white;
      border-radius: 50%;

      margin-bottom: 4px;

      cursor: default;
    }
  }

  &__pagination-button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 48px;
    height: 48px;

    background: transparent;

    border: 1px solid $border-line;
    border-radius: 50%;

    &--prev {
      transform: rotate(180deg);
      justify-self: start;
    }

    &--next {
      justify-self: end;
    }
  }
}
</style>
