import type { SelectType } from '@/types/formType'

interface PromoType {
  id: number
  image: string
  title: string
  description: string
  link: string
}

interface ProductsType {
  id: number
  name: string
  image: string
  background: string
  description: string
  gallery: string[]
  scheme: string
  price: number
  new: boolean
  count: number
  categoryId: number
  characteristics: {
    [key: string]: {
      name: string
      id: number
      value: string | number
    }
  }
}

interface ArticleType {
  id: number
  title: string
  image: string
  date: string
  description: string
  gallery: string[]
}

interface CategoryType {
  id: number
  title: string
  image: string
  catalogId: number
}

interface PopularNewType {
  popular: ProductsType
  new: ProductsType
}

interface CatalogCategoryType {
  id: number
  title: string
  description: string
  image: string
  category: CategoryType
}

interface CatalogProductType {
  id: number
  title: string
  image: string
  catalogId: number
  totalPages: number
  products: ProductsType
}

interface CatalogRecommendationType {
  id: number
  image: string
  title: string
}

interface FilterType {
  id: string
  title: string
  categoryId: number
  min_price: number
  max_price: number
  content: [
    {
      id: number
      title: string
    }
  ]
}

interface MapShopType {
  id: number
  address: string
  city: string
  coords: number[]
  email: string
  name: string
  opening_hours: string
  tel: string
  categories: ShopCategoriesType
}

interface ShopCategoriesType {
  cutlery: boolean
  grill: boolean
  knife: boolean
  sharpening_stones: boolean
}

interface CartProductType {
  id: number
  productId: number
  sessionId: string
  image: string
  name: string
  price: number
  count: any
}

export type {
  PromoType,
  ProductsType,
  ArticleType,
  CategoryType,
  PopularNewType,
  CatalogCategoryType,
  CatalogProductType,
  CatalogRecommendationType,
  FilterType,
  MapShopType,
  ShopCategoriesType,
  CartProductType
}
