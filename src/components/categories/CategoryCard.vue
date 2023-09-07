<template>
  <router-link :to="{ name: 'products', params: { id: category?.id } }" class="category-card">
    <div class="category-card__wrapper">
      <base-image
        class="category-card__background"
        :src="`${category?.image}`"
        :alt="category?.title"
      />
      <div class="category-card__info">
        <h3 class="category-card__title p_hg">{{ category?.title }}</h3>
        <svg class="category-card__icon icon20 fill-white">
          <use href="@/assets/images/svg/navArrowIcon.svg#icon"></use>
        </svg>
      </div>
    </div>
  </router-link>
</template>

<script async setup lang="ts">
import { PropType } from 'vue'
import type { CategoryType } from '@/types/responseType'
import BaseImage from '@/components/ui/BaseImage.vue'

const props = defineProps({
  category: {
    type: Object as PropType<CategoryType>,
    required: true
  }
})
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
    height: 100%;

    object-fit: cover;

    z-index: 0;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    bottom: 20px;
    left: 15px;

    width: 90%;

    z-index: 1;
  }

  &__icon {
    justify-self: end;
  }

  &__title {
    display: block;

    font-weight: 600;
    color: $white;
  }
}
</style>
