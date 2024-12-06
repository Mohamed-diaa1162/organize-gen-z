<template>
  <div>
    <ResourceHeader title="Snippets" @add="showAddForm = true" />

    <div v-if="showAddForm" class="mb-6 bg-white p-4 rounded-lg shadow">
      <ResourceForm @submit="addSnippet" @cancel="closeForm">
        <FormField label="Title">
          <input
            v-model="newSnippet.title"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </FormField>
        <FormField label="Code">
          <textarea
            v-model="newSnippet.code"
            required
            rows="6"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
          ></textarea>
        </FormField>
        <FormField label="Description">
          <textarea
            v-model="newSnippet.description"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </FormField>
        <FormField label="Language">
          <input
            v-model="newSnippet.language"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </FormField>
        <FormField label="Tags (comma-separated)">
          <input
            v-model="newSnippet.tags"
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
        <SnippetCard
          v-for="snippet in sortedItems"
          :key="snippet.id"
          :snippet="snippet"
          @toggle-used="toggleUsed"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { CodeSnippet } from '~/types'

const { data: snippets, loading } = useFileStorage<'snippets'>('snippets')
const { showAddForm, sortedItems, closeForm } = useResourceList(snippets)
const { isClient } = useClientData(false)

const newSnippet = ref({
  title: '',
  code: '',
  description: '',
  language: '',
  tags: ''
})

function addSnippet() {
  const snippet: CodeSnippet = {
    id: crypto.randomUUID(),
    title: newSnippet.value.title,
    code: newSnippet.value.code,
    description: newSnippet.value.description,
    language: newSnippet.value.language,
    tags: newSnippet.value.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    isUsed: false,
    addedDate: new Date().toISOString()
  }

  snippets.value.push(snippet)
  closeForm()
  newSnippet.value = {
    title: '',
    code: '',
    description: '',
    language: '',
    tags: ''
  }
}

function toggleUsed(id: string) {
  const snippet = snippets.value.find(s => s.id === id)
  if (snippet) {
    snippet.isUsed = !snippet.isUsed
    snippet.usedDate = snippet.isUsed ? new Date().toISOString() : undefined
  }
}</script>