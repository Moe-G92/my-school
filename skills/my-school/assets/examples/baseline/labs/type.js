/* Baseline example: type, icon and surface labs. Uses the engine helpers LAB, UI, S, Ex, Color, Fonts, Phone, Chart. */
/* ---------- Type anatomy ---------- */
LAB("lab-type-anatomy", {
  title: "Type anatomy", skill: "Type", mins: 8, lesson: "type-basics",
  desc: "Two rounds. First find the invisible lines that every font is built on. Then name the parts of the letters.",
  art: () => UI.art(`<text x="40" y="66" font-size="58" style="fill:var(--ink);font-family:Georgia,serif">Hxg</text><line x1="20" y1="66" x2="220" y2="66" style="stroke:var(--spec)"/><line x1="20" y1="40" x2="220" y2="40" style="stroke:var(--spec);stroke-dasharray:4 3"/>`),
  mount(el, api) {
    Fonts.ensure(["Source Serif 4"]);
    const fam = "'Source Serif 4', Georgia, serif";
    el.innerHTML = `<div class="stack gap-4"><div class="row gap-3" style="justify-content:space-between"><b data-q style="font-size:17px"></b><span class="small muted num" data-sc></span></div>
      <div class="stage" style="padding:0;background:var(--surface)"><svg data-svg viewBox="0 0 640 300" style="width:100%;display:block;cursor:crosshair;touch-action:manipulation"></svg></div><div data-fb></div></div>`;
    const svg = $("[data-svg]", el);
    let M = null, round = 1, qi = 0, right = 0;
    const lineQs = [["baseline", "Click the baseline: the line the letters sit on."], ["x", "Click the x-height: the top of lowercase letters like x."], ["cap", "Click the cap height: the top of capital letters."], ["asc", "Click the ascender line: the top of tall lowercase letters like h and d."], ["desc", "Click the descender line: the bottom of letters like p and g."]];
    const partQs = [["counter", "Which marker sits in a counter (the enclosed space inside a letter)?"], ["stem", "Which marker is on a stem (a main vertical stroke)?"], ["serif", "Which marker points to a serif (the small foot at the end of a stroke)?"], ["ascender", "Which marker is on an ascender?"], ["descender", "Which marker is on a descender?"], ["bowl", "Which marker is on a bowl (the curved stroke around a counter)?"]];
    const measure = () => {
      const size = 170, base = 205, x0 = 40; const cv = document.createElement("canvas").getContext("2d"); cv.font = `500 ${size}px ${fam}`;
      const mm = c => cv.measureText(c), W = s => cv.measureText(s).width;
      const word = "Hodpb";
      const xs = []; for (let i = 0; i < word.length; i++) xs.push([x0 + W(word.slice(0, i)), W(word[i])]);
      M = { size, base, x0, word, xs, baseline: base, x: base - mm("x").actualBoundingBoxAscent, cap: base - mm("H").actualBoundingBoxAscent, asc: base - mm("d").actualBoundingBoxAscent, desc: base + mm("p").actualBoundingBoxDescent };
      const [H, o, d, p, b] = xs, xh = base - M.x;
      M.parts = {
        stem: [H[0] + H[1] * 0.16, base - (base - M.cap) * 0.5],
        serif: [H[0] + H[1] * 0.04, base - 3],
        counter: [o[0] + o[1] * 0.5, base - xh * 0.5],
        ascender: [d[0] + d[1] * 0.78, M.asc + 18],
        descender: [p[0] + p[1] * 0.22, base + (M.desc - base) * 0.6],
        bowl: [b[0] + b[1] * 0.9, base - xh * 0.5],
      };
    };
    const draw = (reveal) => {
      let s = `<text x="${M.x0}" y="${M.base}" font-size="${M.size}" font-weight="500" style="fill:var(--ink);font-family:${fam}">${M.word}</text>`;
      if (round === 1 && reveal) [["baseline", "baseline"], ["x", "x-height"], ["cap", "cap height"], ["asc", "ascender"], ["desc", "descender"]].forEach(([k, lab]) => { const hit = k === lineQs[qi][0]; s += S.l(10, M[k], 630, M[k], hit ? "spec" : "ink-3", hit ? 2 : 1, hit ? "" : 'stroke-dasharray="4 4"') + S.t(630, M[k] - 5, lab, { size: 12, a: "end", c: hit ? "spec" : "ink-3", w: 600 }); });
      if (round === 2) { const keys = Object.keys(M.parts); const order = api.data.order || keys; keys.forEach((k, i) => { const [x, y] = M.parts[order[i]]; s += `<g data-m="${order[i]}" style="cursor:pointer">${S.c(x, y, 14, "spec")}${S.t(x, y + 5, String(i + 1), { size: 14, w: 800, a: "middle", c: "surface" })}</g>`; }); }
      svg.innerHTML = s;
    };
    const ask = () => {
      $("[data-sc]", el).textContent = `Round ${round} · ${right} right`;
      if (round === 1 && qi >= lineQs.length) { round = 2; qi = 0; }
      if (round === 2 && qi >= partQs.length) { $("[data-q]", el).textContent = "Done."; $("[data-fb]", el).innerHTML = `<div class="fb good"><b>${right} of ${lineQs.length + partQs.length}.</b> Next time a font looks “too small”, check its x-height before you change the size.</div><button class="btn small" type="button" data-again style="margin-top:10px">Try again</button>`; $("[data-again]", el).onclick = () => { round = 1; qi = 0; right = 0; ask(); }; api.done(); round = 3; draw(false); return; }
      $("[data-q]", el).textContent = round === 1 ? lineQs[qi][1] : partQs[qi][1];
      draw(false);
    };
    const pt = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * 640 / r.width, (e.clientY - r.top) * 300 / r.height]; };
    svg.addEventListener("click", e => {
      if (round === 1) {
        const [, y] = pt(e); const key = lineQs[qi][0]; const ok = Math.abs(y - M[key]) < 9;
        if (ok) right++;
        draw(true);
        $("[data-fb]", el).innerHTML = `<div class="fb ${ok ? "good" : "bad"}"><b>${ok ? "Yes." : "Not quite."}</b> The magenta line is the ${lineQs[qi][1].split(":")[0].replace("Click the ", "")}. ${key === "x" ? "Fonts with a tall x-height look bigger at the same point size." : key === "asc" ? "In many fonts ascenders rise above the capitals, as here." : ""}</div>`;
        qi++; setTimeout(ask, 1300);
      } else if (round === 2) {
        const g = e.target.closest("[data-m]"); if (!g) return;
        const key = partQs[qi][0], ok = g.dataset.m === key; if (ok) right++;
        $("[data-fb]", el).innerHTML = `<div class="fb ${ok ? "good" : "bad"}"><b>${ok ? "Yes." : "Not quite."}</b> ${ok ? "" : "You picked the " + g.dataset.m + ". "}${{ counter: "The counter is the space inside o, so it's about air, not ink.", stem: "Stems carry most of a letter's weight; their thickness sets how bold a font feels.", serif: "Serifs guide the eye along a line in print; at small screen sizes they can blur.", ascender: "Long ascenders give a font elegance; short ones let you set lines tighter.", descender: "Descenders need room below the baseline, which is one reason line height matters.", bowl: "The bowl is the curved stroke that encloses a counter, like the round part of b." }[key]}</div>`;
        qi++; setTimeout(ask, 1300);
      }
    });
    const start = () => { measure(); const keys = Object.keys(M.parts); if (!api.data.order) { api.data.order = shuffle(keys); } ask(); };
    start();
    if (document.fonts && document.fonts.load) document.fonts.load(`500 170px "Source Serif 4"`).then(() => { measure(); draw(false); }).catch(() => {});
  },
});

