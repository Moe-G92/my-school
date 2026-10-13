/* Baseline example: colour labs. Uses the engine helpers LAB, UI, S, Ex, Color, Fonts, Phone, Chart. */
const swatchBox = (hex, label, sub) => `<div class="stack gap-2" style="min-width:0"><div style="height:120px;border-radius:12px;background:${hex};border:1px solid var(--rule)"></div><div class="small"><b>${esc(label)}</b>${sub ? `<br><span class="muted mono">${esc(sub)}</span>` : ""}</div></div>`;

/* ---------- Colour matching ---------- */
LAB("lab-color-match", {
  title: "Colour matching", skill: "Colour", mins: 10, lesson: "color-basics",
  desc: "Five rounds. Match the target with hue, saturation and lightness sliders. Scored by perceptual difference, so you learn what each slider really does.",
  art: () => UI.art(`<rect x="40" y="14" width="76" height="64" rx="8" fill="#D9774B"/><rect x="124" y="14" width="76" height="64" rx="8" fill="#C9845A"/>`),
  mount(el, api) {
    let round = 0, mode = "hsl", scores = [], target = null, cur = { h: 0, s: 50, l: 50 }, ok = { l: .6, c: .1, h: 0 };
    const rnd = () => { const hh = Math.floor(Math.random() * 360), s = 35 + Math.random() * 50, l = 35 + Math.random() * 35; return Color.hsl(hh, s, l); };
    el.innerHTML = `<div class="split-3070"><div class="stack gap-4">
      <div class="row gap-3" style="justify-content:space-between"><span class="label num" data-round></span>${UI.seg("cmode", [["hsl", "HSL"], ["oklch", "OKLCH"]], "hsl")}</div>
      <div class="ctls" data-sliders></div>
      <div class="row gap-2"><button class="btn primary" type="button" data-lock>Lock in</button><button class="btn quiet" type="button" data-skip>New colour</button></div>
      <div data-fb></div></div>
      <div class="stack gap-3"><div class="split" style="gap:12px"><div data-target></div><div data-mine></div></div><div class="small muted" data-hist></div></div></div>`;
    const sliders = () => {
      const box = $("[data-sliders]", el);
      if (mode === "hsl") {
        box.innerHTML = UI.range("cm-h", "Hue", 0, 359, 1, Math.round(cur.h), "°") + UI.range("cm-s", "Saturation", 0, 100, 1, Math.round(cur.s), "%") + UI.range("cm-l", "Lightness", 0, 100, 1, Math.round(cur.l), "%");
        UI.bindRange(el, "cm-h", v => { cur.h = v; paint(); }); UI.bindRange(el, "cm-s", v => { cur.s = v; paint(); }); UI.bindRange(el, "cm-l", v => { cur.l = v; paint(); });
      } else {
        box.innerHTML = UI.range("cm-ol", "Lightness", 0, 100, 1, Math.round(ok.l * 100), "%") + UI.range("cm-oc", "Chroma", 0, 37, 1, Math.round(ok.c * 100), "") + UI.range("cm-oh", "Hue", 0, 359, 1, Math.round(ok.h), "°");
        UI.bindRange(el, "cm-ol", v => { ok.l = v / 100; paint(); }); UI.bindRange(el, "cm-oc", v => { ok.c = v / 100; paint(); }); UI.bindRange(el, "cm-oh", v => { ok.h = v; paint(); });
      }
    };
    const mine = () => mode === "hsl" ? Color.hsl(cur.h, cur.s, cur.l) : Color.oklch(ok.l, ok.c, ok.h);
    const paint = () => { $("[data-mine]", el).innerHTML = swatchBox(mine(), "Yours", ""); };
    const newRound = () => {
      target = rnd(); cur = { h: (Color.rgbToHsl(Color.hexToRgb(target)).h + 120 + Math.random() * 120) % 360, s: 50, l: 50 }; ok = Color.toOklch(Color.hsl(cur.h, cur.s, cur.l));
      $("[data-round]", el).textContent = `Round ${Math.min(round + 1, 5)} of 5`;
      $("[data-target]", el).innerHTML = swatchBox(target, "Target", "");
      $("[data-fb]", el).innerHTML = ""; $("[data-lock]", el).disabled = false; sliders(); paint();
    };
    UI.bindSeg(el, "cmode", v => { const hex = mine(); mode = v; if (v === "oklch") ok = Color.toOklch(hex); else cur = Color.rgbToHsl(Color.hexToRgb(hex)); sliders(); paint(); });
    $("[data-skip]", el).onclick = newRound;
    $("[data-lock]", el).onclick = () => {
      const m = mine(), d = Color.deltaE(target, m); scores.push(d); round++;
      const a = Color.rgbToHsl(Color.hexToRgb(target)), b = Color.rgbToHsl(Color.hexToRgb(m));
      const dh = Math.min(Math.abs(a.h - b.h), 360 - Math.abs(a.h - b.h)), ds = Math.abs(a.s - b.s), dl = Math.abs(a.l - b.l);
      const worst = dl * 1.4 > ds && dl * 1.4 > dh / 2 ? "lightness" : ds > dh / 2 ? "saturation" : "hue";
      const verdict = d < 2.5 ? ["good", "Indistinguishable."] : d < 5 ? ["good", "Very close."] : d < 10 ? ["warn", "Close."] : ["bad", "Keep training."];
      $("[data-fb]", el).innerHTML = `<div class="fb ${verdict[0]}"><b>${verdict[1]}</b> Difference ${d.toFixed(1)} (under 2.5 is hard to see). Target was <span class="mono">${target}</span>, yours <span class="mono">${m}</span>. ${d >= 5 ? `You were furthest off on <b>${worst}</b>.` : ""} ${worst === "lightness" && d >= 5 ? "Most people misjudge lightness first: squint to compare brightness alone." : ""}</div>`;
      $("[data-lock]", el).disabled = true;
      $("[data-hist]", el).innerHTML = scores.map((s, i) => `Round ${i + 1}: <b class="num">${s.toFixed(1)}</b>`).join(" · ");
      if (round >= 5) {
        const avg = scores.reduce((x, y) => x + y, 0) / scores.length; const best = api.data.best;
        if (!best || avg < best) api.data.best = avg; api.save(); api.done();
        $("[data-fb]", el).append(h(`<div class="fb" style="margin-top:10px"><b>Average ${avg.toFixed(1)}.</b> ${api.data.best ? "Your best average: " + api.data.best.toFixed(1) + "." : ""} <button class="btn small" type="button" data-again style="margin-left:6px">Play again</button></div>`));
        $("[data-again]", el).onclick = () => { round = 0; scores = []; $("[data-hist]", el).innerHTML = ""; newRound(); };
      } else setTimeout(() => { $("[data-fb]", el).append(h(`<button class="btn small" type="button" style="margin-top:10px">Next round</button>`)); $("[data-fb] .btn", el).onclick = newRound; }, 50);
    };
    newRound();
  },
});

