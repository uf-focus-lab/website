import type { StyleValue } from "vue";

export type Author =
  | string
  | { name: string; link?: string; style?: StyleValue };

export type PublicationType =
  | "article"
  | "inproceedings"
  | "incollection"
  | "book"
  | "misc"
  | "techreport"
  | "phdthesis"
  | "mastersthesis"
  | "unpublished";

export interface Publication {
  // Display fields consumed by Publication.vue.
  title: string;
  authors?: Author[];
  venue?: string;
  link?: string;
  links?: Record<string, string>;

  // BibTeX metadata. All optional so legacy entries keep working; a renderer
  // that emits .bib can demand whichever subset is valid for `type`.
  key?: string;
  type?: PublicationType;
  year?: number;
  month?: number | string;

  journal?: string;
  booktitle?: string;
  series?: string;
  volume?: string | number;
  number?: string | number;
  pages?: string;
  edition?: string;
  chapter?: string;

  publisher?: string;
  organization?: string;
  institution?: string;
  school?: string;
  address?: string;

  editor?: Author[];
  howpublished?: string;
  note?: string;

  doi?: string;
  url?: string;
  eprint?: string;
  archivePrefix?: string;
  primaryClass?: string;
}
