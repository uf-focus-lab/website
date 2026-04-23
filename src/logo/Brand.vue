<script setup lang="ts">
import FOCUS from "./focus.svg";
</script>

<template>
  <span class="brand">
    <FOCUS />
    <span class="brand-suffix">Lab</span>
  </span>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5ch;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
}

.brand-suffix {
  opacity: 0.6;
}
</style>
