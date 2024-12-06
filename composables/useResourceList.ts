import { ref, computed } from 'vue'
import type { Tutorial, Library, CodeSnippet } from '~/types'

type Resource = Tutorial | Library | CodeSnippet

export function useResourceList<T extends Resource>(
  data: Ref<T[]>,
  defaultSort: keyof T = 'addedDate'
) {
  const showAddForm = ref(false)

  const sortedItems = computed(() => {
    return [...data.value].sort((a, b) => {
      const aValue = a[defaultSort]
      const bValue = b[defaultSort]
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return new Date(bValue).getTime() - new Date(aValue).getTime()
      }
      return 0
    })
  })

  function closeForm() {
    showAddForm.value = false
  }

  return {
    showAddForm,
    sortedItems,
    closeForm
  }
}