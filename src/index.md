---
layout: home
title: FOCUS Lab
description: The Florida Optics and Computational Sensor Lab (FOCUS Lab) is part of the Electrical and Computer Engineering Department at the University of Florida. Our research areas are computer vision and computational photography.
hero:
  name: The Florida Optics and Computational Sensor Lab
  text: <img src="/uf-ece-logo.png" class="ece-logo" alt="University of Florida ECE" />
  tagline: <span class="normal">Our research areas are <b>computer vision</b> and <b>computational photography</b>.</span>
  actions:
    - theme: brand
      text: Research
      link: /research/
    - theme: alt
      text: Publications
      link: /publications/
    - theme: alt
      text: Team
      link: /team/
  image:
    src: /home/camera-Decunt.png
    alt: FOCUS Lab
---

<script setup lang="ts">
import { VPHomeSponsors } from 'vitepress/theme'
import { funders } from './funding'
</script>

<style>
b {
    font-weight: bolder;
}
.ece-logo {
    width: 16ch;
    max-width: 60vw;
    margin: 0.4em 0 0 0;
}
/* Hide the "support us" heart that VPHomeSponsors ships with — we're showing
   research funders, not open-source sponsors. */
.VPHomeSponsors .love { display: none; }

.vp-sponsor-grid.medium .vp-sponsor-grid-image {
    max-width: 120px;
    max-height: 48px;
}
</style>

<VPHomeSponsors :data="funders" />
