import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { stocksApi } from '@/services/api'
import type { StockItem, StockFilters, ApiResponse } from '@/types/api'

export const useStocksStore = defineStore('stocks', () => {
  // Состояние
  const stocks = ref<StockItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)
  const itemsPerPage = ref(100)
  const filters = ref<StockFilters>({})

  // Геттеры
  const hasData = computed(() => stocks.value.length > 0)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)
  const errorMessage = computed(() => error.value)

  // Действия
  const fetchStocks = async (page = 1, limit = 100) => {
    loading.value = true
    error.value = null

    try {
      // Устанавливаем текущую дату по умолчанию, если dateFrom не указан
      const currentFilters = { ...filters.value }
      if (!currentFilters.dateFrom) {
        const today = new Date()
        const todayDate = today.toISOString().split('T')[0] // Формат Y-m-d
        console.log('Setting default dateFrom to today:', todayDate) // Логирование для отладки
        currentFilters.dateFrom = todayDate
      }

      console.log('Fetching stocks with filters:', currentFilters) // Логирование фильтров
      console.log('Page:', page, 'Limit:', limit) // Логирование пагинации

      const response: ApiResponse<StockItem> = await stocksApi.getStocks(
        currentFilters,
        page,
        limit,
      )

      stocks.value = response.data
      currentPage.value = response.meta.current_page
      totalPages.value = response.meta.last_page
      totalItems.value = response.meta.total
      itemsPerPage.value = parseInt(response.meta.per_page)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных'
      console.error('Error fetching stocks:', err)
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: StockFilters) => {
    console.log('Setting filters in store:', newFilters) // Логирование новых фильтров
    filters.value = { ...newFilters }
    currentPage.value = 1 // Сбрасываем на первую страницу при изменении фильтров
    console.log('Filters after setting:', filters.value) // Логирование фильтров после установки
  }

  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      fetchStocks(page, itemsPerPage.value)
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      goToPage(currentPage.value + 1)
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      goToPage(currentPage.value - 1)
    }
  }

  // Вычисляемые свойства для графиков
  const warehouseStats = computed(() => {
    const stats = new Map<string, { quantity: number; items: number }>()

    stocks.value.forEach((item) => {
      const warehouse = item.warehouse_name
      const current = stats.get(warehouse) || { quantity: 0, items: 0 }

      stats.set(warehouse, {
        quantity: current.quantity + item.quantity_full,
        items: current.items + 1,
      })
    })

    return Array.from(stats.entries()).map(([name, data]) => ({
      name,
      quantity: data.quantity,
      items: data.items,
    }))
  })

  const brandStats = computed(() => {
    const stats = new Map<string, { quantity: number; items: number }>()

    stocks.value.forEach((item) => {
      const brand = item.brand
      const current = stats.get(brand) || { quantity: 0, items: 0 }

      stats.set(brand, {
        quantity: current.quantity + item.quantity_full,
        items: current.items + 1,
      })
    })

    return Array.from(stats.entries()).map(([name, data]) => ({
      name,
      quantity: data.quantity,
      items: data.items,
    }))
  })

  const priceRangeStats = computed(() => {
    const ranges = [
      { min: 0, max: 1000, label: '0-1000' },
      { min: 1000, max: 5000, label: '1000-5000' },
      { min: 5000, max: 10000, label: '5000-10000' },
      { min: 10000, max: Infinity, label: '10000+' },
    ]

    const stats = ranges.map((range) => ({
      label: range.label,
      count: stocks.value.filter((item) => {
        const price = parseFloat(item.price)
        return price >= range.min && price < range.max
      }).length,
    }))

    return stats
  })

  return {
    // Состояние
    stocks,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    filters,

    // Геттеры
    hasData,
    isLoading,
    hasError,
    errorMessage,

    // Действия
    fetchStocks,
    setFilters,
    clearFilters,
    goToPage,
    nextPage,
    prevPage,

    // Вычисляемые свойства для графиков
    warehouseStats,
    brandStats,
    priceRangeStats,
  }
})
