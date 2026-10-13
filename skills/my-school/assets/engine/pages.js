/* My School engine: pages. Reads SITE for names, parts, labels, coach, review and reference sections. */
const LBL = (k, d) => (SITE.labels && SITE.labels[k]) || d;
const PARTS = (SITE.parts || []).map((p, i) => Array.isArray(p) ? p : [p.n || i + 1, p.title, p.sub || ""]);
const partName = n => (PARTS.find(p => p[0] === n) || [n, "Part " + n])[1];
const lessonsOf = p => CONTENT.lessons.filter(l => l.part === p).sort((a, b) => a.n - b.n);
const lessonById = id => CONTENT.lessons.find(l => l.id === id);
const mins = l => (l.minutes.read || 0) + (l.minutes.watch || 0) + (l.minutes.practice || 0);
const nextLesson = () => CONTENT.lessons.slice().sort((a, b) => a.n - b.n).find(l => !(Store.s.lessons[l.id] && Store.s.lessons[l.id].done)) || CONTENT.lessons[0];
const statusIcon = id => { const p = Store.lessonPct(id); return p >= 1 ? `<span class="status done" title="Done">${I.check}</span>` : p > 0 ? `<span class="status half" style="--deg:${Math.round(p * 360)}deg" title="${Math.round(p * 100)}% done"></span>` : `<span class="status" title="Not started"></span>`; };
const dayIndex = () => Math.floor((Date.now() - new Date(2026, 0, 1)) / 864e5);
const pick = (arr, k) => arr && arr.length ? arr[((k % arr.length) + arr.length) % arr.length] : null;
const coachOn = () => SITE.coach && SITE.coach.enabled !== false;
const reviewOn = () => SITE.review && SITE.review.enabled !== false;
const partColour = p => `var(--p${((p - 1) % 8) + 1})`;
let pendingSection = null;
const goSection = (lessonId, sec) => { pendingSection = sec; Router.go("l." + lessonId); };

/* ---------- Today ---------- */
Router.routes.today = (main) => {
  const nx = nextLesson(); if (!nx) { main.append(h(`<div class="page"><h1 class="h1">${esc(SITE.name)}</h1><p class="lede">No lessons yet.</p></div>`)); return; }
  const st = Store.s.lessons[nx.id] || {};
  const done = Store.doneCount();
  const prompt = pick(SITE.prompts, dayIndex());
  const note = pick(CONTENT.notes, dayIndex());
  const days = new Set(Store.s.days); let streak = 0; { const d = new Date(); if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1); while (days.has(dayKey(d))) { streak++; d.setDate(d.getDate() - 1); } }
  const step = (n, key, title, sub, sec) => `<a href="#l.${nx.id}" data-sec="${sec}"><span class="plan-n"><span class="state ${st[key] ? "on" : ""}">${st[key] ? I.check : ""}</span>Step ${n}</span><span class="plan-t">${title}</span><span class="small muted">${sub}</span></a>`;
  const page = h(`<div class="page">
    <section class="hero" aria-label="${esc(SITE.name)}"><div data-hero></div>
      <div class="hero-copy"><p class="lede">${esc(SITE.heroLede || SITE.tagline || "")}</p>
      <div class="hero-stats"><div><b>${done}</b><span>of ${CONTENT.lessons.length} lessons</span></div><div><b>${Object.values(Store.s.labs).filter(l => l.done).length}</b><span>${esc(LBL("labsDone", "labs done"))}</span></div><div><b>${streak}</b><span>day streak</span></div></div></div>
    </section>
    <section class="section panel continue">
      <div style="min-width:0"><div class="eyebrow"><span class="dot" style="--c:${partColour(nx.part)}"></span>Part ${nx.part} · ${esc(partName(nx.part))} · Lesson ${nx.n}</div><h2 class="h2">${esc(nx.title)}</h2><p class="muted" style="margin-top:6px;max-width:60ch">${esc(nx.short)}</p>
      <div class="timing"><span>Read <b>${nx.minutes.read}</b> min</span><span>Watch and listen <b>${nx.minutes.watch}</b> min</span><span>Practice <b>${nx.minutes.practice}</b> min</span></div></div>
      <a class="btn primary" href="#l.${nx.id}">${Store.lessonPct(nx.id) > 0 ? "Continue lesson" : "Start lesson"}</a>
    </section>
    <section class="section"><div class="section-head"><h2 class="h3">Today's session</h2><span class="small muted">About ${mins(nx)} minutes</span></div>
      <div class="plan">${step(1, "read", "Read or listen", `${nx.minutes.read} min, or press Listen and follow along`, "read")}${step(2, "watch", "Watch and listen", "Curated videos and podcast episodes", "watch")}${step(3, "practice", "Practise", "Hands-on practice, then a quick check", "practice")}</div></section>
    <section class="section doors">
      ${coachOn() ? `<div class="panel pad"><h2 class="h3">Ask the coach</h2><p class="small muted" style="margin-top:4px">${esc(LBL("askLede", "Any question about this course or your own work."))}</p>
        <form class="askbox" data-ask><label class="vh" for="today-ask">Your question</label><input class="input" id="today-ask" placeholder="${esc(LBL("askPlaceholder", "Ask anything"))}" autocomplete="off"><button class="btn primary" type="submit">Ask</button></form>
        <div class="suggests">${(SITE.coach.suggestions || []).slice(0, 3).map(s => `<button type="button" class="suggest">${esc(s)}</button>`).join("")}</div>
        ${reviewOn() ? `<p class="small" style="margin-top:14px"><a href="#coach.review">${esc(LBL("reviewLink", "Or get feedback on your own work"))}</a></p>` : ""}</div>` : `<div class="panel pad"><h2 class="h3">${esc(LBL("practiceTitle", "The lab bench"))}</h2><p class="small muted" style="margin-top:4px">Hands-on practice for every part of the course.</p><a class="btn" href="#practice" style="margin-top:14px">Open practice</a></div>`}
      <div class="stack gap-5">${prompt ? `<div><h2 class="h3" style="margin-bottom:10px">${esc(LBL("promptTitle", "Notice one thing today"))}</h2><p class="noticing">${esc(prompt)}</p><a class="btn small" href="#journal" style="margin-top:12px" data-jp>Write it in your journal</a></div>` : ""}
      ${note ? `<div class="rule-top"><div class="small muted" style="margin-bottom:4px">${esc(LBL("noteSingular", "Field note"))} · ${note.minutes || 2} min</div><a href="#n.${note.id}" style="font:700 19px/1.3 var(--f-display);color:var(--ink);text-decoration:none">${esc(note.title)}</a></div>` : ""}</div>
    </section>
    <section class="section"><div class="section-head"><h2 class="h3">The path</h2><a class="small" href="#path">See all ${CONTENT.lessons.length} lessons</a></div>
      <div class="swatches" style="--n:${Math.min(PARTS.length, 8)}">${PARTS.map(([p, name]) => { const ls = lessonsOf(p); const d = ls.filter(l => Store.lessonPct(l.id) >= 1).length; return `<a class="swatch-mini" href="#path" data-part="${p}" style="--c:${partColour(p)}"><span class="fill"><i style="width:${ls.length ? d / ls.length * 100 : 0}%"></i></span><span class="cap"><b>${esc(name)}</b><span class="muted num">${d}/${ls.length}</span></span></a>`; }).join("")}</div>
      <p class="small muted" style="margin-top:10px">Each swatch fills as you finish its lessons.</p></section>
  </div>`);
  main.append(page);
  const heroEl = $("[data-hero]", page);
  if (typeof SITE.hero === "function") { try { SITE.hero(heroEl); } catch (e) { console.error(e); heroEl.innerHTML = `<h1 class="hero-name">${esc(SITE.name)}</h1>`; } }
  else heroEl.innerHTML = `<h1 class="hero-name" style="--len:${Math.max(4, SITE.name.length)}">${esc(SITE.name)}</h1>`;
  $$(".plan a", page).forEach(a => a.addEventListener("click", e => { e.preventDefault(); goSection(nx.id, a.dataset.sec); }));
  const ask = $("[data-ask]", page);
  if (ask) { ask.addEventListener("submit", e => { e.preventDefault(); const q = $("#today-ask", page).value.trim(); if (!q) return; CoachPage.queue = q; Router.go("coach"); }); $$(".suggest", page).forEach(b => b.onclick = () => { CoachPage.queue = b.textContent; Router.go("coach"); }); }
  const jp = $("[data-jp]", page); if (jp) jp.onclick = () => { JournalPage.prefill = prompt; };
  $$("[data-part]", page).forEach(a => a.onclick = e => { e.preventDefault(); PathPage.scrollTo = +a.dataset.part; Router.go("path"); });
};

