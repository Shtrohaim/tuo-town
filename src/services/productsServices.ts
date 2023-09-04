import axios from '@/http/axios'

export default {
  async getNewAndPopular() {
    return await axios.get(`/popular-new`)
  }
}
