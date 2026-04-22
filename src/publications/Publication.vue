<script setup lang="ts">
import { computed } from "vue";
import Cite from "./Cite.vue";
import type { Publication } from "./types";
type Mode = "list" | "banner";
const props = defineProps<Publication & { tag?: string; mode?: Mode }>();
const mode = computed(() => props.mode ?? "list");

function linkAttrs(href: string) {
  return /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href)
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };
}
</script>

<template>
  <div class="publication">
    <component :is="mode === 'banner' ? 'h2' : 'h4'" class="title">
      <a v-if="link && mode === 'list'" v-bind="linkAttrs(link)">{{ title }}</a>
      <span v-else>{{ title }}</span>
      <Cite :publication="props" style="width: 2ch" />
    </component>
    <div v-if="authors" class="authors">
      <span
        v-for="(author, index) in authors"
        :key="index"
        style="text-wrap: nowrap"
      >
        <a
          v-if="typeof author === 'object' && author.link"
          class="inline-link"
          v-bind="linkAttrs(author.link)"
          :style="author.style"
        >
          {{ author.name }}
        </a>
        <span v-else>{{ author }}</span>
        <span class="divider">,&nbsp;</span>
      </span>
    </div>
    <div v-if="links || venue" class="links">
      <template
        v-for="[text, linkUrl] in Object.entries(links ?? {})"
        :key="text"
      >
        <a class="inline-link" v-bind="linkAttrs(linkUrl)">
          {{ text }}
        </a>
        <span class="divider"> | </span>
      </template>
      <span v-if="venue">{{ venue }}</span>
    </div>
  </div>
</template>

<style scoped>
.publication {
  margin: 0 0 0 -1.4ch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: inherit;
  text-decoration: none;
  border-left: 0.4ch solid transparent;
  padding: 12px 0 12px 1ch;
  gap: 6px;
  transition:
    background-color 0.1s,
    border-color 0.1s;
}

.publication:hover,
.publication:focus-visible {
  background-color: var(--vp-c-bg-soft);
  border-left-color: var(--vp-c-border);
}

.title {
  margin: 0;
  display: flex;
  width: 100%;
  position: relative;
}

a {
  font-family: unset;
  font-size: inherit;
  color: inherit;
  font-weight: inherit;
}

.authors,
.links {
  display: flex;
  flex-wrap: wrap;
  line-height: 1.2em;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.authors {
  font-style: italic;
}

.links {
  user-select: none;
}

.links > * {
  margin-right: 8px;
}

.inline-link {
  text-decoration: underline;
}

.authors > :last-child > .divider,
.links > .divider:last-child {
  display: none;
}

.title :deep(.cite) {
  position: absolute;
  left: calc(100%);
  top: 0;
  width: 5ch;
  opacity: 0;
  padding: 0.2em 1ch;
}

.publication:hover :deep(.cite),
.publication:focus-within :deep(.cite) {
  opacity: 1;
}
</style>
