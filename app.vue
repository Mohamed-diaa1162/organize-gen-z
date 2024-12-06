<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900">Dev Resources</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink
                v-for="link in navigation"
                :key="link.path"
                :to="link.path"
                class="inline-flex items-center px-1 pt-1 border-b-2"
                :class="[
                  route.path === link.path
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                ]"
              >
                {{ link.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const navigation = [
  { name: 'Dashboard', path: '/' },
  { name: 'Tutorials', path: '/tutorials' },
  { name: 'Libraries', path: '/libraries' },
  { name: 'Snippets', path: '/snippets' }
]
</script>