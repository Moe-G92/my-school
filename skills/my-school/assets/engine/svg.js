/* My School engine: SVG drawing helpers (S) and figure registry (FIG). Figures are theme-aware: colours come from CSS variables. */
const S = (() => {
  const st = (fill, stroke, sw) => `style="fill:${fill ? "var(--" + fill + ")" : "none"};${stroke ? "stroke:var(--" + stroke + ");stroke-width:" + (sw || 1.5) : ""}"`;
  return {
    st,
    svg: (w, hgt, body, label) => `<svg viewBox="0 0 ${w} ${hgt}" role="img" aria-label="${esc(label || "")}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`,
    r: (x, y, w, hgt, fill = "surface", stroke = "rule-strong", rx = 0, sw = 1.5, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${hgt}" rx="${rx}" ${st(fill, stroke, sw)} ${extra}/>`,
    c: (cx, cy, r, fill = "ink", stroke = null, sw = 1.5) => `<circle cx="${cx}" cy="${cy}" r="${r}" ${st(fill, stroke, sw)}/>`,
    l: (x1, y1, x2, y2, stroke = "ink", sw = 1.5, extra = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--${stroke});stroke-width:${sw}" stroke-linecap="round" ${extra}/>`,
    p: (d, fill = null, stroke = "ink", sw = 1.5, extra = "") => `<path d="${d}" ${st(fill, stroke, sw)} stroke-linecap="round" stroke-linejoin="round" ${extra}/>`,
    t: (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size || 14}" text-anchor="${o.a || "start"}" font-weight="${o.w || 400}" style="fill:var(--${o.c || "ink"});${o.f === "d" ? "font-family:var(--f-display);font-stretch:110%;" : o.f === "m" ? "font-family:var(--f-mono);" : ""}${o.ls ? "letter-spacing:" + o.ls + ";" : ""}">${esc(s)}</text>`,
    raw: (fill) => `var(--${fill})`,
    // horizontal dimension (redline) with label
    hd(x1, x2, y, label) {
      const mid = (x1 + x2) / 2, w = label.length * 7.4 + 10;
      return this.l(x1, y, x2, y, "spec", 1) + this.l(x1, y - 5, x1, y + 5, "spec", 1) + this.l(x2, y - 5, x2, y + 5, "spec", 1) +
        `<rect x="${mid - w / 2}" y="${y - 9}" width="${w}" height="18" rx="3" style="fill:var(--spec)"/>` + this.t(mid, y + 4.5, label, { size: 12, a: "middle", w: 600, c: "surface", f: "m" });
    },
    vd(x, y1, y2, label, side = 1) {
      const mid = (y1 + y2) / 2, w = label.length * 7.4 + 10;
      const lx = side > 0 ? x + 6 : x - 6 - w;
      return this.l(x, y1, x, y2, "spec", 1) + this.l(x - 5, y1, x + 5, y1, "spec", 1) + this.l(x - 5, y2, x + 5, y2, "spec", 1) +
        `<rect x="${lx}" y="${mid - 9}" width="${w}" height="18" rx="3" style="fill:var(--spec)"/>` + this.t(lx + w / 2, mid + 4.5, label, { size: 12, a: "middle", w: 600, c: "surface", f: "m" });
    },
    arrow(x1, y1, x2, y2, stroke = "ink-2", sw = 1.5) {
      const a = Math.atan2(y2 - y1, x2 - x1), L = 8;
      const p1 = [x2 - L * Math.cos(a - 0.45), y2 - L * Math.sin(a - 0.45)], p2 = [x2 - L * Math.cos(a + 0.45), y2 - L * Math.sin(a + 0.45)];
      return this.l(x1, y1, x2, y2, stroke, sw) + `<path d="M${p1[0]},${p1[1]} L${x2},${y2} L${p2[0]},${p2[1]}" style="fill:none;stroke:var(--${stroke});stroke-width:${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
    },
    lines(x, y, w, n, gap = 12, fill = "rule-strong", hgt = 6, ragged = true, seed = 3) {
      const rnd = seeded(seed); let out = "";
      for (let i = 0; i < n; i++) { const ww = ragged && i === n - 1 ? w * 0.55 : ragged ? w * (0.86 + rnd() * 0.14) : w; out += `<rect x="${x}" y="${y + i * gap}" width="${ww}" height="${hgt}" rx="${hgt / 2}" style="fill:var(--${fill})"/>`; }
      return out;
    },
  };
})();

const FIG = (id, caption, svg, mount) => { FIGS[id] = { caption, svg, mount }; };
