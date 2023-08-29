import axios from '@/http/axios'

export default {
  async getProductRecommendation() {
    return await axios.get(`/products-recommendation`)
  },
  async getArticlesRecommendation() {
    return await axios.get(`/articles`)
  }
}
