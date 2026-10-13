L({
  id: "type-basics",
  part: 2,
  n: 13,
  title: "Typography: anatomy and families",
  short: "The parts of a letter, the main type families, and the features that make a typeface work in an interface.",
  minutes: { read: 5, watch: 12, practice: 15 },
  body: `
## Why type carries the interface

Strip the colour and images from almost any app and most of what remains is text. Typography decides how that text looks, and it does two jobs at once. It has to be legible, so people recognise each letter quickly, even small and on a poor screen. It also sets a voice, so the same words can feel like a bank, a children's game or a developer tool.

In the 1930s the typographer Beatrice Warde compared good type to a crystal goblet, a clear glass that shows off the wine instead of decorating itself. For interface text that is still the right default. Break it on purpose, in a logo or a big headline, where the type is part of the message.

## The anatomy of a letter

Letters sit on an invisible line called the **baseline**. The height of a lowercase x is the **x-height**, and capitals reach the **cap height**. Ascenders are the parts of h, k and d that rise above the x-height; descenders are the parts of g, p and y that drop below the baseline.

[[fig:fig-type-anatomy]]

A few more terms you will meet:

- **Counter**: the enclosed or partly enclosed space inside a letter, such as the hole in o.
- **Aperture**: the opening of a partly closed letter, like the gap in c, e or a. Open apertures keep letters distinct at small sizes; closed ones make c, e and o look alike.
- **Stroke contrast**: the difference between the thick and thin parts of each stroke.
- **Serif**: the small finishing stroke at the end of a main stroke. A stroke end without one is a terminal.

The x-height matters most in UI. Font size sets the height of an invisible box, the em square, that every glyph is drawn inside, and each designer decides how much of that box the lowercase letters fill. Two typefaces at 16 px can look like different sizes because one has a taller x-height. Faces made for screens, such as Verdana (designed by Matthew Carter for Microsoft) and Inter, use generous x-heights so small text stays readable.

> **Try it now:** Type "Il1 O0 rn m" into a notes app or document and switch between a few fonts. In some, the capital I, lowercase l and number 1 are almost identical, and "rn" can pass for "m". That matters wherever people read passwords, codes or email addresses.

## Families and classifications

Typefaces fall into broad classes. The names are older than computers, and they still predict how type behaves on screen.

- **Serif** faces have finishing strokes. Old-style serifs like Garamond have gentle stroke contrast and feel bookish. Transitional faces like Baskerville and Georgia sit in the middle. Didone faces like Bodoni and Didot have extreme contrast, with hairline strokes that look elegant on a magazine cover and break up at small sizes on screen. Slab serifs like Rockwell have heavy, square serifs and little contrast.
- **Sans-serif** faces have no serifs. Neo-grotesques like Helvetica and Arial look neutral and have fairly closed apertures. Humanist sans faces like Gill Sans, Frutiger and Open Sans follow the shapes of handwriting, with open apertures that survive small sizes; Frutiger was drawn for the signs at Paris Charles de Gaulle airport, where people read at a distance and on the move. Geometric sans faces like Futura are built from circles and straight lines, crisp in headlines, though a single-storey a and a round o can blur together in small text.
- **Monospace** faces give every character the same width, which suits code, where columns must line up, and reference codes, where every character must be read exactly.
- **Display** and script faces are made for large sizes such as logos and headlines. They rarely work for body text or labels.

## Fonts, weights and styles

A typeface is the design; a font is one specific weight and style of it, and a family is the whole set. CSS names weights from 100 to 900, with 400 as regular and 700 as bold. True italics are redrawn letters, often with different shapes; obliques are the upright letters slanted.

Ask for a weight or style that has not been loaded and the browser fakes it, thickening regular letters for bold and slanting them for italic. Load every weight and style you use, and only those, because each file adds download time.

> **Common mistake:** Importing only the regular weight of a web font, then styling headings and buttons as bold. The design file looked fine because the real bold was installed on the designer's machine; the live site shows a muddy fake.

## Choosing a typeface for interfaces

For the text that runs the interface, look for:

- a generous x-height and open apertures
- clearly different I, l and 1, and O and 0
- at least regular, medium or semibold, and bold weights
- tabular figures, which line numbers up in tables (more in lesson 14)
- glyphs for every language you serve, such as Polish ł or Vietnamese stacked accents
- a licence that covers web and app use

The system fonts tick most of these boxes: San Francisco on Apple devices, Segoe UI on Windows and Roboto on Android. Inter, IBM Plex Sans and Source Sans do too. Save personality faces for headlines.

## Using this with your AI tools

AI tools pick fonts from habit: Inter or the system stack for everything, or a trendy display face pasted onto body text. Give each typeface a role and name the qualities you need.

> **Prompt:** Use Inter for all UI text, loading only weights 400, 500, 600 and 700, with tabular figures in tables and prices. Use Fraunces only for page headings of 32 px and above. Set font-synthesis to none so the browser never fakes bold or italic.

Then check the result. In DevTools, filter the Network tab by font to see which files load, and inspect the computed font on a heading and on the smallest label. Zoom in on bold text to spot faux bold. Type "Il1 O0" into a text field. If a display face has crept into buttons or labels, send it back to headings.
`,
  takeaways: [
    "Font size sets an invisible box; the x-height decides how big text actually looks.",
    "For small interface text, choose a tall x-height, open apertures and clearly different I, l, 1, O and 0.",
    "Didone and display faces belong in headlines; humanist and screen-made sans faces carry interface text.",
    "Load every weight and style you use, and only those, so the browser never fakes bold or italic.",
    "Use monospace for code and for anything people must read or copy character by character.",
  ],
  check: [
    {
      q: "You set two typefaces at 16 px side by side. One looks noticeably bigger. What is the most likely reason?",
      options: [
        "The browser rounded one of them to 17 px",
        "Serif typefaces always look larger than sans-serif ones",
        "One has a taller x-height, so its lowercase letters fill more of the same em box",
        "One has wider default letter spacing",
      ],
      answer: 2,
      why: "Font size sets the em box, and each designer decides how much of it the lowercase letters fill. A taller x-height makes text look bigger and read better when small. Letter spacing changes width, but people judge size mostly from the height of the lowercase.",
    },
    {
      q: "You are choosing a typeface for dense 12 to 13 px labels in an analytics dashboard. Which is the best fit?",
      options: [
        "A Didone serif with hairline strokes, for a premium feel",
        "A sans with a tall x-height, open apertures and tabular figures",
        "A geometric display sans with a single-storey a",
        "A script face, to soften the numbers",
      ],
      answer: 1,
      why: "Small sizes need a tall x-height and open apertures so letters stay distinct, and tabular figures keep columns of numbers aligned. The Didone is the trap. It looks refined in a large heading, but its hairlines break up at small sizes on screen.",
    },
    {
      q: "Headings look smudged and uneven in the browser, although they looked crisp in Figma. The CSS asks for font-weight 700. What is the likely cause?",
      options: [
        "Only the regular weight was loaded, so the browser is faking bold",
        "The screen's pixel density is too low",
        "Headings need extra letter spacing to render properly",
        "Bold weights always render worse on the web than in design tools",
      ],
      answer: 0,
      why: "When a requested weight is missing, browsers synthesise it by thickening the strokes of the nearest weight, which looks muddy. Figma used the real bold installed on your machine. Load the 700 file, or a variable font that covers it. Pixel density affects sharpness, but it does not change letter shapes.",
    },
  ],
  practice: [
    "lab-type-anatomy",
    {
      type: "sort",
      title: "Sort the typefaces",
      intro: "Put each typeface in its family. If you do not know one, look it up and notice the feature that decides it.",
      buckets: ["Serif", "Slab serif", "Sans-serif", "Monospace"],
      items: [
        { text: "Garamond", bucket: 0, why: "An old-style serif with gentle stroke contrast, common in books." },
        { text: "Georgia", bucket: 0, why: "A transitional serif drawn by Matthew Carter for screens." },
        { text: "Bodoni", bucket: 0, why: "A Didone serif with extreme thick-thin contrast and hairline serifs." },
        { text: "Rockwell", bucket: 1, why: "Heavy, square serifs and almost no stroke contrast make it a slab." },
        { text: "Roboto Slab", bucket: 1, why: "The slab-serif member of the Roboto family." },
        { text: "Helvetica", bucket: 2, why: "A neo-grotesque sans with fairly closed apertures." },
        { text: "Inter", bucket: 2, why: "A sans drawn for screens, with a tall x-height." },
        { text: "Futura", bucket: 2, why: "A geometric sans built from circles and straight lines." },
        { text: "Gill Sans", bucket: 2, why: "A humanist sans based on classical letter shapes." },
        { text: "JetBrains Mono", bucket: 3, why: "Every character has the same width, designed for code." },
        { text: "IBM Plex Mono", bucket: 3, why: "The monospaced member of the IBM Plex superfamily." },
        { text: "SF Mono", bucket: 3, why: "Apple's monospaced face, used in Xcode." },
      ],
    },
    {
      type: "choice",
      title: "Pick the face for the job",
      intro: "Each scenario needs a different kind of typeface. Choose the best fit.",
      items: [
        {
          prompt: "Your app shows booking references like K7lI0O that customers read out over the phone or type into another system.",
          options: [
            "A geometric sans like Futura, to look modern",
            "A monospace face, or a sans with clearly different I, l, 1, O and 0",
            "A Didone serif, to look premium",
          ],
          answer: 1,
          why: "Every character must be read exactly, so distinct shapes matter more than style. Even better, remove ambiguous characters from the codes themselves.",
        },
        {
          prompt: "A long-form reading page for essays of 2,000 words or more.",
          options: [
            "A text serif such as Georgia, or a humanist sans, at a comfortable size",
            "A condensed display sans, to fit more words per line",
            "A monospace face, so every line has an even texture",
          ],
          answer: 0,
          why: "Long reading needs faces designed for continuous text. Condensed display faces tire the eye quickly, and monospace spacing makes prose uneven and slow.",
        },
        {
          prompt: "A children's learning app wants friendly headings without hurting readability.",
          options: [
            "The same script face for headings and body text",
            "A Didone serif for everything",
            "A rounded or geometric sans for headings, with a highly legible sans for body text and labels",
          ],
          answer: 2,
          why: "Personality belongs in the large headings, where letters have room. Body text and labels still need open, legible shapes, especially for early readers.",
        },
        {
          prompt: "Prices in a comparison table look ragged, and a live total jitters sideways as the digits change.",
          options: [
            "Switch the whole page to a monospace font",
            "Turn on tabular figures for those numbers",
            "Make the numbers bold",
          ],
          answer: 1,
          why: "Tabular figures give every digit the same width, so columns align and changing numbers stay still, without making the rest of the page look like code.",
        },
      ],
    },
  ],
  journal: "Open the app you used most today and find its smallest text, such as a timestamp or caption. Write down whether it is serif or sans, how tall its x-height feels, and whether I, l and 1 would be easy to tell apart in it.",
  terms: ["baseline", "x-height", "cap-height", "counter", "aperture", "serif", "sans-serif", "monospace"],
});
