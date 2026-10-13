L({
  id: "web-anatomy",
  part: 4,
  n: 26,
  title: "How a website works, for designers",
  short: "What HTML, CSS and JavaScript each do, how boxes and flow shape a page, and the parts every site shares.",
  minutes: { read: 5, watch: 15, practice: 15 },
  body: `
## Three languages, three jobs

Every web page is built from three kinds of code, each with its own job.

- **HTML** is structure and meaning. It says "this is a heading, this is a button, this is the main content", and it is what screen readers and search engines read.
- **CSS** is presentation: colour, type, spacing and layout. It works through rules that select elements and style them, so one rule can restyle every button on a site.
- **JavaScript** is behaviour: responding to clicks, fetching data, opening menus and changing the page after it loads.

The browser reads the HTML and builds the **DOM** (Document Object Model), a tree of nested elements, then applies the CSS, works out where every box goes and paints the pixels. JavaScript can change the tree at any moment, and the browser redraws. React and Tailwind are ways of producing these three; the browser still receives HTML, CSS and JavaScript.

Meaning lives in HTML, so the button you draw must become a real button element to work with keyboards and screen readers (lesson 25). Look lives in CSS, so the tokens from lesson 18 become CSS variables the whole site reads. The C in CSS stands for **cascade**: when several rules target one element the more specific wins, and text styles such as font and colour pass from parent to child, so setting the font once styles almost everything.

## Everything is a box

The browser draws every element as a rectangle. The **box model** describes its layers from the inside out: content, padding, border, and the margin that keeps other boxes away. Lesson 9 used it for spacing; here is how it behaves in code.

[[fig:fig-box-model]]

Two details catch designers out. By default, the width you set applies to the content alone, so a 300-pixel card with 24 pixels of padding each side and a 1-pixel border ends up 350 pixels wide. Most modern sites switch to border-box sizing, where the width includes padding and border, which matches how design tools measure. And vertical margins between stacked blocks collapse: a 32-pixel margin below one paragraph and a 16-pixel margin above the next leave a 32-pixel gap, because only the larger one counts.

## Flow, layout and scrolling

Without layout instructions, elements follow **normal flow**. Block elements such as headings and paragraphs stack top to bottom at full width. Inline elements such as links and bold text sit inside lines and wrap like words.

For anything more, CSS has two main layout systems:

- **Flexbox** arranges items in one direction, a row or a column, and handles alignment and the space between them. Navigation bars and button groups are flexbox jobs.
- **CSS grid** arranges items in rows and columns at once. Page layouts and card galleries are grid jobs, and the columns and gutters from lesson 8 map straight onto it.

Positioning handles exceptions, such as a sticky header or a badge pinned to an avatar.

In Figma you draw a frame with a fixed width and height. On the web, the window sets the width and the content sets the height, and that is the deepest difference from a design tool. Text wraps, real names run longer than the sample and people enlarge their fonts, so the page grows downwards. You are designing rules that respond to content, and a mock-up is one snapshot of them.

## The fold, and why it moves

"Above the fold" comes from newspapers, where the top half of a folded broadsheet was what showed on the newsstand. The web has no single fold: the visible area depends on the device, the browser's toolbars and the window size.

People do scroll, though eye-tracking research from Nielsen Norman Group shows attention is highest at the top of a page and falls away lower down. So put the main message and action at the top, then give people a reason to continue. What most often stops scrolling is a **false floor**, a layout that looks finished at the bottom of the screen, such as a full-height hero with nothing peeking up from below.

> **Common mistake:** Cramming everything into the first screen because "people don't scroll", which leaves a crowded hero with no clear hierarchy. Let the top do one job well.

## Header, hero, sections, footer

Most websites share an anatomy, and each part has a job.

[[fig:fig-page-anatomy]]

- The **header** identifies the site and offers the main routes: a logo at top left that goes home, the primary navigation, and utilities such as sign-in.
- The **hero** opens the page with a headline that says what this is, a supporting line, a primary action and usually an image of the real thing (lesson 27).
- **Sections** each do one job, such as explaining a feature or showing proof, and each starts with a heading that sums it up. Space between sections should be clearly larger than space inside them (lesson 9).
- The **footer** is the safety net for people who reach the end: secondary links, contact details, legal pages and often a repeat of the main action.

> **Try it now:** Right-click a button on any website and choose Inspect. Hover over lines in the elements panel and watch the browser highlight each box's content, padding and margin.

## Using this with your AI tools

Knowing the three layers lets you ask for a fix in the right place. Structure problems ("this heading is the wrong level") are HTML, visual ones are CSS, and anything that happens over time is JavaScript. Ask for semantic elements by name (header, nav, main, section, footer, button) and for layout by system, such as "a CSS grid of cards with auto-fitting columns at least 280 px wide".

When you review, open the inspector. Check that buttons are button elements, that boxes use border-box sizing, and that spacing comes from your tokens. Then stress the content: paste in a name three times longer than the sample, make the window short and narrow, and see what breaks.

> **Prompt:** Build this page with semantic HTML (header with nav, main with one section per block, footer), CSS grid for the page layout, flexbox inside components, border-box sizing, and spacing only from our 8-point tokens.
`,
  takeaways: [
    "HTML is meaning, CSS is look, JavaScript is behaviour; fix each problem in the layer it belongs to.",
    "Every element is a box of content, padding, border and margin; use border-box sizing.",
    "The window sets the width and the content sets the height, so design for text that grows.",
    "There is no single fold: put the main message at the top and avoid false floors.",
    "Header, hero, sections, footer: give each part one clear job.",
  ],
  check: [
    {
      q: "A card is set to 300 px wide with 24 px of padding on each side and a 1 px border, using the browser's default content-box sizing. How wide is it on screen?",
      options: ["300 px", "324 px", "350 px", "348 px"],
      answer: 2,
      why: "Content-box adds padding and border outside the set width: 300 + 24 + 24 + 1 + 1 = 350. 300 px is the tempting answer because that is how border-box sizing, and design tools, measure it.",
    },
    {
      q: "Your site has a light and a dark theme. Where should each theme's colour values live?",
      options: [
        "In the HTML, as a colour attribute on each element",
        "In CSS, as variables that are swapped per theme",
        "In JavaScript, setting each element's colour as the page loads",
      ],
      answer: 1,
      why: "Colour is presentation, so it belongs in CSS, and variables let one switch restyle everything. JavaScript is tempting because a toggle is behaviour, and it may flip the theme, but the values themselves belong in CSS.",
    },
    {
      q: "A client insists every key message must sit 'above the fold'. What is the best response?",
      options: [
        "Explain that the fold differs by device; put the main message and action at the top and let the next section peek into view",
        "Agree, and shrink the type until everything fits on a laptop screen",
        "Make the hero exactly the height of the screen so the fold is always in the same place",
        "Add a bouncing 'scroll down' arrow and keep the layout",
      ],
      answer: 0,
      why: "There is no fixed fold, and people scroll when the top earns it. Shrinking everything to fit is tempting because it satisfies the request, but it wrecks hierarchy and still fails on a phone. A full-height hero creates a false floor.",
    },
  ],
  practice: [
    "lab-box-model",
    {
      type: "sort",
      title: "Which layer does the work",
      intro: "Sort each job into the layer of the web that should handle it.",
      buckets: ["HTML", "CSS", "JavaScript"],
      items: [
        { text: "Marking a line of text as the page's main heading", bucket: 0, why: "Meaning and structure belong in HTML; the heading's size is a separate CSS job." },
        { text: "Making every button's corners 8 px round", bucket: 1, why: "Visual styling, applied by one rule to every button." },
        { text: "Opening a menu when someone taps the menu button", bucket: 2, why: "Responding to an event and changing the page is behaviour." },
        { text: "Telling screen readers which part of the page is navigation", bucket: 0, why: "The nav element carries that meaning in the HTML." },
        { text: "Laying out product cards in a three-column grid", bucket: 1, why: "Layout is presentation, handled by CSS grid." },
        { text: "Checking whether a username is free as someone types", bucket: 2, why: "It needs to ask the server and update the page while the person types." },
        { text: "Switching the layout to one column on narrow screens", bucket: 1, why: "A media query in CSS changes layout by screen width with no script." },
        { text: "Giving a product photo its alternative text", bucket: 0, why: "Alt text is an attribute of the image element in the HTML." },
        { text: "Loading more results when you reach the end of a list", bucket: 2, why: "Fetching data and adding it to the page is behaviour." },
        { text: "Changing a link's colour when the pointer hovers over it", bucket: 1, why: "Hover styles are pure CSS." },
      ],
    },
    {
      type: "choice",
      title: "How the page behaves",
      intro: "Predict what the browser does, or pick the right tool for the layout.",
      items: [
        {
          prompt: "One paragraph has a 32 px bottom margin. The paragraph below it has a 16 px top margin. How big is the gap between them?",
          options: ["48 px", "32 px", "16 px"],
          answer: 1,
          why: "Vertical margins between stacked blocks in normal flow collapse, so only the larger one applies. This does not happen between items in a flexbox or grid layout.",
        },
        {
          prompt: "You need a header bar with the logo on the left, links on the right, all vertically centred.",
          options: ["Flexbox", "A 12-column CSS grid", "Absolute positioning for each link"],
          answer: 0,
          why: "It is a single row with alignment and space between, which is exactly what flexbox does. Absolute positioning breaks as soon as the content or window changes.",
        },
        {
          prompt: "A gallery of equal-width cards should form as many columns as fit, wrapping onto new rows.",
          options: ["A table", "Absolute positioning", "CSS grid"],
          answer: 2,
          why: "Grid handles rows and columns together and can auto-fit columns to the space. Flexbox can wrap too, but keeping columns aligned across rows is what grid is built for.",
        },
        {
          prompt: "Your hero is exactly the height of the screen with nothing visible below it, and analytics show few people scroll.",
          options: ["Shorten the hero so the next section peeks into view", "Make the hero taller so it feels more dramatic", "Add an autoplaying background video"],
          answer: 0,
          why: "A full-screen hero is a classic false floor: the page looks finished. A glimpse of the next section invites the scroll.",
        },
        {
          prompt: "The mock-up shows a customer's name on one line in a card, but real names can be much longer.",
          options: ["Fix the card's height and hide anything that overflows", "Let the card grow and test it with a long name", "Shrink the font until any name fits"],
          answer: 1,
          why: "On the web, content sets the height. Hiding overflow loses information, and shrinking text hurts legibility. Design for growth and test with real lengths.",
        },
      ],
    },
  ],
  journal: "Open a site you admire, use the inspector to find its header, main and footer, and check whether its buttons are real button elements. Write down one structural choice you would copy and one you would fix.",
  terms: ["semantic-html", "dom", "cascade", "box-model", "normal-flow", "flexbox", "css-grid", "false-floor"],
});
