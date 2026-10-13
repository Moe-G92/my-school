---
name: my-school
description: Build a personal, interactive learning website (a "school for one") that teaches the fundamentals and philosophy of any subject, with a path of lessons, read-aloud, curated and verified YouTube videos, podcasts and readings, hands-on labs and exercises, quick checks, a journal, short essays, a glossary and reference, and an AI coach that answers questions and reviews the learner's own work. Progress saves to their account. Use this skill whenever someone wants to learn a subject properly or from scratch, asks for a course, curriculum, study plan, learning hub, academy or "go-to place" for a topic, wants lessons with exercises, videos and podcasts, or says "teach me X", "I want the fundamentals of X", "make me a site to learn X" or "turn this into a course", even if they never say "website". Works for any subject, from design, music theory and chess to finance, law, cooking, languages, history and programming.
license: MIT
compatibility: Works in any agent that supports Agent Skills. Building needs Node.js 18 or later; the optional checker uses Playwright. In Claude with artifacts the result is published with saved progress and an AI coach; elsewhere it is a standalone HTML page.
---

# My School

My School turns "I want to learn X" into a finished, published learning site: a school for one learner, built around how that person learns. It was distilled from a real build (Baseline, a 40-lesson UI/UX school) that its learner described as "exactly what I expected". Reproduce that standard: deep, accurate, practical, beautiful, and never generic.

## What you are making

One self-contained web page (published as an artifact when the host allows it) with:
- **Today**: what to do next, a session plan, a daily "notice one thing" prompt, progress by part.
- **Path**: parts and lessons. Each lesson has five steps: *Read* (with diagrams and callouts, plus read-aloud), *Watch and listen* (verified videos, podcast episodes, further reading), *Practice* (labs and exercises), *Quick check* (three questions with explanations) and *Journal* (a reflection prompt).
- **Practice**: interactive labs, each teaching one principle by letting the learner act on it.
- **Short essays** on the philosophy of the subject, readable in two minutes.
- **Coach**: ask anything, plus feedback on the learner's own work (images and/or text) and grading of writing exercises. It uses the learner's Claude account through the host's `sample` capability, and hides itself where that is unavailable.
- **Journal**, **Reference** (custom cheat sheets, glossary, library) and **search**.

The reusable engine (shell, exercise types, storage, coach, read-aloud, search, build and checks) is in `assets/engine/` and `scripts/`. Your job is the part that makes each school worth having: the curriculum, the writing, the labs, the figures and the identity.

## Before you start

Tell the learner what to expect: a full school (about 40 lessons) takes roughly an hour of work with parallel sub-agents, plus their review; a short course (8–12 lessons) is much quicker. Then work through the phases in order, keeping them informed in one line as you go.

## Phase 1: understand the learner

