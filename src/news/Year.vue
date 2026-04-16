<script setup lang="ts">
defineProps<{
  year: string;
}>();
</script>

<template>
    <h2>{{ year }}</h2>
    <table>
        <slot />
    </table>
</template>
