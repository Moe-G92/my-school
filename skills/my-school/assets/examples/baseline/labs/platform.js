/* Baseline example: web, mobile, data and other-screen labs. Uses the engine helpers LAB, UI, S, Ex, Color, Fonts, Phone, Chart. */

/* ---------- Touch targets ---------- */
LAB("lab-targets", {
  title: "Touch target checker", skill: "Accessibility", mins: 6, lesson: "accessibility",
  desc: "Overlay the real tap areas on a phone screen and test them against WCAG, Apple and Material minimums. Then pad them out.",
  art: () => UI.art(S.r(90, 6, 60, 80, "surface", "ink-2", 10) + `<rect x="100" y="20" width="12" height="12" style="fill:var(--bad-soft);stroke:var(--bad)"/><rect x="118" y="56" width="26" height="22" style="fill:var(--good-soft);stroke:var(--good)"/>`),
  mount(el, api) {
    let std = 44, show = true, fixed = false;
    const items = [["back", "Back", 18, 18, 14, 16], ["more", "More", 18, 18, 250, 16], ["like", "Like", 20, 20, 30, 300], ["share", "Share", 20, 20, 64, 300], ["link", "Terms", 40, 14, 30, 360], ["cta", "Book", 220, 48, 30, 410], ["close", "Close", 14, 14, 252, 300]];
    el.innerHTML = `<div class="split-3070"><div class="stack gap-4"><div class="stack gap-2"><span class="label">Minimum</span>${UI.seg("tstd", [[24, "WCAG AA 24px"], [44, "Apple 44pt"], [48, "Material 48dp"]], std)}</div><label class="check-inline"><input type="checkbox" id="tg-show" checked> Show tap areas</label><label class="check-inline"><input type="checkbox" id="tg-fix"> Pad small targets</label><div class="fb" data-fb></div></div><div data-ph></div></div>`;
    const paint = () => {
      let fails = 0;
      const els = items.map(([k, label, w, hh, x, y]) => {
        const tw = fixed ? Math.max(w, std) : w, th = fixed ? Math.max(hh, std) : hh; const ok = tw >= std && th >= std; if (!ok) fails++;
        const glyph = k === "cta" ? `<span style="position:absolute;inset:0;display:grid;place-items:center;background:var(--ink);color:var(--on-ink);border-radius:10px;font-weight:700;font-size:14px">${label}</span>` : k === "link" ? `<span style="position:absolute;inset:0;display:grid;place-items:center;font-size:11px;text-decoration:underline;color:var(--accent)">${label}</span>` : `<span style="position:absolute;left:50%;top:50%;width:${w}px;height:${hh}px;transform:translate(-50%,-50%);border-radius:5px;background:var(--ink-2)"></span>`;
        return `<div title="${label}: ${tw}×${th}" style="position:absolute;left:${x - (tw - w) / 2}px;top:${y - (th - hh) / 2}px;width:${tw}px;height:${th}px;${show ? `outline:1.5px dashed ${ok ? "var(--good)" : "var(--bad)"};background:${ok ? "color-mix(in srgb, var(--good) 14%, transparent)" : "color-mix(in srgb, var(--bad) 14%, transparent)"};` : ""}border-radius:6px">${glyph}${show ? `<span style="position:absolute;left:0;top:100%;font:600 10px var(--f-mono);color:${ok ? "var(--good)" : "var(--bad)"};white-space:nowrap">${Math.round(tw)}×${Math.round(th)}</span>` : ""}</div>`;
      }).join("");
      $("[data-ph]", el).innerHTML = Phone(`<div style="position:absolute;inset:0">${S.svg ? "" : ""}<div style="position:absolute;left:14px;right:14px;top:60px;height:200px;border-radius:14px;background:var(--sunk)"></div><div style="position:absolute;left:30px;top:270px;font:700 16px var(--f-display);color:var(--ink)">Harbour loft</div>${els}</div>`, 290);
      $("[data-fb]", el).className = "fb " + (fails ? "warn" : "good");
      $("[data-fb]", el).innerHTML = fails ? `<b>${fails} of ${items.length} targets are under ${std}px.</b> The icon can stay small; the tap area around it shouldn't. Padding grows the target without changing the look.` : `<b>Every target meets ${std}px.</b> Notice the icons look the same as before. Only their invisible tap areas grew.`;
      if (fixed && std >= 44) api.done();
    };
    UI.bindSeg(el, "tstd", v => { std = +v; paint(); });
    $("#tg-show", el).onchange = e => { show = e.target.checked; paint(); };
    $("#tg-fix", el).onchange = e => { fixed = e.target.checked; paint(); };
    paint();
  },
});

