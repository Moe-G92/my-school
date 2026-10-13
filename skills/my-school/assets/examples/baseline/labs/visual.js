/* Baseline example: visual-foundation labs. Uses the engine helpers LAB, UI, S, Ex, Color, Fonts, Phone, Chart. */
/* ---------- Gestalt ---------- */
LAB("lab-gestalt", {
  title: "Grouping playground", skill: "Seeing", mins: 10, lesson: "gestalt",
  desc: "Change spacing and colour and watch groups appear. Then name the principle at work in six real interface moments.",
  art: () => UI.art(Array.from({ length: 24 }, (_, i) => S.c(70 + (i % 6) * 14 + (i % 6 >= 3 ? 18 : 0), 22 + Math.floor(i / 6) * 16, 4, (i % 6) % 2 ? "spec" : "ink-3")).join("")),
  mount(el, api) {
    el.innerHTML = `<div class="split-3070">
      <div class="ctls">
        ${UI.range("g-col", "Column gap", 2, 48, 1, 10, "px")}
        ${UI.range("g-row", "Row gap", 2, 48, 1, 10, "px")}
        <div class="stack gap-2"><span class="label">Colour</span>${UI.seg("gcolour", [["none", "None"], ["cols", "Alternate columns"], ["rows", "Alternate rows"]], "none")}</div>
        <div class="fb" data-read></div>
      </div>
      <div class="stage" style="display:grid;place-items:center;min-height:300px"><div data-dots style="display:grid;grid-template-columns:repeat(6,16px)"></div></div>
    </div>
    <div class="section" style="margin-top:32px"><div class="h3" style="margin-bottom:6px">Name the principle</div><p class="muted small" style="margin-bottom:12px">Each sketch shows a real interface moment. Which Gestalt principle does the work?</p><div data-quiz></div></div>`;
    const dots = $("[data-dots]", el); let col = 10, row = 10, colour = "none";
    for (let i = 0; i < 36; i++) dots.append(h(`<i style="width:16px;height:16px;border-radius:50%;display:block"></i>`));
    const paint = () => {
      dots.style.columnGap = col + "px"; dots.style.rowGap = row + "px";
      $$("i", dots).forEach((d, i) => { const c = i % 6, r = Math.floor(i / 6); const alt = colour === "cols" ? c % 2 : colour === "rows" ? r % 2 : 0; d.style.background = alt ? "var(--spec)" : "var(--ink-2)"; });
      let read;
      const ratio = col / row;
      const spacing = ratio > 1.7 ? "columns" : ratio < 0.6 ? "rows" : null;
      if (!spacing && colour === "none") read = "<b>A uniform grid.</b> With equal spacing and one colour, nothing groups. The eye sees a texture, not a structure.";
      else if (spacing && colour === "none") read = `<b>You probably see ${spacing}.</b> Proximity at work: the bigger gap separates groups, the smaller gap binds them.`;
      else if (!spacing) read = `<b>You probably see ${colour === "cols" ? "columns" : "rows"}.</b> Similarity at work: same colour reads as the same kind of thing.`;
      else if ((spacing === "columns") === (colour === "cols")) read = `<b>Strong ${spacing}.</b> Proximity and similarity agree, so the grouping is unmistakable. Real layouts use several cues together.`;
      else read = `<b>A conflict.</b> Spacing says ${spacing}, colour says ${colour === "cols" ? "columns" : "rows"}. Which wins for you? Mixed signals like this are what make a layout feel “off”.`;
      $("[data-read]", el).innerHTML = read;
    };
    UI.bindRange(el, "g-col", v => { col = v; paint(); }); UI.bindRange(el, "g-row", v => { row = v; paint(); });
    UI.bindSeg(el, "gcolour", v => { colour = v; paint(); });
    paint();
    const P = ["Proximity", "Similarity", "Closure", "Continuity", "Common region", "Figure and ground"];
    const mini = body => `<svg viewBox="0 0 260 110" style="width:100%;max-width:300px;display:block;margin:8px 0;border:1px solid var(--rule);border-radius:8px;background:var(--paper)">${body}</svg>`;
    const items = [
      { prompt: "Each label sits 4px above its input and 24px below the previous field.", html: mini(S.t(20, 28, "Email", { size: 12, w: 700 }) + S.r(20, 32, 220, 20, "surface", "rule-strong", 4) + S.t(20, 76, "Password", { size: 12, w: 700 }) + S.r(20, 80, 220, 20, "surface", "rule-strong", 4)), answer: 0, why: "Space binds each label to its own field. Equal spacing above and below a label is the classic form bug." },
      { prompt: "Every link on the page is the same blue.", html: mini(S.lines(20, 20, 220, 5, 16, "rule-strong", 6, true, 3) + S.r(60, 20, 50, 6, "accent", null, 3) + S.r(30, 52, 40, 6, "accent", null, 3) + S.r(120, 68, 60, 6, "accent", null, 3)), answer: 1, why: "Shared colour tells people these things behave alike. Break that (a blue word that isn't a link) and you teach the wrong lesson." },
      { prompt: "A settings list puts related toggles inside shared grey panels.", html: mini(S.r(15, 12, 230, 40, "sunk", null, 8) + S.r(15, 60, 230, 40, "sunk", null, 8) + S.lines(28, 22, 120, 2, 12, "ink-3", 5) + S.lines(28, 70, 120, 2, 12, "ink-3", 5)), answer: 4, why: "A shared background or border groups items even when spacing is equal. iOS Settings uses this heavily." },
      { prompt: "A row of cards is cut off at the right edge of the screen.", html: mini([0, 1, 2].map(i => S.r(20 + i * 100, 25, 86, 60, "surface", "rule-strong", 8)).join("")), answer: 3, why: "The eye follows the row past the edge and expects more. A cropped card is a signifier that the row scrolls." },
      { prompt: "A dialog opens and the page behind it dims.", html: mini(`<rect x="0" y="0" width="260" height="110" style="fill:var(--ink);opacity:.35"/>` + S.r(70, 20, 120, 70, "surface", "rule-strong", 8)), answer: 5, why: "Dimming pushes the page into the ground so the dialog becomes the figure. It tells you where your attention belongs." },
      { prompt: "A loading spinner made of eight separate dashes reads as one circle.", html: mini(Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4; return S.l(130 + 22 * Math.cos(a), 55 + 22 * Math.sin(a), 130 + 34 * Math.cos(a), 55 + 34 * Math.sin(a), "ink-2", 4); }).join("")), answer: 2, why: "The mind completes the shape from fragments. Icons and logos lean on closure to stay light." },
    ].map(x => Object.assign(x, { options: P }));
    $("[data-quiz]", el).append(Ex.choice({ title: "Six moments", intro: "", items }, { key: "lab-gestalt:quiz", onDone: () => api.done(), kind: "Quiz" }));
  },
});

