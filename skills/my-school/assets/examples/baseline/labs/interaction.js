/* Baseline example: interaction labs. Uses the engine helpers LAB, UI, S, Ex, Color, Fonts, Phone, Chart. */

/* ---------- Component states ---------- */
LAB("lab-states", {
  title: "Component states", skill: "Components", mins: 10, lesson: "components",
  desc: "Step a button and a text field through every state and read what each one tells the user. Then audit a broken component set.",
  art: () => UI.art(S.r(30, 30, 52, 30, "ink", null, 6) + S.r(94, 30, 52, 30, "ink-2", null, 6) + `<rect x="154" y="26" width="60" height="38" rx="9" style="fill:none;stroke:var(--sel);stroke-width:2"/>` + S.r(158, 30, 52, 30, "ink", null, 6)),
  mount(el, api) {
    const states = [["default", "Default"], ["hover", "Hover"], ["focus", "Focus"], ["active", "Pressed"], ["disabled", "Disabled"], ["loading", "Loading"], ["error", "Error"], ["success", "Success"]];
    const notes = {
      default: "Resting state. It must already look pressable: a shape, a fill or border, and a label that says what happens.",
      hover: "Mouse only. Confirms the thing is interactive. Phones have no hover, so never hide information behind it.",
      focus: "Where the keyboard is. A visible ring of at least 3:1 contrast, usually 2px with a small offset. Removing it locks out keyboard users.",
      active: "The moment of pressing. A slight darken or 1px shift says “got it” before anything else happens.",
      disabled: "Not available right now. Lower contrast and no pointer. Better still, explain why nearby, because a greyed button with no reason is a dead end.",
      loading: "Working on it. Keep the same width so the layout doesn't jump, and block double submits.",
      error: "Something needs fixing. Use colour plus an icon and words that say how to fix it.",
      success: "It worked. Brief confirmation, then get out of the way.",
    };
    let s = "default";
    el.innerHTML = `<div class="stack gap-6"><div class="stack gap-4">${UI.seg("cstate", states, s)}<div class="split"><div class="stage" style="display:grid;place-items:center;min-height:200px;background:var(--surface)" data-btn></div><div class="stage" style="min-height:200px;background:var(--surface)" data-inp></div></div><div class="fb" data-note></div></div>
      <div><div class="h3" style="margin-bottom:6px">Audit a broken set</div><p class="small muted" style="margin-bottom:12px">A developer shipped this set. Tick every statement that is true, then check.</p>
      <div class="stage" style="background:var(--surface)"><div class="row gap-5" style="align-items:flex-start">
        ${[["Default", ""], ["Hover", "filter:brightness(1.15)"], ["Pressed", "transform:translateY(1px);filter:brightness(.9)"], ["Focus", ""], ["Disabled", ""]].map(([n, st]) => `<div class="stack gap-2" style="align-items:center"><span style="background:#2B57D6;color:#fff;padding:10px 18px;border-radius:8px;font-weight:700;font-size:14px;${st}">Save</span><span class="small muted">${n}</span></div>`).join("")}
        <div class="stack gap-2" style="align-items:center"><span style="background:#2B57D6;color:#fff;padding:10px 12px;border-radius:8px;font-weight:700;font-size:14px;display:inline-flex;gap:8px;align-items:center"><i style="width:14px;height:14px;border:2px solid #fff;border-right-color:transparent;border-radius:50%;display:inline-block"></i>Saving your changes</span><span class="small muted">Loading</span></div>
        <div class="stack gap-2"><span style="border:1.5px solid #D93025;border-radius:8px;padding:9px 12px;font-size:14px;width:180px;color:var(--ink)">sam@example</span><span class="small muted" style="text-align:center">Error</span></div></div></div>
      <div class="checklist" data-audit style="margin-top:12px"></div><div class="row gap-2" style="margin-top:12px"><button class="btn primary small" type="button" data-check>Check</button></div><div data-afb style="margin-top:12px"></div></div></div>`;
    const paint = () => {
      const btnStyle = { default: "background:var(--ink);color:var(--on-ink)", hover: "background:var(--ink-2);color:var(--on-ink)", focus: "background:var(--ink);color:var(--on-ink);outline:2px solid var(--sel);outline-offset:3px", active: "background:var(--ink);color:var(--on-ink);transform:translateY(1px);filter:brightness(.85)", disabled: "background:var(--sunk);color:var(--ink-3);cursor:not-allowed", loading: "background:var(--ink);color:var(--on-ink)", error: "background:var(--bad);color:var(--surface)", success: "background:var(--good);color:var(--surface)" }[s];
      const label = { loading: `<i style="width:14px;height:14px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;display:inline-block"></i> Saving`, error: "Try again", success: "✓ Saved" }[s] || "Save changes";
      $("[data-btn]", el).innerHTML = `<span style="display:inline-flex;align-items:center;justify-content:center;gap:8px;min-width:150px;padding:12px 18px;border-radius:8px;font-weight:700;${btnStyle}">${label}</span>`;
      const inpBorder = { focus: "2px solid var(--sel)", error: "2px solid var(--bad)", success: "2px solid var(--good)", disabled: "1px solid var(--rule)", hover: "1px solid var(--ink-3)" }[s] || "1px solid var(--rule-strong)";
      $("[data-inp]", el).innerHTML = `<div class="stack gap-2" style="max-width:300px"><label style="font-weight:700;font-size:14px;${s === "disabled" ? "color:var(--ink-3)" : ""}">Email</label><div style="border:${inpBorder};border-radius:8px;padding:10px 12px;background:${s === "disabled" ? "var(--sunk)" : "var(--surface)"};color:${s === "disabled" ? "var(--ink-3)" : "var(--ink)"};font-size:15px">${s === "default" || s === "hover" ? `<span style="color:var(--ink-3)">name@example.com</span>` : s === "error" ? "sam@example" : "sam@example.com"}${s === "focus" ? `<span style="border-left:1.5px solid var(--ink);margin-left:1px"></span>` : ""}</div>${s === "error" ? `<span style="color:var(--bad);font-size:13.5px;font-weight:600">⚠ Add the end of the address, like .com</span>` : s === "success" ? `<span style="color:var(--good);font-size:13.5px;font-weight:600">✓ Looks good</span>` : s === "disabled" ? `<span class="small faint">Managed by your organisation</span>` : `<span class="small muted">We'll send the receipt here.</span>`}</div>`;
      $("[data-note]", el).innerHTML = `<b>${states.find(x => x[0] === s)[1]}.</b> ${notes[s]}`;
    };
    const seen = new Set(["default"]);
    UI.bindSeg(el, "cstate", v => { s = v; seen.add(v); paint(); });
    paint();
    const stmts = [["Disabled looks the same as the default state", true], ["There is no visible focus state for keyboard users", true], ["The loading state changes the button's width", true], ["The error field relies on red alone, with no message or icon", true], ["The pressed state gives no feedback", false], ["Hover has no visible change", false]];
    $("[data-audit]", el).innerHTML = stmts.map(([t], i) => `<label><input type="checkbox" data-i="${i}"><span class="ci">${t}</span></label>`).join("");
    $("[data-check]", el).onclick = () => {
      let right = 0; const lines = [];
      stmts.forEach(([t, truth], i) => { const on = $(`[data-i="${i}"]`, el).checked; if (on === truth) right++; else lines.push(`<li>${truth ? "Missed" : "Not true"}: ${t.toLowerCase()}.</li>`); });
      $("[data-afb]", el).innerHTML = `<div class="fb ${right === stmts.length ? "good" : "warn"}"><b>${right} of ${stmts.length} correct.</b> ${right === stmts.length ? "Four real problems: identical disabled, no focus ring, a jumping loading state and colour-only errors. Each is common in generated components." : `<ul style="margin:6px 0 0;padding-left:1.2em">${lines.join("")}</ul>`}</div>`;
      if (right === stmts.length || seen.size >= 6) api.done();
    };
  },
});

