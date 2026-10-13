/* Baseline example: the 31 figures referenced from lessons as [[fig:id]]. */

FIG("fig-ux-planes", "Jesse James Garrett's five planes. Every decision on a plane is constrained by the planes beneath it, so a surface problem is often a structure or strategy problem in disguise.", () => {
  const rows = [
    ["Surface", "What people see: colour, type, imagery, finish", "accent-soft", "accent"],
    ["Skeleton", "Layout of the screen: interface elements, navigation, information design", "surface", "rule-strong"],
    ["Structure", "How it fits together: flows, information architecture, interaction", "surface", "rule-strong"],
    ["Scope", "What it does: features and content requirements", "surface", "rule-strong"],
    ["Strategy", "Why it exists: user needs and business goals", "sunk", "rule-strong"],
  ];
  let b = "";
  rows.forEach(([n, d, f, s], i) => {
    const y = 20 + i * 62, x = 90 + i * 10;
    b += S.r(x, y, 480, 50, f, s, 6) + S.t(x + 18, y + 22, n, { size: 17, w: 700, f: "d" }) + S.t(x + 18, y + 40, d, { size: 13, c: "ink-2" });
  });
  b += S.arrow(50, 330, 50, 30, "spec", 1.5) + S.t(42, 345, "abstract", { size: 12, a: "middle", c: "spec", w: 600 }) + S.t(42, 18, "concrete", { size: 12, a: "middle", c: "spec", w: 600 });
  return S.svg(620, 350, b, "Five stacked planes from strategy at the bottom to surface at the top");
});

FIG("fig-norman-door", "The same door, two ways. Identical bar handles invite pulling from both sides, so half of everyone gets it wrong. A flat plate can only be pushed: the shape is the instruction.", () => {
  const door = (x, label, sub, plate) => {
    let g = S.r(x, 30, 200, 270, "surface", "ink-2", 4) + S.r(x + 12, 42, 176, 246, "sunk", "rule-strong", 2);
    if (plate) g += S.r(x + 150, 140, 26, 70, "rule-strong", "ink-2", 3, 1.2);
    else g += S.r(x + 158, 120, 10, 100, "ink-2", null, 5) + S.l(x + 163, 128, x + 175, 128, "ink-2", 3) + S.l(x + 163, 212, x + 175, 212, "ink-2", 3);
    g += S.t(x + 100, 328, label, { size: 15, w: 700, a: "middle", f: "d" }) + S.t(x + 100, 348, sub, { size: 13, a: "middle", c: "ink-2" });
    return g;
  };
  let b = door(40, "Bar handle", "Says pull. Often means push.", false) + door(340, "Push plate", "Can only be pushed.", true);
  b += S.t(140, 100, "?", { size: 64, a: "middle", w: 800, c: "bad", f: "d" });
  b += S.p("M 520 170 m -24 0 l 14 -12 m -14 12 l 14 12", null, "good", 2.5) + S.l(496, 170, 456, 170, "good", 2.5);
  return S.svg(600, 360, b, "Two doors: one with a bar handle and a question mark, one with a flat push plate");
});

FIG("fig-double-diamond", "The Double Diamond (UK Design Council, 2005). Each diamond opens up options, then narrows to a decision. The first finds the right problem; the second finds the right solution to it.", () => {
  let b = "";
  const dia = (x, f) => S.p(`M${x} 150 L${x + 130} 50 L${x + 260} 150 L${x + 130} 250 Z`, f, "ink-2", 1.5);
  b += dia(30, "accent-soft") + dia(290, "spec-soft");
  b += S.l(160, 50, 160, 250, "rule-strong", 1, 'stroke-dasharray="4 4"') + S.l(420, 50, 420, 250, "rule-strong", 1, 'stroke-dasharray="4 4"');
  const lab = [[95, "Discover"], [225, "Define"], [355, "Develop"], [485, "Deliver"]];
  lab.forEach(([x, n]) => { b += S.t(x, 155, n, { size: 15, w: 700, a: "middle", f: "d" }); });
  b += S.t(95, 175, "diverge", { size: 12, a: "middle", c: "ink-2" }) + S.t(225, 175, "converge", { size: 12, a: "middle", c: "ink-2" }) + S.t(355, 175, "diverge", { size: 12, a: "middle", c: "ink-2" }) + S.t(485, 175, "converge", { size: 12, a: "middle", c: "ink-2" });
  b += S.t(160, 284, "Problem space: are we solving the right thing?", { size: 13, a: "middle", c: "ink-2" }) + S.t(420, 284, "Solution space: are we solving it well?", { size: 13, a: "middle", c: "ink-2" });
  b += S.c(30, 150, 5, "ink") + S.c(290, 150, 6, "spec") + S.c(550, 150, 5, "ink");
  b += S.t(290, 136, "problem statement", { size: 12, a: "middle", c: "spec", w: 600 });
  b += S.t(30, 136, "a hunch", { size: 12, a: "middle", c: "ink-3" }) + S.t(550, 136, "shipped", { size: 12, a: "middle", c: "ink-3" });
  return S.svg(580, 300, b, "Two diamonds: discover and define, then develop and deliver");
});

