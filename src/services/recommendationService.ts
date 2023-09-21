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
  },
  async getCatalogRecommendation() {
    return await axios.get(`/catalog-recommendation`)
  },
  async getRecommendation(catalog_id: number | undefined, product_id: number | undefined) {
    return await axios.get(`/products?categoryId=${catalog_id}&id_ne=${product_id}&_limit=4`)
  }
}
