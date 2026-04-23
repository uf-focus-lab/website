import type { Plugin } from "vite";
import { readFile } from "node:fs/promises";
import { existsSync, statSync, createReadStream } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Emit asset files that are referenced from markdown via plain `[text](./foo.pdf)`
// links but are not pulled in by Vite's normal pipelines (image markdown,
// imports, etc.). During build the referenced file is copied to dist/
// mirroring its path under src/; during dev a middleware serves it directly
// from src/ so co-located assets work without going through src/public/.

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "../../src");

// Extensions already handled by VitePress/Vite's normal pipelines — ignore.
const IGNORE_EXT = new Set([
  ".md",
  ".vue",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".html",
  ".css",
  ".scss",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".avif",
  ".ico",
]);

const LINK_RE = /\]\(([^)\s]+?\.[a-z0-9]+)(?:\s+"[^"]*")?\)/gi;

function isLocalHref(href: string) {
  return (
    !/^[a-z][a-z0-9+.-]*:/i.test(href) &&
    !href.startsWith("//") &&
    !href.startsWith("/") &&
    !href.startsWith("#")
  );
}

function withinSrc(p: string) {
  const s = SRC.endsWith("/") ? SRC : SRC + "/";
  return (p + "/").startsWith(s);
}

export default function colocatedAssets(): Plugin {
  let isBuild = false;
  return {
    name: "colocated-assets",
    // Run before VitePress's main plugin rewrites .md → Vue SFC; after that
    // rewrite the LINK_RE regex has no markdown link syntax left to match.
    enforce: "pre",
    configResolved(config) {
      isBuild = config.command === "build";
    },
    async transform(code, id) {
      if (!isBuild) return;
      const [filename] = id.split("?");
      if (!filename.endsWith(".md")) return;
      if (!withinSrc(filename)) return;
      const mdDir = dirname(filename);
      const seen = new Set<string>();
      for (const m of code.matchAll(LINK_RE)) {
        const href = m[1];
        if (!isLocalHref(href)) continue;
        const ext = extname(href).toLowerCase();
        if (!ext || IGNORE_EXT.has(ext)) continue;
        const abs = resolve(mdDir, decodeURI(href));
        if (!withinSrc(abs) || seen.has(abs)) continue;
        if (!existsSync(abs) || !statSync(abs).isFile()) continue;
        seen.add(abs);
        const fileName = relative(SRC, abs);
        this.emitFile({
          type: "asset",
          fileName,
          source: await readFile(abs),
        });
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        if (!url) return next();
        const ext = extname(url).toLowerCase();
        if (!ext || IGNORE_EXT.has(ext)) return next();
        const abs = join(SRC, decodeURIComponent(url));
        if (!withinSrc(abs)) return next();
        if (!existsSync(abs) || !statSync(abs).isFile()) return next();
        res.setHeader("cache-control", "no-cache");
        createReadStream(abs).pipe(res);
      });
    },
  };
}
