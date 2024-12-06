import { ref, watch } from 'vue'
import type { Tutorial, Library, CodeSnippet } from '~/types'

type StorageData = {
  tutorials: Tutorial[]
  libraries: Library[]
  snippets: CodeSnippet[]
}

export function useFileStorage<T extends keyof StorageData>(fileName: T) {
  const data = ref<StorageData[T]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Initialize with empty array to prevent hydration mismatch
  data.value = []

  async function loadData() {
    if (process.client) {
      try {
        loading.value = true
        const stored = localStorage.getItem(`devresources_${fileName}`)
        if (stored) {
          data.value = JSON.parse(stored)
        }
      } catch (err) {
        error.value = 'Failed to load data'
        console.error(err)
      } finally {
        loading.value = false
      }
    }
  }

  async function saveData() {
    if (process.client) {
      try {
        localStorage.setItem(`devresources_${fileName}`, JSON.stringify(data.value))
      } catch (err) {
        error.value = 'Failed to save data'
        console.error(err)
      }
    }
  }

  // Only watch for changes on client-side
  if (process.client) {
    watch(data, saveData, { deep: true })
  }

  // Load initial data only on client-side
  if (process.client) {
    loadData()
  }

  return {
    data,
    loading,
    error,
    reload: loadData
  }
}