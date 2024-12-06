<template>
  <ResourceCard>
    <div class="flex items-start justify-between">
      <div>
        <h3 class="text-lg font-semibold">
          <a :href="library.url" target="_blank" class="text-blue-600 hover:text-blue-800">
            {{ library.name }}
          </a>
        </h3>
        <p class="mt-2 text-gray-600">{{ library.description }}</p>
        <TagsList :tags="library.tags" class="mt-3" />
      </div>
      <div class="flex flex-col items-end">
        <span :class="priorityClass">{{ library.priority }}</span>
        <span class="text-sm text-gray-500 mt-2">Used: {{ library.usageCount }} times</span>
      </div>
    </div>
    <div class="mt-3 text-sm text-gray-500">
      Added: {{ new Date(library.addedDate).toLocaleDateString() }}
    </div>
  </ResourceCard>
</template>

<script setup lang="ts">
import type { Library } from '~/types'

const props = defineProps<{
  library: Library
}>()

const priorityClass = computed(() => {
  const classes = {
    High: 'text-red-600',
    Medium: 'text-yellow-600',
    Low: 'text-green-600'
  }
  return `font-semibold ${classes[props.library.priority]}`
})
</script>