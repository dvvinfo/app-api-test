<template>
  <nav v-if="!isHomePage" class="bg-white shadow-md">
    <div class=" mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Логотип -->
        <router-link to="/" class="flex items-center space-x-2" @click="closeMobileMenu">
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

        <!-- Навигационные ссылки (десктоп) -->
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
          <button
            @click="toggleMobileMenu"
            class="text-gray-600 hover:text-gray-800 focus:outline-none transition-colors"
          >
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

  <!-- Мобильное боковое меню (вне навигации) -->
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="transform translate-x-full"
    enter-to-class="transform translate-x-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="transform translate-x-0"
    leave-to-class="transform translate-x-full"
  >
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg z-50"
    >
      <div class="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">Меню</h2>
        <button
          @click="closeMobileMenu"
          class="text-gray-600 hover:text-gray-800 focus:outline-none transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="p-4 space-y-2">
        <router-link
          to="/stocks"
          @click="closeMobileMenu"
          class="text-gray-600 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
          :class="{ 'text-blue-600 bg-blue-50': route.path === '/stocks' }"
        >
          Склады
        </router-link>
        <router-link
          to="/sales"
          @click="closeMobileMenu"
          class="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
          :class="{ 'text-green-600 bg-green-50': route.path === '/sales' }"
        >
          Продажи
        </router-link>
        <router-link
          to="/orders"
          @click="closeMobileMenu"
          class="text-gray-600 hover:text-yellow-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
          :class="{ 'text-yellow-600 bg-yellow-50': route.path === '/orders' }"
        >
          Заказы
        </router-link>
        <router-link
          to="/incomes"
          @click="closeMobileMenu"
          class="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
          :class="{ 'text-purple-600 bg-purple-50': route.path === '/incomes' }"
        >
          Доходы
        </router-link>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const isHomePage = computed(() => route.path === '/')

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
