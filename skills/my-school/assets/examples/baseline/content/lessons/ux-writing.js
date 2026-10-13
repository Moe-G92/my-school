L({
  id: "ux-writing",
  part: 3,
  n: 24,
  title: "Words are interface",
  short: "How to write the labels, buttons, errors and empty states that make an interface understandable.",
  minutes: { read: 5, watch: 10, practice: 20 },
  body: `
## Most of an interface is words

Strip the colour and layout from almost any app and what remains is mostly words: labels, buttons, headings, hints and errors, the small pieces of text often called **microcopy**. A button is a control, but its label is the only thing telling people what the control will do. That makes **UX writing**, the craft of writing the words inside a product, part of the design, done alongside the layout instead of poured in at the end.

Clarity comes first. Brevity usually helps clarity, so it comes next. Personality is welcome once both are secure.

People scan interfaces far more than they read them. The reading patterns from lesson 7 apply to every sentence: eyes catch the first few words of a line and skip the rest. So use **front-loading**, putting the words that carry meaning at the start. "Free delivery over £40" works in a glance; "Delivery is complimentary on all orders with a value exceeding £40" does not.

## Labels and buttons

A button label should say what will happen, usually as a verb and an object: "Save changes", "Send invoice", "Pay £42". Generic labels like "OK", "Submit" and "Yes" force people to read the surrounding text to know what they are agreeing to, and many will not.

- **Match the button to the question.** A dialog titled "Delete Q3 report?" should offer "Delete report" and "Cancel", so the button makes sense read on its own.
- **One word per concept.** If it is a "workspace" on one screen, it cannot be a "team" on another. Keep a short word list for your product (consistency, heuristic 4 in lesson 23).
- **Use your users' words.** "Sign in" beats "Authenticate", and a UK form asks for a postcode.
- **Links describe their destination.** "How to get a refund" tells a scanner and a screen reader user where they are going; "Click here" tells neither, because screen readers can list links out of context (lesson 25).
- **Labels stay visible.** Placeholder text vanishes as you type, so it cannot do a label's job (lesson 20).

> **Try it now:** Open your banking app and read three buttons on their own, covering everything around them. For each, decide whether you would know exactly what happens when you press it.

## Errors, empty states and confirmations

These are the moments when words matter most, because something has gone wrong or nothing is there yet.

An **error message** should say what happened and how to fix it, in plain words, next to the problem, without blaming the person. "Invalid input" fails on every count. "Enter a date in the future, like 14 March 2027" fixes it. Skip "Oops" and jokes: the reader is already frustrated, and a cheerful tone reads as not taking them seriously.

An **empty state** is often the first screen a new user sees, so it should explain what will appear there and offer the one action that fills it: "No invoices yet. Create your first one and we'll track when it's paid", with a "Create invoice" button. A search with no results should suggest a next step, such as checking the spelling or widening the filters.

A **confirmation** for a destructive action should name the thing and the consequence. "Delete Q3 report? It will be removed for everyone on the team." with "Delete report" and "Cancel" works. "Are you sure?" with "OK" asks nothing specific, so people click through it on autopilot.

> **Common mistake:** AI-written copy drifts into marketing filler ("Supercharge your workflow", "Transform the way you work") and generic buttons ("Get started", "Submit", "Learn more"). Replace each one with the specific outcome for this person on this screen.

## Voice and tone

**Voice** is your product's consistent personality. **Tone** is how that voice adjusts to the moment, the way you speak differently to a friend at a party and at a funeral while staying yourself. Mailchimp's public content style guide made this distinction well known. A friendly app can celebrate a first sale, then switch to calm and plain when a payment fails or an account is locked.

Write your voice down as a few traits, each with what it allows and rules out, such as "direct: short sentences, no hedging". Then hold every screen to it.

Underneath any voice sits **plain English**: common words, short sentences, active voice ("We sent you a code" instead of "A code has been sent"). It helps everyone, including experts in a hurry and people reading in a second language. Cut words like "simply", "just" and "easily", which make anyone who struggles feel slow. Write dates unambiguously ("14 March 2027"), because 03/04/2027 means different days in the UK and the US.

Write real words before you design, or at least alongside. Placeholder text hides the long name that wraps, the heading that will not fit and the label that needs a hint, and real copy often changes the layout.

## Using this with your AI tools

AI tools write fluent, generic copy unless you constrain them. Give them the reader, the exact situation, the voice traits, a length limit and your word list ("say 'workspace', never 'team'"). Ask for three options per string and choose, because the first one is usually the blandest. Ask it to list every failure case for a form or flow and write a message for each, since tools tend to write only the happy path.

When you review, read every button alone and check it names an action. Check that every error says how to fix the problem. Search the code for "Oops", "Something went wrong", "Submit", "Click here" and "simply", and replace each one. Finally, compare terms across screens to catch drift.

> **Prompt:** Write the error messages for this sign-up form in plain British English: for each failure (email already registered, weak password, network down) say what happened and how to fix it in under 20 words, with no jokes or error codes.
`,
  takeaways: [
    "Label buttons with a verb and an object, such as 'Save changes' or 'Pay £42'.",
    "Front-load: put the words that carry the meaning first.",
    "Every error says what happened and how to fix it, next to the problem, without blame.",
    "Keep one voice, and let the tone change with the moment.",
    "Write real words before or while you design; placeholder text hides problems.",
  ],
  check: [
    {
      q: "A dialog for deleting a shared report says 'Are you sure?' with 'OK' and 'Cancel'. Which rewrite is best?",
      options: [
        "'Are you absolutely sure?' with 'Yes' and 'No'",
        "'Warning' with 'Proceed' and 'Go back'",
        "'Careful, there's no going back.' with 'Do it' and 'Cancel'",
        "'Delete Q3 report? It will be removed for everyone.' with 'Delete report' and 'Cancel'",
      ],
      answer: 3,
      why: "It names the thing, states the consequence and repeats the action on the button, so the button reads correctly on its own. The playful option is tempting because it sounds human, but it still hides which report and who is affected.",
    },
    {
      q: "Your app's voice is friendly and direct. A customer's card payment has failed and their plan is paused. Which message has the right tone?",
      options: [
        "'Uh-oh, your card said no. Happens to the best of us.'",
        "'Your payment didn't go through, so your plan is paused. Update your card to restore access.'",
        "'PAYMENT FAILURE. ACCOUNT SUSPENDED.'",
      ],
      answer: 1,
      why: "It stays direct, explains the consequence and gives the fix, in a calm tone suited to a worrying moment. The joke is tempting because it matches a friendly voice, but voice stays the same while tone adapts, and money problems call for calm.",
    },
    {
      q: "A help article has a paragraph about returns. Which link text serves both people scanning the page and screen reader users?",
      options: [
        "'Click here' at the end of the paragraph",
        "'Read more' under the paragraph",
        "'How to return an item'",
        "'here' in 'Returns are explained here'",
      ],
      answer: 2,
      why: "It describes the destination, so it makes sense when scanned or when a screen reader lists links on their own. 'Read more' is the tempting choice because it is so common, but a page of 'Read more' links gives no clue where any of them go.",
    },
  ],
  practice: [
    {
      type: "choice",
      title: "Pick the better words",
      intro: "For each moment in a product, choose the text a careful UX writer would ship.",
      items: [
        {
          prompt: "The final button on a free-trial sign-up form.",
          options: ["Start free trial", "Submit", "Continue"],
          answer: 0,
          why: "It says what happens when you press it. 'Submit' describes the form's mechanics, and 'Continue' suggests another step is coming.",
        },
        {
          prompt: "A new user opens the invoices screen of an invoicing app for the first time.",
          options: ["'No data'", "'Welcome to the future of invoicing.'", "'No invoices yet. Create your first one and we'll track when it's paid.' with a 'Create invoice' button"],
          answer: 2,
          why: "It explains what will appear and offers the action that fills the screen. 'No data' is system language, and the welcome line is filler with no next step.",
        },
        {
          prompt: "Hint text under a new-password field.",
          options: ["'Password must satisfy complexity requirements'", "'At least 12 characters. A short phrase is easiest to remember.'", "'Choose a strong password'"],
          answer: 1,
          why: "It states the actual rule before the person types and gives a helpful tip. The other two make people guess the rule and fail first.",
        },
        {
          prompt: "Confirmation after someone sends money to a friend in a banking app.",
          options: ["'Transaction completed successfully'", "'Woohoo, cash is flying your way'", "'£20 sent to Priya'"],
          answer: 2,
          why: "It says exactly what happened in the user's terms. The first is system language, and the second has the wrong tone for money and is confusing, since the money is going away from them.",
        },
        {
          prompt: "A delivery notification, where the phone shows only the first 40 or so characters.",
          options: ["'Parcel delivered to your safe place'", "'We wanted to let you know that your parcel has now been delivered'", "'An update regarding your recent order'"],
          answer: 0,
          why: "Front-loaded: the news is in the first two words and fits before the cut-off. The second spends its first eight words saying nothing, and the third hides the news entirely.",
        },
      ],
    },
    {
      type: "rewrite",
      title: "Fix an error message",
      intro: "Good errors say what happened and how to fix it, in plain words, next to the field.",
      task: "Rewrite this error, shown under a date of birth field after someone typed 31/02/1990.",
      given: "Error: Invalid input. Please try again.",
      rubric: [
        "Says what is wrong in plain words",
        "Says how to fix it",
        "No blame, jargon, error codes or 'Oops'",
        "Short enough to sit under the field (about 15 words or fewer)",
      ],
      model: "February has 28 or 29 days. Check the day and month.",
    },
    {
      type: "rewrite",
      title: "Rewrite a destructive confirmation",
      intro: "A confirmation should name the thing, state the consequence and repeat the action on the button.",
      task: "Rewrite this dialog for removing Sam Lee from the 'Design' workspace. Sam will lose access to all of its files, and can be invited back later.",
      given: "Title: Are you sure? Body: This action cannot be undone. Buttons: OK, Cancel",
      rubric: [
        "The title names the action and the person",
        "The body states the consequence in plain words",
        "The primary button repeats the specific action; the other lets them back out",
        "Nothing vague, such as 'OK' or 'Are you sure?'",
      ],
      model: "Title: Remove Sam Lee from Design? Body: Sam will lose access to all files in this workspace. You can invite Sam again later. Buttons: Remove Sam, Cancel",
    },
  ],
  journal: "Collect five pieces of interface text from apps you use today: two that work well and three that don't. Rewrite the three, and note which principle from this lesson each rewrite applies.",
  terms: ["ux-writing", "microcopy", "front-loading", "error-message", "empty-state", "voice-and-tone", "plain-english"],
});
