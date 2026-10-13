"use strict";
/* My School engine: core. Subject-neutral. Everything subject-specific lives in SITE (site.config.js). */

/* ============ helpers ============ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const h = html => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pad2 = n => String(n).padStart(2, "0");
const dayKey = (d = new Date()) => d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const uid36 = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const fmtDate = ts => new Date(ts).toLocaleDateString((typeof SITE !== "undefined" && SITE.lang) || "en-GB", { day: "numeric", month: "short", year: "numeric" });
const plural = (n, one, many) => n + " " + (n === 1 ? one : (many || one + "s"));
function seeded(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function hashStr(str) { let x = 2166136261; for (let i = 0; i < str.length; i++) { x ^= str.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }
const numWord = n => { const a = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"], t = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]; if (n < 20) return a[n]; if (n < 100) return t[Math.floor(n / 10)] + (n % 10 ? "-" + a[n % 10].toLowerCase() : ""); return String(n); };

function toast(msg) {
  const t = h(`<div class="toast" role="status">${esc(msg)}</div>`);
  document.body.append(t);
  setTimeout(() => t.remove(), 2200);
}
async function copyText(text, el) {
  try { await navigator.clipboard.writeText(text); toast("Copied"); }
  catch (e) {
    if (el) { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
    toast("Text selected. Press Cmd+C or Ctrl+C to copy.");
  }
}

/* ============ icons ============ */
const I = (() => {
  const p = (d, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
  return {
    today: p('<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><circle cx="12" cy="15" r="1.7" fill="currentColor" stroke="none"/>'),
    path: p('<circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8.2 6H15a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6.8"/>'),
    practice: p('<path d="M4 7h9.5M18.5 7H20M4 17h3.5M12.5 17H20"/><circle cx="16" cy="7" r="2.3"/><circle cx="10" cy="17" r="2.3"/>'),
    coach: p('<path d="M4.5 5h15a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1H10L5.5 20v-3.5h-1a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="M8 9.5h8M8 12.5h5"/>'),
    journal: p('<rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M9 3.5v17M12 8h4M12 11.5h4"/>'),
    notes: p('<path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20z"/><path d="M14 7.5l2.5 2.5"/>'),
    ref: p('<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5c-3.5-.5-6.5 0-8.5 1.5z"/><path d="M12 6.5v13"/>'),
    more: p('<circle cx="5.5" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="18.5" cy="12" r="1.4" fill="currentColor"/>'),
    search: p('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>'),
    play: p('<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>'),
    pause: p('<path d="M8.5 5.5v13M15.5 5.5v13" stroke-width="3"/>'),
    next: p('<path d="M6 6v12l8.5-6z" fill="currentColor" stroke="none"/><path d="M18 5.5v13" stroke-width="2.2"/>'),
    prev: p('<path d="M18 6v12l-8.5-6z" fill="currentColor" stroke="none"/><path d="M6 5.5v13" stroke-width="2.2"/>'),
    headphones: p('<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3.5" y="14" width="4.5" height="6.5" rx="1.5"/><rect x="16" y="14" width="4.5" height="6.5" rx="1.5"/>'),
    video: p('<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M10 9.3v5.4l4.6-2.7z" fill="currentColor"/>'),
    mic: p('<rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/>'),
    doc: p('<path d="M6 3.5h8l4 4v13H6z"/><path d="M14 3.5v4h4M9 12h6M9 15.5h6"/>'),
    check: p('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 'stroke-width="2.6"'),
    x: p('<path d="M6 6l12 12M18 6L6 18"/>'),
    external: p('<path d="M14 4.5h5.5V10M19.5 4.5L11 13M17 14v5.5H4.5V7H10"/>'),
    up: p('<path d="M6 15l6-6 6 6"/>'),
    down: p('<path d="M6 9l6 6 6-6"/>'),
    upload: p('<path d="M12 15V4.5M7.5 9L12 4.5 16.5 9"/><path d="M4.5 15v4.5h15V15"/>'),
    bulb: p('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>'),
    ruler: p('<rect x="2.5" y="8" width="19" height="8" rx="1.5"/><path d="M6.5 8v3M10.5 8v4.5M14.5 8v3M18.5 8v4.5"/>'),
    alert: p('<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.3v.1"/>'),
    prompt: p('<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M7 9.5l3 2.5-3 2.5M12.5 15h4.5"/>'),
    copy: p('<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5v-3a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3"/>'),
    trash: p('<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>'),
    edit: p('<path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20z"/>'),
    reset: p('<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4"/>'),
    sparkle: p('<path d="M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8z"/><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>'),
    plus: p('<path d="M12 5v14M5 12h14"/>'),
    stopSq: p('<rect x="7" y="7" width="10" height="10" rx="1.5" fill="currentColor" stroke="none"/>'),
    send: p('<path d="M5 12h13M13 6l6 6-6 6"/>'),
  };
})();

/* ============ colour maths (WCAG contrast, OKLab/OKLCH, HSL) ============ */
const Color = {
  hexToRgb(hex) {
    let x = String(hex).trim().replace("#", "");
    if (x.length === 3) x = x.split("").map(c => c + c).join("");
    const n = parseInt(x.slice(0, 6), 16);
    if (Number.isNaN(n)) return { r: 0, g: 0, b: 0 };
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  },
  rgbToHex({ r, g, b }) { return "#" + [r, g, b].map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0")).join("").toUpperCase(); },
  isHex(s) { return /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(s).trim()); },
  rgbToHsl({ r, g, b }) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b); let hh = 0, s = 0; const l = (max + min) / 2;
    if (max !== min) { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min); hh = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4; hh *= 60; }
    return { h: hh, s: s * 100, l: l * 100 };
  },
  hslToRgb({ h: hh, s, l }) { s /= 100; l /= 100; const k = n => (n + hh / 30) % 12; const a = s * Math.min(l, 1 - l); const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); return { r: f(0) * 255, g: f(8) * 255, b: f(4) * 255 }; },
  hsl(hh, s, l) { return this.rgbToHex(this.hslToRgb({ h: hh, s, l })); },
  toLin(c) { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); },
  fromLin(c) { const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; return v * 255; },
  luminance(hex) { const { r, g, b } = this.hexToRgb(hex); return 0.2126 * this.toLin(r) + 0.7152 * this.toLin(g) + 0.0722 * this.toLin(b); },
  contrast(a, b) { const la = this.luminance(a), lb = this.luminance(b); const [hi, lo] = la > lb ? [la, lb] : [lb, la]; return (hi + 0.05) / (lo + 0.05); },
  rgbToOklab({ r, g, b }) {
    r = this.toLin(r); g = this.toLin(g); b = this.toLin(b);
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return { L: 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, a: 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, b: 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s };
  },
  oklabToLinRgb({ L, a, b }) {
    const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3), m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3), s = Math.pow(L - 0.0894841775 * a - 1.2914855480 * b, 3);
    return { r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, b: -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s };
  },
  toOklch(hex) { const { L, a, b } = this.rgbToOklab(this.hexToRgb(hex)); let hh = Math.atan2(b, a) * 180 / Math.PI; if (hh < 0) hh += 360; return { l: L, c: Math.hypot(a, b), h: hh }; },
  inGamut({ r, g, b }) { const e = 0.0005; return r >= -e && r <= 1 + e && g >= -e && g <= 1 + e && b >= -e && b <= 1 + e; },
  oklch(l, c, hh) {
    const lab = cc => this.oklabToLinRgb({ L: l, a: cc * Math.cos(hh * Math.PI / 180), b: cc * Math.sin(hh * Math.PI / 180) });
    let rgb = lab(c);
    if (!this.inGamut(rgb)) { let lo = 0, hi = c; for (let i = 0; i < 24; i++) { const mid = (lo + hi) / 2; if (this.inGamut(lab(mid))) lo = mid; else hi = mid; } rgb = lab(lo); }
    return this.rgbToHex({ r: this.fromLin(clamp(rgb.r, 0, 1)), g: this.fromLin(clamp(rgb.g, 0, 1)), b: this.fromLin(clamp(rgb.b, 0, 1)) });
  },
  deltaE(a, b) { const A = this.rgbToOklab(this.hexToRgb(a)), B = this.rgbToOklab(this.hexToRgb(b)); return Math.hypot(A.L - B.L, A.a - B.a, A.b - B.b) * 100; },
  bestText(bg) { return this.contrast(bg, "#FFFFFF") >= this.contrast(bg, "#111111") ? "#FFFFFF" : "#111111"; },
  mix(a, b, t) { const A = this.hexToRgb(a), B = this.hexToRgb(b); return this.rgbToHex({ r: A.r + (B.r - A.r) * t, g: A.g + (B.g - A.g) * t, b: A.b + (B.b - A.b) * t }); },
  ratioText(r) { return (Math.floor(r * 100) / 100).toFixed(2) + ":1"; },
};