FIG("fig-fidelity", "Fidelity rises left to right, and so does the cost of changing your mind. Do your big thinking where changes are cheap.", () => {
  let b = "";
  const xs = [20, 165, 310, 455];
  // sketch
  b += S.r(xs[0], 30, 125, 170, "surface", "rule-strong", 8);
  b += S.p("M34 52 q 30 -4 60 1 t 35 -1", null, "ink-2", 1.6) + S.p("M34 75 q 25 30 90 2", null, "ink-3", 1.2) + S.p("M36 70 l 85 0 l -2 55 l -84 2 z", null, "ink-2", 1.3) + S.p("M40 145 q 20 -3 40 1", null, "ink-2", 1.4) + S.p("M40 160 q 30 2 70 -1", null, "ink-3", 1.2) + S.p("M42 178 l 40 0 l 0 12 l -40 0 z", null, "ink-2", 1.3);
  // wireframe
  b += S.r(xs[1], 30, 125, 170, "surface", "rule-strong", 8) + S.r(xs[1] + 12, 44, 70, 8, "rule-strong", null, 2) + S.r(xs[1] + 12, 62, 101, 56, "sunk", "rule-strong", 2, 1) + S.l(xs[1] + 12, 62, xs[1] + 113, 118, "rule-strong", 1) + S.l(xs[1] + 113, 62, xs[1] + 12, 118, "rule-strong", 1) + S.lines(xs[1] + 12, 130, 100, 3, 11, "rule-strong", 5, true, 2) + S.r(xs[1] + 12, 170, 50, 18, "rule-strong", null, 3);
  // mockup
  b += S.r(xs[2], 30, 125, 170, "surface", "rule-strong", 8) + S.t(xs[2] + 12, 54, "Cosy cabin", { size: 13, w: 700, f: "d" }) + S.r(xs[2] + 12, 62, 101, 56, "accent-soft", null, 6) + S.c(xs[2] + 90, 80, 8, "accent") + S.p(`M${xs[2] + 12} 118 l 30 -26 l 22 18 l 18 -12 l 31 20 z`, "sel", null) + S.t(xs[2] + 12, 136, "£120 a night", { size: 11, w: 600, c: "ink-2" }) + S.lines(xs[2] + 12, 144, 95, 2, 9, "rule", 4, true, 4) + S.r(xs[2] + 12, 170, 56, 20, "ink", null, 5) + S.t(xs[2] + 40, 184, "Book", { size: 11, a: "middle", w: 700, c: "on-ink" });
  // prototype
  b += S.r(xs[3], 30, 125, 170, "surface", "rule-strong", 8) + S.t(xs[3] + 12, 54, "Cosy cabin", { size: 13, w: 700, f: "d" }) + S.r(xs[3] + 12, 62, 101, 56, "accent-soft", null, 6) + S.p(`M${xs[3] + 12} 118 l 30 -26 l 22 18 l 18 -12 l 31 20 z`, "sel", null) + S.r(xs[3] + 12, 170, 56, 20, "ink", null, 5) + S.t(xs[3] + 40, 184, "Book", { size: 11, a: "middle", w: 700, c: "on-ink" });
  b += S.p(`M${xs[3] + 52} 178 l 0 22 l 6 -6 l 5 10 l 4 -2 l -5 -10 l 8 0 z`, "ink", "surface", 1.2) + S.c(xs[3] + 46, 180, 12, null, "spec", 1.5);
  ["Sketch", "Wireframe", "Mockup", "Prototype"].forEach((n, i) => { b += S.t(xs[i] + 62, 222, n, { size: 14, w: 700, a: "middle", f: "d" }); });
  ["minutes", "hours", "days", "days to weeks"].forEach((n, i) => { b += S.t(xs[i] + 62, 240, n, { size: 12, a: "middle", c: "ink-3" }); });
  b += S.arrow(20, 262, 580, 262, "spec", 1.5) + S.t(300, 280, "fidelity and cost of change", { size: 12, a: "middle", c: "spec", w: 600 });
  return S.svg(600, 290, b, "Four stages from sketch to prototype");
});

FIG("fig-gestalt", "Six ways the eye groups things before you read a word. Every layout uses these whether you plan it or not.", () => {
  let b = ""; const W = 190, H = 150;
  const cell = (i, title, draw) => { const x = 10 + (i % 3) * (W + 10), y = 10 + Math.floor(i / 3) * (H + 40); b += S.r(x, y, W, H, "paper", "rule", 8) + draw(x, y) + S.t(x + W / 2, y + H + 24, title, { size: 15, w: 700, a: "middle", f: "d" }); };
  cell(0, "Proximity", (x, y) => { let g = ""; for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) g += S.c(x + 30 + c * 18 + (c >= 3 ? 30 : 0), y + 45 + r * 20, 5, "ink-2"); return g; });
  cell(1, "Similarity", (x, y) => { let g = ""; for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) g += S.c(x + 45 + c * 20, y + 45 + r * 20, 5, c % 2 ? "spec" : "ink-3"); return g; });
  cell(2, "Closure", (x, y) => { let g = ""; const cx = x + 95, cy = y + 75; for (let k = 0; k < 8; k++) { const a0 = k * Math.PI / 4 + 0.12, a1 = a0 + Math.PI / 4 - 0.24; g += S.p(`M${cx + 45 * Math.cos(a0)} ${cy + 45 * Math.sin(a0)} A45 45 0 0 1 ${cx + 45 * Math.cos(a1)} ${cy + 45 * Math.sin(a1)}`, null, "ink-2", 6); } return g; });
  cell(3, "Continuity", (x, y) => S.p(`M${x + 20} ${y + 120} C ${x + 70} ${y + 10}, ${x + 120} ${y + 10}, ${x + 170} ${y + 120}`, null, "ink-2", 3) + S.p(`M${x + 20} ${y + 40} C ${x + 70} ${y + 140}, ${x + 120} ${y + 140}, ${x + 170} ${y + 40}`, null, "spec", 3));
  cell(4, "Common region", (x, y) => { let g = S.r(x + 22, y + 32, 70, 86, "accent-soft", "accent", 8, 1.2); for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) g += S.c(x + 40 + c * 22, y + 55 + r * 20, 5, "ink-2"); return g; });
  cell(5, "Figure and ground", (x, y) => S.r(x + 10, y + 10, W - 20, H - 20, "ink", null, 4) + S.p(`M${x + 70} ${y + 30} h50 l-8 30 q -12 15 0 30 l 8 30 h-50 l 8 -30 q 12 -15 0 -30 z`, "paper", null));
  return S.svg(600, 390, b, "Six panels illustrating proximity, similarity, closure, continuity, common region and figure-ground");
});

FIG("fig-hierarchy", "Same content, same space. On the left everything shouts at the same volume. On the right, size, weight and colour set a reading order before you read a word.", () => {
  let b = "";
  const card = (x, good) => {
    let g = S.r(x, 20, 260, 250, "surface", "rule-strong", 12) + S.r(x + 16, 36, 228, 96, "sunk", null, 8);
    if (!good) {
      g += S.t(x + 16, 158, "Linen shirt", { size: 15, w: 600 }) + S.t(x + 16, 180, "£48.00", { size: 15, w: 600 }) + S.t(x + 16, 202, "Free returns · 4.6 stars (210)", { size: 15, w: 600 }) + S.r(x + 16, 220, 228, 34, "surface", "rule-strong", 6) + S.t(x + 130, 242, "Add to bag", { size: 15, w: 600, a: "middle" });
    } else {
      g += S.t(x + 16, 162, "Linen shirt", { size: 21, w: 750, f: "d" }) + S.t(x + 16, 186, "£48", { size: 17, w: 700 }) + S.t(x + 64, 186, "Free returns · 4.6 ★ (210)", { size: 12.5, c: "ink-3" }) + S.r(x + 16, 214, 228, 40, "ink", null, 8) + S.t(x + 130, 239, "Add to bag", { size: 15, w: 700, a: "middle", c: "on-ink" });
      [[x + 250, 156, "1"], [x + 250, 182, "2"], [x + 250, 236, "3"], [x + 250, 206, "4"]].forEach(([cx, cy, n]) => { g += S.c(cx + 14, cy - 5, 10, "spec") + S.t(cx + 14, cy, n, { size: 12, w: 700, a: "middle", c: "surface" }); });
    }
    g += S.t(x + 130, 296, good ? "Clear reading order" : "Everything equal", { size: 14, w: 700, a: "middle", c: good ? "good" : "bad" });
    return g;
  };
  b += card(20, false) + card(320, true);
  return S.svg(620, 310, b, "Two product cards, one flat and one with clear hierarchy");
});

