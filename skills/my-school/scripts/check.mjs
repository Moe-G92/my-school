#!/usr/bin/env node
// My School check: verifies a built project in headless Chrome.
// Usage: node check.mjs [projectDir] [--shots] [--caps] [--only=sweep,overflow,contrast]
//   sweep     every route renders with no script errors; labs mount and survive a round of slider, select,
//             checkbox and button pokes; lessons have practice. (It does not judge whether a lab's answers are right:
//             play each lab yourself once.)
//   overflow  no page scrolls sideways at 390px wide
//   contrast  text/background token pairs meet WCAG AA in light and dark
//   --caps    simulates the Claude host (db, user, sample) and drives saving, coach, writing feedback and review
//   --shots   screenshots key pages (light/dark, desktop/phone) and writes contact sheets to dist/_check/
// Needs Playwright. It looks for it in this order: PLAYWRIGHT_PATH env (path to playwright's index.js), local node_modules, global npm root.
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import os from "node:os";
import { execSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const root = path.resolve(args.find(a => !a.startsWith("--")) || here);
const flag = f => args.includes("--" + f);
const only = (args.find(a => a.startsWith("--only=")) || "").slice(7).split(",").filter(Boolean);
const want = k => !only.length || only.includes(k);
const dist = path.join(root, "dist");
if (!fs.existsSync(path.join(dist, "preview.html"))) { console.log("Run build.mjs first: dist/preview.html is missing."); process.exit(1); }

function loadPlaywright() {
  const req = createRequire(path.join(root, "noop.js"));
  const tries = [process.env.PLAYWRIGHT_PATH, "playwright", "playwright-core"];
  try { const g = execSync("npm root -g", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); tries.push(path.join(g, "playwright"), path.join(g, "playwright-core")); } catch (e) { /* no npm */ }
  for (const t of tries.filter(Boolean)) { try { return req(t); } catch (e) { /* next */ } }
  return null;
}
const pw = loadPlaywright();
if (!pw) {
  console.log(`Playwright not found. Install it once in any folder, then point to it:
  npm i playwright && npx playwright install chromium
  PLAYWRIGHT_PATH=/that/folder/node_modules/playwright/index.js node check.mjs
Or verify by hand in a browser: open dist/preview.html, visit every lesson and lab, check the console, try a 390px-wide window and both colour schemes.`);
  process.exit(2);
}

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".json": "application/json" };
const server = http.createServer((req, res) => { const f = path.join(dist, decodeURIComponent(req.url.split("?")[0])); if (!f.startsWith(dist) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
await new Promise(r => server.listen(0, "127.0.0.1", r));
const URL0 = `http://127.0.0.1:${server.address().port}/preview.html`;

let browser;
try { browser = await pw.chromium.launch({ channel: "chrome", headless: true }); } catch (e) { browser = await pw.chromium.launch({ headless: true }); }
const report = { errors: [], warnings: [] };
const newPage = async (opts = {}) => {
  const ctx = await browser.newContext({ viewport: { width: opts.w || 1280, height: opts.h || 900 }, colorScheme: opts.scheme || "light" });
  const page = await ctx.newPage();
  page.__errs = [];
  page.on("pageerror", e => page.__errs.push(String(e)));
  page.on("console", m => { if (m.type() === "error" && !/favicon|Failed to load resource/.test(m.text())) page.__errs.push(m.text()); });
  if (opts.init) await page.addInitScript(opts.init);
  await page.goto(URL0, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  return page;
};
const routesOf = page => page.evaluate(() => ["today", "path", "practice", "notes", "coach", "journal", "more", ...RefTabs().map(t => "ref." + t[0]), ...CONTENT.lessons.map(l => "l." + l.id), ...Object.keys(LABS).map(l => "lab." + l), ...CONTENT.notes.slice(0, 3).map(n => "n." + n.id), ...(reviewOn() ? ["coach.review"] : [])]);
const go = async (page, r, wait = 160) => { await page.evaluate(x => { location.hash = x; }, r); await page.waitForTimeout(wait); };

/* ---------- sweep ---------- */
if (want("sweep")) {
  const page = await newPage();
  const routes = await routesOf(page);
  for (const r of routes) {
    page.__errs = [];
    await go(page, r, r.startsWith("lab.") ? 260 : 180);
    const info = await page.evaluate(() => ({ main: document.querySelector("#main").innerText.length, broken: document.querySelector("#main").innerText.includes("didn't load"), benches: document.querySelectorAll(".bench").length, emptyBench: [...document.querySelectorAll(".bench-body")].filter(b => b.innerHTML.trim().length < 40).length }));
    if (page.__errs.length) report.errors.push(`${r}: ${page.__errs.slice(0, 2).join(" | ")}`);
    if (info.broken || info.main < 40) report.errors.push(`${r}: page is empty or failed to render`);
    if (r.startsWith("lab.")) {
      // poke the lab: move sliders, change selects, tick boxes, press buttons, then watch for errors
      page.__errs = [];
      const poked = await page.evaluate(async () => {
        const body = document.querySelector(".bench-body"); if (!body) return 0;
        const sleep = ms => new Promise(res => setTimeout(res, ms)); let n = 0;
        for (const x of [...body.querySelectorAll('input[type="range"]')].slice(0, 6)) { x.value = String((+x.min + +x.max) / 2); x.dispatchEvent(new Event("input", { bubbles: true })); x.dispatchEvent(new Event("change", { bubbles: true })); n++; await sleep(20); }
        for (const x of [...body.querySelectorAll("select")].slice(0, 3)) { if (x.options.length > 1) { x.selectedIndex = 1; x.dispatchEvent(new Event("change", { bubbles: true })); n++; await sleep(20); } }
        for (const x of [...body.querySelectorAll('input[type="checkbox"]')].slice(0, 6)) { x.click(); n++; await sleep(20); }
        for (const b of [...body.querySelectorAll("button")].slice(0, 16)) { if (!b.isConnected || b.disabled) continue; b.click(); n++; await sleep(40); }
        return n;
      });
      await page.waitForTimeout(400);
      if (page.__errs.length) report.errors.push(`${r}: error after interacting (${poked} controls): ${page.__errs.slice(0, 2).join(" | ")}`);
      if (await page.evaluate(() => location.hash.slice(1)) !== r) report.warnings.push(`${r}: a control inside the lab navigated away`);
    }
    if (info.emptyBench) report.errors.push(`${r}: ${info.emptyBench} exercise or lab rendered empty`);
    if (r.startsWith("l.") && info.benches < 2) report.warnings.push(`${r}: only ${info.benches} practice blocks (includes the quick check)`);
  }
  console.log(`sweep: ${routes.length} routes checked`);
  await page.context().close();
}

/* ---------- overflow at phone width ---------- */
if (want("overflow")) {
  const page = await newPage({ w: 390, h: 844 });
  const routes = await routesOf(page); let n = 0;
  for (const r of routes) {
    await go(page, r, 140);
    const over = await page.evaluate(() => { const W = document.documentElement.clientWidth; if (document.documentElement.scrollWidth <= W + 1) return null; return [...document.querySelectorAll("#main *")].filter(e => { const b = e.getBoundingClientRect(); return b.right > W + 2 && b.width > 0 && !e.closest(".figscroll, .tablewrap, [style*='overflow']"); }).slice(0, 3).map(e => e.tagName.toLowerCase() + "." + String(e.className).split(" ")[0]); });
    if (over) { n++; report.errors.push(`${r}: sideways scroll at 390px (${over.join(", ")})`); }
  }
  console.log(`overflow: ${routes.length} routes at 390px, ${n} with sideways scroll`);
  await page.context().close();
}

/* ---------- contrast of tokens, both themes ---------- */
if (want("contrast")) {
  for (const scheme of ["light", "dark"]) {
    const page = await newPage({ scheme });
    const fails = await page.evaluate(() => {
      const cs = getComputedStyle(document.documentElement);
      const parse = v => { const c = document.createElement("canvas").getContext("2d"); c.fillStyle = v.trim(); const x = c.fillStyle; if (x.startsWith("#")) return x; const m = x.match(/[\d.]+/g); return m ? "#" + m.slice(0, 3).map(n => Math.round(+n).toString(16).padStart(2, "0")).join("") : "#000000"; };
      const t = k => parse(cs.getPropertyValue("--" + k) || "#000");
      const pairs = [["ink", "paper", 4.5], ["ink-2", "paper", 4.5], ["ink-3", "paper", 4.5], ["ink-3", "surface", 4.5], ["ink-3", "sunk", 4.5], ["ink-2", "sunk", 4.5], ["accent", "paper", 4.5], ["accent", "surface", 4.5], ["accent", "accent-soft", 4.5], ["spec", "surface", 4.5], ["spec", "paper", 4.5], ["good", "good-soft", 4.5], ["bad", "bad-soft", 4.5], ["warn", "warn-soft", 4.5], ["on-ink", "ink", 4.5], ["on-ink", "ink-2", 4.5], ["surface", "spec", 4.5], ["sel", "surface", 3], ["field", "surface", 3], ["field", "paper", 3]];
      return pairs.map(([a, b, n]) => [a, b, n, Color.contrast(t(a), t(b))]).filter(x => x[3] < x[2]).map(x => `${x[0]} on ${x[1]} ${x[3].toFixed(2)}:1 (needs ${x[2]}:1)`);
    });
    fails.forEach(f => report.errors.push(`contrast ${scheme}: ${f}`));
    console.log(`contrast ${scheme}: ${fails.length ? fails.length + " failing pairs" : "all token pairs pass"}`);
    await page.context().close();
  }
}

/* ---------- simulated host capabilities ---------- */
if (flag("caps")) {
  const fake = () => {
    const store = new Map(); window.__store = store; window.__calls = [];
    const snap = p => ({ id: p.split("/").pop(), exists: store.has(p), data: () => store.get(p), metadata: { fromCache: false, hasPendingWrites: false } });
    const docRef = p => ({ id: p.split("/").pop(), path: p, get: async () => snap(p), set: async d => { store.set(p, JSON.parse(JSON.stringify(d))); }, update: async d => { store.set(p, Object.assign(store.get(p) || {}, d)); }, delete: async () => { store.delete(p); }, onSnapshot: () => () => {} });
    const query = (col, f = []) => ({ where: (a, op, v) => query(col, f.concat([[a, op, v]])), orderBy: () => query(col, f), limit: () => query(col, f), get: async () => { const docs = [...store.keys()].filter(k => k.startsWith(col + "/") && k.split("/").length === col.split("/").length + 1).map(snap).filter(s => f.every(([a, op, v]) => op !== "==" || s.data()[a] === v)); return { docs, size: docs.length, empty: !docs.length, docChanges: () => [] }; } });
    const db = { doc: docRef, collection: p => Object.assign(query(p), { path: p, doc: id => docRef(p + "/" + (id || Math.random().toString(36).slice(2))) }) };
    const user = { id: async () => "u_test", isOwner: async () => true, canEdit: async () => true, can: async () => true, me: async () => ({ id: "u_test", name: "Test" }) };
    const sample = async (input, o = {}) => { window.__calls.push({ images: !!o.images, n: Array.isArray(input) ? input.length : 1 }); const text = "**Lead with the main point.** See the course for more.\n\n- First fix\n- Second fix\n\n<img src=x onerror=alert(1)>"; await new Promise(r => setTimeout(r, 150)); o.onText && o.onText({ text, delta: text }); return { text, truncated: false, modelTierApplied: "default" }; };
    sample.json = async (input) => { window.__calls.push({ json: true }); const n = +((String(input).match(/exactly (\d+) entries/) || [0, 3])[1]); return { criteria: Array.from({ length: n }, (_, i) => ({ met: i % 2 === 0, note: "Note " + (i + 1) })), overall: "Clear. One improvement.", improved: "A better version." }; };
    sample.limits = async () => ({ maxPromptBytes: 262144, images: { maxCount: 4, maxInputBytes: 2e7, mediaTypes: ["image/png", "image/jpeg"] } });
    const caps = { db, user, sample };
    window.claude = { use: name => new Promise(r => setTimeout(() => r(caps[name] || null), 200)) };
  };
  const page = await newPage({ init: fake });
  await page.waitForTimeout(900);
  const r = {};
  r.sync = await page.locator("[data-sync]").first().textContent();
  const cfg = await page.evaluate(() => ({ coach: coachOn(), review: reviewOn(), image: SITE.review ? SITE.review.image !== false : false, text: SITE.review ? !!SITE.review.text : false, rewrite: CONTENT.lessons.find(l => (l.practice || []).some(p => p.type === "rewrite"))?.id || null, first: CONTENT.lessons[0]?.id }));
  if (cfg.coach) {
    await go(page, "coach", 400);
    await page.fill("#coach-in", "A test question"); await page.keyboard.press("Enter"); await page.waitForTimeout(700);
    r.coachAnswered = await page.locator(".msg-ai .prose strong").count() > 0;
    r.coachImgStripped = (await page.locator(".msg-ai img").count()) === 0;
  }
  if (cfg.rewrite) {
    await go(page, "l." + cfg.rewrite, 500);
    const rw = page.locator(".bench", { hasText: "Your version" }).first();
    await rw.locator("textarea").fill("A test answer for the writing exercise.");
    const btn = rw.locator("button", { hasText: "Get feedback" });
    if (await btn.count()) { await btn.click(); await page.waitForTimeout(600); r.rewriteRubric = await rw.locator(".rubric .rk.ok, .rubric .rk.no").count(); }
  }
  await go(page, "l." + cfg.first, 400);
  await page.locator("#sec-journal textarea").fill("A test journal entry."); await page.locator("#sec-journal [data-save]").click(); await page.waitForTimeout(300);
  if (cfg.review) {
    await go(page, "coach.review", 500);
    if (cfg.image) { const png = path.join(os.tmpdir(), "my-school-check.png"); await page.screenshot({ path: png }); await page.setInputFiles("[data-file]", png); }
    if (cfg.text) await page.fill("#rv-text", "Some work to review.");
    await page.click("[data-run]"); await page.waitForTimeout(700);
    r.reviewAnswered = (await page.locator("[data-md]").innerText()).length > 10;
    const save = page.locator("text=Save to journal"); if (await save.count()) { await save.click(); await page.waitForTimeout(300); }
  }
  r.stored = await page.evaluate(() => [...window.__store.keys()]);
  r.calls = await page.evaluate(() => window.__calls);
  const ok = r.sync.includes("account") && r.stored.some(k => k.endsWith("/state")) && r.stored.some(k => k.includes("/j-")) && (!cfg.coach || (r.coachAnswered && r.coachImgStripped)) && (!cfg.review || r.reviewAnswered) && (!cfg.rewrite || r.rewriteRubric > 0);
  if (!ok) report.errors.push("caps: " + JSON.stringify(r));
  if (page.__errs.length) report.errors.push("caps errors: " + page.__errs.slice(0, 3).join(" | "));
  console.log(`caps: ${ok ? "saving, journal" + (cfg.coach ? ", coach" : "") + (cfg.rewrite ? ", writing feedback" : "") + (cfg.review ? ", review" : "") + " all work against a simulated host" : "FAILED"}; ${r.stored.length} documents written`);
  await page.context().close();
}

/* ---------- screenshots and contact sheets ---------- */
if (flag("shots")) {
  const out = path.join(dist, "_check"); fs.mkdirSync(out, { recursive: true });
  const shots = [];
  for (const [w, hgt, scheme] of [[1280, 900, "light"], [1280, 900, "dark"], [390, 844, "light"], [390, 844, "dark"]]) {
    const page = await newPage({ w, h: hgt, scheme });
    const first = await page.evaluate(() => CONTENT.lessons[0]?.id); const lab = await page.evaluate(() => Object.keys(LABS)[0]);
    const rs = ["today", "path", "l." + first, ...(lab ? ["lab." + lab] : []), "practice", "coach", "journal", "ref"];
    for (const r of rs) { await go(page, r, 500); await page.evaluate(() => document.fonts && document.fonts.ready); const f = path.join(out, `${r.replace(/[^a-z0-9.-]/gi, "_")}_${w}_${scheme}.png`); await page.screenshot({ path: f }); shots.push([f, `${r} ${w} ${scheme}`, w]); }
    await page.context().close();
  }
  for (const w of [1280, 390]) {
    const group = shots.filter(s => s[2] === w);
    const page = await (await browser.newContext({ viewport: { width: 1800, height: 1000 } })).newPage();
    const cols = w === 1280 ? 4 : 8;
    await page.setContent(`<body style="margin:0;background:#888;display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px">${group.map(([f, label]) => `<figure style="margin:0;position:relative"><img style="width:100%;display:block" src="data:image/png;base64,${fs.readFileSync(f).toString("base64")}"><figcaption style="position:absolute;top:0;left:0;background:#ff0;font:11px sans-serif;padding:1px 4px">${label}</figcaption></figure>`).join("")}</body>`);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(out, `sheet-${w}.png`), fullPage: true });
    await page.context().close();
  }
  console.log(`shots: ${shots.length} screenshots; contact sheets at dist/_check/sheet-1280.png and sheet-390.png`);
}

await browser.close(); server.close();
if (report.warnings.length) console.log("WARNINGS:\n  " + report.warnings.join("\n  "));
if (report.errors.length) { console.log("ERRORS (" + report.errors.length + "):\n  " + report.errors.slice(0, 60).join("\n  ")); process.exitCode = 1; }
else console.log("CHECK OK");
