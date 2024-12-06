<template>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="tag in tags"
      :key="tag"
      class="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
    >
      {{ tag }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tags: string[]
}>()
</script>