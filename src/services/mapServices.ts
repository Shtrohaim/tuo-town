import axios from '@/http/axios'

export default {
  async getMarkers() {
    return await axios.get(`/map`)
  }
}
