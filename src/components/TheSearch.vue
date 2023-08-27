<template>
  <form
    class="search"
    @mousemove="activeSearch"
    @mouseleave="disableSearch"
    @touch="activeSearch"
    :class="{ 'search--hide': !isActiveBar }"
  >
    <input
      ref="searchBar"
      @focus="activeSearch"
      @focusout="disableSearch"
      placeholder="Поиск"
      class="search__input p_md"
    />
    <svg @click="onSubmit" class="icon24 fill-none stroke-white search__button">
      <use href="@/assets/images/svg/searchIcon.svg#icon"></use>
    </svg>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isActiveBar = ref(false)
const isFocused = ref(false)
const searchBar = ref()

const activeSearch = (event: any) => {
  isActiveBar.value = true

  if (event.type == 'focus') {
    isFocused.value = true
  }
}

const onSubmit = () => {
  if (!searchBar.value.value.trim()) {
    searchBar.value.focus()
  }
}

const disableSearch = (event: any) => {
  if (event.type == 'focusout') {
    isFocused.value = false
  }
  if (!isFocused.value) {
    isActiveBar.value = false
  }
}
</script>

<style scoped lang="scss">
.search {
  position: relative;
  min-height: 24px;
  min-width: 24px;
  border: 1px solid $gray-label;
  border-radius: 27px;

  &--hide {
    border: none;
  }

  &__input {
    height: 35px;
    background: transparent;
    border: none;
    outline: none;

    color: $white;

    padding: 0 35px 0 15px;
  }

  &__button {
    display: block;
    position: absolute;
    top: 5px;
    right: 5px;

    cursor: pointer;

    :hover {
      stroke: $red-active;
    }
  }
}
</style>