/* ---------- Thumb zone ---------- */
LAB("lab-thumb", {
  title: "Thumb zone", skill: "Mobile", mins: 6, lesson: "mobile-basics",
  desc: "Place five actions on a phone held in one hand. Frequent actions belong where the thumb rests; destructive ones belong out of easy reach.",
  art: () => UI.art(S.r(90, 4, 60, 84, "surface", "ink-2", 10) + `<circle cx="150" cy="92" r="46" style="fill:var(--good-soft)"/>` + S.c(130, 74, 7, "ink")),
  mount(el, api) {
    const acts = [["compose", "New message", "easy", "Used many times a day: put it where the thumb already is."], ["search", "Search", "easy", "Frequent, so keep it reachable (bottom bars and search fields at the bottom are now common)."], ["tabs", "Switch tab", "easy", "Navigation you use constantly belongs at the bottom edge."], ["settings", "Settings", "stretch", "Rare. It can live in a corner without costing much."], ["delete", "Delete account", "stretch", "Destructive and rare. A little effort to reach is a feature, not a bug."]];
    let hand = "right"; const place = api.data.place || {};
    el.innerHTML = `<div class="split-3070"><div class="stack gap-3"><div class="stack gap-2"><span class="label">Hand</span>${UI.seg("hand", [["right", "Right"], ["left", "Left"]], hand)}</div><p class="small muted">Tap an action, then tap a zone on the phone (or drag it there).</p><div class="stack gap-2" data-acts></div><button class="btn primary small" type="button" data-check>Check placement</button><div data-fb class="stack gap-2"></div></div><div data-ph></div></div>`;
    let sel = null;
    const paint = () => {
      const cx = hand === "right" ? "100%" : "0%";
      $("[data-ph]", el).innerHTML = Phone(`<div data-zones style="position:absolute;inset:0;background:var(--bad-soft)"><div style="position:absolute;inset:0;background:radial-gradient(circle at ${cx} 100%, var(--good-soft) 0 56%, var(--warn-soft) 56% 84%, transparent 84%)"></div>
        <button type="button" data-z="stretch" style="position:absolute;left:0;right:0;top:0;height:34%;border:0;background:transparent;font:700 12px var(--f-body);color:var(--bad);text-align:${hand === "right" ? "left" : "right"};padding:12px">Stretch</button>
        <button type="button" data-z="ok" style="position:absolute;left:0;right:0;top:34%;height:28%;border:0;background:transparent;font:700 12px var(--f-body);color:var(--warn);text-align:${hand === "right" ? "left" : "right"};padding:12px">OK</button>
        <button type="button" data-z="easy" style="position:absolute;left:0;right:0;bottom:0;height:38%;border:0;background:transparent;font:700 12px var(--f-body);color:var(--good);text-align:${hand === "right" ? "right" : "left"};padding:12px;display:flex;align-items:flex-end;justify-content:${hand === "right" ? "flex-end" : "flex-start"}">Easy</button>
        <div data-pl style="position:absolute;inset:0;pointer-events:none;display:flex;flex-direction:column;justify-content:space-between;padding:40px 14px 18px"></div></div>`, 280);
      const zones = { stretch: [], ok: [], easy: [] }; acts.forEach(([k, n]) => { if (place[k]) zones[place[k]].push(n); });
      $("[data-pl]", el).innerHTML = ["stretch", "ok", "easy"].map(z => `<div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center">${zones[z].map(n => `<span style="background:var(--surface);border:1px solid var(--rule-strong);border-radius:999px;padding:4px 9px;font-size:11.5px;font-weight:650">${n}</span>`).join("")}</div>`).join("");
      $$("[data-z]", el).forEach(z => z.onclick = () => { if (!sel) return; place[sel] = z.dataset.z; sel = null; api.data.place = place; api.save(); list(); paint(); });
    };
    const list = () => { $("[data-acts]", el).innerHTML = acts.map(([k, n]) => `<button type="button" class="chiptoggle" data-a="${k}" aria-pressed="${sel === k}" style="text-align:left;border-radius:8px">${n}${place[k] ? ` <span class="faint">· ${place[k]}</span>` : ""}</button>`).join(""); $$("[data-a]", el).forEach(b => b.onclick = () => { sel = sel === b.dataset.a ? null : b.dataset.a; list(); }); };
    UI.bindSeg(el, "hand", v => { hand = v; paint(); });
    $("[data-check]", el).onclick = () => {
      let right = 0;
      $("[data-fb]", el).innerHTML = acts.map(([k, n, want, why]) => { const got = place[k]; const ok = got === want || (want === "stretch" && got === "ok" && k === "settings"); if (ok) right++; return `<div class="fb ${ok ? "good" : got ? "bad" : "warn"}"><b>${n}:</b> ${got ? (ok ? "good spot." : "better in the " + want + " zone.") : "not placed yet."} ${why}</div>`; }).join("");
      if (right === acts.length) api.done();
    };
    list(); paint();
  },
});