/* ---------- Type scale ---------- */
LAB("lab-type-scale", {
  title: "Type scale", skill: "Type", mins: 6, lesson: "type-systems",
  desc: "Pick a base size and a ratio, and get a full set of sizes that belong together. Compare a tight scale for apps with a dramatic one for marketing.",
  art: () => UI.art(`<text x="30" y="70" font-size="52" font-weight="700" style="fill:var(--ink);font-family:var(--f-display)">Aa</text><text x="118" y="70" font-size="32" font-weight="700" style="fill:var(--ink-2);font-family:var(--f-display)">Aa</text><text x="176" y="70" font-size="20" font-weight="700" style="fill:var(--ink-3);font-family:var(--f-display)">Aa</text>`),
  mount(el, api) {
    const ratios = [[1.125, "1.125 major second"], [1.2, "1.2 minor third"], [1.25, "1.25 major third"], [1.333, "1.333 perfect fourth"], [1.5, "1.5 perfect fifth"], [1.618, "1.618 golden"]];
    let base = 16, ratio = 1.25, n = 0;
    el.innerHTML = `<div class="split-3070"><div class="stack gap-4">${UI.range("ts-b", "Base size", 14, 20, 1, 16, "px")}<div class="stack gap-2"><span class="label">Ratio</span>${UI.seg("ratio", ratios.map(r => [r[0], r[1].split(" ")[0]]), ratio)}<span class="small muted" data-rn></span></div><div class="fb" data-fb></div><button class="btn small" type="button" data-copy>${I.copy} Copy as CSS</button></div>
      <div class="stack gap-4"><div data-steps></div><div class="stage" data-page style="background:var(--surface)"></div></div></div>`;
    const steps = () => [["xs", -2], ["sm", -1], ["base", 0], ["lg", 1], ["xl", 2], ["2xl", 3], ["3xl", 4], ["4xl", 5]].map(([n, i]) => [n, base * Math.pow(ratio, i)]);
    const paint = () => {
      const s = steps();
      $("[data-rn]", el).textContent = ratios.find(r => r[0] === ratio)[1];
      $("[data-steps]", el).innerHTML = s.slice().reverse().map(([n, px]) => `<div style="display:grid;grid-template-columns:56px 64px minmax(0,1fr);gap:12px;align-items:baseline;padding:6px 0;border-bottom:1px solid var(--rule)"><span class="small muted">${n}</span><span class="mono small" style="color:var(--spec)">${px.toFixed(1)}</span><span style="font:700 ${px}px/1.1 var(--f-display);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Gestalt</span></div>`).join("");
      const g = Object.fromEntries(s);
      $("[data-page]", el).innerHTML = `<div style="font:700 ${g["3xl"]}px/1.1 var(--f-display);letter-spacing:-0.01em">Field guide to trees</div><div style="font-size:${g.lg}px;color:var(--ink-2);margin-top:8px;line-height:1.4">Learn to name forty native trees by leaf, bark and silhouette.</div><div style="font:700 ${g.xl}px/1.2 var(--f-display);margin-top:20px">Oak</div><p style="font-size:${g.base}px;line-height:1.6;margin-top:6px">Lobed leaves, deeply ridged bark, and acorns from late summer. Oaks can live for centuries and support more wildlife than almost any other native tree.</p><p style="font-size:${g.sm}px;color:var(--ink-3);margin-top:8px">Photo: Wistman's Wood, Dartmoor</p>`;
      $("[data-fb]", el).innerHTML = ratio <= 1.2 ? "<b>A tight scale.</b> Sizes are close together, which suits dense apps and dashboards where space is precious and headings shouldn't shout." : ratio >= 1.5 ? "<b>A dramatic scale.</b> Big jumps between steps suit editorial and marketing pages. In an app, the top steps get huge fast, so you'll only use the lower half." : "<b>A middle scale.</b> Clear steps without drama. A sensible default for most products and websites.";
      if (++n > 3) api.done();
    };
    UI.bindRange(el, "ts-b", v => { base = v; paint(); });
    UI.bindSeg(el, "ratio", v => { ratio = +v; paint(); });
    $("[data-copy]", el).onclick = () => { copyText(":root {\n" + steps().map(([n, px]) => `  --text-${n}: ${(px / 16).toFixed(3)}rem; /* ${px.toFixed(1)}px */`).join("\n") + "\n}"); };
    paint();
  },
});

