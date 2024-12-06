<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  id?: string
}>()</script>