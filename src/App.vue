<template>
  <the-header @openSidebar="openSidebar" class="header"></the-header>
  <Transition>
    <the-sidebar v-if="isActiveSidebar" @closeSidebar="closeSidebar"></the-sidebar>
  </Transition>
  <RouterView class="app" />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'

import TheHeader from '@/components/TheHeader.vue'
import TheSidebar from '@/components/TheSidebar.vue'

const isActiveSidebar = ref(false)
const closeSidebar = () => {
  isActiveSidebar.value = false
  document.querySelector('body').style.overflow = 'auto'
}

const openSidebar = () => {
  isActiveSidebar.value = true
  document.querySelector('body').style.overflow = 'hidden'
}
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: 0.5s ease;
  opacity: 100%;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.header {
  position: fixed;
  top: 0;

  z-index: 9999;
}

.app {
  background: $background-light;
}
</style>
