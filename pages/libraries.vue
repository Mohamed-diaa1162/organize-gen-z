<template>
  <div>
    <ResourceHeader title="Libraries" @add="showAddForm = true" />

    <div v-if="showAddForm" class="mb-6 bg-white p-4 rounded-lg shadow">
      <ResourceForm @submit="addLibrary" @cancel="closeForm">
        <FormField label="Name">
          <input
            v-model="newLibrary.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </FormField>
        <FormField label="URL">
          <input
            v-model="newLibrary.url"
            type="url"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </FormField>
        <FormField label="Description">
          <textarea
            v-model="newLibrary.description"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </FormField>
        <FormField label="Priority">
          <select
            v-model="newLibrary.priority"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </FormField>
        <FormField label="Tags (comma-separated)">
          <input
            v-model="newLibrary.tags"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </FormField>
      </ResourceForm>
    </div>

    <ClientOnly>
      <template #fallback>
        <LoadingSpinner />
      </template>
      <div v-if="loading" class="text-center py-4">
        <LoadingSpinner />
      </div>
      <div v-else-if="isClient" class="space-y-4">
        <LibraryCard
          v-for="library in sortedItems"
          :key="library.id"
          :library="library"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Library } from '~/types'

const { data: libraries, loading } = useFileStorage<'libraries'>('libraries')
const { showAddForm, sortedItems, closeForm } = useResourceList(libraries)
const { isClient } = useClientData(false)

const newLibrary = ref({
  name: '',
  url: '',
  description: '',
  priority: 'Medium' as const,
  tags: ''
})

function addLibrary() {
  const library: Library = {
    id: crypto.randomUUID(),
    name: newLibrary.value.name,
    url: newLibrary.value.url,
    description: newLibrary.value.description,
    priority: newLibrary.value.priority,
    tags: newLibrary.value.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    usageCount: 0,
    addedDate: new Date().toISOString()
  }

  libraries.value.push(library)
  closeForm()
  newLibrary.value = {
    name: '',
    url: '',
    description: '',
    priority: 'Medium',
    tags: ''
  }
}</script>