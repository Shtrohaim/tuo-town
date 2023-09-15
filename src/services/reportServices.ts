import axios from '@/http/axios'

import type { ServiceType } from '@/types/formType'

export default {
  async sendReport(data: ServiceType) {
    return await axios.post(`/reports`, data)
  }
}
