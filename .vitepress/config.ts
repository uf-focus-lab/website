import { defineConfig } from "vitepress";
import newsMarkdown from "./plugins/news";

export default defineConfig({
  srcDir: "src",
  title: "FOCUS Lab",
  description: "The Florida Optics and Computational Sensor Lab",
  cleanUrls: true,
  markdown: {
    math: true,
  },
  vite: {
    plugins: [newsMarkdown()],
  },
  themeConfig: {
    logo: "/home/focus.png",
    nav: [
      { text: "News", link: "/news/" },
      { text: "Research", link: "/research/", activeMatch: "^/research(/|$)" },
      { text: "Publications", link: "/publications/" },
      { text: "Team", link: "/team/" },
      { text: "About", link: "/about/" },
    ],
    outline: false,
    socialLinks: [{ icon: "github", link: "https://github.com/uf-focus-lab/" }],
  },
});
