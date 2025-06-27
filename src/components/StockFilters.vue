<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">Фильтры</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Фильтр по дате от -->
      <BaseInput
        v-model="localFilters.dateFrom"
        type="date"
        label="Дата от"
        :min="minDateFrom"
        :max="maxDateFrom"
        @change="applyFilters"
      />
      <!-- Фильтр по дате до -->
      <BaseInput
        v-model="localFilters.dateTo"
        type="date"
        label="Дата до"
        :min="minDateTo"
        :max="maxDateTo"
        @change="applyFilters"
      />
      <!-- Фильтр по складу -->
      <BaseSelect
        v-model="localFilters.warehouse_name"
        label="Склад"
        :options="warehouseOptions"
        @change="applyFilters"
      />
      <!-- Фильтр по бренду -->
      <BaseSelect
        v-model="localFilters.brand"
        label="Бренд"
        :options="brandOptions"
        @change="applyFilters"
      />
      <!-- Фильтр по типу поставки -->
      <BaseSelect
        v-model="supplyType"
        label="Тип поставки"
        :options="supplyTypeOptions"
        @change="applyFilters"
      />
      <!-- Фильтр по категории -->
      <BaseSelect
        v-model="localFilters.category"
        label="Категория"
        :options="categoryOptions"
        @change="applyFilters"
      />
    </div>

    <!-- Кнопки управления фильтрами -->
    <div class="flex gap-3 mt-6">
      <BaseButton color="primary" @click="applyFilters">Применить фильтры</BaseButton>
      <BaseButton color="secondary" @click="clearFilters">Очистить фильтры</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useStocksStore } from '@/stores/stocks'
import type { StockFilters } from '@/types/api'
import BaseInput from './ui/BaseInput.vue'
import BaseSelect from './ui/BaseSelect.vue'
import BaseButton from './ui/BaseButton.vue'

const stocksStore = useStocksStore()

// Логируем текущую дату для отладки
const currentDate = new Date().toISOString().split('T')[0]
console.log('Current date:', currentDate)

// Устанавливаем текущую дату (сегодня)
const today = new Date()
const todayDate = today.toISOString().split('T')[0]
console.log('Today date:', todayDate)

// Локальное состояние фильтров
const localFilters = ref<StockFilters>({
  dateFrom: todayDate, // Текущая дата по умолчанию
  dateTo: '',
  warehouse_name: '',
  brand: '',
  category: '',
})

const supplyType = ref<string>('')

// Вычисляемые свойства для минимальных дат
const minDateFrom = computed(() => {
  // Минимальная дата для dateFrom - сегодня (после вчера)
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const minDateTo = computed(() => {
  // Минимальная дата для dateTo - выбранная dateFrom или сегодня
  if (localFilters.value.dateFrom) {
    return localFilters.value.dateFrom
  }
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Вычисляемые свойства для максимальных дат
const maxDateFrom = computed(() => {
  // Максимальная дата для dateFrom - выбранная dateTo или +1 год от сегодня
  if (localFilters.value.dateTo) {
    return localFilters.value.dateTo
  }
  const nextYear = new Date()
  nextYear.setFullYear(nextYear.getFullYear() + 1)
  return nextYear.toISOString().split('T')[0]
})

const maxDateTo = computed(() => {
  // Максимальная дата для dateTo - +1 год от сегодня
  const nextYear = new Date()
  nextYear.setFullYear(nextYear.getFullYear() + 1)
  return nextYear.toISOString().split('T')[0]
})

// Опции для селектов
const warehouseOptions = [
  { value: '', label: 'Все склады' },
  { value: 'Коледино', label: 'Коледино' },
  { value: 'Электросталь', label: 'Электросталь' },
  { value: 'Казань', label: 'Казань' },
  { value: 'Тула', label: 'Тула' },
  { value: 'Подольск', label: 'Подольск' },
  { value: 'Белая дача', label: 'Белая дача' },
  { value: 'Краснодар', label: 'Краснодар' },
  { value: 'Новосибирск', label: 'Новосибирск' },
  { value: 'Санкт-Петербург Уткина Заводь', label: 'Санкт-Петербург Уткина Заводь' },
  { value: 'Екатеринбург - Испытателей 14г', label: 'Екатеринбург - Испытателей 14г' },
  { value: 'Белые Столбы', label: 'Белые Столбы' },
]
const brandOptions = [
  { value: '', label: 'Все бренды' },
  { value: '10974de38dfa215e', label: '10974de38dfa215e' },
  { value: 'e129baf5351375dd', label: 'e129baf5351375dd' },
  { value: 'e9800998ecf8427e', label: 'e9800998ecf8427e' },
  { value: 'f486d1bc7ccbbb35', label: 'f486d1bc7ccbbb35' },
  { value: 'a66c77274e96b48c', label: 'a66c77274e96b48c' },
  { value: '728663c27b76a87b', label: '728663c27b76a87b' },
  { value: '89edf2b23057232f', label: '89edf2b23057232f' },
]
const supplyTypeOptions = [
  { value: '', label: 'Все типы' },
  { value: 'supply', label: 'Поставка' },
  { value: 'realization', label: 'Реализация' },
]
const categoryOptions = [
  { value: '', label: 'Все категории' },
  { value: '9f463620982b6cc9', label: '9f463620982b6cc9' },
]

// Синхронизация с store
watch(
  () => stocksStore.filters,
  (newFilters) => {
    localFilters.value = { ...newFilters }

    // Устанавливаем тип поставки на основе фильтров
    if (newFilters.is_supply === true) {
      supplyType.value = 'supply'
    } else if (newFilters.is_realization === true) {
      supplyType.value = 'realization'
    } else {
      supplyType.value = ''
    }
  },
  { immediate: true },
)

// Применение фильтров
const applyFilters = () => {
  const filters: StockFilters = { ...localFilters.value }

  // Проверяем и валидируем дату
  if (!filters.dateFrom || filters.dateFrom.trim() === '') {
    console.warn('dateFrom is empty, setting to today')
    const today = new Date()
    const todayDate = today.toISOString().split('T')[0]
    filters.dateFrom = todayDate
  }

  // Проверяем, что dateFrom не раньше сегодняшнего дня
  const today = new Date().toISOString().split('T')[0]
  if (filters.dateFrom < today) {
    console.warn('dateFrom is in the past, setting to today')
    filters.dateFrom = today
  }

  // Проверяем, что dateTo не раньше dateFrom
  if (filters.dateTo && filters.dateTo < filters.dateFrom) {
    console.warn('dateTo is before dateFrom, clearing dateTo')
    filters.dateTo = ''
  }

  // Устанавливаем фильтры по типу поставки
  if (supplyType.value === 'supply') {
    filters.is_supply = true
    filters.is_realization = false
  } else if (supplyType.value === 'realization') {
    filters.is_supply = false
    filters.is_realization = true
  } else {
    delete filters.is_supply
    delete filters.is_realization
  }

  console.log('Local filters before apply:', localFilters.value) // Логирование локальных фильтров
  console.log('Final filters to apply:', filters) // Логирование финальных фильтров
  stocksStore.setFilters(filters)
  stocksStore.fetchStocks()
}

// Очистка фильтров
const clearFilters = () => {
  const today = new Date()
  const todayDate = today.toISOString().split('T')[0]

  localFilters.value = {
    dateFrom: todayDate, // Оставляем текущую дату
    dateTo: '',
    warehouse_name: '',
    brand: '',
    category: '',
  }
  supplyType.value = ''
  stocksStore.clearFilters()
  stocksStore.fetchStocks()
}
</script>
