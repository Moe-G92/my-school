L({
  id: "spacing",
  part: 2,
  n: 9,
  title: "Space and the 8-point system",
  short: "How to use space to group and rank content, with a spacing scale and one rule that fixes most layouts.",
  minutes: { read: 5, watch: 15, practice: 20 },
  body: `
## Space is an element

Empty space, often called **whitespace** or negative space, is as much a part of a design as the text and buttons. It groups things, as the proximity principle in lesson 6 showed, and it ranks them, because an element with room around it looks more important (lesson 7). It also gives the eye somewhere to rest, which keeps dense information readable.

How much space you use sets the tone. Luxury brands and editorial sites use generous space, which reads as calm. Trading screens and spreadsheets use tight spacing because their users want as much information visible as possible. Both suit their audience. The real problem is space chosen at random, element by element, which looks messy even when no single gap is wrong.

## Why a scale, and why 8

The fix for random spacing is a **spacing scale**, a short list of allowed values that every gap, padding and margin must come from. With a scale you choose between 16 and 24 instead of agonising over 17, 18 or 19, and the whole product shares one rhythm.

The most common basis is the **8-point grid**: values that are multiples of 8, with 4 allowed for small adjustments. A typical scale is 4, 8, 12, 16, 24, 32, 48, 64 and 96. Eight divides cleanly, so halves and quarters stay whole numbers. It also scales cleanly on screens with 1.5x, 2x and 3x pixel densities, since 8 times any of those is a whole number of physical pixels. And steps of 8 are big enough to see, so every choice makes a visible difference.

Material Design uses an 8 dp grid with 4 dp for smaller elements. Tailwind's spacing classes count in 4 px units, so its p-4 class gives 16 px of padding.

Notice that the scale isn't evenly spaced. The steps grow as the values grow, because we perceive differences in proportion. The jump from 4 to 8 is obvious, while the jump from 64 to 68 is invisible.

> **Common mistake:** AI-generated layouts often mix values like 10, 14, 15, 18 and 22 px, or use one gap for everything. Snap each value to the nearest step of your scale, then check that groups still read as groups.

## The internal and external rule

One spacing rule fixes more layouts than any other. The **internal ≤ external rule** says that the space inside an element should be less than or equal to the space around it. A card's padding should be no bigger than the gap between it and the next card. A label's distance to its own field should be smaller than its distance to the next field.

[[fig:fig-spacing-rule]]

This is proximity made precise. If cards have 32 px of padding but sit only 12 px apart, they crowd each other and the row reads as one block. The rule matters most when groups have no border or background, because spacing is then the only thing telling people where one group ends. A visible card edge does some of the work, though cramped gaps still look wrong.

> **Rule of thumb:** Use smaller steps inside a group and larger steps between groups. For example, 8 px between a label and its field, 24 px between fields and 48 px between sections.

## The box model, for designers

Browsers lay out every element as a box with four layers, known as the **box model**. From the inside out there's the content, then **padding** (space inside the border), then the border, then **margin** (space outside the border, between this box and its neighbours).

[[fig:fig-box-model]]

The difference matters in practice. Padding is inside the element, so it shows the element's background colour and counts as part of its clickable area. Margin is outside, transparent and not clickable. To make a navigation link easier to hit, increase its padding. More margin would only push it further from its neighbours.

Two more details save confusion. In CSS, vertical margins between stacked blocks collapse: a 24 px margin below one paragraph and a 16 px margin above the next give a gap of 24 px, because the larger margin wins. And modern layouts often use the gap property on flex and grid containers instead, which spaces the children evenly without a margin on each one and is easier to keep on a scale.

## Density and rhythm

**Density** is how much content fits in a given space, and different jobs need different densities. Gmail offers default, comfortable and compact display settings, because someone triaging hundreds of emails wants more rows on screen than someone reading three. Keep one spacing scale and change which steps you use. A compact table might use 4 and 8 inside rows where a comfortable one uses 8 and 16.

Vertical rhythm applies the same idea to text. Space above a heading should be larger than the space below it, so the heading clearly belongs to what follows, and paragraph spacing should stay consistent.

> **Try it now:** Open any website, right-click an element and choose Inspect. As you hover over elements in the panel, the browser shades their margin and padding in different colours. Check whether the values look like they come from a scale.

## Using this with your AI tools

Give your AI tool a spacing scale and tell it to use nothing else. If you use Tailwind, the scale 4, 8, 12, 16, 24, 32, 48 and 64 px maps to its spacing steps 1, 2, 3, 4, 6, 8, 12 and 16, which keeps generated code on the scale. State the internal and external relationships as well, because a scale alone won't stop a tool from putting 32 px of padding inside cards that sit 8 px apart.

Then inspect the output. Search the generated code for one-off values (in Tailwind these appear in square brackets, such as p-[18px]). Check each component against the internal and external rule, and check that the space between sections is clearly bigger than the space inside them.

> **Prompt:** Use only these spacing values: 4, 8, 12, 16, 24, 32, 48, 64 px. Card padding must never exceed the gap between cards. Use gap on flex and grid containers in place of margins on children.
`,
  takeaways: [
    "Space groups and ranks content, so choose it as deliberately as any other element.",
    "Use a spacing scale built on 8, with 4 for small steps, and nothing outside it.",
    "Space inside a group should be no larger than the space around it.",
    "Padding is inside an element and clickable; margin is outside and isn't.",
    "Change density by choosing different steps from the same scale.",
  ],
  check: [
    {
      q: "Cards in a grid have 32 px of padding and sit 12 px apart, with no borders, on a white page. What's wrong?",
      options: [
        "Nothing, as long as both values are on the spacing scale",
        "The padding should be an odd number",
        "The space inside each card is larger than the space between cards, so the cards blur together",
        "The cards need drop shadows",
      ],
      answer: 2,
      why: "This breaks the internal and external rule, and with no borders, spacing is the only cue separating the cards. The first option is tempting because using a scale feels like enough, but a scale only limits the values. It doesn't make the relationships between them right.",
    },
    {
      q: "Your AI tool generated a layout with spacing values of 10, 14, 15, 18, 22 and 30 px. What's the best fix?",
      options: [
        "Replace every value with 16 px for consistency",
        "Snap each value to the nearest step on your scale, keeping smaller gaps inside groups and larger ones between them",
        "Leave them, since the differences are too small to notice",
        "Double every value for more breathing room",
      ],
      answer: 1,
      why: "Snapping to a scale gives consistency while keeping the grouping. One value everywhere is tempting because it's perfectly consistent, but it erases the difference between space inside groups and space between them, so nothing groups.",
    },
    {
      q: "A section heading sits 32 px below the previous paragraph and 32 px above its own paragraph. What should change?",
      options: [
        "Reduce the space below the heading so it sits closer to the paragraph it introduces",
        "Increase the space below the heading to 48 px",
        "Make the heading bold",
        "Add a divider line above the heading",
      ],
      answer: 0,
      why: "With equal space on both sides, the heading floats between two paragraphs and belongs to neither. A divider is tempting because it separates sections, but it adds visual noise where a spacing change does the job.",
    },
  ],
  practice: [
    "lab-spacing",
    "lab-box-model",
    {
      type: "choice",
      title: "Padding, margin or something else?",
      intro: "Pick the spacing fix that addresses each problem.",
      items: [
        {
          prompt: "A button's label almost touches the button's edges.",
          options: [
            "Increase its padding",
            "Increase its margin",
            "Make the label smaller",
            "Add a border",
          ],
          answer: 0,
          why: "Space between content and its own edge is padding. Shrinking the label is tempting because it creates room, but it makes the text harder to read to fix a spacing problem.",
        },
        {
          prompt: "Two buttons sitting side by side are touching each other.",
          options: [
            "Increase each button's padding",
            "Add space between them, with a gap on their container or a margin",
            "Make one of them a different colour",
            "Put a divider line between them",
          ],
          answer: 1,
          why: "Space between elements is external space, so it's gap or margin. More padding is tempting, but it makes each button bigger and leaves them still touching.",
        },
        {
          prompt: "A navigation link is hard to tap on mobile, although its text size is fine.",
          options: [
            "Add margin around it",
            "Make the text bold",
            "Add a border",
            "Increase its padding so the tappable area grows while the text stays the same",
          ],
          answer: 3,
          why: "Padding is part of the clickable area. Margin is tempting because it adds space, but margin isn't clickable, so the target stays just as small.",
        },
        {
          prompt: "A settings list separates every row with a divider line and a 24 px gap, and it feels busy.",
          options: [
            "Make the dividers thicker so the rows are clearer",
            "Increase the gap to 48 px",
            "Pick one separator: keep the spacing and drop the dividers, or keep thin dividers with less space",
            "Give every row its own background colour",
          ],
          answer: 2,
          why: "Two separators doing one job create noise. A bigger gap is tempting, but it spreads the list out without removing the redundant lines.",
        },
        {
          prompt: "You're designing a compact admin table and a spacious marketing page for the same product.",
          options: [
            "Use the same spacing scale, with smaller steps in the table and larger ones on the marketing page",
            "Create a separate spacing scale for each",
            "Use identical spacing everywhere for consistency",
            "Leave the table on the browser's default spacing",
          ],
          answer: 0,
          why: "One scale keeps the product coherent while density changes with the job. Identical spacing everywhere is tempting because it sounds consistent, but it either cramps the marketing page or wastes space in the table.",
        },
      ],
    },
  ],
  journal: "Open your own product in a browser and inspect three components with the developer tools. Write down their padding and margins. Are the values on a scale, and does any group break the internal and external rule? Note the fixes you'd make.",
  terms: ["whitespace", "spacing-scale", "8-point-grid", "internal-external-rule", "box-model", "padding", "margin", "density"],
});
