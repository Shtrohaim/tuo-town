import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { SessionType } from '@/types/storeType'

export const useSessionStore = defineStore('session', () => {
  const session = ref({} as SessionType)

  const storeSession = computed(() => session.value)

  const updateCount = (newCount: number) => (session.value.total_count = newCount)
  function setSession(data: any) {
    session.value = data
  }

  return { session, storeSession, setSession, updateCount }
})
