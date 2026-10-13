// An example figure. Figures are theme-aware SVG diagrams placed in lessons with [[fig:id]] on its own line.
// Draw with the S helpers so colours come from CSS variables and work in light and dark:
//   S.svg(w, h, body, ariaLabel)  S.r(x,y,w,h,fill,stroke,rx)  S.c(cx,cy,r,fill,stroke)  S.l(x1,y1,x2,y2,stroke,width)
//   S.p(d,fill,stroke,width)  S.t(x,y,text,{size,a,w,c,f})  S.arrow(x1,y1,x2,y2)  S.hd/vd(...) dimension lines  S.lines(...) text placeholders
// Colour names are token names without "--": ink, ink-2, ink-3, paper, surface, sunk, rule, rule-strong, accent, accent-soft, sel, spec, good, bad, warn and their -soft.
// Keep viewBox about 600 wide and text 12–17 units so it stays legible on phones (it scrolls sideways below ~420px).
FIG("fig-compound-curve", "Money paid in rises in a straight line; the balance with compounding curves away from it. The gap between the two lines is growth on growth.", () => {
  const W = 600, H = 300, x = i => 50 + i * 17, y = v => 260 - v / 140;
  let paid = "", bal = "", b = 0;
  for (let i = 0; i <= 30; i++) { b = i ? b * 1.06 + 1200 : 0; paid += `${x(i)},${y(i * 1200)} `; bal += `${x(i)},${y(b)} `; }
  return S.svg(W, H,
    S.l(50, 260, 570, 260, "rule-strong", 1) + S.l(50, 20, 50, 260, "rule-strong", 1) +
    `<polyline points="${paid}" style="fill:none;stroke:var(--ink-3);stroke-width:2;stroke-dasharray:6 5"/>` +
    `<polyline points="${bal}" style="fill:none;stroke:var(--accent);stroke-width:3"/>` +
    S.t(560, y(b) - 8, "balance", { size: 13, a: "end", c: "accent", w: 700 }) + S.t(560, y(36000) + 18, "paid in", { size: 13, a: "end", c: "ink-3", w: 600 }) +
    S.t(310, 290, "years", { size: 12, a: "middle", c: "ink-3" }),
    "Two lines over 30 years: deposits in a straight line, the compounded balance curving above it");
});
