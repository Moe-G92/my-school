# Lab patterns

A lab teaches one principle by letting the learner act on it and see the consequence immediately. Plan roughly one lab per lesson for skill-heavy subjects (fewer for knowledge-heavy ones), and give the rest of the lessons inline exercises (choice, sort, order, rewrite). Labs are where a school built with this skill stops being a reading list, so they deserve real design time.

## Choosing labs for a subject

For each lesson ask: what would an expert *do* with this idea, and what does a beginner get wrong? Build the lab around that action and that mistake. Prefer labs that:
- reproduce a real phenomenon with the learner's own input (Baseline's Fitts's law game plots the learner's own click times);
- make an invisible thing visible (type guidelines, colour-blindness simulation, a grid overlay);
- let the learner break something and then fix it (contrast fixer, form fixer, spacing fixer);
- train perception through many quick rounds with a score (colour matching, odd icon out).

## Archetypes (with Baseline examples in assets/examples/baseline/labs/)

| Archetype | What the learner does | Baseline example | Works for |
|---|---|---|---|
| Simulator | Moves controls, watches a live result and explanation | lab-grid, lab-easing, lab-box-model | physics, finance, statistics, cooking ratios, music (tempo, intervals) |
| Fixer | Starts from a broken artefact, applies fixes until rules pass | lab-spacing, lab-contrast, lab-form-fix, lab-table | writing, code style, layout, recipes, chess openings |
| Before/after toggles | Switches individual improvements on and off | lab-form-fix, lab-cvd | any craft with a checklist of improvements |
| Perception trainer | Many short rounds, scored, with a running average | lab-color-match, lab-icons | ear training, wine or tea tasting vocabulary, identifying birds, reading charts |
| Experiment | Runs a timed task and sees their own data plotted against the law | lab-fitts, lab-hick | psychology, memory, reaction, attention |
| Hunt | Finds hotspots in a flawed scene and names the principle each breaks | lab-heuristic-hunt | logical fallacies in an argument, errors in a contract, bugs in code, faults in a photo |
| Placement | Drags items onto zones and gets scored | lab-thumb, lab-landing | anatomy, maps, timelines, kitchen layout, orchestra seating |
| Classifier | Sees an example, says which category it belongs to | lab-platform, lab-chart-pick | art movements, rhetoric devices, chord qualities, cloud types |
| Builder with export | Builds something reusable and copies it out | lab-palette, lab-type-scale | budgets, study plans, training plans, recipes |
| Checklist | Runs a saved checklist against their own work | lab-audit | any review practice |
| Coach-graded | Learner makes something; the coach grades it against a rubric | lab-critique (review), rewrite exercises | writing, translation, drawing, code, pitches |

## Useful browser tools (all work inside an artifact)

- **Canvas and SVG** for drawing, plotting and drag interactions (pointer events; always add a tap-to-select alternative).
- **Web Audio** (`new AudioContext()` started from a click) for tones, intervals, rhythm, metronomes, simple synths: music theory, language tones, ear training.
- **Speech synthesis** for pronunciation and listening drills (language learning), started from a click.
- **performance.now()** for reaction-time experiments.
- **The coach** (`Coach.fn` / `Coach.fn.json`) for open-ended grading: ask for JSON with a fixed shape and always offer a self-check path when the coach is off.

Not available: network fetches to other sites and embedded iframes (YouTube, maps); link out instead. Camera and microphone are refused unless the host offers a device capability for them: check the host's capability list before designing a lab around them (a sing-back ear trainer, a pronunciation check), and always give a fallback such as tapping the answer or uploading a recording.

## Quality bar for each lab

1. It opens in a realistic working state, not an empty form.
2. The goal is stated in one sentence at the top of the lab (its `desc`).
3. Feedback names the principle and explains why in one or two sentences.
4. It has a clear finish (`api.done()` on a passing state or after enough rounds).
5. It works at 390px wide, by touch, and in both themes.
6. Its numbers and claims are as accurate as the lessons (put sources in comments).
7. It is worth five to fifteen minutes; if it takes thirty seconds, fold it into a lesson as an inline exercise instead.