/* ---------- Harmony ---------- */
LAB("lab-harmony", {
  title: "Colour wheel", skill: "Colour", mins: 8, lesson: "color-basics",
  desc: "Pick a base hue and a scheme. See which colours the scheme picks and how they behave on a real interface.",
  art: () => UI.art(`<circle cx="120" cy="46" r="36" style="fill:none;stroke:var(--rule-strong);stroke-width:14"/><circle cx="120" cy="10" r="7" fill="#2F5BEA"/><circle cx="120" cy="82" r="7" fill="#E09A2B"/>`),
  mount(el, api) {
    const schemes = {
      mono: ["Monochromatic", [0], "One hue in different lightness and chroma. Calm and safe; needs strong value contrast to stay readable."],
      analog: ["Analogous", [0, 30, -30], "Neighbouring hues. Harmonious and natural, low tension. Use one as the lead and the others in support."],
      comp: ["Complementary", [0, 180], "Opposite hues. Maximum contrast. Use the complement sparingly, for the one thing that must stand out."],
      split: ["Split complementary", [0, 150, 210], "The base plus the two neighbours of its complement. Lively but less harsh than a straight complement."],
      triad: ["Triadic", [0, 120, 240], "Three evenly spaced hues. Vibrant and playful; hard to control. Let one dominate and keep the others small."],
    };
    let base = 255, scheme = "comp", tried = new Set();
    el.innerHTML = `<div class="split-3070"><div class="stack gap-4">${UI.range("hm-h", "Base hue", 0, 359, 1, 255, "°")}<div class="stack gap-2"><span class="label">Scheme</span>${UI.seg("hscheme", Object.entries(schemes).map(([k, v]) => [k, v[0]]), scheme)}</div>
      <div style="position:relative;width:220px;height:220px;max-width:100%;margin:8px auto" data-wheel></div><div class="fb" data-note></div></div>
      <div class="stack gap-4"><div class="row gap-2" data-sw></div><div data-ui></div></div></div>`;
    const paint = () => {
      const offs = schemes[scheme][1];
      const hues = offs.map(o => (base + o + 360) % 360);
      const wheel = $("[data-wheel]", el);
      const stops = Array.from({ length: 13 }, (_, i) => Color.oklch(0.72, 0.13, i * 30)).join(",");
      wheel.innerHTML = `<div style="position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 90deg,${stops})"></div><div style="position:absolute;inset:34px;border-radius:50%;background:var(--surface)"></div>` + hues.map((hh, i) => { const a = (hh) * Math.PI / 180; const r = 93; return `<div style="position:absolute;left:${110 + r * Math.cos(a) - 12}px;top:${110 + r * Math.sin(a) - 12}px;width:24px;height:24px;border-radius:50%;background:${Color.oklch(0.62, 0.16, hh)};border:3px solid var(--surface);box-shadow:0 0 0 1px var(--ink)"></div>`; }).join("") + `<div style="position:absolute;inset:0;display:grid;place-items:center;font:700 14px var(--f-display);color:var(--ink-2)">${schemes[scheme][0]}</div>`;
      const pal = scheme === "mono" ? [Color.oklch(0.55, 0.16, base), Color.oklch(0.75, 0.1, base), Color.oklch(0.92, 0.04, base), Color.oklch(0.32, 0.08, base)] : hues.map((hh, i) => Color.oklch(i === 0 ? 0.55 : 0.7, i === 0 ? 0.17 : 0.15, hh));
      $("[data-sw]", el).innerHTML = pal.map(c => `<div class="stack gap-1" style="flex:1;min-width:64px"><div style="height:56px;border-radius:8px;background:${c};border:1px solid var(--rule)"></div><span class="small mono muted">${c}</span></div>`).join("");
      const primary = pal[0], accent = pal[1] || Color.oklch(0.75, 0.1, base), third = pal[2] || accent;
      const bg = Color.oklch(0.975, 0.008, base), ink = Color.oklch(0.25, 0.03, base);
      $("[data-ui]", el).innerHTML = `<div style="border-radius:12px;overflow:hidden;border:1px solid var(--rule);background:${bg};color:${ink};font-size:14px">
        <div style="background:${primary};color:${Color.bestText(primary)};padding:12px 16px;display:flex;justify-content:space-between;align-items:center"><b>Fieldnote</b><span style="font-size:13px;opacity:.9">Library · Explore</span></div>
        <div style="padding:16px;display:grid;gap:10px"><div style="font:700 18px var(--f-display)">Pick up where you left off</div><div style="color:${Color.mix(ink, bg, .3)}">Three drafts edited this week.</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><span style="background:${primary};color:${Color.bestText(primary)};padding:8px 14px;border-radius:8px;font-weight:700">Open draft</span><span style="border:1px solid ${Color.mix(ink, bg, .7)};padding:8px 14px;border-radius:8px;font-weight:650">New note</span><span style="background:${accent};color:${Color.bestText(accent)};padding:4px 10px;border-radius:999px;font-weight:700;font-size:12px;align-self:center">New</span>${scheme === "triad" || scheme === "split" ? `<span style="background:${third};color:${Color.bestText(third)};padding:4px 10px;border-radius:999px;font-weight:700;font-size:12px;align-self:center">Shared</span>` : ""}</div></div></div>`;
      $("[data-note]", el).innerHTML = `<b>${schemes[scheme][0]}.</b> ${schemes[scheme][2]} The wheel picks hues; you still decide lightness, saturation and how much of each to use.`;
    };
    UI.bindRange(el, "hm-h", v => { base = v; paint(); });
    UI.bindSeg(el, "hscheme", v => { scheme = v; tried.add(v); if (tried.size >= 3) api.done(); paint(); });
    paint();
  },
});

