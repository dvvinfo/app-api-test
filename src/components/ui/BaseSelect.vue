<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :id="id"
      :value="modelValue || ''"
      :disabled="disabled"
      :class="[
        'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none bg-white',
        disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white',
        error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300',
      ]"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
  disabled?: boolean
}

interface Props {
  modelValue: string | undefined
  label?: string
  placeholder?: string
  options: Option[]
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  id?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  id: () => `select-${Math.random().toString(36).substr(2, 9)}`,
})

defineEmits<Emits>()

defineOptions({
  name: 'BaseSelect',
})
</script>
