<script setup lang="ts">
import { StyleValue } from "vue";

const props = defineProps<{
  title: string;
  authors?: (
    | string
    | {
        name: string;
        link: string;
        style?: StyleValue;
      }
  )[];
  links?: { [text: string]: string };
  venue?: string;
  link?: string;
}>();

function openExternalLink(url: string): void {
  window.open(url, "_blank", "noopener,noreferrer");
}

function onInlineLinkClick(event: MouseEvent, url: string): void {
  event.preventDefault();
  event.stopPropagation();
  openExternalLink(url);
}

function onInlineLinkKeydown(event: KeyboardEvent, url: string): void {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  event.stopPropagation();
  openExternalLink(url);
}
</script>

<template>
  <div class="publication">
    <h4 class="title">
      <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">{{
        title
      }}</a>
      <span v-else>{{ title }}</span>
    </h4>
    <div v-if="authors" class="authors">
      <span
        v-for="(author, index) in authors"
        :key="index"
        style="text-wrap: nowrap"
      >
        <span
          v-if="typeof author === 'object'"
          class="inline-link"
          role="link"
          tabindex="0"
          :style="author.style ?? {}"
          @click="onInlineLinkClick($event, author.link)"
          @keydown="onInlineLinkKeydown($event, author.link)"
        >
          {{ author.name }}
        </span>
        <span v-else>{{ author }}</span>
        <span class="divider">,&nbsp;</span>
      </span>
    </div>
    <div v-if="links || venue" class="links">
      <template
        v-for="[text, linkUrl] in Object.entries(links ?? {})"
        :key="text"
      >
        <span
          class="inline-link"
          role="link"
          tabindex="0"
          @click="onInlineLinkClick($event, linkUrl)"
          @keydown="onInlineLinkKeydown($event, linkUrl)"
        >
          {{ text }}
        </span>
        <span class="divider"> | </span>
      </template>
      <span v-if="venue">{{ venue }}</span>
    </div>
  </div>
</template>

<style scoped>
.publication {
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: top;
  justify-content: flex-start;
  color: inherit;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 12px;
  transition:
    border-color 0.1s,
    background-color 0.1s;
  &:not(:hover) a {
    text-decoration: none;
  }
}

.publication:hover,
.publication:focus-visible {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-soft);
}

.title {
  margin: 0;
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
  justify-content: flex-start;
  flex-wrap: wrap;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.authors {
  font-style: italic;
}

.links {
  user-select: none;
  margin-left: auto;
  justify-content: flex-end;
}

.links > * {
  margin: 0 4px;
}

.inline-link {
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
}

.authors > :last-child > .divider {
  display: none;
}

.links > .divider:last-child {
  display: none;
}
</style>
