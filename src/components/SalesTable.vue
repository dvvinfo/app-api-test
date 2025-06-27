<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800">Данные продаж</h3>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Данные
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(item, index) in sales" :key="index" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <pre class="text-xs">{{ item }}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="isLoading" class="px-6 py-8 text-center">
      <span class="text-gray-600">Загрузка данных...</span>
    </div>
    <div v-if="hasError" class="px-6 py-8 text-center">
      <div class="text-red-600">
        <svg class="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <p class="text-lg font-medium">{{ errorMessage }}</p>
        <button @click="retry" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
          Попробовать снова
        </button>
      </div>
    </div>
    <div v-if="!isLoading && !hasError && sales.length === 0" class="px-6 py-8 text-center">
      <div class="text-gray-500">
        <p class="text-lg font-medium">Данные не найдены</p>
        <p class="text-sm">Попробуйте изменить фильтры</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSalesStore } from '@/stores/sales'

const salesStore = useSalesStore()
const sales = computed(() => salesStore.sales)
const isLoading = computed(() => salesStore.isLoading)
const hasError = computed(() => salesStore.hasError)
const errorMessage = computed(() => salesStore.errorMessage)

const retry = () => {
  salesStore.fetchSales()
}
</script>
