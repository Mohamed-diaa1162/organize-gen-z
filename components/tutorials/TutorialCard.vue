<template>
  <ResourceCard>
    <div class="flex items-start justify-between">
      <div>
        <h3 class="text-lg font-semibold">
          <a :href="tutorial.url" target="_blank" class="text-blue-600 hover:text-blue-800">
            {{ tutorial.title }}
          </a>
        </h3>
        <p class="mt-2 text-gray-600">{{ tutorial.description }}</p>
        <TagsList :tags="tutorial.tags" class="mt-3" />
      </div>
      <div class="flex items-center">
        <input
          type="checkbox"
          :checked="tutorial.isRead"
          @change="$emit('toggle-read', tutorial.id)"
          class="h-5 w-5 text-blue-600"
        />
      </div>
    </div>
    <div class="mt-3 text-sm text-gray-500">
      <span>Added: {{ new Date(tutorial.addedDate).toLocaleDateString() }}</span>
      <span v-if="tutorial.readDate" class="ml-4">
        Read: {{ new Date(tutorial.readDate).toLocaleDateString() }}
      </span>
    </div>
  </ResourceCard>
</template>

<script setup lang="ts">
import type { Tutorial } from '~/types'

defineProps<{
  tutorial: Tutorial
}>()

defineEmits<{
  'toggle-read': [id: string]
}>()
</script>