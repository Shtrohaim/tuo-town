interface PromoType {
  id: number
  image: string
  title: string
  description: string
  link: boolean
}

interface ProductsType {
  id: number
  name: string
  image: string
  price: number
  new: boolean
  count: number
}

interface ArticleType {
  id: number
  title: string
  image: string
  date: string
}

interface CategoryType {
  id: number
  title: string
  image: string
}

export type { PromoType, ProductsType, ArticleType, CategoryType }
