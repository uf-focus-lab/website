<script setup lang="ts">
import { computed } from "vue";
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
</script>

<template>
  <div class="person" :class="{ large }">
    <img :src="src" :alt="name" class="photo" />
    <h3 class="name">{{ name }}</h3>
    <div class="description"><slot /></div>
    <div class="links">
      <a
        v-for="(url, text) in links"
        :key="text"
        :href="url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{
          text.toLowerCase() === "email"
            ? url.toLowerCase().replace("mailto:", "")
            : text
        }}
      </a>
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
  gap: 12px;
  flex-wrap: wrap;
}
.links a {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
}
.links a:hover {
  text-decoration: underline;
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
