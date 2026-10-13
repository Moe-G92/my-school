L({
  id: "what-is-design",
  part: 1,
  n: 1,
  title: "What design is (and isn't)",
  short: "What design actually covers, from strategy to surface, and how to tell which layer a problem lives on.",
  minutes: { read: 5, watch: 15, practice: 15 },
  body: `
## Design is deciding on purpose

Every screen you ship is a pile of decisions: what the button says, how big the price is, what happens when a card is declined. If you didn't make a decision, a default made it for you, such as the framework's spacing or the AI model's favourite gradient.

**Design** is the practice of making those decisions deliberately, for a particular person in a particular situation, within real limits of time, money and technology. The economist Herbert Simon, in The Sciences of the Artificial (1969), described design as devising ways to turn an existing situation into a preferred one. That definition has no pixels in it. Choosing a default setting is design. So is deciding what to leave out.

## Interface and experience

The **user interface** (UI) is the part people see and touch: screens, controls, words, colour and motion. The **user experience** (UX) is everything a person goes through to get something done with your product, including the parts that never appear on a screen. Don Norman, a cognitive scientist, coined User Experience Architect as his job title at Apple in the 1990s because he felt "interface" and "usability" were too narrow for the work.

A food delivery app shows the difference. Its screens can be lovely and the order can still arrive cold, because the restaurant isn't told when the courier is close. That is a UX failure with no UI fix. You need both, and the expensive problems usually sit underneath the interface.

## Five planes, from abstract to concrete

Jesse James Garrett's The Elements of User Experience (2000) maps these decisions as five planes, from the most abstract at the bottom to the most concrete at the top.

1. **Strategy**: who the product is for, what they need, and what the business needs from it.
2. **Scope**: which features and content are in, and which are deliberately out.
3. **Structure**: how content is organised (information architecture, lesson 5) and how the system responds to what people do (interaction design).
4. **Skeleton**: the arrangement of things on the screen, such as where the navigation sits and which field comes first.
5. **Surface**: the visual layer of colour, type, imagery and polish.

[[fig:fig-ux-planes]]

Each plane constrains the one above it. You can't place a button until you know the feature exists, and you can't choose the feature until you know who it serves. In practice the planes overlap, and what you learn up top often sends you back down.

The habit worth building is diagnosis. When something feels wrong, ask which plane the problem lives on. A pricing page that converts badly might have a button that's hard to see. More often it has a scope problem (too many plans) or a strategy problem (it asks for money before the visitor believes the product works).

> **Try it now:** Open an app you used today and name one decision its designers made on each plane. Then pick the plane where it's weakest.

## Good design, by one definition

The industrial designer Dieter Rams, who led design at Braun for over three decades, set out ten principles of good design. Several apply directly to software: good design is useful, understandable, honest, thorough down to the last detail, and as little design as possible.

His summary, "less, but better", describes a discipline of removal. Every element has to earn its place. Sometimes that gives a sparse screen and sometimes a dense one, like a good train timetable, where every line is there because someone needs it.

Honesty matters more than it sounds. A cancellation flow that hides the cancel button behind five screens of offers is designed to work against the person using it. By Rams' standard that is bad design however polished it looks. These are **deceptive patterns** (often called dark patterns).

> **Rule of thumb:** If you can't say who a screen is for and what they're trying to get done on it, any visual work on that screen is decoration.

## Where looks fit in

Aesthetics are part of how a product works. In a 1995 study at Hitachi, Kurosu and Kashimura showed people many layouts of a cash machine screen, and ratings of how easy a layout looked to use tracked closely with how attractive people found it. This is the **aesthetic-usability effect**. People forgive small problems in products that look cared for, which also means good looks can hide problems. That's why lesson 4 teaches you to watch what people do instead of asking whether they like it.

Taste is the other trap. "I like it" is a fact about you. A design decision should trace back to the planes below it: this type size because the audience reads on small phones, this colour because that action is the reason the page exists. If you can explain a visual choice in those terms, you're designing. If you can't, you're styling.

> **Common mistake:** Starting from the surface. "Make it look like Linear" gets you a dark theme and tight type, but Linear's look grew out of decisions about keyboard-driven speed for people who live in issue lists. Without those decisions underneath, the style is a costume.

## Using this with your AI tools

AI coding tools are strongest on the skeleton and surface planes. They know nothing about your strategy or scope unless you tell them, so they fill the gap with the average of every pricing page they've seen.

Work down the planes before you prompt. Name the person, their situation and the one outcome the screen must produce. Say what's in scope and what is deliberately left out. Only then describe the look, in terms of the person ("calm and readable on a phone during a work break") instead of another brand.

When you review the output, check each plane in turn. Does every section serve the stated outcome? Did the tool invent features you didn't ask for? Is the structure right, before you start judging colours?

> **Prompt:** Build the plan selection step for freelancers sending their first invoice. Goal: they choose a plan in under a minute without worrying about surprise charges. Two plans only. Show price, what's included and "cancel any time" next to the button. Calm, plain visual style.
`,
  takeaways: [
    "Every screen is a set of decisions, and anything you don't decide is decided by a default.",
    "UX is the whole experience of getting something done; UI is the part you can see and touch.",
    "Garrett's five planes run from strategy to surface, and each one constrains the one above it.",
    "When something feels wrong, find the plane the problem lives on before changing pixels.",
    "A visual choice is design only when you can trace it back to the person and their goal.",
  ],
  check: [
    {
      q: "Most people who start sign-up for your invoicing app leave at the 'Choose a plan' step. A teammate suggests a brighter button and a new colour scheme. Where would you look first?",
      options: [
        "The surface, because the button might be hard to see",
        "Strategy and scope, because asking for a plan before people trust the product, or offering too many plans, would cause exactly this",
        "The skeleton, because the button should sit higher on the page",
        "Nowhere, because drop-off at payment is normal and can't be designed away",
      ],
      answer: 1,
      why: "Drop-off at a decision point usually comes from what is being asked and when, which lives on the strategy and scope planes. The brighter button is tempting because it's quick, but if people don't yet trust the product or can't choose between plans, a more visible button only makes an unwelcome question louder.",
    },
    {
      q: "Which of these is a user experience problem that no amount of interface work can fix?",
      options: [
        "The 'Book' button has low contrast",
        "The settings page has inconsistent spacing",
        "The booking app's screens are clear, but the hotel never receives some of the bookings",
        "The error messages use technical jargon",
      ],
      answer: 2,
      why: "If the hotel never receives the booking, the experience fails behind the screen whatever the screen looks like. Jargon in error messages is the tempting answer because it feels deeper than visual polish, but words on screen are part of the interface and can be rewritten.",
    },
    {
      q: "A settings page has 40 toggles and people can't find anything. Which change best reflects Dieter Rams' 'as little design as possible'?",
      options: [
        "Set good defaults, keep the handful of settings people actually change, and move the rest into an 'Advanced' section",
        "Split the 40 toggles across five tabs with icons",
        "Add a search bar above the list",
        "Add a small illustration to each toggle so it feels friendlier",
      ],
      answer: 0,
      why: "Removing decisions people shouldn't have to make is the 'less, but better' move. Tabs are the tempting answer because they look tidier, but they keep all 40 decisions and add a layer of navigation on top.",
    },
  ],
  practice: [
    {
      type: "sort",
      title: "Which plane is this decision on?",
      intro: "Garrett's five planes, grouped into three buckets. Drag each decision about an invoicing app into the right one.",
      buckets: ["Strategy or scope", "Structure or skeleton", "Surface"],
      items: [
        { text: "The app is for freelancers sending their first invoices, rather than for accountants", bucket: 0, why: "Who the product serves is strategy, the bottom plane that everything else rests on." },
        { text: "Recurring invoices are left out of the first version", bucket: 0, why: "Deciding which features are in or out is scope." },
        { text: "The product earns a small fee on each paid invoice", bucket: 0, why: "The business model is strategy, and it shapes the planes above, such as whether payment happens inside the app." },
        { text: "Clients and invoices live in separate sections, and a sent invoice can be voided but not edited", bucket: 1, why: "How the parts relate and how the system behaves is structure." },
        { text: "What happens when a payment fails, and what the person sees next", bucket: 1, why: "Defining how the system responds to events is interaction design, which sits on the structure plane." },
        { text: "The total and the Send button sit at the bottom of the invoice form", bucket: 1, why: "Placing elements on a screen is skeleton." },
        { text: "Payment terms use radio buttons because there are only three choices", bucket: 1, why: "Choosing which control to use is interface design, part of the skeleton." },
        { text: "The brand colour is a deep green", bucket: 2, why: "Colour is surface." },
        { text: "Cards have 8 px rounded corners", bucket: 2, why: "The styling of shapes is surface." },
        { text: "The empty states use simple line illustrations", bucket: 2, why: "Imagery is surface. The decision to have a helpful empty state at all belongs lower down, in structure." },
      ],
    },
    {
      type: "choice",
      title: "Design or decoration?",
      intro: "Each scenario has a quick cosmetic fix and a real design move. Pick the real design move.",
      items: [
        {
          prompt: "An AI tool generates a landing page for your one-feature product: gradient hero, three feature cards, a testimonials carousel and an FAQ. You have no testimonials yet and only one feature.",
          options: [
            "Keep the layout and write placeholder testimonials for now",
            "Start from what a visitor needs to believe before signing up, and cut the sections that don't help",
            "Ask for a darker theme so it looks more premium",
            "Invent a fourth feature card so the grid looks balanced",
          ],
          answer: 1,
          why: "The template is the average landing page. Your page only needs the sections that help a visitor decide. Placeholder testimonials are tempting because the slot is there, but publishing them would break Rams' honesty principle.",
        },
        {
          prompt: "A station ticket machine asks for destination, then ticket type, then railcard, and only then shows the price. Commuters who buy the same ticket every day say it's slow.",
          options: [
            "Make every button larger",
            "Add a short tutorial animation to the start screen",
            "Show the most common tickets from this station on the first screen",
            "Use a friendlier colour scheme",
          ],
          answer: 2,
          why: "The problem is the number of steps for a repeated task, which lives in structure. Larger buttons are tempting because they are a genuine accessibility gain, but they don't remove a single step.",
        },
        {
          prompt: "A friend looks at your analytics dashboard and says 'I don't like the green'.",
          options: [
            "Change it to blue, since one opinion is better than none",
            "Keep it, because you like it",
            "Run a poll with five colour options",
            "Ask what the green makes harder to see or understand",
          ],
          answer: 3,
          why: "Taste on either side is a fact about a person. Asking what the colour makes harder turns an opinion into an observation you can act on, such as chart lines that are hard to tell apart. A poll is tempting because it feels objective, but it only collects more taste.",
        },
        {
          prompt: "You're designing a medication reminder app used mostly by people over 70.",
          options: [
            "Large, high-contrast text and one clear action per reminder",
            "A fashionable translucent glass style so it feels modern",
            "Lots of customisation so everyone can set it up their own way",
            "Icon-only buttons to keep the screens clean",
          ],
          answer: 0,
          why: "The audience defines the surface: most older adults have weaker near vision and less patience for unfamiliar controls. Customisation is tempting because it sounds respectful, but every option is another decision, and the people who most need a setting are the least likely to find it.",
        },
      ],
    },
    {
      type: "rewrite",
      title: "From surface prompt to design brief",
      intro: "AI tools fill gaps with averages. Rewrite this prompt so it starts at the strategy plane and only reaches the surface at the end.",
      task: "Rewrite the prompt as a short brief of 4 to 6 sentences. Say who the page is for and what situation they're in, what they need to decide, what the page must contain and leave out, and finally how it should feel.",
      given: "Make me a beautiful modern landing page for my app, like Stripe's.",
      rubric: [
        "Names a specific audience and the situation they arrive in",
        "States the one action the page should lead to",
        "Says what is in and out of scope for the page",
        "Describes the look in terms of the audience's needs instead of copying another brand",
      ],
      model: "This page is for UK freelance designers who make invoices in Word and chase late payments by email. They arrive from a search about late invoices and need to see within a few seconds that the app sends invoices and polite reminders for them. The page should lead to one action: start a free trial without entering a card. Include a short explanation of how reminders work, the single price and a screenshot of a real invoice. Leave out feature grids, testimonials (we have none yet) and a blog section. It should feel calm and easy to read on a phone, with generous space and one strong accent colour reserved for the trial button.",
    },
  ],
  journal: "Pick an app you used today. Write one sentence for each of the five planes describing a decision its designers made. Then name the plane you think is weakest and what you would change there.",
  terms: ["user-experience", "user-interface", "five-planes", "aesthetic-usability-effect", "less-but-better", "deceptive-pattern"],
});
