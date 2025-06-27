import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { incomesApi } from '@/services/api'
import type { IncomeItem, IncomeFilters, ApiResponse } from '@/types/api'

export const useIncomesStore = defineStore('incomes', () => {
  // Состояние
  const incomes = ref<IncomeItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const totalItems = ref(0)
  const itemsPerPage = ref(10)
  const filters = ref<IncomeFilters>({})

  // Геттеры
  const hasData = computed(() => incomes.value.length > 0)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)
  const errorMessage = computed(() => error.value)

  // Действия
  const fetchIncomes = async (page = 1, limit = 10) => {
    loading.value = true
    error.value = null
    try {
      const currentFilters = { ...filters.value }
      if (!currentFilters.dateFrom) {
        const today = new Date().toISOString().split('T')[0]
        currentFilters.dateFrom = today
      }
      if (!currentFilters.dateTo) {
        const today = new Date().toISOString().split('T')[0]
        currentFilters.dateTo = today
      }
      const response: ApiResponse<IncomeItem> = await incomesApi.getIncomes(
        currentFilters,
        page,
        limit,
      )
      incomes.value = response.data
      currentPage.value = response.meta.current_page
      totalPages.value = response.meta.last_page
      totalItems.value = response.meta.total
      itemsPerPage.value = parseInt(response.meta.per_page)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных'
      console.error('Error fetching incomes:', err)
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: IncomeFilters) => {
    filters.value = { ...newFilters }
    currentPage.value = 1
  }

  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      fetchIncomes(page, itemsPerPage.value)
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

  // TODO: Добавить вычисляемые свойства для графиков, когда будет известна структура IncomeItem

  return {
    incomes,
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
    fetchIncomes,
    setFilters,
    clearFilters,
    goToPage,
    nextPage,
    prevPage,
  }
})
