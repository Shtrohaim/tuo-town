<template>
  <div class="base-textarea">
    <label class="base-textarea__label p_md">{{ label }}</label>
    <textarea v-model="value" class="base-textarea__textarea p_md" :placeholder="placeholder" />
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
  modelValue: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emits('update:modelValue', newValue)
})
</script>

<style scoped lang="scss">
.base-textarea {
  width: 100%;

  &__label {
    display: block;

    font-weight: 500;
    line-height: normal;
    color: $gray-border;

    margin-bottom: 10px;
    margin-left: 15px;
  }

  &__textarea {
    width: 100%;
    min-height: 182px;
    resize: none;

    outline: none;
    border: none;
    border-radius: 15px;

    padding: 17px 15px;

    background: $input-white;
    color: $input-text;
  }
}
</style>
