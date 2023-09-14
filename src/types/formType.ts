interface ServiceType {
  email: {
    value: string
    required: boolean
  }
  tel: {
    value: string
    required: boolean
  }
  name: {
    value: string
    required: boolean
  }
  comment: {
    value: string
    required: boolean
  }
  topic: {
    value: string
    required: boolean
  }
}

export type { ServiceType }
