<template>
  <div class="skeleton-category">
    <div class="skeleton-category__wrapper">
      <img class="skeleton-category__background" src="@/assets/images/skeletonCategory.webp" />
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

    object-fit: cover;

    filter: blur(5px);

    animation: blurAnimation 1.5s infinite linear;
  }
}

@keyframes blurAnimation {
  0% {
    filter: blur(5px);
  }
  25% {
    filter: blur(4px);
  }
  50% {
    filter: blur(3px);
  }
  75% {
    filter: blur(4px);
  }
  100% {
    filter: blur(5px);
  }
}

@keyframes flareAnimation {
  0% {
    left: -150%;
  }
  100% {
    left: 150%;
  }
}
</style>
