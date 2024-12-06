import { ref, computed } from 'vue'
import type { Tutorial, Library, CodeSnippet } from '~/types'

type Resource = Tutorial | Library | CodeSnippet
type Filters = {
  search: string
  tags: string
  sortBy: string
}

export function useResourceFilters<T extends Resource>(items: Ref<T[]>) {
  const filters = ref<Filters>({
    search: '',
    tags: '',
    sortBy: 'date'
  })

  const filteredItems = computed(() => {
    let result = [...items.value]

    // Apply search filter
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase()
      result = result.filter(item => {
        const searchableFields = [
          'title' in item ? item.title : '',
          'name' in item ? item.name : '',
          'description' in item ? item.description : ''
        ]
        return searchableFields.some(field => 
          field.toLowerCase().includes(searchTerm)
        )
      })
    }

    // Apply tags filter
    if (filters.value.tags) {
      const tagFilters = filters.value.tags
        .split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(Boolean)

      if (tagFilters.length > 0) {
        result = result.filter(item =>
          item.tags.some(tag =>
            tagFilters.includes(tag.toLowerCase())
          )
        )
      }
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.value.sortBy) {
        case 'title':
          const aTitle = 'title' in a ? a.title : 'name' in a ? a.name : ''
          const bTitle = 'title' in b ? b.title : 'name' in b ? b.name : ''
          return aTitle.localeCompare(bTitle)
        case 'priority':
          if ('priority' in a && 'priority' in b) {
            const priorityOrder = { High: 0, Medium: 1, Low: 2 }
            return priorityOrder[a.priority] - priorityOrder[b.priority]
          }
          return 0
        case 'date':
        default:
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
      }
    })

    return result
  })

  function updateFilters(newFilters: Filters) {
    filters.value = newFilters
  }

  return {
    filters,
    filteredItems,
    updateFilters
  }
}