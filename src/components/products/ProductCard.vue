<template>
  <router-link :to="{ path: `/product/${product.id}` }" class="product-card">
    <div class="product-card__wrapper">
      <base-image class="product-card__image" :src="`${product.image}`" :alt="product.name" />
      <button @click.prevent.stop="" class="product-card__button" type="submit">
        <svg class="icon24 fill-white">
          <use href="@/assets/images/svg/plusIcon.svg#icon"></use>
        </svg>
        <svg class="icon20 fill-white product-card__shop-icon">
          <use href="@/assets/images/svg/shopIcon.svg#icon"></use>
        </svg>
      </button>
    </div>
    <div class="product-card__info">
      <h3 class="p_sm product-card__name">{{ product.name }}</h3>
      <span class="p_hg product-card__price">{{ product.price }}</span>
    </div>
    <span class="product-card__new p_sm" v-if="product.new">Новинка</span>
  </router-link>
</template>

<script setup lang="ts">
import BaseImage from '@/components/ui/BaseImage.vue'

import type { ProductsType } from '@/types/responseType'
import type { PropType } from 'vue'

const props = defineProps({
  product: {
    type: Object as PropType<ProductsType>,
    required: true
  }
})
</script>

<style scoped lang="scss">
.product-card {
  position: relative;
  display: inline-block;

  &:hover {
    .product-card__name {
      color: $red-active;
    }

    .product-card__button {
      background: $red-active;
    }
  }

  &__wrapper {
    position: relative;

    background: $background-dark;
    border-radius: 14px;

    padding: 15px 10px;

    width: 138px;
    height: 190px;
  }

  &__image {
    width: 100%;
    height: 65%;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 5px;
    right: 10px;

    padding: 0;

    height: 37px;
    width: 37px;

    border: none;
    border-radius: 27px;
    background: transparent;

    transition: all 0.3s ease;

    &:hover {
      cursor: pointer;
      width: 72px;

      z-index: 1;

      .product-card__shop-icon {
        display: block;
        margin-left: 10px;
      }
    }
  }

  &__shop-icon {
    display: none;
  }

  &__info {
    position: absolute;

    display: flex;
    flex-direction: column;

    width: 100px;

    bottom: 8%;
    left: 8px;
  }

  &__name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    line-clamp: 2;
    -webkit-line-clamp: 2;

    margin-bottom: 10px;

    color: $white;
  }

  &__price {
    color: $gray-light;
    font-weight: 600;

    &::after {
      content: ' р.';
    }
  }

  &__new {
    position: absolute;

    top: 20px;
    left: 15px;

    color: $red-light;
  }
}
</style>
