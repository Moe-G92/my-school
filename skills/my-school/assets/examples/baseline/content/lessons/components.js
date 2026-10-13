L({
  id: "components",
  part: 3,
  n: 17,
  title: "Components and their states",
  short: "Design components once, with every state they need, and pick the right control for each decision.",
  minutes: { read: 5, watch: 12, practice: 18 },
  body: `
## What a component is

A **component** is a reusable piece of interface with a fixed job: a button, a text field, a checkbox, a card, a menu. Each has an anatomy (a button is a container, a label and perhaps an icon), a set of **variants** such as primary, secondary, ghost and destructive, a few sizes, and a set of states. Designing a component means making all of those decisions once, so every screen gets the same answers.

Brad Frost's **atomic design** (2013) gave this thinking a popular vocabulary. Atoms like buttons and inputs combine into molecules like a search bar, molecules into organisms like a site header, then templates and pages. The chemistry metaphor is optional. The idea underneath, that small consistent parts compose into whole screens, runs every modern design system (lesson 18).

Variants carry the hierarchy from lesson 7. A screen usually has one primary button. Secondary actions use a quieter variant, and destructive actions get their own, so "Delete account" never looks like "Save".

## Every state is a message

An **interaction state** is how a component looks in a particular condition, and each one answers a question the person has. This is Don Norman's feedback principle from lesson 2, applied to every control. For a button:

- Default: what is this, and can I use it?
- Hover: yes, this responds to the pointer.
- Focus: this is where the keyboard is.
- Active, or pressed: your press registered.
- Loading: working on it, no need to press again.
- Disabled: you cannot use this right now.

Inputs add filled, error, read-only and success states, and toggles and tabs add selected.

[[fig:fig-button-states]]

Four states need particular care.

**Hover** exists only with a mouse or trackpad. Touch screens have no hover, so never hide information or actions behind it. The change can be small, such as one step darker on your colour scale (lesson 11).

**Focus** shows keyboard and switch users where they are, and it is the state most often missing. WCAG requires focus to be visible (SC 2.4.7), and a **focus indicator** needs 3:1 contrast against what surrounds it. Teams used to remove the outline because it appeared on mouse clicks. The focus-visible pseudo-class fixes that by showing the ring when the browser judges it useful, which in practice means keyboard use.

**Disabled** controls are exempt from contrast rules, which is part of the problem. Pale grey buttons are hard to see and never say why they are unavailable. A sign-up button that stays disabled until the form is valid leaves people hunting for what they missed. Often it is better to keep the button enabled and, on press, show what needs fixing (lesson 20).

**Loading** should keep the button the same width, show a spinner with or instead of the label, and block repeat presses so a payment is never sent twice.

A useful habit is a state matrix: variants down one side, states across the top, one cell for each combination. Gaps become obvious at a glance. Figma's component variants and tools like Storybook are built around the same idea.

> **Try it now:** Open any sign-in page on a laptop and press Tab repeatedly. Check that you can always see where you are, and compare how visible the focus ring is with the hover colour.

> **Common mistake:** AI-generated components usually ship with a default and a hover state and nothing else: no visible focus, no loading state, no error state on inputs. Ask for every state by name, then look at each one.

## Choosing the right control

Many interface problems come down to the wrong control for the job.

- **Checkbox**: an independent yes or no, or several choices from a list. It takes effect when the form is submitted, like "Email me order updates" in a checkout.
- **Toggle switch**: an on or off setting that applies immediately, like a light switch, as with Wi-Fi in phone settings. A toggle inside a form with a Save button confuses people, because they cannot tell whether it has already applied.
- **Radio button** group: one choice from a small set, roughly two to six, where seeing every option helps comparison, such as delivery speeds with their prices.
- **Select**, or dropdown: one choice from a long, familiar list such as countries. It hides the options, so it is a poor fit for three choices people need to compare.
- **Segmented control**: two to five mutually exclusive options that switch a view instantly, like Day, Week, Month and Year in Calendar on a Mac.
- **Combobox**: a text field that filters a long list as you type, for lists too long to scroll, such as airports or time zones.

> **Rule of thumb:** Applies immediately means a toggle. Applies on submit means a checkbox. One of a few means radios. One of many means a select or a combobox.

## Using this with your AI tools

When you ask a tool for a component, name its variants, sizes and every state, and say which control you want. Otherwise you get a default, a hover colour, and whatever control the tool saw most often in its training data.

> **Prompt:** Build a Button with primary, secondary, ghost and destructive variants in small, medium and large sizes, with default, hover, focus-visible (2 px ring at 3:1 contrast), active, disabled and loading states. Loading keeps the width, shows a spinner and blocks repeat clicks.

Then check by hand. Tab through the page and confirm every control shows focus. Press a submit button twice quickly. Shrink to phone width and make sure nothing depends on hover. Look for toggles inside forms that have a Save button, and for selects that hide only two or three options.
`,
  takeaways: [
    "Design each component once: its anatomy, variants, sizes and every state.",
    "Every state answers a question; a default and a hover colour are never enough.",
    "Never remove focus outlines; style them with focus-visible and give them 3:1 contrast.",
    "Toggles act immediately, checkboxes act on submit, radios show a few options and selects hide many.",
    "Prefer an enabled button that explains what is missing over a disabled one that says nothing.",
  ],
  check: [
    {
      q: "A checkout form ends with a 'Place order' button. You need an option for 'Save this card for next time'. Which control fits best?",
      options: ["A toggle switch", "A checkbox", "Two radio buttons, Yes and No", "A dropdown with Yes and No"],
      answer: 1,
      why: "The choice takes effect when the order is placed, which is exactly what a checkbox signals. A toggle is the tempting answer because it looks modern, but toggles promise an immediate effect, so people wonder whether the card was already saved.",
    },
    {
      q: "A sign-up button stays disabled until every field is valid. In testing, people sit stuck, unsure what is wrong. What is the best change?",
      options: [
        "Make the disabled button paler so it is clearly inactive",
        "Add a tooltip to the disabled button",
        "Keep the button enabled and, when pressed, show which fields need attention",
        "Remove validation so nobody gets stuck",
      ],
      answer: 2,
      why: "An enabled button lets people ask the question, and the form answers it by pointing at each problem. The tooltip looks like a fix, but disabled buttons cannot take keyboard focus and often do not fire hover events, so many people never see it.",
    },
    {
      q: "A developer removed the focus outline from all buttons because it appeared when people clicked with a mouse. What should you do?",
      options: [
        "Restore a clear focus style using focus-visible, with at least 3:1 contrast",
        "Leave it removed, because most people use a mouse",
        "Show the outline on hover instead",
        "Keep the outline but make it the same colour as the button",
      ],
      answer: 0,
      why: "Keyboard and switch users cannot use a page without visible focus, and WCAG requires it. focus-visible keeps the ring for keyboard use and hides it for most mouse clicks, which solves the original complaint. An outline the same colour as the button is invisible, so it fails the 3:1 requirement.",
    },
  ],
  practice: [
    "lab-states",
    {
      type: "sort",
      title: "Pick the control",
      intro: "Sort each decision into the control that fits it best.",
      buckets: ["Checkbox", "Toggle switch", "Radio buttons", "Select"],
      items: [
        { text: "I agree to the terms, before creating an account", bucket: 0, why: "A single yes or no that is confirmed when the form is submitted." },
        { text: "Pizza toppings, choose any number", bucket: 0, why: "Several independent choices from one list are a checkbox group." },
        { text: "Email me order updates, in a checkout form", bucket: 0, why: "It applies when the order is placed, which is what a checkbox signals." },
        { text: "Dark mode in an app's settings, applied instantly", bucket: 1, why: "An on or off setting that takes effect immediately is what a toggle promises." },
        { text: "Bluetooth on or off in phone settings", bucket: 1, why: "Immediate system setting, the textbook toggle." },
        { text: "Delivery speed: standard, next day or same day, each with a price", bucket: 2, why: "One choice from a few options that people need to compare side by side." },
        { text: "Payment method: card, PayPal or bank transfer", bucket: 2, why: "Three mutually exclusive options are faster to scan when all are visible." },
        { text: "Country, from a list of about 200", bucket: 3, why: "A long, familiar list where people know their answer. A searchable combobox is even better." },
        { text: "Time zone in a profile form", bucket: 3, why: "Too many options to show at once, so hide them in a select, ideally with type-ahead." },
      ],
    },
    {
      type: "choice",
      title: "Which state is missing",
      intro: "Each problem comes from a state that is missing or weak. Name it.",
      items: [
        {
          prompt: "After pressing 'Pay £42', nothing visible happens for three seconds, so some people press again.",
          options: ["Loading", "Hover", "Disabled", "Focus"],
          answer: 0,
          why: "A loading state confirms the press, holds the button's width and blocks repeat presses, so nobody pays twice.",
        },
        {
          prompt: "A keyboard user tabs through a settings page and loses track of where they are.",
          options: ["Active", "Selected", "Focus", "Hover"],
          answer: 2,
          why: "Without a visible focus indicator, keyboard users have no cursor at all. WCAG requires focus to be visible.",
        },
        {
          prompt: "On a phone, people cannot tell which filter chips are applied, because the highlight only shows on hover.",
          options: ["Loading", "Selected", "Disabled", "Error"],
          answer: 1,
          why: "Applied filters need a persistent selected state. Hover does not exist on touch screens.",
        },
        {
          prompt: "An email field turns its border red when the address is wrong, and that is all.",
          options: ["A focus state", "A hover state", "A disabled state", "A complete error state with a message and icon"],
          answer: 3,
          why: "A red border alone relies on colour and does not say what is wrong. The error state needs a written message, ideally with an icon (lesson 12).",
        },
      ],
    },
  ],
  journal: "Pick one button and one text field in an app or site you use. Try to trigger every state: hover, keyboard focus (press Tab on a laptop), pressed, disabled, loading and error. Write down which states exist, which are missing, and how each one communicates.",
  terms: ["component", "variant", "atomic-design", "interaction-state", "focus-indicator", "checkbox", "toggle-switch", "radio-button"],
});
