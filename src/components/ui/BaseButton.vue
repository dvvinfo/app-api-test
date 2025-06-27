<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      colorClass,
      disabled || loading ? 'opacity-60 cursor-not-allowed' : '',
      block ? 'w-full' : '',
    ]"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="mr-2 animate-spin">
      <svg class="w-4 h-4 text-current" fill="none" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  color?: 'primary' | 'secondary' | 'danger' | 'gray'
  disabled?: boolean
  loading?: boolean
  block?: boolean
}

interface Emits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  color: 'primary',
  disabled: false,
  loading: false,
  block: false,
})

defineEmits<Emits>()

const colorClass = computed(() => {
  switch (props.color) {
    case 'primary':
      return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
    case 'secondary':
      return 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    case 'gray':
      return 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-300'
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
  }
})

defineOptions({
  name: 'BaseButton',
})
</script>
