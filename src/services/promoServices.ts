import axios from '@/http/axios'

export default {
  async getMainRecommendations() {
    return await axios.get(`/promo`)
  }
}
