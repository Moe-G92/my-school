// A complete example lab. Labs are the heart of the school: each one teaches a principle by letting the learner
// push it until it breaks. Pattern used here: a simulator (controls → live output → feedback), then a short quiz.
// API (see references/engine-api.md): LAB(id, def), UI.range/seg/bindRange/bindSeg, Chart.line/bar/scatter/hist,
// S (SVG), Ex.choice/sort/order (embed exercises), Color, toast, copyText, api.data/save/done.
LAB("lab-compounding", {
  title: "Compounding explorer",     // sentence case, names what the learner does
  skill: "Money basics",             // groups labs on the Practice page
  mins: 8,
  lesson: "compounding",             // the lesson that explains the theory
  desc: "Change the monthly amount, the rate and the years. Watch which lever bends the curve most, then answer three questions.",
  art: () => UI.art(`<polyline points="20,80 80,74 140,60 200,30 230,10" style="fill:none;stroke:var(--accent);stroke-width:3"/>`), // thumbnail, 240x92
  mount(el, api) {
    const st = api.data.st || { pm: 100, rate: 5, years: 20 };   // api.data persists per learner
    el.innerHTML = `<div class="split-3070"><div class="ctls">
        ${UI.range("cx-pm", "Monthly", 10, 500, 10, st.pm, "")}
        ${UI.range("cx-r", "Rate", 0, 12, 0.5, st.rate, "%")}
        ${UI.range("cx-y", "Years", 1, 40, 1, st.years, "")}
        <div class="fb" data-fb></div></div>
      <div class="stack gap-3"><div class="score num" data-total></div><div class="stage" data-chart style="background:var(--surface)"></div></div></div>
      <div data-quiz style="margin-top:24px"></div>`;
    let moves = 0;
    const paint = () => {
      const pts = []; let bal = 0, paid = 0;
      for (let y = 1; y <= st.years; y++) { for (let m = 0; m < 12; m++) { bal = bal * (1 + st.rate / 100 / 12) + st.pm; paid += st.pm; } pts.push(Math.round(bal)); }
      $("[data-total]", el).textContent = "£" + Math.round(bal).toLocaleString("en-GB");
      $("[data-chart]", el).innerHTML = Chart.line(pts, pts.map((_, i) => String(i + 1)));
      const growth = bal - paid;
      $("[data-fb]", el).className = "fb " + (growth > paid ? "good" : "");
      $("[data-fb]", el).innerHTML = growth > paid ? `<b>Growth now beats what you paid in.</b> £${Math.round(growth).toLocaleString("en-GB")} of growth on £${paid.toLocaleString("en-GB")} of deposits. That crossover is where compounding takes over.` : `<b>You paid in £${paid.toLocaleString("en-GB")}; growth is £${Math.round(growth).toLocaleString("en-GB")}.</b> Push the years up and watch the curve bend.`;
      api.data.st = st; api.save();
      if (++moves > 4) api.done();          // mark the lab done once the learner has really explored
    };
    UI.bindRange(el, "cx-pm", v => { st.pm = v; paint(); });
    UI.bindRange(el, "cx-r", v => { st.rate = v; paint(); });
    UI.bindRange(el, "cx-y", v => { st.years = v; paint(); });
    paint();
    $("[data-quiz]", el).append(Ex.choice({ title: "What did you see?", intro: "", items: [
      { prompt: "Which change made the biggest difference to the final number?", options: ["Doubling the years", "Adding 1% to the rate", "Adding £10 a month"], answer: 0, why: "Extra years land on the steep end of the curve." },
    ] }, { key: "lab-compounding:q", kind: "Quiz", onDone: () => api.done() }));
  },
});
