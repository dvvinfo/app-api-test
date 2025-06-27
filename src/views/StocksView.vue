<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Заголовок страницы -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Склады</h1>
        <p class="text-gray-600">Управление и анализ данных складов</p>
      </div>
      <!-- Фильтры -->
      <StockFilters />
      <!-- Графики и статистика -->
      <StockCharts v-if="hasData" />

      <!-- Таблица данных -->
      <StockTable />

      <!-- Пагинация -->
      <Pagination
        v-if="hasData && totalPages > 1"
        :current-page="currentPage"
        :total-pages="totalPages"
        :total="totalItems"
        :per-page="itemsPerPage"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useStocksStore } from '@/stores/stocks'
import StockFilters from '@/components/StockFilters.vue'
import StockTable from '@/components/StockTable.vue'
import StockCharts from '@/components/StockCharts.vue'
import Pagination from '@/components/Pagination.vue'

// Имя компонента для линтера
defineOptions({
  name: 'StocksView',
})

const stocksStore = useStocksStore()

// Геттеры из store
const hasData = computed(() => stocksStore.hasData)
const currentPage = computed(() => stocksStore.currentPage)
const totalPages = computed(() => stocksStore.totalPages)
const totalItems = computed(() => stocksStore.totalItems)
const itemsPerPage = computed(() => stocksStore.itemsPerPage)

// Обработчик изменения страницы
const handlePageChange = (page: number) => {
  stocksStore.goToPage(page)
}

// Загрузка данных при монтировании компонента
onMounted(() => {
  stocksStore.fetchStocks()
})
</script>