/* ---------- Measure and leading ---------- */
LAB("lab-measure", {
  title: "Line length and line height", skill: "Type", mins: 6, lesson: "type-systems",
  desc: "Drag the column width and the line height. The meter counts characters per line in real time. Find the zone where reading feels effortless.",
  art: () => UI.art(S.lines(50, 18, 140, 5, 12, "ink-3", 5, true, 2) + `<line x1="50" y1="84" x2="190" y2="84" style="stroke:var(--spec)"/>`),
  mount(el, api) {
    let w = 110, lh = 1.2, fs = 17;
    el.innerHTML = `<div class="stack gap-4"><div class="ctls" style="max-width:640px">${UI.range("ms-w", "Column width", 18, 120, 1, 110, "ch")}${UI.range("ms-lh", "Line height", 1, 2.2, 0.05, 1.2, "")}${UI.range("ms-fs", "Font size", 13, 24, 1, 17, "px")}</div>
      <div class="row gap-4" style="align-items:center"><div style="flex:1;min-width:220px"><div class="meter" style="height:14px"><i data-bar></i></div><div class="row small" style="justify-content:space-between;margin-top:4px;color:var(--ink-3)"><span>20</span><span>45</span><span>75</span><span>120 characters</span></div></div><div class="score num" data-cpl></div></div>
      <div class="fb" data-fb></div>
      <div class="stage" style="background:var(--surface);overflow:auto"><p data-p style="margin:0">Typography exists to honour content. Most of the decisions you make about type for the screen come down to two numbers: how long a line is and how much space sits between lines. Make lines too long and the eye loses its place on the way back to the left edge, so readers skip or reread lines without noticing. Make them too short and the eye jumps so often that reading feels choppy and sentences break into fragments. Line height works with line length: a wider column needs more space between lines so the eye can track back to the start of the next one, while short lines can sit tighter. Neither number is right on its own; you tune them together, and you tune them with real text at the real size.</p></div></div>`;
    const p = $("[data-p]", el);
    const paint = () => {
      p.style.maxWidth = w + "ch"; p.style.lineHeight = lh; p.style.fontSize = fs + "px";
      const r = document.createRange(); r.selectNodeContents(p); const tops = new Set(Array.from(r.getClientRects()).map(x => Math.round(x.top)));
      const lines = Math.max(1, tops.size); const cpl = Math.round(p.textContent.length / lines);
      $("[data-cpl]", el).textContent = cpl + " ch";
      const bar = $("[data-bar]", el); bar.style.width = clamp((cpl - 20) / 100 * 100, 2, 100) + "%"; bar.style.background = cpl >= 45 && cpl <= 75 ? "var(--good)" : "var(--warn)";
      const lenOk = cpl >= 45 && cpl <= 75, lhOk = lh >= 1.4 && lh <= 1.75;
      let msg = cpl < 45 ? "<b>Too short.</b> The eye jumps back every few words and the text feels choppy." : cpl > 75 ? "<b>Too long.</b> Finding the start of the next line gets hard, especially with tight leading." : "<b>Comfortable length.</b>";
      msg += lh < 1.35 ? " Lines are cramped: ascenders and descenders crowd each other." : lh > 1.8 ? " So much space between lines that they stop reading as one paragraph." : " Line height is in the comfortable range for body text.";
      if (lenOk && lhOk) msg += " This is the zone: roughly 45 to 75 characters at 1.4 to 1.7 line height.";
      $("[data-fb]", el).className = "fb " + (lenOk && lhOk ? "good" : "warn"); $("[data-fb]", el).innerHTML = msg;
      if (lenOk && lhOk) api.done();
    };
    UI.bindRange(el, "ms-w", v => { w = v; paint(); }); UI.bindRange(el, "ms-lh", v => { lh = v; paint(); }); UI.bindRange(el, "ms-fs", v => { fs = v; paint(); });
    requestAnimationFrame(paint);
    const ro = new ResizeObserver(() => paint()); ro.observe(p); Router.onLeave(() => ro.disconnect());
  },
});

