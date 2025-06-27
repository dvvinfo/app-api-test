<template>
  <div class=" mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Заказы</h1>
      <p class="text-gray-600">Управление и анализ данных о заказах</p>
    </div>

    <OrdersFilters />
    <OrdersCharts />
    <OrdersTable />
    <Pagination
      v-if="hasData && totalPages > 1"
      :current-page="ordersStore.currentPage"
      :total-pages="ordersStore.totalPages"
      :total="ordersStore.totalItems"
      :per-page="ordersStore.itemsPerPage"
      @page-change="ordersStore.goToPage"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useOrdersStore } from '@/stores/orders'
import OrdersFilters from '@/components/OrdersFilters.vue'
import OrdersCharts from '@/components/OrdersCharts.vue'
import OrdersTable from '@/components/OrdersTable.vue'
import Pagination from '@/components/Pagination.vue'

const ordersStore = useOrdersStore()

// Геттеры для условного отображения
const hasData = computed(() => ordersStore.hasData)
const totalPages = computed(() => ordersStore.totalPages)

// Загрузка данных при монтировании компонента
onMounted(() => {
  ordersStore.fetchOrders()
})
</script>
