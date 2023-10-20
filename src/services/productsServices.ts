import axios from '@/http/axios'
import router from '@/router'

export default {
  async getNewAndPopular() {
    return await axios.get(`/popular-new`)
  },
  async getCategoryCatalog(id: number) {
    return await axios.get(`/catalog/category/${id}`).catch((err: any) => {
      if (err.response.status === 404) {
        router.push({ name: 'not-found' })
      }
    })
  },
  async getProductCatalog(id: number) {
    return await axios.get(`/catalog/products/${id}`).catch((err: any) => {
      if (err.response.status === 404) {
        router.push({ name: 'not-found' })
      }
    })
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
    return await axios.get(`/products/${id}`).catch((err: any) => {
      if (err.response.status === 404) {
        router.push({ name: 'not-found' })
      }
    })
  }
}