/* ---------- Squint test ---------- */
LAB("lab-squint", {
  title: "The squint test", skill: "Seeing", mins: 6, lesson: "hierarchy",
  desc: "Blur two versions of the same page. What survives the blur is your hierarchy.",
  art: () => UI.art(`<g style="filter:blur(2px)">${S.r(20, 14, 90, 64, "surface", "rule-strong", 6)}${S.r(30, 24, 60, 8, "ink-3", null, 2)}${S.r(130, 14, 90, 64, "surface", "rule-strong", 6)}${S.r(140, 24, 50, 12, "ink", null, 2)}${S.r(140, 56, 40, 14, "ink", null, 4)}</g>`),
  mount(el, api) {
    const pageA = `<div style="font-size:13px;line-height:1.4">
      <div style="display:flex;justify-content:space-between;border:1px solid var(--rule-strong);padding:6px;margin-bottom:8px;gap:6px;flex-wrap:wrap"><b>Stayo</b><b>Home</b><b>Deals</b><b>Help</b><b>Sign in</b><b>Basket</b></div>
      <div style="border:1px solid var(--rule-strong);padding:8px;margin-bottom:8px"><b>Lakeside cabin with sauna</b><br><b>£120 per night</b> · <b>4.8 stars</b> · <b>Free cancellation</b></div>
      <div style="border:1px solid var(--rule-strong);height:70px;margin-bottom:8px;background:var(--sunk)"></div>
      <div style="border:1px solid var(--rule-strong);padding:8px;margin-bottom:8px"><b>Sleeps 4. Wood stove. Lake access. Wifi. Parking.</b></div>
      <div style="display:flex;gap:6px"><span style="border:1px solid var(--rule-strong);padding:6px 10px"><b>Share</b></span><span style="border:1px solid var(--rule-strong);padding:6px 10px"><b>Save</b></span><span style="border:1px solid var(--rule-strong);padding:6px 10px"><b>Book now</b></span><span style="border:1px solid var(--rule-strong);padding:6px 10px"><b>Contact</b></span></div></div>`;
    const pageB = `<div style="font-size:13px;line-height:1.45">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;color:var(--ink-3)"><b style="color:var(--ink)">Stayo</b><span>Deals · Help · Sign in</span></div>
      <div style="height:84px;border-radius:8px;background:var(--sunk);margin-bottom:12px"></div>
      <div style="font:700 21px/1.15 var(--f-display);margin-bottom:4px">Lakeside cabin with sauna</div>
      <div style="color:var(--ink-3);margin-bottom:12px">4.8 ★ · Sleeps 4 · Free cancellation</div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><span><b style="font-size:16px">£120</b> <span style="color:var(--ink-3)">night</span></span><span style="background:var(--ink);color:var(--on-ink);padding:9px 16px;border-radius:8px;font-weight:700">Book now</span></div></div>`;
    el.innerHTML = `<div class="ctls" style="max-width:520px">${UI.range("sq-blur", "Blur", 0, 8, 0.5, 0, "px")}</div>
      <div class="split" style="margin-top:16px"><div><div class="label" style="margin-bottom:8px">Version A</div><div class="stage" data-p="a" style="background:var(--surface)">${pageA}</div></div><div><div class="label" style="margin-bottom:8px">Version B</div><div class="stage" data-p="b" style="background:var(--surface)">${pageB}</div></div></div>
      <div data-q style="margin-top:24px"></div>`;
    UI.bindRange(el, "sq-blur", v => $$("[data-p]", el).forEach(p => { p.firstElementChild.style.filter = v ? `blur(${v}px)` : ""; }));
    const items = [
      { prompt: "Set the blur to about 5px. Which version still tells you where to look first?", options: ["Version A", "Version B", "Neither"], answer: 1, why: "In B a few things stay distinct as shapes: the image, the title block and the dark button. In A everything is the same weight, so the blur turns it into grey mush." },
      { prompt: "In version B, what do you notice first when blurred?", options: ["The navigation", "The title and the Book button", "The rating"], answer: 1, why: "Size and the dark filled shape win. That is a deliberate reading order: what it is, then what to do." },
      { prompt: "Version A makes every label bold. What is the effect?", options: ["Everything feels important, so nothing is", "It helps people scan", "It improves accessibility"], answer: 0, why: "Emphasis is relative. Bold only works when most text isn't bold." },
    ];
    $("[data-q]", el).append(Ex.choice({ title: "What survived the blur?", intro: "", items }, { key: "lab-squint:q", onDone: () => api.done(), kind: "Quiz" }));
  },
});

