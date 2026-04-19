import { defineConfig } from "vitepress";

export default defineConfig({
  srcDir: "src",
  title: "FOCUS Lab",
  description: "The Florida Optics and Computational Sensor Lab",
  cleanUrls: true,
  markdown: {
    math: true,
  },
  themeConfig: {
    logo: "/home/focus.png",
    nav: [
      { text: "Research", link: "/research/" },
      { text: "Publications", link: "/publications/" },
      { text: "Team", link: "/team/" },
      { text: "Teaching", link: "/teaching/" },
      { text: "Funding", link: "/funding/" },
      { text: "Facilities", link: "/facilities/" },
      { text: "News", link: "/news/" },
      { text: "Contact", link: "/contact/" },
    ],
    outline: false,
    socialLinks: [{ icon: "github", link: "https://github.com/uf-focus-lab/" }],
  },
});
