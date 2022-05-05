import Stripe from 'stripe'

export type Product = {
  id: string
  active?: boolean
  name: string
  description: string
  descriptionHtml?: string
  sku?: string
  slug?: string
  path?: string
  image?: string
  images: ProductImage[]
  variants: ProductVariant[]
  price: ProductPrice
  options: ProductOption[]
  metadata?: Stripe.Metadata
  vendor?: string
}

// start stripe subs
export interface ProductWithPrice extends Product {
  prices?: Price[]
}

export interface Price {
  id: string /* primary key */
  product_id?: string /* foreign key to products.id */
  active?: boolean
  description?: string
  unit_amount?: number
  currency?: string
  type?: string
  interval?: Stripe.Price.Recurring.Interval
  interval_count?: number
  trial_period_days?: number | null
  metadata?: Stripe.Metadata
  products?: Product
}

export interface PriceWithProduct extends Price {}

export interface Subscription {
  id: string /* primary key */
  user_id: string
  status?: Stripe.Subscription.Status
  metadata?: Stripe.Metadata
  price_id?: string /* foreign key to prices.id */
  quantity?: number
  cancel_at_period_end?: boolean
  created: string
  current_period_start: string
  current_period_end: string
  ended_at?: string
  cancel_at?: string
  canceled_at?: string
  trial_start?: string
  trial_end?: string
  prices?: Price
}

// end stripe subs

export type ProductImage = {
  url: string
  alt?: string
}

export type ProductPrice = {
  value: number
  currencyCode?: 'USD' | 'EUR' | 'ARS' | 'GBP' | string
  retailPrice?: number
  salePrice?: number
  listPrice?: number
  extendedSalePrice?: number
  extendedListPrice?: number
}

export type ProductOption = {
  __typename?: 'MultipleChoiceOption'
  id: string
  displayName: string
  values: ProductOptionValues[]
}

export type ProductOptionValues = {
  label: string
  hexColors?: string[]
}

export type ProductVariant = {
  id: string | number
  options: ProductOption[]
  availableForSale?: boolean
}

export type SearchProductsBody = {
  search?: string
  categoryId?: string | number
  brandId?: string | number
  sort?: string
  locale?: string
}

export type ProductTypes = {
  product: Product
  searchBody: SearchProductsBody
}

export type SearchProductsHook<T extends ProductTypes = ProductTypes> = {
  data: {
    products: T['product'][]
    found: boolean
  }
  body: T['searchBody']
  input: T['searchBody']
  fetcherInput: T['searchBody']
}

export type ProductsSchema<T extends ProductTypes = ProductTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getProducts: SearchProductsHook<T>
    }
  }
}

export type GetAllProductPathsOperation<T extends ProductTypes = ProductTypes> =
  {
    data: { products: Pick<T['product'], 'path'>[] }
    variables: { first?: number }
  }

export type GetAllProductsOperation<T extends ProductTypes = ProductTypes> = {
  data: { products: T['product'][] }
  variables: {
    relevance?: 'featured' | 'best_selling' | 'newest'
    ids?: string[]
    first?: number
  }
}

export type GetProductOperation<T extends ProductTypes = ProductTypes> = {
  data: { product?: T['product'] }
  variables: { path: string; slug?: never } | { path?: never; slug: string }
}
