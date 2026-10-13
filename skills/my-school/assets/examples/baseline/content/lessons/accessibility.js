L({
  id: "accessibility",
  part: 3,
  n: 25,
  title: "Designing for everyone",
  short: "The principles, numbers and quick tests that make a product usable by people of every ability and circumstance.",
  minutes: { read: 5, watch: 15, practice: 15 },
  body: `
## Who accessibility is for

**Accessibility** means people can perceive, understand and operate what you build, whatever their abilities and circumstances. The World Health Organization estimates that about 1.3 billion people, roughly one in six, live with a significant disability, and disability is often a mismatch between a person and a situation.

Microsoft's Inclusive Design toolkit calls this the **persona spectrum**: permanent, temporary and situational. Someone with one arm, someone with a broken wrist and a parent holding a baby all need a phone that works one-handed. Design for the permanent case and you solve the other two, the way dropped kerbs built for wheelchair users also help everyone with a pram or a suitcase.

## Four principles and the rules behind them

The **Web Content Accessibility Guidelines (WCAG)** group everything under four principles, known as **POUR**:

- **Perceivable.** People can sense the content: text alternatives for images, captions for video, enough contrast (lesson 12).
- **Operable.** Every control works by keyboard as well as pointer or touch, with enough time and nothing that could trigger a seizure.
- **Understandable.** Text is readable, behaviour is predictable, and forms help people avoid and fix mistakes.
- **R, for code that holds up.** The markup works with browsers and assistive technology, now and as they change.

Success criteria come in levels A, AA and AAA. AA is the usual target in contracts and law, and WCAG 2.2 (2023) is the current version. UK public sector sites must meet AA by law, and since June 2025 the European Accessibility Act has applied to many consumer products sold in the EU.

## Keyboard, focus and targets

Many people never use a mouse, including screen reader users and people with tremors. Everything must work from the keyboard: Tab and Shift+Tab move between controls, Enter and Space activate them, arrow keys move within menus and radio groups, and Escape closes dialogs.

- **Focus must be visible.** The **focus indicator** shows where the keyboard is. Removing the browser's outline without a replacement leaves keyboard users lost. Use a clear ring with at least 3:1 contrast; the focus-visible selector in CSS shows it to keyboard users and not on mouse clicks.
- **Focus order follows reading order.** Tabbing should move through the page the way the eye reads it.
- **Focus must not get lost.** A dialog should take focus when it opens, keep it while open and hand it back to the button that opened it. Sticky headers and cookie banners must not hide the focused element (new in WCAG 2.2).
- **Offer a skip link.** A **skip link** ("Skip to main content"), first in the tab order, lets keyboard users jump past the navigation.

For target size, WCAG 2.2 sets an AA minimum of 24 by 24 CSS pixels (smaller only with enough space around it) and 44 by 44 at AAA. Apple recommends 44 by 44 points and Material Design 48 by 48 dp. Treat 24 as the floor and the platform numbers as the target.

> **Common mistake:** AI tools often build buttons from div elements with a click handler. They look right, but Tab skips them, Enter does nothing and screen readers announce plain text. A real button or link gives you all of that free.

## Structure, images and media

Screen reader users rarely listen to a page from top to bottom. They jump between headings, landmarks and links, much as sighted people scan. Headings should form an outline (one h1, then h2 and h3 in order), so choose the level for the structure and set the size with CSS.

**Landmarks** are the page's regions, such as header, navigation, main content and footer. Marked up with the matching HTML elements, they let a screen reader user jump straight to the main content (lesson 26 maps them onto a page).

**Alt text** describes an image's purpose in its context. A product photo needs what a shopper would want to know ("Navy wool coat, knee length, with a belt"). An icon button needs its action, so a magnifying glass button is "Search". Decorative images get an empty alt so screen readers skip them, and charts need their main finding in text nearby.

Video needs **captions** of speech and important sounds, which also serve everyone watching on mute on a train, and audio needs a transcript.

> **Rule of thumb:** Native HTML first. ARIA attributes can describe roles and states to screen readers, but the W3C's own first rule of ARIA is not to use it when a native element does the job.

## Testing in fifteen minutes

Automated checkers such as Lighthouse, axe and WAVE catch only a minority of problems, mostly mechanical ones like missing alt attributes and low contrast. They cannot judge whether alt text is accurate or focus order makes sense, so add a manual routine.

1. Put the mouse away and complete a task with the keyboard alone, checking that focus is always visible and every dialog closes.
2. Zoom to 200 per cent, then narrow the window to about 320 pixels. Content should reflow into one column without sideways scrolling.
3. Turn on VoiceOver (Command+F5 on a Mac) or the free NVDA on Windows and listen to the headings. They should outline the page.
4. Switch on Reduce Motion (lesson 21) and dark mode, and check both.

## Using this with your AI tools

AI tools produce code that looks accessible far more often than code that is. Name the standard ("WCAG 2.2 AA") and ask explicitly for semantic HTML (real buttons and links, labelled inputs, headings in order, landmarks), visible focus at 3:1 contrast and alt text for each image.

Then verify, because the tool cannot. Run the keyboard test, paste an automated checker's report back for the tool to fix, and listen to the headings with a screen reader. In the code, look for divs with click handlers, outlines set to none, unnamed icon buttons and modals that let focus wander behind them.

> **Prompt:** Rebuild this modal to meet WCAG 2.2 AA: use a native dialog element, move focus into it on open, keep focus inside while open, close on Escape, return focus to the trigger on close, and give every icon button an accessible name.
`,
  takeaways: [
    "Design for the permanent case and you help the temporary and situational ones too.",
    "Everything must work by keyboard, with focus always visible and in reading order.",
    "Real buttons, links, headings and landmarks do most of the work; reach for ARIA last.",
    "24 px is the WCAG floor for targets; aim for 44 pt on iOS and 48 dp on Android.",
    "Automated checks find a minority of issues; the keyboard test and a screen reader find much of the rest.",
  ],
  check: [
    {
      q: "A designer removes the focus outline because it looks ugly when people click buttons with a mouse. What is the best fix?",
      options: [
        "Leave it removed, since keyboard users can follow the page anyway",
        "Remove it on mobile only",
        "Show a clear focus ring for keyboard users with the focus-visible selector, at 3:1 contrast or more",
        "Replace it with a subtle change in the button's text colour",
      ],
      answer: 2,
      why: "Focus-visible keeps the ring for keyboard users and hides it on mouse clicks, which solves the designer's complaint without harming anyone. The subtle colour change is tempting because it looks tidy, but it often fails the 3:1 contrast requirement and is easy to miss.",
    },
    {
      q: "A header has an icon-only button showing a magnifying glass that opens search. What should its accessible name be?",
      options: [
        "'Magnifying glass icon'",
        "'Search'",
        "None, because the icon is decorative",
        "'Image of a search button'",
      ],
      answer: 1,
      why: "The name should say what the button does. Describing the picture is the tempting choice, but a screen reader user needs the action, and the icon is not decorative because it is the only label the button has.",
    },
    {
      q: "A courier uses your delivery app outdoors in bright sun while wearing gloves. Which pair of changes helps them most?",
      options: [
        "Larger touch targets and stronger contrast",
        "Captions and transcripts",
        "A skip link and landmarks",
      ],
      answer: 0,
      why: "This is a situational impairment: glare lowers effective contrast, and gloves make fingers less precise. The same fixes help people with low vision and motor impairments. Skip links and landmarks are valuable, but they serve keyboard and screen reader users, which is not this courier's problem.",
    },
  ],
  practice: [
    "lab-focus",
    "lab-targets",
    {
      type: "sort",
      title: "Machine or human",
      intro: "Sort each problem by whether an automated checker can reliably catch it or a person has to judge it.",
      buckets: ["An automated checker can catch it", "Needs a human to judge"],
      items: [
        { text: "An image has no alt attribute at all", bucket: 0, why: "A missing attribute is visible in the code, so every checker flags it." },
        { text: "A product photo's alt text describes the wrong product", bucket: 1, why: "The attribute exists, so the tool is satisfied. Only a person can see the mismatch." },
        { text: "Grey body text on white at a contrast of 2.8:1", bucket: 0, why: "Contrast between flat colours is a calculation, which tools do well." },
        { text: "A form input has no label", bucket: 0, why: "A missing label association shows up in the code." },
        { text: "Tabbing jumps from the header to the footer, then back to the middle", bucket: 1, why: "Tools cannot judge whether focus order matches reading order. The keyboard test does." },
        { text: "Headings are in the right order but do not describe their sections", bucket: 1, why: "Structure can be checked automatically; meaning cannot." },
        { text: "The page does not declare its language", bucket: 0, why: "A missing language attribute is a simple code check." },
        { text: "A clickable div looks like a button but cannot be reached with Tab", bucket: 1, why: "Checkers often cannot see click handlers added by scripts, so this slips through unless you try the keyboard." },
        { text: "A video's captions are auto-generated and full of errors", bucket: 1, why: "A tool might confirm captions exist, but not that they are accurate." },
        { text: "A sticky cookie banner hides the button that has focus", bucket: 1, why: "This depends on scroll position and layout at the moment of focus, which you find by tabbing through the page." },
      ],
    },
  ],
  journal: "Put your mouse or trackpad aside and complete one real task on a site you use, such as booking something or changing a setting. Write down where focus disappeared, where you got stuck, and one thing the site did well.",
  terms: ["wcag", "pour", "persona-spectrum", "focus-indicator", "skip-link", "landmarks", "alt-text", "captions"],
});
