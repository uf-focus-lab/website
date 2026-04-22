import type { EnhanceAppContext } from "vitepress";
import theme from "vitepress/theme";
import "./custom.css";
import Layout from "./Layout.vue";
import LatexmlEmbed from "./components/LatexmlEmbed.vue";
import Youtube from "./components/Youtube.vue";

export default {
  ...theme,
  Layout,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component("LatexmlEmbed", LatexmlEmbed);
    app.component("Youtube", Youtube);
  },
};
