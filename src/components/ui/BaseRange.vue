<template>
  <div class="range">
    <div class="range__price">
      <input
        @change="onChange"
        placeholder="0"
        class="range__input p_sm"
        v-model="curMinPrice"
        type="number"
      />
      <span class="p_hg">-</span>
      <input
        @change="onChange"
        :placeholder="`${maxPrice}`"
        class="range__input p_sm"
        v-model="curMaxPrice"
        type="number"
      />
    </div>
    <div class="range__slider">
      <div class="range__bar" ref="rangeBar">
        <div
          id="minPrice"
          class="range__handle-left"
          :style="{
            left: (curMinPrice * 100) / maxPrice + '%',
            'z-index': (curMinPrice * 100) / maxPrice > 50 ? 2 : 1
          }"
          @mousedown="touchStartMethod"
          @touchstart="touchStartMethod"
        ></div>
        <div class="range__bar-wrapper">
          <div
            class="range__progress"
            :style="{
              width:
                String(curMaxPrice).trim() === ''
                  ? 100 + '%'
                  : ((curMaxPrice - curMinPrice) * 100) / maxPrice + '%',
              margin: `0 0 0 ${(curMinPrice * 100) / maxPrice}%`
            }"
          ></div>
        </div>
        <div
          id="maxPrice"
          class="range__handle-right"
          :style="{
            right:
              String(curMaxPrice).trim() === '' ? 0 : 100 - (curMaxPrice * 100) / maxPrice + '%',
            'z-index': 100 - (curMaxPrice * 100) / maxPrice > 50 ? 2 : 1
          }"
          @mousedown="touchStartMethod"
          @touchstart="touchStartMethod"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  minPrice: {
    type: Number,
    required: true
  },
  maxPrice: {
    type: Number,
    required: true
  },
  curValues: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['onChange'])

const curMinPrice = ref(0)
const curMaxPrice = ref(0)

const posInit = ref(0)
const posX1 = ref(0)
const posX2 = ref(0)

const translateLeft = ref(0)

const translateRight = ref(0)

const target = ref('')

const rangeBar = ref()

const onChange = () => {
  emits('onChange', {
    minPrice: curMinPrice.value,
    maxPrice: curMaxPrice.value
  })
}
const touchStartMethod = (event: any) => {
  posInit.value = posX1.value = event.changedTouches
    ? event.changedTouches[0].clientX
    : event.clientX

  if (String(curMinPrice.value).trim() === '') {
    curMinPrice.value = props.minPrice
  }

  if (String(curMaxPrice.value).trim() === '') curMaxPrice.value = props.maxPrice

  target.value = event.target.id

  if (event.target.id === 'minPrice')
    translateLeft.value =
      (((curMinPrice.value * 100) / props.maxPrice) * rangeBar.value.offsetWidth) / 100

  if (event.target.id === 'maxPrice')
    translateRight.value =
      ((100 - (curMaxPrice.value * 100) / props.maxPrice) * rangeBar.value.offsetWidth) / -100

  addEventListener('touchmove', swipeAction)
  addEventListener('touchend', swipeEnd)
  addEventListener('mousemove', swipeAction)
  addEventListener('mouseup', swipeEnd)
}

const swipeAction = (event: any) => {
  let clientX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX
  posX2.value = posX1.value - clientX
  posX1.value = clientX

  let percent: number = 0

  if (target.value === 'minPrice') {
    translateLeft.value = translateLeft.value < 0 ? 0 : translateLeft.value - posX2.value

    percent = Math.abs((translateLeft.value * 100) / rangeBar.value.offsetWidth)

    curMinPrice.value = Math.ceil((props.maxPrice * percent) / 100)
  }

  if (target.value === 'maxPrice') {
    translateRight.value = translateRight.value > 0 ? 0 : translateRight.value - posX2.value

    percent = Math.abs((translateRight.value * 100) / rangeBar.value.offsetWidth)

    curMaxPrice.value = Math.ceil((props.maxPrice * (100 - percent)) / 100)
  }
}

const swipeEnd = () => {
  onChange()

  removeEventListener('touchmove', swipeAction)
  removeEventListener('touchend', swipeEnd)
  removeEventListener('mousemove', swipeAction)
  removeEventListener('mouseup', swipeEnd)
}

onMounted(() => {
  curMinPrice.value = props.curValues.minPrice
  curMaxPrice.value = props.curValues.maxPrice
})

watch(curMinPrice, () => {
  if (curMinPrice.value < props.minPrice) {
    curMinPrice.value = props.minPrice
  }
  if (curMinPrice.value > curMaxPrice.value) {
    curMinPrice.value = curMaxPrice.value
  }
})

watch(curMaxPrice, () => {
  if (curMaxPrice.value > props.maxPrice) {
    curMaxPrice.value = props.maxPrice
  }

  if (curMaxPrice.value < curMinPrice.value) {
    curMaxPrice.value = curMinPrice.value
  }
})
</script>

<style scoped lang="scss">
.range {
  width: 100%;
  padding: 10px 0;

  &__price {
    display: flex;
    justify-content: space-around;
    align-items: center;

    margin-bottom: 20px;
    color: $white;
  }

  &__input {
    width: 40%;

    background: transparent;
    border: none;
    border-bottom: 1px solid $gray;
    outline: none;

    padding: 8px;

    color: $white;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  &__bar {
    position: relative;
    width: 90%;
    height: 5px;

    background: $background-dark;

    border-radius: 5px;

    margin: 0 auto;
  }

  &__bar-wrapper {
    width: 100%;
    overflow: hidden;
  }

  &__progress {
    position: absolute;
    top: 0;
    left: 0;

    height: 5px;
    width: 100%;
    background: $red-active;

    object-fit: cover;
  }

  &__handle-right {
    position: absolute;
    top: 0;
    right: 0;

    width: 15px;
    height: 15px;

    border-radius: 50%;

    transform: translate(50%, -30%);

    background: $red-active;

    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  &__handle-left {
    position: absolute;
    top: 0;
    left: 0;

    width: 15px;
    height: 15px;

    border-radius: 50%;

    transform: translate(-50%, -30%);

    background: $red-active;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
}
</style>
