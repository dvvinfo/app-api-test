<template>
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h3 class="text-lg font-semibold mb-4 text-gray-800">График продаж (пример)</h3>
    <div class="h-64">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const chartData = {
  labels: ['A', 'B', 'C'],
  datasets: [
    {
      label: 'Пример',
      data: [10, 20, 30],
      backgroundColor: '#3b82f6',
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