/* ---------- Design tokens ---------- */
LAB("lab-tokens", {
  title: "Design tokens", skill: "Systems", mins: 12, lesson: "design-systems",
  desc: "Map raw colours to semantic roles. Switch brand and theme and watch one interface follow. Two mappings fail contrast: fix them.",
  art: () => UI.art(S.r(20, 20, 60, 50, "accent", null, 6) + S.arrow(90, 45, 110, 45, "ink-3") + S.r(118, 30, 50, 30, "surface", "rule-strong", 4) + S.arrow(176, 45, 196, 45, "ink-3") + S.r(200, 34, 26, 22, "ink", null, 4)),
  mount(el, api) {
    const hues = { Blue: 262, Green: 155, Plum: 330 };
    const prim = brand => { const sc = Pal.scale(Color.oklch(0.55, 0.17, hues[brand])); const ne = Pal.scale(Color.oklch(0.55, 0.17, hues[brand]), true); const out = {}; Pal.steps.forEach(s => { out["brand-" + s] = sc[s]; out["grey-" + s] = ne[s]; }); out.white = "#FFFFFF"; out.black = "#0B0C0F"; out["red-600"] = "#C62828"; out["red-300"] = "#F28B82"; return out; };
    const roles = [["bg", "Page background"], ["surface", "Card surface"], ["text", "Text"], ["muted", "Muted text"], ["border", "Border"], ["primary", "Primary action"], ["onPrimary", "Text on primary"], ["danger", "Danger"]];
    const defMap = { light: { bg: "grey-50", surface: "white", text: "grey-900", muted: "grey-400", border: "grey-200", primary: "brand-400", onPrimary: "white", danger: "red-600" }, dark: { bg: "grey-950", surface: "grey-900", text: "grey-50", muted: "grey-400", border: "grey-800", primary: "brand-400", onPrimary: "black", danger: "red-300" } };
    const map = api.data.map || JSON.parse(JSON.stringify(defMap));
    let brand = "Blue", theme = "light";
    el.innerHTML = `<div class="stack gap-5"><div class="row gap-4"><div class="stack gap-2"><span class="label">Brand</span>${UI.seg("tbrand", Object.keys(hues), brand)}</div><div class="stack gap-2"><span class="label">Theme</span>${UI.seg("ttheme", [["light", "Light"], ["dark", "Dark"]], theme)}</div><button class="btn small quiet" type="button" data-reset>${I.reset} Reset mapping</button></div>
      <div class="split"><div class="stack gap-1" data-map></div><div class="stack gap-3"><div data-ui></div><div data-checks class="stack gap-2"></div></div></div></div>`;
    const paint = () => {
      const P = prim(brand), m = map[theme], v = k => P[m[k]];
      const opts = Object.keys(P);
      $("[data-map]", el).innerHTML = `<div class="row small" style="justify-content:space-between;color:var(--ink-3);font-weight:650;padding-bottom:6px;border-bottom:1px solid var(--rule)"><span>Semantic token (${theme})</span><span>Primitive</span></div>` + roles.map(([k, n]) => `<div class="row" style="justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--rule);flex-wrap:nowrap"><span class="small"><b class="mono" style="font-size:13px">${k}</b><br><span class="muted">${n}</span></span><span class="row gap-2" style="flex-wrap:nowrap"><i style="width:22px;height:22px;border-radius:5px;background:${v(k)};border:1px solid var(--rule-strong);flex:none"></i><select class="input mono" data-k="${k}" style="min-height:36px;padding:4px 8px;font-size:13px;width:130px">${opts.map(o => `<option ${o === m[k] ? "selected" : ""}>${o}</option>`).join("")}</select></span></div>`).join("");
      $$("[data-map] select", el).forEach(s => s.onchange = () => { map[theme][s.dataset.k] = s.value; api.data.map = map; api.save(); paint(); });
      $("[data-ui]", el).innerHTML = `<div style="background:${v("bg")};border-radius:12px;padding:16px;border:1px solid var(--rule)"><div style="background:${v("surface")};border:1px solid ${v("border")};border-radius:10px;padding:16px;color:${v("text")};display:grid;gap:8px;font-size:14px"><b style="font:700 17px var(--f-display)">Delete workspace?</b><span style="color:${v("muted")}">This removes 14 pages for everyone. You can restore it within 30 days.</span><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px"><span style="background:${v("primary")};color:${v("onPrimary")};padding:8px 14px;border-radius:8px;font-weight:700">Keep workspace</span><span style="border:1px solid ${v("danger")};color:${v("danger")};padding:8px 14px;border-radius:8px;font-weight:700">Delete</span></div></div></div>`;
      const checks = [["Text on surface", v("text"), v("surface"), 4.5], ["Muted text on surface", v("muted"), v("surface"), 4.5], ["Text on primary", v("onPrimary"), v("primary"), 4.5], ["Danger on surface", v("danger"), v("surface"), 4.5], ["Border on surface", v("border"), v("surface"), 1.25]];
      let pass = 0;
      $("[data-checks]", el).innerHTML = checks.map(([n, a, b, need]) => { const r = Color.contrast(a, b), ok = r >= need; if (ok) pass++; return `<div class="row small" style="justify-content:space-between;flex-wrap:nowrap"><span>${n}${need < 3 ? ' <span class="faint">(just visible)</span>' : ""}</span><span class="row gap-2" style="flex-wrap:nowrap"><span class="num mono">${Color.ratioText(r)}</span><span class="tag ${ok ? "good" : "bad"}">${ok ? "Pass" : "Fail"}</span></span></div>`; }).join("");
      const both = ["light", "dark"].every(t => { const mm = map[t], vv = k => P[mm[k]]; return Color.contrast(vv("text"), vv("surface")) >= 4.5 && Color.contrast(vv("muted"), vv("surface")) >= 4.5 && Color.contrast(vv("onPrimary"), vv("primary")) >= 4.5 && Color.contrast(vv("danger"), vv("surface")) >= 4.5; });
      $("[data-checks]", el).append(h(`<div class="fb ${both ? "good" : "warn"}">${both ? "<b>Both themes pass.</b> Notice you fixed it in one place and every screen using these tokens is fixed too. That is the point of semantic tokens." : "<b>Some pairs fail" + (pass === checks.length ? " in the other theme" : "") + ".</b> Try a darker grey for muted text in light mode, and check what sits on the primary colour."}</div>`));
      if (both) api.done();
    };
    UI.bindSeg(el, "tbrand", v => { brand = v; paint(); });
    UI.bindSeg(el, "ttheme", v => { theme = v; paint(); });
    $("[data-reset]", el).onclick = () => { Object.assign(map, JSON.parse(JSON.stringify(defMap))); api.data.map = map; api.save(); paint(); };
    paint();
  },
});

