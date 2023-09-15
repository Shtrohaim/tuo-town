<template>
  <div class="select">
    <label class="select__label p_md">{{ label }}</label>
    <div class="select__wrapper" @click="isActive = !isActive">
      <input v-model="value.value" class="select__input p_md" readonly />
      <span
        class="select__focus-border"
        :class="{ 'select__focus-border--active': isActive }"
      ></span>
      <svg class="icon24 select__icon fill-gray" :class="{ 'select__icon--active': isActive }">
        <use href="@/assets/images/svg/dropdownIcon.svg#icon"></use>
      </svg>
    </div>
    <Transition>
      <div class="select__dropdown" v-show="isActive">
        <ul class="select__dropdown-list">
          <li
            @click="changeValue(item)"
            class="select__dropdown-list-item p_sm"
            v-for="item in data"
            :key="item.code"
          >
            <span>{{ item.value }}</span>
            <div class="select__list-item-border"></div>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue'

import type { SelectType } from '@/types/formType'

const props = defineProps({
  data: {
    type: Array as PropType<SelectType[]>,
    default: () => [],
    required: true
  },
  modelValue: {
    type: Object as PropType<SelectType>,
    required: true
  },
  label: {
    type: String,
    required: false
  }
})

const emits = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (newValue: SelectType) => {
    emits('update:modelValue', newValue)
  }
})

const isActive = ref(false)
const changeValue = (newValue: SelectType) => {
  value.value = newValue
  isActive.value = false
}
</script>

<style scoped lang="scss">
.select {
  position: relative;
  background: $input-white;

  border-radius: 15px;

  padding: 15px;

  width: 100%;

  &__label {
    display: block;

    font-weight: 500;
    line-height: normal;
    color: $gray-border;

    margin-bottom: 10px;
  }

  &__wrapper {
    position: relative;
    cursor: pointer;
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

    cursor: pointer;
  }

  &__focus-border {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: $black-border;
    transition: 0.4s;

    &--active {
      width: 100%;
      transition: 0.4s;
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 10px;

    transform: translateY(-50%) rotate(180deg);
    transition: 0.4s ease-in-out;

    &--active {
      transform: translateY(-50%) rotate(0);
      transition: 0.4s ease-in-out;
    }
  }

  &__dropdown {
    position: absolute;
    top: 85%;
    left: 50%;

    transform: translateX(-50%);

    width: 95%;
    height: fit-content;
    max-height: 300px;

    border-radius: 15px;

    background: $white;

    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;

    z-index: 2;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__dropdown-list {
    display: flex;
    flex-direction: column;
    padding: 20px 15px;
  }

  &__dropdown-list-item {
    position: relative;

    padding: 20px 0;

    color: $black-input;
    font-weight: 500;

    cursor: pointer;

    &:active {
      opacity: 0.6;
    }
  }

  &__list-item-border {
    position: absolute;

    height: 1px;
    width: 100%;

    bottom: 0;

    background: $input-white;

    border-radius: 8px;
  }
}

.v-enter-active,
.v-leave-active {
  max-height: 300px;
  overflow: hidden;
  transition: all 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  max-height: 0;
  overflow: hidden;
  transition: all 0.4s ease;
}
</style>
