L({
  id: "everyday-things",
  part: 1,
  n: 2,
  title: "Affordances, signifiers and feedback",
  short: "Why people get stuck on doors and buttons, and the vocabulary for designing controls that explain themselves.",
  minutes: { read: 5, watch: 15, practice: 15 },
  body: `
## The door that needs a sign

You walk up to a glass door with a vertical bar handle and pull. It doesn't move, because it's a push door. The "Push" sticker someone added later admits the door has failed. The handle says pull, and the sign has to argue with it.

People call these Norman doors, after Don Norman, whose book The Design of Everyday Things (1988, revised 2013) explained why they happen. His central claim is that when people make mistakes with everyday objects, the object is usually at fault. The vocabulary he gave designers for explaining those failures is the one you'll use in every lesson after this.

## Affordances and signifiers

An **affordance** is a relationship between an object and a person: the actions the object makes possible for someone with particular abilities. The psychologist James J. Gibson coined the term in the 1970s, and Norman brought it into design. A flat plate on a door affords pushing. A handle you can wrap your fingers around affords pulling. A low wall affords sitting for an adult and climbing for a toddler.

A **signifier** is any perceivable cue that tells you where and how to act. Norman added the term to his vocabulary because designers kept saying "affordance" when they meant "visual hint". A door handle is both an affordance and a signifier. The "Push" sticker is purely a signifier.

[[fig:fig-norman-door]]

The bad door has a signifier that contradicts its function. The good door has a flat plate on the push side and a handle only on the pull side, so it needs no words at all.

## Screens have no handles

On a touchscreen, almost everything affords the same few actions. Any pixel can be tapped, pressed or swiped, which means signifiers do nearly all the work. People read interactivity from learned conventions: coloured or underlined link text, a button with a fill or border, a chevron at the end of a settings row, a six-dot grip on something draggable, a card cut off at the screen edge that hints at more to scroll.

When Apple released iOS 7 in 2013, many buttons became plain coloured text with no outline. A later update added a Button Shapes accessibility setting that puts visible shapes back, a sign that borderless text was hard for some people to recognise as tappable.

The opposite failure is a **false signifier**, something that looks interactive and isn't. Blue text that isn't a link. A card that lifts on hover and then does nothing when clicked. Each one teaches people to distrust your cues, and they start hesitating over the real ones too.

> **Common mistake:** AI-generated interfaces often give every card a hover lift and shadow whether or not it's clickable, and style links exactly like body text. Every interactive element should look interactive, and nothing else should.

## Feedback closes the loop

Norman describes two gaps a person has to cross. The **gulf of execution** is working out how to do what you want. The **gulf of evaluation** is working out what happened after you did it. Signifiers bridge the first gap. **Feedback**, the system's visible response to an action, bridges the second.

Good feedback is immediate and specific. Jakob Nielsen's response-time limits (1993) are still a useful guide. Around 0.1 seconds feels instant. Around 1 second keeps people's train of thought, though they notice the wait. Beyond about 10 seconds people lose focus, so they need a progress indicator and usually a way to cancel.

A payment button is the classic test. Tap "Pay £42.00" and the button should switch to a loading state within a tenth of a second and stop accepting taps, then confirm success or explain what went wrong. Without that, people tap again and risk paying twice, or close the page thinking it froze.

> **Try it now:** Open any app and press five different controls. For each, note what changed to tell you it worked. Any control where nothing visibly changed has left you in the gulf of evaluation.

## Mapping and constraints

**Mapping** is the relationship between controls and their effects. Norman's classic example is a hob with four burners in a square and four knobs in a row, where nobody can tell which knob controls which burner without reading labels. Put the knobs in the same square layout as the burners and the labels become unnecessary. On screens, natural mapping looks like a volume slider that increases to the right, or a seat map you tap directly instead of a dropdown of seat numbers.

**Constraints** limit what's possible so that mistakes can't happen. A date picker that greys out past dates and a quantity field that only accepts numbers are both constraints. They are kinder than error messages, because the error never occurs.

These ideas sit on the structure and skeleton planes from lesson 1. They decide whether an interface can be used before anyone thinks about how it looks.

> **Rule of thumb:** If an element needs written instructions to operate, fix its signifier first. Add the instructions only if they're still needed.

## Using this with your AI tools

AI tools produce screens that look tidy in a static preview, which is exactly where weak signifiers and missing feedback hide. A screenshot can't show what happens when you click.

So ask for interaction explicitly. Name each interactive element and how it should signal that it's interactive. Name the feedback for every action: pressed, loading, success and error. Ask for constraints in place of error messages where possible, such as disabling past dates.

Then test by using it. Click everything, including things that shouldn't be clickable. Use your browser's developer tools to throttle the network and watch what happens during a slow response. Double-click every submit button to check it can't send twice.

> **Prompt:** On the checkout, the Pay button shows a pressed state at once, then a spinner with "Processing" and ignores further clicks, then a success tick or an error that says what to do next. Only clickable cards get hover styles.
`,
  takeaways: [
    "An affordance is what an object lets you do; a signifier is what tells you so.",
    "On a screen almost everything can be tapped, so signifiers carry nearly all the meaning.",
    "Every action needs visible feedback, ideally within about a tenth of a second.",
    "Make controls mirror the layout of what they control, and prevent errors with constraints before writing error messages.",
    "Anything that looks interactive must be interactive, and nothing else should look that way.",
  ],
  check: [
    {
      q: "A card on your dashboard lifts with a shadow on hover, but clicking it does nothing. What has gone wrong?",
      options: [
        "A missing affordance",
        "A false signifier: it signals an action that doesn't exist",
        "Missing feedback",
        "A mapping problem",
      ],
      answer: 1,
      why: "The card tells people it can be clicked, then doesn't respond, so it's a signifier pointing at nothing. Missing feedback is tempting because nothing happens on click, but feedback is a response to an action that exists. Here there is no action to respond to.",
    },
    {
      q: "You press Save in a web app. Nothing visibly changes for three seconds, then a small 'Saved' message appears. Some people press Save again in the meantime. Which fix targets the real gap?",
      options: [
        "Make the Save button bigger",
        "Add an icon to the Save button",
        "Move Save to the top of the page",
        "Show a saving state on the button immediately and ignore repeat presses until the save finishes",
      ],
      answer: 3,
      why: "People can't tell whether their press registered, which is the gulf of evaluation. Immediate feedback closes it, and ignoring repeat presses adds a constraint. A bigger button is tempting because it feels more obvious, but nobody had trouble finding the button in the first place.",
    },
    {
      q: "A smart-home app lists four lamps as 'Lamp 1' to 'Lamp 4'. The lamps stand in the four corners of the living room, and people keep switching on the wrong one. What's the best fix?",
      options: [
        "Show the switches on a simple plan of the room, each in the same corner as its lamp",
        "Rename them 'Lamp A' to 'Lamp D'",
        "Add a help article explaining the numbering",
        "Make the toggles larger",
      ],
      answer: 0,
      why: "This is a mapping problem: the layout of the controls doesn't match the layout of the things they control. The help article is tempting because it does explain the numbering, but it asks people to memorise a mapping the interface could simply show.",
    },
  ],
  practice: [
    {
      type: "sort",
      title: "Affordance, signifier or feedback?",
      intro: "Sort each example by the job it does. Affordances are what's possible, signifiers say where and how to act, and feedback reports what just happened.",
      buckets: ["Affordance", "Signifier", "Feedback"],
      items: [
        { text: "A touchscreen can be tapped anywhere", bucket: 0, why: "It's a possible action, whether or not anything on screen tells you about it." },
        { text: "A text field accepts typed text", bucket: 0, why: "Typing is an action the field makes possible. The outline and label that tell you it's a field are the signifiers." },
        { text: "A slider's handle can be dragged along its track", bucket: 0, why: "Dragging is what the control allows. The handle's shape is what signals it." },
        { text: "A six-dot grip icon at the left edge of a list row", bucket: 1, why: "The grip is a learned cue that says this row can be dragged to reorder." },
        { text: "A chevron at the end of a settings row", bucket: 1, why: "It signals that tapping the row opens another screen." },
        { text: "Underlined, coloured words inside a paragraph", bucket: 1, why: "The styling is a long-standing convention that signals a link." },
        { text: "The last card in a horizontal row cut off at the screen edge", bucket: 1, why: "The cut-off hints that the row continues and can be scrolled sideways." },
        { text: "A list row lifting and following your finger as you drag it", bucket: 2, why: "The row's movement confirms the drag has started and shows where it will land." },
        { text: "The Pay button switching to a spinner after you tap it", bucket: 2, why: "It tells you the tap registered and the system is working." },
        { text: "A short vibration as a toggle switches on", bucket: 2, why: "Haptic feedback confirms the change without needing to look." },
        { text: "A 'Delivered' label appearing under a message you sent", bucket: 2, why: "It reports the outcome of your action, closing the gulf of evaluation." },
      ],
    },
    {
      type: "choice",
      title: "Diagnose and fix",
      intro: "Each scenario describes a real kind of failure. Pick the fix that addresses its cause.",
      items: [
        {
          prompt: "A checkout's 'Place order' button looks exactly the same after you click it. Some customers click three times and receive three orders.",
          options: [
            "Make the button red so it feels more serious",
            "Send a confirmation email straight away",
            "Show a loading state immediately and ignore further clicks until the order is placed",
            "Move the button higher up the page",
          ],
          answer: 2,
          why: "The button gives no feedback and has no constraint against repeats. The confirmation email is tempting, but it arrives after the duplicate orders already exist.",
        },
        {
          prompt: "A writing app's toolbar has 14 icon-only buttons. New users hover over each one in turn to find 'Insert link'.",
          options: [
            "Give the less common actions text labels, or put them in a labelled menu",
            "Make the icons more colourful",
            "Remove the tooltips to reduce clutter",
            "Add a list of keyboard shortcuts in settings",
          ],
          answer: 0,
          why: "Icons for very common actions like bold are widely understood. Rarer actions need words, because their icons are weak signifiers. A shortcut list is tempting, but people who can't find the button won't find a page in settings either.",
        },
        {
          prompt: "In a project tool, task names are blue and underlined, but clicking one does nothing. You open a task with a small arrow at the right of the row.",
          options: [
            "Make the arrow bigger",
            "Make the task name open the task, or stop styling it as a link",
            "Add a tooltip to the arrow",
            "Add a note at the top of the page explaining how to open tasks",
          ],
          answer: 1,
          why: "The blue underline is a false signifier. Making the name do what it promises (or removing the promise) fixes the cause. A bigger arrow is tempting, but the misleading link styling would still pull clicks away from it.",
        },
        {
          prompt: "A sign-up form only tells you your password needs a number after you submit, then clears both password fields.",
          options: [
            "Make the error message red and bold",
            "Add a 'show password' toggle",
            "Write a longer, friendlier error message",
            "Show the requirements beside the field and tick each one off as people type",
          ],
          answer: 3,
          why: "The feedback arrives too late and destroys work. Live feedback lets people succeed the first time. A show-password toggle is a good addition, but it doesn't tell anyone what the rule is.",
        },
        {
          prompt: "A lift has two buttons marked only with arrow symbols, one pair pointing inwards and one pointing outwards. People freeze when someone runs for the lift.",
          options: [
            "Make both buttons larger",
            "Add the words 'Open' and 'Close' and make the open button visually distinct",
            "Make the buttons light up when pressed",
            "Move both buttons higher up the panel",
          ],
          answer: 1,
          why: "Under time pressure, abstract symbols are weak signifiers, and a word removes the doubt. Lighting up is tempting because it's good feedback, but feedback only helps after you've already chosen a button.",
        },
      ],
    },
  ],
  journal: "Find one 'Norman door' in software you used today, something you tried to operate the wrong way. Write what you expected, what signalled it, and the smallest change to the signifier or feedback that would have prevented the mistake.",
  terms: ["affordance", "signifier", "false-signifier", "feedback", "gulf-of-execution", "gulf-of-evaluation", "mapping", "constraint"],
});
