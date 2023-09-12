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
  categoryId: number
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

export type {
  PromoType,
  ProductsType,
  ArticleType,
  CategoryType,
  PopularNewType,
  CatalogCategoryType,
  CatalogProductType,
  CatalogRecommendationType,
  FilterType
}
