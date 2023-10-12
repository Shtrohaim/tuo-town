<template>
  <div class="base-image" :class="{ 'base-image--loading': !isLoad }">
    <img class="base-image__image" draggable="false" @load="isLoad = true" :src="src" :alt="alt" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: false
  }
})
const isLoad = ref(false)
</script>

<style scoped lang="scss">
.base-image {
  display: flex;
  justify-content: center;
  align-items: center;

  &__image {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }

  &--loading {
    position: relative;
    z-index: 0;
    &::after {
      position: absolute;

      top: 0;
      left: 0;

      display: block;
      content: '';
      width: 100%;
      height: 100%;

      background-image: $skeleton-gradient;
      background-size: 600px;
      animation: shine 1.6s infinite linear;

      border-radius: 14px;

      z-index: 1;
    }
  }
}

@keyframes shine {
  0% {
    background-position: -100px;
  }
  40%,
  100% {
    background-position: 140px + 150;
  }
}
</style>
