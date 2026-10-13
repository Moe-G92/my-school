/* Baseline signature: the site's name set huge, with the real typographic guidelines (ascender, cap height,
   x-height, baseline) measured from the font and drawn behind it. The hero teaches the subject's own vocabulary. */
SITE.hero = (el) => {
  el.innerHTML = `<div class="specimen"><div class="specimen-wrap"><div class="guides" data-guides></div><h1 class="specimen-word" data-word>${esc(SITE.name)}<span class="probe" data-probe></span></h1></div><p class="guide-legend" aria-hidden="true">Guides, top to bottom: ascender, cap height, x-height, baseline</p></div>`;
  const word = $("[data-word]", el), probe = $("[data-probe]", el), g = $("[data-guides]", el);
  const draw = () => {
    if (!word.isConnected) return;
    const cs = getComputedStyle(word); const size = parseFloat(cs.fontSize);
    const cv = document.createElement("canvas").getContext("2d"); cv.font = `${cs.fontWeight} ${size}px ${cs.fontFamily}`; try { cv.fontStretch = "ultra-expanded"; } catch (e) { /* */ }
    const m = c => cv.measureText(c);
    const pr = probe.getBoundingClientRect(), host = g.parentElement.getBoundingClientRect();
    const base = pr.top - host.top;
    const lines = [["ascender", base - m("l").actualBoundingBoxAscent, true], ["cap height", base - m("B").actualBoundingBoxAscent, false], ["x-height", base - m("x").actualBoundingBoxAscent, false], ["baseline", base, false]];
    g.innerHTML = lines.filter((x, i) => !(i === 0 && Math.abs(x[1] - lines[1][1]) < 4)).map(([n, y, dash]) => `<div class="guide ${dash ? "dashed" : ""}" style="top:${y}px;left:-8px;right:0"><span>${n}</span></div>`).join("");
    if (!g.dataset.drawn) { g.classList.add("draw"); g.dataset.drawn = "1"; }
  };
  requestAnimationFrame(draw);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  const ro = new ResizeObserver(draw); ro.observe(word); Router.onLeave(() => ro.disconnect());
};