/* ---------- Form fixer ---------- */
LAB("lab-form-fix", {
  title: "Form fixer", skill: "Forms", mins: 10, lesson: "forms",
  desc: "A sign-up form with eight classic problems. Switch on each fix, watch the form change, and read why it matters.",
  art: () => UI.art(S.r(70, 10, 100, 12, "rule-strong", null, 3) + S.r(70, 28, 100, 14, "surface", "rule-strong", 3) + S.r(70, 50, 100, 14, "surface", "bad", 3) + S.r(70, 72, 60, 14, "ink", null, 4)),
  mount(el, api) {
    const fixes = [
      ["labels", "Visible labels", "Placeholder text disappears as soon as you type, so people forget what the field was for. Labels above the field stay put."],
      ["column", "One column", "Two columns make the eye zigzag and people skip fields. One column gives one clear path down the form."],
      ["types", "Right input types", "An email field brings up the @ keyboard on phones; a phone field brings up the number pad. Fewer taps, fewer typos."],
      ["fewer", "Fewer fields", "Every field costs effort and drops completion. Fax, title and ‘confirm email’ add nothing here."],
      ["optional", "Mark optional, not required", "When most fields are required, asterisks become noise. Mark the one optional field instead."],
      ["errors", "Specific inline errors", "‘Invalid input’ at the top makes people hunt. An error next to the field that says how to fix it gets fixed."],
      ["button", "Specific button label", "‘Submit’ describes the system. ‘Create account’ describes what happens to the person."],
      ["show", "Show password, not confirm", "Typing a password twice catches few errors and annoys everyone. A show toggle lets people check what they typed."],
    ];
    const on = new Set(api.data.on || []);
    el.innerHTML = `<div class="split-3070"><div class="checklist" data-fixes></div><div class="stack gap-3"><div class="stage" style="background:var(--surface)" data-form></div><div class="fb" data-fb></div></div></div>`;
    $("[data-fixes]", el).innerHTML = fixes.map(([k, n]) => `<label><input type="checkbox" data-k="${k}" ${on.has(k) ? "checked" : ""}><span class="ci">${n}</span></label>`).join("");
    const inp = (label, ph, type, opt, err) => {
      const showLabel = on.has("labels");
      const field = `<div style="border:1.5px solid ${err ? "#D93025" : "var(--rule-strong)"};border-radius:8px;padding:10px 12px;font-size:14.5px;color:var(--ink-3);background:var(--surface);display:flex;justify-content:space-between;gap:8px"><span>${err ? `<span style="color:var(--ink)">${err[0]}</span>` : showLabel ? (ph || "") : label + (on.has("optional") ? "" : " *")}</span>${type === "password" && on.has("show") ? `<span style="color:var(--accent);font-weight:650">Show</span>` : ""}${on.has("types") && type === "email" ? `<span class="faint" style="font-size:12px">@ keyboard</span>` : on.has("types") && type === "tel" ? `<span class="faint" style="font-size:12px">number pad</span>` : ""}</div>`;
      return `<div style="display:grid;gap:5px">${showLabel ? `<span style="font-size:13.5px;font-weight:700;color:var(--ink)">${label}${opt && on.has("optional") ? ' <span style="font-weight:400;color:var(--ink-3)">(optional)</span>' : !on.has("optional") ? ' <span style="color:#D93025">*</span>' : ""}</span>` : ""}${field}${err && on.has("errors") ? `<span style="color:#D93025;font-size:13px;font-weight:600">⚠ ${err[1]}</span>` : ""}</div>`;
    };
    const paint = () => {
      const fields = [
        !on.has("fewer") && ["Title", "Mr / Ms / Dr", "text"],
        ["Full name", "", "text"],
        ["Email", "name@example.com", "email", false, null],
        !on.has("fewer") && ["Confirm email", "", "email"],
        ["Mobile number", "", "tel", true],
        !on.has("fewer") && ["Fax", "", "tel"],
        ["Password", "At least 8 characters", "password", false, ["pass12", "Use at least 8 characters. Yours has 6."]],
        !on.has("show") && ["Confirm password", "", "password"],
      ].filter(Boolean);
      const cols = on.has("column") ? 1 : 2;
      $("[data-form]", el).innerHTML = `<div style="max-width:440px">${!on.has("errors") ? `<div style="background:#FCE8E6;color:#A50E0E;border-radius:6px;padding:8px 10px;font-size:13.5px;margin-bottom:12px">Error: invalid input</div>` : ""}<div style="font:700 19px var(--f-display);margin-bottom:12px;color:var(--ink)">Create your account</div><div style="display:grid;grid-template-columns:repeat(${cols},minmax(0,1fr));gap:${cols === 1 ? 14 : 10}px">${fields.map(f => inp(...f)).join("")}</div><div style="margin-top:16px"><span style="display:inline-block;background:var(--ink);color:var(--on-ink);border-radius:8px;padding:11px 18px;font-weight:700;font-size:14.5px">${on.has("button") ? "Create account" : "Submit"}</span></div></div>`;
      const last = api.data.last;
      $("[data-fb]", el).innerHTML = last ? `<b>${fixes.find(f => f[0] === last)[1]}.</b> ${fixes.find(f => f[0] === last)[2]} <span class="faint">(${on.size} of ${fixes.length} fixes on)</span>` : "Switch on a fix to see what changes.";
      if (on.size === fixes.length) { $("[data-fb]", el).innerHTML += " <b>All eight on.</b> Same goal, a fraction of the effort."; api.done(); }
    };
    $$("[data-fixes] input", el).forEach(c => c.onchange = () => { if (c.checked) on.add(c.dataset.k); else on.delete(c.dataset.k); api.data.on = [...on]; api.data.last = c.dataset.k; api.save(); paint(); });
    paint();
  },
});

