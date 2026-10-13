L({
  id: "icons-imagery",
  part: 2,
  n: 15,
  title: "Icons and imagery",
  short: "When icons help and when they confuse, how to keep a set consistent, and how to use photos and illustration with care.",
  minutes: { read: 5, watch: 10, practice: 18 },
  body: `
## What icons are good at

Icons are compact and, when people already know them, fast to recognise. That speed applies to a small set of familiar symbols: a magnifying glass for search, an X for close, a house for home, a gear for settings, play and pause. Outside that set, people guess. Usability research keeps finding that unlabelled icons for abstract actions get misread or ignored.

Even familiar icons are less universal than they look. The share icon is a box with an upward arrow on Apple platforms and three connected dots on Android. A heart means "like" on Instagram and "save to wishlist" on Airbnb. The floppy disk still means save decades after most people last touched one, because the convention outlived the object.

So the default is an icon with a text label, which is why phone tab bars put a short word under each icon. Icon-only buttons are fine for the universal few, and acceptable in dense tools people use every day, such as bold and italic in a text editor, as long as each has a tooltip on hover and keyboard focus. Every icon-only button also needs an accessible name for screen readers, or it is announced as just "button".

> **Rule of thumb:** If people would need a tooltip to understand an icon on a screen they visit only occasionally, give it a visible label.

## Drawing a consistent set

Icons are drawn on a grid, most often 24 by 24 px, with padding around a live area where the drawing sits. Material Design's system icons, for example, use a 24 dp grid with 2 dp of padding, leaving a 20 by 20 **live area**. Inside it, **keyline** shapes (a circle, a square and upright and wide rectangles) help different shapes carry the same visual weight. A circle has to be drawn slightly larger than a square to look the same size, because it has no corners.

[[fig:fig-icon-grid]]

A set feels like one family when it shares:

- one stroke weight, such as 1.5 or 2 px at 24 px
- one corner style and one line-end style, rounded or sharp
- one fill rule, such as outline everywhere except the active tab, which is filled
- one perspective, flat and front-on
- one optical size, so icons look equally big even when their bounding boxes differ

The easiest way to get there is one library for the whole product: Lucide, Heroicons, Phosphor, Material Symbols or Apple's SF Symbols. SF Symbols come in nine weights that match the San Francisco font, and Material Symbols is a variable font with axes for fill, weight, grade and optical size, the same idea you met in lesson 14.

Size icons to the text beside them (roughly 16 px icons with 14 to 16 px text, 20 px with 16 to 18 px) and align them by eye with the letters. Icons that carry meaning need 3:1 contrast against their background (lesson 12).

> **Common mistake:** AI tools often mix libraries on one screen: a 2 px rounded arrow from one set, a 1.5 px sharp gear from another, a filled star from a third. Each is fine alone; together they make the product feel assembled from spare parts.

## Photography and illustration

Images do jobs too. On an Airbnb listing the photos are the product, so they take most of the card. On a landing page, a photo should show the real product, place or people. Generic stock, such as a handshake or a team pointing at a laptop, tells visitors there was nothing specific to show.

For images inside an interface:

- Choose a few aspect ratios, such as 16:9 for heroes and 4:3 or 1:1 for cards, and crop to them so grids line up. In CSS, object-fit set to cover crops without stretching.
- Reserve each image's space before it loads, with its dimensions or an aspect ratio, so the text does not jump down when it arrives.
- Serve modern formats such as WebP or AVIF at the size actually displayed.
- Write **alt text** that says what the image communicates in context. Purely decorative images get empty alt text so screen readers skip them.

Illustration needs the same discipline as icons: one style, one line weight, colours from your palette (lesson 11). Generated images bring their own tells, such as warped hands, garbled lettering inside the picture and a glossy sameness. They can set a mood, but anything that claims to show your product or your customers should be real.

## Text on images

Text over a photo is a contrast problem that changes across the image. White text can pass over dark sky and fail over a bright cloud nearby. The fixes, from most to least reliable:

- Put the text beside the image or on a solid panel.
- Add a **scrim**, a dark gradient or translucent layer behind the text area.
- Choose or crop images with a calm, even area where the text sits.

Measure the ratio at the worst spot, where the text crosses the lightest part. Build the scrim into the component itself, because someone will swap the photo later.

> **Try it now:** Open a streaming or music app and find text laid over artwork. Look for the gradient or blur behind the words, and notice where it fades.

## Using this with your AI tools

Name the icon library, size and stroke in your prompt, and ask for labels by default. For images, fix the aspect ratios and require a scrim wherever text sits on a photo.

> **Prompt:** Use only Lucide icons at 20 px with a 1.5 px stroke, always with a visible text label except close, search and the menu button, which get an aria-label instead. Cards use 4:3 images with object-fit cover and reserved space. Hero text sits on a dark gradient scrim.

Then check the result. Search the code for imports from more than one icon package. Inspect the accessibility tree in DevTools for icon-only buttons with no name. View the hero with its brightest image. Ask the tool to list every image's alt text so you can judge them together.
`,
  takeaways: [
    "Only a handful of icons are understood without words; label the rest.",
    "Every icon-only button needs a tooltip for pointer users and an accessible name for screen readers.",
    "Use one icon library with one stroke weight, corner style and fill rule across the whole product.",
    "Crop images to a few fixed aspect ratios and reserve their space before they load.",
    "Text on a photo needs a scrim or a panel, checked for contrast at the brightest spot.",
  ],
  check: [
    {
      q: "A new SaaS toolbar has eight icon-only buttons. In testing, people hover over each one before clicking. What is the best fix?",
      options: [
        "Add tooltips to all eight",
        "Add visible labels, keeping icon-only buttons for universally known actions such as search and close",
        "Make the icons larger",
        "Replace the icons with more detailed illustrations",
      ],
      answer: 1,
      why: "Hovering to find out what each button does is the problem, so a tooltip only formalises it, and touch screens have no hover at all. Labels remove the guessing. Bigger or more detailed icons are still icons people have to decode.",
    },
    {
      q: "Your app's icons come from two libraries: some have 2 px rounded strokes, others 1.5 px strokes with sharp corners. What should you do?",
      options: [
        "Nothing, because people will not notice small stroke differences",
        "Resize the thinner icons until they look heavier",
        "Use sharp corners everywhere, because sharp corners are more legible",
        "Move to one library so stroke, corners and sizing match everywhere",
      ],
      answer: 3,
      why: "People feel the mismatch as a product that looks unfinished, even when they cannot say why. Scaling icons changes their size and stroke together and breaks the grid. Neither corner style is more legible; consistency is what matters.",
    },
    {
      q: "White hero text passes 4.5:1 over the dark part of a photo but fails where it crosses a bright cloud. What should you do?",
      options: [
        "Add a gradient scrim behind the text and check the ratio at the lightest point",
        "Measure contrast against the photo's average colour instead",
        "Add a faint text shadow",
        "Make the text bigger so it counts as large text",
      ],
      answer: 0,
      why: "Contrast fails where it is worst, so a scrim that darkens the whole text area is the dependable fix. An average colour hides the bright cloud. Large text only lowers the bar to 3:1, which a white-on-cloud crossing can still fail.",
    },
  ],
  practice: [
    "lab-icons",
    {
      type: "sort",
      title: "Icon alone or icon plus label",
      intro: "Decide whether each icon can stand alone, or needs a visible text label beside it.",
      buckets: ["Icon alone is fine", "Needs a visible label"],
      items: [
        { text: "Close (X) in the corner of a dialog", bucket: 0, why: "One of the few icons nearly everyone knows, and its position supports it." },
        { text: "Magnifying glass inside a search field", bucket: 0, why: "The field itself provides context, and the symbol is universal." },
        { text: "Play and pause on a video player", bucket: 0, why: "Decades of media players have made these unambiguous." },
        { text: "Volume control on a video player", bucket: 0, why: "The speaker symbol is widely known and sits in a familiar place." },
        { text: "Bold and italic in a text editor toolbar", bucket: 0, why: "Heavily used tools that people learn quickly. Give them tooltips and accessible names." },
        { text: "Export a report as CSV", bucket: 1, why: "There is no shared symbol for export formats, so people would guess." },
        { text: "Archive a conversation", bucket: 1, why: "Archive icons vary and are often confused with delete or download." },
        { text: "Items in a mobile app's bottom tab bar", bucket: 1, why: "Navigation must be clear at a glance, which is why both iOS and Material show labels in tab bars." },
        { text: "A sparkle icon that opens an AI summary", bucket: 1, why: "Sparkles have no settled meaning yet; products use them for many different AI features." },
        { text: "Duplicate a page", bucket: 1, why: "Copy and duplicate icons look alike across apps but mean different things." },
      ],
    },
    {
      type: "choice",
      title: "Imagery decisions",
      intro: "Choose the best response to each imagery problem.",
      items: [
        {
          prompt: "A recipe app's card grid shows photos uploaded by users in every shape, so card heights jump around.",
          options: [
            "Ask users to upload square photos only",
            "Crop every card image to one aspect ratio with object-fit cover",
            "Let cards size to the photo for an organic look",
          ],
          answer: 1,
          why: "A fixed ratio with cover cropping keeps the grid aligned whatever people upload. Rules for uploaders are rarely followed, and a ragged grid makes scanning harder.",
        },
        {
          prompt: "Your landing page hero shows a stock photo of a team high-fiving around a laptop.",
          options: [
            "Replace it with a real screenshot of the product in use, or real customers",
            "Keep it, because it shows energy",
            "Add a colour filter so it matches the brand",
          ],
          answer: 0,
          why: "Visitors recognise generic stock instantly, and it tells them nothing about your product. A real screenshot shows what they will actually get.",
        },
        {
          prompt: "A decorative wave shape separates two sections of a page.",
          options: [
            "Alt text: decorative wave illustration",
            "Alt text describing its colours and shape",
            "Empty alt text so screen readers skip it",
          ],
          answer: 2,
          why: "Decoration carries no information, so describing it only adds noise for screen reader users. Empty alt text tells assistive technology to skip it.",
        },
        {
          prompt: "Product images on a listing page load late and push the text down as they arrive.",
          options: [
            "Lazy-load the text as well",
            "Reserve each image's space with its dimensions or an aspect ratio",
            "Show a spinner in place of the page until all images load",
          ],
          answer: 1,
          why: "When the browser knows the image's shape in advance, it holds the space and nothing jumps. Hiding the page behind a spinner trades one problem for a slower one.",
        },
      ],
    },
  ],
  journal: "Look at the tab bar or toolbar of an app you use daily. List each icon, what you think it does before tapping it, and whether it has a label. Note any icon you only learned by trial and error.",
  terms: ["icon-grid", "live-area", "keyline", "alt-text", "scrim", "aspect-ratio"],
});
