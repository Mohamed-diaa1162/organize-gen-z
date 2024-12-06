<template>
  <div class="mb-6 bg-white p-4 rounded-lg shadow">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FormField label="Search">
        <input
          v-model="filters.search"
          type="text"
          placeholder="Search by title..."
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          @input="updateFilters"
        />
      </FormField>
      <FormField label="Tags">
        <input
          v-model="filters.tags"
          type="text"
          placeholder="Filter by tags (comma-separated)"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          @input="updateFilters"
        />
      </FormField>
      <FormField label="Sort by">
        <select
          v-model="filters.sortBy"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          @change="updateFilters"
        >
          <option value="date">Date Added</option>
          <option value="title">Title</option>
          <option v-if="showPriority" value="priority">Priority</option>
        </select>
      </FormField>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  showPriority?: boolean
}>()

const emit = defineEmits<{
  'update:filters': [filters: typeof defaultFilters]
}>()

const defaultFilters = {
  search: '',
  tags: '',
  sortBy: 'date'
}

const filters = ref({ ...defaultFilters })

function updateFilters() {
  emit('update:filters', filters.value)
}
</script>