<template>
  <div class="checkbox" :class="{ 'checkbox--checked': modelValue }" @click="onChange">
    <svg class="checkbox__icon icon20 fill-white" v-if="modelValue">
      <use href="@/assets/images/svg/checkIcon.svg#icon"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const onChange = () => {
  if (props.modelValue) {
    emits('update:modelValue', false)
  } else {
    emits('update:modelValue', true)
  }
}
</script>

<style scoped lang="scss">
.checkbox {
  display: block;

  position: relative;

  margin: 0;

  width: 18px;
  height: 18px;

  background: $white;

  border-radius: 4px;

  transition: all 0.2s ease-in-out;

  &__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.7);
  }

  &--checked {
    background: $background-dark;
  }
}
</style>
