<template>
  <div class="base-input" :class="{ 'base-input--dark': dark }">
    <label class="base-input__label p_md">{{ label }}</label>
    <div class="base-input__wrapper">
      <input class="base-input__input p_md" v-model="value" :placeholder="placeholder" />
      <span
        class="base-input__focus-border"
        :class="{
          'base-input__focus-border--success': value && !error,
          'base-input__focus-border--error': error
        }"
      ></span>
      <svg class="base-input__icon icon20" v-if="required">
        <use href="@/assets/images/svg/starIcon.svg#icon"></use>
      </svg>
    </div>
    <span v-if="error" class="base-input__error-message p_sm">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String
  },
  placeholder: {
    type: String
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  dark: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emits('update:modelValue', newValue.trim())
})
</script>

<style scoped lang="scss">
.base-input {
  background: $input-white;

  border-radius: 15px;

  padding: 15px;

  width: 100%;

  &--dark {
    background: $cart-input-background;

    .base-input__label {
      color: $gray;
    }

    .base-input__input {
      color: $gray-light;
    }

    .base-input__focus-border {
      background-color: $white;

      &--success {
        width: 100%;

        background-color: $border-success;
      }

      &--error {
        width: 100%;

        background-color: $red-active;
      }
    }
  }

  &__label {
    display: block;

    font-weight: 500;
    line-height: normal;
    color: $gray-border;

    margin-bottom: 10px;
  }

  &__wrapper {
    position: relative;
  }

  &__input {
    outline: none;
    border: none;
    border-bottom: 1px solid $gray-border;
    background: transparent;

    width: 100%;

    padding: 8px 30px 8px 0;

    color: $input-text;
    line-height: normal;

    &:focus ~ .base-input__focus-border {
      width: 100%;
      transition: 0.4s;
    }
  }

  &__focus-border {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: $black-border;
    transition: 0.4s;

    &--success {
      width: 100%;

      background-color: $border-success;
    }

    &--error {
      width: 100%;

      background-color: $red-active;
    }
  }

  &__error-message {
    display: block;

    color: $red-active;

    margin-top: 5px;

    line-height: 12px;
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 10px;

    transform: translateY(-50%);
  }
}
</style>
