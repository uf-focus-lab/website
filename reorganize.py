#!/usr/bin/env python3
"""Reorganize flattened markdown content into website-like nested folders.

Expected source layout (flattened):
- src.raw/<slug>.md
- src.raw/<slug>/...assets...

Output layout (nested):
- src/index.md                       (from home.md)
- src/<section>/index.md            (top-level section pages)
- src/research/<slug>/index.md      (research project pages)

Asset placement:
- home assets -> src/home/* (keeps existing home/* refs)
- other pages -> alongside page index.md folder
  e.g. src/contact/index.md + src/contact/*
"""

from __future__ import annotations

import argparse
import re
import shutil
from dataclasses import dataclass
from pathlib import Path

TOP_LEVEL_SECTIONS = {
    "research",
    "publications",
    "facilities",
    "news",
    "team",
    "teaching",
    "funding",
    "contact",
}


@dataclass(frozen=True)
class PagePlan:
    slug: str
    source_md: Path
    dest_md: Path
    source_assets_dir: Path
    dest_assets_dir: Path
    section: str


def classify_slug(slug: str) -> str:
    if slug == "home":
        return "root"
    if slug in TOP_LEVEL_SECTIONS:
        return "top-level"
    return "research-child"


def destination_markdown(slug: str, dest_root: Path) -> Path:
    kind = classify_slug(slug)
    if kind == "root":
        return dest_root / "index.md"
    if kind == "top-level":
        return dest_root / slug / "index.md"
    return dest_root / "research" / slug / "index.md"


def destination_assets_dir(slug: str, dest_md: Path, dest_root: Path) -> Path:
    # Keep home assets under src/home to preserve existing home/* refs.
    if slug == "home":
        return dest_root / "home"
    # Other pages keep assets in the same folder as index.md.
    return dest_md.parent


def rewrite_local_asset_refs(markdown_text: str, slug: str) -> str:
    """Rewrite local refs from slug/file.ext -> file.ext when needed.

    home.md keeps refs like home/file.ext because home assets stay in src/home.
    Other pages move to folder index.md + sibling assets, so we strip slug/ prefix.
    """
    if slug == "home":
        return markdown_text

    prefix = re.escape(slug) + "/"
    text = markdown_text

    # Markdown links/images: ](slug/file.ext) -> ](file.ext)
    text = re.sub(rf"(\]\()({prefix})", r"\1", text)

    # HTML attribute refs: src="slug/file.ext" -> src="file.ext"
    text = re.sub(rf"((?:src|href)=['\"])({prefix})", r"\1", text, flags=re.IGNORECASE)

    return text


def gather_page_plans(source_root: Path, dest_root: Path) -> list[PagePlan]:
    markdown_files = sorted(source_root.glob("*.md"))
    plans: list[PagePlan] = []

    for md_file in markdown_files:
        slug = md_file.stem
        dest_md = destination_markdown(slug, dest_root)
        source_assets_dir = source_root / slug
        dest_assets_dir = destination_assets_dir(slug, dest_md, dest_root)
        plans.append(
            PagePlan(
                slug=slug,
                source_md=md_file,
                dest_md=dest_md,
                source_assets_dir=source_assets_dir,
                dest_assets_dir=dest_assets_dir,
                section=classify_slug(slug),
            )
        )

    return plans


def list_asset_files(asset_dir: Path) -> list[Path]:
    if not asset_dir.exists() or not asset_dir.is_dir():
        return []
    return sorted(p for p in asset_dir.rglob("*") if p.is_file())


def apply_plan(plan: PagePlan, dry_run: bool) -> tuple[int, bool]:
    original = plan.source_md.read_text(encoding="utf-8")
    rewritten = rewrite_local_asset_refs(original, plan.slug)

    if not dry_run:
        plan.dest_md.parent.mkdir(parents=True, exist_ok=True)
        plan.dest_md.write_text(rewritten, encoding="utf-8")

    asset_files = list_asset_files(plan.source_assets_dir)
    if asset_files and not dry_run:
        plan.dest_assets_dir.mkdir(parents=True, exist_ok=True)
        for src_file in asset_files:
            rel = src_file.relative_to(plan.source_assets_dir)
            dst_file = plan.dest_assets_dir / rel
            dst_file.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src_file, dst_file)

    return len(asset_files), rewritten != original


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Reorganize flattened src.raw content into nested src structure."
    )
    parser.add_argument("--source", default="src.raw", help="Flattened source folder")
    parser.add_argument("--dest", default="src", help="Destination folder")
    parser.add_argument(
        "--dry-run", action="store_true", help="Show plan without writing files"
    )
    parser.add_argument(
        "--no-clean",
        action="store_true",
        help="Do not delete destination before writing",
    )
    args = parser.parse_args()

    source_root = Path(args.source)
    dest_root = Path(args.dest)

    if not source_root.exists() or not source_root.is_dir():
        raise SystemExit(f"Source folder not found: {source_root}")

    plans = gather_page_plans(source_root, dest_root)
    if not plans:
        raise SystemExit(f"No markdown files found under: {source_root}")

    if not args.dry_run and dest_root.exists() and not args.no_clean:
        shutil.rmtree(dest_root)

    asset_count = 0
    changed_ref_pages = 0
    section_counts = {"root": 0, "top-level": 0, "research-child": 0}

    for plan in plans:
        section_counts[plan.section] += 1
        copied_assets, refs_changed = apply_plan(plan, dry_run=args.dry_run)
        asset_count += copied_assets
        changed_ref_pages += int(refs_changed)

    mode = "DRY RUN" if args.dry_run else "WRITE"
    print(f"Mode: {mode}")
    print(f"Source: {source_root}")
    print(f"Destination: {dest_root}")
    print(f"Pages planned: {len(plans)}")
    print(f"Root pages: {section_counts['root']}")
    print(f"Top-level section pages: {section_counts['top-level']}")
    print(f"Research child pages: {section_counts['research-child']}")
    print(f"Asset files planned: {asset_count}")
    print(f"Pages with rewritten local refs: {changed_ref_pages}")


if __name__ == "__main__":
    main()