FIG("fig-reading-patterns", "Two scanning patterns found in eye-tracking research. Dense text pages get an F: people read the first lines, then skim down the left edge. Sparse pages with a few big elements get a Z.", () => {
  let b = "";
  b += S.r(20, 20, 270, 250, "surface", "rule-strong", 8) + S.lines(40, 44, 230, 12, 17, "rule", 7, true, 9);
  b += `<rect x="40" y="38" width="230" height="20" rx="4" style="fill:var(--spec);opacity:.22"/><rect x="40" y="72" width="150" height="20" rx="4" style="fill:var(--spec);opacity:.22"/><rect x="40" y="38" width="36" height="215" rx="4" style="fill:var(--spec);opacity:.18"/>`;
  b += S.t(155, 295, "F-pattern: text-heavy pages", { size: 14, w: 700, a: "middle", f: "d" });
  b += S.r(330, 20, 270, 250, "surface", "rule-strong", 8) + S.r(350, 40, 50, 14, "ink-3", null, 3) + S.r(500, 40, 80, 14, "rule-strong", null, 3) + S.r(350, 110, 230, 60, "sunk", null, 6) + S.r(350, 225, 60, 24, "rule-strong", null, 4) + S.r(500, 222, 80, 30, "ink", null, 6);
  b += S.p("M375 47 L540 47 L380 237 L540 237", null, "spec", 2.5, 'stroke-dasharray="6 5"');
  b += S.t(465, 295, "Z-pattern: simple, sparse pages", { size: 14, w: 700, a: "middle", f: "d" });
  return S.svg(620, 305, b, "An F-shaped scanning pattern on a text page and a Z-shaped pattern on a sparse page");
});

FIG("fig-grid-anatomy", "A 12-column grid. Columns hold content, gutters separate it, margins frame it. Elements span whole columns, which is why grid layouts feel aligned even when nothing is centred.", () => {
  let b = S.r(10, 10, 600, 300, "surface", "rule-strong", 6);
  const m = 40, g = 16, n = 12, cw = (600 - 2 * m - (n - 1) * g) / n;
  for (let i = 0; i < n; i++) b += `<rect x="${10 + m + i * (cw + g)}" y="10" width="${cw}" height="300" style="fill:var(--spec);opacity:.12"/>`;
  const col = (i, span) => [10 + m + i * (cw + g), span * cw + (span - 1) * g];
  let [x, w] = col(0, 12); b += S.r(x, 40, w, 70, "sunk", "rule-strong", 4, 1);
  [[0, 4], [4, 4], [8, 4]].forEach(([i, s]) => { [x, w] = col(i, s); b += S.r(x, 130, w, 80, "sunk", "rule-strong", 4, 1); });
  [x, w] = col(0, 8); b += S.r(x, 230, w, 50, "sunk", "rule-strong", 4, 1);
  [x, w] = col(8, 4); b += S.r(x, 230, w, 50, "sunk", "rule-strong", 4, 1);
  b += S.hd(10, 10 + m, 324, "margin");
  const gx = 10 + m + cw; b += S.hd(gx, gx + g, 26, "gutter");
  b += S.hd(10 + m + cw + g, 10 + m + 2 * cw + g, 324, "column");
  b += S.t(310, 80, "spans 12", { size: 13, a: "middle", c: "ink-2", w: 600 }) + S.t(col(0, 4)[0] + col(0, 4)[1] / 2, 175, "spans 4", { size: 13, a: "middle", c: "ink-2", w: 600 });
  return S.svg(620, 340, b, "A page with 12 translucent columns, gutters and margins marked");
});

FIG("fig-spacing-rule", "Space says what belongs together. Inside a card, related things sit closer than unrelated things, and the space inside a group is smaller than the space between groups.", () => {
  let b = "";
  const card = x => S.r(x, 40, 230, 200, "surface", "rule-strong", 12) + S.r(x + 24, 64, 182, 60, "sunk", null, 6) + S.r(x + 24, 140, 120, 14, "ink", null, 3) + S.r(x + 24, 162, 170, 8, "rule-strong", null, 3) + S.r(x + 24, 176, 140, 8, "rule-strong", null, 3) + S.r(x + 24, 200, 80, 16, "ink-2", null, 4);
  b += card(30) + card(292);
  b += S.hd(30, 54, 30, "24") + S.vd(222, 154, 162, "8", 1) + S.vd(222, 184, 200, "16", 1) + S.hd(260, 292, 140, "32");
  b += S.t(130, 268, "inside a card: 8 and 16", { size: 13.5, a: "middle", c: "ink-2" }) + S.t(407, 268, "between cards: 32", { size: 13.5, a: "middle", c: "ink-2" });
  b += S.t(275, 296, "internal space ≤ external space", { size: 15, w: 700, a: "middle", f: "d", c: "spec" });
  return S.svg(560, 310, b, "Two cards with spacing redlines showing 8, 16, 24 and 32 pixel gaps");
});

FIG("fig-box-model", "Every element on a web page is a box. Content sits inside padding, padding inside a border, and margin pushes neighbours away.", () => {
  let b = "";
  b += `<rect x="20" y="20" width="560" height="280" rx="4" style="fill:var(--spec-soft);stroke:var(--spec);stroke-width:1;stroke-dasharray:5 4"/>`;
  b += S.r(70, 60, 460, 200, "warn-soft", "warn", 4, 4);
  b += S.r(76, 66, 448, 188, "accent-soft", null, 2);
  b += S.r(140, 110, 320, 100, "surface", "accent", 2, 1);
  b += S.t(300, 156, "content", { size: 18, w: 700, a: "middle", f: "d" }) + S.t(300, 180, "width × height", { size: 13, a: "middle", c: "ink-2" });
  b += S.t(32, 44, "margin", { size: 13, w: 700, c: "spec" }) + S.t(84, 86, "border", { size: 13, w: 700, c: "warn" }) + S.t(88, 102, "", {}) + S.t(150, 100, "padding", { size: 13, w: 700, c: "accent" });
  b += S.hd(76, 140, 236, "padding") + S.vd(300, 20, 60, "margin", 1);
  return S.svg(600, 320, b, "Nested boxes labelled margin, border, padding and content");
});

FIG("fig-hsl", "HSL is easy to reason about but lies about brightness. Pure yellow and pure blue share the same HSL lightness, yet one is nearly white to the eye. OKLCH's lightness tracks what you actually see.", () => {
  let b = "";
  let stops = ""; for (let i = 0; i <= 12; i++) stops += `<stop offset="${i / 12}" stop-color="${Color.hsl(i * 30, 90, 50)}"/>`;
  b += `<defs><linearGradient id="fhsl-h">${stops}</linearGradient><linearGradient id="fhsl-s"><stop offset="0" stop-color="${Color.hsl(220, 0, 50)}"/><stop offset="1" stop-color="${Color.hsl(220, 100, 50)}"/></linearGradient><linearGradient id="fhsl-l"><stop offset="0" stop-color="#000"/><stop offset=".5" stop-color="${Color.hsl(220, 90, 50)}"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>`;
  [["Hue", "fhsl-h", "0° to 360°, the colour family"], ["Saturation", "fhsl-s", "grey to vivid"], ["Lightness", "fhsl-l", "black to white"]].forEach(([n, id, d], i) => {
    const y = 24 + i * 58; b += S.t(20, y + 14, n, { size: 15, w: 700, f: "d" }) + S.t(20, y + 32, d, { size: 12, c: "ink-3" }) + `<rect x="200" y="${y}" width="380" height="34" rx="6" fill="url(#${id})" style="stroke:var(--rule-strong);stroke-width:1"/>`;
  });
  const sw = (x, hex, name) => { const o = Color.toOklch(hex); return `<rect x="${x}" y="210" width="120" height="70" rx="8" fill="${hex}" style="stroke:var(--rule-strong);stroke-width:1"/>` + S.t(x, 300, name, { size: 13, w: 700 }) + S.t(x, 318, "HSL lightness 50%", { size: 12, c: "ink-2" }) + S.t(x, 336, "OKLCH lightness " + Math.round(o.l * 100) + "%", { size: 12, c: "spec", w: 600 }); };
  b += sw(200, "#FFFF00", "Yellow") + sw(360, "#0000FF", "Blue");
  b += S.t(20, 240, "Same number,", { size: 14, w: 700 }) + S.t(20, 258, "different brightness", { size: 14, w: 700 });
  return S.svg(600, 350, b, "Hue, saturation and lightness bars, plus yellow and blue swatches with equal HSL lightness");
});