/* ---------- Path ---------- */
const PathPage = { scrollTo: null };
Router.routes.path = (main) => {
  const done = Store.doneCount(), total = CONTENT.lessons.length;
  const title = LBL("pathTitle", `${numWord(total)} ${total === 1 ? "lesson" : "lessons"}, ${numWord(PARTS.length).toLowerCase()} ${PARTS.length === 1 ? "part" : "parts"}`);
  const page = h(`<div class="page"><div class="stack gap-3"><div class="eyebrow">The path</div><h1 class="h1">${esc(title)}</h1><p class="lede">${esc(LBL("pathLede", "Work through in order, or jump to what you need."))}</p>
    <div style="max-width:420px"><div class="bar"><i style="width:${total ? done / total * 100 : 0}%"></i></div><p class="small muted" style="margin-top:6px">${done} of ${total} lessons complete</p></div></div>
    <div class="section" data-parts></div></div>`);
  const wrap = $("[data-parts]", page);
  PARTS.forEach(([p, name, sub]) => {
    const ls = lessonsOf(p); if (!ls.length) return; const d = ls.filter(l => Store.lessonPct(l.id) >= 1).length;
    wrap.append(h(`<section class="part" id="part-${p}"><div class="chip" style="--c:${partColour(p)}"><div class="sw"></div><div class="meta"><b>${esc(name)}</b>Part ${p} · Lessons ${ls[0].n}–${ls[ls.length - 1].n}<br>${esc(sub || "")}<div class="bar"><i style="width:${d / ls.length * 100}%;background:${partColour(p)}"></i></div></div></div>
      <div class="lessons">${ls.map(l => `<a class="lrow" href="#l.${l.id}"><span class="n">${l.n}</span><span style="min-width:0"><span class="t">${esc(l.title)}</span><span class="s" style="display:block">${esc(l.short)}</span></span><span class="m">${mins(l)} min</span><span class="st">${statusIcon(l.id)}</span></a>`).join("")}</div></section>`));
  });
  main.append(page);
  if (PathPage.scrollTo) { const t = $("#part-" + PathPage.scrollTo, page); PathPage.scrollTo = null; if (t) requestAnimationFrame(() => t.scrollIntoView({ block: "start" })); }
};

