<template>
  <div class="skeleton-category">
    <div class="skeleton-category__wrapper">
      <div class="skeleton-category__background"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.skeleton-category {
  &__wrapper {
    position: relative;

    overflow: hidden;

    min-width: 290px;
    max-width: 290px;

    min-height: 236px;

    border-radius: 14px;

    &::after {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      height: 100%;
      width: 45px;
      transform: skewX(-45deg);
      left: -150%;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
      animation: flareAnimation 1.5s infinite linear;
    }
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-image: $skeleton-gradient;
    background-size: 600px;
    animation: shine 1.6s infinite linear;
  }
}

@keyframes shine {
  0% {
    background-position: -100px;
  }
  40%,
  100% {
    background-position: 140px;
  }
}
</style>