/* ---------- iOS or Android ---------- */
LAB("lab-platform", {
  title: "iOS or Android?", skill: "Mobile", mins: 6, lesson: "ios-android",
  desc: "Eight interface fragments. Say which platform's conventions each one follows, and learn the tell.",
  art: () => UI.art(S.r(40, 10, 70, 72, "surface", "ink-2", 12) + S.r(130, 10, 70, 72, "surface", "ink-2", 8) + S.r(176, 56, 18, 18, "accent-soft", null, 5)),
  mount(el, api) {
    const box = inner => `<div style="border:1px solid var(--rule);border-radius:12px;background:var(--surface);padding:14px;margin:8px 0;max-width:340px;color:var(--ink);font-size:14px">${inner}</div>`;
    const items = [
      { prompt: "A screen header", html: box(`<div style="color:var(--accent);font-size:14px">‹ Back</div><div style="font:800 28px/1.1 var(--f-body);margin-top:6px">Library</div>`), answer: 0, why: "A large, left-aligned bold title under a text back button with a chevron is iOS's large title navigation bar." },
      { prompt: "A screen header", html: box(`<div style="display:flex;align-items:center;gap:18px"><span style="font-size:20px">←</span><span style="font-size:20px">Library</span><span style="margin-left:auto">⋮</span></div>`), answer: 1, why: "An arrow icon for back, title beside it and a vertical three-dot overflow menu: Material's top app bar." },
      { prompt: "Bottom navigation", html: box(`<div style="display:flex;justify-content:space-around;text-align:center;font-size:11px"><div><div style="width:56px;height:28px;border-radius:14px;background:var(--accent-soft);margin:0 auto 4px;display:grid;place-items:center">◆</div><b>Home</b></div><div><div style="height:28px;display:grid;place-items:center">◇</div>Search</div><div><div style="height:28px;display:grid;place-items:center">◇</div>You</div></div>`), answer: 1, why: "The pill-shaped active indicator behind the icon is the Material 3 navigation bar's signature." },
      { prompt: "A primary create action", html: box(`<div style="height:90px;position:relative"><div style="position:absolute;right:4px;bottom:4px;width:56px;height:56px;border-radius:16px;background:var(--accent-soft);display:grid;place-items:center;font-size:26px;color:var(--accent)">+</div></div>`), answer: 1, why: "A floating action button in the bottom corner is a Material pattern. iOS usually puts create actions in the navigation bar or toolbar." },
      { prompt: "A confirmation", html: box(`<div style="text-align:center;padding:6px"><b>Delete photo?</b><div class="small muted" style="margin:4px 0 10px">This can't be undone.</div><div style="display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--rule)"><span style="padding:9px;color:var(--accent);border-right:1px solid var(--rule)">Cancel</span><span style="padding:9px;color:var(--bad);font-weight:700">Delete</span></div></div>`), answer: 0, why: "Centred title and message with full-width buttons side by side, separated by hairlines: an iOS alert." },
      { prompt: "A confirmation", html: box(`<div><b style="font-size:18px">Delete photo?</b><div class="small muted" style="margin:6px 0 14px">This can't be undone.</div><div style="display:flex;justify-content:flex-end;gap:20px;color:var(--accent);font-weight:650">Cancel <span>Delete</span></div></div>`), answer: 1, why: "Left-aligned title and text with text buttons aligned right: a Material dialog." },
      { prompt: "A list of options from the bottom", html: box(`<div style="display:grid;gap:6px;text-align:center"><div style="background:var(--sunk);border-radius:12px;overflow:hidden"><div style="padding:10px;border-bottom:1px solid var(--rule);color:var(--accent)">Save to Files</div><div style="padding:10px;color:var(--bad)">Delete</div></div><div style="background:var(--sunk);border-radius:12px;padding:10px;font-weight:700;color:var(--accent)">Cancel</div></div>`), answer: 0, why: "Stacked rounded groups with a separate Cancel button at the bottom: an iOS action sheet." },
      { prompt: "A segmented choice", html: box(`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;background:var(--sunk);border-radius:9px;padding:2px;font-size:13px;text-align:center"><span style="background:var(--surface);border-radius:7px;padding:5px;box-shadow:var(--shadow-1);font-weight:650">Day</span><span style="padding:5px">Week</span><span style="padding:5px">Month</span></div>`), answer: 0, why: "A grey track with a raised white thumb is iOS's segmented control. Material's segmented buttons are outlined, with a tick on the selected segment." },
    ].map(x => Object.assign(x, { options: ["iOS", "Android (Material)"] }));
    el.append(Ex.choice({ title: "Spot the platform", intro: "", items }, { key: "lab-platform:q", onDone: () => api.done(), kind: "Quiz" }));
  },
});

/* ---------- Responsive ---------- */
LAB("lab-responsive", {
  title: "Responsive reflow", skill: "Web", mins: 6, lesson: "responsive",
  desc: "Drag the viewport from phone to wide desktop. Watch the layout change at its breakpoints and read why each change happens.",
  art: () => UI.art(S.r(20, 14, 40, 66, "surface", "rule-strong", 4) + S.r(80, 14, 60, 66, "surface", "rule-strong", 4) + S.r(160, 14, 66, 66, "surface", "rule-strong", 4)),
  mount(el, api) {
    let w = 375; const seen = new Set();
    el.innerHTML = `<div class="stack gap-4"><div class="ctls">${UI.range("rs-w", "Viewport", 320, 1440, 5, 375, "px")}</div><div class="row gap-3"><span class="tag accent" data-bp></span><span class="small muted" data-why></span></div>
      <div class="stage" style="padding:12px;overflow:hidden;background:var(--sunk)"><div data-scaler style="transform-origin:top left"><div data-vp style="background:var(--surface);border:1px solid var(--rule-strong);border-radius:6px;overflow:hidden"></div></div></div></div>`;
    const css = `<style>.rp{container-type:inline-size;font-size:14px;color:var(--ink)}.rp .hd{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--rule)}.rp .nv{display:none;gap:18px;color:var(--ink-2)}.rp .burger{font-size:20px}.rp .hero{display:grid;gap:14px;padding:20px 16px}.rp .hero h3{font:750 clamp(22px,6cqi,44px)/1.08 var(--f-display);margin:0}.rp .img{background:var(--accent-soft);border-radius:10px;min-height:120px}.rp .cards{display:grid;grid-template-columns:1fr;gap:12px;padding:0 16px 20px}.rp .card{background:var(--sunk);border-radius:10px;padding:14px;min-height:80px}.rp .cta{background:var(--ink);color:var(--on-ink);padding:10px 14px;border-radius:8px;font-weight:700;justify-self:start}
      @container (min-width: 600px){.rp .cards{grid-template-columns:1fr 1fr}.rp .hero{grid-template-columns:1.2fr 1fr;align-items:center}}
      @container (min-width: 900px){.rp .nv{display:flex}.rp .burger{display:none}.rp .cards{grid-template-columns:repeat(3,1fr)}.rp .hero{padding:40px 32px}.rp .cards{padding:0 32px 32px}}
      @container (min-width: 1200px){.rp .inner{max-width:1100px;margin:0 auto}}</style>`;
    const paint = () => {
      const vp = $("[data-vp]", el), sc = $("[data-scaler]", el), avail = sc.parentElement.clientWidth - 24;
      vp.style.width = w + "px"; const k = Math.min(1, avail / w); sc.style.transform = `scale(${k})`; sc.parentElement.style.height = (vp.offsetHeight * k + 24) + "px";
      const bp = w >= 1200 ? "≥ 1200: wide" : w >= 900 ? "900 to 1199: desktop" : w >= 600 ? "600 to 899: tablet" : "< 600: phone";
      const why = w >= 1200 ? "Content stops growing and centres, so lines and cards don't stretch into unreadable widths." : w >= 900 ? "There is room for the full navigation and three cards per row." : w >= 600 ? "Two columns fit, and the hero puts text beside the image." : "One column. Navigation collapses behind a menu button; the call to action stays visible.";
      $("[data-bp]", el).textContent = bp; $("[data-why]", el).textContent = why; seen.add(bp); if (seen.size >= 4) api.done();
    };
    $("[data-vp]", el).innerHTML = css + `<div class="rp"><div class="inner"><div class="hd"><b>Tidewater</b><span class="nv"><span>Tours</span><span>Stays</span><span>Journal</span><span>Contact</span></span><span class="burger">☰</span></div><div class="hero"><div style="display:grid;gap:10px"><h3>Sea kayaking on the Cornish coast</h3><span style="color:var(--ink-2)">Small groups, local guides, every level welcome.</span><span class="cta">See dates</span></div><div class="img"></div></div><div class="cards"><div class="card"><b>Half day</b></div><div class="card"><b>Full day</b></div><div class="card"><b>Sea caves</b></div></div></div></div>`;
    UI.bindRange(el, "rs-w", v => { w = v; paint(); });
    requestAnimationFrame(paint);
    const ro = new ResizeObserver(() => paint()); ro.observe(el); Router.onLeave(() => ro.disconnect());
  },
});

