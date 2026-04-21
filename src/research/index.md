---
title: Research
prev: false
next: false
---

<script setup>
import Card from './Card.vue';
import imgNonFourier from './featured/non-fourier.jpg';
import imgNeRF from './featured/nerf.png';
import imgAdaptiveLiDAR from './featured/adaptive-lidar.png';
import imgFoveaCamPlus from './featured/foveacam-plus.png';
import imgAdaptiveLidar from './featured/adaptive-lidar.png';
import imgSchrodinger from './featured/schrodinger-camera.png';
</script>

<style scoped>
h2:first-child {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}
</style>

## Featured Projects

<div class="featured-grid">
  <Card
    title="Non-Fourier Event-Based Opto-electronic Convolution Accelerator"
    :image="imgNonFourier"
    link="/research/2026/incoherent-optical-computing/"
  />
  <Card
    title="Augmenting with NeRFs: Fast Relocalization on Densified Datasets"
    :image="imgNeRF"
    link="/research/2025/nerf-relocalization/"
  />
  <Card
    title="Design of an Adaptive Lightweight LiDAR to Decouple Robot-Camera Geometry"
    :image="imgAdaptiveLiDAR"
    link="/research/2024/lightweight-lidar/"
  />
  <Card
    title="FoveaCam++: Systems-Level Advances for Long Range Multi-Object High-Resolution Tracking"
    :image="imgFoveaCamPlus"
    link="/research/2024/foveacam-plus/"
  />
  <Card
    title="Energy-Efficient Adaptive 3D Sensing"
    :image="imgAdaptiveLidar"
    link="/research/2023/e3d/"
  />
  <Card
    title="Schrödinger’s Camera: First Steps Towards a Quantum-Based Privacy Preserving Camera"
    :image="imgSchrodinger"
    link="/research/2023/schrodinger-cam/"
  />
</div>

<style scoped>
.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 24px;
}
</style>
