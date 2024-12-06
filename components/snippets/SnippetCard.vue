<template>
  <ResourceCard>
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <h3 class="text-lg font-semibold">{{ snippet.title }}</h3>
        <div class="mt-2 bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <pre><code :class="['hljs', `language-${snippet.language}`]" v-html="highlightedCode"></code></pre>
        </div>
        <p class="mt-2 text-gray-600">{{ snippet.description }}</p>
        <TagsList :tags="snippet.tags" class="mt-3" />
      </div>
      <div class="ml-4">
        <input
          type="checkbox"
          :checked="snippet.isUsed"
          @change="$emit('toggle-used', snippet.id)"
          class="h-5 w-5 text-blue-600"
        />
      </div>
    </div>
    <div class="mt-3 text-sm text-gray-500">
      <span>Added: {{ new Date(snippet.addedDate).toLocaleDateString() }}</span>
      <span v-if="snippet.usedDate" class="ml-4">
        Used: {{ new Date(snippet.usedDate).toLocaleDateString() }}
      </span>
    </div>
  </ResourceCard>
</template>

<script setup lang="ts">
import type { CodeSnippet } from '~/types'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

// Import common languages
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import ruby from 'highlight.js/lib/languages/ruby'
import php from 'highlight.js/lib/languages/php'
import sql from 'highlight.js/lib/languages/sql'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import shell from 'highlight.js/lib/languages/shell'

// Register languages
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('java', java)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('csharp', csharp)
hljs.registerLanguage('ruby', ruby)
hljs.registerLanguage('php', php)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('shell', shell)

const props = defineProps<{
  snippet: CodeSnippet
}>()

defineEmits<{
  'toggle-used': [id: string]
}>()

const highlightedCode = computed(() => {
  try {
    return hljs.highlight(props.snippet.code, {
      language: props.snippet.language.toLowerCase()
    }).value
  } catch (e) {
    return props.snippet.code
  }
})</script>