/* My School engine: lab registry (LAB), control helpers (UI), font loader, charts and a phone frame. */
const LAB = (id, def) => { LABS[id] = Object.assign({ id }, def); };
const UI = {
  range: (id, label, min, max, step, val, unit = "") => `<div class="ctl"><label for="${id}">${label}</label><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"><output for="${id}" data-unit="${unit}">${val}${unit}</output></div>`,
  seg: (name, opts, val) => `<div class="seg" role="group" aria-label="${esc(name)}" data-seg="${esc(name)}">${opts.map(o => { const [v, l] = Array.isArray(o) ? o : [o, o]; return `<button type="button" data-v="${esc(v)}" aria-pressed="${String(v) === String(val)}">${esc(l)}</button>`; }).join("")}</div>`,
  bindRange(root, id, fn) { const inp = $("#" + id, root), out = $(`output[for="${id}"]`, root); const upd = () => { out.textContent = inp.value + (out.dataset.unit || ""); fn(parseFloat(inp.value)); }; inp.addEventListener("input", upd); return inp; },
  bindSeg(root, name, fn) { const s = $(`[data-seg="${name}"]`, root); s.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; $$("button", s).forEach(x => x.setAttribute("aria-pressed", String(x === b))); fn(b.dataset.v); }); return s; },
  setSeg(root, name, v) { $$(`[data-seg="${name}"] button`, root).forEach(x => x.setAttribute("aria-pressed", String(x.dataset.v === String(v)))); },
  art: (body) => `<svg viewBox="0 0 240 92" aria-hidden="true">${body}</svg>`,
};

const Fonts = {
  loaded: new Set(),
  ensure(families) {
    const need = families.filter(f => !this.loaded.has(f)); if (!need.length) return;
    need.forEach(f => this.loaded.add(f));
    const q = need.map(f => "family=" + f.replace(/ /g, "+") + ":wght@400;700").join("&");
    document.head.append(h(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${q}&display=swap">`));
  },
};

const Phone = (inner, w = 300) => `<div style="width:${w}px;max-width:100%;aspect-ratio:9/19.5;border-radius:36px;border:3px solid var(--ink-2);background:var(--surface);position:relative;overflow:hidden;margin:0 auto">${inner}</div>`;

const Chart = {
  frame: (body, W = 320, H = 180) => `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:420px;display:block">${S.l(30, H - 24, W - 6, H - 24, "rule-strong", 1)}${body}</svg>`,
  line(vals, labels) { const W = 320, H = 180, max = Math.max(...vals) * 1.1, px = i => 30 + i * (W - 40) / (vals.length - 1), py = v => H - 24 - v / max * (H - 40); return this.frame(`<polyline points="${vals.map((v, i) => px(i) + "," + py(v)).join(" ")}" style="fill:none;stroke:var(--accent);stroke-width:2.5"/>` + vals.map((v, i) => i % 3 === 0 ? S.t(px(i), H - 8, labels[i], { size: 10, a: "middle", c: "ink-3" }) : "").join("")); },
  bar(vals, labels, sort) { let d = vals.map((v, i) => [v, labels[i]]); if (sort) d.sort((a, b) => b[0] - a[0]); const W = 320, H = 180, max = Math.max(...vals); const bh = (H - 20) / d.length - 4; return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:420px;display:block">${d.map(([v, l], i) => S.t(64, 14 + i * (bh + 4) + bh / 2 + 4, l, { size: 11, a: "end", c: "ink-2" }) + S.r(70, 10 + i * (bh + 4), v / max * (W - 110), bh, i === 0 && sort ? "accent" : "rule-strong", null, 2) + S.t(74 + v / max * (W - 110), 14 + i * (bh + 4) + bh / 2 + 4, v, { size: 10, c: "ink-3" })).join("")}</svg>`; },
  pie(vals, labels) { const tot = vals.reduce((a, b) => a + b), cols = ["accent", "sel", "spec", "warn", "good", "ink-3", "rule-strong", "bad"]; let a0 = -Math.PI / 2, out = ""; vals.forEach((v, i) => { const a1 = a0 + v / tot * Math.PI * 2; const large = a1 - a0 > Math.PI ? 1 : 0; out += `<path d="M90 90 L${90 + 70 * Math.cos(a0)} ${90 + 70 * Math.sin(a0)} A70 70 0 ${large} 1 ${90 + 70 * Math.cos(a1)} ${90 + 70 * Math.sin(a1)} Z" style="fill:var(--${cols[i % cols.length]});stroke:var(--surface);stroke-width:1.5"/>`; a0 = a1; }); return `<svg viewBox="0 0 320 180" style="width:100%;max-width:420px;display:block">${out}${labels.map((l, i) => `<rect x="190" y="${20 + i * 18}" width="10" height="10" style="fill:var(--${cols[i % cols.length]})"/>` + S.t(206, 29 + i * 18, l, { size: 11, c: "ink-2" })).join("")}</svg>`; },
  scatter(pts) { const W = 320, H = 180; return this.frame(pts.map(([x, y]) => S.c(30 + x * (W - 50), H - 24 - y * (H - 40), 3.5, "accent")).join("") + S.l(30, 10, 30, H - 24, "rule-strong", 1)); },
  hist(vals) { const bins = Array(8).fill(0); vals.forEach(v => bins[Math.min(7, Math.floor(v / 10))]++); const W = 320, H = 180, max = Math.max(...bins); return this.frame(bins.map((b, i) => S.r(34 + i * 34, H - 24 - b / max * (H - 40), 32, b / max * (H - 40), "accent", null, 0) + S.t(50 + i * 34, H - 8, i * 10, { size: 10, a: "middle", c: "ink-3" })).join("")); },
  stacked(vals, labels) { const tot = vals.reduce((a, b) => a + b), cols = ["accent", "sel", "spec", "warn", "good"]; let x = 20, out = ""; vals.forEach((v, i) => { const w = v / tot * 280; out += S.r(x, 60, w, 40, cols[i], null, 0) + (w > 40 ? S.t(x + w / 2, 85, Math.round(v / tot * 100) + "%", { size: 12, a: "middle", w: 700, c: "surface" }) : ""); x += w; }); return `<svg viewBox="0 0 320 180" style="width:100%;max-width:420px;display:block">${out}${labels.map((l, i) => `<rect x="${20 + i * 96}" y="120" width="10" height="10" style="fill:var(--${cols[i]})"/>` + S.t(36 + i * 96, 129, l, { size: 11, c: "ink-2" })).join("")}</svg>`; },
};
