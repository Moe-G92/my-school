#!/usr/bin/env node
// My School build: bundles a project into one self-contained HTML page and validates its content.
// Usage: node build.mjs [projectDir]   (defaults to the folder this script sits in)
// Bundle order: engine core, site.config.js, lib/*.js (shared helpers), signature.js, content, figures, labs, pages, boot.
// Output: dist/index.html (publish this) and dist/preview.html (same page wrapped in a full document for local testing).
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(process.argv[2] || here);
const P = (...p) => path.join(root, ...p);
const rd = p => fs.readFileSync(P(p), "utf8");
const has = p => fs.existsSync(P(p));
const ls = (dir, re) => has(dir) ? fs.readdirSync(P(dir)).filter(f => re.test(f)).sort().map(f => path.join(dir, f)) : [];

const problems = [], warnings = [];
const engine = ["core.js", "svg.js", "ui.js", "exercises.js"].map(f => "engine/" + f);
for (const f of [...engine, "engine/pages.js", "engine/boot.js", "engine/base.css", "site.config.js"]) if (!has(f)) problems.push(`missing ${f}`);
if (problems.length) { console.log("PROBLEMS:\n  " + problems.join("\n  ")); process.exit(1); }

/* ---------- read the site config ---------- */
let SITE = null;
try { const ctx = vm.createContext({ console }); vm.runInContext(rd("site.config.js") + "\n;this.__SITE = typeof SITE !== 'undefined' ? SITE : null;", ctx, { filename: "site.config.js" }); SITE = ctx.__SITE; }
catch (e) { problems.push(`site.config.js does not run on its own (${e.message}). Keep it to data and functions; call engine helpers only inside functions.`); }
if (!SITE) problems.push("site.config.js must define const SITE = {...}");
SITE = SITE || {};
for (const k of ["id", "name", "subject", "parts"]) if (!SITE[k]) problems.push(`SITE.${k} is missing`);
if (SITE.id && !/^[a-z0-9-]+$/.test(SITE.id)) problems.push("SITE.id must be lowercase letters, digits and hyphens");

/* ---------- content ---------- */
const lessonFiles = ls("content/lessons", /\.js$/);
const noteFiles = ls("content/notes", /\.js$/);
const glossFiles = [...ls("content", /^glossary.*\.js$/), ...ls("content/glossary", /\.js$/)];
const mediaFiles = ls("content/media", /\.json$/);
const labFiles = ls("labs", /\.js$/);
const libFiles = ls("lib", /\.js$/);
const figFiles = ls("figures", /\.js$/);

const C = { lessons: [], notes: [], glossary: [] };
const cctx = vm.createContext({ L: o => C.lessons.push(o), F: o => C.notes.push(o), G: a => C.glossary.push(...a) });
for (const f of [...lessonFiles, ...noteFiles, ...glossFiles]) { try { vm.runInContext(rd(f), cctx, { filename: f }); } catch (e) { problems.push(`${f}: does not parse (${e.message})`); } }
const media = {};
for (const f of mediaFiles) {
  try { const j = JSON.parse(rd(f)); const base = path.basename(f, ".json"); if (base.startsWith("_")) continue; media[j.lesson || base] = { videos: j.videos || [], podcasts: j.podcasts || [], reads: j.reads || [] }; }
  catch (e) { problems.push(`${f}: bad JSON (${e.message})`); }
}
let library = [];
if (has("content/library.json")) { try { const j = JSON.parse(rd("content/library.json")); library = Array.isArray(j) ? j : j.sections || []; } catch (e) { problems.push(`content/library.json: bad JSON (${e.message})`); } }