/* ---------- Palette builder ---------- */
const Pal = {
  steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  Ls: [0.975, 0.945, 0.89, 0.81, 0.71, 0.62, 0.54, 0.47, 0.40, 0.33, 0.25],
  Cf: [0.08, 0.17, 0.33, 0.55, 0.8, 0.95, 1, 0.92, 0.78, 0.62, 0.45],
  scale(hex, neutral = false) {
    const o = Color.toOklch(hex); const peak = neutral ? 0.012 : Math.max(0.04, Math.min(0.2, o.c * 1.05));
    const out = {}; this.steps.forEach((s, i) => { out[s] = Color.oklch(this.Ls[i], peak * this.Cf[i], o.h); }); return out;
  },
};
LAB("lab-palette", {
  title: "Palette builder", skill: "Colour", mins: 12, lesson: "color-systems",
  desc: "Start from one brand colour. Generate an even 50–950 scale, see which steps can carry text, map them to interface roles and preview light and dark.",
  art: () => UI.art(Pal.steps.map((s, i) => `<rect x="${10 + i * 20}" y="20" width="20" height="52" fill="${Color.oklch(Pal.Ls[i], 0.17 * Pal.Cf[i], 262)}"/>`).join("")),
  mount(el, api) {
    let base = api.data.base || "#2F6BFF";
    el.innerHTML = `<div class="stack gap-5"><div class="row gap-3"><label class="label" for="pl-hex">Brand colour</label><input type="color" id="pl-col" value="${base}" style="width:48px;height:44px;border:1px solid var(--rule-strong);border-radius:8px;background:var(--surface);padding:3px"><input class="input mono" id="pl-hex" value="${base}" style="width:130px"><span class="small muted">Try your own product's colour.</span></div>
      <div data-scale style="overflow-x:auto"></div>
      <div class="split" data-prev></div>
      <div class="row gap-2"><button class="btn" type="button" data-copy>${I.copy} Copy CSS tokens</button><span class="small muted">Paste them into your project or hand them to your AI tool.</span></div>
      <pre class="given mono small" data-css style="white-space:pre-wrap;max-height:200px;overflow:auto;margin:0"></pre></div>`;
    const paint = () => {
      const sc = Pal.scale(base), ne = Pal.scale(base, true);
      $("[data-scale]", el).innerHTML = `<div style="display:grid;grid-template-columns:repeat(11,minmax(52px,1fr));gap:2px;min-width:600px">${Pal.steps.map(s => { const c = sc[s]; const w = Color.contrast(c, "#FFFFFF"), k = Color.contrast(c, "#000000"); return `<div><div style="height:72px;background:${c};border-radius:${s === 50 ? "8px 0 0 8px" : s === 950 ? "0 8px 8px 0" : "0"};display:flex;align-items:flex-end;padding:6px;font:700 12px var(--f-body);color:${Color.bestText(c)}">${s}</div><div class="small num" style="margin-top:6px;line-height:1.35;font-size:12px"><span class="${w >= 4.5 ? "" : "faint"}">${w.toFixed(1)} on white</span><br><span class="${k >= 4.5 ? "" : "faint"}">${k.toFixed(1)} on black</span></div></div>`; }).join("")}</div>`;
      const btn = Pal.steps.find(s => s >= 500 && Color.contrast(sc[s], "#FFFFFF") >= 4.5) || 700;
      const darkBtn = [300, 400, 500].find(s => Color.contrast(sc[s], "#111111") >= 4.5) || 300;
      const roles = { light: { bg: ne[50], surface: "#FFFFFF", text: ne[900], muted: ne[600], border: ne[200], primary: sc[btn], onPrimary: "#FFFFFF", subtle: sc[100], subtleText: sc[800] }, dark: { bg: ne[950], surface: ne[900], text: ne[50], muted: ne[300], border: ne[800], primary: sc[darkBtn], onPrimary: "#111111", subtle: Color.mix(sc[900], ne[950], .4), subtleText: sc[200] } };
      const mock = (r, name) => `<div><div class="label" style="margin-bottom:8px">${name}</div><div style="background:${r.bg};color:${r.text};border-radius:12px;padding:16px;border:1px solid var(--rule);font-size:14px"><div style="background:${r.surface};border:1px solid ${r.border};border-radius:10px;padding:14px;display:grid;gap:8px"><span style="justify-self:start;background:${r.subtle};color:${r.subtleText};padding:3px 9px;border-radius:999px;font-size:12px;font-weight:700">Beta</span><b style="font:700 17px var(--f-display)">Invite your team</b><span style="color:${r.muted}">Members can edit every page in this workspace.</span><div style="display:flex;gap:8px;margin-top:4px"><span style="background:${r.primary};color:${r.onPrimary};padding:8px 14px;border-radius:8px;font-weight:700">Send invites</span><span style="border:1px solid ${r.border};padding:8px 14px;border-radius:8px;font-weight:650">Cancel</span></div></div>
        <div class="small" style="margin-top:10px;color:${r.muted}">Button text ${Color.ratioText(Color.contrast(r.primary, r.onPrimary))} · Muted text ${Color.ratioText(Color.contrast(r.muted, r.surface))}</div></div></div>`;
      $("[data-prev]", el).innerHTML = mock(roles.light, "Light theme (button = " + btn + ")") + mock(roles.dark, "Dark theme (button = " + darkBtn + ")");
      const css = ":root {\n" + Pal.steps.map(s => `  --brand-${s}: ${sc[s]};`).join("\n") + "\n" + Pal.steps.map(s => `  --neutral-${s}: ${ne[s]};`).join("\n") + `\n\n  --color-bg: var(--neutral-50);\n  --color-surface: #FFFFFF;\n  --color-text: var(--neutral-900);\n  --color-text-muted: var(--neutral-600);\n  --color-border: var(--neutral-200);\n  --color-primary: var(--brand-${btn});\n  --color-on-primary: #FFFFFF;\n}\n@media (prefers-color-scheme: dark) {\n  :root {\n    --color-bg: var(--neutral-950);\n    --color-surface: var(--neutral-900);\n    --color-text: var(--neutral-50);\n    --color-text-muted: var(--neutral-300);\n    --color-border: var(--neutral-800);\n    --color-primary: var(--brand-${darkBtn});\n    --color-on-primary: #111111;\n  }\n}`;
      $("[data-css]", el).textContent = css;
      api.data.base = base; api.save();
    };
    const set = v => { if (!Color.isHex(v)) return; base = Color.rgbToHex(Color.hexToRgb(v)); $("#pl-col", el).value = base.toLowerCase(); $("#pl-hex", el).value = base; paint(); };
    $("#pl-col", el).addEventListener("input", e => set(e.target.value));
    $("#pl-hex", el).addEventListener("change", e => set(e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value));
    $("[data-copy]", el).onclick = () => { copyText($("[data-css]", el).textContent, $("[data-css]", el)); api.done(); };
    paint();
  },
});