/* ============ content registry (filled by content files) ============ */
const CONTENT = { lessons: [], notes: [], glossary: [], media: {}, library: [] };
const L = o => CONTENT.lessons.push(o);
const F = o => CONTENT.notes.push(o);
const G = arr => CONTENT.glossary.push(...arr);
const LABS = {};
const FIGS = {};

/* ============ store: progress in the viewer's private db subtree, cached locally ============ */
const Store = {
  get key() { return ((typeof SITE !== "undefined" && SITE.id) || "my-school") + ".v1"; },
  s: null, ref: null, db: null, uid: null, remote: false, writing: false, again: false,
  subs: new Set(),
  defaults() { return { v: 1, updatedAt: 0, lessons: {}, labs: {}, media: {}, quiz: {}, ex: {}, days: [], prefs: {}, notesRead: {}, extra: {} }; },
  load() {
    try { const raw = localStorage.getItem(this.key); if (raw) this.s = Object.assign(this.defaults(), JSON.parse(raw)); } catch (e) { /* storage blocked */ }
    if (!this.s) this.s = this.defaults();
  },
  on(fn) { this.subs.add(fn); return () => this.subs.delete(fn); },
  emit(kind) { this.subs.forEach(fn => { try { fn(kind); } catch (e) { console.warn(e); } }); },
  saveLocal() { try { localStorage.setItem(this.key, JSON.stringify(this.s)); } catch (e) { /* ignore */ } },
  touch() {
    this.s.updatedAt = Date.now();
    const d = dayKey();
    if (!this.s.days.includes(d)) { this.s.days.push(d); if (this.s.days.length > 500) this.s.days.shift(); }
    this.saveLocal(); this.schedule(); this.emit("change");
  },
  schedule: debounce(() => Store.push(), 1200),
  async push() {
    if (!this.ref) return;
    if (this.writing) { this.again = true; return; }
    this.writing = true;
    try { await this.ref.set(JSON.parse(JSON.stringify(this.s))); } catch (e) { console.warn("save failed", e && e.code); }
    this.writing = false;
    if (this.again) { this.again = false; this.push(); }
  },
  async connect() {
    if (!window.claude || !window.claude.use) return;
    try {
      const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
      if (!db || !user) return;
      const id = await user.id();
      if (!id) return;
      this.db = db; this.uid = id;
      this.ref = db.doc("data/users/" + id + "/state");
      const snap = await this.ref.get();
      if (snap.exists) {
        const r = snap.data();
        if ((r.updatedAt || 0) >= (this.s.updatedAt || 0)) { this.s = Object.assign(this.defaults(), JSON.parse(JSON.stringify(r))); this.saveLocal(); }
        else this.push();
      } else if (this.s.updatedAt) this.push();
      this.remote = true;
      this.emit("sync");
      Journal.connect(db, id);
    } catch (e) { console.warn("db unavailable", e && e.code); }
  },
  lesson(id) { return this.s.lessons[id] || (this.s.lessons[id] = {}); },
  mark(id, section) { const l = this.lesson(id); if (!l[section]) { l[section] = Date.now(); this.touch(); } },
  lessonPct(id) { const l = this.s.lessons[id]; if (!l) return 0; if (l.done) return 1; const n = ["read", "watch", "practice", "check", "journal"].filter(k => l[k]).length; return n / 5; },
  doneCount() { return CONTENT.lessons.filter(x => this.s.lessons[x.id] && this.s.lessons[x.id].done).length; },
  labDone(id) { const l = this.s.labs[id] || (this.s.labs[id] = {}); if (!l.done) { l.done = Date.now(); this.touch(); } },
  labData(id) { const l = this.s.labs[id] || (this.s.labs[id] = {}); return l.data || (l.data = {}); },
};

