<template>
  <form class="form" @keydown.enter="emits['onSubmit']">
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

  border-radius: 15px;
  background: $white;
}
</style>
