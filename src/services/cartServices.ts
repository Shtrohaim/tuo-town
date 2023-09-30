import { ref } from 'vue'
import axios from '@/http/axios'
import { useSessionStore } from '@/stores/session'

import type { CartProductType, ProductsType } from '@/types/responseType'

import sessionServices from '@/services/sessionServices'

export default {
  async getCartProducts() {
    return await axios.get(`/cart-products?sessionId=${localStorage.sessionId}`)
  },
  async postCartProduct(product: ProductsType) {
    const store = useSessionStore()
    const fetchedProducts = ref()

    let duplicate = false

    store.updateCount(store.storeSession.total_count + 1)
    await sessionServices.patchTotalCount()
    await this.getCartProducts().then((res) => {
      fetchedProducts.value = res.data
    })
    fetchedProducts.value.forEach(async (item: CartProductType) => {
      if (item.productId === product.id) {
        duplicate = true
        item.count += 1
        return await this.patchCartProduct(item.id, item.count)
      }
    })
    if (!duplicate) {
      const data = {
        productId: product.id,
        sessionId: localStorage.sessionId,
        image: product.image,
        name: product.name,
        price: product.price,
        count: 1
      }
      return await axios.post(`/cart-products/`, data)
    }
  },
  async patchCartProduct(id: number, newCount: number) {
    await sessionServices.patchTotalCount()
    return await axios.patch(`/cart-products/${id}`, { count: newCount })
  },
  async deleteCartProduct(id: number) {
    await sessionServices.patchTotalCount()
    return await axios.delete(`/cart-products/${id}`)
  }
}