/* ============ journal: one document per entry in the viewer's private subtree ============ */
const Journal = {
  get key() { return ((typeof SITE !== "undefined" && SITE.id) || "my-school") + ".journal"; },
  entries: [], col: null, subs: new Set(),
  load() { try { const raw = localStorage.getItem(this.key); if (raw) this.entries = JSON.parse(raw) || []; } catch (e) { this.entries = []; } },
  saveLocal() { try { localStorage.setItem(this.key, JSON.stringify(this.entries)); } catch (e) { /* ignore */ } },
  on(fn) { this.subs.add(fn); return () => this.subs.delete(fn); },
  emit() { this.subs.forEach(fn => { try { fn(); } catch (e) { console.warn(e); } }); },
  async connect(db, id) {
    try {
      this.col = db.collection("data/users/" + id);
      const q = await this.col.where("kind", "==", "journal").get();
      const remote = q.docs.map(d => d.data());
      const byId = new Map(remote.map(e => [e.id, e]));
      const localOnly = this.entries.filter(e => !byId.has(e.id) && !e.deleted);
      this.entries = remote.concat(localOnly).filter(e => !e.deleted).sort((a, b) => b.ts - a.ts);
      this.saveLocal(); this.emit();
      for (const e of localOnly) { try { await this.col.doc(e.id).set(e); } catch (err) { break; } }
    } catch (e) { console.warn("journal sync", e && e.code); }
  },
  forLesson(id) { return this.entries.filter(e => e.lesson === id); },
  async add(entry) {
    const e = Object.assign({ id: "j-" + uid36(), kind: "journal", ts: Date.now(), type: "free", lesson: "", prompt: "", text: "" }, entry);
    this.entries.unshift(e); this.saveLocal(); this.emit();
    if (e.lesson) Store.mark(e.lesson, "journal"); else Store.touch();
    if (this.col) { try { await this.col.doc(e.id).set(e); } catch (err) { console.warn(err && err.code); } }
    return e;
  },
  async update(id, text) {
    const e = this.entries.find(x => x.id === id); if (!e) return;
    e.text = text; e.edited = Date.now(); this.saveLocal(); this.emit();
    if (this.col) { try { await this.col.doc(id).set(JSON.parse(JSON.stringify(e))); } catch (err) { console.warn(err && err.code); } }
  },
  async remove(id) {
    this.entries = this.entries.filter(x => x.id !== id); this.saveLocal(); this.emit();
    if (this.col) { try { await this.col.doc(id).delete(); } catch (err) { console.warn(err && err.code); } }
  },
};