Read everything already known (the conversation, memory, their instructions). Then ask only what changes the build, in one round of up to four questions (use the host's question tool if there is one). The questions that mattered in practice:
1. **Media**: curated real videos and podcasts plus read-aloud (recommended), curated only, or also generated audio (costs extra).
2. **Scope**: which sub-areas or applications to cover beyond the core (e.g. for design: dashboards, AI interfaces, TV). Use multi-select.
3. **Pace**: minutes per day and days per week. This sets the size of the path.
4. **Coach**: coach plus feedback on their own work (recommended), text only, or no AI inside.

Infer the rest and state your assumptions: their current level, goal, language and spelling, and learning style. Respect their standing preferences (e.g. design rules in their instructions) as hard requirements.

Path size from pace (adjust to the subject's real breadth):

| Pace | Lessons | Lesson length |
|---|---|---|
| A quick taster | 8–12 | 20–30 min |
| ~15 min a day | 20–30 | 15–20 min |
| 30–60 min a day | ~40 | 35–45 min |
| Long weekend sessions | 20–30 | 60–90 min, with mini projects |

If the learner names both a lesson count and a daily time, the count wins and the time sets lesson length. When a lesson needs more than one sitting, say so on the path (e.g. "read and listen one day, practise the next") rather than cutting the practice.

## Phase 2: design the course

1. **Scaffold the project** in a folder the learner can keep: `node <skill>/scripts/init_project.mjs <project> --id <kebab-id> --name "<Name>"`. To study a complete working school first, scaffold one with `--example baseline`.
2. **Plan the path.** Group lessons into 4–8 parts that build from philosophy and fundamentals to application and practice. Start with how experts *think* about the subject (its history and philosophy), then perception and fundamentals, then techniques, then applications, then a closing part on practice, critique and taste. Give every lesson a kebab id, a number and a sentence-case title.
3. **Plan labs and figures per lesson.** Read `references/lab-patterns.md`. Aim for about one lab per skill-heavy lesson and one to three diagrams per lesson where a picture teaches. Write a one-line description of each; writers reference them by id.
4. **Plan the rest**: 10–14 essay topics (one thesis each), 20–30 daily noticing prompts, 6–8 starter coach questions, reference sections (the numbers, laws, standards or comparisons a practitioner keeps looking up), and what "feedback on your work" means for this subject (screenshot, photo of handwriting, pasted essay, code...).
5. **Write the brief** to `spec/BRIEF.md` from `assets/templates/BRIEF.md`. Fill in every `{{...}}`: learner, path, labs, figures, the closing "apply it" section title (Baseline used "Using this with your AI tools" because its learner builds with AI), and **accuracy anchors**: the real standards, numbers, dates and misconceptions for this subject. Anchors are what keep many writers consistent and correct, so research them now if you are unsure.

## Phase 3: produce in parallel

If you can run sub-agents, launch these in one turn, in the background, using the prompts in `references/agent-prompts.md`:
- lesson writers (one per ~10 lessons),
- one reference writer (glossary and essays),
- media curators (one per ~20 lessons; they verify every link).

While they work, build the parts only you can make coherent:
- `site.config.js` (start from the template; every option is in `references/engine-api.md`),
- `theme.css` and `signature.js`: the identity (`references/identity.md`),
- `labs/*.js` and `figures/*.js` (`references/engine-api.md`, the examples in `assets/templates/`, and the full Baseline set in `assets/examples/baseline/`); helpers shared by labs, figures and the signature (an audio engine, a fretboard or board renderer) go in `lib/*.js`, which loads before them,
- the reference sections' data (write the facts yourself and check them).

Spot-check the first lesson that arrives for quality and voice; if it misses the bar, correct the writer early with a follow-up message rather than fixing 40 files later. If you cannot run sub-agents, do the same work yourself, saving each file as you finish it.

## Phase 4: integrate and verify

Read `references/verify-and-publish.md`. In short:
1. When every writer has finished, `node build.mjs` until it prints OK, then clear the warnings. Missing glossary terms are normal at this point, because the glossary was written while lessons were still arriving: add those entries yourself (or ask the reference writer to). Also clear em dashes and unused labs.
2. `node check.mjs --caps --shots`: route sweep, phone-width overflow, contrast in both themes, a simulated Claude host for saving, coach and review, and contact sheets.
3. Look at the contact sheets yourself and fix what looks wrong, not just what is broken. Then play each lab once yourself: the checker proves labs don't crash when poked, not that their answers and feedback are right.

## Phase 5: publish and report

Publish `dist/index.html` as an artifact with `db`, `user` and `sample` capabilities when the host offers that (details and fallback in `references/verify-and-publish.md`), then prove storage works with one probe write, read and delete. Report briefly: what is in the school, how to use it daily, what you verified, what only the learner can test, and honest gaps. Keep the project folder so lessons and labs can be added later.

## The quality bar

The learner asked for something that is not "slop". These are the things that made the difference:
- **Teach the why.** Every rule comes with the reason it exists, where it came from and when to break it. Lessons connect to earlier lessons.
- **Accuracy over flourish.** Real numbers, real standards, real examples you are sure of. No invented statistics or quotes. Media links are verified live, never written from memory.
- **Learning by doing.** Labs where the learner pushes a principle until it breaks; exercises built from concrete scenarios, not definitions.
- **Many ways in.** Read, listen (read-aloud), watch, discuss (coach), practise, reflect (journal). Different days suit different modes.
- **A plain, human voice.** The banned-phrase list in the brief exists because those patterns make writing feel generated. Enforce it.
- **Design that practises what it preaches.** Subject-grounded identity, both themes, WCAG AA, works on a phone, no sideways scroll, nothing moving behind text, a short home page.
- **Built for the long term.** It is the learner's go-to reference: search, glossary, cheat sheets and saved progress matter as much as the lessons.

## Files

- `assets/engine/`: the site engine (copied into each project by init_project).
- `assets/templates/`: `site.config.js`, `theme.css`, `signature.js`, `BRIEF.md`, and example lesson, lab and figure.
- `assets/examples/baseline/`: the complete design school (config, theme, signature, 35 labs, 31 figures, 40 lessons, 14 essays, glossary, media, library). Read it for patterns, not to copy its look.
- `scripts/init_project.mjs`, `scripts/build.mjs`, `scripts/check.mjs`.
- `references/agent-prompts.md`, `references/engine-api.md`, `references/lab-patterns.md`, `references/identity.md`, `references/verify-and-publish.md`.
