<template>
  <div class="modal" @click.stop.self="emits('closeModal')">
    <div class="modal__content">
      <base-button @onClick="emits('closeModal')" class="modal__close" :icon="true">
        <svg class="icon20 fill-gray">
          <use href="@/assets/images/svg/closeIcon.svg#icon"></use>
        </svg>
      </base-button>
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'

const emits = defineEmits(['closeModal'])
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $sidebar-bg;

  z-index: 9999;

  overflow: auto;

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;

    border-radius: 15px;
    width: 70%;

    padding: 30px 15px;

    background: $background-dark;
  }

  &__close {
    position: absolute;
    top: 15px;
    right: 15px;

    &:active {
      svg {
        fill: $red-active;
      }
    }
  }
}
</style>
