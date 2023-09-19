<template>
  <section class="service-other">
    <h2 class="h2 service-other__title">Здесь будут {{ route.meta.title }}</h2>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped lang="scss">
.service-other {
  height: 30vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  &__title {
    color: $white;
    text-transform: uppercase;
  }
}
</style>
