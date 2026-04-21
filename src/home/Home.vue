<script setup lang="ts">
import { VPHomeSponsors } from "vitepress/theme";
import Hero from "./Hero.vue";
import Card from "../research/Card.vue";
import { funders } from "../logo/";

import imgNonFourier from "../research/featured/non-fourier.jpg";
import imgNeRF from "../research/featured/nerf.png";
import imgAdaptiveLiDAR from "../research/featured/adaptive-lidar.png";
import imgFoveaCamPlus from "../research/featured/foveacam-plus.png";
import imgSchrodinger from "../research/featured/schrodinger-camera.png";

const featured = [
  {
    title: "Non-Fourier Event-Based Opto-electronic Convolution Accelerator",
    image: imgNonFourier,
    link: "/research/2026/incoherent-optical-computing/",
  },
  {
    title: "Augmenting with NeRFs: Fast Relocalization on Densified Datasets",
    image: imgNeRF,
    link: "/research/2025/nerf-relocalization/",
  },
  {
    title: "FoveaCam++: Long Range Multi-Object High-Resolution Tracking",
    image: imgFoveaCamPlus,
    link: "/research/2024/foveacam-plus/",
  },
  {
    title: "Adaptive Lightweight LiDAR to Decouple Robot-Camera Geometry",
    image: imgAdaptiveLiDAR,
    link: "/research/2024/lightweight-lidar/",
  },
  {
    title: "Schrödinger’s Camera: Quantum-Based Privacy Preserving Camera",
    image: imgSchrodinger,
    link: "/research/2023/schrodinger-cam/",
  },
];
</script>

<template>
  <div class="home">
    <Hero />

    <section class="mission">
      <div class="mission-inner">
        <p class="eyebrow">Florida Optics &amp; Computational Sensor Lab</p>
        <h2>
          We build cameras that see what other cameras can't —
          <span class="accent">faster, smaller, smarter</span>.
        </h2>
        <p class="lede">
          Part of the
          <a
            href="https://www.ece.ufl.edu/"
            target="_blank"
            rel="noopener noreferrer"
            >Electrical &amp; Computer Engineering Department</a
          >
          at the University of Florida, we work at the intersection of
          <b>computer vision</b>, <b>computational photography</b>, and
          <b>novel optical hardware</b>.
        </p>
      </div>
    </section>

    <section class="featured">
      <header class="section-head">
        <h2>Featured Research</h2>
        <a class="more" href="/research/">All projects →</a>
      </header>
      <div class="featured-grid">
        <Card
          v-for="p in featured"
          :key="p.link"
          :title="p.title"
          :image="p.image"
          :link="p.link"
        />
      </div>
    </section>

    <section class="funders">
      <header class="section-head">
        <h2>Funding Sources</h2>
      </header>
      <VPHomeSponsors :data="funders" />
    </section>

    <section class="cta-strip">
      <div class="cta-inner">
        <div>
          <h2>Working with us</h2>
          <p>
            We are always looking for curious students and collaborators. Browse
            recent publications, meet the team, or reach out directly.
          </p>
        </div>
        <div class="cta-buttons">
          <a class="btn primary" href="/publications/">Publications</a>
          <a class="btn" href="/team/">Team</a>
          <a class="btn" href="/about/">Contact</a>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: clamp(48px, 8vw, 96px);
  padding-bottom: clamp(48px, 8vw, 96px);
}

.mission,
.featured,
.cta-strip,
.funders {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 48px);
  box-sizing: border-box;
}

.mission-inner {
  max-width: 820px;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin: 0 0 16px;
}

.mission h2 {
  font-size: clamp(28px, 4.5vw, 44px);
  line-height: 1.15;
  font-weight: 700;
  margin: 0 0 20px;
  letter-spacing: -0.01em;
  border: none;
  padding: 0;
}

.accent {
  color: var(--vp-c-brand-1);
}

.lede {
  font-size: clamp(16px, 1.6vw, 18px);
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
}

.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.section-head h2 {
  margin: 0;
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 700;
  border: none;
  padding: 0;
}

.more {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.more:hover {
  text-decoration: underline;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.cta-strip {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: clamp(24px, 4vw, 40px);
}

.cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.cta-strip h2 {
  margin: 0 0 8px;
  font-size: clamp(20px, 2.6vw, 26px);
  font-weight: 700;
  border: none;
  padding: 0;
}

.cta-strip p {
  margin: 0;
  max-width: 540px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  transition:
    background 0.15s,
    border-color 0.15s,
    transform 0.15s;
}

.btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.btn.primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}

.btn.primary:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  color: #fff;
}

.funders {
  text-align: center;
}

.funders-label {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.funders :deep(.VPHomeSponsors .love) {
  display: none;
}

.funders :deep(section.VPHomeSponsors) {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
}

.funders :deep(.vp-sponsor-grid.medium .vp-sponsor-grid-image) {
  max-width: 120px;
  max-height: 48px;
}

@media (max-width: 640px) {
  .cta-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
