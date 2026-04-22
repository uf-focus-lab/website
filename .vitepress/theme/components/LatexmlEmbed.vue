<template>
  <div ref="host" class="latexml-embed"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{
  // Directory under /public where LaTeXML emitted its output (trailing slash required).
  // The component fetches `${base}${entry}` and rewrites relative URLs to resolve against `base`.
  base: string;
  entry?: string;
}>();

const host = ref<HTMLDivElement>();

onMounted(async () => {
  const base = props.base.endsWith("/") ? props.base : props.base + "/";
  const entry = props.entry ?? "out.html";

  const res = await fetch(base + entry);
  if (!res.ok) {
    host.value!.textContent = `Failed to load ${base}${entry}: ${res.status}`;
    return;
  }
  const raw = await res.text();
  const doc = new DOMParser().parseFromString(raw, "text/html");

  // Rewrite relative href/src attributes to absolute public paths under `base`.
  // Shadow DOM doesn't honor <base>, so we have to resolve URLs ourselves.
  const isAbsolute = (v: string) => /^([a-z]+:|\/\/|\/|#|data:)/i.test(v);
  for (const el of doc.querySelectorAll<HTMLElement>("[href], [src]")) {
    for (const attr of ["href", "src"] as const) {
      const v = el.getAttribute(attr);
      if (v && !isAbsolute(v)) el.setAttribute(attr, base + v);
    }
  }

  const shadow = host.value!.attachShadow({ mode: "open" });
  for (const link of Array.from(
    doc.head.querySelectorAll('link[rel="stylesheet"]'),
  )) {
    shadow.appendChild(link.cloneNode(true));
  }
  const body = document.createElement("div");
  body.innerHTML = doc.body.innerHTML;
  shadow.appendChild(body);
});
</script>

<style scoped>
.latexml-embed {
  display: block;
  width: 100%;
}
</style>
