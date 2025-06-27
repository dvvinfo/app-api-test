<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <!-- Навигационная панель -->
  <nav v-if="!isHomePage" class="bg-white shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Логотип -->
        <router-link to="/" class="flex items-center space-x-2">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span class="text-xl font-bold text-gray-800">Аналитика</span>
        </router-link>

        <!-- Навигационные ссылки -->
        <div class="hidden md:flex space-x-8">
          <router-link
            to="/stocks"
            class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600 bg-blue-50': route.path === '/stocks' }"
          >
            Склады
          </router-link>
          <router-link
            to="/sales"
            class="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-green-600 bg-green-50': route.path === '/sales' }"
          >
            Продажи
          </router-link>
          <router-link
            to="/orders"
            class="text-gray-600 hover:text-yellow-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-yellow-600 bg-yellow-50': route.path === '/orders' }"
          >
            Заказы
          </router-link>
          <router-link
            to="/incomes"
            class="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-purple-600 bg-purple-50': route.path === '/incomes' }"
          >
            Доходы
          </router-link>
        </div>

        <!-- Мобильное меню -->
        <div class="md:hidden">
          <button class="text-gray-600 hover:text-gray-800 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Основной контент -->
  <RouterView />
</template>

<style scoped></style>