/* ---------- Contrast ---------- */
LAB("lab-contrast", {
  title: "Contrast checker and challenge", skill: "Colour", mins: 10, lesson: "contrast",
  desc: "Measure any colour pair against WCAG, then fix five real failures from shipped interfaces by adjusting lightness alone.",
  art: () => UI.art(`<rect x="40" y="12" width="160" height="68" rx="8" fill="#FFFFFF" style="stroke:var(--rule-strong)"/><text x="60" y="56" font-size="28" font-weight="700" fill="#767676">Aa 4.5</text>`),
  mount(el, api) {
    let fg = "#5B6270", bg = "#FFFFFF";
    el.innerHTML = `<div class="stack gap-6"><div class="split-3070"><div class="stack gap-4">
        <div class="field"><label for="ct-fg">Text colour</label><div class="row gap-2"><input type="color" id="ct-fgc" value="${fg}" style="width:44px;height:44px;border:1px solid var(--rule-strong);border-radius:8px;padding:3px;background:var(--surface)"><input class="input mono" id="ct-fg" value="${fg}" style="width:120px"></div></div>
        <div class="field"><label for="ct-bg">Background</label><div class="row gap-2"><input type="color" id="ct-bgc" value="${bg}" style="width:44px;height:44px;border:1px solid var(--rule-strong);border-radius:8px;padding:3px;background:var(--surface)"><input class="input mono" id="ct-bg" value="${bg}" style="width:120px"></div></div>
        <button class="btn small" type="button" data-swap>Swap colours</button></div>
        <div class="stack gap-3"><div data-prev style="border-radius:12px;padding:20px;border:1px solid var(--rule)"></div><div data-res></div></div></div>
      <div><div class="h3" style="margin-bottom:6px">Fix five real failures</div><p class="small muted" style="margin-bottom:14px">Each pair failed in a shipped product. Drag the slider to change only the lightness of the highlighted colour until it passes. Keep the hue, so the brand survives.</p><div class="stack gap-3" data-ch></div></div></div>`;
    const paint = () => {
      const r = Color.contrast(fg, bg);
      $("[data-prev]", el).style.background = bg; $("[data-prev]", el).style.color = fg;
      $("[data-prev]", el).innerHTML = `<div style="font:700 32px/1.1 var(--f-display)">${Color.ratioText(r)}</div><p style="font-size:16px;margin-top:8px">Body text at 16px needs 4.5:1. Can you read this comfortably at arm's length?</p><p style="font-size:24px;font-weight:700;margin-top:6px">Large text at 24px</p><span style="display:inline-block;margin-top:10px;border:2px solid ${fg};border-radius:8px;padding:8px 14px;font-weight:700">Outlined control</span>`;
      const row = (lab, need) => `<div class="row" style="justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--rule)"><span class="small">${lab} <span class="faint">(${need}:1)</span></span><span class="tag ${r >= need ? "good" : "bad"}">${r >= need ? "Pass" : "Fail"}</span></div>`;
      $("[data-res]", el).innerHTML = row("AA body text", 4.5) + row("AA large text", 3) + row("AA icons, borders, focus rings", 3) + row("AAA body text", 7) + row("AAA large text", 4.5);
    };
    const bind = (k, cid, tid) => { const set = v => { if (!Color.isHex(v)) return; const hex = Color.rgbToHex(Color.hexToRgb(v.startsWith("#") ? v : "#" + v)); if (k === "fg") fg = hex; else bg = hex; $(cid, el).value = hex.toLowerCase(); $(tid, el).value = hex; paint(); }; $(cid, el).addEventListener("input", e => set(e.target.value)); $(tid, el).addEventListener("change", e => set(e.target.value)); };
    bind("fg", "#ct-fgc", "#ct-fg"); bind("bg", "#ct-bgc", "#ct-bg");
    $("[data-swap]", el).onclick = () => { [fg, bg] = [bg, fg]; $("#ct-fg", el).value = fg; $("#ct-bg", el).value = bg; $("#ct-fgc", el).value = fg.toLowerCase(); $("#ct-bgc", el).value = bg.toLowerCase(); paint(); };
    paint();
    const pairs = [
      { name: "Placeholder text in a search box", fg: "#A6ABB3", bg: "#FFFFFF", need: 4.5, adj: "fg", demo: "Search destinations" },
      { name: "White text on an orange button", fg: "#FFFFFF", bg: "#F5A524", need: 4.5, adj: "bg", demo: "Continue" },
      { name: "A link in body copy", fg: "#5A9BFF", bg: "#FFFFFF", need: 4.5, adj: "fg", demo: "Read our returns policy" },
      { name: "An input border (non-text UI)", fg: "#DCDFE4", bg: "#FFFFFF", need: 3, adj: "fg", demo: "", border: true },
      { name: "A large grey heading", fg: "#A2A7AE", bg: "#FFFFFF", need: 3, adj: "fg", demo: "Your trips", big: true },
    ];
    const fixed = api.data.fixed || {};
    pairs.forEach((p, i) => {
      const o = Color.toOklch(p.adj === "fg" ? p.fg : p.bg);
      const row = h(`<div class="panel pad" style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;align-items:center"><div class="stack gap-2"><b class="small">${i + 1}. ${esc(p.name)}</b><span class="small muted">Needs ${p.need}:1 · adjust the ${p.adj === "fg" ? "foreground" : "background"}</span><input type="range" min="5" max="98" step="0.5" value="${(o.l * 100).toFixed(1)}" aria-label="Lightness for pair ${i + 1}"><span class="small num" data-r></span></div><div data-d style="border-radius:10px;padding:16px;border:1px solid var(--rule);min-height:64px;display:grid;align-items:center"></div></div>`);
      const inp = $("input", row);
      const upd = () => {
        const c = Color.oklch(inp.value / 100, o.c, o.h); const F = p.adj === "fg" ? c : p.fg, B = p.adj === "bg" ? c : p.bg; const r = Color.contrast(F, B); const ok = r >= p.need;
        const d = $("[data-d]", row); d.style.background = p.adj === "bg" ? "#FFFFFF" : B;
        d.innerHTML = p.border ? `<div style="border:1.5px solid ${F};border-radius:8px;padding:10px;background:#FFFFFF;color:#4B5160;font-size:14px">you@example.com</div>` : p.adj === "bg" ? `<span style="justify-self:start;background:${B};color:${F};padding:10px 18px;border-radius:8px;font-weight:700">${p.demo}</span>` : `<span style="color:${F};font-size:${p.big ? 26 : 16}px;font-weight:${p.big ? 700 : 400};${p.demo.startsWith("Read") ? "text-decoration:underline" : ""}">${p.demo}</span>`;
        $("[data-r]", row).innerHTML = `${Color.ratioText(r)} <span class="tag ${ok ? "good" : "bad"}" style="margin-left:6px">${ok ? "Passes" : "Fails"}</span> <span class="mono faint" style="margin-left:6px">${c}</span>`;
        if (ok && !fixed[i]) { fixed[i] = 1; api.data.fixed = fixed; api.save(); if (Object.keys(fixed).length >= pairs.length) api.done(); }
      };
      inp.addEventListener("input", upd); upd();
      $("[data-ch]", el).append(row);
    });
  },
});

