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
  async getFilteredProduct(params: any) {
    return await axios.get(`/products?categoryId=${params.id}${params.filter}`)
  },
  async getSearchingProduct(params: any) {
    return await axios.get(`/products?${params.filter}`)
  },
  async getProductFilter(id: number) {
    return await axios.get(`/filter/${id}`)
  },
  async getProduct(id: number) {
    return await axios.get(`/products/${id}`)
  }
}
