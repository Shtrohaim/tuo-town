import axios from '@/http/axios'

export default {
  async getNewAndPopular() {
    return await axios.get(`/popular-new`)
  },
  async getCategoryCatalog(id: number) {
    return await axios.get(`/catalog/category/${id}`)
  },
  async getProductCatalog(id: number) {
    return await axios.get(`/catalog/products/${id}`)
  },
  async getProductFilter(id: number) {
    return await axios.get(`/filter/${id}`)
  }
}
