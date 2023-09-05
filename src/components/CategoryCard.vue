<template>
  <a href="#" class="category-card">
    <div class="category-card__wrapper">
      <img class="category-card__background" :src="categories.images" />
      <div class="category-card__info">
        <h3 class="category-card__title p_hg">{{ categories.title }}</h3>
        <svg class="icon20 fill-white">
          <use href="@/assets/images/svg/navArrowIcon.svg#icon"></use>
        </svg>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const categories = {
  id: 0,
  title: 'Познакомьтесь с коллекцией ножей TUOTOWN',
  images: 'src/assets/images/server/3.jpg'
}
</script>

<style scoped lang="scss">
.category-card {
  display: inline-block;

  &:hover {
    .category-card__background {
      transform: scale(1.15);
      filter: blur(3px);
    }
  }

  &__wrapper {
    position: relative;

    overflow: hidden;

    min-width: 290px;
    max-width: 290px;

    min-height: 236px;

    border-radius: 14px;
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;

    transition: all 0.3s linear;

    width: 100%;

    object-fit: cover;

    z-index: 0;
  }

  &__info {
    display: flex;
    position: absolute;
    bottom: 20px;
    left: 15px;

    z-index: 1;
  }

  &__title {
    display: block;

    width: 87%;

    font-weight: 600;
    color: $white;
  }
}
</style>
