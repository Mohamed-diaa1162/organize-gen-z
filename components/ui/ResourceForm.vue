<template>
  <form @submit.prevent="$emit('submit')" class="space-y-4">
    <slot></slot>
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
defineEmits<{
  submit: []
  cancel: []
}>()</script>