/* ---------- Easing ---------- */
LAB("lab-easing", {
  title: "Easing and duration", skill: "Motion", mins: 10, lesson: "motion",
  desc: "Drag the handles of a timing curve, set a duration and play it. Then match motions to situations.",
  art: () => UI.art(`<path d="M40 80 C 70 80, 90 10, 200 10" style="fill:none;stroke:var(--accent);stroke-width:3"/>` + S.c(70, 80, 5, "spec") + S.c(90, 10, 5, "spec")),
  mount(el, api) {
    const presets = { linear: [0, 0, 1, 1], ease: [0.25, 0.1, 0.25, 1], "ease-in": [0.42, 0, 1, 1], "ease-out": [0, 0, 0.58, 1], "ease-in-out": [0.42, 0, 0.58, 1], snappy: [0.2, 0, 0, 1], overshoot: [0.34, 1.56, 0.64, 1] };
    let p = presets["ease-out"].slice(), dur = 250;
    el.innerHTML = `<div class="split-3070"><div class="stack gap-4"><div class="stack gap-2"><span class="label">Presets</span><div class="chips" data-pre>${Object.keys(presets).map(k => `<button type="button" class="chiptoggle" data-k="${k}">${k}</button>`).join("")}</div></div>${UI.range("ea-d", "Duration", 100, 1200, 50, 250, "ms")}<div class="given mono small" data-css></div><button class="btn primary" type="button" data-play>${I.play} Play</button></div>
      <div class="stack gap-4"><div class="stage" style="padding:12px;background:var(--surface)"><svg data-curve viewBox="-20 -60 240 300" style="width:100%;max-width:340px;display:block;margin:0 auto;touch-action:none"></svg></div>
      <div class="stage" style="background:var(--surface)"><div class="small muted" style="margin-bottom:8px">Your curve vs linear</div><div style="position:relative;height:44px;border-bottom:1px dashed var(--rule)"><div data-b1 style="position:absolute;left:0;top:6px;width:32px;height:32px;border-radius:8px;background:var(--accent)"></div></div><div style="position:relative;height:44px"><div data-b2 style="position:absolute;left:0;top:6px;width:32px;height:32px;border-radius:8px;background:var(--ink-3)"></div></div><div class="row gap-4" style="margin-top:12px;align-items:flex-end"><div data-menu style="width:160px;height:110px;border-radius:10px;background:var(--sunk);border:1px solid var(--rule);transform-origin:top left"></div><span class="small muted">A menu opening with your curve</span></div></div></div></div>
      <div data-q style="margin-top:24px"></div>`;
    const svg = $("[data-curve]", el);
    const X = v => v * 200, Y = v => 200 - v * 200;
    const draw = () => {
      svg.innerHTML = `<rect x="0" y="0" width="200" height="200" style="fill:var(--paper);stroke:var(--rule)"/>` + S.l(0, 200, X(p[0]), Y(p[1]), "spec", 1) + S.l(200, 0, X(p[2]), Y(p[3]), "spec", 1) + `<path d="M0 200 C ${X(p[0])} ${Y(p[1])}, ${X(p[2])} ${Y(p[3])}, 200 0" style="fill:none;stroke:var(--accent);stroke-width:3"/>` + `<circle data-h="0" cx="${X(p[0])}" cy="${Y(p[1])}" r="9" style="fill:var(--spec);cursor:grab"/><circle data-h="1" cx="${X(p[2])}" cy="${Y(p[3])}" r="9" style="fill:var(--spec);cursor:grab"/>` + S.t(0, 220, "time →", { size: 11, c: "ink-3" }) + S.t(-6, 100, "progress", { size: 11, c: "ink-3", a: "middle" }).replace("<text", '<text transform="rotate(-90 -6 100)"');
      const css = `cubic-bezier(${p.map(v => +v.toFixed(2)).join(", ")})`;
      $("[data-css]", el).textContent = `transition: transform ${dur}ms ${css};`;
      $$("[data-pre] button", el).forEach(b => b.setAttribute("aria-pressed", String(presets[b.dataset.k].every((v, i) => Math.abs(v - p[i]) < 0.005))));
    };
    let drag = null;
    svg.addEventListener("pointerdown", e => { const c = e.target.closest("[data-h]"); if (!c) return; drag = +c.dataset.h; svg.setPointerCapture(e.pointerId); });
    svg.addEventListener("pointermove", e => { if (drag === null) return; const r = svg.getBoundingClientRect(); const sx = 240 / r.width, sy = 300 / r.height; const x = (e.clientX - r.left) * sx - 20, y = (e.clientY - r.top) * sy - 60; p[drag * 2] = clamp(x / 200, 0, 1); p[drag * 2 + 1] = clamp((200 - y) / 200, -0.5, 1.5); draw(); });
    svg.addEventListener("pointerup", () => { drag = null; });
    $("[data-pre]", el).addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; p = presets[b.dataset.k].slice(); draw(); });
    UI.bindRange(el, "ea-d", v => { dur = v; draw(); });
    let at = 0;
    $("[data-play]", el).onclick = () => {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const b1 = $("[data-b1]", el), b2 = $("[data-b2]", el), menu = $("[data-menu]", el);
      const dist = b1.parentElement.offsetWidth - 32; at = at ? 0 : dist;
      const ease = `cubic-bezier(${p.join(",")})`;
      b1.style.transition = `transform ${dur}ms ${ease}`; b2.style.transition = `transform ${dur}ms linear`;
      b1.style.transform = b2.style.transform = `translateX(${at}px)`;
      menu.style.transition = "none"; menu.style.transform = "scale(.6)"; menu.style.opacity = "0";
      requestAnimationFrame(() => requestAnimationFrame(() => { menu.style.transition = `transform ${dur}ms ${ease}, opacity ${Math.min(dur, 200)}ms linear`; menu.style.transform = "scale(1)"; menu.style.opacity = "1"; }));
      if (reduce) toast("Your system asks for reduced motion; motion still plays here so you can study it.");
    };
    draw();
    const items = [
      { prompt: "A dropdown menu appears when you click a button.", options: ["ease-in, 400ms", "ease-out, about 150 to 200ms", "linear, 600ms"], answer: 1, why: "Things entering should start fast and settle (ease-out), and small UI moves should be quick. Ease-in makes the start feel sluggish, right when the user is waiting." },
      { prompt: "A toast notification leaves the screen after a few seconds.", options: ["ease-in, about 200ms", "ease-out, 800ms", "an overshoot spring"], answer: 0, why: "Exits can accelerate away (ease-in): nobody is waiting on them. Keep it short so it doesn't distract." },
      { prompt: "A full-screen panel slides across on a tablet.", options: ["100ms linear", "about 300 to 400ms with ease-in-out", "1.2s ease-out"], answer: 1, why: "Bigger distances need a little more time to stay readable. Ease-in-out suits an element that is on screen at both ends of the move." },
      { prompt: "A progress bar fills while a file uploads.", options: ["Linear, matched to real progress", "Overshoot spring", "Ease-in"], answer: 0, why: "Progress should reflect reality. Easing a progress bar fakes speed and erodes trust." },
    ];
    $("[data-q]", el).append(Ex.choice({ title: "Which motion fits?", intro: "", items }, { key: "lab-easing:q", onDone: () => api.done(), kind: "Quiz" }));
  },
});

