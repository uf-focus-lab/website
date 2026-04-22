import type { Author, Publication } from "./types";

function nameOf(a: Author): string {
  return typeof a === "string" ? a : a.name;
}

function makeKey(p: Publication): string {
  if (p.key) return p.key;
  const first = p.authors?.[0];
  const lastName = first
    ? (nameOf(first).split(/\s+/).pop() ?? "ref")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
    : "ref";
  const year = p.year ?? "";
  const slug =
    p.title
      .split(/\s+/)
      .find((w) => w.length > 3)
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, "") ?? "";
  return `${lastName}${year}${slug}`;
}

// BibTeX braces must be balanced inside values; strip bare ones from display strings.
const clean = (v: string | number) => String(v).replace(/[{}]/g, "");

export function toBibtex(p: Publication): string {
  const type = p.type ?? "misc";
  const key = makeKey(p);

  const fields: Array<[string, string | undefined]> = [
    ["author", p.authors?.map(nameOf).join(" and ")],
    ["title", p.title],
    ["journal", p.journal],
    [
      "booktitle",
      p.booktitle ?? (type === "inproceedings" ? p.venue : undefined),
    ],
    ["year", p.year?.toString()],
    ["month", p.month?.toString()],
    ["volume", p.volume?.toString()],
    ["number", p.number?.toString()],
    ["pages", p.pages],
    ["publisher", p.publisher],
    ["organization", p.organization],
    ["institution", p.institution],
    ["school", p.school],
    ["address", p.address],
    ["series", p.series],
    ["edition", p.edition],
    ["chapter", p.chapter],
    ["editor", p.editor?.map(nameOf).join(" and ")],
    ["howpublished", p.howpublished ?? (type === "misc" ? p.venue : undefined)],
    ["note", p.note],
    ["doi", p.doi],
    ["url", p.url ?? p.link],
    ["eprint", p.eprint],
    ["archivePrefix", p.archivePrefix],
    ["primaryClass", p.primaryClass],
  ];

  const lines = [`@${type}{${key},`];
  for (const [k, v] of fields) {
    if (v == null || v === "") continue;
    lines.push(`  ${k} = {${clean(v)}},`);
  }
  lines.push("}");
  return lines.join("\n");
}
