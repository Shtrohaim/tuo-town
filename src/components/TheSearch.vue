<template>
  <form class="search">
    <input ref="searchBar" placeholder="Поиск" class="search__input p_md" />
    <base-button :icon="true" @onClick="onSubmit" class="search__button">
      <svg class="icon24 fill-none stroke-white">
        <use href="@/assets/images/svg/searchIcon.svg#icon"></use>
      </svg>
    </base-button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'

const searchBar = ref()
const onSubmit = () => {
  if (!searchBar.value.value.trim()) {
    searchBar.value.focus()
  }
}
</script>

<style scoped lang="scss">
.search {
  position: relative;
  min-height: 24px;
  min-width: 24px;
  border-radius: 27px;
  border: none;

  &:hover,
  &:focus-within {
    border: 1px solid $gray-label;

    .search__input {
      max-width: 180px;
      padding: 0 35px 0 15px;
      opacity: 1;
    }
  }

  &__input {
    height: 35px;
    background: transparent;
    border: none;
    outline: none;

    color: $white;

    max-width: 0;

    transition: all 0.3s ease;

    opacity: 0;

    &:focus {
      max-width: 180px;
      padding: 0 35px 0 15px;
      opacity: 1;
    }
  }

  &__button {
    display: block;
    position: absolute;
    top: 5px;
    right: 5px;

    cursor: pointer;

    svg:hover {
      stroke: $red-active;
    }
  }
}
</style>
