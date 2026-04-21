import { defineConfig } from "vitepress";
import newsMarkdown from "./plugins/news";
import colocatedAssets from "./plugins/colocated-assets";

export default defineConfig({
  srcDir: "src",
  title: "FOCUS Lab",
  description: "The Florida Optics and Computational Sensor Lab",
  cleanUrls: true,
  markdown: {
    math: true,
  },
  // Office document extensions aren't in VitePress's built-in known-extensions
  // list, so its dead-link checker treats [text](./slides.pptx) as a page link.
  // The colocated-assets plugin emits the file to dist/, so skip the check.
  ignoreDeadLinks: [/\.(pptx?|docx?|xlsx?)(?:[?#].*)?$/i],
  vite: {
    plugins: [newsMarkdown(), colocatedAssets()],
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