/* ---------- Fitts ---------- */
LAB("lab-fitts", {
  title: "Fitts's law game", skill: "Psychology", mins: 6, lesson: "laws",
  desc: "Click the start dot, then the target, fifteen times. Targets vary in size and distance. Your own times will draw the law.",
  art: () => UI.art(S.c(40, 46, 8, "ink") + S.c(120, 46, 22, "good-soft", "good") + S.c(210, 30, 6, "bad-soft", "bad")),
  mount(el, api) {
    const N = 15; let trials = [], t0 = 0, phase = "idle", cur = null;
    el.innerHTML = `<div class="stack gap-4"><div class="row" style="justify-content:space-between"><span class="small muted" data-st>Press start, then click each blue target as fast as you can.</span><button class="btn primary small" type="button" data-go>Start</button></div>
      <div data-arena class="stage" style="height:340px;padding:0;background:var(--surface);user-select:none;touch-action:manipulation"></div><div data-res></div></div>`;
    const arena = $("[data-arena]", el);
    const next = () => {
      if (trials.length >= N) return finish();
      const W = arena.clientWidth, H = arena.clientHeight;
      const size = [16, 28, 48, 72][Math.floor(Math.random() * 4)];
      const sx = W / 2, sy = H / 2; const ang = Math.random() * Math.PI * 2; const maxD = Math.min(W, H) / 2 - size / 2 - 8; const d = 60 + Math.random() * Math.max(10, maxD - 60);
      const tx = clamp(sx + Math.cos(ang) * d, size / 2 + 4, W - size / 2 - 4), ty = clamp(sy + Math.sin(ang) * d, size / 2 + 4, H - size / 2 - 4);
      cur = { size, D: Math.hypot(tx - sx, ty - sy) };
      arena.innerHTML = `<button type="button" data-start style="position:absolute;left:${sx - 12}px;top:${sy - 12}px;width:24px;height:24px;border-radius:50%;border:2px solid var(--ink);background:var(--surface)" aria-label="Start point"></button><span class="small muted" style="position:absolute;left:12px;top:10px">${trials.length + 1} / ${N}</span>`;
      $("[data-start]", arena).onclick = () => {
        t0 = performance.now(); $("[data-start]", arena).style.background = "var(--ink)";
        const t = h(`<button type="button" aria-label="Target" style="position:absolute;left:${tx - size / 2}px;top:${ty - size / 2}px;width:${size}px;height:${size}px;border-radius:50%;border:0;background:var(--sel)"></button>`);
        t.onclick = e => { e.stopPropagation(); trials.push({ ID: Math.log2(cur.D / cur.size + 1), ms: performance.now() - t0, size }); next(); };
        arena.append(t);
      };
    };
    const finish = () => {
      arena.innerHTML = "";
      const xs = trials.map(t => t.ID), ys = trials.map(t => t.ms); const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
      const b = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) / Math.max(1e-6, xs.reduce((s, x) => s + (x - mx) ** 2, 0)); const a = my - b * mx;
      const W = 560, H = 260, maxX = Math.max(...xs) * 1.1, maxY = Math.max(...ys) * 1.1;
      const px = x => 50 + x / maxX * (W - 70), py = y => H - 30 - y / maxY * (H - 50);
      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;display:block">` + S.l(50, H - 30, W - 10, H - 30, "rule-strong", 1) + S.l(50, 10, 50, H - 30, "rule-strong", 1) + S.t(W / 2, H - 6, "difficulty: log2(distance / size + 1)", { size: 12, a: "middle", c: "ink-3" }) + S.t(14, H / 2, "ms", { size: 12, c: "ink-3" });
      [0, 0.5, 1].forEach(f => { const y = maxY * f; svg += S.t(44, py(y) + 4, Math.round(y), { size: 11, a: "end", c: "ink-3" }); });
      trials.forEach(t => { svg += S.c(px(t.ID), py(t.ms), t.size > 40 ? 6 : 4, t.size >= 48 ? "good" : t.size <= 16 ? "bad" : "accent"); });
      svg += S.l(px(0.2), py(a + b * 0.2), px(maxX * 0.95), py(a + b * maxX * 0.95), "spec", 2);
      svg += "</svg>";
      const small = trials.filter(t => t.size <= 16), big = trials.filter(t => t.size >= 48); const avg = arr => arr.length ? Math.round(arr.reduce((s, t) => s + t.ms, 0) / arr.length) : null;
      $("[data-res]", el).innerHTML = `<div class="stage" style="background:var(--surface)">${svg}</div><div class="fb good" style="margin-top:12px"><b>Your line: about ${Math.round(a)} + ${Math.round(b)} ms per bit of difficulty.</b> ${avg(big) && avg(small) ? `Big targets took you ${avg(big)} ms on average; the smallest took ${avg(small)} ms.` : ""} Harder targets (further, smaller) took longer, roughly in a straight line. That is why primary buttons are big and close to where the pointer or thumb already is, and why tiny icon buttons at the far edge of a form feel slow.</div>`;
      $("[data-st]", el).textContent = "Done. Press start to play again.";
      api.data.last = { a, b }; api.save(); api.done(); phase = "idle";
    };
    $("[data-go]", el).onclick = () => { trials = []; $("[data-res]", el).innerHTML = ""; $("[data-st]", el).textContent = "Click the ring, then the blue target."; next(); };
  },
});