/* ---------- Colour vision ---------- */
LAB("lab-cvd", {
  title: "Colour-blindness simulator", skill: "Colour", mins: 6, lesson: "contrast",
  desc: "About 1 in 12 men and 1 in 200 women have some colour vision deficiency. See a dashboard the way they do, then switch on redundant cues.",
  art: () => UI.art(`<rect x="40" y="18" width="70" height="56" rx="6" fill="#2E9E5B"/><rect x="130" y="18" width="70" height="56" rx="6" fill="#D9453A"/>`),
  mount(el, api) {
    const M = {
      none: null,
      protan: "0.152286 1.052583 -0.204868 0 0  0.114503 0.786281 0.099216 0 0  -0.003882 -0.048116 1.051998 0 0  0 0 0 1 0",
      deutan: "0.367322 0.860646 -0.227968 0 0  0.280085 0.672501 0.047413 0 0  -0.011820 0.042940 0.968881 0 0  0 0 0 1 0",
      tritan: "1.255528 -0.076749 -0.178779 0 0  -0.078411 0.930809 0.147602 0 0  0.004733 0.691367 0.303900 0 0  0 0 0 1 0",
      achro: "0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0",
    };
    let mode = "none", cues = false, seen = new Set();
    el.innerHTML = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${Object.entries(M).filter(([, v]) => v).map(([k, v]) => `<filter id="cvd-${k}" color-interpolation-filters="linearRGB"><feColorMatrix type="matrix" values="${v}"/></filter>`).join("")}</defs></svg>
      <div class="stack gap-4"><div class="row gap-3"><div class="stack gap-2"><span class="label">View as</span>${UI.seg("cvd", [["none", "Typical vision"], ["protan", "Protanopia"], ["deutan", "Deuteranopia"], ["tritan", "Tritanopia"], ["achro", "Achromatopsia"]], "none")}</div><label class="check-inline"><input type="checkbox" id="cvd-cues"> Add redundant cues</label></div>
      <div data-view class="stage" style="background:#FFFFFF;color:#1A1C21"></div><div class="fb" data-fb></div></div>`;
    const paint = () => {
      const v = $("[data-view]", el);
      v.style.filter = M[mode] ? `url(#cvd-${mode})` : "";
      const G = "#2E9E5B", R = "#D9453A", A = "#E3A21A";
      const status = (c, label, icon) => `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #E6E8EC">${cues ? `<span style="width:20px;height:20px;border-radius:50%;background:${c};color:#fff;display:grid;place-items:center;font-size:12px;font-weight:800">${icon}</span>` : `<span style="width:12px;height:12px;border-radius:50%;background:${c}"></span>`}<span style="font-size:14px">${label}</span>${cues ? `<b style="margin-left:auto;font-size:13px;color:${c === G ? "#1E6B3E" : c === R ? "#A3271E" : "#7A5600"}">${c === G ? "Healthy" : c === R ? "Down" : "Degraded"}</b>` : ""}</div>`;
      const line = (pts, c, dash) => `<polyline points="${pts}" style="fill:none;stroke:${c};stroke-width:3" ${dash && cues ? 'stroke-dasharray="7 5"' : ""}/>`;
      v.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px">
        <div><b style="font-size:15px">Services</b>${status(G, "Payments API", "✓")}${status(R, "Search", "!")}${status(A, "Email", "–")}${status(G, "Checkout", "✓")}</div>
        <div><b style="font-size:15px">Signups vs cancellations</b><svg viewBox="0 0 240 130" style="width:100%;display:block;margin-top:8px">${line("10,110 50,90 90,95 130,60 170,50 230,25", G)}${line("10,70 50,80 90,60 130,75 170,90 230,100", R, true)}${cues ? `<text x="232" y="22" font-size="11" text-anchor="end" fill="#1E6B3E" font-weight="700">Signups</text><text x="232" y="118" font-size="11" text-anchor="end" fill="#A3271E" font-weight="700">Cancellations</text>` : ""}</svg>${cues ? "" : `<div style="font-size:12px;display:flex;gap:12px"><span><i style="display:inline-block;width:10px;height:10px;background:${G}"></i> Signups</span><span><i style="display:inline-block;width:10px;height:10px;background:${R}"></i> Cancellations</span></div>`}</div>
        <div><b style="font-size:15px">Card number</b><div style="margin-top:8px;border:2px solid ${R};border-radius:8px;padding:9px;font-size:14px">4242 4242 4242</div>${cues ? `<div style="color:#A3271E;font-size:13px;margin-top:6px;font-weight:600">⚠ Card number is too short. Check the last 4 digits.</div>` : ""}</div></div>`;
      const msg = { none: "This is how most people see it. Now pick a type of colour vision deficiency.", protan: "<b>Protanopia</b> (no red cones): red and green both turn muddy yellow-brown. Your status dots and chart lines now look alike.", deutan: "<b>Deuteranopia</b> (no green cones), the most common type: red versus green is nearly useless as a signal.", tritan: "<b>Tritanopia</b> (no blue cones) is rare. Blues and greens merge, and yellow shifts towards pink.", achro: "<b>Achromatopsia</b> means seeing no colour at all. Only lightness differences survive. This is also how your design looks on a greyscale e-reader." }[mode];
      $("[data-fb]", el).innerHTML = msg + (cues ? " <b>With cues on,</b> icons, labels, line styles and text carry the meaning, so colour becomes a bonus rather than the only signal." : mode !== "none" ? " Switch on redundant cues to fix it." : "");
      seen.add(mode + (cues ? "+" : "")); if (seen.size >= 4 && cues) api.done();
    };
    UI.bindSeg(el, "cvd", v => { mode = v; paint(); });
    $("#cvd-cues", el).onchange = e => { cues = e.target.checked; paint(); };
    paint();
  },
});