/* ---------- Landing page order ---------- */
LAB("lab-landing", {
  title: "Landing page builder", skill: "Web", mins: 8, lesson: "landing-pages",
  desc: "Arrange the sections of a landing page for a language-learning app. The page preview updates as you go, and the check explains the persuasion logic.",
  art: () => UI.art(S.r(80, 6, 80, 80, "surface", "rule-strong", 4) + S.r(88, 12, 64, 18, "ink", null, 2) + S.r(88, 34, 64, 8, "rule-strong", null, 2) + S.r(88, 46, 64, 14, "sunk", null, 2) + S.r(88, 64, 64, 8, "accent", null, 2)),
  mount(el, api) {
    const secs = { hero: ["Hero", "Headline, one-line promise, main button, product shot"], proof: ["Logos and ratings", "4.8 stars, 2 million learners, as seen in…"], problem: ["The problem", "Why classes and apps haven't stuck for you"], how: ["How it works", "Three steps: pick a goal, 10 minutes a day, real conversations"], benefits: ["Benefits", "What changes for you, not a list of features"], stories: ["Learner stories", "Three short testimonials with names and photos"], pricing: ["Pricing", "Free plan and Pro plan, side by side"], faq: ["FAQ", "Cancel anytime? Offline? Which languages?"], cta: ["Final call to action", "Repeat the promise and the main button"], footer: ["Footer", "Links, legal, contact"] };
    const good = ["hero", "proof", "problem", "how", "benefits", "stories", "pricing", "faq", "cta", "footer"];
    let order = api.data.order || shuffle(good);
    el.innerHTML = `<div class="split"><div><div data-ol></div><div class="row gap-2" style="margin-top:12px"><button class="btn primary small" type="button" data-check>Check the flow</button><button class="btn small quiet" type="button" data-sh>${I.reset} Shuffle</button></div><div class="stack gap-2" data-fb style="margin-top:12px"></div></div><div class="stage" style="background:var(--surface)"><div class="small muted" style="margin-bottom:8px">Page preview</div><div data-pv style="display:grid;gap:6px"></div></div></div>`;
    const paint = () => {
      $("[data-ol]", el).innerHTML = `<ol class="orderlist">${order.map((k, i) => `<li><span class="oi">${i + 1}</span><span><b style="font-size:15px">${secs[k][0]}</b><br><span class="small muted">${secs[k][1]}</span></span><span class="mv"><button type="button" data-i="${i}" data-d="-1" aria-label="Move up" ${i ? "" : "disabled"}>${I.up}</button><button type="button" data-i="${i}" data-d="1" aria-label="Move down" ${i < order.length - 1 ? "" : "disabled"}>${I.down}</button></span></li>`).join("")}</ol>`;
      $$("[data-ol] button", el).forEach(b => b.onclick = () => { const i = +b.dataset.i, j = i + +b.dataset.d; [order[i], order[j]] = [order[j], order[i]]; api.data.order = order; api.save(); paint(); });
      const hgt = { hero: 70, proof: 16, problem: 30, how: 40, benefits: 44, stories: 36, pricing: 46, faq: 30, cta: 34, footer: 24 };
      $("[data-pv]", el).innerHTML = order.map(k => `<div style="height:${hgt[k]}px;border-radius:5px;background:${k === "hero" || k === "cta" ? "var(--accent-soft)" : k === "footer" ? "var(--ink-2)" : "var(--sunk)"};display:flex;align-items:center;padding:0 10px;font-size:11.5px;font-weight:650;color:${k === "footer" ? "var(--on-ink)" : "var(--ink-2)"}">${secs[k][0]}</div>`).join("");
    };
    $("[data-sh]", el).onclick = () => { order = shuffle(good); api.data.order = order; api.save(); $("[data-fb]", el).innerHTML = ""; paint(); };
    $("[data-check]", el).onclick = () => {
      const pos = k => order.indexOf(k); const tips = [];
      if (pos("hero") !== 0) tips.push(["bad", "Start with the hero. In the first seconds people decide whether this page is for them: what is it, who is it for, what do I do next."]);
      if (pos("footer") !== order.length - 1) tips.push(["bad", "The footer goes last. It's where people look for small print, not persuasion."]);
      if (pos("cta") < order.length - 3) tips.push(["warn", "The final call to action should come near the end, after the doubts have been answered."]);
      if (pos("proof") > 3) tips.push(["warn", "Social proof works best early, right after the promise. It answers “can I trust this?” before people invest more attention."]);
      if (pos("problem") > pos("benefits")) tips.push(["warn", "Name the problem before the benefits. Benefits land harder once people recognise their own situation."]);
      if (pos("pricing") < pos("benefits") || pos("pricing") < pos("how")) tips.push(["warn", "Price before value feels expensive. Show how it works and what changes first."]);
      if (pos("faq") < pos("pricing")) tips.push(["warn", "Questions spike right after pricing (can I cancel? is there a free plan?). Put the FAQ after it."]);
      $("[data-fb]", el).innerHTML = tips.length ? tips.map(([c, t]) => `<div class="fb ${c}">${t}</div>`).join("") : `<div class="fb good"><b>That flow persuades.</b> Promise, proof, problem, how, benefits, stories, price, doubts, ask again. Each section answers the question the previous one raises.</div>`;
      if (!tips.length || tips.every(t => t[0] === "warn") && tips.length <= 1) api.done();
    };
    paint();
  },
});

