<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationApp from '@/components/NavigationApp.vue'
</script>

<template>
  <!-- Навигационная панель -->
  <NavigationApp />

  <!-- Основной контент -->
  <RouterView />
</template>

<style scoped></style>
