<script setup lang="ts">
import { FileText, Globe, Milestone } from "@lucide/vue";
import { VPSocialLink } from "vitepress/theme";
import { computed, type Component } from "vue";
import images, { stem } from "./images";

const props = defineProps<{
  name: string;
  image: string;
  links: { [text: string]: string };
  large?: boolean;
}>();

const src = computed(() => {
  if (/^(https?:)?\//.test(props.image)) return props.image;
  const id = stem(props.image);
  const resolved = images[id];
  if (!resolved) {
    throw new Error(
      `People.vue: image ${id} not found in ${JSON.stringify(images)}`,
    );
  }
  return resolved;
});

type Icon = Component | string; // string = simple-icons slug via VitePress

// Match on lowercased link text. Brand marks come from VitePress's built-in
// simple-icons pipeline (`vpi-social-*`); generic ones come from lucide.
const icons: Record<string, Icon> = {
  github: "github",
  linkedin: "linkedin",
  "google scholar": "googlescholar",
  scholar: "googlescholar",
  orcid: "orcid",
  x: "x",
  twitter: "x",
  website: Globe,
  homepage: Globe,
  cv: FileText,
  resume: FileText,
  timeline: Milestone,
};

const links = computed(() => {
  let email: string | null = null;
  const misc: { text: string; icon?: Icon; url: string }[] = [];
  for (const [text, url] of Object.entries(props.links ?? {})) {
    const key = text.toLowerCase();
    if (email === null && key === "email") email = url;
    else misc.push({ text, url, icon: icons[key] });
  }
  return { email, misc };
});

const emailText = computed(() =>
  links.value.email?.replace(/^mailto:/i, "").toLowerCase(),
);
</script>

<template>
  <div class="person" :class="{ large }">
    <img :src="src" :alt="name" class="photo" />
    <h3 class="name">{{ name }}</h3>
    <div class="description"><slot /></div>
    <div class="links">
      <a v-if="links.email" class="email" :href="links.email">
        {{ emailText }}
      </a>
      <div v-if="links.email && links.misc.length" class="divider" />
      <span class="misc">
        <template v-for="{ text, url, icon } in links.misc" :key="text">
          <VPSocialLink
            v-if="typeof icon === 'string'"
            :icon
            :link="url"
            :aria-label="text"
            :title="text"
            :me="false"
          />
          <a
            v-else
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            :title="icon ? text : undefined"
            :aria-label="icon ? text : undefined"
          >
            <component v-if="icon" :is="icon" :size="18" />
            <template v-else>{{ text }}</template>
          </a>
        </template>
      </span>
    </div>
  </div>
</template>

<style scoped>
.person {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "photo name"
    "photo desc"
    "photo links";
  column-gap: 4ch;
  row-gap: 0.4em;
  align-items: start;
  padding: 16px 0;
}
.photo {
  grid-area: photo;
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 32%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  align-self: start;
}
:global(.dark) .photo {
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.08);
}
.name {
  grid-area: name;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  align-self: end;
}
.description {
  grid-area: desc;
  text-wrap: pretty;
  hyphens: auto;
  &,
  & * {
    margin: 0;
    line-height: 1.4 !important;
  }
}
.links {
  grid-area: links;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.divider {
  width: 1px;
  height: 1em;
  background: var(--vp-c-divider);
}
.links a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}
.links a:hover {
  text-decoration: underline;
}
.misc {
  display: flex;
  align-items: center;
  gap: 10px;
}
.misc a {
  display: inline-flex;
  align-items: center;
}
/* Compact VitePress's 36px social button into an inline icon */
.misc :deep(.VPSocialLink) {
  width: auto;
  height: auto;
  color: var(--vp-c-brand-1);
}
.misc :deep(.VPSocialLink > [class^="vpi-social-"]) {
  width: 18px;
  height: 18px;
}
.misc :deep(.VPSocialLink:hover) {
  color: var(--vp-c-brand-2);
}

.person.large .photo {
  width: 220px;
  height: auto;
  object-fit: unset;
  border-radius: 32px;
}

@media (max-width: 719px) {
  .person {
    grid-template-areas:
      "photo name"
      "desc  desc"
      "links links";
    column-gap: 16px;
    align-items: center;
  }
  .photo {
    width: 32vw;
    height: 32vw;
  }
  .name {
    font-size: 1.6rem;
    align-self: center;
    word-spacing: 100vw;
    padding-left: 1ch;
    line-height: 1.4em;
  }

  .person.large {
    grid-template-columns: 1fr;
    grid-template-areas:
      "photo"
      "name"
      "desc"
      "links";
  }
  .person.large .photo {
    width: 60vw;
    height: auto;
    justify-self: center;
  }
  .person.large .name {
    word-spacing: normal;
    text-align: center;
  }
}
</style>
