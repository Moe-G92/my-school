/* My School engine: boot. Builds the shell from SITE, wires shortcuts, storage and capabilities. */
function boot() {
  CONTENT.lessons.sort((a, b) => a.n - b.n);
  const nav = [["today", "Today", I.today], ["path", "Path", I.path]];
  if (Object.keys(LABS).length) nav.push(["practice", "Practice", I.practice]);
  if (CONTENT.notes.length) nav.push(["notes", LBL("notes", "Field notes"), I.notes]);
  const sepAt = nav.length;
  if (coachOn() || reviewOn()) nav.push(["coach", "Coach", I.coach]);
  nav.push(["journal", "Journal", I.journal], ["ref", "Reference", I.ref]);
  const tabs = [["today", "Today", I.today], ["path", "Path", I.path]];
  if (Object.keys(LABS).length) tabs.push(["practice", "Practice", I.practice]);
  if (coachOn() || reviewOn()) tabs.push(["coach", "Coach", I.coach]);
  tabs.push(["more", "More", I.more]);
  const wordmark = `<a class="wordmark" href="#today" aria-label="${esc(SITE.name)}, home"><span class="bl" aria-hidden="true"></span>${esc(SITE.name)}</a>`;
  const app = h(`<div class="app">
    <aside class="rail" aria-label="Main">
      <div>${wordmark}${SITE.tagline ? `<div class="wordmark-sub">${esc(SITE.tagline)}</div>` : ""}</div>
      <nav class="nav">${nav.map(([k, n, ic], i) => `${i === sepAt && i < nav.length ? '<div class="sep"></div>' : ""}<a href="#${k}" data-nav="${k}">${ic}${esc(n)}</a>`).join("")}</nav>
      <div class="rail-foot"><button class="searchbtn" type="button" data-search>${I.search}Search<kbd>⌘K</kbd></button><div class="progress-mini" data-prog></div><div class="sync" data-sync></div></div>
    </aside>
    <header class="topbar">${wordmark}<button class="iconbtn" type="button" data-search aria-label="Search">${I.search}</button></header>
    <main id="main" tabindex="-1"></main>
    <nav class="tabbar" aria-label="Main" style="grid-template-columns:repeat(${tabs.length},1fr)">${tabs.map(([k, n, ic]) => `<a href="#${k}" data-nav="${k}">${ic}<span>${esc(n)}</span></a>`).join("")}</nav>
  </div>`);
  document.body.append(app);
  $$("[data-search]", app).forEach(b => b.onclick = () => Search.open());
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent); if (!isMac) $$("kbd", app).forEach(k => k.textContent = "Ctrl K");

  const rail = () => {
    const d = Store.doneCount(), t = CONTENT.lessons.length;
    $("[data-prog]", app).innerHTML = `${d} of ${t} lessons<div class="bar"><i style="width:${t ? d / t * 100 : 0}%"></i></div>`;
    const s = $("[data-sync]", app); s.dataset.on = Store.remote ? "1" : "0"; s.textContent = Store.remote ? "Progress saved to your account" : "Progress saved in this browser";
  };
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); Search.open(); }
    else if (e.key === "/" && !e.target.closest("input, textarea, select, [contenteditable]")) { e.preventDefault(); Search.open(); }
  });
  Store.load(); Journal.load();
  window.addEventListener("hashchange", () => Router.render());
  Router.render(); rail();
  Store.on(kind => { rail(); if (kind === "sync") { const r = Router.parse().name; if (["today", "path", "practice"].includes(r)) { Router.keepScroll = true; Router.render(); } } });
  Store.connect();
  Coach.connect();
}
if (document.body) boot(); else document.addEventListener("DOMContentLoaded", boot);
