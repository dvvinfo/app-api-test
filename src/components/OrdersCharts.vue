<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">График заказов (пример)</h3>
    <div class="overflow-x-auto">
      <div class="h-64 min-w-[600px]">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const chartData = {
  labels: ['Заказ 1', 'Заказ 2', 'Заказ 3'],
  datasets: [
    {
      label: 'Пример заказов',
      data: [15, 25, 35],
      backgroundColor: '#10b981',
    },
  ],
}
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
