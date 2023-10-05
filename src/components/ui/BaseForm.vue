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
  align-items: center;
  row-gap: 15px;

  width: 100%;

  padding: 30px 15px;

  border-radius: 15px;
  background: $white;

  @media (min-width: 768px) {
    padding: 60px 25px;

    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>
