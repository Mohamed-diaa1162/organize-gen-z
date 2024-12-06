import { ref, onMounted } from 'vue'

export function useClientData<T>(initialValue: T) {
  const isClient = ref(false)
  const data = ref<T>(initialValue)

  onMounted(() => {
    isClient.value = true
  })

  return {
    isClient,
    data
  }
}