/* ---------- Hierarchy mixer ---------- */
LAB("lab-hierarchy", {
  title: "Hierarchy mixer", skill: "Seeing", mins: 8, lesson: "hierarchy",
  desc: "Tune size, weight and colour on a product card until it reads in the right order: name, then price, then details. The button should stand out without beating the name.",
  art: () => UI.art(S.r(80, 8, 80, 76, "surface", "rule-strong", 6) + S.r(90, 18, 60, 22, "sunk", null, 3) + S.r(90, 46, 44, 7, "ink", null, 2) + S.r(90, 57, 22, 5, "ink-2", null, 2) + S.r(90, 68, 40, 8, "ink", null, 3)),
  mount(el, api) {
    const st = api.data.h || { t: [17, 400, "strong"], p: [17, 400, "strong"], d: [17, 400, "strong"], cta: "outline" };
    const sizes = [13, 15, 17, 21, 26], wts = [[400, "Regular"], [700, "Bold"]], cols = [["strong", "Strong"], ["muted", "Muted"], ["faint", "Faint"]];
    const colVar = { strong: "var(--ink)", muted: "var(--ink-2)", faint: "var(--ink-3)" }, colF = { strong: 1, muted: 0.78, faint: 0.6 };
    const row = (k, name) => `<div class="stack gap-2" style="padding:12px 0;border-bottom:1px solid var(--rule)"><span class="label">${name}</span>${UI.seg(k + "s", sizes.map(s => [s, s + "px"]), st[k][0])}<div class="row gap-2">${UI.seg(k + "w", wts, st[k][1])}${UI.seg(k + "c", cols, st[k][2])}</div></div>`;
    el.innerHTML = `<div class="split-3070"><div>${row("t", "Name")}${row("p", "Price")}${row("d", "Details")}<div class="stack gap-2" style="padding-top:12px"><span class="label">Button</span>${UI.seg("cta", [["primary", "Filled"], ["outline", "Outline"], ["link", "Text link"]], st.cta)}</div></div>
      <div class="stack gap-4"><div class="stage" style="display:grid;place-items:center;min-height:320px;background:var(--paper)"><div data-card style="width:min(300px,100%);background:var(--surface);border:1px solid var(--rule);border-radius:12px;padding:14px;position:relative">
        <div style="height:120px;border-radius:8px;background:var(--sunk);margin-bottom:12px"></div>
        <div data-t style="position:relative">Linen overshirt</div><div data-p style="position:relative;margin-top:4px">£48</div><div data-d style="position:relative;margin-top:4px">Free returns · 4.6 stars (210 reviews)</div>
        <div style="margin-top:14px" data-ctaw></div></div></div><div class="fb" data-fb></div></div></div>`;
    const score = k => st[k][0] * (st[k][1] === 700 ? 1.35 : 1) * colF[st[k][2]];
    const ctaScore = () => ({ primary: 30, outline: 21, link: 15 })[st.cta];
    const paint = () => {
      ["t", "p", "d"].forEach(k => { const n = $(`[data-${k}]`, el); n.style.fontSize = st[k][0] + "px"; n.style.fontWeight = st[k][1]; n.style.color = colVar[st[k][2]]; n.style.fontFamily = k === "t" ? "var(--f-display)" : "var(--f-body)"; n.style.lineHeight = 1.25; });
      const w = $("[data-ctaw]", el);
      w.innerHTML = st.cta === "primary" ? `<span style="display:block;text-align:center;background:var(--ink);color:var(--on-ink);border-radius:8px;padding:10px;font-weight:700">Add to bag</span>` : st.cta === "outline" ? `<span style="display:block;text-align:center;border:1px solid var(--rule-strong);border-radius:8px;padding:10px;font-weight:650">Add to bag</span>` : `<span style="color:var(--accent);font-weight:650;text-decoration:underline">Add to bag</span>`;
      // live reading order badges
      const ranks = [["t", score("t")], ["p", score("p")], ["d", score("d")], ["cta", ctaScore() * 0.9]].sort((a, b) => b[1] - a[1]).map(x => x[0]);
      $$(".rank-badge", el).forEach(x => x.remove());
      ranks.forEach((k, i) => { const target = k === "cta" ? w : $(`[data-${k}]`, el); target.style.position = "relative"; target.append(h(`<span class="rank-badge" style="position:absolute;right:-6px;top:50%;transform:translate(100%,-50%);width:20px;height:20px;border-radius:50%;background:var(--spec);color:var(--surface);font:700 11px/20px var(--f-body);text-align:center">${i + 1}</span>`)); });
      const t = score("t"), p = score("p"), d = score("d"), c = ctaScore();
      const msgs = [];
      if (!(t > p)) msgs.push("The name should lead. Make it larger or bolder than the price.");
      if (!(p > d)) msgs.push("The price should beat the details. Shoppers look for it second.");
      if (d > p * 0.8) msgs.push("The details still compete. Make them smaller or quieter (muted or faint colour).");
      if (t / Math.max(p, 1) > 2.6) msgs.push("The name is shouting. Big jumps make the rest look like small print.");
      if (st.cta === "link") msgs.push("A text link is easy to miss as the main action. Give the button a shape.");
      if (st.cta === "primary" && t < 21) msgs.push("The filled button is now the loudest thing on the card. Fine on a product page, but on a card the name usually leads. Try a larger name.");
      const ok = !msgs.length;
      $("[data-fb]", el).className = "fb " + (ok ? "good" : "warn");
      $("[data-fb]", el).innerHTML = ok ? "<b>That reads well.</b> Name, price, action, details. Notice you didn't need many sizes: two or three sizes plus weight and colour do most of the work." : "<b>Not yet.</b> " + msgs[0];
      api.data.h = st; api.save();
      if (ok) api.done();
    };
    ["t", "p", "d"].forEach(k => {
      UI.bindSeg(el, k + "s", v => { st[k][0] = +v; paint(); });
      UI.bindSeg(el, k + "w", v => { st[k][1] = +v; paint(); });
      UI.bindSeg(el, k + "c", v => { st[k][2] = v; paint(); });
    });
    UI.bindSeg(el, "cta", v => { st.cta = v; paint(); });
    paint();
  },
});

