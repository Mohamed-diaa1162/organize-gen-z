<template>
  <div class="text-center py-12">
    <div class="text-gray-400 mb-4">
      <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    </div>
    <h3 class="text-lg font-medium text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-gray-500">{{ message }}</p>
    <button
      v-if="showAddButton"
      @click="$emit('add')"
      class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
    >
      Add {{ itemType }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  message: string
  itemType?: string
  showAddButton?: boolean
}>()

defineEmits<{
  add: []
}>()</script>