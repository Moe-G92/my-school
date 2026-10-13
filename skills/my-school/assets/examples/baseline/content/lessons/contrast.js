L({
  id: "contrast",
  part: 2,
  n: 12,
  title: "Contrast and accessible colour",
  short: "How contrast is measured, the WCAG numbers worth memorising, and how to design for people who see colour differently.",
  minutes: { read: 5, watch: 10, practice: 20 },
  body: `
## What contrast measures

Contrast is the difference in brightness between something and what sits behind it. The Web Content Accessibility Guidelines (WCAG) express it as a **contrast ratio**, calculated from each colour's **relative luminance**: how much light it gives off, weighted heavily towards green because the eye is most sensitive there. The scale runs from 1:1 (identical) to 21:1 (black on white).

The ratio ignores hue completely. Pure red (#ff0000) and a mid green (#008000) look nothing alike to most people, yet their contrast ratio is about 1.3:1, because they give off almost the same amount of light. Put red text on that green and it is close to unreadable for everyone, and for someone with red-green colour blindness the two can merge into one muddy colour. Hue helps tell colours apart; luminance difference is what makes text readable.

## The numbers to remember

WCAG 2.2 at level AA, the level most accessibility laws and audits point to, sets these minimums:

- 4.5:1 for normal text.
- 3:1 for **large text**, meaning at least 24 CSS px, or 18.66 px if bold.
- 3:1 for meaningful non-text elements: icons that carry meaning, input borders, focus indicators, chart lines, and any part of a control you need to see to use it.

Level AAA raises text to 7:1, or 4.5:1 for large text. Disabled controls, logos and purely decorative graphics are exempt. Placeholder text has no exemption, and light-grey placeholders often fail.

A few anchors are worth memorising. On white, #767676 is the lightest grey that passes for normal text at 4.54:1; one notch lighter, #777777, fails at 4.48:1. For borders and icons, #949494 just clears 3:1. White text on a mid blue such as #3b82f6 reaches only 3.7:1, while one step darker, #2563eb, gives 5.2:1. White on a bright orange like #f97316 is 2.8:1, which is why so many orange brands need dark text on their buttons or a deeper orange.

[[fig:fig-contrast-ladder]]

WCAG's formula has known blind spots. It ignores font weight beyond the large-text threshold, and it misjudges pairs involving very dark colours, so some dark-mode combinations pass while being hard to read. A newer method called APCA models these effects and has been proposed for WCAG 3, which is still a draft. Until that changes, WCAG 2.2 ratios are what audits use; treat APCA as a second opinion for dark themes and thin fonts.

> **Common mistake:** AI tools love a pale grey such as #9ca3af for secondary text and placeholders. On white it is about 2.5:1. It looks refined in a screenshot and fails for anyone reading on a phone in sunlight. WebAIM's yearly scan of the top million home pages finds low-contrast text on roughly four in five of them, more than any other problem.

## Never let colour work alone

WCAG has a second colour rule (SC 1.4.1): colour must never be the only way you convey information. Think of a form field that turns red when it is wrong, a chart with one green and one red line, or a link that differs from body text only by being blue. Each one hides information from a sizeable group of people.

The fix is a second signal that does not depend on colour:

- Errors get an icon and a message that says what is wrong, as well as the red border.
- Links inside body text get an underline.
- Chart lines get direct labels, or different line styles and marker shapes.
- Status badges carry a word or icon, like a tick and "Paid" on an invoice.

This links back to lesson 2. A signifier that only some people can perceive is a weak signifier.

## Colour vision deficiency

About 1 in 12 men and 1 in 200 women have some form of **colour vision deficiency**. The main types:

- Deuteranomaly and deuteranopia: reduced or missing sensitivity to green. The most common.
- Protanomaly and protanopia: reduced or missing sensitivity to red. Reds also look darker.
- Tritanopia: difficulty with blue and yellow. Rare.
- Achromatopsia: no colour vision at all. Very rare.

Red against green is the classic trap: share prices up and down, code diffs, online and offline dots, pass and fail in a test report. If you need two colours to mean opposite things, make them differ in lightness as well as hue. A dark blue and a light orange stay distinct for almost everyone; a mid red and a mid green often do not. Chrome DevTools can simulate the common deficiencies in its Rendering panel, so you can check a real page in seconds.

> **Try it now:** Turn on the greyscale colour filter in your phone's accessibility settings, then open your banking or weather app. Anything you can no longer understand is relying on colour alone. Turn the filter off afterwards.

## Using this with your AI tools

AI tools know the WCAG numbers, but they rarely check the colours they choose unless you ask. State the standard, the thresholds and the fix you want in the prompt.

> **Prompt:** Check every text, icon, border and focus-ring colour pair in this component against WCAG 2.2 AA (4.5:1 for text, 3:1 for large text and non-text UI), list each pair with its ratio, and fix failures by moving to a darker or lighter step of the same scale.

Do not trust the ratios a language model reports, because it can get the arithmetic wrong. Verify with a real tool. The colour picker in browser DevTools shows the ratio for text, and Lighthouse or axe flag failures across a page. Automated checkers cannot judge text over images or gradients, so check those by eye at the worst spot. Then look at hover, focus, disabled and error states, and at dark mode, because tools and generators usually test only the default light state.
`,
  takeaways: [
    "Normal text needs 4.5:1; large text (24 px, or 18.66 px bold) and meaningful icons, borders and focus rings need 3:1.",
    "On white, #767676 is the lightest grey that passes for normal text; anything paler is decoration.",
    "Contrast ratio measures luminance, so two very different hues can still be unreadable together.",
    "Never let colour carry meaning alone; add an icon, a word, an underline or a shape.",
    "Check every state and both themes with a contrast tool, because eyes and bright screens flatter low contrast.",
  ],
  check: [
    {
      q: "Helper text under a form field is #888888 on white (about 3.5:1) at 14 px regular. Does it meet WCAG 2.2 AA?",
      options: [
        "Yes, because 3:1 is the minimum for text",
        "No, because 14 px regular text needs 4.5:1",
        "Yes, because helper text counts as decorative",
        "Only if it is set in italic",
      ],
      answer: 1,
      why: "3:1 applies only to large text (24 px, or 18.66 px bold) and to non-text elements. At 14 px regular this text needs 4.5:1, and #767676 is the lightest grey that gets there on white. Helper text carries instructions, so it is never decorative.",
    },
    {
      q: "A sign-up form draws its inputs as white boxes with a #dddddd border on a white page. What does WCAG 2.2 AA require?",
      options: [
        "Nothing, because borders are decorative",
        "The border needs 4.5:1, the same as text",
        "It passes because the label above the field has enough contrast",
        "The border is what shows where the field is, so it needs at least 3:1 against the page",
      ],
      answer: 3,
      why: "#dddddd on white is about 1.4:1. Under SC 1.4.11, the visual information needed to identify a control needs 3:1, so a border of #949494 or darker would pass. The 4.5:1 option is the trap: that figure is for text, and borders are non-text UI.",
    },
    {
      q: "A trading app shows price rises in green and falls in red, with no other indicator. Which change helps the most people?",
      options: [
        "Add an up or down arrow and a plus or minus sign to every change",
        "Switch to a brighter red and a brighter green",
        "Add a setting that turns the colours off",
        "Make the numbers bold",
      ],
      answer: 0,
      why: "Around 1 in 12 men has some red-green colour vision deficiency, and brighter versions of the same two hues do not restore a difference they cannot see. Arrows and signs carry the meaning without colour, for everyone, by default. A setting only helps people who go looking for it.",
    },
  ],
  practice: [
    "lab-contrast",
    "lab-cvd",
    {
      type: "sort",
      title: "Which contrast rule applies",
      intro: "Sort each element by the minimum contrast WCAG 2.2 AA asks of it.",
      buckets: ["Needs 4.5:1", "Needs 3:1", "No requirement"],
      items: [
        { text: "16 px body text in a paragraph", bucket: 0, why: "Normal-size text needs 4.5:1." },
        { text: "12 px caption under a photo", bucket: 0, why: "Small text is still text, and it is harder to read than body copy, so 4.5:1 applies." },
        { text: "20 px regular subheading", bucket: 0, why: "The large-text threshold is 24 px regular. At 20 px regular this is normal text, so it needs 4.5:1." },
        { text: "32 px page heading", bucket: 1, why: "At 24 px or more, text counts as large and needs 3:1." },
        { text: "19 px bold card title", bucket: 1, why: "Bold text counts as large from 18.66 px (14 pt), so 19 px bold needs 3:1." },
        { text: "Placeholder text in an empty search field", bucket: 0, why: "Placeholder text has no exemption. It is text, so it needs 4.5:1, which many styled placeholders fail." },
        { text: "The border of a text input with no background fill", bucket: 1, why: "The border is the only thing showing where the field is, so it is non-text UI and needs 3:1." },
        { text: "The keyboard focus ring around a button", bucket: 1, why: "Focus indicators are non-text UI and need 3:1 against what surrounds them." },
        { text: "The trash icon on an icon-only delete button", bucket: 1, why: "The icon is the only way to understand the button, so it needs 3:1." },
        { text: "The label of a disabled button", bucket: 2, why: "Inactive controls are exempt, though making them readable is still kind." },
        { text: "The company logo in the header", bucket: 2, why: "Logos and brand names are exempt from contrast requirements." },
        { text: "A decorative blurred shape behind the hero", bucket: 2, why: "Pure decoration carries no information, so no ratio applies." },
      ],
    },
  ],
  journal: "Pick one screen from a product you use daily, or from your own site. Find the palest text on it and measure it with your browser's DevTools colour picker or a contrast checker. Write down what that text is for, its ratio, and what you would change.",
  terms: ["contrast-ratio", "relative-luminance", "wcag", "large-text", "non-text-contrast", "color-vision-deficiency", "apca"],
});
