<template>
<div class="slider">
  <div class="slider__container">
    <div class="slider__content">
      <slot></slot>
    </div>
    <div class="slider__pagination">
      <div class="slider__pagination-button slider__pagination-button--prev">
        <svg class="icon24 fill-white">
          <use href="@/assets/images/svg/navArrowIcon.svg#icon"></use>
        </svg>
      </div>
      <ul class="slider__pagination-list">
        <li class="slider__pagination-list-item slider__pagination-list-item--active">1</li>
        <li class="slider__pagination-list-item">2</li>
        <li class="slider__pagination-list-item">3</li>
      </ul>
      <div class="slider__pagination-button slider__pagination-button--next">
        <svg class=" icon24 fill-white">
          <use href="@/assets/images/svg/navArrowIcon.svg#icon"></use>
        </svg>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.slider {
  background: black;
  width: 100%;

  &__container {
    position: relative;

    padding: 0 69px;

    width: 100%;
    height: 50vh;
  }

  &__pagination {
    position: absolute;
    bottom: 60px;

    display: grid;
    grid-template-columns: 20% 60% 20%;

    width: 70%;
  }

  &__pagination-list {
    display: flex;
    justify-content: center;
    align-items: center;

    color: $white;
  }

  &__pagination-list-item {
    width: 19px;
    height: 19px;

    margin-right: 26px;

    &--active {
      background-color: $white;
      border-radius: 50%;

      margin-bottom: 4px;
    }
  }

  &__pagination-button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 48px;
    height: 48px;

    border: 1px solid rgba(255 255 255 / 10%);
    border-radius: 50%;

    &--prev {
      transform: rotate(180deg);
      justify-self: start;
    }

    &--next {
      justify-self: end;
    }
  }
}
</style>