/* ============ markdown ============ */
const MD = {
  render(src, { trusted = true } = {}) {
    let html;
    if (window.marked && window.marked.parse) html = window.marked.parse(String(src || ""), { gfm: true, breaks: false });
    else html = String(src || "").split(/\n{2,}/).map(p => "<p>" + esc(p) + "</p>").join("");
    if (!trusted) {
      if (window.DOMPurify) html = window.DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, FORBID_TAGS: ["img", "style", "form", "input", "iframe"], FORBID_ATTR: ["style"] });
      else html = "<p>" + esc(src) + "</p>";
    }
    return html;
  },
  inline(src) {
    return esc(src).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\((#[A-Za-z0-9._~-]+|https?:\/\/[^)\s"]+)\)/g, (m, t, u) => u.startsWith("#") ? `<a href="${u}">${t}</a>` : `<a href="${u}" target="_blank" rel="noopener noreferrer">${t}</a>`);
  },
  fixLinks(root) {
    $$("a[href]", root).forEach(a => {
      const href = a.getAttribute("href") || "";
      if (href.startsWith("#")) return;
      if (/^https?:\/\//i.test(href)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      else a.removeAttribute("href");
    });
  },
};

/* ============ listen mode: read the page aloud, paragraph by paragraph ============ */
const Speech = {
  ok: typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined",
  blocks: [], i: 0, playing: false, token: 0, title: "", bar: null, onDone: null,
  get lang() { return (typeof SITE !== "undefined" && SITE.lang) || "en-GB"; },
  get rate() { return Store.s.prefs.rate || 1; },
  voices() { const base = this.lang.split("-")[0].toLowerCase(); try { return speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith(base)); } catch (e) { return []; } },
  voice() {
    const vs = this.voices(); if (!vs.length) return null;
    const want = Store.s.prefs.voice; const found = vs.find(v => v.name === want); if (found) return found;
    const score = v => (v.lang.toLowerCase() === this.lang.toLowerCase() ? 4 : 0) + (/(natural|neural|premium|enhanced|google)/i.test(v.name) ? 5 : 0) + (v.localService ? 1 : 0);
    return vs.slice().sort((a, b) => score(b) - score(a))[0];
  },
  start(title, blocks, from = 0) {
    if (!this.ok) { toast("Read-aloud isn't available in this browser."); return; }
    this.stop(true); this.onDone = null;
    this.title = title; this.blocks = blocks.filter(b => b.text && b.text.trim()); this.i = from; this.playing = true;
    this.showBar(); this.speak();
  },
  speak() {
    if (!this.playing) return;
    const b = this.blocks[this.i];
    $$(".speaking").forEach(e => e.classList.remove("speaking"));
    if (!b) { const cb = this.onDone; this.onDone = null; this.stop(); if (cb) cb(); return; }
    if (b.el) { b.el.classList.add("speaking"); if (Store.s.prefs.follow !== false) b.el.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }
    const tok = ++this.token;
    const u = new SpeechSynthesisUtterance(b.text);
    const v = this.voice(); if (v) { u.voice = v; u.lang = v.lang; } else u.lang = this.lang;
    u.rate = this.rate;
    u.onend = () => { if (tok !== this.token || !this.playing) return; this.i++; this.speak(); };
    try { speechSynthesis.speak(u); } catch (e) { this.stop(); }
    this.updateBar();
  },
  pause() { this.playing = false; this.token++; try { speechSynthesis.cancel(); } catch (e) { /* */ } this.updateBar(); },
  resume() { if (!this.blocks.length) return; this.playing = true; this.speak(); },
  skip(d) { this.i = clamp(this.i + d, 0, this.blocks.length - 1); this.token++; try { speechSynthesis.cancel(); } catch (e) { /* */ } if (this.playing) this.speak(); else this.updateBar(); },
  stop(keepBar) {
    this.playing = false; this.token++;
    try { speechSynthesis.cancel(); } catch (e) { /* */ }
    $$(".speaking").forEach(e => e.classList.remove("speaking"));
    if (!keepBar && this.bar) { this.bar.remove(); this.bar = null; }
  },
  showBar() {
    if (this.bar) this.bar.remove();
    const vs = this.voices(); const cur = this.voice();
    this.bar = h(`<div class="listen" role="region" aria-label="Read aloud">
      <span class="lt" id="listen-title"></span>
      <button data-a="prev" aria-label="Previous paragraph">${I.prev}</button>
      <button data-a="toggle" aria-label="Pause">${I.pause}</button>
      <button data-a="next" aria-label="Next paragraph">${I.next}</button>
      <select data-a="rate" aria-label="Speed">${[0.85, 1, 1.15, 1.3, 1.5].map(r => `<option value="${r}" ${r === this.rate ? "selected" : ""}>${r}×</option>`).join("")}</select>
      ${vs.length > 1 ? `<select data-a="voice" aria-label="Voice">${vs.map(v => `<option ${cur && v.name === cur.name ? "selected" : ""}>${esc(v.name)}</option>`).join("")}</select>` : ""}
      <button data-a="close" aria-label="Stop reading">${I.x}</button>
    </div>`);
    this.bar.addEventListener("click", e => {
      const a = e.target.closest("button")?.dataset.a; if (!a) return;
      if (a === "toggle") this.playing ? this.pause() : this.resume();
      if (a === "prev") this.skip(-1);
      if (a === "next") this.skip(1);
      if (a === "close") this.stop();
    });
    this.bar.addEventListener("change", e => {
      const a = e.target.dataset.a;
      if (a === "rate") { Store.s.prefs.rate = parseFloat(e.target.value); Store.saveLocal(); }
      if (a === "voice") { Store.s.prefs.voice = e.target.value; Store.saveLocal(); }
      if (this.playing) { this.token++; try { speechSynthesis.cancel(); } catch (err) { /* */ } this.speak(); }
    });
    document.body.append(this.bar);
    this.updateBar();
  },
  updateBar() {
    if (!this.bar) return;
    $("#listen-title", this.bar).textContent = this.title + (this.blocks.length ? "  ·  " + Math.min(this.i + 1, this.blocks.length) + "/" + this.blocks.length : "");
    const t = $('[data-a="toggle"]', this.bar); t.innerHTML = this.playing ? I.pause : I.play; t.setAttribute("aria-label", this.playing ? "Pause" : "Play");
  },
  blocksFrom(root) {
    const out = [];
    $$("h2, h3, p, li, .callout", root).forEach(el => {
      if (el.closest(".fig") || el.closest("table")) return;
      if ((el.tagName === "P" || el.tagName === "LI") && el.closest(".callout")) return;
      if (el.tagName === "P" && el.closest("li")) return;
      let text = el.innerText.replace(/\s+/g, " ").trim();
      if (el.classList.contains("callout") && el.classList.contains("prompt")) text = "Example. " + text.replace(/^\S+\s*Copy\s*/i, "");
      if (text) out.push({ el, text });
    });
    return out;
  },
};
if (Speech.ok) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; } catch (e) { Speech.ok = false; } }

