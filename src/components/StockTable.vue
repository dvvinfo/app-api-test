<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-800">Данные складов</h3>
    </div>

    <!-- Таблица -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Дата
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Склад
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Артикул
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Бренд
            </th>
            <th
              v-if="stocksStore.filters.category"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Категория
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Количество
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Цена
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Скидка
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Тип
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="item in stocks"
            :key="`${item.nm_id}-${item.barcode}`"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatDate(item.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ item.warehouse_name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ item.supplier_article }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ item.brand }}
            </td>
            <td
              v-if="stocksStore.filters.category"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              {{ item.category }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div class="flex flex-col">
                <span class="font-medium">{{ item.quantity_full }}</span>
                <span class="text-xs text-gray-500">
                  В пути: {{ item.in_way_to_client + item.in_way_from_client }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatPrice(item.price) }} ₽
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <span v-if="parseFloat(item.discount) > 0" class="text-red-600 font-medium">
                {{ item.discount }}%
              </span>
              <span v-else class="text-gray-400">-</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  item.is_supply ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800',
                ]"
              >
                {{ item.is_supply ? 'Поставка' : 'Реализация' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Состояние загрузки -->
    <div v-if="isLoading" class="px-6 py-8 text-center">
      <div class="inline-flex items-center">
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span class="text-gray-600">Загрузка данных...</span>
      </div>
    </div>

    <!-- Состояние ошибки -->
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
        <button
          @click="retry"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    </div>

    <!-- Состояние пустых данных -->
    <div v-if="!isLoading && !hasError && stocks.length === 0" class="px-6 py-8 text-center">
      <div class="text-gray-500">
        <svg class="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p class="text-lg font-medium">Данные не найдены</p>
        <p class="text-sm">Попробуйте изменить фильтры</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStocksStore } from '@/stores/stocks'

const stocksStore = useStocksStore()

// Геттеры из store
const stocks = computed(() => {
  // Получаем фильтры из стора
  const filters = stocksStore.filters
  // Фильтруем по складу, типу, бренду и категории
  return stocksStore.stocks.filter((item) => {
    let typeOk = true
    if (filters.is_supply === true) typeOk = item.is_supply
    if (filters.is_realization === true) typeOk = item.is_realization
    let warehouseOk = true
    if (filters.warehouse_name) warehouseOk = item.warehouse_name === filters.warehouse_name
    let brandOk = true
    if (filters.brand) brandOk = item.brand === filters.brand
    let categoryOk = true
    if (filters.category) categoryOk = item.category === filters.category
    return typeOk && warehouseOk && brandOk && categoryOk
  })
})
const isLoading = computed(() => stocksStore.isLoading)
const hasError = computed(() => stocksStore.hasError)
const errorMessage = computed(() => stocksStore.errorMessage)

// Функции форматирования
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU')
}

const formatPrice = (price: string): string => {
  return parseFloat(price).toLocaleString('ru-RU')
}

// Повторная попытка загрузки
const retry = () => {
  stocksStore.fetchStocks()
}
</script>
