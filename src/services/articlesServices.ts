import axios from '@/http/axios'

export default {
  async getArticlesRecommendation() {
    return await axios.get(`/articles?_limit=3`)
  },
  async getAllArticles() {
    return await axios.get(`/articles`)
  },
  async getArticle(id: number) {
    return await axios.get(`/articles/${id}`)
  }
}