FIG("fig-color-scale", "One hue, eleven steps. Light steps make backgrounds and borders, the middle carries brand and buttons, dark steps carry text. Name colours by step so the system scales.", () => {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const Ls = [0.975, 0.945, 0.89, 0.81, 0.71, 0.62, 0.54, 0.47, 0.40, 0.33, 0.25];
  const Cs = [0.013, 0.03, 0.06, 0.1, 0.15, 0.18, 0.19, 0.17, 0.14, 0.11, 0.08];
  let b = ""; const w = 52;
  steps.forEach((s, i) => { const hex = Color.oklch(Ls[i], Cs[i], 262); const x = 10 + i * (w + 2); b += `<rect x="${x}" y="20" width="${w}" height="90" rx="${i === 0 ? 8 : i === 10 ? 8 : 0}" fill="${hex}"/>` + S.t(x + w / 2, 132, String(s), { size: 13, w: 700, a: "middle", f: "m" }); });
  const role = (i, label, y) => { const x = 10 + i * (w + 2) + w / 2; return S.l(x, 142, x, y - 14, "spec", 1) + S.c(x, 142, 3, "spec") + S.t(x, y, label, { size: 12.5, a: "middle", c: "spec", w: 600 }); };
  b += role(0, "page tint", 170) + role(2, "border", 196) + role(6, "button", 170) + role(7, "hover", 196) + role(9, "text", 170);
  return S.svg(600, 210, b, "An eleven step blue scale from 50 to 950 with roles marked");
});

FIG("fig-60-30-10", "A starting proportion, not a law: about 60% neutral surface, 30% supporting colour, 10% accent. The accent stays powerful because it is rare.", () => {
  let b = S.r(20, 20, 360, 240, "paper", "rule-strong", 10);
  b += `<rect x="20" y="20" width="110" height="240" rx="10" fill="#1F3A5F"/><rect x="120" y="20" width="10" height="240" fill="#1F3A5F"/>`;
  b += `<rect x="36" y="46" width="70" height="10" rx="3" fill="#C9D6E8"/><rect x="36" y="70" width="60" height="8" rx="3" fill="#7F98B8"/><rect x="36" y="88" width="66" height="8" rx="3" fill="#7F98B8"/><rect x="36" y="106" width="50" height="8" rx="3" fill="#7F98B8"/>`;
  b += S.r(150, 44, 140, 14, "ink", null, 3) + S.lines(150, 72, 210, 4, 14, "rule-strong", 6, true, 5) + S.r(150, 140, 100, 80, "surface", "rule", 8) + S.r(262, 140, 100, 80, "surface", "rule", 8);
  b += `<rect x="150" y="232" width="96" height="16" rx="5" fill="#F2A007"/>`;
  b += `<rect x="410" y="20" width="40" height="144" fill="var(--paper)" style="stroke:var(--rule-strong)"/><rect x="410" y="164" width="40" height="72" fill="#1F3A5F"/><rect x="410" y="236" width="40" height="24" fill="#F2A007"/>`;
  b += S.t(462, 96, "60% neutral", { size: 13.5, w: 700 }) + S.t(462, 204, "30% supporting", { size: 13.5, w: 700 }) + S.t(462, 252, "10% accent", { size: 13.5, w: 700 });
  return S.svg(600, 280, b, "A UI mock coloured mostly neutral, partly navy and a small orange accent, with a proportion bar");
});

FIG("fig-contrast-ladder", "The same grey text getting darker. WCAG's minimum for body text is 4.5:1; large text and meaningful UI parts need 3:1. Below that, people with low vision, glare or a cheap screen lose the words.", () => {
  const greys = ["#B3B3B3", "#959595", "#767676", "#595959", "#000000"];
  let b = `<rect x="10" y="10" width="580" height="190" rx="10" fill="#FFFFFF" style="stroke:var(--rule-strong);stroke-width:1"/>`;
  greys.forEach((g, i) => {
    const x = 30 + i * 112, r = Color.contrast(g, "#FFFFFF");
    const verdict = r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "large text only" : "fails";
    b += `<text x="${x}" y="80" font-size="44" font-weight="700" fill="${g}" style="font-family:var(--f-display)">Aa</text>`;
    b += `<text x="${x}" y="108" font-size="13" fill="${g}">The quick fox</text>`;
    b += `<text x="${x}" y="145" font-size="16" font-weight="700" fill="#14161B" style="font-family:var(--f-mono)">${Color.ratioText(r)}</text>`;
    b += `<text x="${x}" y="166" font-size="12.5" fill="${r >= 4.5 ? "#0F6E47" : r >= 3 ? "#855400" : "#B3261E"}" font-weight="600">${verdict}</text>`;
  });
  return S.svg(600, 210, b, "Five grey text samples on white with their contrast ratios");
});

