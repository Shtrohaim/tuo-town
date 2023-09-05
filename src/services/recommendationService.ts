import axios from '@/http/axios'

export default {
  async getPromo() {
    return await axios.get(`/promo`)
  },
  async getProductRecommendation() {
    return await axios.get(`/products-recommendation`)
  },
  async getArticlesRecommendation() {
    return await axios.get(`/articles`)
  }
}
