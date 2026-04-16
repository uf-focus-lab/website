<script setup lang="ts">
defineProps<{
  date: string;
}>();
</script>

<template>
  <tr>
    <td class="date">{{ date }}</td>
    <td><slot /></td>
  </tr>
</template>

<style scoped>
.date {
  font-family: monospace;
  vertical-align: top;
}
</style>
