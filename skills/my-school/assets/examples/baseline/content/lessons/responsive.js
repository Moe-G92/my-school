L({
  id: "responsive",
  part: 4,
  n: 29,
  title: "Responsive design",
  short: "How one site adapts to every screen: mobile first, content-led breakpoints, fluid type, reflowing grids and touch.",
  minutes: { read: 5, watch: 15, practice: 15 },
  body: `
## One site for every screen

In 2010 Ethan Marcotte published "Responsive Web Design" in A List Apart. He described one site whose layout adapts to the space it is given, built from fluid grids, flexible images and media queries, in place of separate mobile and desktop sites. A **media query** is a CSS rule that applies only under certain conditions, such as a minimum screen width.

A year later Luke Wroblewski's book Mobile First argued for designing the small screen before the large one, and that became the standard way to work.

## Mobile first, in practice

**Mobile-first** design starts with the narrowest screen and adds layout as space allows. The reason is priority. A phone screen forces you to decide what matters most and in what order, the hierarchy work from lesson 7. Adding columns to a clear single-column page is easy; squeezing a crowded desktop layout onto a phone rarely works.

In CSS, the base styles describe the small-screen layout, and media queries with a minimum width add complexity as the screen widens.

- Order content for one column first, in the order people need it. Wider layouts can place things side by side but should keep that source order for keyboards and screen readers (lesson 25).
- Size type in rem, a unit relative to the reader's font setting, so their preferences are respected.
- Do not strip content from the phone version; people on phones want the same things.

Mobile first is a design method, and it makes no claim about who your users are. A dashboard for accountants may live mostly on big monitors, so check your analytics, then make sure it still works narrow.

## Breakpoints led by content

A **breakpoint** is a width where the layout changes. It is tempting to pick them from devices, like 768 pixels for an iPad, but there are thousands of screen sizes and they change every year. Set breakpoints where your content needs them: when lines of text pass about 75 characters (lesson 14), when cards get uncomfortably wide, or when the navigation no longer fits on one line.

[[fig:fig-breakpoints]]

Frameworks give you a starting set (Tailwind's defaults are 640, 768, 1024, 1280 and 1536 pixels), which is fine if you check what happens between them, because layouts usually break in the gaps. Cap the content width on large screens too, so text does not stretch across a wide monitor.

**Container queries** go a step further: a component changes its layout based on the width of its container. The same product card can stack in a narrow sidebar and sit side by side in the main column. All major browsers have supported them since 2023.

## Fluid type and reflowing grids

**Fluid type** scales smoothly with the screen instead of jumping at breakpoints. CSS does it with **clamp**, which takes a minimum, a preferred value and a maximum. In plain words: never smaller than this, never larger than that, and in between grow with the screen. A heading set to clamp(2rem, 1rem + 4vw, 3.5rem) is 2rem on a phone, 3.5rem on a large screen and scales between (one vw is 1 per cent of the window width). Keep a rem part in the middle value, because type sized only in vw ignores the reader's font setting and does not grow when they zoom. Body text can stay steady at around 16 to 18 pixels.

Grids reflow as space shrinks: four columns become two, then one. CSS grid can do this without breakpoints using auto-fit with a minimum column width, which means "as many columns as fit, each at least this wide". Sidebars move below the content or into a drawer. Wide tables can scroll sideways inside their own container. Images scale within their containers, and a different crop for small screens (**art direction**) keeps the subject in view.

> **Try it now:** On a site you use often, drag the browser window slowly from full width down to its narrowest. Note each point where the layout changes, and anything that looks broken between those points.

## Hover, touch and other inputs

Screen width says little about input: a tablet can have a trackpad and a laptop a touchscreen.

- **Hover does not exist on touch.** Anything revealed only on hover, such as the actions that appear over a card, is invisible on a phone or needs an awkward extra tap. Show essential actions all the time and treat hover as a bonus.
- CSS can ask about input directly. The hover and pointer media features report whether the main input can hover and whether it is fine, like a mouse, or coarse, like a finger. Use them for hover effects and target sizes instead of guessing from width.
- Touch targets need 44 pt on iOS and 48 dp on Android, with space between them (lesson 25).
- Use the right input types so phones show the right keyboard for email, phone numbers and numbers (lesson 20).

> **Common mistake:** AI-generated layouts often look fine at the three widths the tool previewed, then break at 900 px, scroll sideways at 320 px, or hide card actions behind hover. Drag through the whole range before you trust them.

## Using this with your AI tools

Name the method and the reasons in your prompt: mobile-first, the breakpoints and what triggers them ("two columns once each card can be at least 18rem"), container queries for components that appear at different widths, clamp for headings, a maximum content width, and no hover-only actions.

To review, open the browser's device toolbar and drag through every width from 320 to 1920 pixels. Look for sideways scrolling, lines longer than about 75 characters, navigation that wraps or collides, images that crop out their subject and controls that need hover. Zoom to 200 per cent. Then open it on your own phone, because a simulator cannot show you how it feels in the hand.

> **Prompt:** Make this page mobile-first: one column by default; a card grid that auto-fits columns at least 18rem wide; headings sized with clamp and a rem minimum; content capped at 72rem; no hover-only actions; 44 px minimum touch targets on coarse pointers.
`,
  takeaways: [
    "Design the narrow layout first; it forces a clear order of content.",
    "Put breakpoints where the content breaks, then test the widths in between.",
    "Clamp means never smaller than this, never larger than that, fluid between; keep a rem part.",
    "Let grids reflow: as many columns as fit, each at least a set width.",
    "Detect hover and pointer type instead of guessing from width, and never hide essentials behind hover.",
  ],
  check: [
    {
      q: "An article's text column widens with the window. At about 1,100 px, lines reach 95 characters. Where should the layout change?",
      options: [
        "At 768 px, because that is the classic iPad width",
        "Where lines pass about 75 characters, by capping the column width or adding a sidebar",
        "At 1,440 px, a common laptop width",
      ],
      answer: 1,
      why: "The content tells you where it breaks: long lines are hard to read, so that is where to act. Device widths are tempting because they are familiar, but they have nothing to do with when this particular layout fails.",
    },
    {
      q: "A heading uses clamp(1.5rem, 1rem + 2vw, 3rem). What size is it on a very wide monitor?",
      options: [
        "It keeps growing with the screen",
        "It drops back to 1.5rem",
        "It stops at 3rem",
        "It is exactly 2vw",
      ],
      answer: 2,
      why: "The third value is the ceiling: on a wide screen the middle value would exceed it, so clamp holds the heading at 3rem. 'Keeps growing' is tempting because of the vw part, but the maximum caps it.",
    },
    {
      q: "Cards in a project list show 'Edit' and 'Delete' only when you hover over them. What happens on a phone, and what is the fix?",
      options: [
        "The actions are hidden or need an awkward extra tap; show them all the time or in a visible menu, and keep hover as a bonus",
        "Nothing, because phones convert taps into hover perfectly",
        "People will discover them by long-pressing, so no fix is needed",
      ],
      answer: 0,
      why: "Touch has no hover, so hover-only controls vanish or behave unpredictably. Long-pressing is tempting to rely on, but nothing on the screen tells people to try it.",
    },
  ],
  practice: [
    "lab-responsive",
    {
      type: "sort",
      title: "Which tool responds",
      intro: "Sort each requirement by the CSS feature that should handle it.",
      buckets: ["Media query on screen width", "Container query", "Hover or pointer feature"],
      items: [
        { text: "Switch the whole page from one column to a sidebar layout on wider screens", bucket: 0, why: "It is a page-level change driven by the space in the window." },
        { text: "A product card that stacks in a narrow sidebar and sits side by side in the main column", bucket: 1, why: "The same component needs different layouts depending on where it is placed." },
        { text: "Play a hover underline animation only on devices that can hover", bucket: 2, why: "This depends on the input, which width cannot tell you." },
        { text: "Make tap targets bigger when the main pointer is a finger", bucket: 2, why: "A coarse pointer is the real signal, whatever the screen size." },
        { text: "Collapse the header links into a menu button below 900 px", bucket: 0, why: "The header spans the window, so the window's width decides when the links stop fitting." },
        { text: "A dashboard widget that shows a chart when wide and a single number when narrow, wherever it sits", bucket: 1, why: "The widget responds to its own space, so it works in any grid cell." },
        { text: "Increase the page's side margins on large monitors", bucket: 0, why: "A page-level adjustment to the overall window size." },
        { text: "A pricing table component reused both in a modal and on a full page", bucket: 1, why: "The modal is narrower than the screen, so the component must respond to its container." },
      ],
    },
    {
      type: "choice",
      title: "Responsive decisions",
      intro: "Choose what a careful designer would do.",
      items: [
        {
          prompt: "Writing the CSS for a page mobile-first, what goes in the base styles, outside any media query?",
          options: ["The single-column phone layout", "The full desktop layout, with overrides for small screens", "Nothing; a script detects the device and loads a layout"],
          answer: 0,
          why: "Mobile-first means the simplest layout is the default, and min-width media queries add to it as space grows.",
        },
        {
          prompt: "A data table with eight columns needs to work on a phone.",
          options: ["Shrink the text to 9 px so it fits", "Let it scroll sideways inside its own container, or show each row as a card", "Hide five of the columns on mobile"],
          answer: 1,
          why: "Both options keep all the data readable. Tiny text fails legibility, and hiding columns takes information away from phone users.",
        },
        {
          prompt: "A hero photo has the person on the far right. On phones the image is cropped to the centre, and the person disappears.",
          options: ["Hide the image on mobile", "Stretch the image to fit the narrow screen", "Supply a different crop for narrow screens that keeps the person in frame"],
          answer: 2,
          why: "This is art direction: the subject matters more than the frame. Stretching distorts it, and hiding it removes content.",
        },
        {
          prompt: "A developer sets body text to 1.2vw so it scales with the screen.",
          options: ["Size body text in rem, perhaps with a small clamp, and never in vw alone", "Good, fluid body text is always better", "Use 1.2vw on desktop and 4vw on mobile"],
          answer: 0,
          why: "On a 375 px phone 1.2vw is under 5 px, and vw-only text ignores the reader's font setting and zoom. Body text should stay steady and respect preferences.",
        },
        {
          prompt: "On a 2,560 px monitor, every section stretches edge to edge and paragraphs run to 200 characters a line.",
          options: ["Increase the font size until the lines look shorter", "Cap the content width and centre it", "Add a third column of text"],
          answer: 1,
          why: "A maximum width keeps lines in the readable 45 to 75 character range whatever the screen. Bigger text just makes a different problem.",
        },
      ],
    },
  ],
  journal: "Open one site on your phone and on a laptop. Write down three things that change between the two, one thing that should have changed and did not, and anything that only works with a mouse.",
  terms: ["responsive-design", "mobile-first", "breakpoint", "media-query", "container-query", "fluid-type", "clamp", "art-direction"],
});
