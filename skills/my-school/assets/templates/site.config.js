/* site.config.js: everything subject-specific about this school lives here.
   Plain data plus functions. Engine helpers (h, $, esc, I, S...) may only be used INSIDE functions,
   because the build reads this file on its own. See references/engine-api.md for every option. */
const SITE = {
  id: "__ID__",                       // lowercase-kebab; namespaces the learner's saved progress
  name: "__NAME__",                   // the school's own name (subject-grounded, 1–2 words), shown in the rail and hero
  tagline: "A school for one",        // under the wordmark
  title: "__NAME__",                  // browser tab and gallery name: a 2–4 word name, never "Name: explainer"
  description: "One sentence describing the school for the gallery card.",
  lang: "en-GB",                      // dates, read-aloud voice, sort order. Use the learner's language and spelling.
  subject: "the subject in one line, with its scope",
  learner: {
    name: "the learner's first name, or 'the learner'",
    profile: "who ... (one clause: background, current level, how they learn)",
    goal: "what they want to be able to do",
  },
  voice: "Plain, direct, specific.",  // add spelling conventions, e.g. "British spelling."
  fonts: [],                          // Google Fonts stylesheet URLs (the only font host artifacts allow)
  heroLede: "One or two sentences that sell the school. Short and promotional; detail lives on other pages.",
  parts: [
    // [number, "Part title", "short subtitle"]
    [1, "Part one", "What it covers"],
  ],
  labels: {
    // Override any UI words. Keys used by the engine:
    // notes, noteSingular, notesTitle, notesLede, pathTitle, pathLede, practiceTitle, practiceLede, labsDone, lab,
    // journalTitle, journalLede, promptTitle, askLede, askPlaceholder, coachTitle, reviewLink, searchHint
    notes: "Field notes",
    pathLede: "Work through in order, or jump to what you need.",
  },
  callouts: {
    // Extra blockquote labels lessons may use: "Label": [kind, icon]. kinds: try | rule | mistake | prompt (copyable)
  },
  coach: {
    enabled: true,                    // needs the Claude host's `sample` capability; hidden elsewhere
    role: "an experienced practitioner who teaches well",
    extra: "",                        // one extra instruction for how the coach answers this learner
    suggestions: [
      // 6–8 starter questions a learner of this subject would really ask
    ],
  },
  review: {
    enabled: true,                    // feedback on the learner's own work
    tab: "Get feedback", title: "Get feedback on your work", action: "Get feedback",
    image: true,                      // accept an image (screenshot, photo of handwriting, drawing, board position...)
    text: false,                      // accept pasted text (essay, code, translation, plan...)
    imagePrompt: "Drop an image here, or choose a file", imageHint: "PNG or JPEG.",
    textLabel: "Paste your work", textPlaceholder: "",
    kinds: [],                        // what the work can be
    focus: ["Overall"],               // focus chips
    goalLabel: "What is it for, and what should it achieve?", goalPlaceholder: "",
    role: "",                         // defaults to coach.role
    // sections: "## First read\n...\n## What works\n...", // Markdown section spec for the feedback (optional)
  },
  prompts: [
    // 20–30 daily "notice one thing" prompts that send the learner into the real world to observe the subject
  ],
  // labGroups: [["Group title", ["skill A", "skill B"]]], // optional: how the Practice page groups labs (default: by lab.skill)
  reference: [
    // Custom reference sections, shown before Glossary and Library (or position those by including them here).
    // { id: "facts", title: "Numbers", heading: "The numbers to know", lede: "...", type: "facts", data: [["Group", "lesson-id", [["key", "value"]]]] },
    // { id: "ideas", title: "Big ideas", type: "cards", data: [["Name", "What it says", "In practice", "lesson-id"]] },
    // { id: "compare", title: "Compare", type: "table", data: { head: ["A", "B"], rows: [["x", "y"]] } },
    // { id: "lists", title: "Checklists", layout: "split", blocks: [{ type: "list", title: "...", data: ["..."] }, { type: "checklist", title: "...", data: [["Group", [["item", "hint"]]]] }] },
    { id: "glossary", title: "Glossary", type: "glossary" },
    { id: "library", title: "Library", type: "library" },
  ],
};
