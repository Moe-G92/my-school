# Engine API

Everything a project can use. Engine files live in `<project>/engine/`; the build concatenates them with your files into one script, so every helper below is a global.

## Contents
1. Project layout and bundle order
2. SITE (site.config.js)
3. Content formats
4. Labs: LAB and the lab API
5. Figures: FIG and the S drawing helpers
6. Helpers: UI, Chart, Phone, Fonts, Ex, Color, misc
7. CSS building blocks
8. Routes
9. Storage and capabilities

## 1. Project layout and bundle order

```
<project>/
  site.config.js      SITE: names, parts, labels, coach, review, prompts, reference
  theme.css           tokens (light + both dark blocks) and signature styles
  signature.js        optional SITE.hero(el): the home-page signature element
  labs/*.js           LAB(...) definitions, one or more per file
  figures/*.js        FIG(...) definitions
  lib/*.js            optional helpers shared by labs, figures and the signature (an audio engine, a board renderer)
  content/lessons/*.js   L({...})       content/notes/*.js   F({...})
  content/glossary/*.js  G([...])       content/media/<lesson-id>.json   content/library.json
  spec/BRIEF.md       the writing brief
  engine/             core.js svg.js ui.js exercises.js pages.js boot.js base.css (do not edit per project)
  build.mjs  check.mjs
  dist/index.html     publish this      dist/preview.html   test this locally
```

Bundle order: core → svg → ui → exercises → site.config → lib → signature → lessons, notes, glossary, media, library → figures → labs → pages → boot. So site.config.js may not call engine helpers at load time (only inside functions), and labs/figures may use anything above them.

## 2. SITE