/* ---------- validate ---------- */
const srcAll = [...libFiles, ...labFiles, ...figFiles, ...(has("signature.js") ? ["signature.js"] : [])].map(rd).join("\n");
const labIds = new Set([...srcAll.matchAll(/LAB\(\s*["'](lab-[a-z0-9-]+)["']/g)].map(m => m[1]));
const figIds = new Set([...srcAll.matchAll(/FIG\(\s*["'](fig-[a-z0-9-]+)["']/g)].map(m => m[1]));
const glossIds = new Set(); C.glossary.forEach(g => { if (glossIds.has(g.id)) warnings.push(`glossary: duplicate id ${g.id}`); glossIds.add(g.id); });
const lessonIds = new Set(C.lessons.map(l => l.id));
const partNums = new Set((SITE.parts || []).map((p, i) => Array.isArray(p) ? p[0] : (p.n || i + 1)));
const ns = new Set(), ids = new Set();
for (const l of C.lessons) {
  const at = `lesson ${l.id}`;
  for (const k of ["id", "part", "n", "title", "short", "minutes", "body", "takeaways", "check", "practice", "journal"]) if (l[k] === undefined) problems.push(`${at}: missing ${k}`);
  if (ids.has(l.id)) problems.push(`${at}: duplicate id`); ids.add(l.id);
  if (ns.has(l.n)) problems.push(`${at}: duplicate number ${l.n}`); ns.add(l.n);
  if (!partNums.has(l.part)) problems.push(`${at}: part ${l.part} is not in SITE.parts`);
  if (!/^[a-z0-9-]+$/.test(l.id || "")) problems.push(`${at}: id must be lowercase-kebab`);
  (String(l.body).match(/\[\[fig:([a-z0-9-]+)\]\]/g) || []).forEach(m => { const id = m.slice(6, -2); if (!figIds.has(id)) problems.push(`${at}: unknown figure ${id}`); });
  (l.check || []).forEach((q, i) => { if (!(q.answer >= 0 && q.answer < (q.options || []).length)) problems.push(`${at}: check ${i} answer out of range`); });
  (l.practice || []).forEach((p, i) => {
    if (typeof p === "string") { if (!labIds.has(p)) problems.push(`${at}: unknown lab ${p}`); return; }
    if (!["choice", "sort", "order", "rewrite"].includes(p.type)) problems.push(`${at}: practice ${i} unknown type ${p.type}`);
    if (p.type === "choice") (p.items || []).forEach((it, j) => { if (!(it.answer >= 0 && it.answer < it.options.length)) problems.push(`${at}: practice ${i} item ${j} answer out of range`); });
    if (p.type === "sort") (p.items || []).forEach((it, j) => { if (!(it.bucket >= 0 && it.bucket < p.buckets.length)) problems.push(`${at}: practice ${i} item ${j} bucket out of range`); });
    if (p.type === "rewrite" && !(p.rubric && p.rubric.length)) problems.push(`${at}: practice ${i} rewrite has no rubric`);
  });
  if (!(l.practice || []).length) warnings.push(`${at}: no practice items`);
  (l.terms || []).forEach(t => { if (!glossIds.has(t)) warnings.push(`${at}: term ${t} not in glossary`); });
  if (/—/.test(JSON.stringify(l))) warnings.push(`${at}: contains an em dash`);
  if (!media[l.id]) warnings.push(`${at}: no media yet`);
}
C.glossary.forEach(g => { if (g.lesson && !lessonIds.has(g.lesson)) warnings.push(`glossary ${g.id}: unknown lesson ${g.lesson}`); (g.see || []).forEach(s => { if (!glossIds.has(s)) warnings.push(`glossary ${g.id}: see-also ${s} not defined`); }); });
C.notes.forEach(n => (n.related || []).forEach(r => { if (!lessonIds.has(r)) warnings.push(`note ${n.id}: unknown related lesson ${r}`); }));
for (const m of srcAll.matchAll(/LAB\(\s*["'](lab-[a-z0-9-]+)["'][\s\S]{0,400}?lesson:\s*["']([a-z0-9-]+)["']/g)) if (!lessonIds.has(m[2])) warnings.push(`lab ${m[1]}: lesson ${m[2]} does not exist`);
const usedLabs = new Set(C.lessons.flatMap(l => (l.practice || []).filter(p => typeof p === "string")));
[...labIds].filter(id => !usedLabs.has(id)).forEach(id => warnings.push(`lab ${id} is not used by any lesson (still listed under Practice)`));

/* ---------- bundle ---------- */
const safe = s => s.replace(/<\/script/gi, "<\\/script").replace(/<!--/g, "<\\!--");
const js = [
  ...engine.map(rd),
  rd("site.config.js"),
  ...libFiles.map(rd),
  ...(has("signature.js") ? [rd("signature.js")] : []),
  ...lessonFiles.map(rd), ...noteFiles.map(rd), ...glossFiles.map(rd),
  `CONTENT.media = ${JSON.stringify(media)};`, `CONTENT.library = ${JSON.stringify(library)};`,
  ...figFiles.map(rd), ...labFiles.map(rd),
  rd("engine/pages.js"), rd("engine/boot.js"),
].join("\n;\n");
try { new vm.Script(js, { filename: "bundle.js" }); } catch (e) { problems.push("bundle: syntax error " + e.message); }
const fonts = [].concat(SITE.fonts || []);
const escA = s => String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const html = `<title>${escA(SITE.title || SITE.name)}</title>
<meta name="description" content="${escA(SITE.description || SITE.tagline || "")}">
${fonts.length ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n${fonts.map(f => `<link rel="stylesheet" href="${escA(f)}">`).join("\n")}` : ""}
<style>
${rd("engine/base.css")}
${has("theme.css") ? rd("theme.css") : ""}
</style>
<noscript><p style="padding:24px">This site needs JavaScript to run.</p></noscript>
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.2/marked.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.1.6/purify.min.js"></script>
<script>
${safe(js)}
</script>
`;
fs.mkdirSync(P("dist"), { recursive: true });
fs.writeFileSync(P("dist/index.html"), html);
fs.writeFileSync(P("dist/preview.html"), `<!doctype html><html lang="${escA((SITE.lang || "en").split("-")[0])}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>${html}</body></html>`);

console.log(`${SITE.name || "?"}: lessons ${C.lessons.length}, notes ${C.notes.length}, glossary ${C.glossary.length}, media ${Object.keys(media).length}/${C.lessons.length}, labs ${labIds.size}, figures ${figIds.size}, library sections ${library.length}`);
console.log(`dist/index.html ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`);
if (warnings.length) console.log("WARNINGS (" + warnings.length + "):\n  " + warnings.slice(0, 80).join("\n  ") + (warnings.length > 80 ? "\n  …" : ""));
if (problems.length) { console.log("PROBLEMS (" + problems.length + "):\n  " + problems.join("\n  ")); process.exitCode = 1; }
else console.log("OK");
