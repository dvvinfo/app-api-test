<template>
  <router-link :to="route" class="group block">
    <div
      class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      :class="bgColor"
    >
      <!-- Иконка -->
      <div class="flex items-center justify-center w-12 h-12 rounded-lg mb-4 mx-auto" :class="iconBgColor">
        <svg
          v-if="icon === 'warehouse'"
          class="w-6 h-6"
          :class="iconColor"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <svg
          v-else-if="icon === 'shopping-bag'"
          class="w-6 h-6"
          :class="iconColor"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <svg
          v-else-if="icon === 'document-text'"
          class="w-6 h-6"
          :class="iconColor"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <svg
          v-else-if="icon === 'currency-ruble'"
          class="w-8 h-8"
          :class="iconColor"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      </div>

      <!-- Заголовок -->
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ title }}</h3>

      <!-- Описание -->
      <p class="text-gray-600 text-md mb-4">{{ description }}</p>

      <!-- Статистика -->
      <div class="flex items-center justify-between" v-if="statistic">
        <span class="text-2xl font-bold" :class="textColor">{{ statistic }}</span>
        <svg
          class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  route: string
  statistic?: string
  icon: string
  bgColor: string
  iconBgColor: string
  iconColor: string
  textColor: string
}

defineProps<Props>()
</script>
