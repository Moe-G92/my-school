# {{NAME}}: writing brief

{{NAME}} is an interactive learning site that teaches {{SUBJECT}} to one learner. Every writer and researcher works from this brief. Read all of it before writing anything.

## The learner

- Who: {{LEARNER: background, current level, what they already know, what they want}}
- Time: {{PACE: minutes per day, days per week}} → {{N}} lessons over about {{WEEKS}} weeks.
- How they learn: {{e.g. visual learner; wants philosophy and the why, not just rules; wants to apply it to X}}
- Language and spelling: {{e.g. British English (colour, organise); keep code words as they are}}
- This site is their long-term reference, so accuracy matters more than flourish.

## The path (fixed: use these ids, numbers and titles exactly)

{{For each part:}}
Part {{n}}: {{Part title}}
{{lesson number}}. `{{lesson-id}}`: {{Lesson title}}. Figures: `{{fig-id}}`, … Labs: `{{lab-id}}`, …

### What the labs do (built by the site; writers only reference them by id)

- `{{lab-id}}`: {{one line saying what the learner does in it}}

### What the figures show (drawn by the site; writers place them by id)

- `{{fig-id}}`: {{one line}}

## Lesson file format

One file per lesson at `content/lessons/<id>.js`. Write each file as soon as that lesson is finished; do not batch them to the end. The file contains exactly one call:

```js
L({
  id: "lesson-id",
  part: 2,
  n: 6,
  title: "Lesson title in sentence case",
  short: "One sentence (max ~20 words) saying what this lesson gives the learner.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
...markdown, see rules below...
`,
  takeaways: ["4 or 5 short, concrete sentences someone could pin above their desk."],
  check: [
    { q: "Question?", options: ["A", "B", "C", "D"], answer: 2, why: "Why C is right, and the trap in the most tempting wrong answer." },
  ],
  practice: [
    "lab-id",
    { type: "choice", title: "...", intro: "...", items: [ { prompt: "...", options: ["...", "...", "..."], answer: 1, why: "..." } ] },
  ],
  journal: "One reflective prompt that sends the learner out to observe something real today and write a few sentences.",
  terms: ["glossary-id", "another-id"],
});
```

Rules for the file:
- Plain JavaScript. The body is a template literal, so it must contain no backtick characters, no `${` and no backslashes.
- `minutes.read` should match the body (about 200 words a minute). The three numbers together land between {{MIN}} and {{MAX}} minutes.
- `check`: exactly 3 multiple-choice questions, 3–4 options each, `answer` is the 0-based index. Test understanding and application, not trivia. Vary the position of the right answer. Each `why` explains the right answer and names the trap in the most tempting wrong one.
- `terms`: 3–8 glossary ids (lowercase-kebab) for the key terms the lesson introduces. Use the obvious id for each term; a separate writer builds the glossary from these.

### Practice items

`practice` mixes lab ids (only those listed for the lesson, or another clearly relevant one) and inline exercises. Every lesson needs at least two practice items; lessons without a lab need at least two inline exercises. Inline types:

- `choice`: scenario questions with one best answer. `{ type: "choice", title, intro, items: [ { prompt, options: [3–4 strings], answer, why } ] }`, 4–6 items. Make prompts concrete situations, not definitions.
- `sort`: drag each item into the right bucket. `{ type: "sort", title, intro, buckets: ["A", "B"], items: [ { text, bucket, why } ] }`, 2–4 buckets, 6–12 items.
- `order`: put steps in order. `{ type: "order", title, intro, items: ["first", "second", ...], why }`. List `items` in the CORRECT order (the site shuffles them); 4–8 items.
- `rewrite`: a writing task the AI coach grades against a rubric; without the coach the learner self-checks against the rubric and a model answer. `{ type: "rewrite", title, intro, task, given, rubric: ["criterion", ...], model }`. `given` is the starting text ("" for a blank page).

## Body markdown rules

- {{WORDS e.g. 750–1,050}} words. 4–6 sections with `## Sentence case headings`. No `#` h1.
- Paragraphs, `-` lists, numbered lists only for real sequences, `**bold**` for a key term the first time it is defined, `*italic*` sparingly.
- Put figures on their own line, exactly like `[[fig:fig-id]]`, using only ids listed above. Place each right after the paragraph it illustrates and refer to what it shows, not to "the figure above".
- Callouts are blockquotes starting with a bold label. Use only these labels:
  - `> **Try it now:** ...` a 1–2 minute thing to do right away.
  - `> **Rule of thumb:** ...` a memorable, accurate heuristic.
  - `> **Common mistake:** ...` what beginners typically get wrong here.
  {{SUBJECT CALLOUTS, optional: labels this subject needs, declared in SITE.callouts so the site styles them. Examples: a music school's `> **Listen for:** ...` (a moment in a named recording), a language school's `> **Say it:** ...` (a phrase to speak aloud), a coding school's `> **Prompt:** ...` (a copyable snippet). Delete this line if none.}}
  Use 2–4 callouts per lesson.
- End every lesson with `## {{APPLY_SECTION_TITLE}}`: 100–180 words on applying the lesson to {{THE LEARNER'S REAL GOAL}}. Name the section after that goal (Baseline's learner built software with AI tools, so its lessons ended "Using this with your AI tools"; a guitarist's might end "On your guitar"; a new investor's "With your own money").
- No links in the body (media is curated separately). Tables only when they truly help (they are skipped in read-aloud). No emoji, no code blocks, no inline code.
- Numbers are never zero-padded (1, 2, 3).

## Voice and writing style

- Write like an expert explaining to a smart friend: plain, direct, specific, warm without being chummy. Second person.
- Explain the why behind every rule, then give the practical rule. One vivid concrete example beats three abstract ones.
- Use real examples you are sure of; when unsure, describe a generic situation instead.
- Connect back to earlier lessons where natural ("the X from lesson 6 explains why...").
- Teach the philosophy and history of ideas, not only the rules: where a principle came from, why it exists, when to break it.
- Banned: em-dash asides (do not use the — character at all; use commas, full stops or brackets), "not X, but Y" and "it's not about X, it's about Y" constructions, colon-then-reveal sentences, rhetorical-question openers, "Let's dive in", "delve", "crucial", "robust", "seamless", "elevate", "leverage", "unlock", "game-changer", "in today's world", "landscape", "journey", "tapestry", "it's worth noting", "at the end of the day", "the magic happens", triplets used only for rhythm, exclamation marks, emoji.
- Sentence case everywhere. Short paragraphs (2–4 sentences).

## Accuracy anchors

Use these exact facts where relevant. Do not invent statistics, studies, quotes or dates; if unsure of a number, leave it out or describe it qualitatively. Paraphrase rather than quote; any quote stays under 15 words and is attributed.

{{SUBJECT-SPECIFIC ANCHORS: standards, key numbers, dates, names, common misconceptions to correct}}

## Quality bar before saving a file

- Would an expert practitioner nod along and find nothing wrong?
- Could the learner apply something from it within 10 minutes?
- Is every sentence carrying information?
- Does the quick check test understanding, with varied answer positions?
- Did you avoid every banned phrase and the — character? Search your own text before saving.

After writing each file, check it parses:
`node -e "global.L=o=>{if(!o.id)throw 1;console.log(o.id, o.body.split(/\s+/).length+' words')};require('<absolute path to file>')"`
