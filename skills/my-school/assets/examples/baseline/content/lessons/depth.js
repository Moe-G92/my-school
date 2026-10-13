L({
  id: "depth",
  part: 2,
  n: 16,
  title: "Depth, surfaces and shape",
  short: "Use elevation, shadows and corner radius as a small system that tells people which layer is on top.",
  minutes: { read: 5, watch: 10, practice: 18 },
  body: `
## Why flat screens need depth

A screen is flat, but interfaces are layered. A menu opens over the page, a dialog over the menu, a toast over everything. Depth tells people which layer is on top, what they can interact with right now, and what will go away.

Interfaces have swung between extremes. Early iPhone apps imitated leather, felt and lined paper, a style called **skeuomorphism** that made new things feel familiar. **Flat design**, with Microsoft's Metro around 2010 and Apple's iOS 7 in 2013, stripped all that away and sometimes went too far. Buttons became plain words and people could no longer tell what was clickable. That is the signifier problem from lesson 2. In 2014 Google's Material Design took a middle path, treating the screen as sheets of paper at different heights that cast shadows. Most interfaces today use that idea quietly, with flat surfaces and just enough shadow, tone or border to show the layers.

## Elevation as a system

**Elevation** is how far a surface appears to sit above the page. Treat it as a small, fixed set of levels, each tied to a kind of element:

- Level 0: the page itself.
- Level 1: resting cards and panels.
- Level 2: sticky headers and floating buttons.
- Level 3: dropdowns, popovers and menus.
- Level 4: dialogs and drawers.

Material Design 2 worked this way, with resting cards at 1 dp, the top app bar at 4 dp, menus at 8 dp and dialogs at 24 dp. Material 3 reduced the levels and now shows elevation mostly through surface tone instead of shadow.

[[fig:fig-elevation]]

The point of the system is meaning. If a dropdown has the same shadow as the card it opens from, it does not read as a separate, temporary layer. If every card has a heavy shadow, nothing looks raised, because everything is.

> **Rule of thumb:** The higher the layer, the bigger and softer its shadow and the further it falls. Keep four or five levels and name them as tokens.

## Shadows that look real

Interface light comes from above, so shadows fall downwards, with a vertical offset and little or no horizontal one. Real objects cast two kinds of shadow, and good interface shadows copy both:

- a tight, slightly darker shadow right at the edge, where the surface nearly touches the page
- a wider, fainter shadow around it, from light bouncing around the room

In CSS you stack the two in one box-shadow. As elevation rises, the soft layer grows in blur and offset while its opacity drops. Keep opacity low, from a few per cent to around 15, and tint the shadow towards the background hue so it looks like shade instead of a grey smudge.

Shadows are one depth cue among several. A 1 px border separates surfaces without lifting them. A slightly darker page behind white cards does the same with tone. Anything that overlaps another element appears above it. Blur and translucency work too: Apple uses blurred, translucent materials for bars and sheets, and its 2025 Liquid Glass style pushes translucency further. The catch is contrast, because text on a translucent surface sits on whatever scrolls behind it, so its legibility changes with the content (lesson 12).

In dark mode shadows nearly vanish, so show height with lighter surfaces, as in lesson 11, plus subtle borders.

> **Common mistake:** Generated cards often stack every effect at once: a border, a large grey shadow, a gradient and a glow on hover. Pick one main cue per level. A card on a tinted page needs a border or a faint shadow, rarely both at full strength.

## Shape and corner radius

Corner radius sets tone. Sharp corners feel precise and serious, generous rounding feels soft and friendly, and fully rounded pills read as tags or buttons. Choose a small **radius scale**, such as 4, 8, 12, 16 and full, and give smaller elements smaller radii: perhaps 4 for a checkbox, 8 for a button and 12 to 16 for a card.

When one rounded shape sits inside another, use the **nested radius** rule: inner radius equals outer radius minus the padding between them. A card with a 16 px radius and 8 px of padding holds an image with an 8 px radius, and the two curves share a centre, so the gap stays even all the way round. If both used 16 px, the gap would be wider at the corners than along the sides, which looks subtly wrong. If the padding is as large as the outer radius, the inner corner can be square.

[[fig:fig-nested-radius]]

> **Try it now:** Pull down a notification or open a widget on your phone. Compare the outer corner with any image or button inside it, and check whether the curves run parallel.

## Using this with your AI tools

AI tools tend to copy one shadow and one radius everywhere, or invent a new one in each component. Give the tool elevation and radius tokens, and the rules for using them.

> **Prompt:** Define four elevation tokens (raised, sticky, overlay, modal) as two-layer box-shadows that get softer and fall further as they rise, and a radius scale of 4, 8, 12, 16 and full. Apply the nested radius rule (inner radius equals outer radius minus padding). In dark mode, show elevation with lighter surfaces instead of shadows.

Then check the result. Open a dropdown over a card and confirm it looks higher. Look for cards that use several depth cues at full strength. Zoom in on any rounded element holding another rounded element and check that the curves are parallel. Switch to dark mode and confirm raised surfaces are still distinct from the page.
`,
  takeaways: [
    "Use depth to show which layer is on top and which will go away; decoration alone is no reason for a shadow.",
    "Keep four or five elevation levels, each tied to a kind of element, and never reuse one level's shadow for another layer.",
    "Good shadows have two layers, fall downwards, and get softer and further offset as they rise.",
    "In dark mode, show elevation with lighter surfaces and subtle borders.",
    "Inner radius equals outer radius minus padding, so nested curves stay parallel.",
  ],
  check: [
    {
      q: "A card has a 20 px corner radius and 12 px of padding. What radius should the image inside it use?",
      options: ["20 px, to match the card", "8 px", "12 px, to match the padding", "32 px"],
      answer: 1,
      why: "Inner radius equals outer radius minus padding: 20 minus 12 is 8, which makes the two curves share a centre and keeps the gap even. Matching the card's 20 px is the tempting choice, but it makes the gap visibly wider at the corners.",
    },
    {
      q: "In your dark theme, cards on a #121212 page use the same shadows as the light theme and look flat. What is the best fix?",
      options: [
        "Use a heavier, darker shadow",
        "Add a bright accent border to every card",
        "Remove the cards and use dividers instead",
        "Make raised surfaces a lighter grey than the page, with a subtle border if needed",
      ],
      answer: 3,
      why: "A shadow needs a lighter surface to darken, and a near-black page has almost none, so a heavier shadow changes little. Dark themes show height with lighter surfaces. Bright borders on every card turn structure into decoration.",
    },
    {
      q: "A dropdown menu opens over a card and uses exactly the same shadow as the card. What is the problem?",
      options: [
        "The menu does not read as a separate, higher, temporary layer",
        "Dropdown menus should never have shadows",
        "The card should lose its shadow instead",
        "There is no problem, because one shadow everywhere keeps things consistent",
      ],
      answer: 0,
      why: "Elevation is meant to say which layer is on top. Consistency here means each level gets the same shadow wherever it appears. With the card's shadow on the menu, the menu looks glued to the card.",
    },
  ],
  practice: [
    "lab-elevation",
    {
      type: "order",
      title: "Stack the layers",
      intro: "Put these surfaces in order from lowest to highest elevation, as Material Design 2 assigned them.",
      items: ["Page background", "Resting card", "Top app bar", "Floating action button", "Dropdown menu", "Modal dialog"],
      why: "Material Design 2 placed these at 0, 1, 4, 6, 8 and 24 dp. The more an element interrupts and the more temporary it is, the higher it sits. Persistent chrome like the app bar sits above content, menus float above that, and a modal dialog, which blocks everything else, sits highest.",
    },
    {
      type: "choice",
      title: "Depth decisions",
      intro: "Choose the best response to each depth or shape problem.",
      items: [
        {
          prompt: "Your marketing site's cards each have a 1 px border, a 24 px blurred shadow at 25% black and a subtle gradient.",
          options: [
            "Keep them, because more depth looks premium",
            "Add a hover glow to make them feel interactive",
            "Keep one main cue, such as a faint two-layer shadow or a border",
          ],
          answer: 2,
          why: "Stacked effects make cards look heavy and compete with the content. One clear cue per level is enough to show the layer.",
        },
        {
          prompt: "Buttons have an 8 px radius, cards 8 px, avatars 8 px, the search field 24 px and modals 4 px.",
          options: [
            "Define a radius scale tied to element size and apply it consistently",
            "Use 8 px for everything, including the search field",
            "Let each component keep its own radius",
          ],
          answer: 0,
          why: "A scale gives smaller elements smaller radii and makes the system predictable. One radius for everything ignores size, and the modal with the smallest radius looks out of family.",
        },
        {
          prompt: "A translucent, blurred navigation bar becomes hard to read when busy content scrolls beneath it.",
          options: [
            "Remove the blur so the content is clearer",
            "Make the bar more opaque or the blur stronger, and check label contrast over the busiest content",
            "Make the labels thinner so they look lighter",
          ],
          answer: 1,
          why: "Translucent surfaces inherit contrast from whatever is behind them, so you test against the worst case and add opacity until labels pass. Removing the blur makes it worse.",
        },
        {
          prompt: "Every shadow in your design is pure black at 40% opacity.",
          options: [
            "Make them darker so they stand out on bright screens",
            "Replace them all with borders",
            "Lower the opacity, soften the blur and tint the shadows towards the background hue",
          ],
          answer: 2,
          why: "Real shade is soft and picks up the colour of its surroundings. Heavy black shadows look dirty and make surfaces feel stuck on.",
        },
      ],
    },
  ],
  journal: "Open a dropdown, a dialog and a toast in an app you use, such as Gmail or Notion. For each, write down how it shows that it sits above the page: shadow, border, tone, blur or a dimmed background. Note which one feels clearest and why.",
  terms: ["elevation", "skeuomorphism", "flat-design", "box-shadow", "radius-scale", "nested-radius"],
});