/* ---------- Audit checklist ---------- */
LAB("lab-audit", {
  title: "Polish checklist", skill: "Review", mins: 25, lesson: "web-craft",
  desc: "A 28-point review to run on your own site or app before you ship. Make a project, tick as you go, and add notes. Saved to your account.",
  art: () => UI.art([0, 1, 2, 3].map(i => S.r(70, 12 + i * 18, 12, 12, i < 2 ? "good" : "surface", "rule-strong", 3) + S.r(90, 15 + i * 18, 80, 6, "rule-strong", null, 3)).join("")),
  mount(el, api) {
    const audits = Store.s.extra.audits || (Store.s.extra.audits = {});
    let cur = api.data.cur || Object.keys(audits)[0] || "";
    const render = () => {
      const names = Object.keys(audits);
      el.innerHTML = `<div class="stack gap-4"><div class="row gap-2"><select class="input" id="au-sel" style="max-width:260px">${names.map(n => `<option ${n === cur ? "selected" : ""}>${esc(n)}</option>`).join("")}${names.length ? "" : "<option>No projects yet</option>"}</select><input class="input" id="au-new" placeholder="New project name" style="max-width:220px"><button class="btn small" type="button" data-add>${I.plus} Add</button></div><div data-list></div></div>`;
      $("#au-sel", el).onchange = e => { cur = e.target.value; api.data.cur = cur; api.save(); render(); };
      $("[data-add]", el).onclick = () => { const n = $("#au-new", el).value.trim(); if (!n) { $("#au-new", el).focus(); return; } if (!audits[n]) audits[n] = { checks: {}, notes: {}, created: Date.now() }; cur = n; api.data.cur = n; Store.touch(); render(); };
      if (!cur || !audits[cur]) { $("[data-list]", el).innerHTML = `<p class="muted">Name the site or app you're reviewing, then work through the list. Takes about 25 minutes the first time.</p>`; return; }
      const a = audits[cur]; let total = 0, done = 0;
      $("[data-list]", el).innerHTML = AUDIT.map(([g, items], gi) => `<div style="margin-top:12px"><div class="h3" style="font-size:17px;padding-bottom:6px;border-bottom:1px solid var(--ink)">${g}</div><div class="checklist">${items.map(([t, how], ii) => { const id = gi + "." + ii; total++; if (a.checks[id]) done++; return `<label><input type="checkbox" data-id="${id}" ${a.checks[id] ? "checked" : ""}><span class="ci">${esc(t)}<small>${esc(how)}</small><input class="input" data-note="${id}" placeholder="Note (optional)" value="${esc(a.notes[id] || "")}" style="margin-top:6px;min-height:36px;padding:6px 10px;font-size:14px"></span></label>`; }).join("")}</div></div>`).join("") + `<div class="fb" style="margin-top:16px" data-sum></div>`;
      const sum = () => { const d = Object.values(a.checks).filter(Boolean).length; $("[data-sum]", el).innerHTML = `<b>${d} of ${total} passing.</b> ${d === total ? "Ship it." : "Fix the unticked ones in order: first impression and accessibility matter most."}`; if (d >= 10) api.done(); };
      $$("[data-id]", el).forEach(c => c.onchange = () => { a.checks[c.dataset.id] = c.checked; Store.touch(); sum(); });
      $$("[data-note]", el).forEach(n => { n.addEventListener("click", e => e.preventDefault()); n.oninput = debounce(() => { a.notes[n.dataset.note] = n.value; Store.touch(); }, 500); });
      sum();
    };
    render();
  },
});

