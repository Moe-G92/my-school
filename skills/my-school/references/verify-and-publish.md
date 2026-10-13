# Verify and publish

A school is finished when there is evidence it works, not when the code looks right.

## 1. Build until clean

`node build.mjs` must print `OK`. Fix every PROBLEM. Work through the WARNINGS too:
- `term X not in glossary`: add the entry (the glossary should cover every lesson term).
- `contains an em dash`: rewrite the sentence (the voice rules ban it).
- `no media yet`: wait for the curators, or accept it if a topic genuinely has none.
- `lab X is not used by any lesson`: link it from a lesson's `practice`, or accept it as Practice-only.

## 2. Automated checks

`node check.mjs --caps --shots` (needs Playwright; the script explains how to point to it, and uses installed Google Chrome when the Playwright package has no bundled browser). It runs:
- **sweep**: every route (all lessons, labs, notes, reference tabs, coach, journal) renders with no script errors and no empty benches, and every lab survives a round of slider, select, checkbox and button pokes;
- **overflow**: no route scrolls sideways at 390px;
- **contrast**: text and control token pairs meet WCAG AA in light and dark;
- **caps**: a simulated Claude host (db, user, sample) drives saving, journal, coach chat, writing feedback and work review, and confirms documents were written and coach output is sanitised;
- **shots**: screenshots in light and dark at 1280 and 390, with contact sheets in `dist/_check/`.

Look at both contact sheets yourself. The script catches breakage; your eyes catch ugliness: clipped labels, crowded labs, a weak signature, an accent used too often.

If you are using a shared browser pane while sub-agents are researching, test in headless Chrome (check.mjs) rather than the pane: an agent can navigate the pane's tab mid-test, and a hidden pane cannot take screenshots.

Without Playwright, check by hand: open `dist/preview.html` (it is the page wrapped in the same document the host adds at publish), visit every lesson and lab with the console open, then repeat at 390px wide and in dark mode.

## 3. Publish

### With an Artifact tool (Claude Code desktop, claude.ai)

Follow the host's own artifact instructions first (they may ask you to load design or capability skills before publishing). Then publish `dist/index.html`:
- `capabilities`: `{ "db": {}, "user": {}, "sample": { "images": true } }`. Drop `sample` if both coach and review are off; use `"sample": {}` if review takes no images.
- `icon`: one generic word (e.g. `book`, `music`, `palette`).
- `description`: one sentence for the gallery card.
- To update later, publish the same file path again (same URL). From a new conversation, pass the artifact URL and read it first.

After the first publish, prove storage works with one probe: write a document to collection `data/users/me` (doc id `probe`), list that collection, then delete the probe using the version the write returned. Tell the user in one line what you exercised and what only they can test (the coach on their own account, read-aloud voices on their device).

The first time the learner uses the coach, the host asks their permission. Progress and journal entries live in the learner's private subtree; nobody else, including people the page is shared with, can read them.

### Without an Artifact tool

Give the learner `dist/preview.html`. It opens in any browser and keeps progress in that browser's storage; the coach and review show a notice because they need the Claude host. It can also be hosted on any static host (GitHub Pages, Netlify, Cloudflare). Fonts and two small libraries load from public CDNs, so it needs a network connection.

## 4. Report

Tell the learner, briefly: what the school contains (counts of lessons, labs, notes, glossary terms, media), how to use it day to day, what you verified and how, what you could not verify, and any honest gaps (topics with no good podcast, for example). Offer to add lessons or labs later; the project folder and `build.mjs` make that a small change.
