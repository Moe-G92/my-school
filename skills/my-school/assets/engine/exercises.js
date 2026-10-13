/* My School engine: exercise engines (choice, sort, order, rewrite) used by lessons, quick checks and labs. */
const Ex = {
  bench({ kind, title, desc, mins, done, id }) {
    const el = h(`<section class="bench" ${id ? `id="${esc(id)}"` : ""}>
      <div class="bench-head"><div style="min-width:0">
        <div class="bk">${esc(kind)}${mins ? ` · ${mins} min` : ""}</div>
        <div class="bt">${esc(title)}</div>
        ${desc ? `<p class="bd">${MD.inline(desc)}</p>` : ""}
      </div><span class="tag good" data-done ${done ? "" : "hidden"}>${I.check} Done</span></div>
      <div class="bench-body"></div>
    </section>`);
    el.body = $(".bench-body", el);
    el.setDone = on => { $("[data-done]", el).hidden = !on; };
    el.foot = html => { let f = $(".bench-foot", el); if (!f) { f = h(`<div class="bench-foot"></div>`); el.append(f); } f.innerHTML = html; return f; };
    return el;
  },
  exState(key) { return Store.s.ex[key] || null; },
  saveEx(key, data) { Store.s.ex[key] = Object.assign(Store.s.ex[key] || {}, data, { at: Date.now() }); Store.touch(); },

  /* ---------- multiple choice (scenario sets and lesson checks) ---------- */
  choice(spec, { key, onDone, kind = "Practice" } = {}) {
    const prev = this.exState(key);
    const b = this.bench({ kind, title: spec.title, desc: spec.intro, mins: spec.mins || Math.max(3, Math.round(spec.items.length * 1.5)), done: prev && prev.done });
    const answers = (prev && prev.answers) ? prev.answers.slice() : [];
    const render = () => {
      b.body.innerHTML = "";
      spec.items.forEach((it, qi) => {
        const q = h(`<div class="q"><p class="qp"><span class="qn">${qi + 1}</span>${MD.inline(it.prompt || it.q)}</p>${it.html || ""}<div class="opts"></div><div class="why" hidden></div></div>`);
        const opts = $(".opts", q);
        (it.options || []).forEach((o, oi) => {
          const btn = h(`<button class="opt" type="button"><span class="ol">${"ABCDEF"[oi]}</span><span>${MD.inline(o)}</span></button>`);
          btn.addEventListener("click", () => { answers[qi] = oi; paint(q, it, oi); check(); });
          opts.append(btn);
        });
        if (answers[qi] !== undefined && answers[qi] !== null) paint(q, it, answers[qi]);
        b.body.append(q);
      });
      foot();
    };
    const paint = (q, it, chosen) => {
      $$(".opt", q).forEach((btn, oi) => { btn.disabled = true; if (oi === it.answer) btn.classList.add("right"); if (oi === chosen && chosen !== it.answer) btn.classList.add("wrong"); });
      const w = $(".why", q); w.hidden = false;
      w.innerHTML = `<b>${chosen === it.answer ? "Right." : "Not quite."}</b> ${MD.inline(it.why || "")}`;
    };
    const score = () => spec.items.reduce((n, it, i) => n + (answers[i] === it.answer ? 1 : 0), 0);
    const foot = () => {
      const n = answers.filter(a => a !== undefined && a !== null).length;
      const f = b.foot(`<span class="small muted num">${n === spec.items.length ? `<b>${score()} of ${spec.items.length}</b> right` : `${n} of ${spec.items.length} answered`}</span><button class="btn small quiet" type="button" data-reset>${I.reset} Start again</button>`);
      $("[data-reset]", f).onclick = () => { answers.length = 0; this.saveEx(key, { answers: [] }); render(); };
    };
    const check = () => {
      this.saveEx(key, { answers: answers.slice() });
      foot();
      if (answers.filter(a => a !== undefined && a !== null).length === spec.items.length) {
        this.saveEx(key, { done: Date.now(), score: score(), total: spec.items.length });
        b.setDone(true);
        onDone && onDone(score(), spec.items.length);
      }
    };
    render();
    return b;
  },

  /* ---------- sort into buckets (tap or drag) ---------- */
  sort(spec, { key, onDone } = {}) {
    const prev = this.exState(key);
    const b = this.bench({ kind: "Sort", title: spec.title, desc: spec.intro, mins: spec.mins || 6, done: prev && prev.done });
    let place = (prev && prev.place) ? prev.place.slice() : spec.items.map(() => -1);
    let order = shuffle(spec.items.map((_, i) => i));
    let selected = null, checked = false;
    const render = () => {
      b.body.innerHTML = `<p class="small muted" style="margin-bottom:12px">Drag each card into a group, or tap a card and then tap a group.</p>
        <div class="tray" data-bucket="-1" aria-label="Unsorted cards"></div>
        <div class="sortboard" style="--cols:${Math.min(spec.buckets.length, 3)}">${spec.buckets.map((bk, i) => `<div class="bucket" data-bucket="${i}" role="group" aria-label="${esc(bk)}"><div class="bh"><span>${esc(bk)}</span><span class="faint num" data-count></span></div></div>`).join("")}</div>
        <div class="stack gap-3" data-results style="margin-top:16px"></div>`;
      order.forEach(i => {
        const chip = h(`<button class="card-chip" type="button" data-i="${i}" aria-pressed="false">${MD.inline(spec.items[i].text)}</button>`);
        $(`[data-bucket="${place[i]}"]`, b.body).append(chip);
      });
      wire(); counts(); foot();
    };
    const counts = () => $$(".bucket", b.body).forEach(bk => { $("[data-count]", bk).textContent = $$(".card-chip", bk).length || ""; });
    const move = (i, bucket) => {
      place[i] = bucket; const chip = $(`.card-chip[data-i="${i}"]`, b.body);
      $(`[data-bucket="${bucket}"]`, b.body).append(chip);
      chip.classList.remove("right", "wrong"); checked = false; $("[data-results]", b.body).innerHTML = "";
      select(null); counts(); foot(); this.saveEx(key, { place: place.slice() });
    };
    const select = i => { selected = i; $$(".card-chip", b.body).forEach(c => c.setAttribute("aria-pressed", String(+c.dataset.i === i))); $$(".bucket, .tray", b.body).forEach(z => z.classList.toggle("armed", i !== null)); };
    const wire = () => {
      $$("[data-bucket]", b.body).forEach(zone => zone.addEventListener("click", e => { if (e.target.closest(".card-chip")) return; if (selected !== null) move(selected, +zone.dataset.bucket); }));
      $$(".card-chip", b.body).forEach(chip => {
        const i = +chip.dataset.i;
        let sx = 0, sy = 0, dragging = false, ghost = null, pid = null;
        chip.addEventListener("pointerdown", e => { if (e.button) return; sx = e.clientX; sy = e.clientY; pid = e.pointerId; dragging = false; chip.setPointerCapture(pid); });
        chip.addEventListener("pointermove", e => {
          if (pid !== e.pointerId) return;
          if (!dragging && Math.hypot(e.clientX - sx, e.clientY - sy) > 6) { dragging = true; ghost = chip.cloneNode(true); ghost.classList.add("drag-ghost"); ghost.style.width = chip.offsetWidth + "px"; document.body.append(ghost); chip.classList.add("dragging"); }
          if (dragging) { ghost.style.left = (e.clientX - chip.offsetWidth / 2) + "px"; ghost.style.top = (e.clientY - 18) + "px"; $$(".bucket, .tray", b.body).forEach(z => z.classList.remove("over")); const z = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-bucket]"); if (z && b.body.contains(z)) z.classList.add("over"); }
        });
        const end = e => {
          if (pid !== e.pointerId) return; pid = null;
          if (dragging) { ghost.remove(); chip.classList.remove("dragging"); $$(".over", b.body).forEach(z => z.classList.remove("over")); const z = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-bucket]"); if (z && b.body.contains(z)) move(i, +z.dataset.bucket); dragging = false; }
          else { select(selected === i ? null : i); }
        };
        chip.addEventListener("pointerup", end);
        chip.addEventListener("pointercancel", e => { if (ghost) ghost.remove(); chip.classList.remove("dragging"); pid = null; dragging = false; });
        chip.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(selected === i ? null : i); } });
      });
    };
    const foot = () => {
      const left = place.filter(p => p < 0).length;
      const f = b.foot(`<span class="small muted">${left ? `${left} card${left === 1 ? "" : "s"} left to sort` : "All sorted"}</span><div class="row gap-2"><button class="btn small quiet" type="button" data-reset>${I.reset} Reset</button><button class="btn small primary" type="button" data-check ${left ? "disabled" : ""}>Check</button></div>`);
      $("[data-reset]", f).onclick = () => { place = spec.items.map(() => -1); order = shuffle(order); checked = false; this.saveEx(key, { place }); render(); };
      $("[data-check]", f).onclick = doCheck;
    };
    const doCheck = () => {
      checked = true; let right = 0; const res = $("[data-results]", b.body); res.innerHTML = "";
      spec.items.forEach((it, i) => {
        const ok = place[i] === it.bucket; if (ok) right++;
        const chip = $(`.card-chip[data-i="${i}"]`, b.body); chip.classList.toggle("right", ok); chip.classList.toggle("wrong", !ok);
        if (!ok) res.append(h(`<div class="fb bad"><b>“${MD.inline(it.text)}”</b> belongs in <b>${esc(spec.buckets[it.bucket])}</b>. ${MD.inline(it.why || "")}</div>`));
      });
      res.prepend(h(`<div class="fb ${right === spec.items.length ? "good" : "warn"}"><b>${right} of ${spec.items.length} in the right group.</b> ${right === spec.items.length ? "Nicely done." : "Move the red ones and check again."}</div>`));
      { this.saveEx(key, { done: Date.now(), score: right, total: spec.items.length, place: place.slice() }); b.setDone(true); onDone && onDone(right, spec.items.length); }
      const showAll = h(`<details><summary class="small" style="cursor:pointer;font-weight:650">Why each card goes where it goes</summary><div class="stack gap-2" style="margin-top:10px">${spec.items.map(it => `<div class="small"><b>${MD.inline(it.text)}</b> → ${esc(spec.buckets[it.bucket])}. <span class="muted">${MD.inline(it.why || "")}</span></div>`).join("")}</div></details>`);
      res.append(showAll);
    };
    render();
    return b;
  },

  /* ---------- put steps in order ---------- */
  order(spec, { key, onDone } = {}) {
    const prev = this.exState(key);
    const b = this.bench({ kind: "Order", title: spec.title, desc: spec.intro, mins: spec.mins || 5, done: prev && prev.done });
    const N = spec.items.length;
    let seq = (prev && prev.seq && prev.seq.length === N) ? prev.seq.slice() : (() => { let s; do { s = shuffle(spec.items.map((_, i) => i)); } while (N > 1 && s.every((v, i) => v === i)); return s; })();
    const render = (checked) => {
      b.body.innerHTML = `<p class="small muted" style="margin-bottom:12px">Use the arrows (or drag) to put these in order, first at the top.</p><ol class="orderlist"></ol><div data-res style="margin-top:14px"></div>`;
      const ol = $("ol", b.body);
      seq.forEach((v, pos) => {
        const li = h(`<li data-v="${v}" class="${checked ? (v === pos ? "right" : "wrong") : ""}"><span class="oi">${pos + 1}</span><span>${MD.inline(spec.items[v])}</span><span class="mv"><button type="button" aria-label="Move up" data-d="-1" ${pos === 0 ? "disabled" : ""}>${I.up}</button><button type="button" aria-label="Move down" data-d="1" ${pos === N - 1 ? "disabled" : ""}>${I.down}</button></span></li>`);
        $$("button", li).forEach(btn => btn.onclick = () => { const d = +btn.dataset.d, np = pos + d; [seq[pos], seq[np]] = [seq[np], seq[pos]]; this.saveEx(key, { seq: seq.slice() }); render(false); const target = $$(".orderlist li", b.body)[np]; target && $(`button[data-d="${d}"]`, target)?.focus(); });
        // drag to reorder
        li.addEventListener("pointerdown", e => {
          if (e.target.closest("button") || e.button) return;
          const startY = e.clientY; let moved = false; li.setPointerCapture(e.pointerId);
          const onMove = ev => {
            if (!moved && Math.abs(ev.clientY - startY) < 6) return; moved = true; li.style.opacity = ".6";
            const items = $$(".orderlist li", b.body); const over = items.find(x => { const r = x.getBoundingClientRect(); return ev.clientY > r.top && ev.clientY < r.bottom; });
            if (over && over !== li) { const r = over.getBoundingClientRect(); if (ev.clientY < r.top + r.height / 2) ol.insertBefore(li, over); else ol.insertBefore(li, over.nextSibling); }
          };
          const onUp = () => { li.removeEventListener("pointermove", onMove); li.removeEventListener("pointerup", onUp); li.style.opacity = ""; if (moved) { seq = $$(".orderlist li", b.body).map(x => +x.dataset.v); this.saveEx(key, { seq: seq.slice() }); render(false); } };
          li.addEventListener("pointermove", onMove); li.addEventListener("pointerup", onUp);
        });
        ol.append(li);
      });
      if (checked) {
        const right = seq.filter((v, i) => v === i).length;
        $("[data-res]", b.body).append(h(`<div class="fb ${right === N ? "good" : "warn"}"><b>${right === N ? "All in order." : right + " of " + N + " in the right place."}</b> ${right === N ? MD.inline(spec.why || "") : "The green ones are placed correctly. Try moving the others."}</div>`));
        if (right !== N) $("[data-res]", b.body).append(h(`<details style="margin-top:10px"><summary class="small" style="cursor:pointer;font-weight:650">Show the answer</summary><ol class="small" style="margin-top:8px">${spec.items.map(x => `<li>${MD.inline(x)}</li>`).join("")}</ol><p class="small muted" style="margin-top:8px">${MD.inline(spec.why || "")}</p></details>`));
      }
      const f = b.foot(`<span class="small muted">${N} steps</span><button class="btn small primary" type="button" data-check>Check order</button>`);
      $("[data-check]", f).onclick = () => { const right = seq.filter((v, i) => v === i).length; this.saveEx(key, { done: Date.now(), score: right, total: N, seq: seq.slice() }); b.setDone(true); onDone && onDone(right, N); render(true); };
    };
    render(false);
    return b;
  },

  /* ---------- writing task, graded by the coach ---------- */
  rewrite(spec, { key, onDone } = {}) {
    const prev = this.exState(key) || {};
    const b = this.bench({ kind: "Write", title: spec.title, desc: spec.intro, mins: spec.mins || 10, done: prev.done });
    b.body.innerHTML = `<div class="stack gap-4">
      <p style="font-size:16.5px">${MD.inline(spec.task)}</p>
      ${spec.given ? `<div><div class="label" style="margin-bottom:6px">Starting point</div><div class="given">${MD.inline(spec.given)}</div></div>` : ""}
      <div class="field"><label for="rw-${esc(key)}">Your version</label><textarea class="input" id="rw-${esc(key)}" rows="5" placeholder="Write your answer here"></textarea></div>
      <div class="row gap-2" data-actions></div>
      <div data-out class="stack gap-3"></div>
    </div>`;
    const ta = $("textarea", b.body); ta.value = prev.text || "";
    ta.addEventListener("input", debounce(() => this.saveEx(key, { text: ta.value }), 600));
    const out = $("[data-out]", b.body), actions = $("[data-actions]", b.body);
    const rubricList = (results) => `<ul class="rubric">${spec.rubric.map((r, i) => { const res = results && results[i]; const cls = res ? (res.met ? "ok" : "no") : ""; return `<li><span class="rk ${cls}">${res ? (res.met ? I.check : I.x) : ""}</span><span>${MD.inline(r)}${res && res.note ? `<br><span class="muted small">${esc(res.note)}</span>` : ""}</span></li>`; }).join("")}</ul>`;
    const showModel = () => `<details><summary class="small" style="cursor:pointer;font-weight:650">See a model answer</summary><div class="given" style="margin-top:8px">${MD.inline(spec.model || "")}</div></details>`;
    const renderSelf = () => { out.innerHTML = `<div class="label">Check yourself against these</div>${rubricList(null)}${showModel()}`; };
    const renderFeedback = fb => {
      out.innerHTML = `<div class="label">Coach feedback</div>${rubricList(fb.criteria)}${fb.overall ? `<div class="fb">${esc(fb.overall)}</div>` : ""}${fb.improved ? `<div><div class="label" style="margin-bottom:6px">A stronger version of yours</div><div class="given">${esc(fb.improved)}</div></div>` : ""}${showModel()}`;
    };
    let ctl = null;
    const ask = async () => {
      const text = ta.value.trim(); if (text.length < 3) { ta.focus(); toast("Write your version first."); return; }
      ctl = new AbortController();
      actions.innerHTML = `<span class="thinking"><i></i><i></i><i></i> Coach is reading</span><button class="btn small quiet" type="button" data-stop>${I.stopSq} Stop</button>`;
      $("[data-stop]", actions).onclick = () => ctl.abort();
      const prompt = `You are grading a short writing exercise for ${Coach.learner()}, who is learning ${SITE.subject}. Be specific and kind, and hold a high bar. ${Coach.style()}

Exercise: ${spec.title}
Task: ${spec.task}
${spec.given ? "Starting text: " + spec.given + "\n" : ""}Rubric (judge each criterion separately):
${spec.rubric.map((r, i) => (i + 1) + ". " + r).join("\n")}

The learner's answer:
"""${text.slice(0, 4000)}"""

Reply with only JSON in this shape:
{"criteria":[{"met":true,"note":"one short sentence"}],"overall":"two or three sentences: what works, the single most useful improvement","improved":"a better version of the learner's answer that keeps their intent and voice"}
The criteria array must have exactly ${spec.rubric.length} entries in rubric order.`;
      try {
        const fb = await Coach.fn.json(prompt, { signal: ctl.signal, modelTier: "default", cache: false });
        if (!fb || !Array.isArray(fb.criteria)) throw { code: "invalid_json" };
        this.saveEx(key, { done: Date.now(), text, feedback: fb });
        b.setDone(true); onDone && onDone();
        renderFeedback(fb);
      } catch (e) {
        if (e && e.code !== "cancelled") { out.prepend(h(`<div class="fb warn">${esc(Coach.errorCopy(e && e.code))}</div>`)); if (Coach.hardOff(e && e.code)) Coach.state = "off"; }
      }
      buttons();
    };
    const buttons = () => {
      actions.innerHTML = "";
      if (Coach.state === "ready") { const a = h(`<button class="btn primary" type="button">${I.sparkle} Get feedback from the coach</button>`); a.onclick = ask; actions.append(a); }
      const s = h(`<button class="btn" type="button">Check it myself</button>`); s.onclick = () => { if (ta.value.trim().length > 2) { this.saveEx(key, { done: Date.now(), text: ta.value }); b.setDone(true); onDone && onDone(); } renderSelf(); }; actions.append(s);
    };
    buttons();
    const off = Coach.on(buttons); Router.onLeave(off);
    if (prev.feedback) renderFeedback(prev.feedback);
    return b;
  },
};