/* ---------- Font pairing ---------- */
LAB("lab-pairing", {
  title: "Font pairing", skill: "Type", mins: 10, lesson: "type-systems",
  desc: "Try heading and body combinations on a real article, then judge four pairs and see whether a designer would agree.",
  art: () => UI.art(`<text x="30" y="46" font-size="30" font-weight="700" style="fill:var(--ink);font-family:Georgia,serif">Aa</text><text x="100" y="46" font-size="30" style="fill:var(--ink-2);font-family:var(--f-body)">Aa</text>` + S.lines(30, 60, 180, 2, 10, "rule-strong", 5)),
  mount(el, api) {
    const fams = ["Playfair Display", "Source Serif 4", "Source Sans 3", "Roboto", "Open Sans", "Lobster", "Pacifico", "DM Serif Display", "DM Sans", "Space Grotesk", "IBM Plex Mono", "Libre Baskerville", "Work Sans", "Merriweather", "Inter", "Lato"];
    Fonts.ensure(fams);
    const pairs = [
      ["Playfair Display", "Source Sans 3", true, "A high-contrast display serif for headlines with a calm, open sans for reading. They differ in structure but share proportions, so they look related without looking the same."],
      ["Source Serif 4", "Source Sans 3", true, "A superfamily: designed together, with matching proportions and x-heights. The safest kind of pairing."],
      ["Roboto", "Open Sans", false, "Two neutral sans serifs that are almost, but not quite, the same. The difference reads as a mistake. Use one family and let weight and size do the work."],
      ["Lobster", "Pacifico", false, "Two decorative scripts competing for attention. A decorative face needs a quiet partner, and probably shouldn't set more than a few words."],
      ["DM Serif Display", "DM Sans", true, "Another family designed to work together, with a confident serif for display and a geometric sans for text."],
      ["Space Grotesk", "IBM Plex Mono", true, "A quirky grotesk with a monospace for labels and code. A good fit for developer tools and technical products."],
      ["Libre Baskerville", "Work Sans", true, "A bookish serif for headings over a friendly grotesk for body. Classic contrast: serif on top, sans below."],
      ["Inter", "Merriweather", true, "Flipped: a sans for headings and a sturdy screen serif for long reading. Works well for blogs and documentation."],
    ];
    let hf = "Playfair Display", bf = "Source Sans 3";
    el.innerHTML = `<div class="split-3070"><div class="stack gap-4">
      <div class="field"><label for="fp-h">Heading font</label><select class="input" id="fp-h">${fams.map(f => `<option ${f === hf ? "selected" : ""}>${f}</option>`).join("")}</select></div>
      <div class="field"><label for="fp-b">Body font</label><select class="input" id="fp-b">${fams.map(f => `<option ${f === bf ? "selected" : ""}>${f}</option>`).join("")}</select></div>
      <div class="stack gap-2"><span class="label">Curated pairs</span><div class="stack gap-1" data-pairs></div></div></div>
      <div class="stack gap-4"><div class="stage" data-art style="background:var(--surface)"></div><div class="fb" data-note></div></div></div><div data-quiz style="margin-top:24px"></div>`;
    const paint = () => {
      $("[data-art]", el).innerHTML = `<div style="font:700 34px/1.12 '${hf}', serif;letter-spacing:-0.01em">The quiet return of the night train</div><div style="font:400 15px/1.5 '${bf}', sans-serif;color:var(--ink-3);margin-top:10px">Travel · 6 min read</div><p style="font:400 17px/1.65 '${bf}', sans-serif;margin-top:14px">Sleeper services are back on the map. Cheaper than flying for many routes and far kinder to the planet, they turn a wasted evening into the first night of the holiday. We rode four of them across Europe to see what has changed.</p><div style="font:700 20px/1.25 '${hf}', serif;margin-top:16px">Paris to Berlin</div><p style="font:400 17px/1.65 '${bf}', sans-serif;margin-top:6px">The carriages are new, the beds are short, and breakfast arrives somewhere near Hanover.</p>`;
      const p = pairs.find(x => x[0] === hf && x[1] === bf);
      $("[data-note]", el).innerHTML = p ? `<b>${p[2] ? "Works." : "Clashes."}</b> ${p[3]}` : hf === bf ? "<b>One family for both.</b> Always a safe choice. Contrast comes from size and weight instead of a second typeface." : "Not a curated pair. Ask yourself: do they differ enough to look intentional, and share enough (proportions, mood, era) to look related?";
      $$("[data-pairs] button", el).forEach(b => b.setAttribute("aria-pressed", String(b.dataset.h === hf && b.dataset.b === bf)));
    };
    $("[data-pairs]", el).innerHTML = pairs.map(p => `<button type="button" class="chiptoggle" style="text-align:left;border-radius:8px" data-h="${p[0]}" data-b="${p[1]}">${p[0]} + ${p[1]}</button>`).join("");
    $("[data-pairs]", el).addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; hf = b.dataset.h; bf = b.dataset.b; $("#fp-h", el).value = hf; $("#fp-b", el).value = bf; paint(); });
    $("#fp-h", el).onchange = e => { hf = e.target.value; paint(); }; $("#fp-b", el).onchange = e => { bf = e.target.value; paint(); };
    paint();
    const sample = (a, b) => `<div style="border:1px solid var(--rule);border-radius:10px;padding:14px;margin:8px 0;background:var(--surface)"><div style="font:700 24px/1.15 '${a}';">Small rooms, big ideas</div><p style="font:400 15.5px/1.6 '${b}';margin-top:6px">How four architects designed homes under 30 square metres that feel twice the size.</p></div>`;
    const qs = [["Roboto", "Open Sans", 1], ["DM Serif Display", "DM Sans", 0], ["Lobster", "Pacifico", 1], ["Libre Baskerville", "Work Sans", 0]].map(([a, b, ans]) => ({ prompt: `${a} + ${b}`, html: sample(a, b), options: ["Works", "Clashes"], answer: ans, why: pairs.find(p => p[0] === a && p[1] === b)[3] }));
    $("[data-quiz]", el).append(Ex.choice({ title: "Would a designer approve?", intro: "Judge each pair by eye before reading the explanation.", items: qs }, { key: "lab-pairing:q", onDone: () => api.done(), kind: "Quiz" }));
  },
});