/* ============ coach: the page asks Claude on the viewer's account (sample capability) ============ */
const Coach = {
  fn: null, limits: null, state: "pending", subs: new Set(), // pending | ready | off
  on(fn) { this.subs.add(fn); return () => this.subs.delete(fn); },
  emit() { this.subs.forEach(fn => { try { fn(); } catch (e) { console.warn(e); } }); },
  async connect() {
    if (!SITE.coach || SITE.coach.enabled === false || !window.claude || !window.claude.use) { this.state = "off"; this.emit(); return; }
    try {
      this.fn = await window.claude.use("sample");
      if (!this.fn) { this.state = "off"; this.emit(); return; }
      this.limits = await this.fn.limits().catch(() => null);
      this.state = "ready";
    } catch (e) { this.state = "off"; }
    this.emit();
  },
  get images() { return !!(this.limits && this.limits.images); },
  errorCopy(code) {
    return ({
      not_granted: "The coach needs your permission to use Claude. You can allow it from this page's permissions menu.",
      sampling_disabled: "Claude isn't available for this account right now.",
      rate_limited: "Too many requests in a short time. Wait a minute, then try again.",
      session_expired: "Your session has expired. Sign in to Claude again, then retry.",
      image_rejected: "That image couldn't be used. Try a PNG or JPEG under 20 MB.",
      images_unavailable: "Image feedback isn't available in this view.",
      refused: "The coach couldn't answer that one. Try rephrasing.",
      prompt_too_large: "That was too long to send. Try something shorter.",
      empty_completion: "The coach returned nothing. Try asking in a different way.",
      invalid_json: "The coach's answer came back in the wrong shape. Try again.",
    })[code] || "Something went wrong reaching the coach. Try again in a moment.";
  },
  hardOff(code) { return ["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"].includes(code); },
  learner() { const l = SITE.learner || {}; return `${l.name || "The learner"}${l.profile ? ", " + l.profile : ""}`; },
  style() { return `${SITE.voice || "Plain, direct, specific."} No emoji, no hype, no em-dash asides.`; },
  index() {
    const lessons = CONTENT.lessons.map(l => `${l.id}: ${l.title}`).join("\n");
    const labs = Object.entries(LABS).map(([id, l]) => `${id}: ${l.title}`).join("\n");
    return { lessons, labs };
  },
  context() {
    const c = SITE.coach || {}; const { lessons, labs } = this.index();
    return `You are the coach inside ${SITE.name}, a self-study site where ${this.learner()} is learning ${SITE.subject}.${SITE.learner && SITE.learner.goal ? " Their goal: " + SITE.learner.goal : ""}

How to answer:
- Talk like ${c.role || "an experienced practitioner and teacher"} to a smart learner: lead with the answer in one or two sentences, then the reasoning and concrete steps.
- Use real numbers, names and examples where they exist, and name the principle you are applying. If you are not sure of a fact, say so.
- When a lesson or lab in the course covers the topic, link it with Markdown using these exact forms: [Lesson title](#l.<lesson id>) or [Lab title](#lab.<lab id>). Only use ids from the lists below. One to three links is plenty.
${c.extra ? "- " + c.extra + "\n" : ""}- Keep it tight: usually under 350 words. Use short sections or lists when they help. ${this.style()}

Course lessons (id: title):
${lessons}
${labs ? "\nLabs (id: title):\n" + labs : ""}`;
  },
};