/* ---------- Hick ---------- */
LAB("lab-hick", {
  title: "Hick's law game", skill: "Psychology", mins: 5, lesson: "laws",
  desc: "Find the named city in menus of 2, 4, 8 and 16 options. See how your decision time grows as choices multiply.",
  art: () => UI.art([2, 4, 8].map((n, i) => Array.from({ length: n }, (_, k) => S.r(20 + i * 74, 14 + k * 8, 60, 6, k === 0 ? "accent" : "rule-strong", null, 2)).join("")).join("")),
  mount(el, api) {
    const cities = ["Lisbon", "Oslo", "Prague", "Vienna", "Dublin", "Seville", "Krakow", "Bruges", "Porto", "Lyon", "Turin", "Bergen", "Ghent", "Malmo", "Riga", "Tallinn", "Split", "Zagreb", "Bilbao", "Naples"];
    let plan = [], res = [], t0 = 0, sorted = false;
    el.innerHTML = `<div class="stack gap-4"><div class="row" style="justify-content:space-between;gap:12px"><label class="check-inline"><input type="checkbox" id="hk-sort"> Sort menus alphabetically</label><button class="btn primary small" type="button" data-go>Start</button></div><div class="stage" data-ar style="min-height:300px;background:var(--surface)"><p class="muted">Each round names a city. Click it in the menu as fast as you can. 12 rounds.</p></div><div data-res></div></div>`;
    const ar = $("[data-ar]", el);
    const round = () => {
      if (!plan.length) return finish();
      const n = plan.shift(); let opts = shuffle(cities).slice(0, n); const target = opts[Math.floor(Math.random() * n)]; if (sorted) opts.sort();
      ar.innerHTML = `<p style="font-size:17px">Find <b>${target}</b></p><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:6px;margin-top:12px" hidden data-m>${opts.map(o => `<button type="button" class="btn small" data-c="${o}" style="justify-content:flex-start">${o}</button>`).join("")}</div>`;
      setTimeout(() => { const m = $("[data-m]", ar); if (!m) return; m.hidden = false; t0 = performance.now(); m.onclick = e => { const b = e.target.closest("button"); if (!b) return; if (b.dataset.c !== target) { b.classList.add("wrong"); return; } res.push({ n, ms: performance.now() - t0 }); round(); }; }, 700);
    };
    const finish = () => {
      const ns = [2, 4, 8, 16]; const avg = n => { const r = res.filter(x => x.n === n); return r.reduce((s, x) => s + x.ms, 0) / r.length; };
      const W = 560, H = 220, maxY = Math.max(...ns.map(avg)) * 1.15; const px = i => 70 + i * 140, py = y => H - 30 - y / maxY * (H - 50);
      let svg = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;display:block">` + S.l(50, H - 30, W - 10, H - 30, "rule-strong", 1);
      ns.forEach((n, i) => { const y = avg(n); svg += S.r(px(i) - 26, py(y), 52, H - 30 - py(y), "accent", null, 4) + S.t(px(i), H - 12, n + " options", { size: 12, a: "middle", c: "ink-2" }) + S.t(px(i), py(y) - 6, Math.round(y) + " ms", { size: 12, a: "middle", w: 700 }); });
      svg += "</svg>";
      ar.innerHTML = svg;
      $("[data-res]", el).innerHTML = `<div class="fb good"><b>More options, more time.</b> Going from 2 to 16 options cost you about ${Math.round(avg(16) - avg(2))} ms per decision. ${sorted ? "With sorted menus, you can jump to the right letter, so time grows more slowly (closer to Hick's logarithmic curve)." : "With unsorted menus you scan one by one, so time grows faster. Try again with sorting on."} The lesson isn't “never more than 7 items”. It's: make options easy to scan (order, grouping, search) and remove the ones nobody needs.</div>`;
      api.done();
    };
    $("#hk-sort", el).onchange = e => { sorted = e.target.checked; };
    $("[data-go]", el).onclick = () => { res = []; plan = shuffle([2, 2, 2, 4, 4, 4, 8, 8, 8, 16, 16, 16]); $("[data-res]", el).innerHTML = ""; round(); };
  },
});

