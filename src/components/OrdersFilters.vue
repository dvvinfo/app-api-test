<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">Фильтры</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BaseInput
        v-model="localFilters.dateFrom"
        type="date"
        label="Дата от"
        @change="applyFilters"
      />
      <BaseInput v-model="localFilters.dateTo" type="date" label="Дата до" @change="applyFilters" />
    </div>
    <div class="flex gap-3 mt-6">
      <BaseButton color="primary" @click="applyFilters">Применить фильтры</BaseButton>
      <BaseButton color="secondary" @click="clearFilters">Очистить фильтры</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useOrdersStore } from '@/stores/orders'
import type { OrderFilters } from '@/types/api'
import BaseInput from './ui/BaseInput.vue'
import BaseButton from './ui/BaseButton.vue'

const ordersStore = useOrdersStore()

const localFilters = ref<OrderFilters>({
  dateFrom: new Date().toISOString().split('T')[0],
  dateTo: '',
})

watch(
  () => ordersStore.filters,
  (newFilters) => {
    localFilters.value = { ...newFilters }
  },
  { immediate: true },
)

const applyFilters = () => {
  const filters: OrderFilters = { ...localFilters.value }
  if (!filters.dateFrom || filters.dateFrom.trim() === '') {
    filters.dateFrom = new Date().toISOString().split('T')[0]
  }
  ordersStore.setFilters(filters)
  ordersStore.fetchOrders()
}

const clearFilters = () => {
  localFilters.value = {
    dateFrom: new Date().toISOString().split('T')[0],
    dateTo: '',
  }
  ordersStore.clearFilters()
  ordersStore.fetchOrders()
}
</script>