/* ---------- Lesson ---------- */
const CALLOUTS = Object.assign({ "Try it now": ["try", "bulb"], "Rule of thumb": ["rule", "ruler"], "Common mistake": ["mistake", "alert"], "Prompt": ["prompt", "prompt"], "Example": ["rule", "doc"], "Remember": ["rule", "bulb"] }, SITE.callouts || {});
function renderBody(src, figPrefix) {
  let i = 0;
  const pre = String(src).replace(/^[ \t]*\[\[fig:([a-z0-9-]+)\]\][ \t]*$/gim, (m, id) => `\n\n<div data-fig="${id}"></div>\n\n`);
  const div = h(`<div class="prose">${MD.render(pre)}</div>`);
  $$("[data-fig]", div).forEach(d => {
    const f = FIGS[d.dataset.fig]; if (!f) { d.remove(); return; } i++;
    const fig = h(`<figure class="fig"><div class="figscroll">${f.svg()}</div><figcaption><b>Fig ${figPrefix ? figPrefix + "." : ""}${i}</b>${esc(f.caption)}</figcaption></figure>`);
    d.replaceWith(fig); if (f.mount) f.mount(fig);
  });
  $$("blockquote", div).forEach(bq => {
    const first = bq.querySelector("p > strong:first-child"); const label = first ? first.textContent.replace(/:\s*$/, "").trim() : "";
    const k = CALLOUTS[label]; if (!k) { bq.classList.add("callout"); return; }
    first.remove(); const p = bq.querySelector("p"); if (p) p.innerHTML = p.innerHTML.replace(/^\s*:?\s*/, "");
    const c = h(`<div class="callout ${k[0]}"><div class="cl"><span class="row gap-2">${I[k[1]] || ""}${esc(label)}</span></div></div>`);
    if (k[0] === "prompt") { const txt = h(`<div class="ptext"></div>`); txt.innerHTML = bq.innerHTML; c.append(txt); const b = h(`<button class="btn small quiet" type="button">${I.copy} Copy</button>`); b.onclick = () => copyText(txt.innerText.trim(), txt); $(".cl", c).append(b); }
    else { while (bq.firstChild) c.append(bq.firstChild); }
    bq.replaceWith(c);
  });
  $$("table", div).forEach(t => { const w = h(`<div class="tablewrap"></div>`); t.replaceWith(w); w.append(t); });
  MD.fixLinks(div);
  return div;
}
function mediaBlock(l) {
  const m = CONTENT.media[l.id] || {};
  const item = (url, title, meta, why) => { const on = !!Store.s.media[url]; return `<div class="mitem"><div style="min-width:0"><div class="mt"><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(title)}</a></div><div class="mm">${meta}</div>${why ? `<p class="mw">${esc(why)}</p>` : ""}</div><div class="mx"><a class="btn small" href="${esc(url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(title)}">${I.external} Open</a><label class="check-inline"><input type="checkbox" data-url="${esc(url)}" ${on ? "checked" : ""}> Done</label></div></div>`; };
  const meta = (...xs) => xs.filter(Boolean).map(esc).join(" · ");
  const v = (m.videos || []).map(x => item(x.url, x.title, meta(x.channel, x.minutes && x.minutes + " min", x.year), x.why)).join("");
  const p = (m.podcasts || []).map(x => item(x.url, x.episode || x.title, meta(x.show, x.minutes && x.minutes + " min", x.year), x.why)).join("");
  const r = (m.reads || []).map(x => item(x.url, x.title, meta(x.source, x.minutes && x.minutes + " min read", x.free === false ? "paid" : ""), x.why)).join("");
  const el = h(`<div>
    <div class="media-group"><h3>${I.headphones} Listen to this lesson</h3><div class="mitem"><div><div class="mt">${esc(l.title)}</div><div class="mm">Read aloud by your device · about ${l.minutes.read} min</div><p class="mw">Hands busy? Press play and follow along; the paragraph being read is highlighted.</p></div><div class="mx"><button class="btn small" type="button" data-listen2>${I.play} Listen</button></div></div></div>
    ${v ? `<div class="media-group"><h3>${I.video} Watch</h3>${v}</div>` : ""}
    ${p ? `<div class="media-group"><h3>${I.mic} Podcast</h3>${p}</div>` : ""}
    ${r ? `<div class="media-group"><h3>${I.doc} Read further</h3>${r}</div>` : ""}
    ${!v && !p && !r ? `<p class="empty-note">Curated videos and episodes for this lesson are on their way.</p>` : ""}
    <p class="small faint" style="margin-top:14px">Links open in a new tab.</p></div>`);
  $$("[data-url]", el).forEach(c => c.onchange = () => { if (c.checked) Store.s.media[c.dataset.url] = Date.now(); else delete Store.s.media[c.dataset.url]; Store.touch(); if (c.checked) LessonPage.mark("watch"); });
  return el;
}
const LessonPage = { cur: null, mark(sec) { if (this.cur) { Store.mark(this.cur, sec); this.refresh && this.refresh(); } } };
Router.routes.l = (main, id) => {
  const l = lessonById(id); if (!l) { Router.go("path"); return; }
  LessonPage.cur = id;
  const sorted = CONTENT.lessons.slice().sort((a, b) => a.n - b.n), idx = sorted.indexOf(l), prev = sorted[idx - 1], next = sorted[idx + 1];
  const secs = [["read", "Read"], ["watch", "Watch and listen"], ["practice", "Practice"], ["check", "Quick check"], ["journal", "Journal"]];
  const page = h(`<div class="page"><div class="lesson-grid"><article style="min-width:0">
    <header class="lesson-head"><div class="eyebrow"><a href="#path" style="color:inherit">Path</a><span>/</span><span class="dot" style="--c:${partColour(l.part)}"></span>Part ${l.part} · ${esc(partName(l.part))}<span>/</span>Lesson ${l.n} of ${sorted.length}</div>
      <h1 class="h1">${esc(l.title)}</h1><p class="lede">${esc(l.short)}</p>
      <div class="timing"><span>Read <b>${l.minutes.read}</b> min</span><span>Watch and listen <b>${l.minutes.watch}</b> min</span><span>Practice <b>${l.minutes.practice}</b> min</span></div>
      <div class="lesson-actions"><button class="btn" type="button" data-listen>${I.headphones} Listen</button><button class="btn" type="button" data-complete></button>${coachOn() ? `<a class="btn quiet" href="#coach" data-askcoach>${I.coach} Ask about this lesson</a>` : ""}</div>
      <div class="steps-mobile" data-steps></div></header>
    ${secs.map(([k, n], i) => `<section class="lsec" id="sec-${k}"><div class="lsec-head"><span class="k">${i + 1}</span><h2>${n}</h2><span class="r" data-r="${k}"></span></div><div data-body="${k}"></div></section>`).join("")}
    <nav class="pager">${prev ? `<a href="#l.${prev.id}"><small>Previous · Lesson ${prev.n}</small><b>${esc(prev.title)}</b></a>` : ""}${next ? `<a class="next" href="#l.${next.id}"><small>Next · Lesson ${next.n}</small><b>${esc(next.title)}</b></a>` : ""}</nav>
  </article><aside class="outline" aria-label="Lesson sections"><div class="ot">In this lesson</div>${secs.map(([k, n], i) => `<button type="button" data-go="${k}"><span class="ck" data-ck="${k}"></span>${i + 1}. ${n}</button>`).join("")}</aside></div></div>`);
  main.append(page);
  const body = renderBody(l.body, l.n);
  const readBox = $('[data-body="read"]', page); readBox.append(body);
  const tk = h(`<div class="takeaways"><div class="h3">Key takeaways</div><ol>${(l.takeaways || []).map(t => `<li>${MD.inline(t)}</li>`).join("")}</ol>${l.terms && l.terms.length ? `<p class="small muted" style="margin-top:14px">Terms: ${l.terms.map(t => { const g = CONTENT.glossary.find(x => x.id === t); return g ? `<a href="#g.${t}">${esc(g.term)}</a>` : ""; }).filter(Boolean).join(", ")}</p>` : ""}</div>`);
  readBox.append(tk);
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { LessonPage.mark("read"); io.disconnect(); } }, { threshold: 0.6 });
  io.observe(tk); Router.onLeave(() => io.disconnect());
  $('[data-body="watch"]', page).append(mediaBlock(l));
  const pr = $('[data-body="practice"]', page);
  (l.practice || []).forEach((p, i) => {
    const key = l.id + ":" + i; const done = () => LessonPage.mark("practice");
    if (typeof p === "string") { if (LABS[p]) pr.append(mountLab(p, done)); return; }
    const fn = { choice: "choice", sort: "sort", order: "order", rewrite: "rewrite" }[p.type]; if (!fn) return;
    pr.append(Ex[fn](p, { key, onDone: done }));
  });
  $('[data-body="check"]', page).append(Ex.choice({ title: "Three questions", intro: "Check your understanding before you move on.", items: (l.check || []).map(c => ({ prompt: c.q, options: c.options, answer: c.answer, why: c.why })) }, { key: l.id + ":check", kind: "Quick check", onDone: (s, t) => { Store.s.quiz[l.id] = { score: s, total: t, at: Date.now() }; LessonPage.mark("check"); } }));
  const jb = $('[data-body="journal"]', page);
  const jform = h(`<div class="stack gap-3"><p class="noticing">${esc(l.journal)}</p><div class="field"><label for="jl-${l.id}">Your notes</label><textarea class="input" id="jl-${l.id}" rows="5" placeholder="A few sentences is enough."></textarea></div><div class="row gap-2"><button class="btn primary" type="button" data-save>Save to journal</button><span class="small muted" data-js></span></div><div data-past class="stack"></div></div>`);
  jb.append(jform);
  const ta = $("textarea", jform); const draftKey = SITE.id + ".draft." + l.id; try { ta.value = localStorage.getItem(draftKey) || ""; } catch (e) { /* */ }
  ta.addEventListener("input", debounce(() => { try { localStorage.setItem(draftKey, ta.value); } catch (e) { /* */ } }, 400));
  const past = () => { const es = Journal.forLesson(l.id); $("[data-past]", jform).innerHTML = es.length ? `<div class="small muted" style="margin-top:8px">Earlier entries</div>` + es.map(e => `<div class="jentry" style="grid-template-columns:110px minmax(0,1fr)"><span class="jd">${fmtDate(e.ts)}</span><div class="jt">${esc(e.text)}</div></div>`).join("") : ""; };
  $("[data-save]", jform).onclick = async () => { const t = ta.value.trim(); if (!t) { ta.focus(); return; } await Journal.add({ type: "lesson", lesson: l.id, prompt: l.journal, text: t }); ta.value = ""; try { localStorage.removeItem(draftKey); } catch (e) { /* */ } $("[data-js]", jform).textContent = "Saved"; past(); LessonPage.refresh(); };
  past(); const offJ = Journal.on(past); Router.onLeave(offJ);
  const complete = $("[data-complete]", page);
  LessonPage.refresh = () => {
    const st = Store.s.lessons[id] || {};
    secs.forEach(([k]) => { const c = $(`[data-ck="${k}"]`, page); if (c) { c.classList.toggle("on", !!st[k]); c.innerHTML = st[k] ? I.check : ""; } const r = $(`[data-r="${k}"]`, page); if (r) r.innerHTML = st[k] ? `<span class="tag good">${I.check} Done</span>` : ""; });
    $("[data-steps]", page).innerHTML = secs.map(([k, n], i) => `<button type="button" data-go="${k}" class="${st[k] ? "on" : ""}">${st[k] ? I.check.replace("<svg", '<svg width="14" height="14"') : i + 1} ${n}</button>`).join("");
    $$("[data-steps] [data-go]", page).forEach(b => b.onclick = () => $("#sec-" + b.dataset.go, page).scrollIntoView({ behavior: "smooth", block: "start" }));
    if (secs.every(([k]) => st[k]) && !st.done) { st.done = Date.now(); Store.touch(); toast("Lesson complete"); }
    complete.className = "btn" + (st.done ? " done" : "");
    complete.innerHTML = st.done ? `${I.check} Completed` : "Mark lesson complete";
  };
  complete.onclick = () => { const st = Store.lesson(id); if (st.done) delete st.done; else st.done = Date.now(); Store.touch(); LessonPage.refresh(); };
  $$(".outline [data-go]", page).forEach(b => b.onclick = () => $("#sec-" + b.dataset.go, page).scrollIntoView({ behavior: "smooth", block: "start" }));
  const listen = () => { const blocks = [{ el: $(".h1", page), text: l.title + ". " + l.short }].concat(Speech.blocksFrom(body)).concat([{ el: $(".takeaways", page), text: "Key takeaways. " + (l.takeaways || []).join(" ") }]); Speech.start(l.title, blocks); Speech.onDone = () => LessonPage.mark("read"); };
  $("[data-listen]", page).onclick = listen; $("[data-listen2]", page).onclick = listen;
  const ac = $("[data-askcoach]", page); if (ac) ac.onclick = e => { e.preventDefault(); CoachPage.lesson = l.id; Router.go("coach"); };
  LessonPage.refresh();
  Router.onLeave(() => { Speech.stop(); LessonPage.cur = null; });
  if (pendingSection) { const s = pendingSection; pendingSection = null; requestAnimationFrame(() => $("#sec-" + s, page)?.scrollIntoView({ block: "start" })); }
};
function mountLab(id, onDone) {
  const lab = LABS[id];
  const b = Ex.bench({ kind: LBL("lab", "Lab"), title: lab.title, desc: lab.desc, mins: lab.mins, done: Store.s.labs[id] && Store.s.labs[id].done });
  const api = { data: Store.labData(id), save: debounce(() => Store.touch(), 500), done: () => { if (!(Store.s.labs[id] && Store.s.labs[id].done)) Store.labDone(id); b.setDone(true); onDone && onDone(); } };
  try { lab.mount(b.body, api); } catch (e) { console.error(id, e); b.body.innerHTML = `<p class="muted">This lab didn't load.</p>`; }
  return b;
}