/* ---------- Icon consistency ---------- */
LAB("lab-icons", {
  title: "Odd icon out", skill: "Imagery", mins: 5, lesson: "icons-imagery",
  desc: "Four sets of six icons. In each set one icon breaks the family. Find it, then read what gave it away.",
  art: () => UI.art([0, 1, 2, 3].map(i => `<g transform="translate(${36 + i * 46},28) scale(1.5)" style="fill:${i === 2 ? "var(--ink)" : "none"};stroke:var(--ink);stroke-width:${i === 2 ? 0 : 2};stroke-linecap:round"><circle cx="12" cy="12" r="8"/></g>`).join("")),
  mount(el, api) {
    const P = {
      home: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/>', search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>', bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
      user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>', heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.2 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>', cal: '<rect x="4" y="5.5" width="16" height="14.5" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
      mail: '<rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="M4 7l8 6 8-6"/>', star: '<path d="M12 4l2.4 5 5.4.6-4 3.7 1.1 5.3L12 15.9 7.1 18.6l1.1-5.3-4-3.7 5.4-.6z"/>', trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>', mark: '<path d="M7 4h10v16l-5-4-5 4z"/>',
    };
    const icon = (d, o = {}) => `<svg viewBox="0 0 24 24" width="48" height="48" style="fill:${o.fill ? "var(--ink)" : "none"};stroke:var(--ink);stroke-width:${o.sw || 2};stroke-linecap:${o.cap || "round"};stroke-linejoin:${o.join || "round"}"><g transform="${o.scale ? `translate(12 12) scale(${o.scale}) translate(-12 -12)` : ""}">${d}</g></svg>`;
    const rounds = [
      { keys: ["home", "search", "bell", "user", "heart", "cal"], odd: 3, o: { sw: 1 }, why: "Stroke weight. Five icons use a 2px stroke; this one uses 1px, so it looks faint and unfinished next to the others." },
      { keys: ["mail", "star", "trash", "mark", "home", "bell"], odd: 1, o: { fill: true, sw: 0 }, why: "Style. One filled icon in an outline set. Filled versus outline often signals selected versus unselected, so mixing them by accident sends a false message." },
      { keys: ["cal", "mail", "home", "trash", "search", "mark"], odd: 4, o: { cap: "butt", join: "miter" }, why: "Corners and line ends. The set uses round caps and joins; this one has square ends and sharp corners, which reads as a different family." },
      { keys: ["user", "heart", "star", "bell", "cal", "search"], odd: 1, o: { scale: 0.62 }, why: "Optical size. Every icon should fill the same live area. This one is drawn smaller, so it looks lighter and less important." },
    ];
    let r = 0, right = 0;
    el.innerHTML = `<div class="stack gap-4"><div class="row" style="justify-content:space-between"><b data-q></b><span class="small muted num" data-sc></span></div><div data-set style="display:grid;grid-template-columns:repeat(auto-fit,minmax(72px,1fr));gap:10px"></div><div data-fb></div></div>`;
    const show = () => {
      if (r >= rounds.length) { $("[data-q]", el).textContent = "All four sets done."; $("[data-set]", el).innerHTML = ""; $("[data-fb]", el).innerHTML = `<div class="fb good"><b>${right} of ${rounds.length} spotted.</b> When you mix icons from different libraries, these are the four things that give it away: stroke, fill, corners and optical size.</div>`; api.done(); return; }
      const R = rounds[r];
      $("[data-q]", el).textContent = `Set ${r + 1} of ${rounds.length}: which icon doesn't belong?`;
      $("[data-sc]", el).textContent = `${right} right`;
      $("[data-set]", el).innerHTML = R.keys.map((k, i) => `<button type="button" class="opt" data-i="${i}" style="justify-content:center;padding:14px" aria-label="Icon ${i + 1}">${icon(P[k], i === R.odd ? R.o : {})}</button>`).join("");
      $("[data-fb]", el).innerHTML = "";
      $$("[data-set] button", el).forEach(b => b.onclick = () => {
        const i = +b.dataset.i, ok = i === R.odd; if (ok) right++;
        $$("[data-set] button", el).forEach(x => { x.disabled = true; if (+x.dataset.i === R.odd) x.classList.add("right"); else if (x === b) x.classList.add("wrong"); });
        $("[data-fb]", el).innerHTML = `<div class="fb ${ok ? "good" : "bad"}"><b>${ok ? "Spotted." : "It was the highlighted one."}</b> ${R.why}</div><button class="btn small" type="button" style="margin-top:10px" data-next>Next set</button>`;
        $("[data-next]", el).onclick = () => { r++; show(); };
      });
    };
    show();
  },
});