/* ---------- Grid ---------- */
LAB("lab-grid", {
  title: "Grid builder", skill: "Layout", mins: 8, lesson: "layout-grid",
  desc: "Change the columns, gutter and margin of a page and watch content snap to the grid. Then break the alignment to see why grids exist.",
  art: () => UI.art(Array.from({ length: 12 }, (_, i) => `<rect x="${20 + i * 17.5}" y="6" width="13" height="80" style="fill:var(--spec);opacity:.15"/>`).join("") + S.r(20, 16, 206, 18, "sunk", "rule-strong", 2, 1) + S.r(20, 42, 64, 36, "sunk", "rule-strong", 2, 1) + S.r(91, 42, 64, 36, "sunk", "rule-strong", 2, 1) + S.r(162, 42, 64, 36, "sunk", "rule-strong", 2, 1)),
  mount(el, api) {
    const st = { cols: 12, gut: 16, mar: 32, show: true, broken: false };
    el.innerHTML = `<div class="stack gap-4">
      <div class="row gap-5" style="align-items:flex-start">
        <div class="stack gap-2"><span class="label">Columns</span>${UI.seg("cols", [4, 6, 8, 12], 12)}</div>
        <div class="ctls" style="flex:1;min-width:260px">${UI.range("gr-gut", "Gutter", 0, 40, 4, 16, "px")}${UI.range("gr-mar", "Margin", 8, 80, 4, 32, "px")}</div>
      </div>
      <div class="row gap-4"><label class="check-inline"><input type="checkbox" id="gr-show" checked> Show grid</label><label class="check-inline"><input type="checkbox" id="gr-break"> Break the alignment</label></div>
      <div class="stage" style="padding:0;background:var(--surface)"><div data-page style="position:relative;padding-block:20px;min-height:360px">
        <div data-overlay style="position:absolute;inset:0;display:grid;pointer-events:none"></div>
        <div data-content style="position:relative;display:grid;row-gap:16px"></div></div></div>
      <div class="fb" data-fb></div></div>`;
    const blocks = cols => {
      const L = { 12: [[12, 64, "Hero"], [4, 90, "Card"], [4, 90, "Card"], [4, 90, "Card"], [8, 70, "Article"], [4, 70, "Sidebar"]], 8: [[8, 64, "Hero"], [4, 90, "Card"], [4, 90, "Card"], [4, 90, "Card"], [4, 90, "Card"], [8, 70, "Article"]], 6: [[6, 64, "Hero"], [2, 90, "Card"], [2, 90, "Card"], [2, 90, "Card"], [4, 70, "Article"], [2, 70, "Sidebar"]], 4: [[4, 64, "Hero"], [2, 90, "Card"], [2, 90, "Card"], [4, 70, "Article"]] };
      return L[cols];
    };
    const paint = () => {
      const page = $("[data-page]", el), ov = $("[data-overlay]", el), ct = $("[data-content]", el);
      [ov, ct].forEach(g => { g.style.gridTemplateColumns = `repeat(${st.cols}, minmax(0,1fr))`; g.style.columnGap = st.gut + "px"; g.style.paddingInline = st.mar + "px"; });
      ov.innerHTML = Array.from({ length: st.cols }, () => `<i style="background:var(--spec);opacity:${st.show ? .13 : 0}"></i>`).join("");
      const rnd = seeded(5);
      ct.innerHTML = blocks(st.cols).map(([span, hh, label], i) => { const off = st.broken && i % 2 ? Math.round(rnd() * 18 - 9) : 0; const wfix = st.broken && i % 3 === 1 ? -Math.round(rnd() * 22) : 0; return `<div style="grid-column:span ${span};height:${hh}px;background:var(--sunk);border:1px solid var(--rule-strong);border-radius:6px;display:grid;place-items:center;font-size:13px;font-weight:650;color:var(--ink-2);transform:translateX(${off}px);margin-right:${-wfix}px">${label} · ${span} col</div>`; }).join("");
      $$(".redline", page).forEach(r => r.remove());
      page.append(h(`<div class="redline h" style="left:0;width:${st.mar}px;top:10px"><em>${st.mar}</em></div>`));
      if (st.gut) { const first = ov.children[0]; const left = first.offsetLeft + first.offsetWidth; page.append(h(`<div class="redline h" style="left:${left}px;width:${st.gut}px;bottom:8px"><em>${st.gut}</em></div>`)); }
      const msg = st.broken ? "<b>See the ragged edges?</b> A few pixels of drift makes a page feel careless even if nobody can say why. A grid removes that decision from every element." : st.gut === 0 ? "<b>No gutter.</b> Content touches content. Gutters are breathing room between columns, usually 16 to 32px." : st.cols === 12 ? "<b>Twelve columns</b> divide into halves, thirds, quarters and sixths, which is why most web grids use them." : st.cols === 4 ? "<b>Four columns</b> is the usual phone grid: wide enough to hold real content, simple enough to stay consistent." : `<b>${st.cols} columns.</b> Content spans whole columns, so edges line up across rows even when the blocks differ.`;
      $("[data-fb]", el).innerHTML = msg;
    };
    let touched = new Set();
    const t = k => { touched.add(k); if (touched.size >= 3) api.done(); };
    UI.bindSeg(el, "cols", v => { st.cols = +v; paint(); t("cols"); });
    UI.bindRange(el, "gr-gut", v => { st.gut = v; paint(); t("gut"); });
    UI.bindRange(el, "gr-mar", v => { st.mar = v; paint(); t("mar"); });
    $("#gr-show", el).onchange = e => { st.show = e.target.checked; paint(); };
    $("#gr-break", el).onchange = e => { st.broken = e.target.checked; paint(); t("break"); };
    requestAnimationFrame(paint);
    const ro = new ResizeObserver(() => paint()); ro.observe(el); Router.onLeave(() => ro.disconnect());
  },
});

