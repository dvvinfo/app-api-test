<template>
  <div class="mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Продажи</h1>
      <p class="text-gray-600">Управление и анализ данных о продажах</p>
    </div>

    <SalesFilters />
    <SalesCharts />
    <SalesTable />
    <Pagination
      v-if="hasData && totalPages > 1"
      :current-page="salesStore.currentPage"
      :total-pages="salesStore.totalPages"
      :total="salesStore.totalItems"
      :per-page="salesStore.itemsPerPage"
      @page-change="salesStore.goToPage"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useSalesStore } from '@/stores/sales'
import SalesFilters from '@/components/SalesFilters.vue'
import SalesCharts from '@/components/SalesCharts.vue'
import SalesTable from '@/components/SalesTable.vue'
import Pagination from '@/components/Pagination.vue'

const salesStore = useSalesStore()

// Геттеры для условного отображения
const hasData = computed(() => salesStore.hasData)
const totalPages = computed(() => salesStore.totalPages)

// Загрузка данных при монтировании компонента
onMounted(() => {
  salesStore.fetchSales()
})
</script>
