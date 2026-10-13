/* Baseline: the design school this skill was born from (learner details anonymised). A complete example of a site.config.js. */
const AUDIT = [
  ["First impression", [["The page says what it is and who it's for within five seconds", "Ask someone who hasn't seen it, or cover everything but the top screen."], ["There is one obvious primary action per screen", "Squint: the main button should still be the darkest or brightest shape."], ["The reading order matches importance", "Name what you see first, second, third."]]],
  ["Layout and spacing", [["Spacing values come from one scale", "Look for odd values like 13px or 22px in the CSS or generated code."], ["Related items sit closer than unrelated ones", "Labels near their fields, headings near their sections."], ["Edges line up on a grid", "Turn on a grid overlay or draw vertical guides."], ["Nothing touches the screen edge on mobile", "At least 16px side gutters at 375px wide."]]],
  ["Type", [["Two typefaces at most", "Hierarchy comes from size, weight and colour."], ["Body text is 16px or larger and lines are 45 to 75 characters", "Measure a paragraph on desktop."], ["Headings use tighter line height than body", "Around 1.1 to 1.25 for big headings."]]],
  ["Colour", [["Text contrast is at least 4.5:1, large text and UI parts at least 3:1", "Check muted greys and text on brand colours."], ["Colour is never the only signal", "Errors, status and charts also use icons, text or patterns."], ["The accent colour is rare enough to mean something", "Count how many things on screen use it."], ["Dark mode is designed, not inverted", "Check shadows, borders and saturated colours in dark."]]],
  ["Components and states", [["Every interactive element has hover, focus, pressed and disabled states", "Tab through the page with the keyboard."], ["Buttons say what happens", "“Create account”, not “Submit”."], ["Loading, empty and error states exist for every data view", "Turn off the network and clear the data."], ["Destructive actions ask for confirmation or offer undo", "Try deleting something."]]],
  ["Mobile and touch", [["Tap targets are at least 44 by 44", "Small icons need padded tap areas."], ["Frequent actions are within thumb reach", "Hold the phone in one hand and try."], ["Forms use the right keyboards and autofill", "Email, phone and one-time codes."]]],
  ["Accessibility", [["Everything works with the keyboard alone, with a visible focus ring", "Unplug the mouse for five minutes."], ["Images that carry meaning have alt text", "Decorative ones have empty alt."], ["Headings form a logical outline", "One h1, then h2s in order."], ["Motion respects reduced-motion settings", "Turn it on in your OS and reload."]]],
  ["Polish", [["Favicon, page titles and social preview image are set", "Paste the link into a chat app."], ["Copy is specific, consistent and free of placeholder text", "Search for lorem, TODO and ‘Click here’."], ["The page feels fast: content appears in under a second, with skeletons for slow parts", "Throttle the network in dev tools."]]],
];