/* ---------- Elevation and radius ---------- */
LAB("lab-elevation", {
  title: "Elevation and nested corners", skill: "Surfaces", mins: 8, lesson: "depth",
  desc: "Design a shadow for each level of a small elevation system, check it in dark mode, then fix the classic nested-radius mistake.",
  art: () => UI.art([0, 1, 2].map(i => `<rect x="${30 + i * 66}" y="${26 - i * 4}" width="52" height="44" rx="8" style="fill:var(--surface);stroke:var(--rule)" filter="drop-shadow(0 ${i * 3}px ${i * 4}px rgba(0,0,0,.18))"/>`).join("")),
  mount(el, api) {
    const lv = api.data.lv || [[0, 0, 0], [1, 3, 0.12], [4, 12, 0.14], [12, 32, 0.2]];
    let edit = 1, dark = false, outer = 24, padd = 12, matched = false, touched = new Set();
    el.innerHTML = `<div class="stack gap-6"><div class="split-3070"><div class="stack gap-4"><div class="stack gap-2"><span class="label">Edit level</span>${UI.seg("lvl", [[1, "Card"], [2, "Menu"], [3, "Dialog"]], 1)}</div><div class="ctls" data-ctls></div><label class="check-inline"><input type="checkbox" id="ev-dark"> Preview on a dark surface</label><div class="fb" data-fb></div></div>
      <div data-prev style="border-radius:12px;padding:28px;display:flex;gap:20px;flex-wrap:wrap;align-items:flex-end;border:1px solid var(--rule)"></div></div>
      <div class="split-3070"><div class="stack gap-4"><div class="h3">Nested corners</div>${UI.range("nr-o", "Outer radius", 0, 40, 2, 24, "px")}${UI.range("nr-p", "Gap", 0, 32, 2, 12, "px")}<label class="check-inline"><input type="checkbox" id="nr-m"> Inner = outer − gap</label></div><div class="stage" style="display:grid;place-items:center;min-height:220px"><div data-outer style="background:var(--sunk);border:1px solid var(--rule-strong);width:280px;max-width:100%"><div data-inner style="background:var(--surface);border:1.5px solid var(--accent);height:140px"></div></div></div></div><div class="fb" data-nfb></div></div>`;
    const ctls = () => {
      const [y, b, o] = lv[edit];
      $("[data-ctls]", el).innerHTML = UI.range("ev-y", "Y offset", 0, 24, 1, y, "px") + UI.range("ev-b", "Blur", 0, 48, 1, b, "px") + UI.range("ev-o", "Opacity", 0, 0.5, 0.01, o, "");
      UI.bindRange(el, "ev-y", v => { lv[edit][0] = v; paint(); }); UI.bindRange(el, "ev-b", v => { lv[edit][1] = v; paint(); }); UI.bindRange(el, "ev-o", v => { lv[edit][2] = v; paint(); });
    };
    const paint = () => {
      const p = $("[data-prev]", el); p.style.background = dark ? "#121419" : "#F1F3F6";
      p.innerHTML = [1, 2, 3].map(i => { const [y, b, o] = lv[i]; const surf = dark ? ["#1B1E25", "#20242C", "#262B34", "#2D323C"][i] : "#FFFFFF"; return `<div style="flex:1;min-width:110px;height:${70 + i * 14}px;border-radius:12px;background:${surf};box-shadow:0 ${y}px ${b}px rgba(0,0,0,${dark ? Math.min(0.8, o * 2.5) : o});display:grid;place-items:center;font-size:13px;font-weight:650;color:${dark ? "#C9CED8" : "#454B57"};outline:${i === edit ? "2px solid var(--sel)" : "none"};outline-offset:4px">${["", "Card", "Menu", "Dialog"][i]}</div>`; }).join("");
      const ok = lv[1][1] < lv[2][1] && lv[2][1] < lv[3][1] && lv[1][0] < lv[2][0] && lv[2][0] < lv[3][0];
      $("[data-fb]", el).className = "fb " + (ok ? "good" : "warn");
      $("[data-fb]", el).innerHTML = (ok ? "<b>A consistent system.</b> Each level casts a bigger, softer shadow than the one below, so stacking order is obvious." : "<b>The levels don't climb.</b> Higher surfaces should have more offset and more blur than lower ones.") + (dark ? " In dark mode shadows almost vanish, so higher surfaces get slightly lighter instead. That's what this preview does." : "");
      api.data.lv = lv; api.save(); touched.add("lv");
      if (ok && touched.has("nr")) api.done();
    };
    const npaint = () => {
      const inner = matched ? Math.max(0, outer - padd) : outer;
      const o = $("[data-outer]", el), i = $("[data-inner]", el); o.style.borderRadius = outer + "px"; o.style.padding = padd + "px"; i.style.borderRadius = inner + "px";
      $("[data-nfb]", el).className = "fb " + (matched ? "good" : "warn");
      $("[data-nfb]", el).innerHTML = matched ? `<b>Inner radius ${inner}px.</b> The curves are concentric, so the gap stays even all the way round.` : `<b>Both radii are ${outer}px.</b> Look at the corners: the gap swells where the curves diverge. Tick the box to fix it.`;
      if (matched) { touched.add("nr"); if (touched.has("lv")) api.done(); }
    };
    UI.bindSeg(el, "lvl", v => { edit = +v; ctls(); paint(); });
    $("#ev-dark", el).onchange = e => { dark = e.target.checked; paint(); };
    UI.bindRange(el, "nr-o", v => { outer = v; npaint(); }); UI.bindRange(el, "nr-p", v => { padd = v; npaint(); });
    $("#nr-m", el).onchange = e => { matched = e.target.checked; npaint(); };
    ctls(); paint(); npaint();
  },
});
