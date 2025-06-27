import axios from 'axios'
import type {
  ApiResponse,
  StockItem,
  SalesItem,
  OrderItem,
  IncomeItem,
  StockFilters,
  SalesFilters,
  OrderFilters,
  IncomeFilters,
} from '@/types/api'

// Получаем переменные окружения с fallback значениями
const protocol = import.meta.env.VITE_PROTOCOL || 'http://'
const host = import.meta.env.VITE_HOST || '109.73.206.144'
const port = import.meta.env.VITE_PORT || '6969'

// Логируем для отладки
console.log('API Config:', { protocol, host, port })
console.log('Base URL:', `${protocol}${host}:${port}/api`)

// Создаем экземпляр axios с базовой конфигурацией
const api = axios.create({
  baseURL: `${protocol}${host}:${port}/api`,
  timeout: 10000,
})

// Интерцептор для добавления ключа авторизации к каждому запросу
api.interceptors.request.use((config) => {
  const key = import.meta.env.VITE_KEY || 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'
  if (key) {
    config.params = { ...config.params, key }
  }

  // Логируем запрос для отладки
  console.log('API Request:', {
    url: config.url,
    method: config.method,
    params: config.params,
    baseURL: config.baseURL,
  })

  return config
})

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  },
)

// Функции для работы с API
export const stocksApi = {
  getStocks: async (
    filters: StockFilters = {},
    page = 1,
    limit = 100,
  ): Promise<ApiResponse<StockItem>> => {
    const params = {
      ...filters,
      page,
      limit,
    }

    console.log('Stocks API - Filters received:', filters) // Логирование полученных фильтров
    console.log('Stocks API - Final params:', params) // Логирование финальных параметров

    const response = await api.get<ApiResponse<StockItem>>('/stocks', { params })
    return response.data
  },
}

export const salesApi = {
  getSales: async (
    filters: SalesFilters = {},
    page = 1,
    limit = 100,
  ): Promise<ApiResponse<SalesItem>> => {
    const params = {
      ...filters,
      page,
      limit,
    }
    const response = await api.get<ApiResponse<SalesItem>>('/sales', { params })
    return response.data
  },
}

export const ordersApi = {
  getOrders: async (
    filters: OrderFilters = {},
    page = 1,
    limit = 100,
  ): Promise<ApiResponse<OrderItem>> => {
    const params = {
      ...filters,
      page,
      limit,
    }
    const response = await api.get<ApiResponse<OrderItem>>('/orders', { params })
    return response.data
  },
}

export const incomesApi = {
  getIncomes: async (
    filters: IncomeFilters = {},
    page = 1,
    limit = 100,
  ): Promise<ApiResponse<IncomeItem>> => {
    const params = {
      ...filters,
      page,
      limit,
    }
    const response = await api.get<ApiResponse<IncomeItem>>('/incomes', { params })
    return response.data
  },
}

export default api