FIG("fig-type-anatomy", "The vertical metrics every typeface is built on. Text sits on the baseline; the x-height decides how big a font looks at a given size; ascenders and descenders reach above and below.", () => S.svg(640, 290, `<g data-anat></g>`, "The word Highway with baseline, x-height, cap height, ascender and descender lines"), el => {
  const g = $("[data-anat]", el); if (!g) return;
  const fam = "'Source Serif 4', Georgia, serif";
  const draw = () => {
    const size = 150, base = 200, x0 = 30;
    const cv = document.createElement("canvas").getContext("2d"); cv.font = `500 ${size}px ${fam}`;
    const m = ch => cv.measureText(ch);
    const xh = m("x").actualBoundingBoxAscent, cap = m("H").actualBoundingBoxAscent, asc = m("h").actualBoundingBoxAscent, desc = m("g").actualBoundingBoxDescent;
    const wpre = s => cv.measureText(s).width;
    const word = "Highway";
    const lines = [[base - asc, "ascender", "spec", true], [base - cap, "cap height", "spec", false], [base - xh, "x-height", "spec", false], [base, "baseline", "spec", false], [base + desc, "descender", "spec", true]];
    let b = `<text x="${x0}" y="${base}" font-size="${size}" font-weight="500" style="fill:var(--ink);font-family:${fam}">${word}</text>`;
    lines.forEach(([y, lab, c, dash]) => { if (Math.abs(y - (base - cap)) < 3 && lab === "ascender") return; b += S.l(10, y, 630, y, c, 1, dash ? 'stroke-dasharray="5 4"' : "") + `<rect x="${632 - lab.length * 7.2 - 10}" y="${y - 18}" width="${lab.length * 7.2 + 8}" height="16" rx="3" style="fill:var(--surface)"/>` + S.t(628, y - 5, lab, { size: 12.5, a: "end", c: "spec", w: 600 }); });
    // x-height bracket on the "a"
    const ax = x0 + wpre("Highw"); const aw = wpre("Highwa") - wpre("Highw");
    b += S.vd(ax + aw + 6, base - xh, base, "x", 1);
    // descender pointer on g
    const gx = x0 + wpre("Hi") + (wpre("Hig") - wpre("Hi")) / 2;
    b += S.c(gx, base + desc * 0.6, 4, "spec") + S.l(gx, base + desc * 0.6, gx + 10, base + desc + 18, "spec", 1) + S.t(gx + 12, base + desc + 30, "descender", { size: 12.5, c: "spec", w: 600 });
    g.innerHTML = b;
  };
  draw();
  if (document.fonts && document.fonts.load) document.fonts.load('500 150px "Source Serif 4"').then(draw).catch(() => {});
});

FIG("fig-type-scale", "A modular scale multiplies a base size by one ratio. Here the base is 16 and the ratio is 1.25, so every step relates to the others and you stop guessing sizes.", () => {
  let b = ""; let y = 30; const sizes = [];
  for (let i = -1; i <= 5; i++) sizes.push(16 * Math.pow(1.25, i));
  sizes.reverse().forEach((s, i) => {
    y += s * 1.05 + 8;
    b += S.t(20, y, "Aa", { size: s, w: 700, f: "d" }) + S.t(130, y - 2, s.toFixed(1) + " px", { size: 13, c: "spec", f: "m", w: 600 }) + S.t(230, y - 2, ["display", "h1", "h2", "h3", "h4", "body", "small"][i], { size: 13, c: "ink-2" });
  });
  return S.svg(600, y + 20, b, "A type scale from 12.8 to 48.8 pixels at ratio 1.25");
});

FIG("fig-line-length", "Measure is the length of a line of text. Short lines make the eye jump back too often; long lines make it hard to find the start of the next one. Aim for roughly 45 to 75 characters.", () => {
  let b = "";
  const block = (x, w, label, sub, ok) => S.lines(x, 30, w, 8, 14, ok ? "ink-3" : "rule-strong", 6, true, w) + S.t(x, 160, label, { size: 14, w: 700, f: "d", c: ok ? "good" : "ink" }) + S.t(x, 178, sub, { size: 12.5, c: "ink-2" });
  b += block(20, 70, "Too short", "~20 characters", false) + block(120, 210, "Comfortable", "~65 characters", true) + block(360, 230, "", "", false);
  b += S.r(360, 30, 230, 110, "paper", null, 0) + S.lines(360, 30, 230, 8, 14, "rule-strong", 6, true, 99) + S.t(360, 160, "Too long", { size: 14, w: 700, f: "d" }) + S.t(360, 178, "~110 characters", { size: 12.5, c: "ink-2" });
  b += S.hd(120, 330, 16, "45–75 ch");
  return S.svg(600, 190, b, "Three text blocks showing short, comfortable and long line lengths");
});

FIG("fig-icon-grid", "Icons are drawn on a grid, commonly 24 by 24 with a 2 pixel stroke and 2 pixels of padding. Keyline shapes give a circle, a square and rectangles the same visual weight.", () => {
  let b = ""; const s = 11, ox = 20, oy = 20;
  for (let i = 0; i <= 24; i++) { b += S.l(ox + i * s, oy, ox + i * s, oy + 24 * s, i % 4 ? "rule" : "rule-strong", 1) + S.l(ox, oy + i * s, ox + 24 * s, oy + i * s, i % 4 ? "rule" : "rule-strong", 1); }
  b += `<rect x="${ox + 2 * s}" y="${oy + 2 * s}" width="${20 * s}" height="${20 * s}" style="fill:none;stroke:var(--spec);stroke-width:1;stroke-dasharray:4 3"/>`;
  b += S.c(ox + 12 * s, oy + 12 * s, 10 * s, null, "accent", 1) + `<rect x="${ox + 3 * s}" y="${oy + 3 * s}" width="${18 * s}" height="${18 * s}" rx="${2 * s}" style="fill:none;stroke:var(--accent);stroke-width:1"/>`;
  // bell icon at 24 grid, 2px stroke
  const k = v => v * s;
  b += `<g transform="translate(${ox},${oy})" style="fill:none;stroke:var(--ink);stroke-width:${2 * s};stroke-linecap:round;stroke-linejoin:round;opacity:.85"><path d="M${k(6)} ${k(16)}V${k(11)}a${k(6)} ${k(6)} 0 0 1 ${k(12)} 0v${k(5)}l${k(1.5)} ${k(2)}H${k(4.5)}z"/><path d="M${k(10)} ${k(20.5)}a${k(2)} ${k(2)} 0 0 0 ${k(4)} 0"/></g>`;
  b += S.t(310, 50, "24 × 24 grid", { size: 15, w: 700, f: "d" }) + S.t(310, 72, "2 px live-area padding (dashed)", { size: 13, c: "ink-2" }) + S.t(310, 92, "2 px stroke, round caps", { size: 13, c: "ink-2" }) + S.t(310, 112, "keyline circle and square (blue)", { size: 13, c: "ink-2" });
  const icons = ['<path d="M4 11l8-7 8 7v9H4z"/>', '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>', '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/>', '<circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>'];
  icons.forEach((d, i) => { b += `<g transform="translate(${310 + i * 60},150) scale(1.75)" style="fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round;stroke-linejoin:round">${d}</g>`; });
  b += S.t(310, 215, "A consistent set: same grid, stroke, corners", { size: 13, c: "ink-2" });
  return S.svg(600, 300, b, "A 24 by 24 icon grid with keylines and a bell icon, plus four consistent icons");
});

FIG("fig-elevation", "Elevation tells you what is on top. Higher surfaces cast bigger, softer shadows from one consistent light source above.", () => {
  let b = `<defs>${[0, 1, 2, 3].map(i => `<filter id="fel${i}" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="${[0, 1, 4, 12][i]}" stdDeviation="${[0, 1.5, 5, 14][i]}" flood-color="#0B1020" flood-opacity="${[0, .18, .16, .2][i]}"/></filter>`).join("")}</defs>`;
  [0, 1, 2, 3].forEach(i => { const x = 24 + i * 145; b += `<rect x="${x}" y="${70 - i * 6}" width="118" height="110" rx="12" style="fill:var(--surface);stroke:var(--rule);stroke-width:${i ? 0 : 1}" filter="url(#fel${i})"/>` + S.t(x + 59, 215, "Level " + i, { size: 14, w: 700, a: "middle", f: "d" }) + S.t(x + 59, 233, ["flat, bordered", "cards", "menus, popovers", "dialogs"][i], { size: 12.5, a: "middle", c: "ink-2" }); });
  b += S.arrow(300, 14, 300, 46, "spec", 1.5) + S.t(310, 30, "light from above", { size: 12, c: "spec", w: 600 });
  return S.svg(600, 250, b, "Four cards at increasing elevation with larger shadows");
});

