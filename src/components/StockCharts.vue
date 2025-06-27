<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <!-- График по складам -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">Количество товаров по складам</h3>
      <div class="overflow-x-auto">
        <div class="min-w-[600px]">
          <Bar :data="warehouseChartData" :options="barChartOptions" />
        </div>
      </div>
    </div>

    <!-- График по брендам -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">Количество товаров по брендам</h3>
      <div class="overflow-x-auto">
        <div class="min-w-[600px]">
          <Bar :data="brandChartData" :options="barChartOptions" />
        </div>
      </div>
    </div>

    <!-- График по ценовым диапазонам -->
    <div class="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">Распределение по ценовым диапазонам</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="range in priceRangeStats"
          :key="range.label"
          class="text-center p-4 bg-gray-50 rounded-lg"
        >
          <div class="text-2xl font-bold text-blue-600">{{ range.count }}</div>
          <div class="text-sm text-gray-600">{{ range.label }} ₽</div>
        </div>
      </div>
    </div>

    <!-- Статистика -->
    <div class="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">Общая статистика</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">{{ totalItems }}</div>
          <div class="text-sm text-gray-600">Всего товаров</div>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-lg">
          <div class="text-2xl font-bold text-green-600">{{ totalQuantity }}</div>
          <div class="text-sm text-gray-600">Общее количество</div>
        </div>
        <div class="text-center p-4 bg-yellow-50 rounded-lg">
          <div class="text-2xl font-bold text-yellow-600">{{ averagePrice }}</div>
          <div class="text-sm text-gray-600">Средняя цена (₽)</div>
        </div>
        <div class="text-center p-4 bg-purple-50 rounded-lg">
          <div class="text-2xl font-bold text-purple-600">{{ uniqueWarehouses }}</div>
          <div class="text-sm text-gray-600">Уникальных складов</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStocksStore } from '@/stores/stocks'
import { Bar } from 'vue-chartjs'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// Имя компонента для линтера
defineOptions({
  name: 'StockCharts',
})

const stocksStore = useStocksStore()

// Геттеры из store
const warehouseStats = computed(() => stocksStore.warehouseStats)
const brandStats = computed(() => stocksStore.brandStats)
const priceRangeStats = computed(() => stocksStore.priceRangeStats)
const stocks = computed(() => stocksStore.stocks)

// Вычисляемые свойства для статистики
const totalItems = computed(() => stocks.value.length)

const totalQuantity = computed(() => {
  return stocks.value.reduce((sum, item) => sum + item.quantity_full, 0)
})

const averagePrice = computed(() => {
  if (stocks.value.length === 0) return 0
  const totalPrice = stocks.value.reduce((sum, item) => sum + parseFloat(item.price), 0)
  return Math.round(totalPrice / stocks.value.length)
})

const uniqueWarehouses = computed(() => {
  const warehouses = new Set(stocks.value.map((item) => item.warehouse_name))
  return warehouses.size
})

// Chart.js options
const barChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: { beginAtZero: true },
    y: { beginAtZero: true },
  },
}

// Chart.js data for warehouses
const warehouseChartData = computed(() => ({
  labels: warehouseStats.value.map((w) => w.name),
  datasets: [
    {
      label: 'Количество товаров',
      data: warehouseStats.value.map((w) => w.quantity),
      backgroundColor: '#3b82f6',
    },
  ],
}))

// Chart.js data for brands
const brandChartData = computed(() => ({
  labels: brandStats.value.map((b) => b.name),
  datasets: [
    {
      label: 'Количество товаров',
      data: brandStats.value.map((b) => b.quantity),
      backgroundColor: '#22c55e',
    },
  ],
}))
</script>
