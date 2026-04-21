<script setup lang="ts">
import Greeter from "./Greeter.vue";
import ufEceLogo from "../logo/uf-ece.png";
</script>

<template>
  <section class="hero">
    <div class="hero-inner">
      <div class="hero-text">
        <p class="brand">FOCUS Lab</p>
        <h1>The Florida Optics &amp; Computational Sensor Lab</h1>
        <p class="tagline">
          <span>Computer Vision</span>
          <span>Novel Sensors</span>
          <span>Machine Learning</span>
        </p>
        <a
          class="affiliation"
          href="https://www.ece.ufl.edu/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="UF Electrical and Computer Engineering"
        >
          <img
            :src="ufEceLogo"
            alt="UF Electrical and Computer Engineering"
            loading="lazy"
          />
        </a>
      </div>

      <div class="hero-art" aria-hidden="true">
        <Greeter class="hero-svg" />
        <div class="halo" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: clamp(32px, 6vw, 64px) clamp(20px, 4vw, 48px) clamp(48px, 8vw, 96px);
  background:
    radial-gradient(
      ellipse at top right,
      var(--vp-c-brand-soft),
      transparent 60%
    ),
    linear-gradient(180deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
}

.hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  align-items: center;
  gap: clamp(24px, 4vw, 64px);
}

.hero-text {
  min-width: 0;
}

.brand {
  display: inline-block;
  margin: 0 0 16px;
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 999px;
}

h1 {
  margin: 0;
  font-size: clamp(32px, 6vw, 64px);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.02em;
  border: none;
  padding: 0;
}

.tagline {
  margin: clamp(20px, 3vw, 28px) 0 clamp(28px, 4vw, 40px);
  display: flex;
  flex-wrap: wrap;
  gap: 6px 0;
  font-size: clamp(15px, 1.6vw, 18px);
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.tagline span {
  white-space: nowrap;
}

.tagline span:not(:last-child)::after {
  content: " / ";
  display: inline-block;
  margin: 0 0.5ch;
  color: var(--vp-c-text-3);
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 11px 20px;
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

.hero-art {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 5 / 4;
  min-width: 0;
}

.hero-svg {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 1;
}

.halo {
  position: absolute;
  inset: 8% 8%;
  background: radial-gradient(
    circle at center,
    var(--vp-c-brand-soft),
    transparent 70%
  );
  filter: blur(40px);
  z-index: 0;
}

.affiliation {
  display: block;
  max-width: 32ch;
  margin-top: 12px;
}

.affiliation img {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 860px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-art {
    order: -1;
    aspect-ratio: 16 / 10;
    max-height: 260px;
  }
}
</style>
