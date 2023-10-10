<template>
  <div
    class="button p_hg"
    @click="emits('onClick')"
    :class="{ 'button--disabled': disabled, 'button--filled': filled, 'button--icon': icon }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  filled: Boolean,
  disabled: Boolean,
  icon: Boolean
})
const emits = defineEmits(['onClick'])
</script>

<style scoped lang="scss">
.button {
  position: relative;
  display: inline-block;

  z-index: 3;
  color: $white;
  font-weight: 600;
  text-transform: uppercase;

  border: 2px solid $red-active;
  padding: 16px 34px;
  border-radius: 27px;

  transition: 0.3s;
  cursor: pointer;

  text-align: center;

  @media (min-width: 1440px) {
    line-height: 23px;
  }

  &:active {
    color: $red-active;
    border-radius: 0;
  }

  &--filled {
    background: $red-active;
    border: none;

    &:hover {
      background: $red;
    }

    &:active {
      color: $white;
    }
  }

  &--icon {
    padding: 0;
    border: none;
  }

  &--disabled {
    background: $gray-disable;
    border-color: $gray;
    color: $gray;
    cursor: default;

    &:active {
      border-radius: 27px;
      color: $gray;
    }
  }
}
</style>
