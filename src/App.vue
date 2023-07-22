<template>
  <the-header class="header"></the-header>
  <base-slider></base-slider>
   <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import baseSlider from '@/components/base/baseSlider.vue'
</script>

<style>
.header {
  position: sticky;
  top: 0;
}

</style>
