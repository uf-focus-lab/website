<!-- <script setup lang="ts">
    import Device from "./figures/device.svg"
</script> -->

<style scoped>
.figure-block {
    margin-bottom: 1.5rem;
}
</style>

## Anchor Points for Monocular Depth Estimation Under Severe Rolling Shutter Ego-motion

**Jacob Carter, Vaishnav Ramesh, Md Jahidul Islam, and Sanjeev J. Koppal**

_Rolling shutter (RS) cameras are widely deployed in robotic systems due to their low cost and power efficiency. However, robot ego-motion induces significant RS distortions that degrade geometric consistency and severely challenge visual perception. In this work, we address monocular depth estimation under large rolling shutter distortions caused by ego-motion. We introduce the concept of an anchor point, which establishes a consistent temporal and geometric reference between rolling shutter and global shutter observations. This formulation enables principled adaptation and fine-tuning of deep foundation models for depth estimation under RS distortions. To systematically evaluate the problem, we present a new rolling shutter dataset featuring large motion-induced geometric distortions representative of mobile robotic tasks. Our experimental analysis shows that anchor point selection is a primary factor governing depth accuracy under RS effects. We further characterize anchor configurations for RS-GS data capture and identify stable regimes that yield accurate depth estimates. Using a representative two-stage depth estimation pipeline, we conduct extensive ablation studies demonstrating that anchor-based modeling significantly improves performance, outperforming recent RS correction baselines under strong ego-motion. Finally, we validate our approach on a legged robot platform, demonstrating robust monocular depth estimation in the presence of substantial rolling shutter distortions in under 400 ms._

<!-- [Full Text (PDF)](./paper.pdf) -->

### Full Text Available Soon!
<!-- <div class="figure-block">
    <Device />
</div>
-->
<div style="margin-top: 40px;"></div>
<Youtube v="Zs6ictHywe0"/> 


[Project and Dataset Link](https://github.com/JacobACarter/Stable-Derolling "Project Github")
