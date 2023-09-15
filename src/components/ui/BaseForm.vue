<template>
  <form class="form" @keydown.enter.prevent="emits('onSubmit')">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
const emits = defineEmits(['onSubmit'])
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;

  width: 100%;

  padding: 30px 15px;

  border-radius: 15px;
  background: $white;
}
</style>
