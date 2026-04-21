<script setup lang="ts">
import { StyleValue } from "vue";

defineProps<{
  title: string;
  authors?: (string | { name: string; link: string; style?: StyleValue })[];
  links?: { [text: string]: string };
  venue?: string;
  link?: string;
}>();

function externalAttrs(url: string) {
  return /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(url)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}
</script>

<template>
  <div class="publication">
    <h4 class="title">
      <a v-if="link" :href="link" v-bind="externalAttrs(link)">{{ title }}</a>
      <span v-else>{{ title }}</span>
    </h4>
    <div v-if="authors" class="authors">
      <span
        v-for="(author, index) in authors"
        :key="index"
        style="text-wrap: nowrap"
      >
        <a
          v-if="typeof author === 'object'"
          class="inline-link"
          :href="author.link"
          v-bind="externalAttrs(author.link)"
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
        <a class="inline-link" :href="linkUrl" v-bind="externalAttrs(linkUrl)">
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
</style>
