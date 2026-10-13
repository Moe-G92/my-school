# Prompts for parallel production

Use these when you can run sub-agents in parallel (Claude Code's Agent tool, or similar). Launch them all in one turn, in the background, right after the brief is written, then build the site's identity, labs and figures yourself while they work. If you cannot run sub-agents, do the same work yourself in this order: a few lessons, then glossary and notes, then media, saving each file as you go.

Sizing: one lesson writer per ~10 lessons; one reference writer; one media curator per ~20 lessons. For a 40-lesson school that is 4 + 1 + 2 = 7 agents.

Every prompt below must include the absolute project path (quote it; paths often contain spaces). Lessons learned from real runs:
- Tell agents to save each file the moment it is finished. Agents can hit rate limits and stop; incremental saving means nothing is lost, and a stopped agent can be resumed with a follow-up message instead of restarted.
- Parallel agents share scratch space. Tell each agent to keep its own helper scripts in its own subfolder (e.g. `scratch/<agent-name>/`) so they do not overwrite each other's `check.js`.
- The built-in browser pane is shared with you. Tell research agents to verify links with fetch tools (curl, WebFetch), not the browser pane, so they don't navigate the tab you are testing in.
- Ask for a short final reply (files written, counts, anything they couldn't do). Long reports waste your context.

---

## Lesson writer (one per batch of ~10 lessons)

```
You are writing lessons for "<SITE NAME>", an interactive learning site that teaches <SUBJECT> to <LEARNER ONE-LINER>.

Project folder (absolute, may contain spaces, quote it in shell): <PROJECT>

1. Read the full brief first: <PROJECT>/spec/BRIEF.md. Follow it exactly: file format, practice item schemas, markdown rules, figure and lab ids, voice and banned phrases, accuracy anchors. A complete example lesson is at <PROJECT>/spec/lesson.example.js.
2. Write lessons <A> to <B> of the path: <id list>.
3. Save EACH lesson to <PROJECT>/content/lessons/<id>.js as soon as it is finished, before starting the next. Run the brief's parse check after each file.
4. Other writers are working on the other lessons in parallel. Do not create or edit any other files. Keep any helper scripts in your own scratch subfolder named after your batch.
5. Before you finish, search your own files for the "—" character and every banned phrase, and fix any hits. Confirm every [[fig:...]] id and lab id you used is in the brief's lists.

<TOPIC NOTES: 2–6 sentences per tricky lesson saying what it must cover, the real standards or numbers to get right, and the misconceptions to correct.>

Quality: these lessons are the learner's long-term reference. Be accurate, specific and practical; explain the why; use real examples you are sure of; make the quick checks and exercises concrete scenarios that make the learner think.

Final reply (short): files written with word counts, and the full list of glossary term ids you used.
```

## Reference writer (glossary + short essays)

```
You are writing reference content for "<SITE NAME>", a learning site that teaches <SUBJECT> to <LEARNER ONE-LINER>.

Project folder: <PROJECT>
First read <PROJECT>/spec/BRIEF.md: it lists every lesson (ids, titles) and the voice, banned phrases and accuracy anchors. They apply to you. Other agents are writing lessons into content/lessons/ in parallel; do not edit those.

Task A: Glossary (do this first)
Write the vocabulary of the whole path: usually 8–10 entries per lesson (lessons introduce more terms than you expect; an 8-lesson course used 62 distinct terms). Save as several files so work is kept as you go: <PROJECT>/content/glossary/part-1.js, part-2.js ... (about 40 entries each). Each file contains exactly one call:
G([
  { id: "lowercase-kebab", term: "Display term", def: "1–2 sentences, max ~45 words, plain and accurate, with a hint of why it matters.", lesson: "<lesson id where it is taught>", see: ["other-id"] },
]);
- Use the obvious id for each term. `see` lists 0–3 ids you also define.
- No backticks in strings. Check each file parses: node -e "global.G=a=>console.log(a.length);require('<file>')"
Do Task B next, then come back for this last step. Load the lesson files (set global.L to collect them, require each) and add content/glossary/extra.js defining any `terms` ids the lessons use that you have not defined; rename your ids to match the lesson writers' where you meant the same term. Lessons are being written in parallel: if some of the <N> lesson files are still missing, wait a few minutes and check again (up to about 15 minutes), then list any lessons you could not reconcile in your final reply so the lead can finish them.

Task B: Short essays (the "<NOTES LABEL>")
Write <10–14> essays of 280–420 words that teach the philosophy and big ideas of the subject: one idea, argued well, readable in two minutes. Each is its own file <PROJECT>/content/notes/<id>.js containing:
F({ id: "kebab-id", title: "Sentence case title", minutes: 2, body: `markdown paragraphs, optional ## subheads, optional one > blockquote`, related: ["lesson-id"] });
Topics: <LIST 10–14 TOPICS, each a one-line thesis>.
Each essay: a clear argument, one concrete true story or example, one practical habit to take away. Accurate history only; paraphrase rather than quote. Same banned phrases; never use the — character. Save each file as soon as it is done.

Final reply (short): files written, entry counts, and any lesson term ids you could not define.
```

## Media curator (one per ~20 lessons)

```
You are curating real, verified learning media for "<SITE NAME>", a learning site that teaches <SUBJECT> to <LEARNER ONE-LINER> (<pace>).

Project folder: <PROJECT>
Read <PROJECT>/spec/BRIEF.md for the lesson list (ids and titles) and the voice rules. Your share: lessons <A>–<B>.

For each lesson find:
- 2 YouTube videos (3–30 minutes preferred; one may be a longer talk) from reputable, evergreen sources. Suggested sources for this subject: <CHANNELS, INSTITUTIONS, CONFERENCES>. Quality over popularity; no clickbait.
- 1–2 podcast episodes directly about the topic (suggested shows: <SHOWS>). If none is genuinely relevant, use the closest real fit or leave it out. Never pad.
- 2–3 free reads (articles, official guides, standards pages, university notes). Suggested: <SOURCES>. Mark paid content "free": false (at most once per lesson).

Verify everything; nothing goes in unless you confirmed it exists now with the right title:
- YouTube: curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json" and confirm title and author_name. If oEmbed fails, fetch the watch page with a browser user-agent and confirm the title; get "lengthSeconds" from the HTML for minutes if you can.
- Podcasts and reads: fetch the page (WebFetch, or curl -sL with a browser user-agent) and confirm the title is on it. Use canonical episode or article URLs.
- Use web search to discover candidates; never write a URL from memory without verifying it. Do not use the shared browser pane; use fetch tools.
- Some sites block automated requests (403, 429, a bot challenge). Confirm those another way: the URL appears in the site's own sitemap.xml, a Wayback Machine capture shows the title (https://web.archive.org/web/2026id_/<url>), or a search result shows the exact title at that URL. Never try to get past a CAPTCHA. If you cannot confirm a link at all, drop it.

Save one JSON file per lesson as soon as it is done: <PROJECT>/content/media/<lessonId>.json
{ "lesson": "<id>",
  "videos":   [ { "title": "exact", "channel": "...", "url": "https://www.youtube.com/watch?v=...", "minutes": 6, "year": 2021, "why": "One specific sentence on what to watch for." } ],
  "podcasts": [ { "show": "...", "episode": "exact", "url": "...", "minutes": 35, "year": 2019, "why": "..." } ],
  "reads":    [ { "title": "exact", "source": "...", "url": "...", "minutes": 8, "free": true, "why": "..." } ] }
"why" lines: plain, specific, no hype, in the brief's spelling, no — character, no banned phrases. Omit year or minutes if unknown.

<FOR ONE CURATOR ONLY:> After the lessons, write <PROJECT>/content/library.json, an array of sections:
[ { "title": "Books", "items": [ { "title": "...", "url": "publisher or author page", "by": "author", "year": 2013, "why": "..." } ] },
  { "title": "YouTube channels", "items": [ { "title": "...", "url": "...", "why": "..." } ] },
  { "title": "Podcasts", "items": [...] }, { "title": "Tools", "items": [...] } ]
10–14 essential books, 8–12 channels, 8–12 podcasts, 10–16 free tools, verified the same way.

Final reply (short): lesson files written, counts per lesson, and anything you could not find.
```
