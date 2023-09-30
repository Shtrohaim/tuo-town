interface ServiceType {
  email: {
    value: string | undefined
    required: boolean
  }
  tel: {
    value: string | undefined
    required: boolean
  }
  name: {
    value: string | undefined
    required: boolean
  }
  comment: {
    value: string | undefined
    required: boolean
  }
  topic: {
    value: undefined
    data: SelectType
    required: boolean
  }
}

interface SelectType {
  value: number | string
  code: number
}

export type { ServiceType, SelectType }
