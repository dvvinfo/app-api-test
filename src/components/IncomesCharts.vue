<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">График приходов по складам</h3>
    <div class="overflow-x-auto">
      <div class="h-64 min-w-[600px]">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { useIncomesStore } from '@/stores/incomes'
import type { IncomeItem } from '@/types/api'

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const incomesStore = useIncomesStore()

const chartData = computed(() => {
  const incomes = incomesStore.incomes

  if (incomes.length === 0) {
    return {
      labels: ['Нет данных'],
      datasets: [
        {
          label: 'Количество товаров',
          data: [0],
          backgroundColor: '#f59e0b',
        },
      ],
    }
  }

  // Группируем данные по складам
  const warehouseData = incomes.reduce((acc: Record<string, number>, item: IncomeItem) => {
    const warehouse = item.warehouse_name
    acc[warehouse] = (acc[warehouse] || 0) + item.quantity
    return acc
  }, {})

  const labels = Object.keys(warehouseData)
  const data = Object.values(warehouseData)

  return {
    labels,
    datasets: [
      {
        label: 'Количество товаров',
        data,
        backgroundColor: '#f59e0b',
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: { beginAtZero: true },
    y: { beginAtZero: true },
  },
}
</script>