`assets/templates/site.config.js` documents every field. Required: `id`, `name`, `subject`, `parts`. Notes:
- `parts`: `[[n, "Title", "subtitle"], ...]`. Part colours come from `--p1`...`--p8`.
- `learner` and `voice` are injected into every coach prompt; keep them short.
- `labels` overrides UI words (keys listed in the template). Defaults are neutral.
- `callouts`: extra lesson blockquote labels → `[kind, iconName]`, e.g. `{ "Listen for": ["try", "headphones"], "Say it": ["prompt", "mic"] }`. Kinds: try, rule, mistake, prompt (adds a Copy button). Built in: Try it now, Rule of thumb, Common mistake, Prompt, Example, Remember. Icons are the keys of `I`.
- `coach.enabled:false` hides the coach. `review.enabled:false` hides feedback-on-work. `review.image`/`review.text` choose the inputs; `review.sections` is the Markdown structure the feedback must follow.
- `prompts`: daily journal prompts (one per day, rotating).
- `labGroups`: `[["Group", ["skill", ...]], ...]` for the Practice page; default groups by each lab's `skill`.
- `reference`: tab list. Types: `facts` `[[group, lessonId, [[key, value], ...]], ...]`; `cards` `[[name, description, inPractice, lessonId], ...]` (+ optional `useLabel`); `table` `{head, rows}` (+ `minWidth`); `list` `["...", ...]`; `checklist` `[[group, [[item, hint], ...]], ...]`; `html` (a string or a function returning HTML); `glossary`; `library`. A section may hold `blocks: [{type, title, lede, data}, ...]` with `layout: "split"` for two columns. Ledes accept **bold**, *italic* and [links](#l.lesson-id).
- `hero`: set in signature.js. Without it the home page shows the name set large.

## 3. Content formats

- Lesson: see `assets/templates/lesson.example.js` and the brief. In the body, `[[fig:id]]` on its own line places a figure; blockquotes starting with a known bold label become callouts.
- Note: `F({ id, title, minutes, body, related: [lessonIds] })`.
- Glossary: `G([{ id, term, def, lesson, see: [ids] }, ...])`.
- Media: `{ lesson, videos: [{title, channel, url, minutes, year, why}], podcasts: [{show, episode, url, minutes, year, why}], reads: [{title, source, url, minutes, free, why}] }`. Files starting with `_` are ignored.
- Library: `[{ title: "Books", items: [{ title, url, by, year, why }] }, ...]`.

## 4. Labs

```js
LAB("lab-id", {
  title, skill, mins, lesson, desc,        // desc: 1–2 sentences, first sentence shown on the card
  art: () => UI.art(svgBody),              // 240×92 thumbnail, theme colours
  mount(el, api) { ... },                  // build the lab inside el
});
```
`api.data` is a per-learner object that persists (store small state only); `api.save()` persists it (debounced); `api.done()` marks the lab complete (and the lesson's practice step). Call `done()` when the learner has genuinely done the thing: reached a passing state, finished the rounds, tried several settings. Use `Router.onLeave(fn)` to clean up observers, timers and listeners on `document`.

Rules that keep labs good:
- Open in a meaningful working state: never an empty shell waiting for input.
- Every control changes something visible immediately, and feedback says why in one or two sentences (`.fb good|warn|bad`).
- Give the learner a goal and tell them when they reach it.
- Work with touch and keyboard: use buttons and inputs, add tap alternatives to drag, keep targets 44px.
- Size from the container (ResizeObserver), never the window; nothing wider than the screen.
- Colour inside mock interfaces can be literal when the colour is the subject; otherwise use tokens.
- Unique element ids per lab (prefix them).

## 5. Figures

```js
FIG("fig-id", "Caption: one or two sentences that teach, not describe.", () => S.svg(600, 300, body, "aria label"), optionalMount);
```
`optionalMount(figureEl)` runs after insertion, for figures that need measurement (fonts, text widths).
S helpers (colour args are token names without `--`):
- `S.svg(w, h, body, label)`; `S.r(x, y, w, h, fill="surface", stroke="rule-strong", rx=0, sw=1.5, extra)`; `S.c(cx, cy, r, fill="ink", stroke, sw)`; `S.l(x1, y1, x2, y2, stroke="ink", sw=1.5, extra)`; `S.p(d, fill, stroke="ink", sw, extra)`
- `S.t(x, y, text, { size=14, a: "start|middle|end", w: weight, c: colour token, f: "d" display | "m" mono, ls })`
- `S.arrow(x1, y1, x2, y2, stroke, sw)`; `S.hd(x1, x2, y, label)` and `S.vd(x, y1, y2, label, side)` dimension lines with labels; `S.lines(x, y, w, n, gap, fill, h, ragged, seed)` placeholder text lines.
Pass a literal colour with a raw `<rect ... fill="#hex">` when the colour itself is the content.

## 6. Helpers

- `UI.range(id, label, min, max, step, value, unit)` → HTML; `UI.bindRange(root, id, fn(value))`.
- `UI.seg(name, options, value)` (options: values or `[value, label]`) → segmented control; `UI.bindSeg(root, name, fn(value))`; `UI.setSeg(root, name, value)`.
- `UI.art(svgBody)` → thumbnail SVG.
- `Chart.line(values, labels)`, `Chart.bar(values, labels, sorted)`, `Chart.pie(values, labels)`, `Chart.scatter([[x0..1, y0..1], ...])`, `Chart.hist(values0to79)`, `Chart.stacked(values, labels)` → SVG strings.
- `Phone(innerHtml, width)` → a phone frame.
- `Fonts.ensure(["Family Name", ...])` → loads Google Fonts on demand (regular and bold).
- `Ex.choice(spec, {key, onDone, kind})`, `Ex.sort(spec, {key, onDone})`, `Ex.order(...)`, `Ex.rewrite(...)` → embeddable exercise benches; `key` must be unique and stable. Choice items may carry `html` (e.g. a sketch) after the prompt.
- `Color`: `contrast(a, b)`, `luminance`, `hexToRgb`, `rgbToHex`, `rgbToHsl`, `hsl(h, s, l)`, `toOklch(hex)`, `oklch(l, c, h)` (gamut-clipped), `deltaE(a, b)`, `mix(a, b, t)`, `bestText(bg)`, `ratioText(r)`.
- Misc: `h(html)` → element, `$(sel, root)`, `$$(sel, root)`, `esc(str)`, `toast(msg)`, `copyText(text, el)`, `shuffle(arr)`, `seeded(seed)` → rng, `clamp`, `debounce`, `MD.render(md, {trusted})`, `MD.inline(md)`, `I.<icon>` SVG strings, `Router.onLeave(fn)`, `Store`, `Journal`, `Coach` (`Coach.state === "ready"`, `Coach.fn(prompt, opts)`, `Coach.fn.json(...)`).

A lab may call the coach (e.g. to grade a drawing or a spoken answer): check `Coach.state === "ready"`, call on a click only, show "Thinking", handle errors with `Coach.errorCopy(e.code)`, and offer a self-check path when it is off.

## 7. CSS building blocks

Layout: `.page` `.page.narrow` `.section` `.split` (2 col) `.split-3070` (controls + stage) `.stack` `.row` `.gap-1…7` `.panel` `.pad` `.stage` `.stage.grid-bg`.
Controls: `.ctls` `.ctl` `.seg` `.btn` `.btn.primary|.quiet|.small` `.chiptoggle[aria-pressed]` `.opt` `.input` `.field` `.label` `.check-inline` `.checklist`.
Feedback and data: `.fb` `.fb.good|.warn|.bad` `.score` `.meter > i` `.tag` `.tag.good|.bad|.warn|.accent` `.num` (tabular) `.mono` `.small` `.muted` `.faint` `.given` `.notice`.
Annotation: `.redline.h` / `.redline.v` with an `<em>` label (dimension lines in the signature accent).
Text: `.h1` `.h2` `.h3` `.lede` `.eyebrow` `.prose`.

## 8. Routes

`#today` `#path` `#l.<lesson>` `#practice` `#lab.<lab>` `#notes` `#n.<note>` `#coach` `#coach.review` `#journal` `#ref` `#ref.<section>` `#g.<term>` `#more`. Deep links use bare tokens only (artifact hosts drop `#key=value`).

## 9. Storage and capabilities

- Progress (`Store.s`) and journal entries live in the browser (localStorage) and, when the page runs inside a Claude artifact with `db` and `user` declared, in the viewer's private `data/users/<id>/` subtree (doc `state`, docs `j-*` with `kind: "journal"`). Put lab state that should sync in `api.data`; put site-wide extras in `Store.s.extra`.
- The coach and review use the `sample` capability (`{sample: {images: true}}` when review accepts images). Without it they show a notice and everything else works.
- Read-aloud uses the browser's speech synthesis; it needs no capability.
