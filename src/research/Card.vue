<script setup lang="ts">
defineProps<{
  title: string;
  image: string;
  link?: string;
}>();
</script>

<template>
  <component
    :is="link ? 'a' : 'div'"
    :href="link"
    class="featured"
    :style="{ backgroundImage: `url(${image})` }"
  >
    <div class="overlay">
      <h3 class="title">{{ title }}</h3>
    </div>
  </component>
</template>

<style scoped>
.featured {
  display: block;
  position: relative;
  aspect-ratio: 2 / 3;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s, transform 0.2s;
}

.featured:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: 12px 16px;
  min-height: calc(15px * 1.3 * 4 + 24px);
  display: flex;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  color: #fff;
}
</style>
