<template>
  <ol class="timeline">
    <slot />
  </ol>
</template>

<style scoped>
.timeline {
  list-style: none;
  margin: 1.25rem 0 2.75rem;
  padding: 0.25rem 0 0.25rem 1.5rem;
  border-left: 2px solid var(--vp-c-divider);
}
</style>