/* ---------- Chart chooser ---------- */
LAB("lab-chart-pick", {
  title: "Chart chooser", skill: "Data", mins: 8, lesson: "dashboards",
  desc: "Five questions, five datasets. Pick a chart type for each and see the data drawn your way before the explanation.",
  art: () => UI.art(`<polyline points="30,70 70,55 110,60 150,30 200,22" style="fill:none;stroke:var(--accent);stroke-width:3"/>` + [40, 30, 20].map((v, i) => S.r(150 + i * 20, 80 - v, 14, v, "rule-strong", null, 2)).join("")),
  mount(el, api) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const rnd = seeded(11);
    const qs = [
      { q: "How did monthly sign-ups change over the year?", draw: { line: () => Chart.line([120, 135, 128, 160, 172, 165, 190, 210, 205, 240, 262, 280], months), bar: () => Chart.bar([120, 135, 128, 160, 172, 165], months.slice(0, 6)), pie: () => Chart.pie([120, 135, 128, 160, 172, 165], months.slice(0, 6)) }, best: "line", why: { line: "Time runs left to right and the line shows the trend at a glance.", bar: "Bars work for a few time periods, but twelve months as bars hides the shape of the trend.", pie: "A pie makes months look like parts of a whole. Nobody can read a trend from slices." } },
      { q: "Which of eight regions sold the most last quarter?", draw: { bar: () => Chart.bar([42, 88, 31, 64, 57, 23, 75, 49], ["North", "London", "Wales", "Midlands", "South W.", "N. Ireland", "South E.", "Scotland"], true), pie: () => Chart.pie([42, 88, 31, 64, 57, 23, 75, 49], ["North", "London", "Wales", "Midlands", "South W.", "N. Ireland", "South E.", "Scotland"]), line: () => Chart.line([42, 88, 31, 64, 57, 23, 75, 49], ["N", "L", "W", "M", "SW", "NI", "SE", "S"]) }, best: "bar", why: { bar: "Sorted bars make ranking instant: length is the easiest visual quantity to compare.", pie: "Eight slices of similar size are nearly impossible to rank. Angles are hard to compare.", line: "A line implies the regions are in a sequence, like time. They aren't." } },
      { q: "What share of traffic comes from search, social and direct?", draw: { stacked: () => Chart.stacked([54, 28, 18], ["Search", "Social", "Direct"]), pie: () => Chart.pie([54, 28, 18], ["Search", "Social", "Direct"]), line: () => Chart.line([54, 28, 18], ["Search", "Social", "Direct"]) }, best: "stacked", alt: "pie", why: { stacked: "A single stacked bar shows parts of a whole and is easy to label. With three parts, a pie is acceptable too.", pie: "Fine with two or three parts that differ clearly. Past about five slices, switch to bars.", line: "A line connecting categories invents a trend that doesn't exist." } },
      { q: "Do more expensive courses get better ratings?", draw: { scatter: () => Chart.scatter(Array.from({ length: 40 }, () => { const x = rnd(); return [x, clamp(0.3 + x * 0.5 + (rnd() - 0.5) * 0.35, 0, 1)]; })), bar: () => Chart.bar([3.9, 4.1, 4.3, 4.4, 4.6], ["£0", "£20", "£50", "£100", "£200"]), line: () => Chart.line([3.9, 4.1, 4.3, 4.4, 4.6], ["£0", "£20", "£50", "£100", "£200"]) }, best: "scatter", why: { scatter: "One dot per course shows both the relationship and the spread around it. You can see it's a tendency, not a rule.", bar: "Averaging into price bands hides how much individual courses vary.", line: "A line through averages suggests a smooth law. The real data is noisy." } },
      { q: "How long do most deliveries take?", draw: { hist: () => Chart.hist(Array.from({ length: 200 }, () => clamp(35 + (rnd() + rnd() + rnd() - 1.5) * 30, 0, 79))), line: () => Chart.line([3, 9, 22, 41, 37, 21, 8, 2], ["0", "10", "20", "30", "40", "50", "60", "70"]), pie: () => Chart.pie([3, 9, 22, 41, 37, 21, 8, 2], ["0–9", "10–19", "20–29", "30–39", "40–49", "50–59", "60–69", "70+"]) }, best: "hist", why: { hist: "A histogram groups values into bins and shows the shape: most deliveries take 30 to 50 minutes, with a long tail.", line: "A line over bins can work as a frequency polygon, but bars show counts more honestly.", pie: "A pie of time bins loses the order of the bins, which is the whole point." } },
    ];
    const names = { line: "Line", bar: "Bar", pie: "Pie", scatter: "Scatter", hist: "Histogram", stacked: "Stacked bar" };
    let i = 0, right = 0;
    el.innerHTML = `<div class="stack gap-4"><div class="row" style="justify-content:space-between"><b data-q style="font-size:17px"></b><span class="small muted num" data-n></span></div><div class="row gap-2" data-opts></div><div class="stage" data-ch style="background:var(--surface);min-height:200px;display:grid;place-items:center"></div><div data-fb></div></div>`;
    const show = () => {
      if (i >= qs.length) { $("[data-q]", el).textContent = "Done."; $("[data-opts]", el).innerHTML = ""; $("[data-ch]", el).innerHTML = `<p class="muted">Start from the question, not the chart type.</p>`; $("[data-fb]", el).innerHTML = `<div class="fb good"><b>${right} of ${qs.length} first-time picks were best.</b> Change over time: line. Compare items: sorted bars. Part of a whole: stacked bar (or a simple pie). Relationship: scatter. Distribution: histogram.</div>`; api.done(); return; }
      const Q = qs[i]; let tried = false;
      $("[data-q]", el).textContent = Q.q; $("[data-n]", el).textContent = `${i + 1} of ${qs.length}`;
      $("[data-ch]", el).innerHTML = `<p class="muted small">Pick a chart type.</p>`; $("[data-fb]", el).innerHTML = "";
      $("[data-opts]", el).innerHTML = Object.keys(Q.draw).sort().map(k => `<button type="button" class="chiptoggle" data-k="${k}">${names[k]}</button>`).join("");
      $$("[data-opts] button", el).forEach(b => b.onclick = () => {
        const k = b.dataset.k; $$("[data-opts] button", el).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
        $("[data-ch]", el).innerHTML = Q.draw[k]();
        const ok = k === Q.best || k === Q.alt; if (!tried && k === Q.best) right++; tried = true;
        $("[data-fb]", el).innerHTML = `<div class="fb ${ok ? "good" : "warn"}"><b>${ok ? "Good choice." : "Look at what this hides."}</b> ${Q.why[k]}</div><button class="btn small" type="button" style="margin-top:10px" data-next>Next question</button>`;
        $("[data-next]", el).onclick = () => { i++; show(); };
      });
    };
    show();
  },
});