/* ---------- Spacing ---------- */
LAB("lab-spacing", {
  title: "Spacing fixer", skill: "Layout", mins: 8, lesson: "spacing",
  desc: "This card was spaced by eye. Pick values from a 4-point scale so related things sit closer and every gap is deliberate.",
  art: () => UI.art(S.r(70, 8, 100, 76, "surface", "rule-strong", 8) + S.r(80, 18, 60, 8, "ink", null, 2) + S.r(80, 32, 80, 5, "rule-strong", null, 2) + S.r(80, 41, 70, 5, "rule-strong", null, 2) + S.r(80, 58, 36, 12, "ink-2", null, 3) + `<line x1="74" y1="78" x2="80" y2="78" style="stroke:var(--spec)"/>`),
  mount(el, api) {
    const scale = [4, 8, 12, 16, 20, 24, 32, 40, 48];
    const st = api.data.sp || { pad: 13, tt: 7, tb: 22, gap: 9 };
    const knobs = [["pad", "Card padding"], ["tt", "Title to text"], ["tb", "Text to button"], ["gap", "Between cards"]];
    el.innerHTML = `<div class="split-3070"><div class="stack gap-4">${knobs.map(([k, n]) => `<div class="stack gap-2"><span class="label">${n} <span class="faint num" data-v-${k}></span></span>${UI.seg(k, scale, st[k])}</div>`).join("")}</div>
      <div class="stack gap-4"><div class="stage" style="background:var(--paper)"><div data-cards style="display:flex;flex-wrap:wrap;position:relative"></div></div><div class="stack gap-2" data-rules></div></div></div>`;
    const card = (i) => `<div data-card="${i}" style="position:relative;width:200px;max-width:100%;background:var(--surface);border:1px solid var(--rule);border-radius:12px;box-sizing:border-box">
      <div data-title style="font:700 17px/1.25 var(--f-display)">Weekend in Lisbon</div>
      <div data-text style="font-size:14px;line-height:1.45;color:var(--ink-2)">Three days, two neighbourhoods, one very good custard tart.</div>
      <div data-btn style="display:inline-block;background:var(--ink);color:var(--on-ink);border-radius:7px;padding:7px 12px;font-size:13.5px;font-weight:700">View trip</div></div>`;
    const cards = $("[data-cards]", el); cards.innerHTML = card(0) + card(1);
    const paint = () => {
      knobs.forEach(([k]) => { $(`[data-v-${k}]`, el).textContent = st[k] + "px" + (scale.includes(st[k]) ? "" : " (off scale)"); });
      cards.style.gap = st.gap + "px";
      $$("[data-card]", el).forEach(c => { c.style.padding = st.pad + "px"; $("[data-text]", c).style.marginTop = st.tt + "px"; $("[data-btn]", c).style.marginTop = st.tb + "px"; });
      $$(".redline", el).forEach(r => r.remove());
      const c0 = $('[data-card="0"]', el);
      const tt = $("[data-title]", c0), tx = $("[data-text]", c0), bt = $("[data-btn]", c0);
      c0.append(h(`<div class="redline h" style="left:0;width:${st.pad}px;top:${tt.offsetTop + 8}px"><em>${st.pad}</em></div>`));
      c0.append(h(`<div class="redline v" style="left:${tx.offsetLeft + tx.offsetWidth - 26}px;top:${tt.offsetTop + tt.offsetHeight}px;height:${st.tt}px"><em>${st.tt}</em></div>`));
      c0.append(h(`<div class="redline v" style="left:${bt.offsetLeft + bt.offsetWidth + 14}px;top:${tx.offsetTop + tx.offsetHeight}px;height:${st.tb}px"><em>${st.tb}</em></div>`));
      const c1 = $('[data-card="1"]', el);
      if (c1.offsetTop === c0.offsetTop) cards.append(h(`<div class="redline h" style="left:${c0.offsetLeft + c0.offsetWidth}px;width:${st.gap}px;top:40px"><em>${st.gap}</em></div>`));
      const rules = [
        [knobs.every(([k]) => scale.includes(st[k])), "Every value comes from the scale", "Off-scale numbers like 13 or 7 are decisions nobody made. A scale gives you a small set of good answers."],
        [st.tt < st.tb, "Title and text sit closer than text and button", "The title and its description are one idea. The button is the next idea."],
        [st.tb <= st.pad, "Space inside groups is no bigger than the card padding", "If an inner gap beats the padding, content looks like it is escaping the card."],
        [st.pad < st.gap, "Card padding is smaller than the gap between cards", "Internal space ≤ external space. Otherwise two cards read as one."],
      ];
      $("[data-rules]", el).innerHTML = rules.map(([ok, t, why]) => `<div class="fb ${ok ? "good" : "bad"}"><b>${ok ? "✓" : "✗"} ${t}.</b> ${ok ? "" : why}</div>`).join("");
      api.data.sp = st; api.save();
      if (rules.every(r => r[0])) api.done();
    };
    knobs.forEach(([k]) => UI.bindSeg(el, k, v => { st[k] = +v; paint(); }));
    requestAnimationFrame(paint);
    const ro = new ResizeObserver(() => paint()); ro.observe(cards); Router.onLeave(() => ro.disconnect());
  },
});

