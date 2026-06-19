<script setup lang="ts">
    import Device from "./figures/device.svg"
</script>

<style scoped>
.figure-block {
    margin-bottom: 1.5rem;
}
</style>

## FoveaCam Duo: Foveated Stereo for Standoff Depth Sensing

**Yuxuan Zhang, Jacob Carter, Hannah Kirkland, Micheal Tomadakis, Noah Ralph, and Sanjeev J. Koppal**

_Robust depth perception is fundamental to autonomous navigation, manipulation, and scene understanding. Here we apply the benefits of foveation to depth perception with FoveaCam Duo: a passive stereo system inspired by biological foveation and crypsis. Our system uses a pair of high-resolution telephoto cameras steered by fast MEMS mirrors to produce high quality, dense depth maps at any designated region of interest with minimal processing. However, the MEMS-steered optics introduce angle-dependent distortion that cannot be accounted for with traditional stereo calibration, which assumes fixed camera geometry. To account for this, we introduce a three-stage calibration pipeline that maps MEMS mirror voltages to camera pointing angles and rectifies the foveated images via affine regression. We analyze how extending detection range quadratically expands the feasible operating region for standoff observation, and our simulation confirms that multi-fovea agents achieve substantially higher target coverage than single-fovea counterparts. In our evaluation, FoveaCam Duo maintains accurate depth estimation at distances where conventional stereo fails entirely. We also release a raster-scanned foveated stereo dataset with multi-viewpoint captures along a linear rail to compare to traditional stereo. In addition, we present a self-supervised stereo algorithm to systematically compare to out-of-the-box and foveation-adapted state of the art depth prediction methods, demonstrating the integrity of stereo correspondence in our captures._

[Full Text (PDF)](./paper.pdf)


<div class="figure-block">
    <Device />
</div>

<Youtube v="rg7cFpxzaS8"/>
