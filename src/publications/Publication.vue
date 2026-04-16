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
  <a
    class="publication"
    :class="{ clickable: !!link }"
    :href="link"
    :target="link ? '_blank' : undefined"
    :rel="link ? 'noopener noreferrer' : undefined"
  >
    <h4 class="title">{{ title }}</h4>
    <div class="meta-row">
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
  </a>
</template>

<style scoped>
.publication {
  margin: 24px 0;
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
    border-color 0.25s,
    background-color 0.25s;
}

.publication:hover,
.publication:focus-visible {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
}

.publication.clickable {
  cursor: pointer;
}

.title {
  margin: 0;
}

.publication.clickable:hover .title,
.publication.clickable:focus-visible .title {
  text-decoration: underline;
}

.meta-row {
  width: 100%;
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  column-gap: 12px;
  row-gap: 6px;
}

.authors {
  flex: 1 1 480px;
  min-width: 0;
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
