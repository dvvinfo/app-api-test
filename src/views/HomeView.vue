<script setup lang="ts">
import NavigationCard from '@/components/NavigationCard.vue'

defineOptions({
  name: 'HomeView',
})
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Заголовок -->
      <div class="text-center mb-10 sm:mb-20">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Аналитическая панель</h1>
        <p class="text-xl text-gray-600">Управление и анализ данных бизнеса</p>
      </div>

      <!-- Навигационные карточки -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NavigationCard
          title="Склады"
          description="Управление и анализ данных складов"
          route="/stocks"
          icon="warehouse"
          bg-color="hover:bg-blue-50"
          icon-bg-color="bg-blue-100"
          icon-color="text-blue-600"
          text-color="text-blue-600"
        />

        <NavigationCard
          title="Продажи"
          description="Управление и анализ данных о продажах"
          route="/sales"
          icon="shopping-bag"
          bg-color="hover:bg-green-50"
          icon-bg-color="bg-green-100"
          icon-color="text-green-600"
          text-color="text-green-600"
        />

        <NavigationCard
          title="Заказы"
          description="Управление и анализ данных о заказах"
          route="/orders"
          icon="document-text"
          bg-color="hover:bg-yellow-50"
          icon-bg-color="bg-yellow-100"
          icon-color="text-yellow-600"
          text-color="text-yellow-600"
        />

        <NavigationCard
          title="Доходы"
          description="Управление и анализ данных о доходах"
          route="/incomes"
          icon="currency-ruble"
          bg-color="hover:bg-purple-50"
          icon-bg-color="bg-purple-100"
          icon-color="text-purple-600"
          text-color="text-purple-600"
        />
      </div>
    </div>
  </div>
</template>
