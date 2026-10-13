L({
  id: "design-systems",
  part: 3,
  n: 18,
  title: "Design systems and tokens",
  short: "Store design decisions as tiered tokens, build components on them, and hand the whole system to your AI tools.",
  minutes: { read: 5, watch: 12, practice: 20 },
  body: `
## What a design system is

A **design system** is a product's design decisions written down once and shared: principles, tokens, components built from those tokens, and guidance on when to use what. Google's Material Design, IBM's Carbon, Shopify's Polaris and the GOV.UK Design System are public examples you can study today.

The value is that each decision gets made once. Without a system, every new screen reopens the same questions, such as which grey, how much padding and what an error looks like, and each time gets a slightly different answer. Over a year that becomes five button styles and a product that feels assembled from parts.

For a solo builder, a design system can be one token file and a dozen components. That is already worth having.

To start one for a product that already exists, run an **interface inventory**, a method popularised by Brad Frost. Screenshot every button, input, colour and heading style you can find and lay them side by side. The near-duplicates show you what to standardise first.

> **Try it now:** Open your own product and spend five minutes screenshotting every button style you can find. Each difference you cannot explain is a decision your system should make once.

## Design tokens

A **design token** is a named design decision stored as data: a colour, a spacing step, a font size, a radius, a shadow, an animation duration. The term came from Salesforce's design system team in the mid-2010s, who needed one source of truth for web, iOS and Android. Tokens live in one place, often a JSON file, and build tools turn them into CSS custom properties, Swift constants or a Tailwind theme. A W3C community group has since published a shared format so design tools and code can exchange tokens.

## Three tiers of tokens

Mature systems arrange tokens in tiers, each pointing at the one below.

- **Primitive tokens** hold raw values under descriptive names: blue-600 is #2563eb, space-4 is 16 px. They say what a value is and nothing about where to use it.
- **Semantic tokens** name a purpose and point at a primitive: color-action-primary points to blue-600, color-text-muted to grey-600. These are the roles from lesson 11.
- **Component tokens** name one part of one component: button-primary-background points to color-action-primary.

[[fig:fig-token-tiers]]

Material Design 3 uses this structure, calling the tiers reference, system and component tokens.

The tiers pay off when something changes. To rebrand, you repoint semantic tokens at new primitives and every component follows. Dark mode is a second mapping of the same semantic tokens. A component token lets one component diverge, such as a marketing button in a special colour, without bending the rule for everything else.

> **Rule of thumb:** Components use semantic or component tokens and never primitives. A hex code or blue-600 inside a component file is a bug waiting for your next rebrand.

Keep it proportionate. A small product needs primitives and semantic tokens; add component tokens when you support several themes or brands, or when one component really needs its own setting.

A good system makes the common case easy and the exception deliberate. When something genuinely does not fit, add a variant or a component token on purpose, so the exception is visible and documented.

## Naming tokens

Good names are predictable, so you can guess a token without looking it up. A common pattern runs from general to specific: category, property, role, variant, state. Examples are color-text-muted, color-background-danger-subtle and color-border-focus. Avoid names tied to a value (blue-button), a page (homepage-hero-grey) or a mood (nice-shadow), because each one breaks as soon as the design moves.

In code, tokens usually become CSS custom properties or a Tailwind theme. In Figma they become variables, with modes for light and dark.

> **Common mistake:** Building a token file and then letting components bypass it. One hard-coded #2563eb on a button goes unnoticed until the rebrand or dark mode, when that button alone stays the old blue.

## Handing the system to an AI tool

AI coding tools follow a visible system well and invent one badly. Give them three things.

- **One token file.** Every primitive and semantic token in one place, such as a tokens.css with values for both themes, or the theme section of your Tailwind config.
- **A rules file the tool reads every session.** Claude Code reads CLAUDE.md and Cursor has its own rules files. Say where tokens live, which components exist, and the hard rules: no raw hex values, no spacing outside the scale, no new shadows, and reuse existing components before making new ones.
- **Good examples.** Point the tool at one or two finished components that use tokens properly. Models copy patterns they can see more reliably than rules they are told.

If you use shadcn/ui, part of this is already done. Its components read semantic CSS variables such as background, foreground, primary, muted, destructive and ring, so changing those variables re-themes the whole set.

## Using this with your AI tools

Use the vocabulary directly in prompts: primitive, semantic and component tokens, theme, mode, and "use the existing token".

> **Prompt:** Before writing code, read tokens.css and the components in src/ui. Use only semantic tokens for colour, spacing, radius and shadow, and never write raw hex, px or rgba values in components. If a token you need does not exist, stop and propose one instead of inventing a value.

Then audit what comes back. Search the diff for a hash followed by hex digits, for pixel values outside your scale, and for Tailwind classes with square brackets, which mark arbitrary values. Switch themes and confirm every new screen follows. When the tool invents a new grey, fix the line and add a rule to your rules file so the mistake does not repeat.
`,
  takeaways: [
    "A design system is decisions made once and shared: principles, tokens, components and guidance.",
    "Primitive tokens hold values, semantic tokens hold purpose, component tokens hold deliberate exceptions.",
    "Components reference semantic or component tokens only; a raw hex code in a component is a bug.",
    "With tiers in place, a rebrand or a dark theme becomes a remapping job.",
    "Give AI tools one token file, a rules file and good examples, then audit every diff for raw values.",
  ],
  check: [
    {
      q: "Your tokens use three tiers. The brand colour changes from blue to green. What should change?",
      options: [
        "Every component file that uses blue",
        "Only the component tokens for buttons",
        "The token names, from blue to green, in every file",
        "Which primitives the semantic tokens point to, leaving components untouched",
      ],
      answer: 3,
      why: "The semantic layer exists for exactly this. Point color-action-primary and its relatives at the green primitives and every component follows. Editing button tokens alone is tempting, but links, focus rings and badges would stay blue.",
    },
    {
      q: "Which of these is a semantic token?",
      options: ["blue-600", "color-action-primary", "button-primary-background", "#2563eb"],
      answer: 1,
      why: "color-action-primary names a purpose that many components share. button-primary-background is the tempting answer, but it belongs to one component, so it is a component token. blue-600 is a primitive and #2563eb is a raw value.",
    },
    {
      q: "An AI tool generated a card with the class bg-[#f8fafc] and padding of 13 px. What is the main problem?",
      options: [
        "Both values bypass your tokens, so theme changes, dark mode and future edits will skip this card",
        "The background colour is too light",
        "Tailwind does not allow arbitrary values",
        "13 is an odd number",
      ],
      answer: 0,
      why: "Raw values cut the card off from the system, so it silently breaks in dark mode and at the next rebrand. The odd 13 px is a symptom of the same problem, since it falls outside the spacing scale. Tailwind does allow arbitrary values, which is why you have to look for them.",
    },
  ],
  practice: [
    "lab-tokens",
    {
      type: "sort",
      title: "Which tier",
      intro: "Sort each token into the tier it belongs to.",
      buckets: ["Primitive", "Semantic", "Component"],
      items: [
        { text: "grey-900 = #111827", bucket: 0, why: "A raw value with a descriptive name and no purpose attached." },
        { text: "blue-500 = #3b82f6", bucket: 0, why: "A step on a colour scale, so a primitive." },
        { text: "space-4 = 16 px", bucket: 0, why: "A step on the spacing scale with no job assigned yet." },
        { text: "font-size-20 = 20 px", bucket: 0, why: "A raw size on the type scale." },
        { text: "color-text-default", bucket: 1, why: "Names a purpose, body text, that many components share." },
        { text: "color-surface-raised", bucket: 1, why: "A role for any raised surface, whether card, menu or panel." },
        { text: "color-border-focus", bucket: 1, why: "The focus ring colour for every focusable control." },
        { text: "color-feedback-danger", bucket: 1, why: "A role used by errors, destructive buttons and alerts alike." },
        { text: "button-primary-background", bucket: 2, why: "Belongs to one component and points at a semantic token." },
        { text: "input-border-error", bucket: 2, why: "A specific part of the input component in a specific state." },
        { text: "card-padding", bucket: 2, why: "A setting for the card component alone." },
        { text: "tooltip-background", bucket: 2, why: "Scoped to the tooltip, so other components are unaffected if it changes." },
      ],
    },
    {
      type: "rewrite",
      title: "Write rules your AI tool will follow",
      intro: "Vague instructions produce generic output. Rewrite this project instruction so an AI coding tool keeps to your design system.",
      task: "Rewrite the instruction below as a short rules section for your project's AI instruction file, such as CLAUDE.md.",
      given: "Make the UI modern and clean. Use nice colours and consistent spacing. Dark mode would be good.",
      rubric: [
        "Says where the tokens live and that components must use semantic tokens only",
        "Bans raw hex, px and arbitrary values, and says what to do when a token is missing",
        "Names the existing components to reuse before creating new ones",
        "Covers both themes and the states new components must have",
      ],
      model: "Design tokens live in src/styles/tokens.css, with light and dark values for every semantic token. In components, use only semantic tokens (color, space, radius, shadow); never write hex codes, rgba, px values or Tailwind arbitrary values such as bg-[#fff]. If you need a value that has no token, stop and propose a new semantic token with light and dark values. Reuse the components in src/ui (Button, Input, Select, Card, Dialog, Toast) before creating anything new, and give any new component default, hover, focus-visible, disabled and loading states. Check every change in both themes.",
    },
  ],
  journal: "Open the CSS or Tailwind config of one of your own projects. Count how many distinct colours and spacing values it uses. Write down the five you would turn into semantic tokens first, and what you would name them.",
  terms: ["design-system", "interface-inventory", "design-token", "primitive-token", "semantic-token", "component-token", "theme"],
});