/* ---------- Practice index and lab page ---------- */
Router.routes.practice = (main) => {
  const all = Object.values(LABS); const done = all.filter(l => Store.s.labs[l.id] && Store.s.labs[l.id].done).length;
  const page = h(`<div class="page"><div class="stack gap-3"><div class="eyebrow">Practice</div><h1 class="h1">${esc(LBL("practiceTitle", "The lab bench"))}</h1><p class="lede">${plural(all.length, "hands-on lab")}. ${esc(LBL("practiceLede", "Each one teaches a principle by letting you push it until it breaks."))} ${done ? `You've finished ${done}.` : "Start anywhere."}</p></div><div class="section" data-g></div></div>`);
  const groups = SITE.labGroups || [...new Set(all.map(l => l.skill || "Labs"))].map(s => [s, [s]]);
  groups.forEach(([g, skills]) => {
    const ls = all.filter(l => skills.includes(l.skill || "Labs")); if (!ls.length) return;
    $("[data-g]", page).append(h(`<section class="labgroup"><div class="section-head"><h2 class="h2">${esc(g)}</h2><span class="small muted">${plural(ls.length, "lab")}</span></div><div class="labgrid">${ls.map(l => { const ls2 = lessonById(l.lesson); const d = Store.s.labs[l.id] && Store.s.labs[l.id].done; return `<a class="labcard" href="#lab.${l.id}"><div class="lc-art">${l.art ? l.art() : ""}</div><div class="lc-b"><div class="lc-t"><span>${esc(l.title)}</span>${d ? `<span class="status done" style="width:20px;height:20px">${I.check}</span>` : ""}</div><div class="lc-d">${esc(String(l.desc || "").split(". ")[0])}.</div><div class="lc-m">${l.mins || 5} min${ls2 ? ` · Lesson ${ls2.n}` : ""}</div></div></a>`; }).join("")}</div></section>`));
  });
  main.append(page);
};
Router.routes.lab = (main, id) => {
  const lab = LABS[id]; if (!lab) { Router.go("practice"); return; }
  const l = lessonById(lab.lesson);
  const page = h(`<div class="page"><div class="stack gap-3"><div class="eyebrow"><a href="#practice" style="color:inherit">Practice</a><span>/</span>${esc(lab.skill || "Lab")}</div><h1 class="h1">${esc(lab.title)}</h1>${l ? `<p class="muted">The theory is in <a href="#l.${l.id}">Lesson ${l.n}: ${esc(l.title)}</a>.</p>` : ""}</div><div class="section" data-b></div></div>`);
  const bench = mountLab(id, () => { if (l) Store.mark(l.id, "practice"); }); bench.classList.add("solo"); $("[data-b]", page).append(bench);
  main.append(page);
};

/* ---------- Notes (short essays) ---------- */
Router.routes.notes = (main) => {
  const page = h(`<div class="page"><div class="stack gap-3"><div class="eyebrow">${esc(LBL("notes", "Field notes"))}</div><h1 class="h1">${esc(LBL("notesTitle", "Short essays on the big ideas"))}</h1><p class="lede">${esc(LBL("notesLede", "One idea each, readable in two minutes."))}</p></div>
    <div class="section notelist">${CONTENT.notes.map(n => `<a class="noteitem" href="#n.${n.id}"><div class="nt">${esc(n.title)}</div><p class="nx">${esc(String(n.body).replace(/[#>*_]/g, "").replace(/\s+/g, " ").trim().slice(0, 220))}</p><div class="nm">${n.minutes || 2} min read${Store.s.notesRead[n.id] ? " · read" : ""}</div></a>`).join("")}</div></div>`);
  main.append(page);
};
Router.routes.n = (main, id) => {
  const i = CONTENT.notes.findIndex(n => n.id === id); const n = CONTENT.notes[i]; if (!n) { Router.go("notes"); return; }
  const prev = CONTENT.notes[i - 1], next = CONTENT.notes[i + 1];
  const page = h(`<div class="page narrow"><div class="stack gap-3"><div class="eyebrow"><a href="#notes" style="color:inherit">${esc(LBL("notes", "Field notes"))}</a><span>/</span>${n.minutes || 2} min</div><h1 class="h1">${esc(n.title)}</h1><div class="row gap-2"><button class="btn small" type="button" data-listen>${I.headphones} Listen</button></div></div><div class="section" data-b style="margin-top:32px"></div>
    ${n.related && n.related.length ? `<div class="rule-top section" style="margin-top:40px"><div class="small muted">Related lessons</div><div class="row gap-3" style="margin-top:8px">${n.related.map(r => { const l = lessonById(r); return l ? `<a href="#l.${l.id}">Lesson ${l.n}: ${esc(l.title)}</a>` : ""; }).join("")}</div></div>` : ""}
    <nav class="pager">${prev ? `<a href="#n.${prev.id}"><small>Previous</small><b>${esc(prev.title)}</b></a>` : ""}${next ? `<a class="next" href="#n.${next.id}"><small>Next</small><b>${esc(next.title)}</b></a>` : ""}</nav></div>`);
  const body = renderBody(n.body, 0); body.classList.add("note-body"); $("[data-b]", page).append(body);
  main.append(page);
  $("[data-listen]", page).onclick = () => Speech.start(n.title, [{ el: $(".h1", page), text: n.title }].concat(Speech.blocksFrom(body)));
  if (!Store.s.notesRead[id]) { Store.s.notesRead[id] = Date.now(); Store.touch(); }
  Router.onLeave(() => Speech.stop());
};

/* ---------- Coach ---------- */
const CoachPage = {
  queue: null, lesson: null, ctl: null,
  get key() { return SITE.id + ".chat"; },
  load() { try { return JSON.parse(localStorage.getItem(this.key) || "[]"); } catch (e) { return []; } },
  save(t) { try { localStorage.setItem(this.key, JSON.stringify(t.slice(-30))); } catch (e) { /* */ } },
};
const offNotice = what => `<div class="notice">${esc(what)} runs on your Claude account and works when this page is opened inside Claude. It isn't available in this view, but everything else on the site is.</div>`;
Router.routes.coach = (main, arg) => {
  const tab = arg === "review" && reviewOn() ? "review" : "ask";
  const page = h(`<div class="page narrow"><div class="stack gap-3"><div class="eyebrow">Coach</div><h1 class="h1">${esc(tab === "ask" ? LBL("coachTitle", "Ask anything") : (SITE.review.title || "Get feedback"))}</h1>
    ${reviewOn() ? `<div class="seg" role="tablist"><a class="btn small ${tab === "ask" ? "primary" : "quiet"}" href="#coach" role="tab" aria-selected="${tab === "ask"}">Ask</a><a class="btn small ${tab === "review" ? "primary" : "quiet"}" href="#coach.review" role="tab" aria-selected="${tab === "review"}">${esc(SITE.review.tab || "Get feedback")}</a></div>` : ""}</div>
    <div class="section" style="margin-top:28px" data-c></div></div>`);
  main.append(page);
  const box = $("[data-c]", page);
  if (tab === "review") { Review.mount(box, {}); return; }
  if (!coachOn()) { box.innerHTML = `<p class="muted">The coach is switched off for this site.</p>`; return; }
  let turns = CoachPage.load();
  box.innerHTML = `<div class="coach"><div data-status></div><div class="thread" data-thread></div><form class="composer" data-form><label class="vh" for="coach-in">Message</label><textarea id="coach-in" rows="1" placeholder="${esc(LBL("askPlaceholder", "Ask anything"))}"></textarea><button class="btn primary" type="submit" data-send aria-label="Send">${I.send}</button></form><div class="row" style="justify-content:space-between"><span class="small faint">Answers come from Claude on your account. Check anything important.</span><button class="btn small quiet" type="button" data-new>${I.plus} New chat</button></div></div>`;
  const thread = $("[data-thread]", box), ta = $("#coach-in", box), form = $("[data-form]", box);
  const status = () => { $("[data-status]", box).innerHTML = Coach.state === "off" ? offNotice("The coach") : Coach.state === "pending" ? `<div class="small faint">Connecting to the coach…</div>` : ""; $("[data-send]", box).disabled = Coach.state !== "ready"; };
  const aiBubble = md => { const b = h(`<div class="msg-ai"><div class="who">${I.sparkle.replace("<svg", '<svg width="16" height="16"')} Coach</div><div class="prose"></div></div>`); $(".prose", b).innerHTML = MD.render(md, { trusted: false }); MD.fixLinks(b); return b; };
  const paintThread = () => {
    thread.innerHTML = "";
    if (!turns.length) {
      const l = CoachPage.lesson && lessonById(CoachPage.lesson);
      thread.append(h(`<div class="stack gap-3"><p class="muted">${l ? `Ask anything about <b>${esc(l.title)}</b>, or try one of these:` : "Try one of these, or ask your own:"}</p><div class="suggests">${(SITE.coach.suggestions || []).map(s => `<button type="button" class="suggest">${esc(s)}</button>`).join("")}</div></div>`));
      $$(".suggest", thread).forEach(b => b.onclick = () => { ta.value = b.textContent; send(); });
    }
    turns.forEach(t => thread.append(t.role === "user" ? h(`<div class="msg-me">${esc(t.content)}</div>`) : aiBubble(t.content)));
  };
  const send = async () => {
    const q = ta.value.trim(); if (!q || Coach.state !== "ready") return;
    ta.value = ""; ta.style.height = "";
    if (!turns.length) thread.innerHTML = "";
    turns.push({ role: "user", content: q }); CoachPage.save(turns);
    thread.append(h(`<div class="msg-me">${esc(q)}</div>`));
    const bubble = h(`<div class="msg-ai"><div class="who">${I.sparkle.replace("<svg", '<svg width="16" height="16"')} Coach</div><div class="prose"><span class="thinking"><i></i><i></i><i></i> Thinking</span></div></div>`); thread.append(bubble);
    bubble.scrollIntoView({ block: "nearest" });
    const ctl = new AbortController(); CoachPage.ctl = ctl;
    const sendBtn = $("[data-send]", box); sendBtn.innerHTML = I.stopSq; sendBtn.setAttribute("aria-label", "Stop"); sendBtn.type = "button"; sendBtn.onclick = () => ctl.abort();
    const l = CoachPage.lesson && lessonById(CoachPage.lesson);
    const ctx = Coach.context() + (l ? `\n\nThe learner is currently studying lesson ${l.n}, "${l.title}". Lesson summary: ${l.short}` : "");
    const prose = $(".prose", bubble);
    try {
      const { text, truncated } = await Coach.fn([{ role: "user", content: ctx }].concat(turns.slice(-14)), { signal: ctl.signal, cache: false, onText: ({ text }) => { prose.innerHTML = MD.render(text, { trusted: false }); MD.fixLinks(prose); } });
      turns.push({ role: "assistant", content: text }); CoachPage.save(turns);
      if (truncated) prose.append(h(`<p class="small faint">The answer was cut short. Ask a narrower question to get the rest.</p>`));
    } catch (e) {
      if (e && e.text) { prose.innerHTML = MD.render(e.text, { trusted: false }); turns.push({ role: "assistant", content: e.text }); CoachPage.save(turns); }
      else prose.innerHTML = "";
      if (e && e.code !== "cancelled") { prose.append(h(`<div class="fb warn">${esc(Coach.errorCopy(e && e.code))}</div>`)); if (Coach.hardOff(e.code)) { Coach.state = "off"; status(); } }
    }
    sendBtn.innerHTML = I.send; sendBtn.setAttribute("aria-label", "Send"); sendBtn.type = "submit"; sendBtn.onclick = null; CoachPage.ctl = null;
    MD.fixLinks(bubble);
  };
  form.addEventListener("submit", e => { e.preventDefault(); send(); });
  ta.addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } });
  ta.addEventListener("input", () => { ta.style.height = "auto"; ta.style.height = Math.min(200, ta.scrollHeight) + "px"; });
  $("[data-new]", box).onclick = () => { if (CoachPage.ctl) CoachPage.ctl.abort(); turns = []; CoachPage.save(turns); CoachPage.lesson = null; paintThread(); ta.focus(); };
  status(); paintThread();
  const off = Coach.on(() => { status(); if (CoachPage.queue && Coach.state === "ready") { ta.value = CoachPage.queue; CoachPage.queue = null; send(); } });
  Router.onLeave(() => { off(); if (CoachPage.ctl) CoachPage.ctl.abort(); });
  if (CoachPage.queue) { if (Coach.state === "ready") { ta.value = CoachPage.queue; CoachPage.queue = null; send(); } else ta.value = CoachPage.queue; }
};

/* ---------- Review: feedback on the learner's own work (image and/or text) ---------- */
const Review = {
  mount(el, { onDone } = {}) {
    const R = SITE.review || {};
    const allowImage = R.image !== false, allowText = !!R.text;
    let file = null, focus = new Set([(R.focus || ["Overall"])[0]]), ctl = null;
    el.innerHTML = `<div class="stack gap-5"><div data-st></div>
      ${allowImage ? `<label class="drop" data-drop><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-file class="vh"><span data-prev>${I.upload.replace("<svg", '<svg width="28" height="28"')}</span><b>${esc(R.imagePrompt || "Drop an image here, or choose a file")}</b><span class="small muted">${esc(R.imageHint || "PNG or JPEG.")}</span></label>` : ""}
      ${allowText ? `<div class="field"><label for="rv-text">${esc(R.textLabel || "Paste your work")}</label><textarea class="input" id="rv-text" rows="8" placeholder="${esc(R.textPlaceholder || "")}"></textarea></div>` : ""}
      <div class="split">${R.kinds && R.kinds.length ? `<div class="field"><label for="rv-kind">What is it?</label><select class="input" id="rv-kind">${R.kinds.map(k => `<option>${esc(k)}</option>`).join("")}</select></div>` : ""}<div class="field"><label for="rv-goal">${esc(R.goalLabel || "What is it for, and what should it achieve?")}</label><input class="input" id="rv-goal" placeholder="${esc(R.goalPlaceholder || "")}"></div></div>
      ${R.focus && R.focus.length ? `<div class="stack gap-2"><span class="label">Focus on</span><div class="chips" data-focus>${R.focus.map(f => `<button type="button" class="chiptoggle" aria-pressed="${focus.has(f)}">${esc(f)}</button>`).join("")}</div></div>` : ""}
      <div class="row gap-2" data-act><button class="btn primary" type="button" data-run>${I.sparkle} ${esc(R.action || "Get feedback")}</button></div><div data-out class="stack gap-3"></div></div>`;
    const st = $("[data-st]", el);
    const status = () => {
      const run = $("[data-run]", el); if (!run) return;
      if (Coach.state === "off") { st.innerHTML = offNotice("Feedback"); run.disabled = true; }
      else if (Coach.state === "ready" && allowImage && !allowText && !Coach.images) { st.innerHTML = `<div class="notice">Image feedback isn't available in this view. You can still describe your work to the coach in <a href="#coach">Ask</a>.</div>`; run.disabled = true; }
      else { st.innerHTML = ""; run.disabled = Coach.state !== "ready"; }
    };
    const setFile = f => {
      if (!f) return; if (!/^image\/(png|jpeg|webp|gif)$/.test(f.type)) { toast("Choose a PNG, JPEG, WebP or GIF image."); return; }
      if (Coach.limits && Coach.limits.images && f.size > Coach.limits.images.maxInputBytes) { toast("That image is too large."); return; }
      file = f; $("[data-prev]", el).innerHTML = `<img src="${URL.createObjectURL(f)}" alt="Your upload">`;
    };
    if (allowImage) {
      $("[data-file]", el).onchange = e => setFile(e.target.files[0]);
      const drop = $("[data-drop]", el);
      drop.addEventListener("dragover", e => { e.preventDefault(); drop.classList.add("over"); });
      drop.addEventListener("dragleave", () => drop.classList.remove("over"));
      drop.addEventListener("drop", e => { e.preventDefault(); drop.classList.remove("over"); setFile(e.dataTransfer.files[0]); });
      el.addEventListener("paste", e => { const f = [...(e.clipboardData?.files || [])][0]; if (f) setFile(f); });
    }
    const fz = $("[data-focus]", el); if (fz) fz.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; const f = b.textContent; if (focus.has(f)) focus.delete(f); else focus.add(f); b.setAttribute("aria-pressed", String(focus.has(f))); });
    const run = async () => {
      const text = allowText ? $("#rv-text", el).value.trim() : "";
      if (!file && !text) { toast(allowText && allowImage ? "Add an image or paste your work first." : allowText ? "Paste your work first." : "Add an image first."); return; }
      const kind = $("#rv-kind", el) ? $("#rv-kind", el).value : "piece of work";
      const goal = $("#rv-goal", el).value.trim() || "not stated";
      const lessons = CONTENT.lessons.map(l => `${l.id}: ${l.title}`).join("\n");
      const sections = R.sections || "## First read\nTwo sentences: what this communicates or does at first look, and whether that matches the goal.\n## What works\nTwo or three specific bullets.\n## Fix these first\nA numbered list of the three to five highest-impact problems, most important first. For each: the problem in bold in one line, the principle it breaks (name it), and the concrete fix.\n## Quick wins\nTwo to four small changes that take minutes.\n## Next step\nOne specific thing to practise next.";
      const prompt = `You are ${R.role || (SITE.coach && SITE.coach.role) || "an experienced practitioner and teacher"} giving feedback to ${Coach.learner()}, who is learning ${SITE.subject}. Be direct, specific and kind. ${Coach.style()}

${file ? "The attached image is" : "The text below is"} the learner's ${kind}. Purpose and goal: ${goal}. Focus areas: ${[...focus].join(", ") || "Overall"}.
${R.instructions ? R.instructions + "\n" : ""}
Write the feedback in Markdown with exactly these sections:
${sections}

Where a course lesson covers a point, link it as [Lesson title](#l.<id>) using only these ids:
${lessons}${text ? `\n\nThe learner's work:\n"""\n${text.slice(0, 20000)}\n"""` : ""}`;
      ctl = new AbortController();
      const act = $("[data-act]", el); act.innerHTML = `<span class="thinking"><i></i><i></i><i></i> Looking closely. This can take a minute.</span><button class="btn small quiet" type="button" data-stop>${I.stopSq} Stop</button>`;
      $("[data-stop]", act).onclick = () => ctl.abort();
      const out = $("[data-out]", el); out.innerHTML = `<div class="prose" data-md></div>`; const md = $("[data-md]", out);
      try {
        const opts = { signal: ctl.signal, cache: false, onText: ({ text: t }) => { md.innerHTML = MD.render(t, { trusted: false }); MD.fixLinks(md); } };
        if (file) opts.images = [file];
        const { text: answer } = await Coach.fn(prompt, opts);
        md.innerHTML = MD.render(answer, { trusted: false }); MD.fixLinks(md);
        const save = h(`<div class="row gap-2"><button class="btn" type="button">${I.journal} Save to journal</button></div>`); out.append(save);
        $("button", save).onclick = async () => { await Journal.add({ type: "review", prompt: `${kind} · ${goal}`, text: answer }); save.innerHTML = `<span class="tag good">${I.check} Saved to journal</span>`; };
        onDone && onDone();
      } catch (e) {
        if (e && e.text) md.innerHTML = MD.render(e.text, { trusted: false });
        if (e && e.code !== "cancelled") { out.prepend(h(`<div class="fb warn">${esc(Coach.errorCopy(e && e.code))}</div>`)); if (Coach.hardOff(e.code)) Coach.state = "off"; }
      }
      act.innerHTML = `<button class="btn primary" type="button" data-run>${I.sparkle} Again</button>`; $("[data-run]", act).onclick = run;
    };
    $("[data-run]", el).onclick = run;
    status(); const off = Coach.on(status); Router.onLeave(off);
  },
};

/* ---------- Journal ---------- */
const JournalPage = { prefill: null };
Router.routes.journal = (main) => {
  const todayPrompt = pick(SITE.prompts, dayIndex());
  const prompt = JournalPage.prefill || todayPrompt; JournalPage.prefill = null;
  const page = h(`<div class="page narrow"><div class="stack gap-3"><div class="eyebrow">Journal</div><h1 class="h1">${esc(LBL("journalTitle", "Your journal"))}</h1><p class="lede">${esc(LBL("journalLede", "Write down what you notice, a few sentences at a time. Noticing is how skill compounds."))}</p></div>
    <section class="section panel pad stack gap-3">${prompt ? `<div class="row" style="justify-content:space-between"><span class="label">Prompt</span><button class="btn small quiet" type="button" data-shuffle>${I.reset} Another prompt</button></div><p class="noticing" data-p>${esc(prompt)}</p>` : ""}
      <div class="field"><label for="jn-text">Entry</label><textarea class="input" id="jn-text" rows="5" placeholder="What did you notice?"></textarea></div><div class="row gap-2"><button class="btn primary" type="button" data-save>Save entry</button>${prompt ? `<label class="check-inline"><input type="checkbox" id="jn-free"> No prompt, just notes</label>` : ""}</div></section>
    <section class="section"><div class="section-head"><h2 class="h3">Entries</h2><span class="small muted" data-count></span></div><div data-list></div></section></div>`);
  main.append(page);
  let cur = prompt;
  const sh = $("[data-shuffle]", page); if (sh) sh.onclick = () => { cur = SITE.prompts[Math.floor(Math.random() * SITE.prompts.length)]; $("[data-p]", page).textContent = cur; };
  $("[data-save]", page).onclick = async () => { const t = $("#jn-text", page).value.trim(); if (!t) { $("#jn-text", page).focus(); return; } const free = !cur || ($("#jn-free", page) && $("#jn-free", page).checked); await Journal.add({ type: free ? "free" : "noticing", prompt: free ? "" : cur, text: t }); $("#jn-text", page).value = ""; toast("Saved"); };
  const list = () => {
    const es = Journal.entries;
    $("[data-count]", page).textContent = es.length ? plural(es.length, "entry", "entries") : "";
    $("[data-list]", page).innerHTML = es.length ? "" : `<p class="muted">No entries yet. Lesson reflections, daily notes and saved feedback collect here.</p>`;
    es.forEach(e => {
      const l = e.lesson && lessonById(e.lesson);
      const tag = e.type === "lesson" && l ? `<a href="#l.${l.id}">Lesson ${l.n}</a>` : e.type === "review" || e.type === "critique" ? "Feedback" : e.type === "noticing" ? "Noticing" : "Note";
      const rich = e.type === "review" || e.type === "critique";
      const row = h(`<article class="jentry"><div class="stack gap-1"><span class="jd">${fmtDate(e.ts)}</span><span class="small">${tag}</span></div><div style="min-width:0">${e.prompt ? `<p class="jp">${esc(e.prompt)}</p>` : ""}<div class="jt ${rich ? "prose" : ""}"></div><div class="row gap-1" style="margin-top:8px"><button class="btn small quiet" type="button" data-edit>${I.edit} Edit</button><button class="btn small quiet" type="button" data-del>${I.trash} Delete</button></div></div></article>`);
      const jt = $(".jt", row); if (rich) { jt.innerHTML = MD.render(e.text, { trusted: false }); MD.fixLinks(jt); } else jt.textContent = e.text;
      $("[data-edit]", row).onclick = () => { jt.innerHTML = ""; const ta = h(`<textarea class="input" rows="5"></textarea>`); ta.value = e.text; jt.append(ta); const sv = h(`<button class="btn small primary" type="button" style="margin-top:8px">Save changes</button>`); jt.append(sv); sv.onclick = () => Journal.update(e.id, ta.value); ta.focus(); };
      $("[data-del]", row).onclick = () => { const bar = $("[data-del]", row).parentElement; bar.innerHTML = `<span class="small">Delete this entry for good?</span><button class="btn small" type="button" data-yes style="color:var(--bad)">Delete</button><button class="btn small quiet" type="button" data-no>Keep</button>`; $("[data-yes]", bar).onclick = () => Journal.remove(e.id); $("[data-no]", bar).onclick = list; };
      $("[data-list]", page).append(row);
    });
  };
  list(); const off = Journal.on(list); Router.onLeave(off);
};

/* ---------- Reference: custom sections + glossary + library ---------- */
const RefTabs = () => {
  const custom = (SITE.reference || []).map(s => [s.id, s.title, s]);
  const ids = custom.map(c => c[0]);
  const out = custom.slice();
  if (!ids.includes("glossary")) out.push(["glossary", "Glossary", { id: "glossary", type: "glossary" }]);
  if (!ids.includes("library") && CONTENT.library.length) out.push(["library", "Library", { id: "library", type: "library" }]);
  return out.filter(t => t[2].type !== "library" || CONTENT.library.length);
};
const RefBlocks = {
  facts: (b) => `<div class="numbers">${b.data.map(([g, lid, rows]) => { const l = lessonById(lid); return `<section class="numgroup"><h3>${esc(g)}</h3><dl>${rows.map(([k, v]) => `<div class="nr"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>${l ? `<p class="small" style="margin-top:8px"><a href="#l.${l.id}">Lesson ${l.n}: ${esc(l.title)}</a></p>` : ""}</section>`; }).join("")}</div>`,
  cards: (b) => `<div class="laws">${b.data.map(([n, d, u, lid]) => `<div class="law"><b>${esc(n)}</b><p>${esc(d)}</p>${u ? `<p class="use"><b style="display:inline;font:inherit;font-weight:700">${esc(b.useLabel || "In practice")}:</b> ${esc(u)}</p>` : ""}${lessonById(lid) ? `<p class="small" style="margin-top:6px"><a href="#l.${lid}">Lesson ${lessonById(lid).n}</a></p>` : ""}</div>`).join("")}</div>`,
  table: (b) => `<div style="overflow-x:auto"><table class="table" style="min-width:${b.minWidth || 640}px"><thead><tr>${b.data.head.map(x => `<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>${b.data.rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${esc(c)}</th>` : `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`,
  list: (b) => `<ol class="stack gap-2" style="padding-left:1.3em;font-size:16.5px;line-height:1.5">${b.data.map(q => `<li>${esc(q)}</li>`).join("")}</ol>`,
  checklist: (b) => b.data.map(([g, items]) => `<div style="margin-top:10px"><b class="small">${esc(g)}</b><ul class="small" style="margin:4px 0 0;padding-left:1.2em;color:var(--ink-2)">${items.map(i => `<li>${esc(Array.isArray(i) ? i[0] : i)}</li>`).join("")}</ul></div>`).join(""),
  html: (b) => typeof b.data === "function" ? b.data() : String(b.data),
};
Router.routes.ref = (main, arg) => {
  const tabs = RefTabs(); const cur = tabs.find(t => t[0] === arg) || tabs[0]; const sec = cur[2];
  const page = h(`<div class="page"><div class="stack gap-3"><div class="eyebrow">Reference</div><h1 class="h1">${esc(sec.heading || cur[1])}</h1></div>
    <nav class="subnav section" style="margin-top:24px">${tabs.map(([k, n]) => `<a href="#ref.${k}" ${k === cur[0] ? 'aria-current="page"' : ""}>${esc(n)}</a>`).join("")}</nav><div data-b></div></div>`);
  const b = $("[data-b]", page);
  if (sec.type === "glossary") {
    const terms = CONTENT.glossary.slice().sort((a, c) => a.term.localeCompare(c.term, SITE.lang || "en", { sensitivity: "base" }));
    b.innerHTML = `<div class="field" style="max-width:420px;margin-bottom:24px"><label for="gl-q">Filter ${terms.length} terms</label><input class="input" id="gl-q" placeholder="Type a word" autocomplete="off"></div><dl class="gloss" data-gl></dl>`;
    const paint = q => {
      const qq = (q || "").toLowerCase(); let last = "";
      $("[data-gl]", b).innerHTML = terms.filter(t => !qq || t.term.toLowerCase().includes(qq) || t.def.toLowerCase().includes(qq)).map(t => { const L0 = t.term[0].toUpperCase(); const head = !qq && L0 !== last ? `<div class="letter">${/[A-Z]/.test(L0) ? L0 : "#"}</div>` : ""; last = L0; const l = lessonById(t.lesson); return `${head}<div class="gitem" id="g-${t.id}"><dt>${esc(t.term)}</dt><dd>${esc(t.def)}${l || (t.see || []).length ? `<div class="gl">${l ? `<a href="#l.${l.id}">Lesson ${l.n}</a>` : ""}${(t.see || []).length ? (l ? " · " : "") + "See " + t.see.map(s => { const x = CONTENT.glossary.find(g => g.id === s); return x ? `<a href="#g.${s}">${esc(x.term)}</a>` : ""; }).filter(Boolean).join(", ") : ""}</div>` : ""}</dd></div>`; }).join("") || `<p class="muted">No terms match.</p>`;
    };
    paint(""); $("#gl-q", b).addEventListener("input", e => paint(e.target.value));
    if (Router.glossaryTarget) { const t = Router.glossaryTarget; Router.glossaryTarget = null; requestAnimationFrame(() => { const el = $("#g-" + t, b); if (el) { el.classList.add("hl"); el.scrollIntoView({ block: "center" }); } }); }
  } else if (sec.type === "library") {
    b.innerHTML = CONTENT.library.map(g => `<section class="section" style="margin-top:32px"><h2 class="h2" style="margin-bottom:12px">${esc(g.title)}</h2><div class="libgrid">${(g.items || []).map(x => `<div class="libitem"><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.title || x.name)}</a>${x.by || x.author || x.year ? `<div class="by">${esc(x.by || x.author || "")}${x.year ? (x.by || x.author ? " · " : "") + x.year : ""}</div>` : ""}<p>${esc(x.why || "")}</p></div>`).join("")}</div></section>`).join("");
  } else {
    const blocks = sec.blocks || [{ type: sec.type, data: sec.data, useLabel: sec.useLabel, minWidth: sec.minWidth }];
    const html = blocks.map(bl => `<section>${bl.title ? `<h2 class="h3" style="margin-bottom:8px">${esc(bl.title)}</h2>` : ""}${bl.lede ? `<p class="small muted" style="margin-bottom:12px">${MD.inline(bl.lede)}</p>` : ""}${(RefBlocks[bl.type] || RefBlocks.html)(bl)}</section>`).join("");
    b.innerHTML = (sec.lede ? `<p class="lede" style="margin-bottom:24px">${MD.inline(sec.lede)}</p>` : "") + (sec.layout === "split" ? `<div class="split" style="align-items:start">${html}</div>` : html);
    MD.fixLinks(b);
  }
  main.append(page);
};
Router.routes.g = (main, id) => { Router.glossaryTarget = id; Router.routes.ref(main, "glossary"); };

