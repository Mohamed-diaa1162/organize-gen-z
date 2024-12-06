<template>
  <div>
    <ResourceHeader title="Tutorials" @add="showAddForm = true" />
    
    <ResourceFilters
      v-model:filters="filters"
      @update:filters="updateFilters"
    />

    <ClientOnly>
      <template #fallback>
        <LoadingSpinner />
      </template>
      <div v-if="loading" class="text-center py-4">
        <LoadingSpinner />
      </div>
      <div v-else-if="isClient">
        <div v-if="filteredItems.length === 0" class="mt-4">
          <EmptyState
            title="No tutorials found"
            message="Start by adding your first tutorial or try different search filters."
            item-type="Tutorial"
            :show-add-button="!showAddForm"
            @add="showAddForm = true"
          />
        </div>
        <div v-else class="space-y-4">
          <TutorialCard
            v-for="tutorial in filteredItems"
            :key="tutorial.id"
            :tutorial="tutorial"
            @toggle-read="toggleRead"
          />
        </div>
      </div>
    </ClientOnly>

    <div v-if="showAddForm" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Add Tutorial</h3>
        <ResourceForm @submit="addTutorial" @cancel="closeForm">
          <FormField label="Title">
            <input
              v-model="newTutorial.title"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </FormField>
          <FormField label="URL">
            <input
              v-model="newTutorial.url"
              type="url"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </FormField>
          <FormField label="Description">
            <textarea
              v-model="newTutorial.description"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </FormField>
          <FormField label="Tags (comma-separated)">
            <input
              v-model="newTutorial.tags"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </FormField>
        </ResourceForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tutorial } from '~/types'

const { data: tutorials, loading } = useFileStorage<'tutorials'>('tutorials')
const { isClient } = useClientData(false)
const { filters, filteredItems, updateFilters } = useResourceFilters(tutorials)
const showAddForm = ref(false)

const newTutorial = ref({
  title: '',
  url: '',
  description: '',
  tags: ''
})

function addTutorial() {
  const tutorial: Tutorial = {
    id: crypto.randomUUID(),
    title: newTutorial.value.title,
    url: newTutorial.value.url,
    description: newTutorial.value.description,
    tags: newTutorial.value.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    isRead: false,
    addedDate: new Date().toISOString()
  }

  tutorials.value.push(tutorial)
  closeForm()
}

function closeForm() {
  showAddForm.value = false
  newTutorial.value = {
    title: '',
    url: '',
    description: '',
    tags: ''
  }
}

function toggleRead(id: string) {
  const tutorial = tutorials.value.find(t => t.id === id)
  if (tutorial) {
    tutorial.isRead = !tutorial.isRead
    tutorial.readDate = tutorial.isRead ? new Date().toISOString() : undefined
  }
}</script>