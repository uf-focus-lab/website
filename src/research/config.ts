import type { DefaultTheme } from "vitepress";

const sidebar: DefaultTheme.SidebarItem[] = [
	{
		text: "Research",
		collapsed: false,
		items: [{ text: "Overview", link: "/research/" }]
	},
	{
		text: "Featured Projects",
		collapsed: false,
		items: [
			{
				text: "Non-Fourier Event-Based Opto-electronic Convolution Accelerator",
				link: "/research/incoherent-optical-computing/"
			},
			{
				text: "Augmenting with NeRFs: Fast Relocalization on Densified Datasets",
				link: "/research/augmenting-with-nerfs-fast-relocalization-on-densified-datasets/"
			},
			{
				text: "Design of an Adaptive Lightweight LiDAR to Decouple Robot-Camera Geometry",
				link: "/research/design-of-an-adaptive-lightweight-lidar-to-decouple-robot-camera-geometry/"
			},
			{
				text: "FoveaCam++: Systems-Level Advances for Long Range Multi-Object High-Resolution Tracking",
				link: "/research/foveacam-systems-level-advances-for-long-range-multi-object-high-resolution-tracking/"
			},
			{
				text: "Energy-Efficient Adaptive 3D Sensing",
				link: "/research/e3d/"
			}
		]
	},
	{
		text: "All Projects",
		collapsed: false,
		items: [
			{
				text: "Schrodinger's Camera: First Steps Towards a Quantum-Based Privacy Preserving Camera",
				link: "/research/schrodingerscamera/"
			},
			{
				text: "Event-based Dual Photography for Transparent Scene Reconstruction",
				link: "/research/event-based-dual-photography-for-transparent-scene-reconstruction/"
			},
			{
				text: "SACCADECAM: Adaptive Visual Attention for Monocular Depth Sensing",
				link: "/research/saccadecam-adaptive-visual-attention-for-monocular-depth-sensing/"
			},
			{
				text: "Dense Lissajous Sampling and Interpolation for Dynamic Light-transport",
				link: "/research/dense-lissajous-sampling-and-interpolation-for-dynamic-light-transport/"
			},
			{
				text: "FoveaCam: A Mems Mirror Enabled Foveating Camera",
				link: "/research/foveating-cameras/"
			},
			{
				text: "Flying-Dot Photography",
				link: "/research/flying-dot-photography/"
			},
			{
				text: "Adaptive Depth Sensing",
				link: "/research/adaptive-depth-sensing/"
			},
			{
				text: "3D Vision and Radiological Sensor Fusion",
				link: "/research/3d-vision-and-radiological-sensor-fusion/"
			},
			{
				text: "Wide-Angle MEMS Mirrors and Micro Vision Sensors",
				link: "/research/wide-angle-mems-mirrors-and-micro-vision-sensors/"
			},
			{
				text: "Wide-angle Micro Vision Sensors",
				link: "/research/wide-angle-micro-vision-sensors/"
			},
			{
				text: "Low-Power Structured Light",
				link: "/research/low-power-structured-light/"
			},
			{
				text: "Editing Stereoscopic content",
				link: "/research/editing-stereoscopic-content/"
			},
			{
				text: "Privacy Preserving Computational Cameras",
				link: "/research/privacy-preserving-computational-cameras/"
			},
			{
				text: "FoveaSPAD: Exploiting Depth Priors for Adaptive and Efficient Single-Photon 3D Imaging",
				link: "/research/foveaspad-exploiting-depth-priors-for-adaptive-and-efficient-single-photon-3d-imaging/"
			}
		]
	}
];

export default sidebar;
