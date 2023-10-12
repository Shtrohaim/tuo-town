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

    @media (min-width: 768px) {
      min-width: 354px;
      min-height: 289px;
    }

    @media (min-width: 1440px) {
      min-width: 630px;
      min-height: 514px;
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
