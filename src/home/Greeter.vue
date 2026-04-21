<script setup lang="ts">
import p1 from "./greeter/1-1.webp";
import p2 from "./greeter/2-1.webp";
import p3 from "./greeter/3-1.webp";
import p4 from "./greeter/4.webp";
import p5 from "./greeter/5.webp";
import p6 from "./greeter/6.webp";
import p7 from "./greeter/7.webp";
import p8 from "./greeter/8.webp";
import p9 from "./greeter/9.webp";
import p10 from "./greeter/10.webp";

type Piece = {
  href: string;
  x: number;
  y: number;
  fade?: boolean;
  delay: number;
};

const pieces: Piece[] = [
  { href: p1, x: 0, y: 0, delay: 0 },
  { href: p2, x: 0, y: 160, delay: 60 },
  { href: p3, x: 0, y: 400, delay: 120 },
  { href: p4, x: 0, y: 550, delay: 180 },
  { href: p5, x: 250, y: 0, delay: 240 },
  { href: p6, x: 260, y: 180, delay: 300, fade: true },
  { href: p7, x: 260, y: 520, delay: 360 },
  { href: p8, x: 760, y: 0, delay: 420 },
  { href: p9, x: 760, y: 280, delay: 480 },
  { href: p10, x: 760, y: 500, delay: 540 },
];

function offsetStyle(p: Piece): string {
  if (p.fade) return `--delay: ${p.delay}ms`;
  return `--x: ${p.x === 0 ? -100 : p.x}px; --y: ${p.y}px; --delay: ${p.delay}ms`;
}
</script>

<template>
  <svg class="greeter" viewBox="0 0 1000 800" xmlns="http://www.w3.org/2000/svg">
    <image
      v-for="(p, i) in pieces"
      :key="i"
      :href="p.href"
      :x="p.x"
      :y="p.y"
      :class="p.fade ? 'fade' : 'piece'"
      :style="offsetStyle(p)"
    />
  </svg>
</template>

<style scoped>
.greeter {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.piece {
  transform-origin: center;
  animation: greeter-gather 1.4s cubic-bezier(0.22, 1, 0.36, 1)
    var(--delay, 0ms) both;
}

@keyframes greeter-gather {
  0% {
    opacity: 0;
    transform: translate(var(--x, 0px), var(--y, 0px)) scale(1);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
}

.fade {
  animation: greeter-fade 1.4s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms)
    both;
}

@keyframes greeter-fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .piece,
  .fade {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
