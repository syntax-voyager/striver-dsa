#!/usr/bin/env node
/**
 * Build a JSON index consumed by the Next.js app.
 */
import { promises as fs } from "fs";
import path from "path";

const ROOT = path.resolve(process.cwd(), ".");
const DSA_DIR = path.join(ROOT, "dsa");
const OUTPUT_DIR = path.join(process.cwd(), "data");
const INDEX_FILE = path.join(OUTPUT_DIR, "dsa-index.json");

async function ensureOutput() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

function isCodeFile(file) {
  return /(\.c(pp)?|\.h(pp)?|\.txt)$/i.test(file);
}

async function readFileEntry(fullPath, relPath) {
  try {
    const content = await fs.readFile(fullPath, "utf8");
    return { path: relPath, name: path.basename(relPath), content };
  } catch {
    return null;
  }
}

async function buildIndex() {
  const entries = [];
  async function walk(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    for (const d of dirents) {
      // skip node_modules or build artifacts just in case
      if (d.name === "node_modules" || d.name.startsWith(".")) continue;
      const full = path.join(dir, d.name);
      const rel = path.relative(DSA_DIR, full);
      if (d.isDirectory()) {
        await walk(full);
      } else if (isCodeFile(d.name)) {
        const entry = await readFileEntry(full, rel);
        if (entry) entries.push(entry);
      }
    }
  }
  await walk(DSA_DIR);
  const tree = buildTree(entries.map((e) => e.path));
  const index = { generatedAt: new Date().toISOString(), files: entries, tree };
  await ensureOutput();
  await fs.writeFile(INDEX_FILE, JSON.stringify(index, null, 2));
  console.log(`[dsa-watch] Index updated: ${entries.length} files.`);
}

function buildTree(paths) {
  // Build nested folder tree for navigation
  const root = { name: "", type: "folder", children: {} };
  for (const p of paths) {
    const parts = p.split(path.sep);
    let node = root;
    parts.forEach((part, idx) => {
      if (idx === parts.length - 1) {
        node.children[part] = { name: part, type: "file", path: p };
      } else {
        node.children[part] = node.children[part] || {
          name: part,
          type: "folder",
          children: {},
        };
        node = node.children[part];
      }
    });
  }
  return root;
}

(async () => {
  console.log("[dsa-watch] Building initial index...");
  await buildIndex();
  console.log("[dsa-watch] Initial index built.");
})();
