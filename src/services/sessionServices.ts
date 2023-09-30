import axios from '@/http/axios'

import { useSessionStore } from '@/stores/session'

export default {
  async getSession(sessionId: string) {
    return await axios.get(`/sessions/${sessionId}`).catch(async (err) => {
      if (err.response.status === 404) {
        localStorage.sessionId = Date.now() * (Math.floor(Math.random() * 10) + 1)
        await this.postSession(localStorage.sessionId).then(async () => {
          await this.getSession(localStorage.sessionId)
        })
      }
    })
  },
  async postSession(sessionId: string) {
    return await axios.post(`/sessions/`, { id: sessionId, total_count: 0 })
  },
  async patchTotalCount() {
    const store = useSessionStore()
    return await axios.patch(`/sessions/${localStorage.sessionId}`, {
      total_count: store.storeSession.total_count
    })
  }
}