/* ---------- Table fixer ---------- */
LAB("lab-table", {
  title: "Data table fixer", skill: "Data", mins: 8, lesson: "dashboards",
  desc: "A messy invoice table. Switch on six fixes and watch scanning get easier with each one.",
  art: () => UI.art([0, 1, 2, 3].map(i => S.r(40, 12 + i * 18, 70, 6, "rule-strong", null, 2) + S.r(160, 12 + i * 18, 40, 6, "ink-3", null, 2)).join("")),
  mount(el, api) {
    const fixes = [["align", "Right-align numbers", "Digits line up by place value, so you can compare amounts by their length."], ["tabular", "Tabular figures", "Each digit takes the same width, so columns of numbers stay straight."], ["format", "Consistent number format", "Same currency symbol, decimals and thousands separator everywhere."], ["status", "Status as labelled badges", "Words plus colour, so the status reads at a glance and without colour."], ["lines", "Lighter dividers", "Horizontal hairlines only. Heavy grid lines compete with the data."], ["header", "Clear header", "Short, specific column names with units, styled quieter than the data."]];
    const on = new Set(api.data.on || []);
    const rows = [["INV-1042", "Harbour Café", "1240.5", "£ 1,240.50", "paid"], ["INV-1043", "Northwind Studio", "86", "£86.00", "overdue"], ["INV-1044", "Kite & Co", "12045", "12,045 GBP", "paid"], ["INV-1045", "Lumen Labs", "310.2", "£310.2", "draft"], ["INV-1046", "Greywater Ltd", "4999.99", "£4999.99", "overdue"]];
    el.innerHTML = `<div class="split-3070"><div class="checklist" data-fx></div><div class="stack gap-3"><div style="overflow-x:auto" class="stage" data-t></div><div class="fb" data-fb></div></div></div>`;
    $("[data-fx]", el).innerHTML = fixes.map(([k, n]) => `<label><input type="checkbox" data-k="${k}" ${on.has(k) ? "checked" : ""}><span class="ci">${n}</span></label>`).join("");
    const paint = () => {
      const num = v => on.has("format") ? "£" + Number(v).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : null;
      const badge = s => on.has("status") ? `<span style="display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;font-size:12px;font-weight:700;background:${s === "paid" ? "var(--good-soft)" : s === "overdue" ? "var(--bad-soft)" : "var(--sunk)"};color:${s === "paid" ? "var(--good)" : s === "overdue" ? "var(--bad)" : "var(--ink-2)"}">${s === "paid" ? "✓ Paid" : s === "overdue" ? "! Overdue" : "Draft"}</span>` : `<span style="color:${s === "paid" ? "#2E9E5B" : s === "overdue" ? "#D9453A" : "inherit"}">${s.toUpperCase()}</span>`;
      const bd = on.has("lines") ? "border-bottom:1px solid var(--rule)" : "border:1.5px solid var(--ink-3)";
      const th = on.has("header") ? `font-size:12.5px;color:var(--ink-3);font-weight:650;border-bottom:1px solid var(--ink-3)` : `background:var(--ink-2);color:var(--on-ink);font-weight:800;text-transform:uppercase;${bd}`;
      const al = on.has("align") ? "right" : "left";
      $("[data-t]", el).innerHTML = `<table style="border-collapse:collapse;width:100%;min-width:420px;font-size:14px;background:var(--surface);${on.has("tabular") ? "font-variant-numeric:tabular-nums" : "font-variant-numeric:proportional-nums"}"><thead><tr><th style="text-align:left;padding:8px 10px;${th}">${on.has("header") ? "Invoice" : "INVOICE_ID"}</th><th style="text-align:left;padding:8px 10px;${th}">${on.has("header") ? "Client" : "CUSTOMER NAME FIELD"}</th><th style="text-align:${al};padding:8px 10px;${th}">${on.has("header") ? "Amount (GBP)" : "AMT"}</th><th style="text-align:left;padding:8px 10px;${th}">${on.has("header") ? "Status" : "STATUS_CODE"}</th></tr></thead><tbody>${rows.map(r => `<tr><td style="padding:9px 10px;${bd}">${r[0]}</td><td style="padding:9px 10px;${bd}">${r[1]}</td><td style="padding:9px 10px;text-align:${al};${bd}">${num(r[2]) || r[3]}</td><td style="padding:9px 10px;${bd}">${badge(r[4])}</td></tr>`).join("")}</tbody></table>`;
      const last = api.data.last;
      $("[data-fb]", el).innerHTML = last ? `<b>${fixes.find(f => f[0] === last)[1]}.</b> ${fixes.find(f => f[0] === last)[2]}` : "Which invoice is largest? Try answering before and after the fixes.";
      if (on.size === fixes.length) { $("[data-fb]", el).innerHTML += " <b>All fixes on.</b> The largest amount now jumps out by length alone."; api.done(); }
    };
    $$("[data-fx] input", el).forEach(c => c.onchange = () => { if (c.checked) on.add(c.dataset.k); else on.delete(c.dataset.k); api.data.on = [...on]; api.data.last = c.dataset.k; api.save(); paint(); });
    paint();
  },
});

