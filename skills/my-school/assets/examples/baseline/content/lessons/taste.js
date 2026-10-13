L({
  id: "taste",
  part: 7,
  n: 40,
  title: "Training your eye and directing AI tools",
  short: "How designers build taste through references and practice, how to turn taste into precise prompts, and your capstone redesign.",
  minutes: { read: 5, watch: 15, practice: 25 },
  body: `
## Taste is trained judgement

**Design taste** sounds like something you are born with. In practice it is pattern recognition built from seeing many examples, working out why they succeed, and making things yourself. An experienced designer glances at a screen and notices the misaligned icon, the cramped line height and the second accent colour that should not be there, because they have looked closely at thousands of screens and can name what they see.

The radio host Ira Glass has a well-known talk about this. When you start creative work, your taste is already good enough to see that your work falls short of it, and the only way to close that gap is to make a lot of work. Forty lessons have probably sharpened your eye faster than your hands or your tools can follow. That frustration is a sign the eye is working.

## Build a reference library

Advertising copywriters kept a **swipe file**, a collection of ads they admired, to study and borrow techniques from. Designers do the same with screenshots. Organise yours by pattern, such as onboarding, empty states, pricing, settings and tables, instead of by app, so that when you design a pricing page you can see ten good ones side by side. Libraries such as Mobbin collect real app screens by pattern, but your own file, with your own notes, teaches more.

Annotate every screenshot with a line or two on why it works, in the vocabulary of this course: "strong hierarchy, one accent colour, 8-point spacing, numbers right-aligned in tabular figures". Look at the best in each category. Stripe for clear payment and documentation pages, Linear for density and keyboard speed, Apple's own apps for platform conventions, and GOV.UK for plain, accessible forms.

Before each project, pull five to ten references that solve a similar problem. When the look and feel matters, a **mood board** collects type, colour and imagery to agree a direction before any screen is designed.

> **Try it now:** Take one screenshot today of a screen you admire, and write two sentences on why it works using at least three terms from this course.

## Copywork and daily practice

**Copywork** means recreating an existing screen exactly from a screenshot. Benjamin Franklin describes in his autobiography how he taught himself to write by noting the ideas of essays from The Spectator, rewriting them days later from his notes, and comparing his version with the original.

Copying a well-made screen forces you to measure every decision and ask why the gap is 24 pixels here and 16 there, or why the label has this weight. You discover the spacing scale from lesson 9 and the type scale from lesson 14 that sit underneath. Copy to learn, and never ship a copy as your own.

Fifteen to twenty focused minutes a day is enough. Rotate between copying a strong screen, redesigning a weak one you met that day, and writing a short annotated teardown. Then compare your work side by side with the original. The gaps you spot are the lesson.

> **Rule of thumb:** Name it to see it. If you cannot explain why a screen works in the vocabulary of this course, keep looking until you can.

## Directing AI tools with vocabulary

Vague words produce average results. "Modern", "clean" and "make it pop" give a model nothing specific, so it falls back on the most common patterns it has seen: a centred hero, a purple gradient, three feature cards and rounded corners everywhere. Translate taste words into properties.

- Cleaner means fewer elements, one accent colour, more space on an 8-point scale and alignment to a grid.
- More premium means a restrained palette, stronger contrast between heading and body sizes, generous spacing and subtle shadows.
- Friendlier means rounder corners, warmer neutrals, conversational microcopy and illustration in empty states.
- Denser means shorter rows, 14 px body text, tabular figures and tighter padding.

Name references and say what to borrow from them, such as "the row density of Linear's issue list". Give the tool your tokens from lesson 18. Ask for two or three directions that differ in layout as well as colour, then critique each one with the method from lesson 39.

> **Common mistake:** Accepting the first output because it looks finished. Polish hides structural problems, so check the hierarchy first with the squint test from lesson 7, and only then look at details.

## Your capstone: redesign one screen

Put the whole course to work on one real screen of your own product.

1. Choose the screen that matters most to your product's goal, such as sign-up, the main dashboard or checkout, and save a screenshot as "before".
2. Write down its goal, its main user and the one action it exists for.
3. Audit it with the polish checklist in lab-audit, covering hierarchy, spacing, type, contrast, states, targets, copy and accessibility. Note the three biggest problems.
4. Collect five to ten references that solve the same problem well, and annotate why.
5. Sketch three different directions at low fidelity before touching code.
6. Choose one, define its tokens (type scale, spacing, colours) and build it with your AI tools.
7. Critique it with describe, interpret and evaluate, then watch three to five people use it and refine.
8. Write a short before-and-after note on what changed, why, and what you learned.

## Using this with your AI tools

Turn your swipe file into a prompt library. For each reference you admire, write the one or two sentences of **design vocabulary** that describe it, and reuse them. Describe references in words as well as by name, since a model may not know the product or may remember an old version of it. Keep the prompts that produced good results, and note which words made the difference.

Then judge every output against the whole course, starting with hierarchy. The tool is fast; your eye decides what ships.

> **Prompt:** Redesign this settings screen with a calmer, denser feel: one accent colour for primary actions only, a 1.25 type scale from 14 px body text, spacing from an 8-point scale, left-aligned labels, and grouped sections with 32 px between groups. Give me three directions that differ in layout as well as colour.
`,
  takeaways: [
    "Taste is trained pattern recognition: see many examples, name why they work, and make things.",
    "Keep a swipe file organised by pattern, with a line of design vocabulary on why each screen works.",
    "Copy great screens to learn their hidden systems, for 15 to 20 focused minutes a day, and never ship the copy.",
    "Translate taste words like 'clean' or 'premium' into properties: colour count, type scale, spacing scale, density.",
    "Your capstone is one real screen, taken from goal and audit through references, sketches, build, critique and testing.",
  ],
  check: [
    {
      q: "Your AI tool keeps producing generic-looking landing pages. Which change to your prompt will help most?",
      options: [
        "Add 'make it look modern and premium'",
        "Ask it to 'be more creative and bold'",
        "Specify properties: one accent colour, a type scale, a spacing scale, and a named reference with what to borrow from it",
        "Regenerate until one looks good",
      ],
      answer: 2,
      why: "Concrete properties and references give the model something specific to aim at. 'Modern and premium' feels like direction, but it is exactly the kind of vague word that makes models fall back on their most common patterns.",
    },
    {
      q: "What is the main value of copywork, recreating an existing screen exactly?",
      options: [
        "It forces you to measure and question every decision, so you discover the system behind the design",
        "It builds a portfolio quickly",
        "It gives you layouts you can reuse in your own product",
        "It teaches the shortcuts of your design tool",
      ],
      answer: 0,
      why: "The learning comes from asking why each size, gap and weight was chosen. Reusing the layouts is the tempting misreading, and shipping copied work as your own is exactly what copywork is not for.",
    },
    {
      q: "You are starting the capstone and already have a strong idea for a new look for your dashboard. What should come before building it?",
      options: [
        "Choosing a colour palette",
        "Writing the screen's goal and main action, auditing the current screen, and gathering references",
        "Asking the AI to build your idea straight away so you can react to it",
        "Surveying 100 users about what they want",
      ],
      answer: 1,
      why: "The goal and audit tell you which problems the redesign must solve, and references show proven solutions. Building straight away is tempting with fast tools, but you end up judging a look instead of whether it serves the goal.",
    },
  ],
  practice: [
    "lab-audit",
    {
      type: "rewrite",
      title: "From vibe to direction",
      intro: "You are about to ask an AI coding tool to redesign the home screen of a habit-tracking app. Its job is to get people to tick off today's habits quickly.",
      task: "Rewrite this prompt so it directs the tool with design vocabulary from the course.",
      given: "Make my app's home screen look more modern and clean and make it pop.",
      rubric: [
        "States the screen's goal and the one main action",
        "Says what should be most prominent and what moves down the hierarchy",
        "Gives concrete constraints for colour, type, spacing and target size",
        "Names a reference and what specifically to borrow from it, or asks for options to choose between",
        "Contains none of the vague words from the original",
      ],
      model: "Redesign the home screen of my habit app. Its job is to let people tick off today's habits in one tap, so make today's habit list the most prominent element and move streaks and stats below it. Use one accent colour for the check buttons only, 16 px body text on a 1.25 type scale, spacing from an 8-point scale, and 44 pt minimum touch targets. Borrow the quiet list styling of Apple's Reminders app while keeping our brand colours. Give me two layout options.",
    },
    {
      type: "order",
      title: "Capstone sequence",
      intro: "Put the steps of your capstone redesign in a sensible order.",
      items: [
        "Write the screen's goal, its main user and the one action it exists for",
        "Audit the current screen with the polish checklist and note the three biggest problems",
        "Collect five to ten reference screens that solve the same problem, and annotate why they work",
        "Sketch three different directions at low fidelity",
        "Choose a direction and define its tokens: type scale, spacing and colours",
        "Build it with your AI tools using precise design vocabulary",
        "Critique it, then watch three to five people use it and refine",
      ],
      why: "Goals come first because every later judgement is measured against them. The audit shows what must change, references and sketches widen the options cheaply, tokens lock in decisions before code, and critique plus testing check the result against the goal and real people.",
    },
  ],
  journal: "Start your swipe file today. Save five screenshots of screens you admire, each in a folder named by pattern, and write one line under each explaining why it works in the vocabulary of this course.",
  terms: ["design-taste", "swipe-file", "mood-board", "copywork", "design-vocabulary"],
});
