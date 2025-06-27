<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Приходы</h1>
      <p class="text-gray-600">Управление и анализ данных о приходах</p>
    </div>

    <IncomesFilters />
    <IncomesCharts />
    <IncomesTable />
    <Pagination
      v-if="hasData && totalPages > 1"
      :current-page="incomesStore.currentPage"
      :total-pages="incomesStore.totalPages"
      :total="incomesStore.totalItems"
      :per-page="incomesStore.itemsPerPage"
      @page-change="incomesStore.goToPage"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useIncomesStore } from '@/stores/incomes'
import IncomesFilters from '@/components/IncomesFilters.vue'
import IncomesCharts from '@/components/IncomesCharts.vue'
import IncomesTable from '@/components/IncomesTable.vue'
import Pagination from '@/components/Pagination.vue'

const incomesStore = useIncomesStore()

// Геттеры для условного отображения
const hasData = computed(() => incomesStore.hasData)
const totalPages = computed(() => incomesStore.totalPages)

// Загрузка данных при монтировании компонента
onMounted(() => {
  incomesStore.fetchIncomes()
})
</script>
