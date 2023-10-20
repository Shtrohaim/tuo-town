import axios from '@/http/axios'
import router from '@/router'

export default {
  async getArticlesRecommendation() {
    return await axios.get(`/articles?_limit=3`)
  },
  async getAllArticles() {
    return await axios.get(`/articles`)
  },
  async getArticle(id: number) {
    return await axios.get(`/articles/${id}`).catch((err: any) => {
      if (err.response.status === 404) {
        router.push({ name: 'not-found' })
      }
    })
  }
}
