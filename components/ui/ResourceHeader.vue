<template>
  <div class="mb-6 flex justify-between items-center">
    <h2 class="text-2xl font-bold text-gray-900">{{ title }}</h2>
    <button
      @click="$emit('add')"
      class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
      Add {{ title.slice(0, -1) }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()

defineEmits<{
  add: []
}>()
</script>