FIG("fig-nested-radius", "Nested corners look right when inner radius = outer radius minus the gap between them. The same radius inside and out makes the gap look pinched at the corners.", () => {
  let b = "";
  b += S.r(30, 40, 240, 160, "sunk", "rule-strong", 24) + S.r(46, 56, 208, 128, "surface", "accent", 8, 1.5) + S.t(150, 230, "Outer 24, gap 16, inner 8", { size: 13.5, a: "middle", w: 700 }) + S.t(150, 250, "Corners stay parallel", { size: 12.5, a: "middle", c: "good", w: 600 });
  b += S.r(330, 40, 240, 160, "sunk", "rule-strong", 24) + S.r(346, 56, 208, 128, "surface", "bad", 24, 1.5) + S.t(450, 230, "Outer 24, gap 16, inner 24", { size: 13.5, a: "middle", w: 700 }) + S.t(450, 250, "Gap bulges at the corners", { size: 12.5, a: "middle", c: "bad", w: 600 });
  b += S.hd(30, 46, 28, "16") + S.hd(330, 346, 28, "16");
  return S.svg(600, 262, b, "Two nested rounded rectangles, one with matched radii and one mismatched");
});

FIG("fig-button-states", "One button, seven states. Each state answers a question the user is silently asking: can I press this, did it notice me, is it working, did it work?", () => {
  let b = "";
  const states = [["Default", "ink", "on-ink", ""], ["Hover", "ink-2", "on-ink", ""], ["Focus", "ink", "on-ink", "focus"], ["Pressed", "ink", "on-ink", "press"], ["Disabled", "sunk", "ink-3", ""], ["Loading", "ink", "on-ink", "load"], ["Error", "bad", "surface", ""]];
  states.forEach(([n, f, tc, extra], i) => {
    const col = i % 4, row = Math.floor(i / 4), x = 20 + col * 145, y = 30 + row * 110;
    if (extra === "focus") b += S.r(x - 4, y - 4, 128, 52, null, "sel", 12, 2.5);
    b += S.r(x, y + (extra === "press" ? 2 : 0), 120, 44, f, null, 8);
    if (extra === "load") b += S.p(`M${x + 50} ${y + 22} a8 8 0 1 1 8 8`, null, "on-ink", 2.4) + S.t(x + 66, y + 27, "Saving", { size: 13, w: 700, c: tc });
    else b += S.t(x + 60, y + 27 + (extra === "press" ? 2 : 0), n === "Error" ? "Retry" : "Save", { size: 14, w: 700, a: "middle", c: tc });
    b += S.t(x + 60, y + 70, n, { size: 13, a: "middle", c: "ink-2", w: 600 });
  });
  return S.svg(600, 250, b, "Seven button states: default, hover, focus, pressed, disabled, loading and error");
});

FIG("fig-token-tiers", "Tokens in three tiers. Primitives are the raw values, semantic tokens say what a value is for, component tokens say where it is used. Change a primitive and every layer above follows.", () => {
  let b = "";
  const box = (x, y, t, s, f = "surface") => S.r(x, y, 170, 54, f, "rule-strong", 8) + S.t(x + 12, y + 22, t, { size: 13, w: 700, f: "m" }) + S.t(x + 12, y + 41, s, { size: 12, c: "ink-2" });
  [["Primitive", 20], ["Semantic", 215], ["Component", 410]].forEach(([n, x]) => { b += S.t(x, 24, n, { size: 15, w: 700, f: "d", c: "spec" }); });
  b += box(20, 40, "blue-600", "#2B57D6") + box(215, 40, "action-primary", "main buttons, links") + box(410, 40, "button-bg", "primary button fill");
  b += box(20, 120, "grey-900", "#16181D") + box(215, 120, "text-default", "body copy") + box(410, 120, "card-title", "card heading text");
  b += box(20, 200, "red-600", "#C62828") + box(215, 200, "status-danger", "errors, destructive") + box(410, 200, "alert-icon", "error alert icon");
  [67, 147, 227].forEach(y => { b += S.arrow(192, y, 213, y, "ink-3", 1.5) + S.arrow(387, y, 408, y, "ink-3", 1.5); });
  b += `<rect x="178" y="56" width="8" height="8" rx="2" fill="#2B57D6"/><rect x="178" y="136" width="8" height="8" rx="2" fill="#16181D"/><rect x="178" y="216" width="8" height="8" rx="2" fill="#C62828"/>`;
  return S.svg(600, 270, b, "Three columns of tokens: primitive, semantic, component, with arrows between them");
});

FIG("fig-form-anatomy", "The parts of a good form field. The label stays visible while typing, the hint prevents errors, and the error says what to do in words, not only in red.", () => {
  let b = "";
  b += S.t(40, 50, "Email address", { size: 15, w: 700 }) + S.t(40, 72, "We'll send your receipt here", { size: 13, c: "ink-2" });
  b += S.r(40, 84, 320, 46, "surface", "bad", 8, 2) + S.t(56, 113, "sam@gmail", { size: 15 });
  b += S.p("M42 152 l7 -12 l7 12 z", "bad", null) + S.t(64, 152, "Enter an email address like name@example.com", { size: 13, c: "bad", w: 600 });
  const call = (y, x, label) => S.l(x, y, 400, y, "spec", 1) + S.c(x, y, 3, "spec") + S.t(408, y + 4, label, { size: 13, c: "spec", w: 600 });
  b += call(45, 160, "Label: always visible") + call(68, 245, "Hint: prevents the error") + call(107, 360, "Input: sized for the answer") + call(148, 380, "Error: what to do, with an icon");
  return S.svg(600, 180, b, "An email form field with label, hint, input and error message annotated");
});

FIG("fig-easing", "Each curve plots progress against time. The dots are equal slices of time: where dots bunch, the motion is slow. Ease-out starts fast and settles, which feels responsive for things entering the screen.", () => {
  let b = "";
  const curves = [["Linear", [0, 0, 1, 1]], ["Ease in", [0.42, 0, 1, 1]], ["Ease out", [0, 0, 0.58, 1]], ["Ease in-out", [0.42, 0, 0.58, 1]]];
  const bez = (p, t) => { const [x1, y1, x2, y2] = p; const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by; const X = s => ((ax * s + bx) * s + cx) * s, Y = s => ((ay * s + by) * s + cy) * s; let lo = 0, hi = 1; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (X(m) < t) lo = m; else hi = m; } return Y((lo + hi) / 2); };
  curves.forEach(([n, p], i) => {
    const x = 20 + i * 145, y = 20, w = 120, hh = 120;
    b += S.r(x, y, w, hh, "paper", "rule", 6) + S.p(`M${x} ${y + hh} C ${x + p[0] * w} ${y + hh - p[1] * hh}, ${x + p[2] * w} ${y + hh - p[3] * hh}, ${x + w} ${y}`, null, "accent", 2.5);
    for (let k = 0; k <= 10; k++) { const v = bez(p, k / 10); b += S.c(x + v * w, y + hh + 22, 3.2, "spec"); }
    b += S.l(x, y + hh + 22, x + w, y + hh + 22, "rule", 1) + S.t(x + w / 2, y + hh + 52, n, { size: 14, w: 700, a: "middle", f: "d" });
  });
  return S.svg(600, 200, b, "Four easing curves with dots showing position at equal time steps");
});

