<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <h3 class="text-lg font-medium text-gray-900">Tutorials</h3>
        <div class="mt-4">
          <p class="text-3xl font-semibold text-gray-900">{{ tutorials?.length || 0 }}</p>
          <p class="mt-1 text-sm text-gray-500">{{ readCount }} read</p>
        </div>
      </div>
      <div class="bg-gray-50 px-5 py-3">
        <NuxtLink to="/tutorials" class="text-sm font-medium text-blue-600 hover:text-blue-900">
          View all
        </NuxtLink>
      </div>
    </div>

    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <h3 class="text-lg font-medium text-gray-900">Libraries</h3>
        <div class="mt-4">
          <p class="text-3xl font-semibold text-gray-900">{{ libraries?.length || 0 }}</p>
          <p class="mt-1 text-sm text-gray-500">
            {{ highPriorityCount }} high priority
          </p>
        </div>
      </div>
      <div class="bg-gray-50 px-5 py-3">
        <NuxtLink to="/libraries" class="text-sm font-medium text-blue-600 hover:text-blue-900">
          View all
        </NuxtLink>
      </div>
    </div>

    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <h3 class="text-lg font-medium text-gray-900">Code Snippets</h3>
        <div class="mt-4">
          <p class="text-3xl font-semibold text-gray-900">{{ snippets?.length || 0 }}</p>
          <p class="mt-1 text-sm text-gray-500">{{ usedCount }} used</p>
        </div>
      </div>
      <div class="bg-gray-50 px-5 py-3">
        <NuxtLink to="/snippets" class="text-sm font-medium text-blue-600 hover:text-blue-900">
          View all
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tutorial, Library, CodeSnippet } from '~/types'

const { data: tutorials } = useFileStorage<'tutorials'>('tutorials')
const { data: libraries } = useFileStorage<'libraries'>('libraries')
const { data: snippets } = useFileStorage<'snippets'>('snippets')

const readCount = computed(() => tutorials.value?.filter(t => t.isRead).length || 0)
const highPriorityCount = computed(() => libraries.value?.filter(l => l.priority === 'High').length || 0)
const usedCount = computed(() => snippets.value?.filter(s => s.isUsed).length || 0)
</script>