import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Sorgente articoli: file markdown in content/blog/*.md. Ogni articolo settimanale
// generato da PowerSEO arriva come file in una PR (revisione umana prima del merge).
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  readingTime: number; // minuti
};
export type Post = PostMeta & { html: string };

// parser frontmatter minimale (key: value tra --- ---), zero dipendenze
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    data[key] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { data, body: m[2] };
}

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPost(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    keyword: data.keyword ?? "",
    date: data.date ?? "",
    author: data.author ?? "PowerAgency",
    readingTime: Math.max(1, Math.round(words / 200)),
    html: marked.parse(body, { async: false }) as string,
  };
}

export function getAllPostsMeta(): PostMeta[] {
  return readSlugs()
    .map((slug) => getPost(slug))
    .filter((p): p is Post => p !== null)
    .map(({ html: _html, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // più recenti prima
}