/* ---------- TV focus ---------- */
LAB("lab-tv-focus", {
  title: "TV remote", skill: "Other screens", mins: 6, lesson: "wearables-tv-voice",
  desc: "Move around a TV interface with the arrow keys or the on-screen remote. Compare focus styles, then step back to sofa distance.",
  art: () => UI.art(S.r(30, 10, 180, 72, "ink", null, 6) + [0, 1, 2].map(i => `<rect x="${44 + i * 54}" y="${i === 1 ? 26 : 30}" width="${i === 1 ? 48 : 42}" height="${i === 1 ? 32 : 26}" rx="4" fill="${i === 1 ? "#F2F4F8" : "#3A3F4A"}"/>`).join("")),
  mount(el, api) {
    let style = "subtle", r = 0, c = 0, far = false, moves = 0; const seen = new Set();
    const rows = [["Continue watching", 5], ["Because you watched Planet Earth", 5]];
    el.innerHTML = `<div class="stack gap-4"><div class="row gap-3"><div class="stack gap-2"><span class="label">Focus style</span>${UI.seg("tvs", [["subtle", "Thin outline"], ["colour", "Colour change only"], ["strong", "Scale, glow and outline"]], style)}</div><label class="check-inline"><input type="checkbox" id="tv-far"> View from the sofa</label></div>
      <div class="split-3070" style="align-items:center"><div class="stack gap-2" style="align-items:center"><div style="display:grid;grid-template-columns:repeat(3,52px);gap:6px" data-pad><span></span><button class="btn" data-d="up" aria-label="Up">${I.up}</button><span></span><button class="btn" data-d="left" aria-label="Left">‹</button><button class="btn" data-d="ok" aria-label="Select">OK</button><button class="btn" data-d="right" aria-label="Right">›</button><span></span><button class="btn" data-d="down" aria-label="Down">${I.down}</button><span></span></div><span class="small muted">or use your arrow keys</span></div>
      <div tabindex="0" data-tv style="outline:none;background:#0E1014;border-radius:12px;padding:6px;overflow:hidden"><div data-screen style="transform-origin:center;transition:transform .3s, filter .3s"></div></div></div><div class="fb" data-fb></div></div>`;
    const paint = () => {
      const scr = $("[data-screen]", el);
      scr.innerHTML = `<div style="padding:18px 22px;color:#E6E8EC">` + rows.map(([t, n], ri) => `<div style="font:700 13px var(--f-body);color:#C9CED8;margin:${ri ? 16 : 0}px 0 8px">${t}</div><div style="display:grid;grid-template-columns:repeat(${n},minmax(0,1fr));gap:10px">${Array.from({ length: n }, (_, ci) => { const f = ri === r && ci === c; const base = `aspect-ratio:16/10;border-radius:8px;background:hsl(${210 + ci * 25 + ri * 40} 25% ${f && style === "colour" ? 46 : 30}%);transition:transform .15s`; const fs = !f ? "" : style === "subtle" ? ";outline:1px solid #9AA1AD;outline-offset:1px" : style === "strong" ? ";transform:scale(1.1);outline:3px solid #FFFFFF;outline-offset:3px;box-shadow:0 8px 24px rgba(255,255,255,.18)" : ""; return `<div style="${base}${fs}"></div>`; }).join("")}</div>`).join("") + `</div>`;
      scr.style.transform = far ? "scale(.45)" : ""; scr.style.filter = far ? "blur(.6px)" : "";
      $("[data-fb]", el).innerHTML = { subtle: "<b>Thin outline.</b> Fine at a desk. From across the room it nearly disappears, and the viewer loses their place.", colour: "<b>Colour change only.</b> A slightly lighter tile is easy to miss, and invisible to some colour-blind viewers.", strong: "<b>Scale, glow and outline.</b> Unmistakable from three metres away. TV focus has to be loud because it's the only cursor there is." }[style] + (far ? " You're now viewing from the sofa." : "");
      if (moves > 4) { seen.add(style + far); if (seen.size >= 3) api.done(); }
    };
    const move = d => { if (d === "left") c = Math.max(0, c - 1); if (d === "right") c = Math.min(rows[r][1] - 1, c + 1); if (d === "up") r = Math.max(0, r - 1); if (d === "down") r = Math.min(rows.length - 1, r + 1); if (d === "ok") toast("Playing tile " + (c + 1)); moves++; paint(); };
    $("[data-pad]", el).addEventListener("click", e => { const b = e.target.closest("[data-d]"); if (b) move(b.dataset.d); });
    $("[data-tv]", el).addEventListener("keydown", e => { const m = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", Enter: "ok" }[e.key]; if (m) { e.preventDefault(); move(m); } });
    $("[data-tv]", el).addEventListener("click", () => $("[data-tv]", el).focus());
    UI.bindSeg(el, "tvs", v => { style = v; paint(); });
    $("#tv-far", el).onchange = e => { far = e.target.checked; paint(); };
    paint();
  },
});

/* ---------- Critique (uses the coach) ---------- */
LAB("lab-critique", {
  title: "Screenshot critique", skill: "Review", mins: 10, lesson: "critique",
  desc: "Upload a screenshot of something you built. The coach reviews it against the fundamentals and ranks the fixes.",
  art: () => UI.art(S.r(60, 8, 120, 76, "surface", "rule-strong", 6) + S.c(160, 24, 10, null, "spec", 2) + S.t(160, 28, "1", { size: 11, w: 700, a: "middle", c: "spec" }) + S.c(90, 60, 10, null, "spec", 2) + S.t(90, 64, "2", { size: 11, w: 700, a: "middle", c: "spec" })),
  mount(el, api) { Review.mount(el, { onDone: () => api.done() }); },
});