/* ============ router (hash routes: bare tokens only, e.g. #l.lesson-id) ============ */
const Router = {
  routes: {},
  parse() {
    const raw = decodeURIComponent(location.hash.slice(1)) || "today";
    const i = raw.indexOf(".");
    return i < 0 ? { name: raw, arg: null } : { name: raw.slice(0, i), arg: raw.slice(i + 1) };
  },
  go(hash) { if (location.hash.slice(1) === hash) this.render(); else location.hash = hash; },
  cleanup: [],
  render() {
    this.cleanup.forEach(fn => { try { fn(); } catch (e) { /* */ } }); this.cleanup = [];
    const { name, arg } = this.parse();
    const fn = this.routes[name] || this.routes.today;
    const main = $("#main");
    main.innerHTML = "";
    try { fn(main, arg); }
    catch (e) { console.error(e); main.innerHTML = `<div class="page narrow"><p class="lede">This page didn't load. Go back to <a href="#today">Today</a>.</p></div>`; }
    const navName = { l: "path", lab: "practice", n: "notes", g: "ref" }[name] || name;
    $$("[data-nav]").forEach(a => { if (a.dataset.nav === navName) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    if (!this.keepScroll) window.scrollTo(0, 0);
    this.keepScroll = false;
  },
  onLeave(fn) { this.cleanup.push(fn); },
};
