<script setup lang="ts">
import { Check, Copy, MessageSquareQuote as Quote } from "@lucide/vue";
import { computed, ref } from "vue";
import { toBibtex } from "./bibtex";
import type { Publication } from "./types";

const props = defineProps<{ publication: Publication }>();

const dialog = ref<HTMLDialogElement>();
const copied = ref(false);
const bibtex = computed(() => toBibtex(props.publication));

function open() {
  dialog.value?.showModal();
}

function close() {
  dialog.value?.close();
  copied.value = false;
}

async function copyBibtex() {
  try {
    await navigator.clipboard.writeText(bibtex.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch {
    // Clipboard API may be unavailable (insecure context); silently ignore.
  }
}
</script>

<template>
  <button
    type="button"
    class="cite"
    aria-label="Show BibTeX citation"
    @click="open"
  >
    <Quote :size="16" />
  </button>
  <dialog ref="dialog" class="cite-dialog" @click.self="close">
    <div class="cite-dialog-inner">
      <div class="cite-dialog-header">
        <span class="cite-dialog-title">
          BibTeX
          <span class="cite-dialog-thanks">
            — thanks for citing our work!
          </span>
        </span>
        <button
          type="button"
          class="copy"
          :aria-label="copied ? 'Copied' : 'Copy BibTeX'"
          @click.stop="copyBibtex"
        >
          <Check v-if="copied" :size="16" />
          <Copy v-else :size="16" />
        </button>
      </div>
      <pre>{{ bibtex }}</pre>
    </div>
  </dialog>
</template>

<style scoped>
.cite {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  padding: 2px;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.cite:hover {
  color: var(--vp-c-brand-1);
}

.cite-dialog {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 0;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  max-width: min(90vw, 720px);
  width: 100%;
}

.cite-dialog::backdrop {
  background: rgba(0, 0, 0, 0.4);
}

.cite-dialog-inner {
  display: flex;
  flex-direction: column;
}

.cite-dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid var(--vp-c-border);
}

.cite-dialog-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.cite-dialog-thanks {
  font-weight: 400;
  letter-spacing: normal;
  text-transform: none;
  font-style: italic;
  color: var(--vp-c-text-3, var(--vp-c-text-2));
}

.copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding: 4px 6px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition:
    color 0.15s,
    border-color 0.15s;
}

.copy:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.cite-dialog pre {
  margin: 0;
  padding: 14px;
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  max-height: 60vh;
  overflow: auto;
}
</style>
