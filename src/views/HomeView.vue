<script setup lang="ts">
defineOptions({
  name: 'HomeView',
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Заголовок -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Аналитическая панель</h1>
        <p class="text-xl text-gray-600">Управление и анализ данных бизнеса</p>
      </div>

      <!-- Навигационные карточки -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Склады -->
        <router-link
          to="/stocks"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 group"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors"
            >
              <svg
                class="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Склады</h3>
            <p class="text-gray-600 text-sm">Управление товарными запасами</p>
          </div>
        </router-link>

        <!-- Продажи -->
        <router-link
          to="/sales"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 group"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors"
            >
              <svg
                class="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Продажи</h3>
            <p class="text-gray-600 text-sm">Анализ продаж</p>
          </div>
        </router-link>

        <!-- Заказы -->
        <router-link
          to="/orders"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 group"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors"
            >
              <svg
                class="w-8 h-8 text-yellow-600"
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
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Заказы</h3>
            <p class="text-gray-600 text-sm">Управление заказами</p>
          </div>
        </router-link>

        <!-- Доходы -->
        <router-link
          to="/incomes"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 group"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors"
            >
              <svg
                class="w-8 h-8 text-purple-600"
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
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Доходы</h3>
            <p class="text-gray-600 text-sm">Анализ доходов</p>
          </div>
        </router-link>
      </div>

      <!-- Статистика -->
      <div class="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Быстрая статистика</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">4</div>
            <div class="text-sm text-gray-600">Разделов</div>
          </div>
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-600">∞</div>
            <div class="text-sm text-gray-600">Записей</div>
          </div>
          <div class="text-center p-4 bg-yellow-50 rounded-lg">
            <div class="text-2xl font-bold text-yellow-600">100%</div>
            <div class="text-sm text-gray-600">Доступность</div>
          </div>
          <div class="text-center p-4 bg-purple-50 rounded-lg">
            <div class="text-2xl font-bold text-purple-600">24/7</div>
            <div class="text-sm text-gray-600">Мониторинг</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
