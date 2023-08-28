<template>
  <a href="#" class="product-card">
    <div class="product-card__wrapper">
      <img :src="product.image" />
      <button class="product-card__button" type="submit">
        <svg class="icon24 fill-white">
          <use href="@/assets/images/svg/plusIcon.svg#icon"></use>
        </svg>
      </button>
    </div>
    <div class="product-card__info">
      <span class="p_sm product-card__name"> {{ product.name }} </span>
      <span class="p_hg product-card__price">{{ product.price }}</span>
    </div>
    <span class="product-card__new p_sm" v-if="product.new">Новинка</span>
  </a>
</template>

<script setup lang="ts">
const product = {
  name: 'Складной нож SQ01-B',
  price: 800,
  image: 'src/assets/images/server/2.png',
  new: true
}
</script>

<style scoped lang="scss">
.product-card {
  position: relative;

  &__wrapper {
    position: relative;

    background: $background-dark;
    border-radius: 14px;

    padding: 15px 10px;

    width: 138px;
    height: 190px;
  }

  &__button {
    position: absolute;
    top: 15px;
    right: 15px;

    padding: 0;

    border: none;
    background: transparent;

    &:hover {
      cursor: pointer;
    }
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
