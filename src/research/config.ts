import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { type DefaultTheme, defineAdditionalConfig } from "vitepress";

const here = dirname(fileURLToPath(import.meta.url));

function readTitle(indexPath: string, fallback: string): string {
  const src = readFileSync(indexPath, "utf8");
  const body = src.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, "");
  const heading = body.match(/^#{1,6}\s+(.+?)\s*$/m);
  return heading ? heading[1] : fallback;
}

function listDirs(dir: string): string[] {
  return readdirSync(dir).filter((name) =>
    statSync(join(dir, name)).isDirectory(),
  );
}

const years = listDirs(here)
  .filter((name) => /^\d{4}$/.test(name))
  .sort((a, b) => Number(b) - Number(a));

function gatherYear(year: string) {
  const yearDir = join(here, year);
  const items = listDirs(yearDir)
    .map((slug) => ({
      slug,
      title: readTitle(join(yearDir, slug, "index.md"), slug),
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(({ slug, title }) => ({
      text: title,
      link: `/research/${year}/${slug}/`,
    }));
  return {
    text: year,
    items,
  };
}

export default defineAdditionalConfig({
  themeConfig: {
    sidebar: [
      {
        text: "Featured Projects",
        link: "/research/",
        items: [],
      },
      ...years.map(gatherYear).filter(({ items }) => items.length > 0),
    ],
  },
});
