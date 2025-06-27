// Типы для API данных

export interface StockItem {
  date: string
  last_change_date: string
  supplier_article: string
  tech_size: string
  barcode: number
  quantity: number
  is_supply: boolean
  is_realization: boolean
  quantity_full: number
  warehouse_name: string
  in_way_to_client: number
  in_way_from_client: number
  nm_id: number
  subject: string
  category: string
  brand: string
  sc_code: number
  price: string
  discount: string
}

export type SalesItem = Record<string, unknown>

export type OrderItem = Record<string, unknown>

export interface IncomeItem {
  income_id: number
  number: string
  date: string
  last_change_date: string
  supplier_article: string
  tech_size: string
  barcode: number
  quantity: number
  total_price: string
  date_close: string
  warehouse_name: string
  nm_id: number
}

export interface PaginationMeta {
  current_page: number
  from: number | null
  last_page: number
  links: Array<{
    url: string | null
    label: string
    active: boolean
  }>
  path: string
  per_page: string
  to: number | null
  total: number
}

export interface PaginationLinks {
  first: string
  last: string
  prev: string | null
  next: string | null
}

export interface ApiResponse<T> {
  data: T[]
  links: PaginationLinks
  meta: PaginationMeta
}

// Типы для фильтров
export interface StockFilters {
  dateFrom?: string
  dateTo?: string
  warehouse_name?: string
  brand?: string
  category?: string
  is_supply?: boolean
  is_realization?: boolean
}

export interface SalesFilters {
  dateFrom?: string
  dateTo?: string
}

export interface OrderFilters {
  dateFrom?: string
  dateTo?: string
}

export interface IncomeFilters {
  dateFrom?: string
  dateTo?: string
}
