<script setup lang="ts">
import { watch, onMounted } from 'vue'
import Theme from 'vitepress/theme'
import { useData } from 'vitepress'
const { Layout } = Theme
const { site } = useData()
onMounted(() => {
    const style = document.createElement("style");
    document.head.appendChild(style);
    watch(
        () => (site.value as any).CSS as string | undefined,
        (css) => { style.innerHTML = css || ""; },
        { immediate: true }
    );
})
</script>

<template>
    <Layout />
</template>
