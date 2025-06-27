import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { salesApi } from '@/services/api'
import type { SalesItem, SalesFilters, ApiResponse } from '@/types/api'

export const useSalesStore = defineStore('sales', () => {
  // Состояние
  const sales = ref<SalesItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)
  const itemsPerPage = ref(100)
  const filters = ref<SalesFilters>({})

  // Геттеры
  const hasData = computed(() => sales.value.length > 0)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)
  const errorMessage = computed(() => error.value)

  // Действия
  const fetchSales = async (page = 1, limit = 100) => {
    loading.value = true
    error.value = null
    try {
      const currentFilters = { ...filters.value }
      if (!currentFilters.dateFrom) {
        const today = new Date().toISOString().split('T')[0]
        currentFilters.dateFrom = today
      }
      const response: ApiResponse<SalesItem> = await salesApi.getSales(currentFilters, page, limit)
      sales.value = response.data
      currentPage.value = response.meta.current_page
      totalPages.value = response.meta.last_page
      totalItems.value = response.meta.total
      itemsPerPage.value = parseInt(response.meta.per_page)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных'
      console.error('Error fetching sales:', err)
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: SalesFilters) => {
    filters.value = { ...newFilters }
    currentPage.value = 1
  }

  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      fetchSales(page, itemsPerPage.value)
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

  // TODO: Добавить вычисляемые свойства для графиков, когда будет известна структура SalesItem

  return {
    sales,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    filters,
    hasData,
    isLoading,
    hasError,
    errorMessage,
    fetchSales,
    setFilters,
    clearFilters,
    goToPage,
    nextPage,
    prevPage,
  }
})