/* ---------- Heuristic hunt ---------- */
LAB("lab-heuristic-hunt", {
  title: "Heuristic hunt", skill: "Usability", mins: 15, lesson: "heuristics",
  desc: "This checkout breaks most of Nielsen's ten heuristics. Click anything that looks wrong, then name the heuristic it breaks.",
  art: () => UI.art(S.r(60, 8, 120, 76, "surface", "rule-strong", 6) + S.c(90, 30, 10, null, "spec", 2) + S.c(150, 60, 10, null, "spec", 2) + S.r(80, 66, 40, 10, "bad", null, 3)),
  mount(el, api) {
    const H10 = ["Visibility of system status", "Match between system and the real world", "User control and freedom", "Consistency and standards", "Error prevention", "Recognition rather than recall", "Flexibility and efficiency of use", "Aesthetic and minimalist design", "Help users recognise, diagnose and recover from errors", "Help and documentation"];
    const issues = {
      steps: [0, "No sign of where you are in checkout or how many steps remain. People need to know the system's state."],
      jargon: [1, "“SKU qty modulation” is the database talking. Say “Quantity”."],
      noedit: [2, "No way to change the basket or go back without losing everything. People need an emergency exit."],
      basket: [3, "The header says Basket, the page says Cart, and the button says Bag. Pick one word and use it everywhere."],
      remove: [4, "A big “Empty basket” button sits next to “Pay”, with no confirmation or undo. Prevent the slip."],
      cvv: [5, "Asking people to remember the order number from the last screen. Show it; don't make them recall it."],
      autofill: [6, "Autofill is switched off and saved addresses are hidden, so regulars retype everything."],
      promo: [7, "Three promotional banners compete with the one task on this page."],
      error: [8, "“Error 0x80070057” tells nobody what went wrong or how to fix it."],
      help: [9, "Help is a 40-page PDF. Help should be short, searchable and in context."],
    };
    const found = new Map(Object.entries(api.data.found || {}));
    el.innerHTML = `<div class="split" style="align-items:start"><div class="stage" data-mock style="background:#FFFFFF;color:#1A1C21;font-size:13.5px;line-height:1.4;padding:0"></div>
      <div class="stack gap-3"><div class="row" style="justify-content:space-between"><b data-count></b><button class="btn small quiet" type="button" data-show>Show all</button></div><div data-pick></div><div class="stack gap-2" data-list></div></div></div>`;
    const spot = (k, html, style = "") => `<button type="button" data-k="${k}" style="all:unset;display:block;cursor:pointer;border-radius:4px;${style}">${html}</button>`;
    $("[data-mock]", el).innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid #E3E5E9"><b>ShopFast</b><span style="display:flex;gap:12px;align-items:center">${spot("help", `<u>Help (PDF, 40 pages)</u>`)}${spot("basket", "Basket (3)")}</span></div>
      ${spot("promo", `<div style="background:#FFE14D;padding:6px 14px;font-weight:700">MEGA SALE! 20% off socks!</div><div style="background:#FF6B6B;color:#fff;padding:6px 14px;font-weight:700">Download our app for 5% off</div><div style="background:#4DABF7;color:#fff;padding:6px 14px;font-weight:700">Refer a friend and win</div>`)}
      <div style="padding:14px;display:grid;gap:12px">
        ${spot("steps", `<div style="font-size:18px;font-weight:800">Your Cart</div>`)}
        <div style="display:flex;justify-content:space-between;border-bottom:1px solid #E3E5E9;padding-bottom:8px"><span>Wool socks × 2</span>${spot("jargon", `<span style="color:#666">SKU qty modulation: 2</span>`)}</div>
        ${spot("noedit", `<div style="color:#999;font-size:12.5px">Items can't be changed at this stage.</div>`)}
        ${spot("cvv", `<label style="display:grid;gap:4px"><span>Enter your order number from the previous page</span><span style="border:1px solid #C5C9D0;border-radius:6px;padding:7px;color:#999">e.g. 88-2913-A</span></label>`)}
        ${spot("autofill", `<label style="display:grid;gap:4px"><span>Delivery address <span style="color:#999">(autofill disabled)</span></span><span style="border:1px solid #C5C9D0;border-radius:6px;padding:7px;color:#999">Type full address</span></label>`)}
        ${spot("error", `<div style="background:#FDECEA;color:#B3261E;padding:7px 9px;border-radius:6px;font-family:monospace">Error 0x80070057</div>`)}
        <div style="display:flex;gap:8px;justify-content:flex-end;align-items:center">${spot("remove", `<span style="display:inline-block;background:#D93025;color:#fff;padding:9px 14px;border-radius:6px;font-weight:700">Empty basket</span>`)}<span style="display:inline-block;background:#1A73E8;color:#fff;padding:9px 16px;border-radius:6px;font-weight:700">Add to bag &amp; pay</span></div>
      </div>`;
    const paint = () => {
      $("[data-count]", el).textContent = `${found.size} of 10 found`;
      $("[data-list]", el).innerHTML = [...found.entries()].map(([k, ok]) => `<div class="fb ${ok ? "good" : "warn"}"><b>${H10[issues[k][0]]}.</b> ${issues[k][1]}</div>`).join("");
      $$("[data-mock] [data-k]", el).forEach(b => { b.style.outline = found.has(b.dataset.k) ? "2px solid var(--spec)" : ""; b.style.outlineOffset = "2px"; });
      if (found.size >= 8) api.done();
      api.data.found = Object.fromEntries(found); api.save();
    };
    $("[data-mock]", el).addEventListener("click", e => {
      const b = e.target.closest("[data-k]");
      if (!b) { $("[data-pick]", el).innerHTML = `<div class="fb">Nothing wrong there. Keep looking.</div>`; return; }
      const k = b.dataset.k; if (found.has(k)) return;
      $("[data-pick]", el).innerHTML = `<div class="panel pad stack gap-2"><b class="small">Which heuristic does this break?</b>${H10.map((n, i) => `<button type="button" class="opt" data-h="${i}" style="padding:8px 12px;min-height:38px;font-size:14.5px"><span class="ol">${i + 1}</span><span>${n}</span></button>`).join("")}</div>`;
      $$("[data-pick] [data-h]", el).forEach(x => x.onclick = () => { const ok = +x.dataset.h === issues[k][0]; found.set(k, ok); $("[data-pick]", el).innerHTML = `<div class="fb ${ok ? "good" : "warn"}"><b>${ok ? "Yes." : "Close, but it's mainly “" + H10[issues[k][0]] + "”."}</b></div>`; paint(); });
    });
    $("[data-show]", el).onclick = () => { Object.keys(issues).forEach(k => { if (!found.has(k)) found.set(k, false); }); paint(); };
    paint();
  },
});

/* ---------- Keyboard focus ---------- */
LAB("lab-focus", {
  title: "Keyboard test", skill: "Accessibility", mins: 6, lesson: "accessibility",
  desc: "Click into a form, put the mouse down and press Tab. Compare a broken form with a fixed one and watch where focus goes.",
  art: () => UI.art(S.r(60, 14, 120, 16, "surface", "rule-strong", 4) + `<rect x="57" y="35" width="126" height="22" rx="6" style="fill:none;stroke:var(--sel);stroke-width:2"/>` + S.r(60, 38, 120, 16, "surface", "rule-strong", 4) + S.r(60, 64, 50, 16, "ink", null, 4)),
  mount(el, api) {
    let mode = "broken", log = [];
    el.innerHTML = `<div class="stack gap-4"><div class="row gap-3">${UI.seg("fmode", [["broken", "Broken form"], ["fixed", "Fixed form"]], mode)}<span class="small muted">Click the first field, then press Tab repeatedly. On a phone, read the notes.</span></div>
      <div class="split"><div class="stage" data-form style="background:var(--surface)"></div><div class="stack gap-2"><span class="label">Focus order</span><ol data-log class="small" style="margin:0;padding-left:1.4em;min-height:120px"></ol><div class="fb" data-fb></div></div></div></div>`;
    const paint = () => {
      log = []; $("[data-log]", el).innerHTML = "";
      const broken = mode === "broken";
      const st = `style="${broken ? "outline:none;" : ""}border:1px solid var(--rule-strong);border-radius:8px;padding:9px 11px;width:100%;background:var(--surface);color:var(--ink);font-size:15px"`;
      $("[data-form]", el).innerHTML = broken ? `<style>.kb-broken *:focus{outline:none!important;box-shadow:none!important}</style><div class="kb-broken" style="display:grid;gap:10px;max-width:340px">
        <input ${st} placeholder="Name" data-n="Name" tabindex="3"><input ${st} placeholder="Email" data-n="Email" tabindex="1"><input ${st} placeholder="Phone" data-n="Phone" tabindex="2">
        <div data-n="Terms link" style="color:var(--accent);text-decoration:underline;cursor:pointer;font-size:14px">Read the terms</div>
        <div data-n="Send button" style="background:var(--ink);color:var(--on-ink);padding:10px 14px;border-radius:8px;font-weight:700;text-align:center;cursor:pointer">Send</div></div>`
        : `<div style="display:grid;gap:10px;max-width:340px"><label class="label" for="kf-n">Name</label><input ${st} id="kf-n" data-n="Name"><label class="label" for="kf-e">Email</label><input ${st} id="kf-e" type="email" data-n="Email"><label class="label" for="kf-p">Phone</label><input ${st} id="kf-p" type="tel" data-n="Phone">
        <a href="#ref" data-n="Terms link" style="font-size:14px" onclick="return false">Read the terms</a><button type="button" class="btn primary" data-n="Send button">Send</button></div>`;
      $$("[data-n]", el).forEach(n => n.addEventListener("focus", () => { log.push(n.dataset.n); $("[data-log]", el).innerHTML = log.map(x => `<li>${x}</li>`).join(""); check(); }));
      $("[data-fb]", el).innerHTML = broken ? "Four faults are hiding here: focus jumps out of visual order, there's no visible focus ring, the link and the button are plain divs that the keyboard can't reach, and placeholders stand in for labels." : "Order follows the visual layout, focus is always visible, and the link and button are real elements, so the keyboard reaches them.";
    };
    const check = () => { if (mode === "fixed" && log.includes("Send button")) { api.done(); $("[data-fb]", el).innerHTML += " <b>You reached Send by keyboard alone.</b>"; } };
    UI.bindSeg(el, "fmode", v => { mode = v; paint(); });
    paint();
  },
});