const SITE = {
  id: "baseline",
  name: "Baseline",
  tagline: "A design school for one",
  title: "Baseline Design School",
  description: "A personal design school: forty lessons on UI and UX fundamentals with labs, curated media, a journal and an AI coach.",
  lang: "en-GB",
  subject: "UI/UX design: colour, type, layout, components, interaction, UX psychology and process, applied to websites, mobile apps, dashboards, AI interfaces, desktop apps, wearables, TV and voice",
  learner: {
    name: "Sam",
    profile: "who builds websites and apps with AI coding tools and is now learning the fundamentals and philosophy of design, and learns best visually",
    goal: "understand why designs work, and direct AI tools with real design vocabulary",
  },
  voice: "British spelling. Plain, direct, specific.",
  fonts: ["https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Atkinson+Hyperlegible+Mono:wght@400;600&family=Atkinson+Hyperlegible+Next:ital,wght@0,200..800;1,200..800&family=Source+Serif+4:opsz,wght@8..60,400..700&display=swap"],
  heroLede: "A design school for one. Learn how interfaces work, from colour, type and layout to apps, dashboards and voice, by reading, listening, watching and doing.",
  parts: [
    [1, "How design thinks", "Philosophy, process and people"],
    [2, "Seeing", "Perception, layout, colour, type"],
    [3, "Behaviour", "Components, interaction, UX"],
    [4, "Websites", "The web as a medium"],
    [5, "Mobile apps", "Thumbs, platforms, flows"],
    [6, "Other screens", "Data, AI, desktop, TV, voice"],
    [7, "Practice", "Critique and taste"],
  ],
  labels: {
    notes: "Field notes", noteSingular: "Field note", notesTitle: "Short essays on the philosophy of design", notesLede: "One idea each, readable in two minutes. Good with a coffee, or read aloud on a walk.",
    pathLede: "Work through in order, or jump to what you need. At 30 to 60 minutes a day, five days a week, it takes about eight weeks.",
    practiceTitle: "The lab bench", practiceLede: "Each one teaches a principle by letting you push it until it breaks.",
    journalTitle: "Your design journal", journalLede: "Designers train their eye by noticing. Write down what works and what doesn't, a few sentences at a time.",
    promptTitle: "Notice one thing today",
    askLede: "Any design question, about this course or your own product.", askPlaceholder: "How do I make my pricing page clearer?",
    coachTitle: "Ask anything about design", reviewLink: "Or upload a screenshot for a critique",
    searchHint: "Try “contrast”, “thumb”, “tokens” or “Fitts”.",
  },
  callouts: { "Prompt": ["prompt", "prompt"] },
  coach: {
    enabled: true,
    role: "a senior product designer",
    extra: "When the learner is building with AI tools, give them the exact wording to put in their prompt.",
    suggestions: [
  "Why does my landing page feel cluttered, and how do I fix it?",
  "How do I choose a font pairing for a SaaS app?",
  "Explain OKLCH to me like I'm a developer.",
  "What should a good settings page look like?",
  "How do I brief an AI coding tool so it doesn't make generic-looking UI?",
  "When should I use a modal versus a new page?",
  "How do I make my app feel faster without making it faster?",
  "What makes a dashboard useful rather than decorative?"
],
  },
  review: {
    enabled: true,
    tab: "Critique a screenshot", title: "Get a critique", action: "Critique it",
    image: true, text: false,
    imagePrompt: "Drop a screenshot here, or choose a file",
    imageHint: "PNG or JPEG of a page or screen you made. Full-page captures work best cropped to one screen.",
    kinds: ["Landing page", "Web app screen", "Mobile app screen", "Dashboard", "Form or checkout", "Settings page", "Email", "Other"],
    focus: ["Overall", "Hierarchy", "Layout and spacing", "Colour and contrast", "Typography", "Copy", "Accessibility", "Mobile"],
    goalLabel: "Who is it for, and what should they do?", goalPlaceholder: "First-time home buyers; book a viewing",
    role: "a senior product designer",
    sections: "## First read\nTwo sentences: what the screen communicates in the first five seconds, and whether that matches the goal.\n## What works\nTwo or three specific bullets.\n## Fix these first\nA numbered list of the three to five highest-impact problems, most important first. For each: the problem in bold in one line, the principle it breaks (for example visual hierarchy, proximity, contrast below 4.5:1, Fitts's law), and the concrete fix with numbers where possible.\n## Quick wins\nTwo to four small changes that take minutes.\n## Try this prompt\nOne blockquote with a prompt the learner can paste into their AI coding tool to apply the top fixes.",
  },
  prompts: [
  "Find an interface that made you wait today. What did it show you while you waited, and did that help?",
  "Open the app you used most today. Name its three levels of hierarchy on the home screen.",
  "Find a button whose label doesn't say what it does. Rewrite it.",
  "Notice a door, tap or switch today. Did its shape tell you how to use it?",
  "Find a form you filled in recently. Which fields could have been removed?",
  "Look at a website you like. Guess three values from its spacing scale.",
  "Find an error message. Does it say what went wrong and how to fix it?",
  "Pick one app's colours. Name its neutral, its primary and its accent.",
  "Find an icon you couldn't understand without its label.",
  "Notice an animation today. Was it feedback, orientation, or decoration?",
  "Find something on a screen that is too small to tap comfortably.",
  "Pick any page and squint at it. What survives the blur?",
  "Find an empty state: no results, an empty inbox, a new account. Does it help you take the next step?",
  "Find a notification that wasn't worth interrupting you for. What would have been better?",
  "Look at a menu with lots of options. How is it organised, and could you predict where things are?",
  "Look at the typeface of a site you visited. Describe its personality in three words.",
  "Find a dark mode that feels designed and one that feels like an inverted light mode.",
  "Find a stats or dashboard screen. What is the first question it answers?",
  "Look at an onboarding flow. What did it ask for before it gave you any value?",
  "Find a confirmation dialog. Is the safe option the easy one?",
  "Notice a sign or label in the physical world that confused you. Why did it fail?",
  "Look at a product page. What persuaded you, and what made you hesitate?",
  "Use a website with only your keyboard for two minutes. Where did you get lost?",
  "Look at an AI chat interface. How does it show it's working, and how do you stop it?",
  "Find two apps that do the same job. Which feels calmer, and why?",
  "Find a setting buried too deep. Where would you have looked for it?",
  "Find a table of numbers. Are the digits aligned so you can compare them?",
  "Find one delightful detail in an interface. Was it also useful?",
  "Pick one screen of your own product. Write the one thing you'd change first.",
  "Find a design you dislike. Argue in its favour for three sentences."
],
  labGroups: [["Seeing and layout", ["Seeing", "Layout", "Imagery", "Surfaces"]], ["Colour", ["Colour"]], ["Type", ["Type"]], ["Interaction and UX", ["Components", "Systems", "Forms", "Motion", "Psychology", "Usability", "Accessibility"]], ["Platforms", ["Web", "Mobile", "Data", "Other screens"]], ["Review your work", ["Review"]]],
  reference: [
    { id: "numbers", title: "Numbers", heading: "The numbers designers use", lede: "Pin this. Each value links to the lesson that explains it.", type: "facts", data: [
  [
    "Contrast (WCAG 2.2)",
    "contrast",
    [
      [
        "4.5:1",
        "Minimum for body text (level AA)."
      ],
      [
        "3:1",
        "Large text: at least 24px, or 18.66px bold (AA)."
      ],
      [
        "3:1",
        "Icons, input borders, focus indicators and chart parts that carry meaning (AA)."
      ],
      [
        "7:1",
        "Body text at the stricter AAA level; 4.5:1 for large text."
      ]
    ]
  ],
  [
    "Touch and click targets",
    "accessibility",
    [
      [
        "24 × 24 px",
        "WCAG 2.2 AA minimum target size (SC 2.5.8), or enough spacing around a smaller target."
      ],
      [
        "44 × 44 pt",
        "Apple's recommended minimum on iOS and iPadOS."
      ],
      [
        "48 × 48 dp",
        "Material Design's recommended minimum on Android."
      ],
      [
        "44 × 44 px",
        "WCAG AAA target size (SC 2.5.5). A sensible default on the web."
      ]
    ]
  ],
  [
    "Text",
    "type-systems",
    [
      [
        "16 px",
        "Browser default body size. Treat it as the floor for body text on the web."
      ],
      [
        "17 pt",
        "iOS default body size (Dynamic Type, Large)."
      ],
      [
        "45–75",
        "Characters per line for comfortable reading; about 66 is the classic ideal."
      ],
      [
        "1.4–1.6",
        "Line height for body text. Headings sit tighter, around 1.1–1.25."
      ],
      [
        "2",
        "Typefaces is plenty. Hierarchy comes from size, weight and colour."
      ]
    ]
  ],
  [
    "Type scale ratios",
    "type-systems",
    [
      [
        "1.125–1.2",
        "Tight scales for dense apps and dashboards."
      ],
      [
        "1.25",
        "Major third. A balanced default for most products."
      ],
      [
        "1.333–1.5",
        "Perfect fourth to fifth. Editorial and marketing pages."
      ],
      [
        "1.618",
        "Golden ratio. Dramatic; you'll use only the lower steps."
      ]
    ]
  ],
  [
    "Spacing",
    "spacing",
    [
      [
        "4 / 8",
        "Base units. Pick every gap from a scale like 4, 8, 12, 16, 24, 32, 48, 64, 96."
      ],
      [
        "16 px",
        "Minimum side gutter on phones."
      ],
      [
        "internal ≤ external",
        "Space inside a group is smaller than the space between groups."
      ],
      [
        "2×",
        "A good starting gap between groups relative to the gap within them."
      ]
    ]
  ],
  [
    "Layout grids",
    "layout-grid",
    [
      [
        "12",
        "Columns on desktop: divides into halves, thirds, quarters and sixths."
      ],
      [
        "8 / 4",
        "Columns on tablets / phones (Material's responsive grid)."
      ],
      [
        "16–24 px",
        "Typical gutters."
      ],
      [
        "~1200–1440 px",
        "Common maximum content width. A reading column is narrower, about 640–720 px."
      ]
    ]
  ],
  [
    "Breakpoints",
    "responsive",
    [
      [
        "< 600 dp",
        "Material 3 compact window: phones in portrait."
      ],
      [
        "600–839 dp",
        "Medium: tablets in portrait, foldables."
      ],
      [
        "840–1199 dp",
        "Expanded: tablets in landscape, small laptops."
      ],
      [
        "640 / 768 / 1024 / 1280",
        "Tailwind's default breakpoints, common in AI-generated code. Set breakpoints where your content breaks, not at device sizes."
      ]
    ]
  ],
  [
    "Motion",
    "motion",
    [
      [
        "100–200 ms",
        "Micro-interactions: hover, press, toggles."
      ],
      [
        "200–300 ms",
        "Small transitions: menus, dropdowns, tooltips."
      ],
      [
        "300–500 ms",
        "Large moves: full-screen panels, page transitions."
      ],
      [
        "ease-out",
        "For things entering; ease-in for things leaving; linear only for progress and continuous loops."
      ]
    ]
  ],
  [
    "Response times",
    "laws",
    [
      [
        "0.1 s",
        "Feels instant. Direct manipulation must respond this fast."
      ],
      [
        "~0.4 s",
        "The Doherty threshold: keep system responses under this and people stay in flow."
      ],
      [
        "1 s",
        "The limit for keeping a train of thought. Beyond it, show progress."
      ],
      [
        "10 s",
        "The limit of attention. Beyond it, show percent done and let people do something else."
      ]
    ]
  ],
  [
    "Icons",
    "icons-imagery",
    [
      [
        "24 × 24",
        "The common icon grid, with 2 px of padding around a 20 × 20 live area."
      ],
      [
        "2 px",
        "A common stroke weight at 24 px. Keep one weight across the set."
      ],
      [
        "16 / 20 / 24 / 32",
        "Typical icon sizes. Pair each with a matching text size."
      ]
    ]
  ],
  [
    "Mobile chrome",
    "ios-android",
    [
      [
        "3–5",
        "Destinations in an iOS tab bar or an Android navigation bar."
      ],
      [
        "49 pt",
        "Height of the standard iOS tab bar (plus the home indicator area below it)."
      ],
      [
        "80 dp",
        "Height of the Material 3 navigation bar."
      ],
      [
        "56 dp",
        "Size of a standard Material 3 floating action button."
      ]
    ]
  ],
  [
    "Testing",
    "research",
    [
      [
        "5",
        "Users per round of usability testing find most of the big problems. Test small and often."
      ],
      [
        "5 s",
        "The five-second test: show a screen, hide it, ask what it was for."
      ],
      [
        "3 m",
        "Roughly the distance people sit from a TV. Design TV interfaces for it."
      ],
      [
        "5%",
        "TV safe area: keep content about 5% in from each edge (on Android TV, 48 dp left and right, 27 dp top and bottom)."
      ]
    ]
  ]
] },
    { id: "glossary", title: "Glossary", type: "glossary" },
    { id: "laws", title: "Laws of UX", heading: "Laws of UX", lede: "Findings from psychology that explain why some interfaces feel easy. Use them as lenses, not commandments.", type: "cards", data: [
  [
    "Fitts's law",
    "The time to hit a target depends on its distance and size.",
    "Make primary targets big and close to where the pointer or thumb already is. Screen edges and corners are easy mouse targets.",
    "laws"
  ],
  [
    "Hick's law",
    "Decision time grows with the number and complexity of choices.",
    "Cut options people don't need, group the rest, and give a recommended default. Ordered lists (alphabetical, by frequency) speed scanning.",
    "laws"
  ],
  [
    "Jakob's law",
    "People spend most of their time on other sites and apps, so they expect yours to work the same way.",
    "Use familiar patterns for navigation, forms and checkout. Be original where it adds value, not in where the search box lives.",
    "laws"
  ],
  [
    "Miller's law, with care",
    "Working memory holds only a few chunks at once. The famous “7 ± 2” is often misapplied; modern estimates are nearer 4.",
    "Don't make people remember things across screens. It is not a rule that menus need 7 items.",
    "laws"
  ],
  [
    "Tesler's law",
    "Every system has some complexity that can't be removed, only moved.",
    "Decide who carries it. Usually the product should, so the user doesn't have to.",
    "laws"
  ],
  [
    "Doherty threshold",
    "Productivity soars when a system responds in under about 400 ms.",
    "Respond instantly to input, use optimistic updates, and show skeletons while slow things load.",
    "laws"
  ],
  [
    "Aesthetic-usability effect",
    "People perceive attractive designs as easier to use, and forgive them more.",
    "Polish matters. But it can also hide real problems in testing, so watch what people do, not what they say.",
    "laws"
  ],
  [
    "Von Restorff effect",
    "Of several similar items, the one that differs is remembered.",
    "Make the one thing that matters look different. If everything is highlighted, nothing is.",
    "laws"
  ],
  [
    "Serial position effect",
    "People remember the first and last items in a series best.",
    "Put key navigation items at the ends, and key information at the start or end of a list.",
    "laws"
  ],
  [
    "Peak-end rule",
    "People judge an experience by its most intense moment and its end.",
    "Design the high point and the finish: a good confirmation screen, a graceful error, a satisfying completion.",
    "laws"
  ],
  [
    "Goal-gradient effect",
    "Motivation rises as people get closer to a goal.",
    "Show progress, and give people a head start (a progress bar that starts partly filled when setup is genuinely partly done).",
    "laws"
  ],
  [
    "Zeigarnik effect",
    "Unfinished tasks are remembered better than finished ones.",
    "Progress indicators and gentle prompts to finish setup work because incomplete tasks nag.",
    "laws"
  ],
  [
    "Postel's law",
    "Be liberal in what you accept and conservative in what you send.",
    "Accept phone numbers with spaces, dates in several formats, and emails with trailing spaces. Then output a clean, consistent format.",
    "forms"
  ],
  [
    "Cognitive load",
    "The mental effort needed to use something. Some is intrinsic to the task; the rest is added by the design.",
    "Remove the added load: fewer choices at once, clear labels, sensible defaults, recognition over recall.",
    "laws"
  ],
  [
    "Law of Prägnanz",
    "People read complex images in the simplest form they can.",
    "Prefer simple shapes and clear structure. Complex ones are mentally simplified anyway, often wrongly.",
    "gestalt"
  ],
  [
    "Banner blindness",
    "People ignore anything that looks like an advert, including your important notice if it's styled like one.",
    "Put critical information in the flow of the task, not in a loud box at the top.",
    "heuristics"
  ]
] },
    { id: "platforms", title: "Platforms", heading: "Platform conventions", lede: "What each kind of screen expects from you.", type: "table", minWidth: 760, data: { head: ["Platform", "Input", "Conventions", "Watch out for"], rows: [
  [
    "Web",
    "Mouse, keyboard, touch",
    "Links and URLs, scrolling pages, header navigation, hover states, browser back button",
    "Every screen size at once; no hover on touch; people arrive deep from search; performance is part of the design."
  ],
  [
    "iOS",
    "Touch, gestures",
    "Large titles, navigation stacks with swipe back, tab bar at the bottom, sheets, SF Pro and Dynamic Type",
    "Respect safe areas and the home indicator; keep the tab bar visible; follow system text sizes."
  ],
  [
    "Android",
    "Touch, gestures, system back",
    "Material 3 components, top app bar, navigation bar or rail, FAB for the main create action, Roboto",
    "System back gesture must always work predictably; support dynamic colour and many screen sizes."
  ],
  [
    "Desktop apps",
    "Mouse, keyboard, trackpad",
    "Menu bar (Mac) or ribbon/menus (Windows), keyboard shortcuts, right-click menus, multiple windows, drag and drop",
    "Density can be higher; power users expect shortcuts and a command palette; Mac and Windows differ (Cmd vs Ctrl, button order)."
  ],
  [
    "Dashboards and SaaS",
    "Mouse and keyboard, mostly desktop",
    "Sidebar navigation, tables, filters, charts, settings pages, empty states",
    "Start from the questions people ask; right-align numbers; design empty, loading and error states for every widget."
  ],
  [
    "AI and chat",
    "Text, voice, files",
    "Prompt box with suggestions, streaming answers, stop and regenerate, sources, editable messages",
    "Set expectations, show uncertainty and sources, let people correct and undo, and handle latency gracefully."
  ],
  [
    "Watch",
    "Glance, tap, crown, voice",
    "Glanceable screens, complications, short flows, notifications",
    "Interactions measured in seconds; large type; one task per screen; rely on the phone for heavy work."
  ],
  [
    "TV",
    "Remote: arrows, select, back",
    "Focus-driven grids and rows, big type, safe area margins",
    "Viewed from about 3 m; focus state must be unmistakable; avoid text entry; keep navigation shallow."
  ],
  [
    "Voice",
    "Speech",
    "Turn-taking, confirmations, short prompts, clear exits",
    "No screen to fall back on; keep lists to a few items; confirm risky actions; design for errors and silence."
  ]
] } },
    { id: "checklists", title: "Checklists", heading: "Checklists", layout: "split", blocks: [
      { type: "list", title: "Ten critique questions", lede: "Ask these of any screen, yours or someone else's.", data: [
  "What is this screen for, and who is it for?",
  "What do I see first, second and third? Is that the right order?",
  "What is the one action this screen wants me to take? Is it obvious?",
  "Does everything that looks clickable work, and does everything that works look clickable?",
  "What would confuse someone seeing this for the first time?",
  "What happens when there is no data, too much data, or an error?",
  "Is the text readable: size, contrast, line length?",
  "Would it work by keyboard alone, and on a phone in one hand?",
  "What could be removed without losing anything?",
  "Does it look and behave like the rest of the product?"
] },
      { type: "checklist", title: "Before you ship", lede: "The full interactive version, with notes per project, is the [Polish checklist lab](#lab.lab-audit).", data: AUDIT },
    ] },
    { id: "library", title: "Library", type: "library" },
  ],
};
