---
date: 2023-03-17
aside: false
---

<span style="font-size: 1.9vmax;">

**The Florida Optics and Computational Sensor Lab** is part of the Electrical and Computer Engineering Department at the University of Florida.

</span>
<span style="font-size:1.25vmax">

_Our research areas are **computer vision** and **computational photography.**_

</span>

<svg class="hero-collage" viewBox="0 0 1000 800">
        <image href="/home/hero/1-1.png" class="hero-piece" x="0" y="0" style="--x: -100px; --y: 0; --delay: 0ms;" />
        <image href="/home/hero/2-1.png" class="hero-piece" x="0" y="160" style="--x: -100px; --y: 160px; --delay: 60ms;" />
        <image href="/home/hero/3-1.png" class="hero-piece" x="0" y="400" style="--x: -100px; --y: 400px; --delay: 120ms;" />
        <image href="/home/hero/4.png" class="hero-piece" x="0" y="550" style="--x: -100px; --y: 550px; --delay: 180ms;" />
        <image href="/home/hero/5.png" class="hero-piece" x="250" y="0" style="--x: 250px; --y: 0; --delay: 240ms;" />
        <image href="/home/hero/6.png" class="hero-fade" x="260" y="180" style="--delay: 300ms;" />
        <image href="/home/hero/7.png" class="hero-piece" x="260" y="520" style="--x: 260px; --y: 520px; --delay: 360ms;" />
        <image href="/home/hero/8.png" class="hero-piece" x="760" y="0" style="--x: 760px; --y: 0; --delay: 420ms;" />
        <image href="/home/hero/9.png" class="hero-piece" x="760" y="280" style="--x: 760px; --y: 280px; --delay: 480ms;" />
        <image href="/home/hero/10.png" class="hero-piece" x="760" y="500" style="--x: 760px; --y: 500px; --delay: 540ms;" />
</svg>

<style scoped>
.hero-collage {
  width: 100%;
  z-index: 1;
}

.hero-piece {
    transform-origin: center;
    animation: hero-gather 1.4s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms) both;
}

@keyframes hero-gather {
    0% {
        opacity: 0;
        transform: translate(var(--x, 0px), var(--y, 0px)) scale(1);
    }
    100% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
    }
}

.hero-fade {
    animation: fade-in 1.4s  cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0ms) both;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@media (prefers-reduced-motion: reduce) {
    .hero-piece {
        animation: none;
        opacity: 1;
        transform: none;
    }
}
</style>

## Exploring the intersection of computing and light

