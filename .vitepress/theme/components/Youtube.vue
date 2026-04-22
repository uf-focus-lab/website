<template>
  <div class="youtube" :style="{ aspectRatio: ratio }">
    <button
      v-if="!loaded"
      class="poster"
      type="button"
      :aria-label="`Play YouTube video ${v}`"
      @click="loaded = true"
    >
      <img :src="thumb" alt="" loading="lazy" decoding="async" />
      <svg class="play" viewBox="0 0 68 48" aria-hidden="true">
        <path
          class="yt-bg"
          d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74 0 13.05 0 24 0 24s0 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C68 34.95 68 24 68 24s0-10.95-1.48-16.26z"
        />
        <path class="yt-tri" d="M 45 24 L 27 14 L 27 34 Z" />
      </svg>
    </button>
    <iframe
      v-else
      :src="embedUrl"
      allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture;
        web-share;
      "
      allowfullscreen
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    v: string;
    aspectRatio?: string | number;
  }>(),
  { aspectRatio: "16 / 9" },
);

const loaded = ref(false);
const ratio = computed(() => String(props.aspectRatio));
const thumb = computed(
  () => `https://img.youtube.com/vi/${props.v}/hqdefault.jpg`,
);
const embedUrl = computed(
  () => `https://www.youtube-nocookie.com/embed/${props.v}?autoplay=1`,
);

// Origins the YouTube embed hits once the iframe loads. Warming the TCP/TLS
// handshake now means the click-to-play path is just the HTTP request itself.
const PRECONNECT = [
  "https://www.youtube-nocookie.com",
  "https://www.google.com",
  "https://googleads.g.doubleclick.net",
  "https://static.doubleclick.net",
  "https://i.ytimg.com",
];

function addLink(
  rel: string,
  href: string,
  extras: Record<string, string> = {},
) {
  if (document.head.querySelector(`link[rel="${rel}"][href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;
  for (const [k, v] of Object.entries(extras)) link.setAttribute(k, v);
  document.head.appendChild(link);
}

function warm() {
  // Prefetching the embed document pulls the HTML/JS into the HTTP cache so the
  // iframe's actual request resolves from cache on click.
  addLink("prefetch", embedUrl.value, { as: "document" });
}

onMounted(() => {
  for (const href of PRECONNECT)
    addLink("preconnect", href, { crossorigin: "" });
  // Defer prefetch until the browser reports idle so it doesn't compete with
  // in-view resources. Falls back to a delayed timer where unsupported.
  const ric = (
    window as Window & { requestIdleCallback?: typeof requestIdleCallback }
  ).requestIdleCallback;
  if (ric) ric(warm, { timeout: 3000 });
  else setTimeout(warm, 2000);
});
</script>

<style scoped>
.youtube {
  position: relative;
  width: 100%;
  display: block;
  background: #000;
}
.youtube .poster,
.youtube iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.youtube .poster {
  padding: 0;
  background: #000;
  cursor: pointer;
  overflow: hidden;
}
.youtube .poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
  transition: opacity 0.15s ease;
}
.youtube .poster:hover img {
  opacity: 1;
}
.youtube .play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(48px, 12%, 96px);
  height: auto;
  transform: translate(-50%, -50%);
  pointer-events: none;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.35));
  transition: transform 0.15s ease;
}
.youtube .yt-bg {
  fill: #212121;
  fill-opacity: 0.8;
  transition:
    fill 0.15s ease,
    fill-opacity 0.15s ease;
}
.youtube .yt-tri {
  fill: #fff;
}
.youtube .poster:hover .yt-bg {
  fill: #f00;
  fill-opacity: 1;
}
</style>
