<template>
  <div class="product-card">
    <div class="product-card__wrapper">
      <div class="product-card__image"></div>
      <button class="product-card__button" type="button">
        <svg class="icon24 fill-white">
          <use href="@/assets/images/svg/plusIcon.svg#icon"></use>
        </svg>
      </button>
    </div>
    <div class="product-card__info">
      <h3 class="p_sm product-card__name"></h3>
      <span class="p_hg product-card__price"></span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.product-card {
  position: relative;
  display: inline-block;

  @media (min-width: 768px) {
    height: 453px;
  }

  @media (min-width: 1440px) {
    height: 480px;
  }

  &__wrapper {
    position: relative;

    background: $background-dark;
    border-radius: 14px;

    padding: 15px 10px;

    width: 138px;
    height: 190px;

    @media (min-width: 768px) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 379px;
    }

    @media (min-width: 1440px) {
      width: 286px;
      height: 412px;
    }
  }

  &__image {
    height: 70%;
    width: 100%;
    background-image: $skeleton-gradient;
    background-size: 600px;
    animation: shine 1.6s infinite linear;

    border-radius: 14px;
  }

  &__button {
    position: absolute;
    top: 13px;
    right: 10px;

    padding: 0;

    height: 37px;
    width: 37px;

    border: none;
    background: transparent;

    @media (min-width: 768px) {
      top: 25px;
      right: 25px;
    }

    @media (min-width: 1440px) {
      top: 20px;
      right: 15px;
    }
  }

  &__info {
    position: absolute;

    display: flex;
    flex-direction: column;

    width: 100px;

    bottom: 6%;
    left: 10px;

    @media (min-width: 768px) {
      bottom: 15px;
      left: 0;
    }
  }

  &__name {
    height: 18px;
    width: 100px;

    background-image: $skeleton-gradient;
    background-size: 600px;
    animation: shine 1.6s infinite linear;

    border-radius: 4px;

    margin-bottom: 10px;

    @media (min-width: 768px) {
      width: 200px;
    }
  }

  &__price {
    height: 14px;
    width: 70px;

    background-image: $skeleton-gradient;
    background-size: 600px;
    animation: shine 1.6s infinite linear;

    border-radius: 4px;
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
