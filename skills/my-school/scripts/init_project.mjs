#!/usr/bin/env node
// My School init: scaffolds a new learning-site project.
// Usage: node init_project.mjs <projectDir> [--id my-subject] [--name "Site name"] [--example baseline]
//   Copies the engine, build and check scripts, and starter templates into <projectDir>.
//   With --example baseline it copies the complete design-school pack instead of blank templates (useful to study or rebuild).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const skill = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const dir = args.find(a => !a.startsWith("--"));
const opt = k => { const i = args.indexOf("--" + k); return i >= 0 ? args[i + 1] : null; };
if (!dir) { console.log("Usage: node init_project.mjs <projectDir> [--id my-subject] [--name \"Site name\"] [--example baseline]"); process.exit(1); }
const root = path.resolve(dir);
const cp = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); };
const cpDir = (from, to) => { if (!fs.existsSync(from)) return; for (const f of fs.readdirSync(from)) { const s = path.join(from, f), d = path.join(to, f); if (fs.statSync(s).isDirectory()) cpDir(s, d); else cp(s, d); } };

fs.mkdirSync(root, { recursive: true });
cpDir(path.join(skill, "assets/engine"), path.join(root, "engine"));
cp(path.join(skill, "scripts/build.mjs"), path.join(root, "build.mjs"));
cp(path.join(skill, "scripts/check.mjs"), path.join(root, "check.mjs"));
for (const d of ["content/lessons", "content/notes", "content/glossary", "content/media", "labs", "figures", "lib", "spec", "dist"]) fs.mkdirSync(path.join(root, d), { recursive: true });

const example = opt("example");
if (example) {
  const ex = path.join(skill, "assets/examples", example);
  if (!fs.existsSync(ex)) { console.log("No example called " + example); process.exit(1); }
  cpDir(ex, root);
  console.log(`Copied the ${example} example into ${root}`);
} else {
  const t = path.join(skill, "assets/templates");
  const id = (opt("id") || path.basename(root)).toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  const name = opt("name") || "Untitled school";
  const fill = s => s.replace(/__ID__/g, id).replace(/__NAME__/g, name);
  const put = (src, dst) => { const to = path.join(root, dst); if (fs.existsSync(to)) { console.log("kept existing " + dst); return; } fs.mkdirSync(path.dirname(to), { recursive: true }); fs.writeFileSync(to, fill(fs.readFileSync(path.join(t, src), "utf8"))); };
  put("site.config.js", "site.config.js");
  put("theme.css", "theme.css");
  put("signature.js", "signature.js");
  put("BRIEF.md", "spec/BRIEF.md");
  put("lesson.example.js", "spec/lesson.example.js");
  put("lab.example.js", "spec/lab.example.js");
  put("figure.example.js", "spec/figure.example.js");
}
console.log(`Project ready at ${root}
Next: fill site.config.js, theme.css and spec/BRIEF.md, write content/, labs/ and figures/, then:
  node "${path.join(root, "build.mjs")}"
  node "${path.join(root, "check.mjs")}" --caps --shots`);