FIG("fig-fitts", "Fitts's law: the time to hit a target grows with distance and shrinks with size. Big, close targets are fast; small, far ones are slow. Screen edges and corners act as targets with infinite depth for a mouse.", () => {
  let b = S.r(10, 10, 580, 220, "paper", "rule", 10);
  b += S.p("M60 120 l0 22 l6 -6 l5 10 l4 -2 l-5 -10 l8 0 z", "ink", "surface", 1.2);
  b += S.r(150, 95, 120, 50, "good-soft", "good", 8, 1.5) + S.t(210, 125, "big, near", { size: 13, a: "middle", w: 700, c: "good" });
  b += S.r(510, 60, 22, 22, "bad-soft", "bad", 4, 1.5) + S.t(521, 102, "small, far", { size: 13, a: "middle", w: 700, c: "bad" });
  b += S.l(75, 125, 150, 120, "ink-3", 1, 'stroke-dasharray="4 4"') + S.l(75, 125, 510, 72, "ink-3", 1, 'stroke-dasharray="4 4"');
  b += S.hd(75, 150, 170, "D") + S.vd(286, 95, 145, "W", 1);
  b += S.t(300, 210, "time ≈ a + b · log2(D / W + 1)", { size: 15, a: "middle", w: 700, f: "m" });
  return S.svg(600, 240, b, "A cursor with a large near target and a small far target");
});

FIG("fig-page-anatomy", "The usual parts of a web page. People recognise them instantly, which frees their attention for your content. Break the pattern only with a reason.", () => {
  let b = S.r(20, 10, 340, 330, "surface", "rule-strong", 8);
  b += S.r(20, 10, 340, 40, "sunk", null, 8) + S.r(36, 24, 46, 12, "ink", null, 3) + S.r(160, 26, 30, 8, "ink-3", null, 2) + S.r(198, 26, 30, 8, "ink-3", null, 2) + S.r(236, 26, 30, 8, "ink-3", null, 2) + S.r(290, 21, 54, 18, "ink", null, 5);
  b += S.r(36, 66, 200, 16, "ink", null, 3) + S.r(36, 90, 160, 8, "rule-strong", null, 3) + S.r(36, 104, 130, 8, "rule-strong", null, 3) + S.r(36, 122, 70, 20, "ink", null, 5) + S.r(250, 62, 94, 86, "accent-soft", null, 6);
  for (let i = 0; i < 3; i++) b += S.r(36 + i * 104, 170, 96, 70, "sunk", null, 6);
  b += S.r(36, 256, 308, 30, "sunk", null, 6);
  b += S.r(20, 300, 340, 40, "ink-2", null, 0) + S.r(36, 314, 60, 8, "rule-strong", null, 2) + S.r(130, 314, 60, 8, "rule-strong", null, 2);
  const call = (y, label, sub) => S.l(362, y, 392, y, "spec", 1) + S.c(362, y, 3, "spec") + S.t(400, y + 4, label, { size: 14, w: 700 }) + S.t(400, y + 21, sub, { size: 12.5, c: "ink-2" });
  b += call(30, "Header", "logo, navigation, one main action") + call(105, "Hero", "what it is, who it's for, the next step") + call(205, "Sections", "proof, features, detail, in order") + call(271, "Closing call to action", "repeat the main action") + call(320, "Footer", "secondary links, legal, contact");
  return S.svg(620, 350, b, "A web page wireframe with header, hero, sections, call to action and footer labelled");
});

FIG("fig-breakpoints", "One layout, three widths. Breakpoints belong where the content starts to look wrong, not at the size of a particular phone.", () => {
  let b = "";
  const frame = (x, w, cols, label, sub) => {
    let g = S.r(x, 20, w, 220, "surface", "rule-strong", 10) + S.r(x + 10, 32, w - 20, 16, "sunk", null, 4);
    const inner = w - 20, gap = 8, cw = (inner - (cols - 1) * gap) / cols;
    for (let r = 0; r < Math.ceil(6 / cols); r++) for (let c = 0; c < cols; c++) { const idx = r * cols + c; if (idx >= 6) break; g += S.r(x + 10 + c * (cw + gap), 58 + r * (cols === 1 ? 30 : cols === 2 ? 56 : 80), cw, cols === 1 ? 24 : cols === 2 ? 48 : 70, "accent-soft", null, 4); }
    return g + S.t(x + w / 2, 262, label, { size: 14, w: 700, a: "middle", f: "d" }) + S.t(x + w / 2, 280, sub, { size: 12.5, a: "middle", c: "ink-2" });
  };
  b += frame(20, 100, 1, "Phone", "1 column") + frame(150, 180, 2, "Tablet", "2 columns") + frame(360, 230, 3, "Desktop", "3 columns");
  return S.svg(610, 290, b, "The same content in one, two and three columns at phone, tablet and desktop widths");
});

FIG("fig-thumb-zone", "Where a right thumb reaches on a phone held in one hand. The bottom middle is easy, the top corners are a stretch. Put frequent actions low, and keep destructive ones out of the easy zone.", () => {
  let b = `<defs><clipPath id="ftz"><rect x="190" y="20" width="220" height="420" rx="30"/></clipPath></defs>`;
  b += S.r(190, 20, 220, 420, "surface", "ink-2", 30, 2);
  b += `<g clip-path="url(#ftz)"><rect x="190" y="20" width="220" height="420" style="fill:var(--bad-soft)"/><circle cx="420" cy="450" r="260" style="fill:var(--warn-soft)"/><circle cx="420" cy="450" r="175" style="fill:var(--good-soft)"/></g>`;
  b += S.r(190, 20, 220, 420, null, "ink-2", 30, 2);
  b += S.t(230, 70, "Stretch", { size: 14, w: 700, c: "bad" }) + S.t(222, 250, "OK", { size: 14, w: 700, c: "warn" }) + S.t(320, 370, "Easy", { size: 14, w: 700, c: "good" });
  b += S.c(300, 412, 20, "ink") + S.p("M292 412 h16 M300 404 v16", null, "on-ink", 2);
  b += S.t(430, 400, "frequent action", { size: 12.5, c: "ink-2" }) + S.l(426, 396, 322, 410, "spec", 1);
  return S.svg(600, 460, b, "A phone with easy, ok and stretch zones for the right thumb");
});