/* ---------- Box model ---------- */
LAB("lab-box-model", {
  title: "The box model", skill: "Layout", mins: 5, lesson: "spacing",
  desc: "Every element is a box of content, padding, border and margin. Pull each layer and see how the space adds up.",
  art: () => UI.art(`<rect x="60" y="6" width="120" height="80" style="fill:var(--spec-soft)"/><rect x="74" y="18" width="92" height="56" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:3"/><rect x="88" y="30" width="64" height="32" style="fill:var(--surface);stroke:var(--accent)"/>`),
  mount(el, api) {
    const st = { pad: 16, bor: 2, mar: 24, w: 200, sizing: "content" };
    el.innerHTML = `<div class="split-3070"><div class="ctls">${UI.range("bm-w", "Width", 120, 280, 4, 200, "px")}${UI.range("bm-p", "Padding", 0, 48, 2, 16, "px")}${UI.range("bm-b", "Border", 0, 12, 1, 2, "px")}${UI.range("bm-m", "Margin", 0, 48, 2, 24, "px")}
      <div class="stack gap-2"><span class="label">Box sizing</span>${UI.seg("sizing", [["content", "content-box"], ["border", "border-box"]], "content")}</div><div class="fb" data-fb></div></div>
      <div class="stage" style="display:grid;place-items:center;min-height:300px;overflow:auto"><div data-m style="background:var(--spec-soft);outline:1px dashed var(--spec)"><div data-b style="border-style:solid;border-color:var(--warn);background:var(--accent-soft)"><div data-c style="background:var(--surface);outline:1px solid var(--accent);min-height:70px;display:grid;place-items:center;font-size:13px;font-weight:650;color:var(--ink-2)">content</div></div></div></div></div>`;
    let n = 0;
    const paint = () => {
      const m = $("[data-m]", el), b = $("[data-b]", el), c = $("[data-c]", el);
      m.style.padding = st.mar + "px"; b.style.borderWidth = st.bor + "px"; b.style.padding = st.pad + "px";
      const contentW = st.sizing === "content" ? st.w : Math.max(0, st.w - 2 * st.pad - 2 * st.bor);
      c.style.width = contentW + "px";
      const total = contentW + 2 * st.pad + 2 * st.bor;
      $("[data-fb]", el).innerHTML = st.sizing === "content" ? `<b>Width ${st.w}px, but the box is ${total}px wide.</b> In content-box sizing, padding and border are added on top of the width. Plus ${st.mar}px margin each side before the next box.` : `<b>The box stays ${total}px wide.</b> In border-box sizing, padding and border fit inside the width, so the content shrinks to ${contentW}px. Most modern CSS sets this everywhere because it matches how designers think.`;
      if (++n > 4) api.done();
    };
    UI.bindRange(el, "bm-w", v => { st.w = v; paint(); }); UI.bindRange(el, "bm-p", v => { st.pad = v; paint(); }); UI.bindRange(el, "bm-b", v => { st.bor = v; paint(); }); UI.bindRange(el, "bm-m", v => { st.mar = v; paint(); });
    UI.bindSeg(el, "sizing", v => { st.sizing = v; paint(); });
    paint();
  },
});
