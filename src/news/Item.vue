<script setup lang="ts">
defineProps<{
  date: string;
}>();
</script>

<template>
  <li class="item">
    <time class="date">{{ date }}</time>
    <div class="content"><slot /></div>
  </li>
</template>

<style scoped>
.item {
  position: relative;
  display: grid;
  align-items: baseline;
  padding: 0.35rem 0 0;
  row-gap: 0.25em;
}

.item::before {
  content: "";
  position: absolute;
  left: calc(-1.5rem - 1px);
  top: 0.72rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  border: 2px solid var(--vp-c-bg);
  box-sizing: content-box;
  transform: translateX(-50%);
  transition: 0.1s ease;
}

.item:hover::before {
  background: var(--vp-c-brand-1);
}

.date {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.82em;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  letter-spacing: 0.01em;
}

.item:hover .date {
  color: var(--vp-c-brand-1);
}

.content {
  line-height: 1.65;
}

.content > :deep(p) {
  margin: 0;
}

@media (max-width: 640px) {
  .item {
    grid-template-columns: 1fr;
    row-gap: 0.1rem;
  }
}
</style>
