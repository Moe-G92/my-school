L({
  id: "layout-grid",
  part: 2,
  n: 8,
  title: "Layout and grids",
  short: "How columns, gutters, margins and alignment give a layout its order, and when to break the grid.",
  minutes: { read: 5, watch: 10, practice: 20 },
  body: `
## Why designers use grids

A **layout grid** is a set of invisible divisions, usually vertical columns, that you place content on. It turns hundreds of small placement decisions into one big one. Once the grid exists, the question of where something should go usually has an obvious answer.

Grids come from print. Swiss designers in the 1950s built the International Typographic Style around them, and Josef Müller-Brockmann's Grid Systems in Graphic Design (1981) is still the classic text. Their case was practical and philosophical. A grid gives a page order, so attention goes to the content instead of to arbitrary placement.

On screens the benefits are the same. Elements line up, so the page looks intentional. Related things share edges, which puts the continuity principle from lesson 6 to work. Layouts stay consistent across pages and across the people (or tools) building them. And a grid defined in proportions adapts to different screen widths.

## Anatomy of a grid

A column grid has four main parts.

- **Columns**: the vertical strips that content spans. A piece of content usually spans several columns.
- **Gutters**: the gaps between columns, which keep side-by-side content apart.
- **Margins**: the space between the outermost columns and the edge of the screen.
- **Container**: the maximum width the grid grows to, so content doesn't stretch across a whole wide monitor.

[[fig:fig-grid-anatomy]]

Some systems add rows and a **baseline grid**, a set of horizontal lines that text sits on, so lines of text in neighbouring columns align. Baseline grids matter most in editorial and print design. In product interfaces, a consistent spacing scale (lesson 9) usually does that job well enough.

## Columns for the web and for apps

The 12-column grid dominates the web because 12 divides evenly into halves, thirds, quarters and sixths. On one 12-column grid you can place a main area and sidebar at 8 and 4, three cards at 4 each, or four cards at 3 each.

Narrower screens get fewer columns. Material Design's responsive grid has used 4 columns on phones, 8 on small tablets and 12 on larger screens. A common approach is to keep gutters at a fixed width, such as 16 or 24 px, and let the columns stretch, so spacing stays consistent while the content area flexes.

Many apps don't put the whole screen on a 12-column grid. A tool with a navigation sidebar usually gives the sidebar its own set width, and the grid lives inside the content area beside it.

Content width matters as much as column count. Text spread across a 1,440 px grid makes lines far longer than the comfortable 45 to 75 characters (lesson 14 explains why). So a long article might span only 6 or 8 of the 12 columns, while its images run wider.

> **Rule of thumb:** Pick one container width and one set of side margins for the whole site, and make every section use them. Matching outer edges do more for a polished look than any visual effect.

## Alignment does the quiet work

**Alignment** means placing elements so their edges or centres line up. Every element on a screen should align with something else. When one doesn't, the eye notices the stray edge, even if the person can't say what's wrong.

Count the distinct vertical alignment lines on a screen. Fewer lines make a calmer layout. A form where labels, inputs, help text and button share one left edge reads as one tidy column. Indent the help text slightly and centre the button, and you've added two extra edges for no reason.

Left alignment is the default for text in left-to-right languages because every line starts at the same place, so the eye finds the start of the next line easily. Centred text gives every line a different starting point. It works for a short heading or a two-line hero, and becomes tiring beyond that.

> **Common mistake:** AI-generated landing pages often centre everything, including paragraphs and feature lists, and give each section a slightly different container width. Left-align body text and keep one container, and the page immediately looks more deliberate.

> **Try it now:** Take a screenshot of a site you admire and draw a vertical line at every left edge you can find. Count them. Then do the same with your own product and compare.

## Breaking the grid on purpose

A grid is a tool, so you can break it. Break it only once it's established, so the break reads as intentional. A **full-bleed** image running edge to edge between text sections, a quote pushed out into the margin, or a hero image overlapping two sections all get attention precisely because everything else holds to the grid.

This is the emphasis principle from lesson 7. A break works by contrast, so use it rarely and for the most important thing. A page where every section breaks the grid in its own way effectively has no grid.

## Using this with your AI tools

AI tools default to whatever layout utilities they've seen most, which often means centred content, arbitrary max widths and gaps that change from section to section. Specify the grid: column count at each breakpoint, gutter width, side margins and container width. If you use Tailwind or a similar framework, name the exact container and gap values to reuse everywhere.

Then check the output against a grid overlay. Browser developer tools can draw CSS grid lines, and design tools have layout grid overlays. Look for edges that don't line up between sections, text that runs too wide, and sections that each picked their own maximum width.

> **Prompt:** Use a 12-column grid with 24 px gutters, a 1,200 px max container and 24 px side margins (4 columns and 16 px margins on mobile). Left-align body text and limit article text to about 65 characters per line.
`,
  takeaways: [
    "A grid turns hundreds of placement decisions into one and makes the result look intentional.",
    "Twelve columns divide into halves, thirds, quarters and sixths, which is why the web uses them.",
    "Use one container width and one set of side margins for every section.",
    "Every element should align with something; fewer alignment lines make a calmer screen.",
    "Break the grid rarely and on purpose, for the thing that most deserves attention.",
  ],
  check: [
    {
      q: "You need a main content area with a sidebar about a third of its width, and below it a row of four equal cards. Which grid handles both most easily?",
      options: [
        "A 10-column grid",
        "A 12-column grid",
        "A 5-column grid",
        "A 7-column grid",
      ],
      answer: 1,
      why: "Twelve splits into 8 and 4 for the main area and sidebar, and into four groups of 3 for the cards. A 10-column grid is tempting because ten feels like a round number, but it can't split into thirds or into four equal columns.",
    },
    {
      q: "A landing page has a centred hero, a features section in a 960 px container and testimonials in a 1,280 px container. Each section looks fine alone, but the page feels messy. What's the best fix?",
      options: [
        "Use one container width and one set of margins for every section so the edges line up",
        "Add dividing lines between the sections",
        "Give each section a different background colour",
        "Centre-align everything so the widths matter less",
      ],
      answer: 0,
      why: "The mismatched outer edges are what feel messy, so aligning them fixes the cause. Different backgrounds are tempting because they make each section feel deliberate, but they make the different widths even more visible.",
    },
    {
      q: "A three-paragraph explanation on your pricing page is centre-aligned. Why does this hurt readability?",
      options: [
        "WCAG forbids centred body text",
        "Centred text takes up more space",
        "Centred text loads more slowly",
        "Each line starts at a different place, so the eye has to hunt for the start of the next line",
      ],
      answer: 3,
      why: "Left-aligned text gives every line the same starting point, which makes reading several lines easier. The WCAG option is tempting because readability and accessibility overlap, but WCAG has no rule against centred text.",
    },
  ],
  practice: [
    "lab-grid",
    {
      type: "sort",
      title: "Name the part",
      intro: "Sort each description into the part of the grid it describes.",
      buckets: ["Column", "Gutter", "Margin", "Container"],
      items: [
        { text: "One of twelve vertical strips that content snaps to", bucket: 0, why: "Columns are the strips content spans." },
        { text: "The width of a card that spans three of the twelve strips", bucket: 0, why: "Content widths are measured in columns spanned." },
        { text: "The 24 px gap between two cards in the same row", bucket: 1, why: "Gutters separate content that sits side by side." },
        { text: "The space between the left and right halves of a two-column form", bucket: 1, why: "It's the gap between columns of content, so it's a gutter." },
        { text: "The 16 px space between the phone's edge and the content", bucket: 2, why: "Margins sit between the outer columns and the screen edge." },
        { text: "The space between the outermost column and the screen edge on a tablet", bucket: 2, why: "That's the definition of a margin." },
        { text: "The 1,200 px maximum width that stops text stretching on a big monitor", bucket: 3, why: "The container caps how wide the grid can grow." },
        { text: "On a 2,560 px monitor, the content stops at 1,200 px and the rest stays empty", bucket: 3, why: "The empty space appears because the container has reached its maximum width." },
      ],
    },
    {
      type: "choice",
      title: "Grid decisions",
      intro: "Pick the best layout decision for each situation.",
      items: [
        {
          prompt: "You're setting up the grid for a phone screen.",
          options: [
            "12 columns, the same as desktop",
            "4 columns with 16 to 24 px side margins",
            "A single column with no grid",
            "8 columns with no margins",
          ],
          answer: 1,
          why: "Four columns give enough flexibility on a narrow screen, for example two equal buttons side by side. A single column is tempting because phones are narrow, but you lose any shared structure for elements that sit next to each other.",
        },
        {
          prompt: "A long article sits on a 12-column grid at 1,440 px wide, and its text spans all 12 columns.",
          options: [
            "That's fine, because wider text means less scrolling",
            "Make the font bigger to fill the width",
            "Limit the text to about 6 to 8 columns, around 65 characters per line, and let images run wider",
            "Split the text into two newspaper-style columns",
          ],
          answer: 2,
          why: "Very long lines make it hard to find the start of the next line. Newspaper columns are tempting because they shorten lines, but on a scrolling screen they force readers to scroll down, back up and down again.",
        },
        {
          prompt: "Your web app has a navigation sidebar on the left. How should it relate to the grid?",
          options: [
            "Give the sidebar its own set width and put the grid inside the content area beside it",
            "Make it span exactly 2 of the 12 columns at every width",
            "Let it shrink with the window like the columns do",
            "Remove the sidebar so the grid can use the full width",
          ],
          answer: 0,
          why: "A sidebar holds navigation of a fairly fixed size, so it shouldn't stretch with the window. Spanning 2 columns is tempting because it keeps everything on one grid, but on wide screens the sidebar would grow uselessly wide and on small ones it would crush its labels.",
        },
        {
          prompt: "On a page that otherwise sits in a 1,200 px container, one product photo runs edge to edge across the full screen width.",
          options: [
            "It's always wrong, because everything must sit on the grid",
            "It's only acceptable on mobile",
            "It's fine, and every section should break out in its own way",
            "It's fine as a deliberate highlight, as long as everything else holds to the grid",
          ],
          answer: 3,
          why: "A single full-bleed image gains impact from the order around it. Breaking out in every section is tempting once you see how well one break works, but with no consistent grid, no break stands out.",
        },
      ],
    },
  ],
  journal: "Pick a website you like the look of. Screenshot it at full desktop width and work out its grid: how many columns, roughly how wide the gutters and margins are, and the width the content stops at. Note one place where it breaks the grid and why that might be deliberate.",
  terms: ["layout-grid", "grid-column", "gutter", "grid-margin", "container", "alignment", "full-bleed", "baseline-grid"],
});
