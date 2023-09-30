<template>
  <the-header @openSidebar="openSidebar" class="header"></the-header>
  <Transition>
    <the-sidebar v-if="isActiveSidebar" @closeSidebar="closeSidebar"></the-sidebar>
  </Transition>
  <router-view class="app" />
  <the-footer></the-footer>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'

import TheHeader from '@/components/global/TheHeader.vue'
import TheSidebar from '@/components/global/TheSidebar.vue'
import TheFooter from '@/components/global/TheFooter.vue'
import sessionServices from '@/services/sessionServices'
import { useSessionStore } from '@/stores/session'
import { storeToRefs } from 'pinia'

const sessionStore = useSessionStore()
const fetchSession = async () => {
  if (localStorage.sessionId && localStorage.sessionId !== '') {
    await sessionServices.getSession(localStorage.sessionId).then((res) => {
      sessionStore.setSession(res.data)
    })
  } else {
    localStorage.sessionId = Date.now() * (Math.floor(Math.random() * 10) + 1)
    await sessionServices.postSession(localStorage.sessionId)
  }
}

const isActiveSidebar = ref(false)
const closeSidebar = () => {
  isActiveSidebar.value = false
  document.querySelector('body').style.overflow = 'auto'
}

const openSidebar = () => {
  isActiveSidebar.value = true
  document.querySelector('body').style.overflow = 'hidden'
}

onMounted(async () => {
  await fetchSession()
})
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
