import type { Plugin } from "vite";

const TARGET = "/src/news/index.md";
const YEAR_RE = /^##\s+(\d{4})\s*$/;
const ITEM_RE = /^@(\d{2}\/\d{2})\s*$/;

export default function newsMarkdown(): Plugin {
  return {
    name: "focus-lab:news-markdown",
    enforce: "pre",
    transform(code, id) {
      const [filename] = id.split("?");
      if (!filename.replace(/\\/g, "/").endsWith(TARGET)) return;

      const lines = code.split("\n");
      const out: string[] = [];
      let inYear = false;
      let inItem = false;

      const trimTrailingBlanks = () => {
        while (out.length && out[out.length - 1].trim() === "") out.pop();
      };

      const closeItem = () => {
        if (!inItem) return;
        trimTrailingBlanks();
        out.push("");
        out.push("</Item>");
        inItem = false;
      };

      const closeYear = () => {
        if (!inYear) return;
        closeItem();
        trimTrailingBlanks();
        out.push("");
        out.push("</Year>");
        out.push("");
        inYear = false;
      };

      for (const line of lines) {
        const yearMatch = line.match(YEAR_RE);
        const itemMatch = yearMatch ? null : line.match(ITEM_RE);

        if (yearMatch) {
          closeYear();
          out.push(line);
          out.push("");
          out.push("<Year>");
          out.push("");
          inYear = true;
        } else if (itemMatch) {
          closeItem();
          out.push(`<Item date="${itemMatch[1]}">`);
          out.push("");
          inItem = true;
        } else {
          out.push(line);
        }
      }
      closeYear();

      return { code: out.join("\n"), map: null };
    },
  };
}