FIG("fig-ios-android", "The same app following each platform's conventions. Look at the title alignment, the back control, the bottom navigation and where the main action lives.", () => {
  let b = "";
  // iOS
  b += S.r(30, 20, 230, 440, "surface", "ink-2", 28, 2);
  b += S.p("M50 70 l-7 7 l7 7", null, "accent", 2.4) + S.t(58, 82, "Inbox", { size: 13, c: "accent" });
  b += S.t(48, 122, "Messages", { size: 26, w: 750 });
  for (let i = 0; i < 5; i++) b += S.c(66, 160 + i * 46, 14, "sunk") + S.r(90, 150 + i * 46, 120, 9, "ink-3", null, 3) + S.r(90, 164 + i * 46, 150, 7, "rule-strong", null, 3) + S.l(90, 182 + i * 46, 250, 182 + i * 46, "rule", 1);
  b += S.l(30, 400, 260, 400, "rule", 1);
  for (let i = 0; i < 4; i++) { const cx = 62 + i * 56; b += S.r(cx - 9, 410, 18, 16, i === 0 ? "accent" : "ink-3", null, 4) + S.t(cx, 440, ["Chats", "Calls", "People", "Settings"][i], { size: 9.5, a: "middle", c: i === 0 ? "accent" : "ink-3", w: 600 }); }
  b += S.t(145, 488, "iOS", { size: 16, w: 750, a: "middle", f: "d" }) + S.t(145, 506, "large title, back chevron, tab bar", { size: 12, a: "middle", c: "ink-2" });
  // Android M3
  b += S.r(340, 20, 230, 440, "surface", "ink-2", 22, 2);
  b += S.p("M366 77 h16 M366 77 l6 -6 M366 77 l6 6", null, "ink", 2.2) + S.t(398, 82, "Messages", { size: 17, w: 650 });
  for (let i = 0; i < 6; i++) b += S.c(376, 120 + i * 44, 14, "sunk") + S.r(400, 110 + i * 44, 120, 9, "ink-3", null, 3) + S.r(400, 124 + i * 44, 140, 7, "rule-strong", null, 3);
  b += S.r(492, 330, 56, 56, "accent-soft", null, 16) + S.p("M520 349 v18 M511 358 h18", null, "accent", 2.4);
  b += S.r(340, 398, 230, 62, "sunk", null, 0) + S.r(340, 440, 230, 20, "sunk", null, 20);
  for (let i = 0; i < 4; i++) { const cx = 371 + i * 56; if (i === 0) b += S.r(cx - 18, 406, 36, 22, "accent-soft", null, 11); b += S.r(cx - 8, 410, 16, 14, i === 0 ? "accent" : "ink-3", null, 3) + S.t(cx, 446, ["Chats", "Calls", "People", "Settings"][i], { size: 9.5, a: "middle", c: i === 0 ? "ink" : "ink-3", w: 600 }); }
  b += S.t(455, 488, "Android (Material 3)", { size: 16, w: 750, a: "middle", f: "d" }) + S.t(455, 506, "top app bar, back arrow, FAB, navigation bar", { size: 12, a: "middle", c: "ink-2" });
  return S.svg(600, 515, b, "Two phone screens: an iOS layout with a large title and tab bar, and an Android Material layout with a top app bar, floating action button and navigation bar");
});

FIG("fig-chart-choice", "Start from the question, then pick the chart. Each of these answers one kind of question well and the others badly.", () => {
  let b = ""; const W = 180, H = 120;
  const cell = (i, q, a, draw) => { const x = 10 + (i % 3) * (W + 15), y = 10 + Math.floor(i / 3) * (H + 70); b += S.r(x, y, W, H, "paper", "rule", 8) + draw(x, y) + S.t(x, y + H + 22, a, { size: 14, w: 700, f: "d" }) + S.t(x, y + H + 40, q, { size: 12, c: "ink-2" }); };
  cell(0, "How did it change over time?", "Line", (x, y) => S.p(`M${x + 15} ${y + 95} L${x + 45} ${y + 80} L${x + 75} ${y + 85} L${x + 105} ${y + 55} L${x + 135} ${y + 45} L${x + 165} ${y + 25}`, null, "accent", 2.5));
  cell(1, "Which is biggest?", "Bar (sorted)", (x, y) => [90, 72, 60, 44, 30].map((v, i) => S.r(x + 20, y + 15 + i * 19, v * 1.6, 13, i === 0 ? "accent" : "rule-strong", null, 2)).join(""));
  cell(2, "What share does each part have?", "Stacked bar", (x, y) => S.r(x + 15, y + 50, 80, 24, "accent", null, 0) + S.r(x + 95, y + 50, 45, 24, "sel", null, 0, 1.5, 'style="fill:var(--sel);opacity:.6"') + S.r(x + 140, y + 50, 25, 24, "rule-strong", null, 0));
  cell(3, "Are two things related?", "Scatter", (x, y) => { const r = seeded(7); let g = ""; for (let i = 0; i < 24; i++) { const t = r(); g += S.c(x + 18 + t * 145, y + 100 - t * 70 - r() * 22, 3.5, "accent"); } return g; });
  cell(4, "How are values spread out?", "Histogram", (x, y) => [12, 30, 52, 70, 58, 36, 18, 8].map((v, i) => S.r(x + 18 + i * 18, y + 105 - v, 17, v, "accent", null, 0)).join(""));
  cell(5, "What exactly is the number?", "Big number or table", (x, y) => S.t(x + 20, y + 72, "£12.4k", { size: 34, w: 750, f: "d" }) + S.t(x + 20, y + 94, "+8% on last month", { size: 12, c: "good", w: 600 }));
  return S.svg(600, 390, b, "Six small charts each paired with the question it answers");
});

FIG("fig-ten-foot", "A TV is used from about three metres away with a remote. Everything gets bigger, focus must be unmistakable, and content stays inside a safe area away from the edges.", () => {
  let b = S.r(30, 20, 540, 304, "ink", null, 10);
  b += `<rect x="57" y="35" width="486" height="274" style="fill:none;stroke:var(--spec);stroke-width:1.5;stroke-dasharray:6 5"/>`;
  b += S.t(66, 54, "safe area (about 5% in from each edge)", { size: 12, c: "spec", w: 600 });
  for (let i = 0; i < 4; i++) { const x = 70 + i * 118; b += `<rect x="${x}" y="${i === 1 ? 92 : 100}" width="${i === 1 ? 116 : 100}" height="${i === 1 ? 74 : 60}" rx="8" fill="${i === 1 ? "#F2F4F8" : "#3A3F4A"}"/>`; }
  b += `<rect x="184" y="88" width="124" height="82" rx="11" style="fill:none;stroke:#FFFFFF;stroke-width:3"/>`;
  for (let i = 0; i < 4; i++) b += `<rect x="${70 + i * 118}" y="200" width="100" height="60" rx="8" fill="#3A3F4A"/>`;
  b += `<text x="70" y="290" font-size="14" fill="#C9CED8">Row moves with left and right; up and down change rows</text>`;
  b += S.t(300, 350, "focused tile: larger, bright, outlined", { size: 13, a: "middle", c: "ink-2" });
  return S.svg(600, 360, b, "A TV screen with a dashed safe area and one focused tile larger and outlined");
});