/* ---------- More (mobile) ---------- */
Router.routes.more = (main) => {
  const items = [["journal", "Journal", "Your notes, reflections and saved feedback", I.journal]];
  if (CONTENT.notes.length) items.push(["notes", LBL("notes", "Field notes"), LBL("notesLede", "Short essays on the big ideas"), I.notes]);
  items.push(["ref", "Reference", "Glossary and quick reference", I.ref]);
  main.append(h(`<div class="page narrow"><h1 class="h1">More</h1><nav class="stack section" style="margin-top:24px">${items.map(([k, n, s, ic]) => `<a class="lrow" href="#${k}" style="grid-template-columns:28px minmax(0,1fr)"><span style="color:var(--ink-3)">${ic}</span><span><span class="t">${esc(n)}</span><span class="s" style="display:block">${esc(s)}</span></span></a>`).join("")}<button class="lrow" type="button" data-search style="grid-template-columns:28px minmax(0,1fr);border:0;background:none;text-align:left;font:inherit"><span style="color:var(--ink-3)">${I.search}</span><span><span class="t">Search</span><span class="s" style="display:block">Find any lesson, lab, term or note</span></span></button></nav></div>`));
  $("[data-search]", main).onclick = () => Search.open();
};

/* ---------- Search palette ---------- */
const Search = {
  index: null,
  build() {
    const strip = s => String(s || "").replace(/\[\[[^\]]+\]\]/g, "").replace(/[#>*_|]/g, " ").replace(/\s+/g, " ");
    this.index = [].concat(
      CONTENT.lessons.map(l => ({ k: "Lesson " + l.n, t: l.title, s: l.short, href: "#l." + l.id, hay: (l.title + " " + l.short + " " + strip(l.body) + " " + (l.terms || []).join(" ")).toLowerCase(), w: 3 })),
      Object.values(LABS).map(l => ({ k: "Lab", t: l.title, s: l.desc, href: "#lab." + l.id, hay: (l.title + " " + l.desc + " " + (l.skill || "")).toLowerCase(), w: 2 })),
      CONTENT.notes.map(n => ({ k: LBL("noteSingular", "Note"), t: n.title, s: strip(n.body).slice(0, 120), href: "#n." + n.id, hay: (n.title + " " + strip(n.body)).toLowerCase(), w: 1 })),
      CONTENT.glossary.map(g => ({ k: "Term", t: g.term, s: g.def, href: "#g." + g.id, hay: (g.term + " " + g.def).toLowerCase(), w: 2.5, term: g.term.toLowerCase() })),
      RefTabs().map(([k, n, s]) => ({ k: "Reference", t: s.heading || n, s: "", href: "#ref." + k, hay: (n + " " + (s.heading || "")).toLowerCase(), w: 1 })),
    );
  },
  find(q) {
    q = q.trim().toLowerCase(); if (!q) return [];
    const words = q.split(/\s+/);
    return this.index.map(it => { let sc = 0; const tl = it.t.toLowerCase(); if (tl === q || it.term === q) sc += 100; if (tl.startsWith(q)) sc += 40; if (tl.includes(q)) sc += 20; words.forEach(w => { if (tl.includes(w)) sc += 8; if (it.hay.includes(w)) sc += 2; }); if (!words.every(w => it.hay.includes(w) || tl.includes(w))) sc = 0; return [sc * it.w, it]; }).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0]).slice(0, 12).map(x => x[1]);
  },
  open() {
    if (!this.index) this.build();
    if ($(".palette-back")) return;
    const hint = LBL("searchHint", "Try a key term from any lesson.");
    const back = h(`<div class="palette-back" role="dialog" aria-modal="true" aria-label="Search"><div class="palette"><label class="vh" for="pal-q">Search ${esc(SITE.name)}</label><input id="pal-q" placeholder="Search lessons, labs, terms, notes…" autocomplete="off"><ul role="listbox" data-res><li class="small muted" style="padding:12px">${esc(hint)}</li></ul></div></div>`);
    document.body.append(back);
    const inp = $("#pal-q", back), res = $("[data-res]", back); let sel = 0, items = [];
    const paint = () => { items = this.find(inp.value); res.innerHTML = items.length ? items.map((it, i) => `<li><a href="${it.href}" role="option" aria-selected="${i === sel}"><span class="k">${esc(it.k)}</span><span style="min-width:0"><span class="pt">${esc(it.t)}</span>${it.s ? `<span class="ps">${esc(it.s)}</span>` : ""}</span></a></li>`).join("") : inp.value ? `<li class="small muted" style="padding:12px">Nothing found. Try another word${coachOn() ? ", or ask the coach" : ""}.</li>` : `<li class="small muted" style="padding:12px">${esc(hint)}</li>`; };
    const close = () => { back.remove(); document.removeEventListener("keydown", key); };
    const key = e => { if (e.key === "Escape") close(); if (e.key === "ArrowDown") { sel = Math.min(items.length - 1, sel + 1); paint(); e.preventDefault(); } if (e.key === "ArrowUp") { sel = Math.max(0, sel - 1); paint(); e.preventDefault(); } if (e.key === "Enter" && items[sel]) { location.hash = items[sel].href.slice(1); close(); } };
    inp.addEventListener("input", () => { sel = 0; paint(); });
    back.addEventListener("click", e => { if (e.target === back) close(); if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", key);
    inp.focus();
  },
};
