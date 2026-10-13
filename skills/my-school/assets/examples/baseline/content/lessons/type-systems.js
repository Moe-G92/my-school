L({
  id: "type-systems",
  part: 2,
  n: 14,
  title: "Typography for interfaces",
  short: "Build a type scale, set comfortable lines, space letters and numbers properly, and choose fonts that load well.",
  minutes: { read: 5, watch: 12, practice: 20 },
  body: `
## Build a type scale

Lesson 7 showed that size is the strongest signal of hierarchy. Used freely, it creates noise instead. Text at 13, 14, 15, 17, 18 and 19 px gives six levels nobody can tell apart. A **type scale** limits you to a small set of sizes, each a fixed ratio larger than the last.

Start with a base, usually 16 px for body text, then pick a ratio. The common ones borrow names from musical intervals:

- 1.125 (major second) or 1.2 (minor third) for dense tools and dashboards.
- 1.25 (major third) or 1.333 (perfect fourth) for most product interfaces and content sites.
- 1.5 (perfect fifth) or more for marketing pages with a few big headlines.

A base of 16 with a ratio of 1.25 gives 16, 20, 25, 31, 39 and 49. Round them to 16, 20, 24, 32, 40 and 48 so they sit on the 4-point grid from lesson 9, and add 14 and 12 for labels and captions. Most products need six to eight sizes in total.

[[fig:fig-type-scale]]

Treat the ratio as a starting point. Apple's default iOS text styles run 11, 12, 13, 15, 16, 17, 20, 22, 28 and 34 pt, which no single ratio produces. On phones, use a smaller ratio than on desktop, because a 48 px heading eats a narrow screen. The CSS clamp() function lets a size grow smoothly between the two.

## Line length and line height

The **measure** is the length of a line of text. Comfortable reading sits between 45 and 75 characters per line, with about 66 often cited as ideal. When lines run long, the eye struggles to find the start of the next line on the return sweep; when they are very short, phrases break apart and the eye jumps constantly.

[[fig:fig-line-length]]

In CSS, give text blocks a max-width in ch units (1ch is the width of the zero), somewhere around 60 to 70ch.

**Line height** should shrink as size grows. Body text reads well at about 1.4 to 1.6 times the font size. Headings need around 1.1 to 1.25, because at 1.5 the gaps between large lines look huge and a two-line heading falls apart. Longer lines need slightly more line height to guide the return sweep.

> **Common mistake:** Generated pages often let body text run the full width of a 1440 px screen, around 150 characters a line, and give a 56 px heading the same 1.5 line height as the paragraphs. Cap the measure and tighten the heading.

## Spacing letters and numbers

**Tracking** is the uniform space added or removed between letters, letter-spacing in CSS. Kerning, which adjusts specific pairs like AV, is built into the font. Type designers space a face for a range of sizes, usually body text, so outside that range the defaults look wrong.

- Large headings look loose at default spacing. Tighten them slightly, roughly -0.01 to -0.03em. Apple's San Francisco applies size-specific tracking automatically for this reason.
- All-caps labels need positive tracking, around 0.05 to 0.1em. Capitals are spaced to sit beside lowercase letters, so in a run of caps they crowd each other.
- Leave lowercase body text alone. Loosening it breaks up the word shapes readers rely on.

Numbers need attention too. Many fonts default to proportional figures, where a 1 is narrower than an 8. In tables, prices, timers and anything that updates live, turn on **tabular figures** (font-variant-numeric set to tabular-nums) so every digit has the same width, columns line up, and changing numbers stop jittering.

> **Rule of thumb:** The bigger the text, the tighter its line height and tracking. The smaller the text, or the more capitals, the looser both get.

## Pairing typefaces

One well-made family with three or four weights can carry an entire product, and for most interfaces it should. Size, weight and colour already give you hierarchy.

When you do pair, look for contrast in classification and harmony in proportion. A serif for headings with a sans for body is the classic move; check that their x-heights are similar and their moods agree. Avoid two near-identical sans faces, such as Helvetica with Arial, because the small differences read as a mistake. Superfamilies make pairing safe because they were designed together: IBM Plex has Sans, Serif and Mono versions, and Adobe's Source family has Sans, Serif and Code.

## System fonts and variable fonts

A **system font stack** tells the browser to use the operating system's own interface font: San Francisco on Apple devices, Segoe UI on Windows, Roboto on Android. The shortest CSS value is system-ui. It downloads nothing and feels native. The trade-off is that your product looks slightly different on each platform and has no typographic voice of its own. GitHub's interface uses a system stack.

A **variable font** puts a whole range of a typeface into one file, along axes such as weight, width and optical size. Instead of separate files for 400, 600 and 700, you load one and can use any value between, such as 450. An optical size axis redraws details for the size in use, with sturdier strokes and looser spacing when small. Inter and Roboto Flex are both variable, and every modern browser supports the format.

## Using this with your AI tools

Type is where generated interfaces look most generic, because tools fall back to default sizes and spacing. Give the tool a complete type system: a base, a ratio, and named roles with size, weight, line height and tracking.

> **Prompt:** Create a type scale from a 16 px base with a 1.25 ratio, rounded to a 4 px grid, as named roles (display, h1, h2, h3, body, small, caption) with size, weight, line height and letter-spacing for each. Body line height 1.5, headings 1.1 to 1.25, tighten headings above 32 px, track uppercase labels at 0.06em, cap paragraphs at 65ch, and use tabular figures in tables.

Then check the output. Count the distinct font sizes in the CSS; more than eight usually means the scale is being ignored. Measure a paragraph on a wide screen. Look for uppercase labels with no tracking and headings that inherited the body line height.
`,
  takeaways: [
    "Pick a base size and one ratio, round to your grid, and limit the product to six to eight sizes.",
    "Keep body text between 45 and 75 characters per line, around 65ch, with line height near 1.5.",
    "Big text gets tighter line height and tracking; small text and all-caps labels get looser.",
    "One good family usually beats a pairing; if you pair, contrast the class and match the proportions.",
    "Use tabular figures for numbers that align or change, and a variable font when you need several weights.",
  ],
  check: [
    {
      q: "You are designing an analytics dashboard with several heading levels, table text and labels in a tight space. Which scale ratio suits it best?",
      options: [
        "1.618, the golden ratio, for natural harmony",
        "1.5, so each level is clearly bigger than the last",
        "1.125 to 1.2, so many levels fit without huge jumps",
        "Any ratio, as long as body text is 16 px",
      ],
      answer: 2,
      why: "Dense tools need many distinguishable levels within a small range, so a small ratio works best. The golden ratio sounds principled, but six levels at 1.618 would take a 12 px label to a heading over 130 px, which a dashboard cannot use.",
    },
    {
      q: "A blog's paragraphs run 1,200 px wide at 16 px on desktop, about 150 characters per line, and readers find it tiring. What is the best fix?",
      options: [
        "Cap the text column at around 65ch and keep line height near 1.5",
        "Raise the line height to 2.5 at the current width",
        "Drop the font size to 14 px so more fits",
        "Justify the text so both edges are straight",
      ],
      answer: 0,
      why: "The tiring part is the long return sweep, so shorten the line. Extra line height helps a little with long lines, but at 2.5 the paragraph stops reading as a block. Justified text adds uneven gaps between words, and smaller type makes lines even longer in characters.",
    },
    {
      q: "A 48 px heading looks loose, and an 11 px uppercase section label looks cramped. What should you do with letter spacing?",
      options: [
        "Loosen both",
        "Tighten the heading slightly and loosen the uppercase label",
        "Tighten both",
        "Leave both, because the font designer already set the spacing",
      ],
      answer: 1,
      why: "Fonts are spaced for body sizes, so large text needs a little less tracking and small or all-caps text needs more. Trusting the defaults is tempting, but designers expect you to adjust at the extremes; Apple's system font does it automatically.",
    },
  ],
  practice: [
    "lab-type-scale",
    "lab-measure",
    "lab-pairing",
    {
      type: "choice",
      title: "Type system decisions",
      intro: "Real decisions from building a product's typography. Pick the best response.",
      items: [
        {
          prompt: "Your marketing site and your app share one type scale with a 1.25 ratio. The marketing hero looks timid next to competitors.",
          options: [
            "Add larger display sizes for marketing pages while the app keeps its scale",
            "Raise the base size of the whole system to 20 px",
            "Set the hero in bold italic",
          ],
          answer: 0,
          why: "Marketing pages and product screens have different jobs, so it is normal for marketing to get extra display sizes on top of the shared scale. A 20 px base would bloat every screen in the app.",
        },
        {
          prompt: "A countdown timer in your app shifts left and right every second as the digits change.",
          options: [
            "Switch the timer to a monospace font",
            "Add letter-spacing to the timer",
            "Turn on tabular figures for the timer",
          ],
          answer: 2,
          why: "Tabular figures give every digit the same width, so the timer stays still while keeping the interface font. Monospace also fixes it but changes the whole look of the text.",
        },
        {
          prompt: "A designer pairs Helvetica headings with Arial body text.",
          options: [
            "Good pairing, because they share proportions",
            "Use one of them for both; the near-identical shapes make the mismatch look like an error",
            "Fine, as long as the headings are bold",
          ],
          answer: 1,
          why: "A pairing needs clear contrast to look intentional. Two almost-identical sans faces give no contrast and lots of tiny inconsistencies, such as the different R and G.",
        },
        {
          prompt: "Your site loads six separate files for one sans: 400, 500, 600 and 700, plus two italics.",
          options: [
            "Switch to the variable version, which covers the weight range in one file per style",
            "Drop to a single weight and use size for all hierarchy",
            "Keep them all, because file count does not matter",
          ],
          answer: 0,
          why: "A variable font replaces the upright weights with one file and lets you use in-between values. Cutting to one weight throws away a useful hierarchy tool, and every extra font file delays text rendering.",
        },
      ],
    },
  ],
  journal: "Open a long article on a news or reading site on your laptop. Count the characters in a typical line, estimate the line height, and count how many distinct text sizes the page uses. Write down which choices make it comfortable or tiring to read.",
  terms: ["type-scale", "measure", "line-height", "tracking", "tabular-figures", "font-pairing", "system-font-stack", "variable-font"],
});
